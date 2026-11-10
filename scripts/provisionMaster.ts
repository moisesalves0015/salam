import 'dotenv/config';
import { initializeFirebaseAdmin, getAdminAuth, getDb } from '../server/config/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';

async function main() {
  const email = process.env.MASTER_ADMIN_EMAIL?.trim().toLowerCase();
  const displayName = process.env.MASTER_ADMIN_NAME?.trim() || 'ADM Master';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Defina MASTER_ADMIN_EMAIL com o e-mail real autorizado antes de executar este comando.');
  }

  initializeFirebaseAdmin();
  const db = getDb();
  const current = await db.collection('users').where('role', '==', 'admin').where('active', '==', true).limit(1).get();
  if (!current.empty) {
    throw new Error('Já existe ADM Master ativo. Não foi feita nenhuma alteração; use a administração autenticada ou o procedimento operacional documentado.');
  }

  const authUser = await getAdminAuth().createUser({ email, displayName, emailVerified: false, disabled: false });
  const now = Timestamp.now();
  const profile = {
    firebaseUid: authUser.uid,
    name: displayName,
    email,
    role: 'admin',
    active: true,
    classroomIds: [],
    createdAt: now,
    updatedAt: now,
    createdBy: 'one-time-master-provisioning-cli',
  };

  try {
    await db.collection('users').doc(authUser.uid).create(profile);
    await db.collection('auditLogs').add({
      entity: 'users',
      entityId: authUser.uid,
      action: 'master_provisioned',
      actorUid: authUser.uid,
      timestamp: now,
      changes: { role: 'admin' },
    });
    const resetLink = await getAdminAuth().generatePasswordResetLink(email);
    process.stdout.write(`ADM Master criado para ${email}. Configure a senha por canal privado usando o link temporário abaixo:\n${resetLink}\n`);
  } catch (error) {
    try { await getAdminAuth().deleteUser(authUser.uid); } catch { /* retain original error */ }
    throw error;
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : 'Falha no provisionamento.';
  console.error(`[Provisionamento ADM Master] ${message}`);
  process.exitCode = 1;
});

