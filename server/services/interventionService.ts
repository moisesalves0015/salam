/**
 * server/services/interventionService.ts
 * 
 * Operações de negócio para intervenções pedagógicas.
 */

import { Timestamp } from 'firebase-admin/firestore';
import { getDb } from '../config/firebaseAdmin';
import { FirestoreIntervention } from '../types/server';
import { InterventionPayload } from '../validators/schemas';
import { addHistoryLog } from './studentService';

const INTERVENTIONS_COL = 'interventions';
const STUDENT_ABILITIES_COL = 'studentAbilities';

// ─── Leitura ──────────────────────────────────────────────────────────────────

export async function listInterventions(filters?: {
  studentId?: string;
  classroomId?: string;
  status?: string;
}): Promise<FirestoreIntervention[]> {
  const db = getDb();
  let query: FirebaseFirestore.Query = db.collection(INTERVENTIONS_COL);

  if (filters?.studentId) {
    query = query.where('studentId', '==', filters.studentId);
  }
  if (filters?.status) {
    query = query.where('status', '==', filters.status);
  }

  query = query.orderBy('createdAt', 'desc');

  const snap = await query.get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreIntervention));
}

export async function getIntervention(
  interventionId: string
): Promise<FirestoreIntervention | null> {
  const db = getDb();
  const doc = await db.collection(INTERVENTIONS_COL).doc(interventionId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as FirestoreIntervention;
}

// ─── Criação ──────────────────────────────────────────────────────────────────

export async function createIntervention(
  payload: InterventionPayload,
  createdBy?: string
): Promise<FirestoreIntervention> {
  const db = getDb();

  // Valida que o estudante existe
  const studentDoc = await db.collection('students').doc(payload.studentId).get();
  if (!studentDoc.exists) {
    throw new Error(`Estudante ${payload.studentId} não encontrado`);
  }

  const now = Timestamp.now();

  // Busca abilityId correspondente ao nome da habilidade
  let abilityId = payload.ability.toLowerCase().replace(/\s+/g, '-');
  const abilitySnap = await db
    .collection('abilities')
    .where('name', '==', payload.ability)
    .limit(1)
    .get();
  if (!abilitySnap.empty) {
    abilityId = abilitySnap.docs[0].id;
  }

  const interventionData: Omit<FirestoreIntervention, 'id'> = {
    studentId: payload.studentId,
    studentName: payload.studentName,
    abilityId,
    ability: payload.ability,
    subject: payload.subject,
    date: payload.date,
    time: payload.time,
    title: payload.title,
    strategy: payload.strategy,
    initialAttemptError: payload.initialAttemptError,
    interventionApplied: payload.interventionApplied,
    newAttemptResult: payload.newAttemptResult,
    nextStep: payload.nextStep,
    status: payload.status,
    createdBy,
    createdAt: now,
    updatedAt: now,
  };

  const ref = db.collection(INTERVENTIONS_COL).doc();
  await ref.set(interventionData);

  // Atualiza contador de intervenções na habilidade do estudante
  try {
    const saSnap = await db
      .collection(STUDENT_ABILITIES_COL)
      .where('studentId', '==', payload.studentId)
      .where('abilityId', '==', abilityId)
      .limit(1)
      .get();

    if (!saSnap.empty) {
      const saRef = saSnap.docs[0].ref;
      const saData = saSnap.docs[0].data();
      await saRef.update({
        interventions: (saData.interventions || 0) + 1,
        updatedAt: now,
      });
    }
  } catch {
    // Não crítico — não bloqueia a criação da intervenção
    console.warn('[Intervention] Não foi possível atualizar contador de intervenções');
  }

  // Registra histórico
  await addHistoryLog(payload.studentId, {
    action: 'Intervenção registrada',
    detail: `"${payload.title}" — ${payload.ability}`,
    metadata: { interventionId: ref.id, strategy: payload.strategy },
  });

  return { id: ref.id, ...interventionData };
}

// ─── Atualização ──────────────────────────────────────────────────────────────

export async function updateIntervention(
  interventionId: string,
  updates: Partial<{
    status: FirestoreIntervention['status'];
    newAttemptResult: string;
    nextStep: string;
    interventionApplied: string;
  }>
): Promise<FirestoreIntervention> {
  const db = getDb();
  const ref = db.collection(INTERVENTIONS_COL).doc(interventionId);
  
  const doc = await ref.get();
  if (!doc.exists) {
    throw new Error(`Intervenção ${interventionId} não encontrada`);
  }

  await ref.update({
    ...updates,
    updatedAt: Timestamp.now(),
  });

  const updated = await ref.get();
  return { id: updated.id, ...updated.data() } as FirestoreIntervention;
}
