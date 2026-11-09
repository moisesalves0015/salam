/**
 * server/middleware/requireRole.ts
 *
 * Middleware de autorização por papel e escopo confiável do perfil.
 * Uso: router.post('/admin/seed', authMiddleware, requireRole('coordenacao', 'admin'), handler)
 */

import { Response, NextFunction } from 'express';
import { getDb } from '../config/firebaseAdmin';
import { AuthRequest, UserRole } from '../types/server';

/** Autoriza os papéis especificados; administradores são globais. */
export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user;
    if (!user) {
      res.status(401).json({ success: false, error: 'Não autenticado.' });
      return;
    }
    if (user.role === 'admin') {
      next();
      return;
    }
    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({
        success: false,
        error: `Acesso negado. Apenas [${allowedRoles.join(', ')}] podem acessar este recurso.`,
      });
      return;
    }

    // Quando a requisição identifica explicitamente uma escola, coordenação
    // só pode operar dentro da escola registrada em seu perfil.
    if (user.role === 'coordenacao') {
      const requestedSchoolId = req.params.schoolId
        ?? (typeof req.query.schoolId === 'string' ? req.query.schoolId : undefined)
        ?? (typeof req.body?.schoolId === 'string' ? req.body.schoolId : undefined);
      if (requestedSchoolId && requestedSchoolId !== user.schoolId) {
        res.status(403).json({ success: false, error: 'Acesso permitido somente à própria escola.' });
        return;
      }
    }
    next();
  };
}

/** Verifica no Firestore a existência e o escopo do estudante solicitado. */
export async function requireOwnStudent(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user = req.user;
  if (!user) {
    res.status(401).json({ success: false, error: 'Não autenticado.' });
    return;
  }

  const { studentId } = req.params;
  if (!studentId) {
    res.status(404).json({ success: false, error: 'Estudante não encontrado.' });
    return;
  }

  try {
    const studentDoc = await getDb().collection('students').doc(studentId).get();
    if (!studentDoc.exists) {
      res.status(404).json({ success: false, error: 'Estudante não encontrado.' });
      return;
    }
    const student = studentDoc.data();
    if (!student) {
      res.status(404).json({ success: false, error: 'Estudante não encontrado.' });
      return;
    }

    if (user.role === 'admin') {
      next();
      return;
    }
    if (user.role === 'aluno') {
      if (user.studentId === studentId) {
        next();
        return;
      }
      res.status(403).json({ success: false, error: 'Alunos só podem acessar seus próprios dados.' });
      return;
    }
    if (user.role === 'coordenacao') {
      if (student.schoolId === user.schoolId) {
        next();
        return;
      }
      res.status(403).json({ success: false, error: 'Acesso permitido somente a estudantes da própria escola.' });
      return;
    }
    if (user.role === 'professor') {
      if (student.schoolId === user.schoolId
        && typeof student.classroomId === 'string'
        && user.classroomIds.includes(student.classroomId)) {
        next();
        return;
      }
      res.status(403).json({ success: false, error: 'Acesso permitido somente a estudantes das suas turmas e escola.' });
      return;
    }

    res.status(403).json({ success: false, error: 'Acesso negado.' });
  } catch (err) {
    next(err);
  }
}
