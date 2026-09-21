/**
 * server/services/studentService.ts
 * 
 * Operações de negócio relacionadas a estudantes.
 */

import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { getDb } from '../config/firebaseAdmin';
import {
  FirestoreStudent,
  FirestoreStudentAbility,
  FirestoreHistoryLog,
  AbilityState,
} from '../types/server';

const STUDENTS_COL = 'students';
const STUDENT_ABILITIES_COL = 'studentAbilities';
const HISTORY_LOGS_COL = 'historyLogs';

// ─── Leitura ──────────────────────────────────────────────────────────────────

export async function listStudents(filters?: {
  schoolId?: string;
  classroomId?: string;
  status?: string;
}): Promise<FirestoreStudent[]> {
  const db = getDb();
  let query: FirebaseFirestore.Query = db.collection(STUDENTS_COL)
    .where('active', '==', true);

  if (filters?.schoolId) {
    query = query.where('schoolId', '==', filters.schoolId);
  }
  if (filters?.classroomId) {
    query = query.where('classroomId', '==', filters.classroomId);
  }
  if (filters?.status) {
    query = query.where('status', '==', filters.status);
  }

  const snap = await query.get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreStudent));
}

export async function getStudent(studentId: string): Promise<FirestoreStudent | null> {
  const db = getDb();
  const doc = await db.collection(STUDENTS_COL).doc(studentId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as FirestoreStudent;
}

export async function getStudentAbilities(
  studentId: string
): Promise<FirestoreStudentAbility[]> {
  const db = getDb();
  const snap = await db
    .collection(STUDENT_ABILITIES_COL)
    .where('studentId', '==', studentId)
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreStudentAbility));
}

export async function getStudentHistoryLog(
  studentId: string,
  limit = 20
): Promise<FirestoreHistoryLog[]> {
  const db = getDb();
  const snap = await db
    .collection(HISTORY_LOGS_COL)
    .where('studentId', '==', studentId)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreHistoryLog));
}

// ─── Criação ──────────────────────────────────────────────────────────────────

export async function createStudent(data: {
  name: string;
  grade: string;
  classroom: string;
  schoolId: string;
  classroomId: string;
  teacherName: string;
  pedagogicalNotes?: string;
  adaptations?: string[];
}): Promise<FirestoreStudent> {
  const db = getDb();
  const now = Timestamp.now();

  const studentData: Omit<FirestoreStudent, 'id'> = {
    userId: undefined,
    schoolId: data.schoolId,
    classroomId: data.classroomId,
    name: data.name,
    avatar: '🌟',
    grade: data.grade,
    teacherName: data.teacherName,
    entryDate: new Date().toLocaleDateString('pt-BR'),
    status: 'atencao',
    statusAlertText: 'Aguardando avaliação diagnóstica inicial.',
    level: 1,
    currentXp: 0,
    nextLevelXp: 500,
    coins: 0,
    streakDays: 0,
    weekDaysActive: [
      { day: 'S', active: false },
      { day: 'T', active: false },
      { day: 'Q', active: false },
      { day: 'Q', active: false },
      { day: 'S', active: false },
      { day: 'S', active: false },
      { day: 'D', active: false },
    ],
    trailProgress: { portugues: 0, matematica: 0, ciencias: 0 },
    diagnosticCompleted: false,
    pedagogicalNotes: data.pedagogicalNotes || 'Novo aluno cadastrado.',
    adaptations: data.adaptations || [],
    active: true,
    createdAt: now,
    updatedAt: now,
  };

  const ref = db.collection(STUDENTS_COL).doc();
  await ref.set(studentData);
  return { id: ref.id, ...studentData };
}

// ─── Atualização ──────────────────────────────────────────────────────────────

export async function addXpToStudent(
  studentId: string,
  xpAmount: number
): Promise<{ newXp: number; newLevel: number; leveledUp: boolean }> {
  if (xpAmount < 0) throw new Error('XP não pode ser negativo');

  const db = getDb();
  const ref = db.collection(STUDENTS_COL).doc(studentId);

  let result = { newXp: 0, newLevel: 1, leveledUp: false };

  await db.runTransaction(async (tx) => {
    const doc = await tx.get(ref);
    if (!doc.exists) throw new Error(`Estudante ${studentId} não encontrado`);

    const student = doc.data() as FirestoreStudent;
    const newXp = student.currentXp + xpAmount;
    let newLevel = student.level;
    let nextLevelXp = student.nextLevelXp;
    let leveledUp = false;

    // Sistema de nivelamento: cada nível requer 500 XP adicionais
    while (newXp >= nextLevelXp) {
      newLevel++;
      nextLevelXp = newLevel * 500;
      leveledUp = true;
    }

    tx.update(ref, {
      currentXp: newXp,
      level: newLevel,
      nextLevelXp,
      updatedAt: Timestamp.now(),
    });

    result = { newXp, newLevel, leveledUp };
  });

  return result;
}

export async function addCoinsToStudent(
  studentId: string,
  amount: number
): Promise<number> {
  if (amount === 0) return 0;

  const db = getDb();
  const ref = db.collection(STUDENTS_COL).doc(studentId);

  let newCoins = 0;

  await db.runTransaction(async (tx) => {
    const doc = await tx.get(ref);
    if (!doc.exists) throw new Error(`Estudante ${studentId} não encontrado`);

    const student = doc.data() as FirestoreStudent;
    newCoins = Math.max(0, student.coins + amount); // Nunca negativo

    tx.update(ref, {
      coins: newCoins,
      updatedAt: Timestamp.now(),
    });
  });

  return newCoins;
}

export async function updateStudentStatus(
  studentId: string,
  status: FirestoreStudent['status'],
  alertText?: string
): Promise<void> {
  const db = getDb();
  await db.collection(STUDENTS_COL).doc(studentId).update({
    status,
    statusAlertText: alertText || '',
    updatedAt: Timestamp.now(),
  });
}

export async function updateStudentDiagnosticCompleted(
  studentId: string
): Promise<void> {
  const db = getDb();
  await db.collection(STUDENTS_COL).doc(studentId).update({
    diagnosticCompleted: true,
    status: 'evoluindo_bem',
    statusAlertText: 'Diagnóstico concluído. Trilha personalizada criada.',
    updatedAt: Timestamp.now(),
  });
}

// ─── Habilidades ──────────────────────────────────────────────────────────────

export async function updateStudentAbility(
  studentAbilityId: string,
  updates: Partial<{
    state: AbilityState;
    score: number;
    attempts: number;
    revisions: number;
    interventions: number;
    autonomy: number;
  }>
): Promise<void> {
  if (updates.score !== undefined && (updates.score < 0 || updates.score > 100)) {
    throw new Error('Score deve estar entre 0 e 100');
  }

  const db = getDb();
  await db.collection(STUDENT_ABILITIES_COL).doc(studentAbilityId).update({
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

export async function confirmAbilityMastery(
  studentId: string,
  abilityId: string,
  evidence?: Record<string, string>,
  confirmedBy?: string
): Promise<void> {
  const db = getDb();

  // Busca o studentAbility correspondente
  const snap = await db
    .collection(STUDENT_ABILITIES_COL)
    .where('studentId', '==', studentId)
    .where('abilityId', '==', abilityId)
    .limit(1)
    .get();

  if (snap.empty) {
    throw new Error(`Habilidade ${abilityId} não encontrada para o estudante ${studentId}`);
  }

  const saRef = snap.docs[0].ref;
  const saData = snap.docs[0].data() as FirestoreStudentAbility;

  // Impede confirmação duplicada sem nova revisão
  if (saData.state === 'dominada') {
    throw new Error('Habilidade já confirmada como dominada. Registre uma nova revisão primeiro.');
  }

  const now = Timestamp.now();
  const updates: Record<string, unknown> = {
    state: 'dominada',
    score: 95,
    evidence: {
      precision: 'dominada',
      autonomy: 'dominada',
      consistency: 'dominada',
      ...evidence,
    },
    updatedAt: now,
  };

  if (confirmedBy) {
    updates['masteryConfirmedBy'] = confirmedBy;
    updates['masteryConfirmedAt'] = now;
  }

  await saRef.update(updates);

  // Atualiza status do estudante
  await updateStudentStatus(
    studentId,
    'pronto_avancar',
    'Domínio confirmado pelo professor com base nas evidências pedagógicas.'
  );

  // Registra histórico
  await addHistoryLog(studentId, {
    action: 'Domínio confirmado',
    detail: `Habilidade confirmada como dominada por ${confirmedBy || 'professor'}`,
    xpEarned: 0,
  });
}

// ─── Histórico ────────────────────────────────────────────────────────────────

export async function addHistoryLog(
  studentId: string,
  entry: {
    action: string;
    detail: string;
    xpEarned?: number;
    metadata?: Record<string, unknown>;
  }
): Promise<string> {
  const db = getDb();
  const now = Timestamp.now();

  const logData: Omit<FirestoreHistoryLog, 'id'> = {
    studentId,
    action: entry.action,
    detail: entry.detail,
    xpEarned: entry.xpEarned,
    metadata: entry.metadata,
    createdAt: now,
  };

  const ref = await db.collection(HISTORY_LOGS_COL).add(logData);
  return ref.id;
}
