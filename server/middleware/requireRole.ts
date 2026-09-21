/**
 * server/middleware/requireRole.ts
 * 
 * Middleware de autorização por papel (role-based access control).
 * 
 * Uso:
 *   router.post('/admin/seed', authMiddleware, requireRole('coordenacao', 'admin'), handler)
 */

import { Response, NextFunction } from 'express';
import { AuthRequest, UserRole } from '../types/server';

/**
 * Factory que retorna um middleware que autoriza apenas os roles especificados.
 * Deve ser usado DEPOIS do authMiddleware.
 */
export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user;

    // Sem usuário autenticado → 401
    if (!user) {
      res.status(401).json({
        success: false,
        error: 'Não autenticado.',
      });
      return;
    }

    // Role não autorizado → 403
    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({
        success: false,
        error: `Acesso negado. Apenas [${allowedRoles.join(', ')}] podem acessar este recurso. Seu papel: ${user.role}`,
      });
      return;
    }

    next();
  };
}

/**
 * Garante que um aluno só acessa seus próprios dados.
 * Compara req.params.studentId com req.user.studentId.
 */
export function requireOwnStudent(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const user = req.user;
  const { studentId } = req.params;

  if (!user) {
    res.status(401).json({ success: false, error: 'Não autenticado.' });
    return;
  }

  // Coordenação e professor têm acesso a todos
  if (user.role === 'coordenacao' || user.role === 'professor' || user.role === 'admin') {
    return next();
  }

  // Aluno só acessa seus próprios dados
  if (user.role === 'aluno' && user.studentId !== studentId) {
    res.status(403).json({
      success: false,
      error: 'Alunos só podem acessar seus próprios dados.',
    });
    return;
  }

  next();
}
