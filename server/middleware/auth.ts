/**
 * server/middleware/auth.ts
 * 
 * Middleware de autenticação Firebase.
 * 
 * Verifica o Bearer token do header Authorization usando Firebase Admin Auth.
 * Em desenvolvimento com VITE_ENABLE_MOCK_FALLBACK=true, aceita um header
 * X-Mock-Role para facilitar testes sem Firebase Auth real.
 * 
 * NOTA: A implementação completa de Firebase Auth no frontend foi adiada.
 * Este middleware está preparado mas opera em modo "permissivo" por padrão
 * (não bloqueia rotas sem token) para não quebrar o frontend atual.
 * Quando AUTH_REQUIRED=true no .env, passa a exigir tokens válidos.
 */

import { Response, NextFunction } from 'express';
import { getAdminAuth } from '../config/firebaseAdmin';
import { AuthRequest, AuthUser, UserRole } from '../types/server';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Extrai o Bearer token do header Authorization.
 */
function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader) return null;
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') return null;
  return parts[1] || null;
}

/**
 * Usuário de desenvolvimento para testes sem Firebase Auth.
 * Controlado pelo header X-Mock-Role.
 */
function createMockUser(role: string): AuthUser {
  const roles: Record<string, AuthUser> = {
    aluno: {
      firebaseUid: 'mock-uid-aluno',
      userId: 'user-aluno-joao',
      email: 'joao@escola.dev',
      name: 'João (Mock)',
      role: 'aluno',
      schoolId: 'escola-01',
      classroomIds: ['turma-5a'],
      studentId: 'aluno-joao',
    },
    professor: {
      firebaseUid: 'mock-uid-professor',
      userId: 'user-professor-carla',
      email: 'carla@escola.dev',
      name: 'Prof. Carla Souza (Mock)',
      role: 'professor',
      schoolId: 'escola-01',
      classroomIds: ['turma-5a'],
    },
    coordenacao: {
      firebaseUid: 'mock-uid-coord',
      userId: 'user-coord-01',
      email: 'coord@escola.dev',
      name: 'Coordenação (Mock)',
      role: 'coordenacao',
      schoolId: 'escola-01',
      classroomIds: [],
    },
  };

  return roles[role] || roles['professor'];
}

// ─── Middleware ───────────────────────────────────────────────────────────────

/**
 * Middleware de autenticação.
 * 
 * Comportamento:
 * - Com token válido: autentica e continua
 * - Sem token (dev mode): adiciona usuário mock se X-Mock-Role presente
 * - Sem token (prod/AUTH_REQUIRED): retorna 401
 */
export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = extractBearerToken(req.headers.authorization);
  const isDev = process.env.NODE_ENV !== 'production';
  const authRequired = process.env.AUTH_REQUIRED === 'true';

  // Tenta verificar token Firebase real
  if (token) {
    try {
      const adminAuth = getAdminAuth();
      const decodedToken = await adminAuth.verifyIdToken(token);
      
      // Token válido — monta usuário básico (role virá do Firestore em breve)
      req.user = {
        firebaseUid: decodedToken.uid,
        userId: decodedToken.uid,
        email: decodedToken.email || '',
        name: decodedToken.name || decodedToken.email || '',
        role: (decodedToken.role as UserRole) || 'aluno',
        schoolId: decodedToken.schoolId as string || 'escola-01',
        classroomIds: (decodedToken.classroomIds as string[]) || [],
        studentId: decodedToken.studentId as string | undefined,
      };
      return next();
    } catch (err) {
      // Token inválido ou expirado
      res.status(401).json({
        success: false,
        error: 'Token de autenticação inválido ou expirado.',
      });
      return;
    }
  }

  // Modo de desenvolvimento: aceita X-Mock-Role header
  if (isDev && !authRequired) {
    const mockRole = req.headers['x-mock-role'] as string | undefined;
    if (mockRole) {
      req.user = createMockUser(mockRole);
      console.log(`[Auth] 🧪 Mock user: ${req.user.name} (${req.user.role})`);
    }
    // Sem role mock: continua sem usuário (rotas sem proteção funcionam normalmente)
    return next();
  }

  // Produção ou AUTH_REQUIRED=true: exige token
  if (authRequired) {
    res.status(401).json({
      success: false,
      error: 'Autenticação obrigatória. Envie um Firebase ID Token no header Authorization.',
    });
    return;
  }

  // Dev sem token e sem mock role: continua sem autenticação
  return next();
}

/**
 * Variante que EXIGE autenticação (sempre retorna 401 sem token válido).
 * Use em rotas sensíveis.
 */
export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  if (!req.user) {
    res.status(401).json({
      success: false,
      error: 'Autenticação obrigatória.',
    });
    return;
  }
  next();
}
