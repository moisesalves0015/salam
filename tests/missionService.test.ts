import { beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
  docs: new Map<string, Record<string, any>>(), attempts: [] as Record<string, any>[],
  attemptSeq: 0, lock: Promise.resolve(),
}));
const snapshot = (data?: Record<string, any>) => ({ exists: !!data, data: () => data });
const db = {
  collection(name: string) {
    return {
      doc(id?: string) {
        const ref = { key: `${name}/${id ?? `auto-${++state.attemptSeq}`}` };
        return { ...ref, get: async () => snapshot(state.docs.get(ref.key)) };
      },
      where(field: string, _op: string, value: unknown) {
        const filters = [[field, value] as [string, unknown]];
        const query: any = { where: (f: string, _o: string, v: unknown) => { filters.push([f, v]); return query; } };
        query.get = async () => {
          const docs = state.attempts.filter((row) => filters.every(([f, v]) => row[f] === v)).map((row, i) => ({ id: String(i), data: () => row }));
          return { docs, size: docs.length, empty: !docs.length };
        };
        return query;
      },
    };
  },
  async runTransaction(fn: (tx: any) => Promise<unknown>) {
    let release!: () => void;
    const previous = state.lock;
    state.lock = new Promise<void>((resolve) => { release = resolve; });
    await previous;
    const tx = {
      async get(target: any) {
        if (target?.key) return snapshot(state.docs.get(target.key));
        const result = await target.get();
        return { ...result, docs: result.docs };
      },
      set(ref: any, value: Record<string, any>, options?: { merge?: boolean }) {
        if (ref.key.startsWith('missionAttempts/')) state.attempts.push(value);
        const old = state.docs.get(ref.key);
        state.docs.set(ref.key, options?.merge ? { ...old, ...value } : value);
      },
      update(ref: any, value: Record<string, any>) { state.docs.set(ref.key, { ...state.docs.get(ref.key), ...value }); },
    };
    try { return await fn(tx); } finally { release(); }
  },
};
vi.mock('../server/config/firebaseAdmin', () => ({ getDb: () => db }));
vi.mock('firebase-admin/firestore', () => ({ Timestamp: { now: () => 'now' } }));

import { createMissionAttempt, completeMission } from '../server/services/missionService';

const mission = { active: true, title: 'Teste', xpReward: 10, coinsReward: 5,
  steps: [{ options: [{ text: 'certo', correct: true }] }, { options: [{ text: 'certo', correct: true }] }] };
const studentId = 'student-1';
const missionId = 'mission-1';
const smKey = `studentMissions/${studentId}_${missionId}`;
const studentKey = `students/${studentId}`;
const missionKey = `missions/${missionId}`;
const coinKey = `coinTransactions/${studentId}_${missionId}`;
async function attempt(stepIndex: number, answer: string) {
  return createMissionAttempt(missionId, { studentId, stepIndex, answer, timeSpentSeconds: 1 });
}

beforeEach(() => {
  state.docs.clear(); state.attempts.length = 0; state.attemptSeq = 0; state.lock = Promise.resolve();
  state.docs.set(missionKey, mission);
  state.docs.set(studentKey, { active: true, currentXp: 0, coins: 0, level: 0, nextLevelXp: 500 });
});

describe('missionService progress and completion', () => {
  it('does not advance progress on incorrect answers', async () => {
    const result = await attempt(1, 'errado');
    expect(result.isCorrect).toBe(false);
    expect(result.missionProgress).toBe(0);
    expect(state.docs.get(smKey)?.progress).toBe(0);
  });

  it('counts repeated correct answers for the same step only once', async () => {
    expect((await attempt(0, 'certo')).missionProgress).toBe(50);
    expect((await attempt(0, 'certo')).missionProgress).toBe(50);
    expect(state.docs.get(smKey)?.completedAttempts).toBe(1);
  });

  it('rejects completion when an adulterated progress field masks a missing correct step', async () => {
    await attempt(0, 'certo');
    state.docs.set(smKey, { studentId, missionId, status: 'em_andamento', progress: 100 });
    await expect(completeMission(missionId, { studentId })).rejects.toThrow('acertar todas as etapas');
  });

  it('completes with every distinct step correct and concurrent retries do not duplicate rewards', async () => {
    await attempt(0, 'certo'); await attempt(1, 'certo');
    const results = await Promise.allSettled([
      completeMission(missionId, { studentId }), completeMission(missionId, { studentId }),
    ]);
    expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    expect(state.docs.get(studentKey)?.currentXp).toBe(10);
    expect(state.docs.get(studentKey)?.coins).toBe(5);
  });
});
