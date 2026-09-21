/**
 * server/routes/students.ts
 */

import { Router, Response } from 'express';
import { AuthRequest } from '../types/server';
import { authMiddleware } from '../middleware/auth';
import { requireRole, requireOwnStudent } from '../middleware/requireRole';
import { validatePayload, createStudentSchema, masterySchema, diagnosticSchema } from '../validators/schemas';
import {
  listStudents,
  getStudent,
  createStudent,
  getStudentAbilities,
  getStudentHistoryLog,
  confirmAbilityMastery,
  updateStudentDiagnosticCompleted,
  addHistoryLog,
} from '../services/studentService';
import { getDb } from '../config/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';

export const studentsRouter = Router();

// GET /api/students
studentsRouter.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { schoolId, classroomId, status } = req.query as Record<string, string>;
    
    // Professores e coordenação podem filtrar; alunos só veem a si mesmos
    const filters = req.user?.role === 'aluno'
      ? { schoolId: req.user.schoolId }
      : { schoolId, classroomId, status };

    const students = await listStudents(filters);
    res.json({ success: true, data: students, total: students.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    console.error('[Students] GET /students:', message);
    res.status(500).json({ success: false, error: message });
  }
});

// GET /api/students/:studentId
studentsRouter.get('/:studentId', authMiddleware, requireOwnStudent, async (req: AuthRequest, res: Response) => {
  try {
    const { studentId } = req.params;
    const student = await getStudent(studentId);

    if (!student) {
      return res.status(404).json({ success: false, error: `Estudante ${studentId} não encontrado` });
    }

    // Busca dados relacionados
    const [abilities, historyLog] = await Promise.all([
      getStudentAbilities(studentId),
      getStudentHistoryLog(studentId, 10),
    ]);

    res.json({
      success: true,
      data: {
        ...student,
        abilities,
        historyLog,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});

// POST /api/students
studentsRouter.post('/', authMiddleware, requireRole('professor', 'coordenacao', 'admin'), async (req: AuthRequest, res: Response) => {
  try {
    const validation = validatePayload(createStudentSchema, req.body);
    if (!validation.success) {
      return res.status(400).json({ success: false, error: 'Payload inválido', errors: validation.errors });
    }

    const student = await createStudent({
      ...validation.data,
      schoolId: req.user?.schoolId || 'escola-01',
      classroomId: req.user?.classroomIds?.[0] || 'turma-5a',
      teacherName: req.user?.name || 'Professor',
    });

    res.status(201).json({ success: true, data: student });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});

// GET /api/students/:studentId/abilities
studentsRouter.get('/:studentId/abilities', authMiddleware, requireOwnStudent, async (req: AuthRequest, res: Response) => {
  try {
    const abilities = await getStudentAbilities(req.params.studentId);
    res.json({ success: true, data: abilities });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});

// POST /api/students/:studentId/abilities/:abilityId/mastery
studentsRouter.post(
  '/:studentId/abilities/:abilityId/mastery',
  authMiddleware,
  requireRole('professor', 'coordenacao', 'admin'),
  async (req: AuthRequest, res: Response) => {
    try {
      const { studentId, abilityId } = req.params;
      
      const validation = validatePayload(masterySchema, req.body);
      if (!validation.success) {
        return res.status(400).json({ success: false, error: 'Payload inválido', errors: validation.errors });
      }

      await confirmAbilityMastery(
        studentId,
        abilityId,
        validation.data.evidence as Record<string, string>,
        req.user?.name
      );

      res.json({
        success: true,
        message: `Domínio de ${abilityId} confirmado para ${studentId}`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro interno';
      const status = message.includes('não encontrada') ? 404
        : message.includes('já confirmada') ? 409
        : 500;
      res.status(status).json({ success: false, error: message });
    }
  }
);

// POST /api/students/:studentId/diagnostics
studentsRouter.post(
  '/:studentId/diagnostics',
  authMiddleware,
  requireRole('professor', 'coordenacao', 'admin'),
  async (req: AuthRequest, res: Response) => {
    try {
      const { studentId } = req.params;

      const validation = validatePayload(diagnosticSchema, req.body);
      if (!validation.success) {
        return res.status(400).json({ success: false, error: 'Payload inválido', errors: validation.errors });
      }

      // Verifica que o estudante existe
      const student = await getStudent(studentId);
      if (!student) {
        return res.status(404).json({ success: false, error: `Estudante ${studentId} não encontrado` });
      }

      const db = getDb();
      const now = Timestamp.now();

      // Salva diagnóstico
      const diagRef = db.collection('diagnostics').doc(`diag-${studentId}-${Date.now()}`);
      await diagRef.set({
        studentId,
        abilityId: validation.data.abilityId,
        answers: validation.data.answers,
        score: validation.data.score || 0,
        status: 'concluido',
        completedAt: now,
        createdBy: req.user?.userId,
        createdAt: now,
        updatedAt: now,
      });

      // Marca diagnóstico como concluído no estudante
      await updateStudentDiagnosticCompleted(studentId);

      // Registra histórico
      await addHistoryLog(studentId, {
        action: 'Diagnóstico concluído',
        detail: `Diagnóstico realizado por ${req.user?.name || 'professor'}`,
      });

      res.status(201).json({
        success: true,
        data: { diagnosticId: diagRef.id, studentId, status: 'concluido' },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro interno';
      res.status(500).json({ success: false, error: message });
    }
  }
);

// GET /api/students/:studentId/history
studentsRouter.get('/:studentId/history', authMiddleware, requireOwnStudent, async (req: AuthRequest, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const logs = await getStudentHistoryLog(req.params.studentId, limit);
    res.json({ success: true, data: logs });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro interno';
    res.status(500).json({ success: false, error: message });
  }
});
