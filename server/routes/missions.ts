/**
 * server/routes/missions.ts
 */
import { Router, Response } from 'express';
import { AuthRequest } from '../types/server';
import { authMiddleware } from '../middleware/auth';
import { requireOwnStudent } from '../middleware/requireRole';
import { validatePayload, missionAttemptSchema, completeMissionSchema } from '../validators/schemas';
import { listMissions, listStudentMissions, getMission, createMissionAttempt, completeMission } from '../services/missionService';

export const missionsRouter = Router();

missionsRouter.get('/', authMiddleware, async (req: AuthRequest, res: Response, next) => {
  const studentId = typeof req.query.studentId === 'string' ? req.query.studentId : undefined;
  if (studentId) {
    req.params.studentId = studentId;
    return requireOwnStudent(req, res, next);
  }
  return next();
}, async (req: AuthRequest, res: Response) => {
  try {
    const { trailId, subject } = req.query as Record<string, string>;
    const studentId = typeof req.query.studentId === 'string' ? req.query.studentId : undefined;
    const missions = studentId ? await listStudentMissions(studentId, { trailId, subject }) : await listMissions({ trailId, subject, active: true });
    res.json({ success: true, data: missions, total: missions.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});

missionsRouter.get('/:missionId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const mission = await getMission(req.params.missionId);
    if (!mission || mission.active !== true) return res.status(404).json({ success: false, error: 'Missão não encontrada ou inativa' });
    res.json({ success: true, data: mission });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});

missionsRouter.post('/:missionId/attempts', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'aluno') return res.status(403).json({ success: false, error: 'Acesso negado.' });
    const validation = validatePayload(missionAttemptSchema, req.body);
    if (!validation.success) return res.status(400).json({ success: false, error: 'Payload inválido', errors: validation.errors });
    if (req.user.studentId !== validation.data.studentId) return res.status(403).json({ success: false, error: 'Acesso negado.' });
    const result = await createMissionAttempt(req.params.missionId, validation.data);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    const status = message.includes('não encontrada') || message.includes('inativa') || message.includes('inválido') ? 400 : 500;
    res.status(status).json({ success: false, error: message });
  }
});

missionsRouter.post('/:missionId/complete', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'aluno') return res.status(403).json({ success: false, error: 'Acesso negado.' });
    const validation = validatePayload(completeMissionSchema, req.body);
    if (!validation.success) return res.status(400).json({ success: false, error: 'Payload inválido', errors: validation.errors });
    if (req.user.studentId !== validation.data.studentId) return res.status(403).json({ success: false, error: 'Acesso negado.' });
    if ((validation.data.reflection?.length ?? 0) > 4000) return res.status(400).json({ success: false, error: 'Payload inválido' });
    const result = await completeMission(req.params.missionId, validation.data);
    res.json({ success: true, data: result });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    const status = message.includes('não encontrada') || message.includes('inativa') ? 404
      : message.includes('já foi concluída') || message.includes('inconsistente') ? 409
      : message.includes('acertar todas') || message.includes('insuficiente') || message.includes('sem etapas') || message.includes('Recompensas') ? 400
      : 500;
    res.status(status).json({ success: false, error: message });
  }
});

missionsRouter.get('/student/:studentId', authMiddleware, requireOwnStudent, async (req: AuthRequest, res: Response) => {
  try {
    const missions = await listStudentMissions(req.params.studentId);
    res.json({ success: true, data: missions });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});
