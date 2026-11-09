/**
 * server/middleware/auth.ts
 *
 * Middleware de autenticação Firebase. O usuário e seu escopo são carregados
 * exclusivamente do perfil ativo correspondente ao UID verificado no Firestore.
 */

import { Response, NextFunction } from 'express';
import { getAdminAuth, getDb } from '../config/firebaseAdmin';
import { AuthRequest, AuthUser, UserRole } from '../types/server';

const VALID_ROLES: UserRole[] = ['aluno', 'professor', 'coordenacao', 'admin'];

function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader) return null;
  const match = /^Bearer\s+(\S+)$/i.exec(authHeader);
  return match?.[1] || null;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = extractBearerToken(req.headers.authorization);
  if (!token) {
    res.status(401).json({ success: false, error: 'Autenticação obrigatória. Envie um Firebase ID Token.' });
    return;
  }

  let uid: string;
  try {
    const decodedToken = await getAdminAuth().verifyIdToken(token);
    uid = decodedToken.uid;
  } catch {
    res.status(401).json({ success: false, error: 'Token de autenticação inválido ou expirado.' });
    return;
  }

  try {
    const profiles = await getDb().collection('users').where('firebaseUid', '==', uid).limit(1).get();
    if (profiles.empty) {
      res.status(401).json({ success: false, error: 'Perfil de usuário ativo não encontrado.' });
      return;
    }

    const profileDoc = profiles.docs[0];
    const profile = profileDoc.data();
    if (profile.active !== true || !VALID_ROLES.includes(profile.role as UserRole)) {
      res.status(401).json({ success: false, error: 'Perfil de usuário ativo não encontrado.' });
      return;
    }

    const isAdmin = profile.role === 'admin';
    const schoolId = typeof profile.schoolId === 'string' && profile.schoolId.length > 0
      ? profile.schoolId
      : undefined;
    const classroomIds = Array.isArray(profile.classroomIds)
      && profile.classroomIds.every((id: unknown) => typeof id === 'string')
      ? profile.classroomIds as string[]
      : undefined;
    if ((!schoolId || !classroomIds) && !isAdmin) {
      res.status(401).json({ success: false, error: 'Perfil de usuário ativo não encontrado.' });
      return;
    }
    if (profile.role === 'aluno' && (typeof profile.studentId !== 'string' || !profile.studentId)) {
      res.status(401).json({ success: false, error: 'Perfil de usuário ativo não encontrado.' });
      return;
    }

    const user: AuthUser = {
      firebaseUid: uid,
      userId: profileDoc.id,
      email: typeof profile.email === 'string' ? profile.email : '',
      name: typeof profile.name === 'string' ? profile.name : '',
      role: profile.role as UserRole,
      schoolId: schoolId ?? '',
      classroomIds: classroomIds ?? [],
      ...(typeof profile.studentId === 'string' ? { studentId: profile.studentId } : {}),
    };
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

/** Garante que o middleware de autenticação tenha autenticado a requisição. */
export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user) {
    res.status(401).json({ success: false, error: 'Autenticação obrigatória.' });
    return;
  }
  next();
}
