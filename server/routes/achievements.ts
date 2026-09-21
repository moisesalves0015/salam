/**
 * server/routes/achievements.ts
 */

import { Router, Response } from 'express';
import { AuthRequest } from '../types/server';
import { authMiddleware } from '../middleware/auth';
import { getDb } from '../config/firebaseAdmin';

export const achievementsRouter = Router();

// GET /api/achievements — catálogo completo
achievementsRouter.get('/', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    const db = getDb();
    const snap = await db.collection('achievements').where('active', '==', true).get();
    const achievements = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    res.json({ success: true, data: achievements, total: achievements.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});

// GET /api/achievements/student/:studentId
achievementsRouter.get('/student/:studentId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;

    if (req.user?.role === 'aluno' && req.user.studentId !== studentId) {
      return res.status(403).json({ success: false, error: 'Acesso negado.' });
    }

    const db = getDb();
    const snap = await db
      .collection('studentAchievements')
      .where('studentId', '==', studentId)
      .get();

    const studentAchs = snap.docs.map((d) => d.data());
    const achIds = studentAchs.map((sa) => sa.achievementId as string);

    const achDetails: Record<string, object> = {};
    for (let i = 0; i < achIds.length; i += 10) {
      const chunk = achIds.slice(i, i + 10);
      if (chunk.length === 0) continue;
      const achSnap = await db.collection('achievements').where('__name__', 'in', chunk).get();
      achSnap.docs.forEach((d) => { achDetails[d.id] = { id: d.id, ...d.data() }; });
    }

    const result = studentAchs.map((sa) => ({
      ...achDetails[sa.achievementId as string],
      unlocked: true,
      unlockedAt: sa.unlockedAt,
    }));

    res.json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});
