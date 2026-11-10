import { Router, Response, NextFunction } from 'express';
import { AuthRequest } from '../types/server';
import { authMiddleware } from '../middleware/auth';
import { requireRole } from '../middleware/requireRole';
import { getAdminAuth, getDb } from '../config/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import { hashStudentPin, normalizeStudentLoginCode, studentCredentialId } from '../services/studentCredentials';

export const adminConsoleRouter = Router();

const collections = [
  'users', 'schools', 'classrooms', 'students', 'abilities', 'trails',
  'curriculumTracks', 'missions', 'cards', 'achievements', 'rewards',
  'redemptions', 'coinTransactions', 'historyLogs', 'recognitionEvents',
  'interventions', 'diagnostics', 'classMetrics', 'migrationRuns', 'auditLogs',
] as const;

const catalogs = [
  'schools', 'classrooms', 'abilities', 'trails', 'curriculumTracks',
  'missions', 'cards', 'achievements', 'rewards',
] as const;

type CollectionName = typeof collections[number];
const SAFE_USER_FIELDS = new Set([
  'id', 'firebaseUid', 'name', 'email', 'role', 'schoolId', 'classroomIds',
  'studentId', 'active', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy',
  'archivedAt', 'profile',
]);
const sensitiveKey = /(password|pin|secret|token|reset|credential|private.?key|api.?key)/i;
const ID_RE = /^[A-Za-z0-9_-]{1,128}$/;
const reservedFields = new Set([
  'id', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy', 'archivedAt',
  'firebaseUid', 'uid', 'password', 'passwordHash', 'pinHash',
]);

const editable: Record<string, string[]> = {
  schools: ['name', 'code', 'active', 'address', 'contactName', 'contactEmail', 'contactPhone'],
  classrooms: ['schoolId', 'name', 'grade', 'teacherIds', 'studentIds', 'active'],
  abilities: ['name', 'subject', 'description', 'bnccCode', 'active'],
  trails: ['name', 'subject', 'description', 'order', 'icon', 'color', 'bnccSkills', 'image', 'isNew', 'nodes', 'active'],
  curriculumTracks: ['subjectId', 'number', 'title', 'description', 'objective', 'bnccSkills', 'color', 'badgeName', 'badgeIcon', 'units', 'active'],
  missions: ['trailId', 'title', 'subject', 'trailName', 'primaryAbility', 'difficulty', 'status', 'progress', 'objective', 'estimatedMinutes', 'xpReward', 'coinsReward', 'participationMode', 'steps', 'unlocksCards', 'unlocksAchievements', 'active', 'order'],
  cards: ['name', 'category', 'description', 'subject', 'rarity', 'icon', 'formulaOrQuote', 'active'],
  achievements: ['title', 'description', 'category', 'icon', 'color', 'xpReward', 'active'],
  rewards: ['name', 'description', 'cost', 'category', 'icon', 'emoji', 'availability', 'popular', 'note', 'active'],
};

function asyncRoute(fn: (req: AuthRequest, res: Response) => Promise<unknown>) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res)).catch(next);
  };
}
function fail(res: Response, status: number, error: string) {
  return res.status(status).json({ success: false, error });
}
function bodyObject(req: AuthRequest): Record<string, any> | null {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) return null;
  try {
    if (Buffer.byteLength(JSON.stringify(req.body), 'utf8') > 250 * 1024) return null;
  } catch {
    return null;
  }
  return req.body;
}
function validId(value: unknown): value is string {
  return typeof value === 'string' && ID_RE.test(value);
}
function safeData(doc: FirebaseFirestore.QueryDocumentSnapshot | FirebaseFirestore.DocumentSnapshot, collection: string) {
  const data = doc.data() || {};
  const redact = (value: unknown): unknown => {
    if (Array.isArray(value)) return value.map(redact);
    if (value && typeof value === 'object' && !(value instanceof Date) && !('toDate' in value)) {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>)
          .filter(([key]) => !sensitiveKey.test(key))
          .map(([key, nested]) => [key, redact(nested)]),
      );
    }
    return value;
  };
  const entries = Object.entries(data).filter(
    ([key]) => !sensitiveKey.test(key) && (collection !== 'users' || SAFE_USER_FIELDS.has(key)),
  );
  return Object.fromEntries(entries.map(([key, value]) => [key, redact(value)]));
}
function filteredPayload(source: Record<string, any>, fields: string[]) {
  const out: Record<string, any> = {};
  for (const [key, value] of Object.entries(source)) {
    if (reservedFields.has(key) || sensitiveKey.test(key)) {
      throw Object.assign(new Error(`Campo não permitido: ${key}`), { status: 400 });
    }
    if (!fields.includes(key)) {
      throw Object.assign(new Error(`Campo não permitido: ${key}`), { status: 400 });
    }
    out[key] = value;
  }
  if (!Object.keys(out).length) {
    throw Object.assign(new Error('Informe ao menos um campo permitido.'), { status: 400 });
  }
  return out;
}
async function auditBatch(
  collection: string,
  id: string,
  action: 'create' | 'update' | 'archive',
  actor: string,
  changes: Record<string, unknown>,
  write: (batch: FirebaseFirestore.WriteBatch) => void,
) {
  const db = getDb();
  const batch = db.batch();
  const now = Timestamp.now();
  write(batch);
  const audit = db.collection('auditLogs').doc();
  const scrubbed = Object.fromEntries(
    Object.entries(changes).filter(([k]) => !sensitiveKey.test(k) && !['email', 'resetLink'].includes(k)),
  );
  batch.set(audit, { entity: collection, entityId: id, action, actorUid: actor, timestamp: now, changes: scrubbed });
  await batch.commit();
}
async function ensureScope(collection: string, body: Record<string, any>, res: Response): Promise<boolean> {
  if (collection === 'classrooms' || collection === 'students') {
    if (typeof body.schoolId !== 'string' || !body.schoolId) {
      fail(res, 400, 'schoolId é obrigatório.');
      return false;
    }
    const school = await getDb().collection('schools').doc(body.schoolId).get();
    if (!school.exists) {
      fail(res, 400, 'Escola informada não existe.');
      return false;
    }
    if (collection === 'students') {
      if (typeof body.classroomId !== 'string' || !body.classroomId) {
        fail(res, 400, 'classroomId é obrigatório.');
        return false;
      }
      const classroom = await getDb().collection('classrooms').doc(body.classroomId).get();
      if (!classroom.exists || classroom.get('schoolId') !== body.schoolId) {
        fail(res, 400, 'Turma não existe ou pertence a outra escola.');
        return false;
      }
    }
  }
  return true;
}

adminConsoleRouter.use(authMiddleware, requireRole('admin', 'coordenacao'));

adminConsoleRouter.get('/overview', asyncRoute(async (_req, res) => {
  const db = getDb();
  const names = ['schools', 'users', 'classrooms', 'students', 'trails', 'curriculumTracks', 'missions', 'rewards', 'redemptions'];
  const counts = await Promise.all(
    names.map(async (name) => {
      try {
        const result = await db.collection(name).count().get();
        return [name, result.data().count] as const;
      } catch (err) {
        if ((err as { code?: number }).code === 5 || (err as { code?: string }).code === 'not-found') {
          return [name, 0] as const;
        }
        throw err;
      }
    }),
  );
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
      if (key === 'active' && value !== 'true' && value !== 'false') return fail(res, 400, 'active deve ser true ou false.');
      query = query.where(key, '==', key === 'active' ? value === 'true' : value);
    }
  }
  query = query.orderBy('__name__').limit(limit);
  if (cursor) query = query.startAfter(getDb().collection(name).doc(cursor as string));
  const snap = await query.get();
  res.json({
    success: true,
    data: snap.docs.map((d) => ({ id: d.id, ...safeData(d, name) })),
    limit,
    nextCursor: snap.size === limit ? snap.docs[snap.docs.length - 1].id : null,
  });
}));

adminConsoleRouter.post('/:collection', asyncRoute(async (req, res) => {
  const name = req.params.collection;
  if (![...catalogs, 'students', 'users'].includes(name as any)) return fail(res, 404, 'Criação não permitida para esta coleção.');
  const body = bodyObject(req);
  if (!body) return fail(res, 400, 'Body inválido.');
  const db = getDb();
  const actor = req.user!.firebaseUid;
  const now = Timestamp.now();

  if (name === 'users') {
    if (!['professor', 'coordenacao'].includes(body.role)) return fail(res, 400, 'role deve ser professor ou coordenacao.');
    if (typeof body.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) || typeof body.name !== 'string' || !body.name.trim()) {
      return fail(res, 400, 'Informe name e e-mail válidos.');
    }
    const schoolId = typeof body.schoolId === 'string' && body.schoolId ? body.schoolId : 'escola-01';
    const classroomIds = Array.isArray(body.classroomIds) ? body.classroomIds : ['turma-5a'];
    let user;
    try {
      user = await getAdminAuth().createUser({ email: body.email, displayName: body.name.trim(), emailVerified: false, disabled: false });
    } catch (err) {
      if ((err as { code?: string }).code === 'auth/email-already-exists') return fail(res, 409, 'E-mail já cadastrado.');
      throw err;
    }
    const profile = {
      firebaseUid: user.uid,
      name: body.name.trim(),
      email: body.email,
      role: body.role,
      schoolId,
      classroomIds,
      active: true,
      createdAt: now,
      updatedAt: now,
      createdBy: actor,
    };
    await auditBatch('users', user.uid, 'create', actor, { role: body.role, schoolId }, (batch) =>
      batch.create(db.collection('users').doc(user.uid), profile),
    );
    const resetLink = await getAdminAuth().generatePasswordResetLink(body.email);
    return res.status(201).json({
      success: true,
      data: { id: user.uid, ...profile },
      passwordSetup: { label: 'Link temporário para definir senha:', resetLink },
    });
  }

  if (name === 'students') {
    if (typeof body.name !== 'string' || body.name.trim().length < 2 || typeof body.grade !== 'string') {
      return fail(res, 400, 'name e grade são obrigatórios.');
    }
    const schoolId = typeof body.schoolId === 'string' && body.schoolId ? body.schoolId : 'escola-01';
    const classroomId = typeof body.classroomId === 'string' && body.classroomId ? body.classroomId : 'turma-5a';
    const ref = db.collection(name).doc();
    const data = {
      name: body.name.trim(),
      avatar: body.avatar || '🌟',
      ...(body.avatarUrl ? { avatarUrl: body.avatarUrl } : {}),
      schoolId,
      classroomId,
      classroom: body.classroom || 'Turma 5º ano A',
      grade: body.grade,
      teacherName: body.teacherName || 'Prof. Marcelo Fernandes',
      entryDate: body.entryDate || new Date().toISOString().slice(0, 10),
      status: body.status || 'evoluindo_bem',
      statusAlertText: body.statusAlertText || 'Aguardando avaliação diagnóstica inicial.',
      pedagogicalNotes: body.pedagogicalNotes || '',
      adaptations: Array.isArray(body.adaptations) ? body.adaptations : ['Atividades regulares'],
      level: 1,
      currentXp: 0,
      nextLevelXp: 500,
      coins: 50,
      streakDays: 0,
      weekDaysActive: [],
      trailProgress: { portugues: 10, matematica: 10, ciencias: 10 },
      diagnosticCompleted: false,
      active: true,
      createdAt: now,
      updatedAt: now,
      createdBy: actor,
    };
    await auditBatch('students', ref.id, 'create', actor, { name: data.name, schoolId, classroomId }, (batch) =>
      batch.create(ref, data),
    );
    return res.status(201).json({ success: true, data: { id: ref.id, ...data } });
  }

  try {
    const allowed = editable[name];
    const data = filteredPayload(body, allowed);
    const ref = db.collection(name).doc();
    const payload = { ...data, active: data.active ?? true, createdAt: now, updatedAt: now, createdBy: actor };
    await auditBatch(name, ref.id, 'create', actor, data, (batch) => batch.create(ref, payload));
    return res.status(201).json({ success: true, data: { id: ref.id, ...payload } });
  } catch (err) {
    const e = err as { status?: number; message?: string };
    if (e.status) return fail(res, e.status, e.message || 'Payload inválido.');
    throw err;
  }
}));

adminConsoleRouter.patch('/:collection/:id', asyncRoute(async (req, res) => {
  const name = req.params.collection;
  const id = req.params.id;
  if (!validId(id)) return fail(res, 400, 'ID inválido.');
  if (![...catalogs, 'students', 'users'].includes(name as any)) return fail(res, 404, 'Edição não permitida para esta coleção.');
  const body = bodyObject(req);
  if (!body) return fail(res, 400, 'Body inválido.');
  const db = getDb();
  const ref = db.collection(name).doc(id);
  const snap = await ref.get();
  if (!snap.exists) return fail(res, 404, 'Registro não encontrado.');
  const now = Timestamp.now();
  const actor = req.user!.firebaseUid;

  const changes = { ...body, updatedAt: now, updatedBy: actor };
  delete (changes as any).id;
  await auditBatch(name, id, 'update', actor, changes, (batch) => batch.update(ref, changes));
  return res.json({ success: true, data: { id, ...(await ref.get()).data() } });
}));

adminConsoleRouter.delete('/:collection/:id', asyncRoute(async (req, res) => {
  const name = req.params.collection;
  const id = req.params.id;
  if (!validId(id)) return fail(res, 400, 'ID inválido.');
  if (![...catalogs, 'students', 'users'].includes(name as any)) return fail(res, 404, 'Arquivamento não permitido para esta coleção.');
  const db = getDb();
  const ref = db.collection(name).doc(id);
  const snap = await ref.get();
  if (!snap.exists) return fail(res, 404, 'Registro não encontrado.');
  const now = Timestamp.now();
  const actor = req.user!.firebaseUid;

  await auditBatch(name, id, 'archive', actor, { active: false }, (batch) =>
    batch.update(ref, { active: false, archivedAt: now, updatedAt: now, updatedBy: actor }),
  );
  res.json({ success: true, data: { id, active: false, archivedAt: now } });
}));

