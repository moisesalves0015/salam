import { Router, type Response } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { getAdminAuth, getDb } from '../config/firebaseAdmin';
import { authMiddleware } from '../middleware/auth';
import type { AuthRequest } from '../types/server';
import { studentCredentialId, verifyStudentPin } from '../services/studentCredentials';

export const authRouter = Router();

const studentLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { success: false, error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' },
});

const studentLoginSchema = z.object({
  loginCode: z.string().trim().min(3).max(80),
  pin: z.string().regex(/^\d{6,12}$/),
}).strict();

authRouter.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({ success: true, data: req.user });
});

authRouter.post('/students/session', studentLoginLimiter, async (req, res) => {
  const parsed = studentLoginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ success: false, error: 'Informe seu código e um PIN de 6 a 12 dígitos.' });
    return;
  }

  try {
    const db = getDb();
    const loginCode = parsed.data.loginCode.trim().toUpperCase();
    const credentialDoc = await db.collection('studentCredentials').doc(studentCredentialId(loginCode)).get();
    if (!credentialDoc.exists || credentialDoc.get('active') !== true) {
      res.status(401).json({ success: false, error: 'Código ou PIN inválido.' });
      return;
    }

    const credential = credentialDoc.data();
    if (!credential) {
      res.status(401).json({ success: false, error: 'Código ou PIN inválido.' });
      return;
    }
    const studentId = credential.studentId;
    if (typeof studentId !== 'string' || typeof credential.pinHash !== 'string' || typeof credential.pinSalt !== 'string') {
      res.status(401).json({ success: false, error: 'Código ou PIN inválido.' });
      return;
    }
    const validPin = await verifyStudentPin(parsed.data.pin, credential.pinSalt, credential.pinHash);
    if (!validPin) {
      res.status(401).json({ success: false, error: 'Código ou PIN inválido.' });
      return;
    }

    const [studentDoc, profiles] = await Promise.all([
      db.collection('students').doc(studentId).get(),
      db.collection('users')
        .where('studentId', '==', studentId)
        .where('role', '==', 'aluno')
        .where('active', '==', true)
        .limit(1)
        .get(),
    ]);
    if (!studentDoc.exists || studentDoc.get('active') !== true || profiles.empty) {
      res.status(401).json({ success: false, error: 'Código ou PIN inválido.' });
      return;
    }

    const profileDoc = profiles.docs[0];
    if (!profileDoc) {
      res.status(401).json({ success: false, error: 'Código ou PIN inválido.' });
      return;
    }
    const uid = profileDoc.get('firebaseUid');
    if (typeof uid !== 'string' || !uid) {
      res.status(401).json({ success: false, error: 'Código ou PIN inválido.' });
      return;
    }
    const token = await getAdminAuth().createCustomToken(uid);
    res.json({ success: true, data: { token } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Falha no login.';
    console.error('[Auth] Falha ao autenticar estudante:', message);
    res.status(500).json({ success: false, error: 'Não foi possível entrar agora. Tente novamente.' });
  }
});
