import { Router, Response } from 'express';
import { AuthRequest } from '../types/server';
import { authMiddleware } from '../middleware/auth';
import { validatePayload, redeemRewardSchema } from '../validators/schemas';
import { getDb } from '../config/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import { addHistoryLog } from '../services/studentService';

export const rewardsRouter = Router();

// GET /api/rewards
rewardsRouter.get('/', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    const db = getDb();
    const snap = await db.collection('rewards').where('active', '==', true).get();
    const rewards = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json({ success: true, data: rewards, total: rewards.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});

// POST /api/rewards/:rewardId/redeem
rewardsRouter.post('/:rewardId/redeem', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    // Resgates só podem ser solicitados pelo próprio perfil de estudante ativo.
    if (!user || user.role !== 'aluno' || !user.studentId) {
      return res.status(403).json({ success: false, error: 'Somente o próprio estudante pode solicitar resgate.' });
    }
    const validation = validatePayload(redeemRewardSchema, req.body);
    if (!validation.success) {
      return res.status(422).json({ success: false, error: 'Payload inválido', errors: validation.errors });
    }
    const { rewardId } = req.params;
    if (validation.data.studentId !== user.studentId) {
      return res.status(403).json({ success: false, error: 'Estudantes só podem resgatar para si mesmos.' });
    }

    const db = getDb();
    const studentRef = db.collection('students').doc(user.studentId);
    const rewardRef = db.collection('rewards').doc(rewardId);
    const now = Timestamp.now();
    const redemptionRef = db.collection('redemptions').doc();
    const coinRef = db.collection('coinTransactions').doc();

    const result = await db.runTransaction(async (tx) => {
      // Transaction reads are authoritative; no balance/catalog values are read outside.
      const [rewardDoc, studentDoc] = await Promise.all([tx.get(rewardRef), tx.get(studentRef)]);
      if (!rewardDoc.exists) return { kind: 'reward-not-found' as const };
      if (!studentDoc.exists) return { kind: 'student-not-found' as const };
      const reward = rewardDoc.data()!;
      const student = studentDoc.data()!;
      if (reward.active !== true) return { kind: 'reward-not-found' as const };
      if (student.active !== true) return { kind: 'student-inactive' as const };
      if (typeof reward.cost !== 'number' || !Number.isFinite(reward.cost) || !Number.isInteger(reward.cost) || reward.cost < 0) {
        return { kind: 'invalid-reward' as const };
      }
      const cost: number = reward.cost;
      const balance = student.coins;
      if (typeof balance !== 'number' || !Number.isFinite(balance) || balance < cost) {
        return { kind: 'insufficient' as const, balance: typeof balance === 'number' && Number.isFinite(balance) ? balance : 0, cost };
      }
      if (reward.availability === 'esgotado') return { kind: 'out-of-stock' as const };
      const stockFields = ['quantity', 'stock'].filter((field) => typeof reward[field] === 'number');
      if (stockFields.some((field) => !Number.isFinite(reward[field]) || reward[field] < 0)) {
        return { kind: 'invalid-reward' as const };
      }
      if (stockFields.some((field) => reward[field] <= 0)) return { kind: 'out-of-stock' as const };

      tx.update(studentRef, { coins: balance - cost, updatedAt: now });
      if (stockFields.length > 0) {
        const updates: Record<string, unknown> = {};
        for (const field of stockFields) updates[field] = reward[field] - 1;
        if (stockFields.some((field) => reward[field] - 1 === 0)) updates.availability = 'esgotado';
        tx.update(rewardRef, updates as FirebaseFirestore.UpdateData<FirebaseFirestore.DocumentData>);
      }
      tx.set(redemptionRef, {
        studentId: user.studentId!, rewardId, cost, status: 'pendente',
        redeemedAt: now, createdAt: now, updatedAt: now,
      });
      tx.set(coinRef, {
        studentId: user.studentId!, type: 'spent', amount: cost,
        reason: `Resgate: ${typeof reward.name === 'string' ? reward.name : ''}`,
        rewardId, createdAt: now,
      });
      return { kind: 'success' as const, rewardName: reward.name, cost, remainingCoins: balance - cost };
    });

    if (result.kind === 'reward-not-found') return res.status(404).json({ success: false, error: 'Recompensa não encontrada' });
    if (result.kind === 'student-not-found') return res.status(404).json({ success: false, error: 'Estudante não encontrado.' });
    if (result.kind === 'student-inactive') return res.status(403).json({ success: false, error: 'Estudante inativo.' });
    if (result.kind === 'out-of-stock') return res.status(409).json({ success: false, error: 'Recompensa esgotada.' });
    if (result.kind === 'invalid-reward') return res.status(422).json({ success: false, error: 'Dados da recompensa inválidos.' });
    if (result.kind === 'insufficient') {
      return res.status(422).json({ success: false, error: `Saldo insuficiente. Necessário: ${result.cost} moedas. Disponível: ${result.balance}` });
    }

    await addHistoryLog(user.studentId, {
      action: 'Recompensa resgatada',
      detail: `Resgatou "${result.rewardName}" por ${result.cost} moedas`,
      metadata: { rewardId, cost: result.cost },
    });
    return res.status(201).json({
      success: true,
      data: { rewardId, rewardName: result.rewardName, cost: result.cost, status: 'pendente', remainingCoins: result.remainingCoins },
    });
  } catch (err) {
    const code = (err as { code?: number | string } | null)?.code;
    if (code === 10 || code === '10' || code === 'aborted') {
      return res.status(409).json({ success: false, error: 'Conflito ao processar o resgate. Tente novamente.' });
    }
    const message = err instanceof Error ? err.message : 'Erro interno';
    return res.status(500).json({ success: false, error: message });
  }
});
