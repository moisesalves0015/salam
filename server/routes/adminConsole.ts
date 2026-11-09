import { Router, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/server';
import { authMiddleware } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';
import { getAdminAuth, getDb } from '../config/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import { hashStudentPin, normalizeStudentLoginCode, studentCredentialId } from '../services/studentCredentials';

export const adminConsoleRouter = Router();

const collections = ['users', 'schools', 'classrooms', 'students', 'abilities', 'trails', 'missions', 'cards', 'achievements', 'rewards', 'redemptions', 'coinTransactions', 'historyLogs', 'recognitionEvents', 'auditLogs'] as const;
const catalogs = ['schools', 'classrooms', 'abilities', 'trails', 'missions', 'cards', 'achievements', 'rewards'] as const;
type CollectionName = typeof collections[number];
const SAFE_USER_FIELDS = new Set(['id', 'firebaseUid', 'name', 'email', 'role', 'schoolId', 'classroomIds', 'studentId', 'active', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'archivedAt', 'profile']);
const sensitiveKey = /(password|pin|secret|token|reset|credential|private.?key|api.?key)/i;
const ID_RE = /^[A-Za-z0-9_-]{1,128}$/;
const reservedFields = new Set(['id', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'archivedAt', 'firebaseUid', 'uid', 'coins', 'xp', 'currentXp', 'level', 'progress', 'missionAttempts', 'redemptions', 'password', 'passwordHash', 'pinHash', 'role']);
const editable: Record<string, string[]> = {
  schools: ['name', 'code', 'active', 'address', 'contactName', 'contactEmail', 'contactPhone'],
  classrooms: ['schoolId', 'name', 'grade', 'teacherIds', 'studentIds', 'active'],
  abilities: ['name', 'subject', 'description', 'bnccCode', 'active'],
  trails: ['name', 'subject', 'description', 'order', 'active'],
  missions: ['trailId', 'title', 'subject', 'trailName', 'primaryAbility', 'difficulty', 'objective', 'estimatedMinutes', 'xpReward', 'coinsReward', 'participationMode', 'steps', 'active', 'order'],
  cards: ['name', 'category', 'description', 'subject', 'rarity', 'icon', 'formulaOrQuote', 'active'],
  achievements: ['title', 'description', 'category', 'icon', 'color', 'xpReward', 'active'],
  rewards: ['name', 'description', 'cost', 'category', 'icon', 'emoji', 'availability', 'popular', 'note', 'active'],
};

function asyncRoute(fn: (req: AuthRequest, res: Response) => Promise<unknown>) {
  return (req: AuthRequest, res: Response, next: NextFunction) => { Promise.resolve(fn(req, res)).catch(next); };
}
function fail(res: Response, status: number, error: string) { return res.status(status).json({ success: false, error }); }
function bodyObject(req: AuthRequest): Record<string, any> | null {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) return null;
  try { if (Buffer.byteLength(JSON.stringify(req.body), 'utf8') > 50 * 1024) return null; } catch { return null; }
  return req.body;
}
function validId(value: unknown): value is string { return typeof value === 'string' && ID_RE.test(value); }
function safeData(doc: FirebaseFirestore.QueryDocumentSnapshot | FirebaseFirestore.DocumentSnapshot, collection: string) {
  const data = doc.data() || {};
  const redact = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(redact);
    if (value && typeof value === 'object' && !(value instanceof Date) && !('toDate' in value)) {
      return Object.fromEntries(Object.entries(value as Record<string, unknown>)
        .filter(([key]) => !sensitiveKey.test(key))
        .map(([key, nested]) => [key, redact(nested)]));
    }
    return value;
  };
  const entries = Object.entries(data).filter(([key]) => !sensitiveKey.test(key)
    && (collection !== 'users' || SAFE_USER_FIELDS.has(key)));
  return Object.fromEntries(entries.map(([key, value]) => [key, redact(value)]));
}
function filteredPayload(source: Record<string, any>, fields: string[]) {
  const out: Record<string, any> = {};
  for (const [key, value] of Object.entries(source)) {
    if (reservedFields.has(key) || sensitiveKey.test(key)) throw Object.assign(new Error(`Campo não permitido: ${key}`), { status: 400 });
    if (!fields.includes(key)) throw Object.assign(new Error(`Campo não permitido: ${key}`), { status: 400 });
    out[key] = value;
  }
  if (!Object.keys(out).length) throw Object.assign(new Error('Informe ao menos um campo permitido.'), { status: 400 });
  return out;
}
async function auditBatch(collection: string, id: string, action: 'create' | 'update' | 'archive', actor: string, changes: Record<string, unknown>, write: (batch: FirebaseFirestore.WriteBatch) => void) {
  const db = getDb(); const batch = db.batch(); const now = Timestamp.now();
  write(batch);
  const audit = db.collection('auditLogs').doc();
  const scrubbed = Object.fromEntries(Object.entries(changes).filter(([k]) => !sensitiveKey.test(k) && !['email', 'resetLink'].includes(k)));
  batch.set(audit, { entity: collection, entityId: id, action, actorUid: actor, timestamp: now, changes: scrubbed });
  await batch.commit();
}
async function ensureScope(collection: string, body: Record<string, any>, res: Response): Promise<boolean> {
  if (collection === 'classrooms' || collection === 'students') {
    if (typeof body.schoolId !== 'string' || !body.schoolId) { fail(res, 400, 'schoolId é obrigatório.'); return false; }
    const school = await getDb().collection('schools').doc(body.schoolId).get();
    if (!school.exists) { fail(res, 400, 'Escola informada não existe.'); return false; }
    if (collection === 'students') {
      if (typeof body.classroomId !== 'string' || !body.classroomId) { fail(res, 400, 'classroomId é obrigatório.'); return false; }
      const classroom = await getDb().collection('classrooms').doc(body.classroomId).get();
      if (!classroom.exists || classroom.get('schoolId') !== body.schoolId) { fail(res, 400, 'Turma não existe ou pertence a outra escola.'); return false; }
    }
  }
  return true;
}

// All handlers are globally scoped ADM Master operations; never accept scope from the caller for reads.
adminConsoleRouter.use(authMiddleware, requireRole('admin'));

adminConsoleRouter.get('/overview', asyncRoute(async (_req, res) => {
  const db = getDb();
  const names = ['schools', 'users', 'classrooms', 'students', 'missions', 'rewards', 'redemptions'];
  const counts = await Promise.all(names.map(async (name) => {
    try { const result = await db.collection(name).count().get(); return [name, result.data().count] as const; }
    catch (err) { if ((err as { code?: number }).code === 5 || (err as { code?: string }).code === 'not-found') return [name, 0] as const; throw err; }
  }));
  res.json({ success: true, data: Object.fromEntries(counts) });
}));

adminConsoleRouter.get('/:collection', asyncRoute(async (req, res) => {
  const name = req.params.collection as CollectionName;
  if (!collections.includes(name)) return fail(res, 404, 'Coleção não permitida.');
  const limitRaw = req.query.limit === undefined ? '50' : String(req.query.limit);
  const limit = Number(limitRaw);
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) return fail(res, 400, 'limit deve ser inteiro entre 1 e 100.');
  const cursor = req.query.startAfter;
  if (cursor !== undefined && !validId(cursor)) return fail(res, 400, 'startAfter inválido.');
  let query: FirebaseFirestore.Query = getDb().collection(name);
  for (const key of ['schoolId', 'status', 'active'] as const) {
    const value = req.query[key];
    if (value !== undefined) {
      if (typeof value !== 'string' || value.length > 128) return fail(res, 400, `Filtro ${key} inválido.`);
      if ((key === 'schoolId' && ['schools', 'abilities', 'trails', 'missions', 'cards', 'achievements', 'rewards'].includes(name))) return fail(res, 400, `Filtro ${key} não suportado para ${name}.`);
      if (key === 'active' && value !== 'true' && value !== 'false') return fail(res, 400, 'active deve ser true ou false.');
      query = query.where(key, '==', key === 'active' ? value === 'true' : value);
    }
  }
  query = query.orderBy('__name__').limit(limit);
  if (cursor) query = query.startAfter(getDb().collection(name).doc(cursor as string));
  const snap = await query.get();
  res.json({ success: true, data: snap.docs.map((d) => ({ id: d.id, ...safeData(d, name) })), limit, nextCursor: snap.size === limit ? snap.docs[snap.docs.length - 1].id : null });
}));

adminConsoleRouter.post('/:collection', asyncRoute(async (req, res) => {
  const name = req.params.collection;
  if (![...catalogs, 'students', 'users'].includes(name as any)) return fail(res, 404, 'Criação não permitida para esta coleção.');
  const body = bodyObject(req); if (!body) return fail(res, 400, 'Body deve ser objeto JSON com no máximo 50 KB.');
  const db = getDb(); const actor = req.user!.firebaseUid; const now = Timestamp.now();
  if (name === 'users') {
    if (body.role === 'aluno') return fail(res, 400, 'Login de aluno sem e-mail ainda não está implementado; nenhum login fictício será criado.');
    if (!['professor', 'coordenacao'].includes(body.role)) return fail(res, 400, 'role deve ser professor ou coordenacao; criação de admin não é permitida.');
    if (typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) || body.email.length > 254 || typeof body.name !== 'string' || !body.name.trim() || body.name.length > 120) return fail(res, 400, 'Informe name e e-mail válidos.');
    const allowed = ['email', 'name', 'role', 'schoolId', 'classroomIds'];
    if (Object.keys(body).some(k => !allowed.includes(k))) return fail(res, 400, 'Campo não permitido.');
    if (typeof body.schoolId !== 'string' || !body.schoolId || !Array.isArray(body.classroomIds) || !body.classroomIds.every((x: unknown) => typeof x === 'string')) return fail(res, 400, 'schoolId e classroomIds são obrigatórios e devem ter formato válido.');
    const school = await db.collection('schools').doc(body.schoolId).get(); if (!school.exists) return fail(res, 400, 'Escola não existe.');
    for (const classroomId of body.classroomIds) { const c = await db.collection('classrooms').doc(classroomId).get(); if (!c.exists || c.get('schoolId') !== body.schoolId) return fail(res, 400, 'Turma inexistente ou fora da escola atribuída.'); }
    let user;
    try { user = await getAdminAuth().createUser({ email: body.email, displayName: body.name.trim(), emailVerified: false, disabled: false }); }
    catch (err) { if ((err as { code?: string }).code === 'auth/email-already-exists') return fail(res, 409, 'E-mail já cadastrado.'); throw err; }
    const profile = { firebaseUid: user.uid, name: body.name.trim(), email: body.email, role: body.role, schoolId: body.schoolId, classroomIds: body.classroomIds, active: true, createdAt: now, updatedAt: now, createdBy: actor };
    try {
      await auditBatch('users', user.uid, 'create', actor, { role: body.role, schoolId: body.schoolId }, batch => batch.create(db.collection('users').doc(user.uid), profile));
      const resetLink = await getAdminAuth().generatePasswordResetLink(body.email);
      return res.status(201).json({ success: true, data: { id: user.uid, ...profile }, passwordSetup: { label: 'Envie este link ao usuário por canal privado. Ele é exibido uma única vez e não foi armazenado.', resetLink } });
    } catch (err) {
      try { await getAdminAuth().deleteUser(user.uid); } catch { /* preserve original failure; cleanup best-effort */ }
      throw err;
    }
  }
  if (name === 'students') {
    const allowed = ['name', 'avatar', 'avatarUrl', 'schoolId', 'classroomId', 'grade', 'teacherName', 'entryDate', 'status', 'statusAlertText', 'pedagogicalNotes', 'adaptations', 'loginCode', 'pin'];
    if (Object.keys(body).some(k => !allowed.includes(k))) return fail(res, 400, 'Campo de perfil inválido; saldo e progresso são inicializados pelo servidor.');
    if (typeof body.name !== 'string' || body.name.trim().length < 2 || typeof body.grade !== 'string') return fail(res, 400, 'name e grade são obrigatórios.');
    if (typeof body.loginCode !== 'string' || !/^[A-Z0-9_-]{6,24}$/i.test(body.loginCode.trim()) || typeof body.pin !== 'string' || !/^\d{6,12}$/.test(body.pin)) return fail(res, 400, 'Informe um código de acesso único (6–24 caracteres) e PIN (6–12 dígitos).');
    if (!await ensureScope(name, body, res)) return;
    const loginCode = normalizeStudentLoginCode(body.loginCode);
    const credentialId = studentCredentialId(loginCode);
    const credentialRef = db.collection('studentCredentials').doc(credentialId);
    const duplicateCode = await credentialRef.get();
    if (duplicateCode.exists) return fail(res, 409, 'Código de acesso já cadastrado.');
    const pinCredential = await hashStudentPin(body.pin);
    const ref = db.collection(name).doc();
    const studentCredentialRef = db.collection('studentCredentials').doc(credentialId);
    const authUser = await getAdminAuth().createUser({ displayName: body.name.trim(), disabled: false });
    const data = { name: body.name.trim(), avatar: body.avatar || '', ...(body.avatarUrl ? { avatarUrl: body.avatarUrl } : {}), schoolId: body.schoolId, classroomId: body.classroomId, grade: body.grade, teacherName: body.teacherName || '', entryDate: body.entryDate || new Date().toISOString().slice(0, 10), status: body.status || 'evoluindo_bem', statusAlertText: body.statusAlertText || '', pedagogicalNotes: body.pedagogicalNotes || '', adaptations: Array.isArray(body.adaptations) ? body.adaptations : [], level: 0, currentXp: 0, nextLevelXp: 100, coins: 0, streakDays: 0, weekDaysActive: [], trailProgress: { portugues: 0, matematica: 0, ciencias: 0 }, diagnosticCompleted: false, active: true, createdAt: now, updatedAt: now, createdBy: actor };
    const profile = { firebaseUid: authUser.uid, name: data.name, email: '', role: 'aluno', schoolId: body.schoolId, classroomIds: [body.classroomId], studentId: ref.id, active: true, createdAt: now, updatedAt: now, createdBy: actor };
    const batch = db.batch();
    batch.create(ref, data);
    batch.create(db.collection('users').doc(authUser.uid), profile);
    batch.create(studentCredentialRef, { studentId: ref.id, ...pinCredential, active: true, createdAt: now, updatedAt: now });
    batch.create(db.collection('auditLogs').doc(), { entity: 'students', entityId: ref.id, action: 'create', actorUid: actor, timestamp: now, changes: { name: data.name, schoolId: data.schoolId, classroomId: data.classroomId } });
    try { await batch.commit(); }
    catch (err) { try { await getAdminAuth().deleteUser(authUser.uid); } catch { /* cleanup best-effort; preserve the Firestore error */ } throw err; }
    return res.status(201).json({ success: true, data: { id: ref.id, ...data }, credentials: { loginCode, note: 'PIN não é exibido novamente. Entregue os dados ao aluno por canal privado.' } });
  }
  try {
    const allowed = editable[name]; const data = filteredPayload(body, allowed);
    if (name === 'schools' && (!data.name || typeof data.name !== 'string')) return fail(res, 400, 'name é obrigatório.');
    if (name === 'classrooms' && !await ensureScope(name, data, res)) return;
    if (data.schoolId && (name === 'classrooms')) { /* validated above */ }
    const ref = db.collection(name).doc(); const record = { ...data, active: data.active ?? true, createdAt: now, updatedAt: now, createdBy: actor };
    await auditBatch(name, ref.id, 'create', actor, data, batch => batch.create(ref, record));
    return res.status(201).json({ success: true, data: { id: ref.id, ...record } });
  } catch (err) { const e = err as { status?: number; message?: string }; if (e.status) return fail(res, e.status, e.message || 'Payload inválido.'); throw err; }
}));

adminConsoleRouter.patch('/:collection/:id', asyncRoute(async (req, res) => {
  const name = req.params.collection; const id = req.params.id;
  if (!validId(id)) return fail(res, 400, 'ID inválido.');
  if (![...catalogs, 'students', 'users'].includes(name as any)) return fail(res, 404, 'Edição não permitida para esta coleção.');
  const body = bodyObject(req); if (!body) return fail(res, 400, 'Body deve ser objeto JSON com no máximo 50 KB.');
  const db = getDb(); const ref = db.collection(name).doc(id); const snap = await ref.get(); if (!snap.exists) return fail(res, 404, 'Registro não encontrado.');
  const actor = req.user!.firebaseUid; const now = Timestamp.now();
  if (name === 'students') {
    const keys = ['name', 'avatar', 'avatarUrl', 'classroomId', 'grade', 'pedagogicalNotes', 'adaptations', 'active'];
    if (Object.keys(body).some(k => !keys.includes(k))) return fail(res, 400, 'PATCH de estudante aceita somente campos de perfil; progresso e saldo não podem ser alterados.');
    if (body.classroomId !== undefined) { if (typeof body.classroomId !== 'string') return fail(res, 400, 'classroomId inválido.'); const c = await db.collection('classrooms').doc(body.classroomId).get(); if (!c.exists || c.get('schoolId') !== snap.get('schoolId')) return fail(res, 400, 'Turma inexistente ou fora da escola do estudante.'); }
    if (!Object.keys(body).length) return fail(res, 400, 'Informe campos de perfil.');
    const changes = { ...body, updatedAt: now, updatedBy: actor };
    await auditBatch(name, id, 'update', actor, body, batch => batch.update(ref, changes));
    return res.json({ success: true, data: { id, ...(await ref.get()).data() } });
  }
  if (name === 'users') {
    const keys = ['name', 'email', 'role', 'schoolId', 'classroomIds', 'active'];
    if (Object.keys(body).some(k => !keys.includes(k))) return fail(res, 400, 'Campo de perfil inválido.');
    if (snap.get('role') === 'admin' || body.role === 'admin') return fail(res, 400, 'Não é permitido alterar perfil de admin nem atribuir papel admin.');
    if (body.role !== undefined && !['aluno', 'professor', 'coordenacao'].includes(body.role)) return fail(res, 400, 'role inválido.');
    if (body.schoolId !== undefined || body.classroomIds !== undefined) {
      const schoolId = body.schoolId ?? snap.get('schoolId'); const classroomIds = body.classroomIds ?? snap.get('classroomIds');
      if (typeof schoolId !== 'string' || !Array.isArray(classroomIds)) return fail(res, 400, 'Escopo inválido.');
      const school = await db.collection('schools').doc(schoolId).get(); if (!school.exists) return fail(res, 400, 'Escola inexistente.');
      for (const cid of classroomIds) { const c = await db.collection('classrooms').doc(cid).get(); if (!c.exists || c.get('schoolId') !== schoolId) return fail(res, 400, 'Turma inexistente ou fora da escola.'); }
    }
    if (body.email !== undefined && (typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))) return fail(res, 400, 'E-mail inválido.');
    const uid = snap.get('firebaseUid'); if (typeof uid !== 'string' || !uid) return fail(res, 409, 'Perfil sem vínculo Firebase Auth; correção manual necessária.');
    const authUpdates: Record<string, unknown> = {};
    if (body.name !== undefined) authUpdates.displayName = body.name;
    if (body.email !== undefined) authUpdates.email = body.email;
    if (body.active !== undefined) authUpdates.disabled = body.active !== true;
    try { if (Object.keys(authUpdates).length) await getAdminAuth().updateUser(uid, authUpdates); }
    catch (err) { if ((err as { code?: string }).code === 'auth/email-already-exists') return fail(res, 409, 'E-mail já cadastrado.'); throw err; }
    const changes = { ...body, updatedAt: now, updatedBy: actor };
    try { await auditBatch(name, id, 'update', actor, body, batch => batch.update(ref, changes)); }
    catch (err) { throw Object.assign(new Error('Falha ao persistir perfil/auditoria após atualização de Auth; reconciliação necessária.'), { cause: err }); }
    return res.json({ success: true, data: { id, ...(await ref.get()).data() } });
  }
  try {
    const data = filteredPayload(body, editable[name]);
    if (name === 'classrooms' && data.schoolId) { const school = await db.collection('schools').doc(data.schoolId).get(); if (!school.exists) return fail(res, 400, 'Escola inexistente.'); }
    const changes = { ...data, updatedAt: now, updatedBy: actor };
    await auditBatch(name, id, 'update', actor, data, batch => batch.update(ref, changes));
    return res.json({ success: true, data: { id, ...(await ref.get()).data() } });
  } catch (err) { const e = err as { status?: number; message?: string }; if (e.status) return fail(res, e.status, e.message || 'Payload inválido.'); throw err; }
}));

adminConsoleRouter.delete('/:collection/:id', asyncRoute(async (req, res) => {
  const name = req.params.collection; const id = req.params.id;
  if (!validId(id)) return fail(res, 400, 'ID inválido.');
  if (![...catalogs, 'students', 'users'].includes(name as any)) return fail(res, 404, 'Arquivamento não permitido para esta coleção.');
  const db = getDb(); const ref = db.collection(name).doc(id); const snap = await ref.get(); if (!snap.exists) return fail(res, 404, 'Registro não encontrado.');
  const now = Timestamp.now(); const actor = req.user!.firebaseUid;
  if (name === 'users') {
    if (snap.get('role') === 'admin') return fail(res, 400, 'Não é permitido desativar usuário admin por esta API.');
    const uid = snap.get('firebaseUid'); if (typeof uid !== 'string' || !uid) return fail(res, 409, 'Perfil sem vínculo Firebase Auth; correção manual necessária.');
    await getAdminAuth().updateUser(uid, { disabled: true });
  }
  if (name === 'students') {
    const profiles = await db.collection('users').where('studentId', '==', id).where('role', '==', 'aluno').limit(1).get();
    const credentialQuery = await db.collection('studentCredentials').where('studentId', '==', id).limit(1).get();
    const batch = db.batch();
    batch.update(ref, { active: false, archivedAt: now, updatedAt: now, updatedBy: actor });
    if (!profiles.empty) {
      const profileDoc = profiles.docs[0];
      const uid = profileDoc.get('firebaseUid');
      if (typeof uid === 'string' && uid) await getAdminAuth().updateUser(uid, { disabled: true });
      batch.update(profileDoc.ref, { active: false, updatedAt: now, updatedBy: actor });
    }
    if (!credentialQuery.empty) batch.update(credentialQuery.docs[0].ref, { active: false, updatedAt: now });
    batch.create(db.collection('auditLogs').doc(), { entity: name, entityId: id, action: 'archive', actorUid: actor, timestamp: now, changes: { active: false } });
    await batch.commit();
    return res.json({ success: true, data: { id, active: false, archivedAt: now } });
  }
  await auditBatch(name, id, 'archive', actor, { active: false }, batch => batch.update(ref, { active: false, archivedAt: now, updatedAt: now, updatedBy: actor }));
  res.json({ success: true, data: { id, active: false, archivedAt: now } });
}));

adminConsoleRouter.use((err: unknown, _req: AuthRequest, res: Response, _next: NextFunction) => {
  const message = err instanceof Error ? err.message : 'Erro interno.';
  const status = Number((err as { status?: number })?.status) || 500;
  if (status >= 500) console.error('[AdminConsole]', message);
  res.status(status).json({ success: false, error: status >= 500 ? 'Erro interno ao executar operação administrativa.' : message });
});
