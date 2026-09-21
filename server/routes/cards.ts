/**
 * server/routes/cards.ts
 */

import { Router, Response } from 'express';
import { AuthRequest } from '../types/server';
import { authMiddleware } from '../middleware/auth';
import { getDb } from '../config/firebaseAdmin';

export const cardsRouter = Router();

// GET /api/cards — lista todos os cards do catálogo
cardsRouter.get('/', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    const db = getDb();
    const snap = await db.collection('cards').where('active', '==', true).get();
    const cards = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json({ success: true, data: cards, total: cards.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});

// GET /api/cards/student/:studentId — cards desbloqueados por um estudante
cardsRouter.get('/student/:studentId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;

    // Alunos só veem os próprios cards
    if (req.user?.role === 'aluno' && req.user.studentId !== studentId) {
      return res.status(403).json({ success: false, error: 'Acesso negado.' });
    }

    const db = getDb();
    const snap = await db
      .collection('studentCards')
      .where('studentId', '==', studentId)
      .get();

    const studentCards = snap.docs.map((d) => d.data());

    // Busca detalhes dos cards
    const cardIds = studentCards.map((sc) => sc.cardId as string);
    const cardDetails: Record<string, object> = {};

    // Busca em lotes de 10 (limite do Firestore para 'in')
    for (let i = 0; i < cardIds.length; i += 10) {
      const chunk = cardIds.slice(i, i + 10);
      if (chunk.length === 0) continue;
      const cardsSnap = await db.collection('cards').where('__name__', 'in', chunk).get();
      cardsSnap.docs.forEach((d) => { cardDetails[d.id] = { id: d.id, ...d.data() }; });
    }

    const result = studentCards.map((sc) => ({
      ...cardDetails[sc.cardId as string],
      unlocked: true,
      unlockedAt: sc.unlockedAt,
    }));

    res.json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});
