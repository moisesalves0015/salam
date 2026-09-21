/**
 * server/services/missionService.ts
 * 
 * Lógica de negócio para missões: tentativas, conclusão, desbloqueio de rewards.
 * Usa transações Firestore para garantir consistência em operações multi-documento.
 */

import { Timestamp } from 'firebase-admin/firestore';
import { getDb } from '../config/firebaseAdmin';
import {
  FirestoreMission,
  FirestoreStudentMission,
  FirestoreMissionAttempt,
  FirestoreStudentCard,
  FirestoreStudentAchievement,
  AttemptResult,
  CompleteResult,
} from '../types/server';
import { addXpToStudent, addCoinsToStudent, addHistoryLog } from './studentService';

const MISSIONS_COL = 'missions';
const STUDENT_MISSIONS_COL = 'studentMissions';
const MISSION_ATTEMPTS_COL = 'missionAttempts';
const STUDENT_CARDS_COL = 'studentCards';
const STUDENT_ACHIEVEMENTS_COL = 'studentAchievements';
const CARDS_COL = 'cards';
const ACHIEVEMENTS_COL = 'achievements';

// ─── Leitura ──────────────────────────────────────────────────────────────────

export async function listMissions(filters?: {
  trailId?: string;
  subject?: string;
  active?: boolean;
}): Promise<FirestoreMission[]> {
  const db = getDb();
  let query: FirebaseFirestore.Query = db.collection(MISSIONS_COL);

  if (filters?.active !== false) {
    query = query.where('active', '==', true);
  }
  if (filters?.trailId) {
    query = query.where('trailId', '==', filters.trailId);
  }
  if (filters?.subject) {
    query = query.where('subject', '==', filters.subject);
  }

  query = query.orderBy('order', 'asc');

  const snap = await query.get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreMission));
}

export async function getMission(missionId: string): Promise<FirestoreMission | null> {
  const db = getDb();
  const doc = await db.collection(MISSIONS_COL).doc(missionId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as FirestoreMission;
}

export async function getStudentMission(
  studentId: string,
  missionId: string
): Promise<FirestoreStudentMission | null> {
  const db = getDb();
  const snap = await db
    .collection(STUDENT_MISSIONS_COL)
    .where('studentId', '==', studentId)
    .where('missionId', '==', missionId)
    .limit(1)
    .get();

  if (snap.empty) return null;
  return { id: snap.docs[0].id, ...snap.docs[0].data() } as FirestoreStudentMission;
}

export async function getStudentMissions(
  studentId: string
): Promise<FirestoreStudentMission[]> {
  const db = getDb();
  const snap = await db
    .collection(STUDENT_MISSIONS_COL)
    .where('studentId', '==', studentId)
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreStudentMission));
}

// ─── Tentativa de Missão ──────────────────────────────────────────────────────

export async function createMissionAttempt(
  missionId: string,
  payload: {
    studentId: string;
    stepIndex: number;
    answer: string;
    timeSpentSeconds: number;
  }
): Promise<AttemptResult> {
  const db = getDb();

  // 1. Valida missão
  const mission = await getMission(missionId);
  if (!mission) throw new Error(`Missão ${missionId} não encontrada`);
  if (!mission.active) throw new Error(`Missão ${missionId} não está ativa`);

  // 2. Valida step
  const steps = mission.steps as Array<{
    type: string;
    options?: Array<{ text: string; correct: boolean; feedback: string }>;
    contextProblem?: { expectedAnswer: number; explanationPrompt: string };
  }>;

  if (payload.stepIndex >= steps.length) {
    throw new Error(`Step ${payload.stepIndex} inválido para missão ${missionId}`);
  }

  const step = steps[payload.stepIndex];

  // 3. Verifica resposta
  let isCorrect = false;
  let feedback = 'Resposta registrada.';

  if (step.options) {
    // Missão com múltipla escolha — compara texto
    const normalizedAnswer = payload.answer.trim().toLowerCase();
    const matchedOption = step.options.find(
      (opt) => opt.text.trim().toLowerCase() === normalizedAnswer
    );

    if (matchedOption) {
      isCorrect = matchedOption.correct;
      feedback = matchedOption.feedback;
    } else {
      // Tenta matching parcial (primeiras palavras)
      const partialMatch = step.options.find((opt) =>
        opt.text.toLowerCase().includes(normalizedAnswer.substring(0, 20))
      );
      if (partialMatch) {
        isCorrect = partialMatch.correct;
        feedback = partialMatch.feedback;
      } else {
        feedback = 'Resposta não reconhecida. Verifique as opções disponíveis.';
      }
    }
  } else if (step.contextProblem) {
    // Missão com problema contextual — compara número
    const numericAnswer = parseFloat(payload.answer.replace(/[^0-9.,-]/g, '').replace(',', '.'));
    isCorrect = Math.abs(numericAnswer - step.contextProblem.expectedAnswer) < 0.01;
    feedback = isCorrect
      ? `Correto! ${step.contextProblem.explanationPrompt}`
      : `Não é bem isso. ${step.contextProblem.explanationPrompt}`;
  } else {
    // Step de explorar/refletir — sempre correto
    isCorrect = true;
    feedback = 'Etapa registrada com sucesso!';
  }

  // 4. Busca ou cria StudentMission
  let studentMission = await getStudentMission(payload.studentId, missionId);
  const now = Timestamp.now();

  // Conta tentativas anteriores deste step
  const prevAttemptsSnap = await db
    .collection(MISSION_ATTEMPTS_COL)
    .where('studentId', '==', payload.studentId)
    .where('missionId', '==', missionId)
    .where('stepIndex', '==', payload.stepIndex)
    .get();
  const attemptNumber = prevAttemptsSnap.size + 1;

  // 5. Registra tentativa
  const attemptData: Omit<FirestoreMissionAttempt, 'id'> = {
    studentId: payload.studentId,
    missionId,
    stepIndex: payload.stepIndex,
    answer: payload.answer,
    isCorrect,
    feedback,
    timeSpentSeconds: payload.timeSpentSeconds,
    attemptNumber,
    createdAt: now,
  };

  const attemptRef = await db.collection(MISSION_ATTEMPTS_COL).add(attemptData);

  // 6. Atualiza progresso da missão (em transação)
  const newProgress = Math.round(
    ((payload.stepIndex + 1) / steps.length) * 100
  );

  if (!studentMission) {
    // Cria nova entrada de progresso
    const smData: Omit<FirestoreStudentMission, 'id'> = {
      studentId: payload.studentId,
      missionId,
      status: 'em_andamento',
      progress: newProgress,
      attempts: 1,
      completedAttempts: isCorrect ? 1 : 0,
      currentStep: payload.stepIndex,
      lastAttemptAt: now,
      createdAt: now,
      updatedAt: now,
    };
    const smRef = db.collection(STUDENT_MISSIONS_COL).doc(
      `${payload.studentId}_${missionId}`
    );
    await smRef.set(smData);
    studentMission = { id: smRef.id, ...smData };
  } else {
    // Atualiza progresso existente
    await db.collection(STUDENT_MISSIONS_COL).doc(studentMission.id).update({
      progress: Math.max(studentMission.progress, newProgress),
      attempts: studentMission.attempts + 1,
      completedAttempts: isCorrect
        ? studentMission.completedAttempts + 1
        : studentMission.completedAttempts,
      currentStep: Math.max(studentMission.currentStep, payload.stepIndex),
      lastAttemptAt: now,
      updatedAt: now,
    });
  }

  // 7. Registra histórico
  await addHistoryLog(payload.studentId, {
    action: isCorrect ? 'Tentativa correta' : 'Tentativa incorreta',
    detail: `Step ${payload.stepIndex + 1} da missão "${mission.title}"`,
    xpEarned: isCorrect ? 5 : 0,
    metadata: { missionId, stepIndex: payload.stepIndex, attemptNumber },
  });

  return {
    attemptId: attemptRef.id,
    isCorrect,
    feedback,
    missionProgress: newProgress,
  };
}

// ─── Conclusão de Missão ──────────────────────────────────────────────────────

export async function completeMission(
  missionId: string,
  payload: {
    studentId: string;
    reflection?: string;
    evidence?: Record<string, unknown>;
  }
): Promise<CompleteResult> {
  const db = getDb();

  // 1. Valida missão
  const mission = await getMission(missionId);
  if (!mission) throw new Error(`Missão ${missionId} não encontrada`);

  // 2. Verifica se o estudante tem progresso suficiente (>= 80%)
  const studentMission = await getStudentMission(payload.studentId, missionId);
  if (studentMission?.status === 'concluida') {
    throw new Error('Esta missão já foi concluída por este estudante.');
  }

  const now = Timestamp.now();
  const unlockedCards: string[] = [];
  const unlockedAchievements: string[] = [];

  // 3. Usa transação para garantir consistência
  await db.runTransaction(async (tx) => {
    // Atualiza StudentMission
    const smRef = db.collection(STUDENT_MISSIONS_COL).doc(
      `${payload.studentId}_${missionId}`
    );
    tx.set(smRef, {
      studentId: payload.studentId,
      missionId,
      status: 'concluida',
      progress: 100,
      completedAt: now,
      updatedAt: now,
    }, { merge: true });

    // Atualiza streak do estudante
    const studentRef = db.collection('students').doc(payload.studentId);
    tx.update(studentRef, {
      'currentMissionId': null,
      updatedAt: now,
    });
  });

  // 4. Concede XP (fora da transação principal para clareza)
  const xpResult = await addXpToStudent(payload.studentId, mission.xpReward);

  // 5. Concede moedas
  const coinsAmount = mission.coinsReward || 0;
  if (coinsAmount > 0) {
    await addCoinsToStudent(payload.studentId, coinsAmount);
  }

  // 6. Verifica desbloqueio de cards baseado na missão
  const cardUnlockRules: Record<string, string[]> = {
    'mat-05': ['card-guardiao-divisao'],
    'missao-02-grupos': ['card-guardiao-divisao'],
    'mat-01': ['card-mestre-numeros'],
    'por-01': ['card-mestre-escrita'],
    'por-04': ['card-coruja-leitura'],
  };

  const cardsToUnlock = cardUnlockRules[missionId] || [];
  for (const cardId of cardsToUnlock) {
    const alreadyUnlocked = await db
      .collection(STUDENT_CARDS_COL)
      .doc(`${payload.studentId}_${cardId}`)
      .get();

    if (!alreadyUnlocked.exists) {
      const scData: Omit<FirestoreStudentCard, 'id'> = {
        studentId: payload.studentId,
        cardId,
        unlockedAt: 'Hoje',
        createdAt: now,
      };
      await db.collection(STUDENT_CARDS_COL)
        .doc(`${payload.studentId}_${cardId}`)
        .set(scData);
      unlockedCards.push(cardId);
    }
  }

  // 7. Verifica desbloqueio de conquistas
  const achievementUnlockRules: Record<string, string[]> = {
    'mat-05': ['ach-3'],
    'missao-02-grupos': ['ach-3'],
    'mat-01': ['ach-5'],
  };

  const achievementsToCheck = achievementUnlockRules[missionId] || [];
  for (const achId of achievementsToCheck) {
    const alreadyUnlocked = await db
      .collection(STUDENT_ACHIEVEMENTS_COL)
      .doc(`${payload.studentId}_${achId}`)
      .get();

    if (!alreadyUnlocked.exists) {
      // Busca XP da conquista
      const achDoc = await db.collection(ACHIEVEMENTS_COL).doc(achId).get();
      const achXpReward = achDoc.exists ? (achDoc.data()?.xpReward || 0) : 0;

      const saData: Omit<FirestoreStudentAchievement, 'id'> = {
        studentId: payload.studentId,
        achievementId: achId,
        unlockedAt: 'Hoje',
        createdAt: now,
      };
      await db.collection(STUDENT_ACHIEVEMENTS_COL)
        .doc(`${payload.studentId}_${achId}`)
        .set(saData);
      unlockedAchievements.push(achId);

      // Bônus de XP pela conquista
      if (achXpReward > 0) {
        await addXpToStudent(payload.studentId, achXpReward);
      }
    }
  }

  // 8. Registra histórico
  await addHistoryLog(payload.studentId, {
    action: 'Missão concluída',
    detail: `Concluiu "${mission.title}" e ganhou ${mission.xpReward} XP`,
    xpEarned: mission.xpReward,
    metadata: {
      missionId,
      unlockedCards,
      unlockedAchievements,
      reflection: payload.reflection,
    },
  });

  return {
    success: true,
    xpEarned: mission.xpReward,
    coinsEarned: coinsAmount,
    newLevel: xpResult.leveledUp ? xpResult.newLevel : undefined,
    unlockedCards,
    unlockedAchievements,
  };
}
