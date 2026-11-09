/** Rotas administrativas de métricas, sempre limitadas ao escopo da sessão. */
import { Router, Response } from 'express';
import { AuthRequest } from '../types/server';
import { authMiddleware } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';
import { calculateClassMetrics } from '../services/metricsService';

export const adminRouter = Router();
adminRouter.get('/metrics', authMiddleware, requireRole('professor', 'coordenacao', 'admin'), async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ success: false, error: 'Não autenticado.' });
    const classroomId = typeof req.query.classroomId === 'string' ? req.query.classroomId : undefined;
    if (user.role === 'admin') {
      const schoolId = typeof req.query.schoolId === 'string' ? req.query.schoolId : undefined;
      const metrics = await calculateClassMetrics({ schoolId, classroomId });
      return res.json({ success: true, data: metrics });
    }
    if (!user.schoolId) return res.status(403).json({ success: false, error: 'Escopo de escola ausente.' });
    if (user.role === 'coordenacao') {
      const metrics = await calculateClassMetrics({ schoolId: user.schoolId, classroomId });
      return res.json({ success: true, data: metrics });
    }
    if (user.role !== 'professor') return res.status(403).json({ success: false, error: 'Acesso negado.' });
    const classroomIds = [...new Set(user.classroomIds || [])].filter(Boolean);
    if (classroomId && !classroomIds.includes(classroomId)) {
      return res.status(403).json({ success: false, error: 'Acesso permitido somente às suas turmas.' });
    }
    const metrics = await calculateClassMetrics({ schoolId: user.schoolId, classroomId, classroomIds });
    return res.json({ success: true, data: metrics });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});
