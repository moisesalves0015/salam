/**
 * server/routes/admin.ts
 * 
 * Endpoints administrativos: seed/migração, rollback e métricas.
 */

import { Router, Response } from 'express';
import { AuthRequest } from '../types/server';
import { authMiddleware } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';
import { validatePayload, seedRequestSchema, rollbackSchema } from '../validators/schemas';
import {
  executeSeed,
  createMigrationRun,
  getMigrationRun,
} from '../services/seedService';
import { calculateClassMetrics } from '../services/metricsService';

export const adminRouter = Router();

// ─── POST /api/admin/seed ─────────────────────────────────────────────────────

adminRouter.post(
  '/seed',
  authMiddleware,
  requireRole('coordenacao', 'admin'),
  async (req: AuthRequest, res: Response) => {
    try {
      const validation = validatePayload(seedRequestSchema, req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Payload inválido',
          errors: validation.errors,
        });
      }

      const payload = validation.data;

      // Cria migration run (verifica idempotência do requestId)
      let runId: string;
      try {
        runId = await createMigrationRun({
          requestId: payload.requestId,
          source: payload.source,
          entities: payload.entities,
          mode: payload.mode,
          dryRun: payload.dryRun,
          createdBy: req.user?.userId,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        // requestId duplicado → 409
        if (message.includes('já foi executado') || message.includes('em execução')) {
          return res.status(409).json({ success: false, error: message });
        }
        throw err;
      }

      // Para dry-run: executa inline e retorna resultado completo
      if (payload.dryRun) {
        const progress = await executeSeed({
          entities: payload.entities,
          mode: payload.mode,
          dryRun: true,
          requestId: payload.requestId,
          runId,
        });

        return res.json({
          success: true,
          dryRun: true,
          migrationRunId: runId,
          progress,
        });
      }

      // Para execução real: processa em background e retorna 202 imediatamente
      res.status(202).json({
        success: true,
        dryRun: false,
        migrationRunId: runId,
        message: 'Migração iniciada. Acompanhe em GET /api/admin/seed/:migrationRunId',
      });

      // Executa de forma assíncrona (sem await no response)
      executeSeed({
        entities: payload.entities,
        mode: payload.mode,
        dryRun: false,
        requestId: payload.requestId,
        runId,
      }).catch((err) => {
        console.error('[Admin/Seed] Erro na execução assíncrona:', err);
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro interno';
      console.error('[Admin/Seed] POST /seed:', message);
      res.status(500).json({ success: false, error: message });
    }
  }
);

// ─── GET /api/admin/seed/:migrationRunId ──────────────────────────────────────

adminRouter.get(
  '/seed/:migrationRunId',
  authMiddleware,
  requireRole('coordenacao', 'admin'),
  async (req: AuthRequest, res: Response) => {
    try {
      const run = await getMigrationRun(req.params.migrationRunId);
      if (!run) {
        return res.status(404).json({ success: false, error: 'Migration run não encontrado.' });
      }
      res.json({ success: true, data: run });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro interno';
      res.status(500).json({ success: false, error: message });
    }
  }
);

// ─── POST /api/admin/seed/rollback ───────────────────────────────────────────

adminRouter.post(
  '/seed/rollback',
  authMiddleware,
  requireRole('admin'),
  async (req: AuthRequest, res: Response) => {
    try {
      const validation = validatePayload(rollbackSchema, req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Payload inválido. Rollback requer confirmed: true.',
          errors: validation.errors,
        });
      }

      // Rollback não está implementado automaticamente por segurança.
      // Em produção, recomenda-se export + import manual ou Firestore backups.
      res.json({
        success: false,
        error: 'Rollback automático não implementado por segurança. ' +
          'Use o Firebase Console ou Firestore backups para restauração manual.',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro interno';
      res.status(500).json({ success: false, error: message });
    }
  }
);

// ─── GET /api/admin/metrics ───────────────────────────────────────────────────

adminRouter.get(
  '/metrics',
  authMiddleware,
  requireRole('professor', 'coordenacao', 'admin'),
  async (req: AuthRequest, res: Response) => {
    try {
      const { schoolId, classroomId } = req.query as Record<string, string>;
      const metrics = await calculateClassMetrics({ schoolId, classroomId });
      res.json({ success: true, data: metrics });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro interno';
      res.status(500).json({ success: false, error: message });
    }
  }
);
