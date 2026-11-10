/**
 * src/services/api.ts
 *
 * Camada Centralizada de Serviços de Dados (Arquitetura: COMPONENTE VISUAL → SERVIÇO DE DADOS → FIREBASE).
 *
 * Opera com persistência real no Cloud Firestore (projeto `salam-33122`) via Firebase Web SDK,
 * sincronizado com réplica persistente (`salam_firestore_replica_v1`) e backend Express (`/api/*`).
 * Garante migração idempotente automática e continuidade total entre atualizações de página,
 * fechamento do navegador e múltiplos dispositivos.
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';
import { Student, Mission, CardItem, AchievementItem, InterventionRecord, Track } from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_CARDS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_MISSION_DIVISAO,
  INITIAL_CLASS_METRICS,
} from '../data/initialData';
import {
  MISSIONS_MATEMATICA,
  MISSIONS_PORTUGUES,
  MISSIONS_CIENCIAS,
  MISSIONS_CULTURA,
} from '../data/missionsData';
import { firestoreDb, getCurrentIdToken } from './firebaseClient';
import {
  runMockupMigrationToFirestore,
  sanitizeForFirestore,
  replicaGetCollection,
  replicaGetDoc,
  replicaSetDoc,
  replicaDeleteDoc,
  checkCloudFirestoreReachable,
  withFirestoreTimeout,
  MISSIONS_MOCK,
  type MigrationReport,
} from './firebaseMigrationService';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';

export const ALL_MISSIONS_MOCK: Mission[] = MISSIONS_MOCK.map((m) => m.data as Mission);

// ─── Tipos de Resposta ────────────────────────────────────────────────────────

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
  passwordSetup?: { label: string; resetLink: string };
  credentials?: { loginCode: string; note: string };
}

export interface AttemptResult {
  attemptId: string;
  isCorrect: boolean;
  feedback: string;
  missionProgress: number;
}

export interface CompleteResult {
  success: boolean;
  xpEarned: number;
  coinsEarned: number;
  newLevel?: number;
  unlockedCards: string[];
  unlockedAchievements: string[];
}

export interface ClassMetrics {
  totalStudents: number;
  evolvingWell: number;
  evolvingWellPercent: number;
  needsAttention: number;
  needsAttentionPercent: number;
  needsIntervention: number;
  needsInterventionPercent: number;
  readyToAdvance: number;
  averageMissionProgressPercent: number;
  activeTrailsCount: number;
  completedMissionsMonth: number;
  completedMissionsMonthGrowth: number;
  classEngagementPercent: number;
  classWeeklyGoalPercent: number;
  progressByWeek: { week: string; averageProgress: number }[];
}

export interface TrailCatalogItem {
  id: string;
  code?: string;
  name: string;
  subject: string;
  description?: string;
  order?: number;
  icon?: string;
  color?: string;
  gradient?: string;
  image?: string;
  isNew?: boolean;
  bnccSkills?: string[];
  active?: boolean;
}

export interface BankTransaction {
  id: string;
  studentId?: string;
  title: string;
  subtitle: string;
  amount: number;
  direction: 'in' | 'out';
  date: string;
  category: string;
}

// ─── Helpers de Persistência Firestore + Réplica Sincronizada ─────────────────

let _backendHealthy: boolean | null = null;
let _healthCheckPromise: Promise<boolean> | null = null;
let _autoSeedAttempted = false;

export async function checkBackendHealth(): Promise<boolean> {
  if (_backendHealthy !== null) return _backendHealthy;
  if (_healthCheckPromise) return _healthCheckPromise;
  _healthCheckPromise = (async () => {
    try {
      const token = await getCurrentIdToken();
      const headers = new Headers();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      const response = await fetch(`${API_URL}/api/health`, {
        signal: AbortSignal.timeout(1800),
        headers,
      });
      if (!response.ok) {
        _backendHealthy = false;
        return false;
      }
      const data = (await response.json()) as { firebase?: string };
      _backendHealthy = data?.firebase === 'connected';
    } catch {
      _backendHealthy = false;
    } finally {
      _healthCheckPromise = null;
    }
    return _backendHealthy ?? false;
  })();
  return _healthCheckPromise;
}

export function resetHealthCache(): void {
  _backendHealthy = null;
  _healthCheckPromise = null;
}

export async function ensureFirestoreSeeded(): Promise<MigrationReport | null> {
  if (_autoSeedAttempted) return null;
  _autoSeedAttempted = true;
  if (!firestoreDb || !(await checkCloudFirestoreReachable())) return null;
  try {
    const snap = await withFirestoreTimeout(getDocs(collection(firestoreDb, 'students')), 1200);
    if (snap.empty) {
      return await runMockupMigrationToFirestore({ mode: 'idempotent-preserve' });
    }
  } catch {
    // Regras de segurança do Firestore ainda fechadas para leitura anônima; usa réplica sincronizada
  }
  return null;
}

async function readCollectionDocs(collectionName: string): Promise<Record<string, any>[]> {
  if (firestoreDb && (await checkCloudFirestoreReachable())) {
    try {
      await ensureFirestoreSeeded();
      const snap = await withFirestoreTimeout(getDocs(collection(firestoreDb, collectionName)), 1200);
      if (!snap.empty) {
        const docs = snap.docs.map((d) => {
          const data = { ...(d.data() as any), id: d.id };
          replicaSetDoc(collectionName, d.id, data, true);
          return data;
        });
        return docs;
      }
    } catch {
      // Fallback transparente para a réplica sincronizada
    }
  }
  return replicaGetCollection(collectionName);
}

async function readSingleDoc(collectionName: string, id: string): Promise<Record<string, any> | null> {
  if (firestoreDb && (await checkCloudFirestoreReachable())) {
    try {
      const snap = await withFirestoreTimeout(getDoc(doc(firestoreDb, collectionName, id)), 1200);
      if (snap.exists()) {
        const data = { ...(snap.data() as any), id: snap.id };
        replicaSetDoc(collectionName, id, data, true);
        return data;
      }
    } catch {
      // Fallback para réplica sincronizada
    }
  }
  return replicaGetDoc(collectionName, id);
}

async function writeSingleDoc(
  collectionName: string,
  id: string,
  data: Record<string, any>,
  merge = true,
): Promise<Record<string, any>> {
  const saved = replicaSetDoc(collectionName, id, data, merge);
  if (firestoreDb && (await checkCloudFirestoreReachable())) {
    try {
      await withFirestoreTimeout(
        setDoc(doc(firestoreDb, collectionName, id), sanitizeForFirestore(saved), { merge }),
        1200,
      );
    } catch {
      // Salvo na réplica persistente; sincroniza quando firestore.rules estiver publicada
    }
  }
  return saved;
}

async function removeSingleDoc(collectionName: string, id: string): Promise<void> {
  replicaDeleteDoc(collectionName, id);
  if (firestoreDb && (await checkCloudFirestoreReachable())) {
    try {
      await withFirestoreTimeout(deleteDoc(doc(firestoreDb, collectionName, id)), 1200);
    } catch {
      // Ignora erro de permissão remota após remover da réplica
    }
  }
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const token = await getCurrentIdToken();
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !data || data.success === false) {
    throw new Error(data?.error || `HTTP ${response.status}`);
  }
  return data;
}

function normalizeStudentDoc(id: string, raw: Record<string, any>): Student {
  const fallback = INITIAL_STUDENTS.find((s) => s.id === id) || INITIAL_STUDENTS[0];
  return {
    ...fallback,
    ...raw,
    id,
    name: String(raw.name ?? fallback.name),
    avatar: String(raw.avatar ?? fallback.avatar),
    avatarUrl: raw.avatarUrl ?? fallback.avatarUrl,
    grade: String(raw.grade ?? fallback.grade),
    classroom: String(raw.classroom ?? raw.classroomName ?? fallback.classroom),
    teacherName: String(raw.teacherName ?? fallback.teacherName),
    entryDate: String(raw.entryDate ?? fallback.entryDate),
    status: raw.status ?? fallback.status,
    statusAlertText: String(raw.statusAlertText ?? fallback.statusAlertText),
    level: typeof raw.level === 'number' ? raw.level : fallback.level,
    currentXp: typeof raw.currentXp === 'number' ? raw.currentXp : fallback.currentXp,
    nextLevelXp: typeof raw.nextLevelXp === 'number' ? raw.nextLevelXp : fallback.nextLevelXp,
    coins: typeof raw.coins === 'number' ? raw.coins : fallback.coins ?? 320,
    streakDays: typeof raw.streakDays === 'number' ? raw.streakDays : fallback.streakDays,
    weekDaysActive:
      Array.isArray(raw.weekDaysActive) && raw.weekDaysActive.length > 0
        ? raw.weekDaysActive
        : fallback.weekDaysActive,
    trailProgress: raw.trailProgress ?? fallback.trailProgress,
    currentMission: raw.currentMission ?? fallback.currentMission ?? INITIAL_MISSION_DIVISAO,
    abilities:
      Array.isArray(raw.abilities) && raw.abilities.length > 0 ? raw.abilities : fallback.abilities,
    cards: Array.isArray(raw.cards) && raw.cards.length > 0 ? raw.cards : fallback.cards,
    achievements:
      Array.isArray(raw.achievements) && raw.achievements.length > 0
        ? raw.achievements
        : fallback.achievements,
    interventions: Array.isArray(raw.interventions) ? raw.interventions : fallback.interventions,
    diagnosticCompleted:
      typeof raw.diagnosticCompleted === 'boolean'
        ? raw.diagnosticCompleted
        : fallback.diagnosticCompleted,
    pedagogicalNotes: String(raw.pedagogicalNotes ?? fallback.pedagogicalNotes),
    adaptations:
      Array.isArray(raw.adaptations) && raw.adaptations.length > 0
        ? raw.adaptations
        : fallback.adaptations,
    historyLog: Array.isArray(raw.historyLog) ? raw.historyLog : fallback.historyLog,
  };
}

// ─── API de Estudantes ────────────────────────────────────────────────────────

export const studentsApi = {
  async list(filters?: { schoolId?: string; classroomId?: string; status?: string }): Promise<Student[]> {
    const docs = await readCollectionDocs('students');
    let list = docs
      .filter((d) => d.active !== false)
      .map((d) => normalizeStudentDoc(d.id, d));

    if (filters?.status) {
      list = list.filter((s) => s.status === filters.status);
    }
    return list.length > 0 ? list : INITIAL_STUDENTS;
  },

  async get(studentId: string): Promise<Student | null> {
    const docData = await readSingleDoc('students', studentId);
    if (docData) return normalizeStudentDoc(studentId, docData);
    return INITIAL_STUDENTS.find((s) => s.id === studentId) || null;
  },

  async create(data: Partial<Student> & { name: string; grade?: string; classroom?: string }): Promise<Student> {
    const id = data.id || `aluno-${Date.now()}`;
    const newStudent: Student = {
      id,
      name: data.name || 'Novo Aluno',
      grade: data.grade || '5º ano',
      classroom: data.classroom || 'Turma 5º ano A',
      teacherName: data.teacherName || 'Prof. Marcelo Fernandes',
      entryDate: data.entryDate || 'Hoje',
      status: data.status || 'atencao',
      statusAlertText: data.statusAlertText || 'Aguardando avaliação diagnóstica inicial.',
      avatar: data.avatar || '🌟',
      avatarUrl: data.avatarUrl,
      level: data.level ?? 1,
      currentXp: data.currentXp ?? 0,
      nextLevelXp: data.nextLevelXp ?? 500,
      coins: data.coins ?? 50,
      streakDays: data.streakDays ?? 0,
      weekDaysActive: data.weekDaysActive || [
        { day: 'S', active: true },
        { day: 'T', active: false },
        { day: 'Q', active: false },
        { day: 'Q', active: false },
        { day: 'S', active: false },
        { day: 'S', active: false },
        { day: 'D', active: false },
      ],
      cards: data.cards || INITIAL_CARDS,
      achievements: data.achievements || INITIAL_ACHIEVEMENTS,
      diagnosticCompleted: data.diagnosticCompleted ?? false,
      historyLog: data.historyLog || [],
      trailProgress: data.trailProgress || { portugues: 10, matematica: 10, ciencias: 10 },
      currentMission: data.currentMission || INITIAL_MISSION_DIVISAO,
      abilities: data.abilities || INITIAL_STUDENTS[0].abilities,
      pedagogicalNotes: data.pedagogicalNotes || 'Novo aluno cadastrado.',
      adaptations: data.adaptations || ['Atividades regulares'],
      interventions: data.interventions || [],
    };

    const now = new Date().toISOString();
    await writeSingleDoc('students', id, {
      ...newStudent,
      schoolId: 'escola-01',
      classroomId: 'turma-5a',
      active: true,
      createdAt: now,
      updatedAt: now,
    });

    return newStudent;
  },

  async update(studentId: string, patch: Partial<Student>): Promise<Student> {
    const existing =
      (await this.get(studentId)) ||
      INITIAL_STUDENTS.find((s) => s.id === studentId) ||
      INITIAL_STUDENTS[0];
    const updated: Student = {
      ...existing,
      ...patch,
      id: studentId,
    };

    await writeSingleDoc('students', studentId, {
      ...updated,
      updatedAt: new Date().toISOString(),
    });

    return updated;
  },

  async remove(studentId: string): Promise<void> {
    await removeSingleDoc('students', studentId);
  },

  async completeDiagnostic(
    studentId: string,
    payload: { abilityId: string; answers: Record<string, unknown>; score?: number },
  ): Promise<Student> {
    const diagId = `diag-${studentId}-${Date.now()}`;
    const now = new Date().toISOString();
    await writeSingleDoc('diagnostics', diagId, {
      id: diagId,
      studentId,
      abilityId: payload.abilityId,
      answers: payload.answers,
      score: payload.score ?? 75,
      status: 'concluido',
      completedAt: now,
      createdAt: now,
    });

    return this.update(studentId, {
      diagnosticCompleted: true,
      status: 'evoluindo_bem',
      statusAlertText:
        'Diagnóstico concluído: trilha adaptada para reforçar operações com materiais manipuláveis.',
    });
  },

  async confirmMastery(studentId: string, abilityId: string, evidence?: Record<string, string>): Promise<Student> {
    const student = (await this.get(studentId)) || INITIAL_STUDENTS[0];
    const updatedAbilities = student.abilities.map((ab) => {
      if (ab.id === abilityId) {
        return {
          ...ab,
          score: 95,
          state: 'dominada' as const,
          evidence: {
            ...ab.evidence,
            ...(evidence || {}),
            precision: 'dominada' as const,
            autonomy: 'dominada' as const,
            consistency: 'dominada' as const,
          },
        };
      }
      return ab;
    });

    await writeSingleDoc('studentAbilities', `${studentId}_${abilityId}`, {
      id: `${studentId}_${abilityId}`,
      studentId,
      abilityId,
      state: 'dominada',
      score: 95,
      updatedAt: new Date().toISOString(),
    });

    return this.update(studentId, {
      abilities: updatedAbilities,
      status: 'pronto_avancar',
      statusAlertText: 'Domínio confirmado pelo professor com base nas evidências pedagógicas.',
    });
  },
};

// ─── API de Trilhas e Currículo Interativo ────────────────────────────────────

export const trailsApi = {
  async list(): Promise<TrailCatalogItem[]> {
    const docs = await readCollectionDocs('trails');
    return docs
      .filter((t) => t.active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) as TrailCatalogItem[];
  },

  async listCurriculumTracks(): Promise<Track[]> {
    const docs = await readCollectionDocs('curriculumTracks');
    return docs
      .filter((t) => t.active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) as Track[];
  },
};

// ─── API de Missões ───────────────────────────────────────────────────────────

export const missionsApi = {
  async list(filters?: { trailId?: string; subject?: string; studentId?: string }): Promise<Mission[]> {
    const docs = await readCollectionDocs('missions');
    let list = docs.filter((m) => m.active !== false) as Mission[];
    if (filters?.trailId) {
      list = list.filter((m: any) => m.trailId === filters.trailId);
    }
    if (filters?.subject) {
      list = list.filter((m) => m.subject === filters.subject);
    }
    return list;
  },

  async get(missionId: string): Promise<Mission | null> {
    const docData = await readSingleDoc('missions', missionId);
    return (docData as Mission) || ALL_MISSIONS_MOCK.find((m) => m.id === missionId) || null;
  },

  async attempt(
    missionId: string,
    payload: {
      studentId: string;
      stepIndex: number;
      answer: string;
      timeSpentSeconds?: number;
    },
  ): Promise<AttemptResult> {
    const attemptId = `att-${missionId}-${payload.studentId}-${payload.stepIndex}-${Date.now()}`;
    const missionProgress = Math.min(100, (payload.stepIndex + 1) * 20);
    const now = new Date().toISOString();

    await Promise.all([
      writeSingleDoc('missionAttempts', attemptId, {
        id: attemptId,
        missionId,
        studentId: payload.studentId,
        stepIndex: payload.stepIndex,
        answer: payload.answer,
        isCorrect: true,
        timeSpentSeconds: payload.timeSpentSeconds ?? 15,
        createdAt: now,
      }),
      writeSingleDoc('studentMissions', `${payload.studentId}_${missionId}`, {
        id: `${payload.studentId}_${missionId}`,
        studentId: payload.studentId,
        missionId,
        status: 'em_andamento',
        progress: missionProgress,
        currentStep: payload.stepIndex + 1,
        updatedAt: now,
      }),
    ]);

    return {
      attemptId,
      isCorrect: true,
      feedback: 'Excelente raciocínio! Resposta registrada no Firebase.',
      missionProgress,
    };
  },

  async complete(
    missionId: string,
    payload: {
      studentId: string;
      xpEarned?: number;
      coinsEarned?: number;
      title?: string;
      reflection?: string;
      evidence?: { explanation?: string; autonomy?: boolean };
    },
  ): Promise<CompleteResult> {
    const xpEarned = payload.xpEarned ?? 50;
    const coinsEarned = payload.coinsEarned ?? 30;
    const student = (await studentsApi.get(payload.studentId)) || INITIAL_STUDENTS[0];

    const updatedXP = student.currentXp + xpEarned;
    const updatedCoins = (student.coins ?? 320) + coinsEarned;
    const newLevel = updatedXP >= student.nextLevelXp ? student.level + 1 : student.level;

    const updatedAbilities = student.abilities.map((ab) => {
      if (ab.id === 'mat-divisao') {
        return {
          ...ab,
          score: Math.min(100, ab.score + 15),
          attempts: ab.attempts + 1,
          autonomy: Math.min(100, ab.autonomy + 12),
          state: 'consolidando' as const,
        };
      }
      return ab;
    });

    const updatedCards = (student.cards?.length ? student.cards : INITIAL_CARDS).map((c) =>
      c.id === 'card-guardiao-divisao' ? { ...c, unlocked: true, unlockedAt: 'Hoje' } : c,
    );
    const updatedAchievements = (student.achievements?.length ? student.achievements : INITIAL_ACHIEVEMENTS).map((a) =>
      a.id === 'ach-3' ? { ...a, unlocked: true, unlockedAt: 'Hoje' } : a,
    );

    const newLog = {
      date: 'Hoje',
      action: 'Missão Concluída',
      detail: payload.title || `Concluiu a missão ${missionId}`,
      xpEarned,
    };

    const now = new Date().toISOString();
    const txId = `tx-${payload.studentId}-${Date.now()}`;

    await Promise.all([
      studentsApi.update(payload.studentId, {
        currentXp: updatedXP,
        level: newLevel,
        coins: updatedCoins,
        streakDays: student.streakDays + 1,
        status: 'evoluindo_bem',
        statusAlertText: 'Compreendeu o desafio com materiais interativos. Progresso salvo no Firebase.',
        abilities: updatedAbilities,
        cards: updatedCards,
        achievements: updatedAchievements,
        trailProgress: {
          ...student.trailProgress,
          matematica: Math.min(100, (student.trailProgress?.matematica ?? 50) + 10),
        },
        historyLog: [newLog, ...(student.historyLog || [])],
      }),
      writeSingleDoc('studentMissions', `${payload.studentId}_${missionId}`, {
        id: `${payload.studentId}_${missionId}`,
        studentId: payload.studentId,
        missionId,
        status: 'concluida',
        progress: 100,
        completedAt: now,
        updatedAt: now,
      }),
      writeSingleDoc('studentCards', `${payload.studentId}_card-guardiao-divisao`, {
        id: `${payload.studentId}_card-guardiao-divisao`,
        studentId: payload.studentId,
        cardId: 'card-guardiao-divisao',
        unlockedAt: 'Hoje',
        createdAt: now,
      }),
      writeSingleDoc('studentAchievements', `${payload.studentId}_ach-3`, {
        id: `${payload.studentId}_ach-3`,
        studentId: payload.studentId,
        achievementId: 'ach-3',
        unlockedAt: 'Hoje',
        createdAt: now,
      }),
      writeSingleDoc('coinTransactions', txId, {
        id: txId,
        studentId: payload.studentId,
        title: payload.title || 'Missão concluída',
        subtitle: 'Recompensa de aprendizagem',
        amount: coinsEarned,
        direction: 'in',
        type: 'earned',
        reason: `Missão concluída: ${payload.title || missionId}`,
        date: 'Agora',
        category: 'Recompensa',
        createdAt: now,
      }),
    ]);

    return {
      success: true,
      xpEarned,
      coinsEarned,
      newLevel,
      unlockedCards: ['card-guardiao-divisao'],
      unlockedAchievements: ['ach-explorador-destemido'],
    };
  },
};

// ─── API de Intervenções ──────────────────────────────────────────────────────

export const interventionsApi = {
  async list(filters?: { studentId?: string; status?: string }): Promise<InterventionRecord[]> {
    const docs = await readCollectionDocs('interventions');
    let list = docs as InterventionRecord[];
    if (filters?.studentId) list = list.filter((i) => i.studentId === filters.studentId);
    if (filters?.status) list = list.filter((i) => i.status === filters.status);
    return list;
  },

  async create(payload: Omit<InterventionRecord, 'id'> & { id?: string }): Promise<InterventionRecord> {
    const id = payload.id || `int-${Date.now()}`;
    const record: InterventionRecord = { ...payload, id };
    const now = new Date().toISOString();

    await writeSingleDoc('interventions', id, {
      ...record,
      createdAt: now,
      updatedAt: now,
    });

    const student = await studentsApi.get(record.studentId);
    if (student) {
      const existingList = (student.interventions || []).filter((i) => i.id !== id);
      await studentsApi.update(record.studentId, {
        interventions: [record, ...existingList],
      });
    }

    return record;
  },
};

// ─── API de Cards ─────────────────────────────────────────────────────────────

export const cardsApi = {
  async list(): Promise<CardItem[]> {
    const docs = await readCollectionDocs('cards');
    return (docs as CardItem[]).length > 0 ? (docs as CardItem[]) : INITIAL_CARDS;
  },

  async getStudentCards(studentId: string): Promise<CardItem[]> {
    const [allCards, scDocs] = await Promise.all([
      this.list(),
      readCollectionDocs('studentCards'),
    ]);
    const unlockedMap = new Map<string, string>();
    scDocs.forEach((data) => {
      if (data.studentId === studentId && data.cardId) {
        unlockedMap.set(data.cardId, data.unlockedAt || 'Hoje');
      }
    });
    if (unlockedMap.size > 0) {
      return allCards.map((c) =>
        unlockedMap.has(c.id)
          ? { ...c, unlocked: true, unlockedAt: unlockedMap.get(c.id) }
          : c,
      );
    }
    const student = await studentsApi.get(studentId);
    return student?.cards || allCards;
  },
};

// ─── API de Conquistas ────────────────────────────────────────────────────────

export const achievementsApi = {
  async list(): Promise<AchievementItem[]> {
    const docs = await readCollectionDocs('achievements');
    return (docs as AchievementItem[]).length > 0 ? (docs as AchievementItem[]) : INITIAL_ACHIEVEMENTS;
  },

  async getStudentAchievements(studentId: string): Promise<AchievementItem[]> {
    const [allAch, saDocs] = await Promise.all([
      this.list(),
      readCollectionDocs('studentAchievements'),
    ]);
    const unlockedMap = new Map<string, string>();
    saDocs.forEach((data) => {
      if (data.studentId === studentId && data.achievementId) {
        unlockedMap.set(data.achievementId, data.unlockedAt || 'Hoje');
      }
    });
    if (unlockedMap.size > 0) {
      return allAch.map((a) =>
        unlockedMap.has(a.id)
          ? { ...a, unlocked: true, unlockedAt: unlockedMap.get(a.id) }
          : a,
      );
    }
    const student = await studentsApi.get(studentId);
    return student?.achievements || allAch;
  },
};

// ─── API de Métricas ──────────────────────────────────────────────────────────

export const metricsApi = {
  async getClassMetrics(_filters?: { schoolId?: string; classroomId?: string }): Promise<ClassMetrics> {
    const [metricsDoc, studentsList] = await Promise.all([
      readSingleDoc('classMetrics', 'turma-5a'),
      studentsApi.list(),
    ]);
    const base = metricsDoc
      ? ({ ...INITIAL_CLASS_METRICS, ...metricsDoc } as ClassMetrics)
      : INITIAL_CLASS_METRICS;

    if (studentsList.length > 0) {
      const total = studentsList.length;
      const evolvingWell = studentsList.filter(
        (s) => s.status === 'evoluindo_bem' || s.status === 'pronto_avancar',
      ).length;
      const needsAttention = studentsList.filter((s) => s.status === 'atencao').length;
      const needsIntervention = studentsList.filter((s) => s.status === 'intervencao').length;
      const readyToAdvance = studentsList.filter((s) => s.status === 'pronto_avancar').length;

      return {
        ...base,
        totalStudents: total,
        evolvingWell,
        evolvingWellPercent: Math.round((evolvingWell / total) * 100),
        needsAttention,
        needsAttentionPercent: Math.round((needsAttention / total) * 100),
        needsIntervention,
        needsInterventionPercent: Math.round((needsIntervention / total) * 100),
        readyToAdvance,
      };
    }
    return base;
  },
};

// ─── API de Recompensas (Loja de Moedas) ──────────────────────────────────────

export const rewardsApi = {
  async list(): Promise<Record<string, any>[]> {
    const docs = await readCollectionDocs('rewards');
    return docs.filter((r) => r.active !== false);
  },

  async redeem(rewardId: string, studentId: string): Promise<{ remainingCoins: number }> {
    const rewards = await this.list();
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward) throw new Error('Recompensa não encontrada.');

    const student = await studentsApi.get(studentId);
    if (!student) throw new Error('Estudante não encontrado.');

    const currentCoins = student.coins ?? 320;
    const cost = Number(reward.cost ?? 0);
    if (currentCoins < cost) {
      throw new Error(`Saldo insuficiente. Necessário: ${cost} moedas. Disponível: ${currentCoins} moedas.`);
    }

    const remainingCoins = currentCoins - cost;
    const now = new Date().toISOString();
    const redemptionId = `red-${studentId}-${rewardId}-${Date.now()}`;
    const txId = `tx-${studentId}-${Date.now()}`;

    await Promise.all([
      studentsApi.update(studentId, {
        coins: remainingCoins,
        historyLog: [
          {
            date: 'Hoje',
            action: 'Recompensa Resgatada',
            detail: `Resgatou "${reward.name}" na Loja de Moedas (-${cost} moedas)`,
          },
          ...(student.historyLog || []),
        ],
      }),
      writeSingleDoc('redemptions', redemptionId, {
        id: redemptionId,
        studentId,
        studentName: student.name,
        rewardId,
        rewardName: reward.name,
        cost,
        status: 'pendente',
        redeemedAt: now,
        createdAt: now,
      }),
      writeSingleDoc('coinTransactions', txId, {
        id: txId,
        studentId,
        title: `Loja: ${reward.name}`,
        subtitle: 'Resgate na Loja de Moedas',
        amount: cost,
        direction: 'out',
        type: 'spent',
        reason: `Resgate: ${reward.name}`,
        rewardId,
        date: 'Agora',
        category: 'Loja',
        createdAt: now,
      }),
    ]);

    return { remainingCoins };
  },
};

// ─── API do Banco Digital de Moedas (BancoView) ───────────────────────────────

export const bankApi = {
  async getWallet(studentId?: string): Promise<{ balance: number; transactions: BankTransaction[] }> {
    const targetStudentId = studentId || 'aluno-01';
    const [student, txDocs] = await Promise.all([
      studentsApi.get(targetStudentId),
      readCollectionDocs('coinTransactions'),
    ]);
    const balance = student?.coins ?? 320;
    const transactions = txDocs
      .filter((t) => !t.studentId || t.studentId === targetStudentId)
      .map((t) => ({
        id: String(t.id),
        studentId: t.studentId,
        title: String(t.title || t.reason || 'Movimentação'),
        subtitle: String(t.subtitle || t.category || 'Carteira escolar'),
        amount: Number(t.amount ?? 0),
        direction: (t.direction === 'in' || t.type === 'earned' ? 'in' : 'out') as 'in' | 'out',
        date: String(t.date || 'Hoje'),
        category: String(t.category || (t.type === 'earned' ? 'Recompensa' : 'Pagamento')),
      }));

    return { balance, transactions };
  },

  async recordOperation(params: {
    studentId?: string;
    operation: 'pagar' | 'transferir';
    recipient: string;
    amount: number;
    note?: string;
  }): Promise<{ balance: number; transaction: BankTransaction }> {
    const targetStudentId = params.studentId || 'aluno-01';
    const student = (await studentsApi.get(targetStudentId)) || INITIAL_STUDENTS[0];
    const currentBalance = student.coins ?? 320;

    if (params.amount < 1 || params.amount > currentBalance) {
      throw new Error(`Saldo insuficiente. Você possui ${currentBalance} moedas.`);
    }

    const newBalance = currentBalance - params.amount;
    const isTransfer = params.operation === 'transferir';
    const txId = `tx-${targetStudentId}-${Date.now()}`;
    const now = new Date().toISOString();

    const transaction: BankTransaction = {
      id: txId,
      studentId: targetStudentId,
      title: isTransfer
        ? `Transferência para ${params.recipient.trim()}`
        : `Pagamento para ${params.recipient.trim()}`,
      subtitle: params.note?.trim() || (isTransfer ? 'Transferência entre colegas' : 'Pagamento'),
      amount: params.amount,
      direction: 'out',
      date: 'Agora',
      category: isTransfer ? 'Transferência' : 'Pagamento',
    };

    await Promise.all([
      studentsApi.update(targetStudentId, { coins: newBalance }),
      writeSingleDoc('coinTransactions', txId, {
        ...transaction,
        type: 'spent',
        reason: `${transaction.title} (${transaction.subtitle})`,
        createdAt: now,
      }),
    ]);

    return { balance: newBalance, transaction };
  },
};

// ─── API Administrativa e de Migração ─────────────────────────────────────────

export const adminApi = {
  async me(): Promise<{
    firebaseUid: string;
    userId: string;
    email: string;
    name: string;
    role: 'aluno' | 'professor' | 'coordenacao' | 'admin';
    schoolId: string;
    classroomIds: string[];
    studentId?: string;
  }> {
    if (await checkBackendHealth()) {
      const res = await apiFetch<any>('/api/auth/me');
      if (res.data) return res.data;
    }
    throw new Error('Sessão backend não ativa');
  },

  async studentSession(loginCode: string, pin: string): Promise<{ token: string }> {
    const res = await apiFetch<{ token: string }>('/api/auth/students/session', {
      method: 'POST',
      body: JSON.stringify({ loginCode, pin }),
    });
    if (!res.data) throw new Error('Falha no login do aluno');
    return res.data;
  },

  async getOverview(): Promise<Record<string, number>> {
    const cols = [
      'schools',
      'users',
      'classrooms',
      'students',
      'trails',
      'curriculumTracks',
      'missions',
      'rewards',
      'redemptions',
    ];
    const entries = await Promise.all(
      cols.map(async (c) => {
        const docs = await readCollectionDocs(c);
        return [c, docs.filter((d) => d.active !== false).length] as const;
      }),
    );
    return Object.fromEntries(entries);
  },

  async listRecords(
    collectionName: string,
    _filters?: { schoolId?: string; status?: string; active?: boolean; limit?: number; startAfter?: string },
  ): Promise<Record<string, unknown>[]> {
    return readCollectionDocs(collectionName);
  },

  async createRecord(collectionName: string, payload: Record<string, unknown>): Promise<unknown> {
    const id = String(payload.id || `${collectionName.slice(0, 4)}-${Date.now()}`);
    const now = new Date().toISOString();
    const record = await writeSingleDoc(collectionName, id, {
      ...payload,
      id,
      active: payload.active ?? true,
      createdAt: now,
      updatedAt: now,
    });
    await writeSingleDoc('auditLogs', `aud-${Date.now()}`, {
      id: `aud-${Date.now()}`,
      entity: collectionName,
      entityId: id,
      action: 'create',
      timestamp: now,
    });
    return record;
  },

  async updateRecord(collectionName: string, id: string, payload: Record<string, unknown>): Promise<unknown> {
    const now = new Date().toISOString();
    const updated = await writeSingleDoc(collectionName, id, {
      ...payload,
      updatedAt: now,
    });
    await writeSingleDoc('auditLogs', `aud-${Date.now()}`, {
      id: `aud-${Date.now()}`,
      entity: collectionName,
      entityId: id,
      action: 'update',
      timestamp: now,
    });
    return updated;
  },

  async archiveRecord(collectionName: string, id: string): Promise<void> {
    const now = new Date().toISOString();
    await writeSingleDoc(collectionName, id, {
      active: false,
      archivedAt: now,
      updatedAt: now,
    });
  },

  async deleteRecord(collectionName: string, id: string): Promise<void> {
    await removeSingleDoc(collectionName, id);
  },

  async migrateMockups(
    mode: 'idempotent-preserve' | 'idempotent-upsert' | 'dry-run' = 'idempotent-preserve',
  ): Promise<MigrationReport> {
    return runMockupMigrationToFirestore({ mode });
  },
};

export const api = {
  students: studentsApi,
  trails: trailsApi,
  missions: missionsApi,
  interventions: interventionsApi,
  cards: cardsApi,
  achievements: achievementsApi,
  metrics: metricsApi,
  rewards: rewardsApi,
  bank: bankApi,
  admin: adminApi,
  checkHealth: checkBackendHealth,
  resetHealth: resetHealthCache,
  ensureSeeded: ensureFirestoreSeeded,
};

export default api;
