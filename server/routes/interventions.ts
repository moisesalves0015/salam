/**
 * server/routes/interventions.ts
 */

import { Router, Response } from 'express';
import { AuthRequest } from '../types/server';
import { authMiddleware } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';
import { validatePayload, interventionSchema } from '../validators/schemas';
import { listInterventions, getIntervention, createIntervention, updateIntervention } from '../services/interventionService';

export const interventionsRouter = Router();

// GET /api/interventions
interventionsRouter.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { studentId, status } = req.query as Record<string, string>;
    const filters = req.user?.role === 'aluno'
      ? { studentId: req.user.studentId }
      : { studentId, status };

    const interventions = await listInterventions(filters);
    res.json({ success: true, data: interventions, total: interventions.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});

// GET /api/interventions/:id
interventionsRouter.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const intervention = await getIntervention(req.params.id);
    if (!intervention) {
      return res.status(404).json({ success: false, error: 'Intervenção não encontrada' });
    }

    // Aluno só vê suas próprias intervenções
    if (req.user?.role === 'aluno' && intervention.studentId !== req.user.studentId) {
      return res.status(403).json({ success: false, error: 'Acesso negado.' });
    }

    res.json({ success: true, data: intervention });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});

// POST /api/interventions
interventionsRouter.post(
  '/',
  authMiddleware,
  requireRole('professor', 'coordenacao', 'admin'),
  async (req: AuthRequest, res: Response) => {
    try {
      const validation = validatePayload(interventionSchema, req.body);
      if (!validation.success) {
        return res.status(400).json({ success: false, error: 'Payload inválido', errors: validation.errors });
      }

      const intervention = await createIntervention(validation.data, req.user?.userId);
      res.status(201).json({ success: true, data: intervention });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro interno';
      const status = message.includes('não encontrado') ? 404 : 500;
      res.status(status).json({ success: false, error: message });
    }
  }
);

// PUT /api/interventions/:id
interventionsRouter.put(
  '/:id',
  authMiddleware,
  requireRole('professor', 'coordenacao', 'admin'),
  async (req: AuthRequest, res: Response) => {
    try {
      const { status, newAttemptResult, nextStep, interventionApplied } = req.body;
      const updated = await updateIntervention(req.params.id, {
        status,
        newAttemptResult,
        nextStep,
        interventionApplied,
      });
      res.json({ success: true, data: updated });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro interno';
      const status = message.includes('não encontrada') ? 404 : 500;
      res.status(status).json({ success: false, error: message });
    }
  }
);
