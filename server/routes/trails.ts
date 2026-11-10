import { Router, type Response } from 'express';
import { getDb } from '../config/firebaseAdmin';
import { authMiddleware } from '../middleware/auth';
import type { AuthRequest } from '../types/server';

export const trailsRouter = Router();

trailsRouter.get('/', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    const snapshot = await getDb().collection('trails').get();
    const trails = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((t: any) => t.active !== false)
      .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
    res.json({ success: true, data: trails, total: trails.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao carregar trilhas.';
    console.error('[Trails] Falha ao listar catálogo:', message);
    res.status(500).json({ success: false, error: 'Falha ao carregar o catálogo de trilhas.' });
  }
});

trailsRouter.get('/curriculum', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    const snapshot = await getDb().collection('curriculumTracks').get();
    const tracks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, data: tracks, total: tracks.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao carregar trilhas curriculares.';
    console.error('[Trails] Falha ao listar trilhas curriculares:', message);
    res.status(500).json({ success: false, error: 'Falha ao carregar trilhas curriculares.' });
  }
});

