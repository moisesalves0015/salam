/**
 * server/routes/rewards.ts
 */

import { Router, Response } from 'express';
import { AuthRequest } from '../types/server';
import { authMiddleware } from '../middleware/auth';
import { validatePayload, redeemRewardSchema } from '../validators/schemas';
import { getDb } from '../config/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import { addCoinsToStudent, addHistoryLog } from '../services/studentService';

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
    const { rewardId } = req.params;
    const validation = validatePayload(redeemRewardSchema, req.body);
    if (!validation.success) {
      return res.status(400).json({ success: false, error: 'Payload inválido', errors: validation.errors });
    }

    const { studentId } = validation.data;

    // Alunos só podem resgatar para si mesmos
    if (req.user?.role === 'aluno' && req.user.studentId !== studentId) {
      return res.status(403).json({ success: false, error: 'Alunos só podem resgatar para si mesmos.' });
    }

    const db = getDb();

    // Busca recompensa
    const rewardDoc = await db.collection('rewards').doc(rewardId).get();
    if (!rewardDoc.exists) {
      return res.status(404).json({ success: false, error: 'Recompensa não encontrada' });
    }

    const reward = rewardDoc.data()!;
    if (reward.availability === 'esgotado') {
      return res.status(409).json({ success: false, error: 'Recompensa esgotada.' });
    }

    // Busca saldo do estudante
    const studentDoc = await db.collection('students').doc(studentId).get();
    if (!studentDoc.exists) {
      return res.status(404).json({ success: false, error: 'Estudante não encontrado.' });
    }

    const student = studentDoc.data()!;
    if ((student.coins || 0) < reward.cost) {
      return res.status(422).json({
        success: false,
        error: `Saldo insuficiente. Necessário: ${reward.cost} moedas. Disponível: ${student.coins || 0}`,
      });
    }

    const now = Timestamp.now();

    // Debita moedas e registra redemption em transação
    await db.runTransaction(async (tx) => {
      const studentRef = db.collection('students').doc(studentId);
      tx.update(studentRef, {
        coins: (student.coins || 0) - reward.cost,
        updatedAt: now,
      });

      const redemptionRef = db.collection('redemptions').doc();
      tx.set(redemptionRef, {
        studentId,
        rewardId,
        cost: reward.cost,
        status: 'pendente',
        redeemedAt: now,
        createdAt: now,
        updatedAt: now,
      });

      // Registra transação de moedas
      const coinRef = db.collection('coinTransactions').doc();
      tx.set(coinRef, {
        studentId,
        type: 'spent',
        amount: reward.cost,
        reason: `Resgate: ${reward.name}`,
        rewardId,
        createdAt: now,
      });
    });

    await addHistoryLog(studentId, {
      action: 'Recompensa resgatada',
      detail: `Resgatou "${reward.name}" por ${reward.cost} moedas`,
      metadata: { rewardId, cost: reward.cost },
    });

    res.status(201).json({
      success: true,
      data: {
        rewardId,
        rewardName: reward.name,
        cost: reward.cost,
        status: 'pendente',
        remainingCoins: (student.coins || 0) - reward.cost,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});
