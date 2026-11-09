import { beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
  student: { active: true, coins: 10 },
  reward: { active: true, name: 'Livro', cost: 4, stock: 1 } as any,
  writes: [] as Array<{ op: string; ref: string; value?: any }>,
  transactionMutator: undefined as undefined | (() => void),
  failTransaction: false,
}));
vi.mock('../server/middleware/auth', () => ({ authMiddleware: (_req: any, _res: any, next: any) => next() }));
vi.mock('../server/config/firebaseAdmin', () => ({ getDb: () => db }));
vi.mock('../server/services/studentService', () => ({ addHistoryLog: vi.fn().mockResolvedValue(undefined) }));
vi.mock('firebase-admin/firestore', () => ({ Timestamp: { now: () => 'now' } }));

const db: any = {
  collection: (name: string) => ({
    doc: (id?: string) => ({ id: id || `${name}-generated`, name, get: async () => ({ exists: true, data: () => name === 'students' ? state.student : state.reward }) }),
  }),
  runTransaction: async (fn: any) => {
    const tx = {
      get: async (ref: any) => ({ exists: true, data: () => ref.name === 'students' ? { ...state.student } : { ...state.reward } }),
      update: (ref: any, value: any) => state.writes.push({ op: 'update', ref: ref.name, value }),
      set: (ref: any, value: any) => state.writes.push({ op: 'set', ref: ref.name, value }),
    };
    const pending: any[] = [];
    // Stage all writes and apply only if callback succeeds, like Firestore atomic commit.
    const stagedTx = {
      get: tx.get,
      update: (ref: any, value: any) => pending.push({ op: 'update', ref: ref.name, value }),
      set: (ref: any, value: any) => pending.push({ op: 'set', ref: ref.name, value }),
    };
    const result = await fn(stagedTx);
    if (state.failTransaction) throw Object.assign(new Error('aborted'), { code: 10 });
    if (state.transactionMutator) state.transactionMutator();
    if (result.kind === 'success') {
      for (const w of pending) {
        state.writes.push(w);
        if (w.ref === 'students' && w.op === 'update') Object.assign(state.student, w.value);
        if (w.ref === 'rewards' && w.op === 'update') Object.assign(state.reward, w.value);
      }
    }
    return result;
  },
};

import { rewardsRouter } from '../server/routes/rewards';
const handler: any = (rewardsRouter as any).stack.find((layer: any) => layer.route?.path === '/:rewardId/redeem').route.stack[1].handle;
async function call(role = 'aluno', studentId = 's1', payloadStudent = 's1') {
  const res: any = { statusCode: 200, body: undefined, status(n: number) { this.statusCode = n; return this; }, json(value: any) { this.body = value; return this; } };
  await handler({ user: { role, studentId }, params: { rewardId: 'r1' }, body: { studentId: payloadStudent } }, res);
  return res;
}

describe('POST reward redemption', () => {
  beforeEach(() => {
    state.student = { active: true, coins: 10 };
    state.reward = { active: true, name: 'Livro', cost: 4, stock: 1 };
    state.writes = [];
    state.transactionMutator = undefined;
    state.failTransaction = false;
  });
  it('allows own active student redemption and returns transaction balance', async () => {
    const response = await call();
    expect(response.statusCode).toBe(201);
    expect(response.body.data.remainingCoins).toBe(6);
    expect(state.student.coins).toBe(6);
    expect(state.writes.filter((w) => w.op === 'set')).toHaveLength(2);
  });
  it('rejects another student and staff roles before any writes', async () => {
    expect((await call('aluno', 's1', 's2')).statusCode).toBe(403);
    expect((await call('professor')).statusCode).toBe(403);
    expect(state.writes).toHaveLength(0);
  });
  it('uses the current balance read in the transaction, not a stale value', async () => {
    state.student.coins = 3;
    const response = await call();
    expect(response.statusCode).toBe(422);
    expect(state.writes).toHaveLength(0);
  });
  it('prevents stock oversell and marks the final unit exhausted atomically', async () => {
    const response = await call();
    expect(response.statusCode).toBe(201);
    expect(state.reward.stock).toBe(0);
    expect(state.reward.availability).toBe('esgotado');
    state.writes = [];
    expect((await call()).statusCode).toBe(409);
    expect(state.writes).toHaveLength(0);
  });
  it('does not commit any writes when the transaction fails', async () => {
    state.failTransaction = true;
    expect((await call()).statusCode).toBe(409);
    expect(state.writes).toHaveLength(0);
    expect(state.student.coins).toBe(10);
  });
});
