/**
 * server/services/missionService.ts
 * Lógica de negócio para missões: tentativas, conclusão e desbloqueios.
 */
import { Timestamp } from 'firebase-admin/firestore';
import { getDb } from '../config/firebaseAdmin';
import {
  FirestoreMission, FirestoreStudentMission, FirestoreMissionAttempt,
  FirestoreStudentCard, FirestoreStudentAchievement, AttemptResult, CompleteResult,
} from '../types/server';

const MISSIONS_COL = 'missions';
const STUDENT_MISSIONS_COL = 'studentMissions';
const MISSION_ATTEMPTS_COL = 'missionAttempts';
const STUDENT_CARDS_COL = 'studentCards';
const STUDENT_ACHIEVEMENTS_COL = 'studentAchievements';
const ACHIEVEMENTS_COL = 'achievements';
const STUDENTS_COL = 'students';
const HISTORY_COL = 'historyLogs';

export async function listMissions(filters?: { trailId?: string; subject?: string; active?: boolean }): Promise<FirestoreMission[]> {
  const db = getDb();
  let query: FirebaseFirestore.Query = db.collection(MISSIONS_COL);
  if (filters?.active !== false) query = query.where('active', '==', true);
  if (filters?.trailId) query = query.where('trailId', '==', filters.trailId);
  if (filters?.subject) query = query.where('subject', '==', filters.subject);
  const snap = await query.orderBy('order', 'asc').get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreMission));
}

export async function getMission(missionId: string): Promise<FirestoreMission | null> {
  const doc = await getDb().collection(MISSIONS_COL).doc(missionId).get();
  return doc.exists ? ({ id: doc.id, ...doc.data() } as FirestoreMission) : null;
}

export async function getStudentMission(studentId: string, missionId: string): Promise<FirestoreStudentMission | null> {
  const snap = await getDb().collection(STUDENT_MISSIONS_COL).where('studentId', '==', studentId).where('missionId', '==', missionId).limit(1).get();
  return snap.empty ? null : ({ id: snap.docs[0].id, ...snap.docs[0].data() } as FirestoreStudentMission);
}

export async function getStudentMissions(studentId: string): Promise<FirestoreStudentMission[]> {
  const snap = await getDb().collection(STUDENT_MISSIONS_COL).where('studentId', '==', studentId).get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreStudentMission));
}

/** Active mission catalog joined with the student's persisted progress. */
export async function listStudentMissions(studentId: string, filters?: { trailId?: string; subject?: string }): Promise<Array<Omit<FirestoreMission, 'status' | 'progress'> & { status: string; progress: number }>> {
  const [missions, studentMissions] = await Promise.all([
    listMissions({ ...filters, active: true }), getStudentMissions(studentId),
  ]);
  const progressByMission = new Map(studentMissions.map((item) => [item.missionId, item]));
  return missions.map((mission) => {
    const saved = progressByMission.get(mission.id);
    return { ...mission, progress: Number(saved?.progress) || 0,
      status: saved?.status === 'concluida' ? 'concluida' : saved ? 'em_andamento' : 'Disponível' };
  });
}

function isActive(doc: FirebaseFirestore.DocumentData | undefined): boolean {
  return !!doc && doc.active !== false && doc.status !== 'inactive' && doc.status !== 'inativo';
}

export async function createMissionAttempt(missionId: string, payload: {
  studentId: string; stepIndex: number; answer: string; timeSpentSeconds: number;
}): Promise<AttemptResult> {
  const db = getDb();
  if (!Number.isInteger(payload.stepIndex) || payload.stepIndex < 0 || typeof payload.answer !== 'string' || payload.answer.length < 1 || payload.answer.length > 2000 || !Number.isInteger(payload.timeSpentSeconds) || payload.timeSpentSeconds < 0 || payload.timeSpentSeconds > 3600) throw new Error('Payload inválido');
  const missionDoc = await db.collection(MISSIONS_COL).doc(missionId).get();
  if (!missionDoc.exists) throw new Error(`Missão ${missionId} não encontrada`);
  const mission = missionDoc.data()!;
  if (!mission.active) throw new Error(`Missão ${missionId} não está ativa`);
  const steps = Array.isArray(mission.steps) ? mission.steps : [];
  if (payload.stepIndex >= steps.length) throw new Error(`Step ${payload.stepIndex} inválido para missão ${missionId}`);
  const step = steps[payload.stepIndex] as { options?: Array<{ text: string; correct: boolean; feedback?: string }>; contextProblem?: { expectedAnswer: number; explanationPrompt: string } };
  let isCorrect = false;
  let feedback = 'Resposta registrada.';
  if (step.options) {
    const normalized = payload.answer.trim().toLowerCase();
    const found = step.options.find((opt) => opt.text.trim().toLowerCase() === normalized)
      || step.options.find((opt) => normalized.length > 0 && opt.text.toLowerCase().includes(normalized.substring(0, 20)));
    if (found) { isCorrect = !!found.correct; feedback = found.feedback || (isCorrect ? 'Correto!' : 'Tente novamente.'); }
    else feedback = 'Resposta não reconhecida. Verifique as opções disponíveis.';
  } else if (step.contextProblem) {
    const n = Number.parseFloat(payload.answer.replace(/[^0-9.,-]/g, '').replace(',', '.'));
    isCorrect = Number.isFinite(n) && Math.abs(n - step.contextProblem.expectedAnswer) < 0.01;
    feedback = isCorrect ? `Correto! ${step.contextProblem.explanationPrompt}` : `Não é bem isso. ${step.contextProblem.explanationPrompt}`;
  } else { isCorrect = true; feedback = 'Etapa registrada com sucesso!'; }

  const now = Timestamp.now();
  const smRef = db.collection(STUDENT_MISSIONS_COL).doc(`${payload.studentId}_${missionId}`);
  const studentRef = db.collection(STUDENTS_COL).doc(payload.studentId);
  const attemptRef = db.collection(MISSION_ATTEMPTS_COL).doc();
  const historyRef = db.collection(HISTORY_COL).doc();
  let actualProgress = 0;
  let attemptNumber = 1;
  await db.runTransaction(async (tx) => {
    const [studentDoc, missionCheck, smDoc, priorAttempts] = await Promise.all([
      tx.get(studentRef), tx.get(db.collection(MISSIONS_COL).doc(missionId)), tx.get(smRef),
      tx.get(db.collection(MISSION_ATTEMPTS_COL).where('studentId', '==', payload.studentId).where('missionId', '==', missionId)),
    ]);
    if (!studentDoc.exists || !isActive(studentDoc.data())) throw new Error('Estudante não encontrado ou inativo');
    if (!missionCheck.exists || !missionCheck.data()?.active) throw new Error('Missão não encontrada ou inativa');
    if (smDoc.exists && smDoc.data()?.status === 'concluida') throw new Error('Esta missão já foi concluída por este estudante.');
    attemptNumber = priorAttempts.docs.filter((doc) => Number(doc.data().stepIndex) === payload.stepIndex).length + 1;
    const completedStepIndexes = new Set<number>(priorAttempts.docs
      .filter((doc) => doc.data().isCorrect === true)
      .map((doc) => Number(doc.data().stepIndex)));
    if (isCorrect) completedStepIndexes.add(payload.stepIndex);
    actualProgress = Math.round((completedStepIndexes.size / steps.length) * 100);
    const prev = smDoc.data();
    const smData = {
      studentId: payload.studentId, missionId, status: 'em_andamento',
      progress: actualProgress,
      attempts: Number(prev?.attempts || 0) + 1,
      completedAttempts: completedStepIndexes.size,
      currentStep: completedStepIndexes.size ? Math.max(...completedStepIndexes) : -1,
      lastAttemptAt: now, createdAt: prev?.createdAt || now, updatedAt: now,
    };
    tx.set(smRef, smData, { merge: true });
    tx.set(attemptRef, { studentId: payload.studentId, missionId, stepIndex: payload.stepIndex, answer: payload.answer, isCorrect, feedback, timeSpentSeconds: payload.timeSpentSeconds, attemptNumber, createdAt: now });
    tx.set(historyRef, { studentId: payload.studentId, action: isCorrect ? 'Tentativa correta' : 'Tentativa incorreta', detail: `Step ${payload.stepIndex + 1} da missão "${mission.title || missionId}"`, xpEarned: 0, metadata: { missionId, stepIndex: payload.stepIndex, attemptNumber }, createdAt: now });
  });
  return { attemptId: attemptRef.id, isCorrect, feedback, missionProgress: actualProgress };
}

export async function completeMission(missionId: string, payload: {
  studentId: string; reflection?: string; evidence?: Record<string, unknown>;
}): Promise<CompleteResult> {
  const db = getDb();
  const now = Timestamp.now();
  const studentRef = db.collection(STUDENTS_COL).doc(payload.studentId);
  const missionRef = db.collection(MISSIONS_COL).doc(missionId);
  const smRef = db.collection(STUDENT_MISSIONS_COL).doc(`${payload.studentId}_${missionId}`);
  const coinRef = db.collection('coinTransactions').doc(`${payload.studentId}_${missionId}`);
  const historyRef = db.collection(HISTORY_COL).doc();
  let result: CompleteResult = { success: true, xpEarned: 0, coinsEarned: 0, unlockedCards: [], unlockedAchievements: [] };

  await db.runTransaction(async (tx) => {
    // All reads, including dynamic unlock configuration and existing unlocks, occur before writes.
    const [studentDoc, missionDoc, smDoc, coinDoc, attempts] = await Promise.all([tx.get(studentRef), tx.get(missionRef), tx.get(smRef), tx.get(coinRef),
      tx.get(db.collection(MISSION_ATTEMPTS_COL).where('studentId', '==', payload.studentId).where('missionId', '==', missionId))]);
    if (!studentDoc.exists || !isActive(studentDoc.data())) throw new Error('Estudante não encontrado ou inativo');
    if (!missionDoc.exists) throw new Error(`Missão ${missionId} não encontrada`);
    const student = studentDoc.data()!;
    const mission = missionDoc.data()!;
    if (!mission.active) throw new Error('Missão não está ativa');
    if (!Number.isInteger(mission.xpReward) || mission.xpReward < 0 || !Number.isInteger(mission.coinsReward ?? 0) || (mission.coinsReward ?? 0) < 0) throw new Error('Recompensas da missão inválidas');
    if (!smDoc.exists) throw new Error('Progresso da missão não encontrado');
    const progress = smDoc.data()!;
    if (progress.status === 'concluida' || coinDoc.exists) throw new Error('Esta missão já foi concluída por este estudante.');
    const steps = Array.isArray(mission.steps) ? mission.steps : [];
    if (!steps.length) throw new Error('Missão sem etapas válidas.');
    if (progress.studentId !== payload.studentId || progress.missionId !== missionId) throw new Error('Progresso da missão inválido.');
    const correctSteps = new Set<number>(attempts.docs.filter((doc) => doc.data().isCorrect === true).map((doc) => Number(doc.data().stepIndex)));
    if (steps.some((_, index) => !correctSteps.has(index))) throw new Error('É necessário acertar todas as etapas para concluir a missão.');
    const realProgress = Math.round((correctSteps.size / steps.length) * 100);
    if (Number(progress.progress) !== realProgress) throw new Error('Progresso da missão inconsistente.');

    const cardIds: string[] = Array.isArray(mission.unlocksCards) ? mission.unlocksCards.filter((x: unknown) => typeof x === 'string' && x.length > 0) : [];
    const achievementIds: string[] = Array.isArray(mission.unlocksAchievements) ? mission.unlocksAchievements.filter((x: unknown) => typeof x === 'string' && x.length > 0) : [];
    const cardRefs = [...new Set(cardIds)].map((id) => ({ id, ref: db.collection(STUDENT_CARDS_COL).doc(`${payload.studentId}_${id}`) }));
    const achievementRefs = [...new Set(achievementIds)].map((id) => ({ id, ref: db.collection(STUDENT_ACHIEVEMENTS_COL).doc(`${payload.studentId}_${id}`), catalog: db.collection(ACHIEVEMENTS_COL).doc(id) }));
    const cardDocs = await Promise.all(cardRefs.map(({ ref }) => tx.get(ref)));
    const achDocs = await Promise.all(achievementRefs.map(({ ref }) => tx.get(ref)));
    const achCatalogDocs = await Promise.all(achievementRefs.map(({ catalog }) => tx.get(catalog)));
    const unlockedCards = cardRefs.filter((_, i) => !cardDocs[i].exists).map(({ id }) => id);
    const unlockedAchievements = achievementRefs.filter((_, i) => !achDocs[i].exists).map(({ id }) => id);
    let bonusXp = 0;
    achievementRefs.forEach((entry, i) => {
      if (!achDocs[i].exists && achCatalogDocs[i].exists) {
        const reward = achCatalogDocs[i].data()?.xpReward;
        if (Number.isInteger(reward) && reward > 0) bonusXp += reward;
      }
    });
    const totalXp = mission.xpReward + bonusXp;
    const newXp = Number(student.currentXp || 0) + totalXp;
    let level = Number(student.level || 0);
    let nextLevelXp = Number(student.nextLevelXp || 500);
    while (newXp >= nextLevelXp) { level += 1; nextLevelXp = level * 500; }
    const coins = Number(mission.coinsReward || 0);
    const xpEarned = totalXp;

    tx.update(studentRef, { currentXp: newXp, level, nextLevelXp, coins: Number(student.coins || 0) + coins, currentMissionId: null, updatedAt: now });
    tx.set(smRef, { ...progress, studentId: payload.studentId, missionId, status: 'concluida', progress: 100, completedAt: now, updatedAt: now });
    tx.set(coinRef, { studentId: payload.studentId, type: 'earned', amount: coins, reason: `Conclusão: ${mission.title || missionId}`, missionId, createdAt: now });
    cardRefs.forEach((entry, i) => {
      if (!cardDocs[i].exists) tx.set(entry.ref, { studentId: payload.studentId, cardId: entry.id, unlockedAt: now, createdAt: now } as unknown as Omit<FirestoreStudentCard, 'id'>);
    });
    achievementRefs.forEach((entry, i) => {
      if (!achDocs[i].exists) tx.set(entry.ref, { studentId: payload.studentId, achievementId: entry.id, unlockedAt: now, createdAt: now } as unknown as Omit<FirestoreStudentAchievement, 'id'>);
    });
    tx.set(historyRef, { studentId: payload.studentId, action: 'Missão concluída', detail: `Concluiu "${mission.title || missionId}" e ganhou ${xpEarned} XP`, xpEarned, metadata: { missionId, unlockedCards, unlockedAchievements, reflection: payload.reflection }, createdAt: now });
    result = { success: true, xpEarned, coinsEarned: coins, ...(level > Number(student.level || 0) ? { newLevel: level } : {}), unlockedCards, unlockedAchievements };
  });
  return result;
}
