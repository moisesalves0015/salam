/**
 * server/routes/missions.ts
 */

import { Router, Response } from 'express';
import { AuthRequest } from '../types/server';
import { authMiddleware } from '../middleware/auth';
import { validatePayload, missionAttemptSchema, completeMissionSchema } from '../validators/schemas';
import { listMissions, getMission, createMissionAttempt, completeMission, getStudentMissions } from '../services/missionService';

export const missionsRouter = Router();

// GET /api/missions
missionsRouter.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { trailId, subject } = req.query as Record<string, string>;
    const missions = await listMissions({ trailId, subject });
    res.json({ success: true, data: missions, total: missions.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});

// GET /api/missions/:missionId
missionsRouter.get('/:missionId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const mission = await getMission(req.params.missionId);
    if (!mission) {
      return res.status(404).json({ success: false, error: 'Missão não encontrada' });
    }
    res.json({ success: true, data: mission });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});

// POST /api/missions/:missionId/attempts
missionsRouter.post('/:missionId/attempts', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const validation = validatePayload(missionAttemptSchema, req.body);
    if (!validation.success) {
      return res.status(400).json({ success: false, error: 'Payload inválido', errors: validation.errors });
    }

    // Alunos só podem registrar tentativas para si mesmos
    if (req.user?.role === 'aluno' && req.user.studentId !== validation.data.studentId) {
      return res.status(403).json({ success: false, error: 'Alunos só podem registrar tentativas para si mesmos.' });
    }

    const result = await createMissionAttempt(req.params.missionId, validation.data);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    const status = message.includes('não encontrada') || message.includes('inválido') ? 400 : 500;
    res.status(status).json({ success: false, error: message });
  }
});

// POST /api/missions/:missionId/complete
missionsRouter.post('/:missionId/complete', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const validation = validatePayload(completeMissionSchema, req.body);
    if (!validation.success) {
      return res.status(400).json({ success: false, error: 'Payload inválido', errors: validation.errors });
    }

    // Alunos só podem concluir missões para si mesmos
    if (req.user?.role === 'aluno' && req.user.studentId !== validation.data.studentId) {
      return res.status(403).json({ success: false, error: 'Alunos só podem concluir missões para si mesmos.' });
    }

    const result = await completeMission(req.params.missionId, validation.data);
    res.json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    const status = message.includes('não encontrada') ? 404
      : message.includes('já foi concluída') ? 409
      : 500;
    res.status(status).json({ success: false, error: message });
  }
});

// GET /api/missions/student/:studentId
missionsRouter.get('/student/:studentId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const missions = await getStudentMissions(req.params.studentId);
    res.json({ success: true, data: missions });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});
