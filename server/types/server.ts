/**
 * server/types/server.ts
 * 
 * Tipos compartilhados do backend.
 * Estende os tipos do frontend sem duplicar definições.
 */

import { Request } from 'express';
import {
  Student,
  Mission,
  CardItem,
  AchievementItem,
  InterventionRecord,
  AbilityDetail,
  AbilityState,
  Subject,
} from '../../src/types';

// Re-exportar tipos do frontend para uso no servidor
export type {
  Student,
  Mission,
  CardItem,
  AchievementItem,
  InterventionRecord,
  AbilityDetail,
  AbilityState,
  Subject,
};

// ─── Papéis de usuário ────────────────────────────────────────────────────────

export type UserRole = 'aluno' | 'professor' | 'coordenacao' | 'admin';

// ─── Usuário autenticado ──────────────────────────────────────────────────────

export interface AuthUser {
  /** UID do Firebase Authentication */
  firebaseUid: string;
  /** ID do documento na coleção users do Firestore */
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  schoolId: string;
  classroomIds: string[];
  /** ID do estudante (apenas para role=aluno) */
  studentId?: string;
}

// ─── Request autenticado ──────────────────────────────────────────────────────

export interface AuthRequest extends Request {
  user?: AuthUser;
}

// ─── Documentos Firestore ─────────────────────────────────────────────────────

export interface FirestoreSchool {
  id: string;
  name: string;
  code: string;
  active: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreUser {
  id: string;
  firebaseUid: string;
  name: string;
  email: string;
  role: UserRole;
  schoolId: string;
  classroomIds: string[];
  studentId?: string;
  active: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreClassroom {
  id: string;
  schoolId: string;
  name: string;
  grade: string;
  teacherIds: string[];
  studentIds: string[];
  active: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreStudent {
  id: string;
  userId?: string;
  schoolId: string;
  classroomId: string;
  name: string;
  avatar: string;
  avatarUrl?: string;
  grade: string;
  teacherName: string;
  entryDate: string;
  status: 'evoluindo_bem' | 'atencao' | 'intervencao' | 'pronto_avancar';
  statusAlertText: string;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  coins: number;
  streakDays: number;
  weekDaysActive: { day: string; active: boolean; isToday?: boolean }[];
  trailProgress: { portugues: number; matematica: number; ciencias: number };
  diagnosticCompleted: boolean;
  pedagogicalNotes: string;
  adaptations: string[];
  /** ID da missão atual */
  currentMissionId?: string;
  active: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreAbility {
  id: string;
  name: string;
  subject: Subject;
  description: string;
  bnccCode?: string;
  active: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreStudentAbility {
  id: string;
  studentId: string;
  abilityId: string;
  state: AbilityState;
  score: number;
  attempts: number;
  revisions: number;
  interventions: number;
  autonomy: number;
  evidence: {
    precision: AbilityState;
    autonomy: AbilityState;
    consistency: AbilityState;
    explanation: AbilityState;
    contextualSituation: AbilityState | 'nao_demonstrada';
  };
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreTrail {
  id: string;
  name: string;
  subject: Subject | 'Cultura';
  description: string;
  order: number;
  active: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreMission {
  id: string;
  trailId: string;
  title: string;
  subject: Subject;
  trailName: string;
  primaryAbility: string;
  difficulty: 'Fácil' | 'Média' | 'Difícil';
  status: 'Disponível' | 'Em andamento' | 'Concluída' | 'Bloqueada';
  progress: number;
  objective: string;
  estimatedMinutes: number;
  xpReward: number;
  coinsReward: number;
  participationMode: 'individual' | 'dupla' | 'grupo' | 'impresso';
  steps: object[];
  active: boolean;
  order: number;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreStudentMission {
  id: string;
  studentId: string;
  missionId: string;
  status: 'disponivel' | 'em_andamento' | 'concluida' | 'bloqueada';
  progress: number;
  attempts: number;
  completedAttempts: number;
  currentStep: number;
  lastAttemptAt?: FirebaseFirestore.Timestamp;
  completedAt?: FirebaseFirestore.Timestamp;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreMissionAttempt {
  id: string;
  studentId: string;
  missionId: string;
  stepIndex: number;
  answer: string;
  isCorrect: boolean;
  feedback: string;
  timeSpentSeconds: number;
  attemptNumber: number;
  createdAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreIntervention {
  id: string;
  studentId: string;
  studentName: string;
  abilityId: string;
  ability: string;
  subject: Subject;
  date: string;
  time: string;
  title: string;
  strategy: string;
  initialAttemptError?: string;
  interventionApplied: string;
  newAttemptResult?: string;
  nextStep: string;
  status: 'agendada' | 'realizada' | 'em_andamento';
  createdBy?: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreCard {
  id: string;
  name: string;
  category: 'conhecimento' | 'conquista' | 'especiais' | 'personagens';
  description: string;
  subject?: Subject;
  rarity: 'comum' | 'incomum' | 'raro' | 'epico' | 'lendario';
  icon: string;
  formulaOrQuote?: string;
  active: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreStudentCard {
  id: string;
  studentId: string;
  cardId: string;
  unlockedAt: string;
  createdAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreAchievement {
  id: string;
  title: string;
  description: string;
  category: 'evolucao' | 'persistencia' | 'colaboracao' | 'dominio';
  icon: string;
  color: string;
  xpReward: number;
  active: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreStudentAchievement {
  id: string;
  studentId: string;
  achievementId: string;
  unlockedAt: string;
  createdAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreDiagnostic {
  id: string;
  studentId: string;
  abilityId: string;
  answers: Record<string, string | number | boolean>;
  score: number;
  status: 'pendente' | 'em_andamento' | 'concluido';
  completedAt?: FirebaseFirestore.Timestamp;
  createdBy?: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreRecognitionEvent {
  id: string;
  studentId: string;
  type: 'evolucao' | 'persistencia' | 'colaboracao' | 'dominio' | 'cultura';
  title: string;
  description: string;
  category: string;
  celebrated: boolean;
  celebratedAt?: FirebaseFirestore.Timestamp;
  createdBy?: string;
  createdAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreCoinTransaction {
  id: string;
  studentId: string;
  type: 'earned' | 'spent' | 'adjustment';
  amount: number;
  reason: string;
  missionId?: string;
  rewardId?: string;
  createdBy?: string;
  createdAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreReward {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: string;
  icon: string;
  emoji: string;
  availability: 'disponivel' | 'esgotado' | 'reservado';
  popular?: boolean;
  note?: string;
  active: boolean;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreRedemption {
  id: string;
  studentId: string;
  rewardId: string;
  cost: number;
  status: 'pendente' | 'aprovado' | 'recusado' | 'entregue';
  redeemedAt: FirebaseFirestore.Timestamp;
  fulfilledAt?: FirebaseFirestore.Timestamp;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreHistoryLog {
  id: string;
  studentId: string;
  action: string;
  detail: string;
  xpEarned?: number;
  metadata?: Record<string, unknown>;
  createdAt: FirebaseFirestore.Timestamp;
}

export interface FirestoreMigrationRun {
  id: string;
  requestId: string;
  source: string;
  entities: string[];
  mode: 'upsert' | 'insert' | 'replace';
  dryRun: boolean;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'partially_completed';
  progress: Record<string, { created: number; updated: number; errors: number }>;
  errorLog: string[];
  startedAt?: FirebaseFirestore.Timestamp;
  completedAt?: FirebaseFirestore.Timestamp;
  createdBy?: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
}

// ─── Respostas de API ─────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface AttemptResult {
  attemptId: string;
  isCorrect: boolean;
  feedback: string;
  missionProgress: number;
  abilityUpdate?: Partial<AbilityDetail>;
}

export interface CompleteResult {
  success: boolean;
  xpEarned: number;
  coinsEarned: number;
  newLevel?: number;
  unlockedCards: string[];
  unlockedAchievements: string[];
  newAbilityState?: AbilityState;
}

export interface MetricsResult {
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

// ─── Payloads de Seed ─────────────────────────────────────────────────────────

export type SeedableEntity =
  | 'schools'
  | 'users'
  | 'classrooms'
  | 'students'
  | 'abilities'
  | 'trails'
  | 'missions'
  | 'studentMissions'
  | 'cards'
  | 'achievements'
  | 'interventions'
  | 'diagnostics'
  | 'rewards'
  | 'recognitionEvents'
  | 'historyLogs';

export interface SeedRequest {
  source: 'mock';
  entities: SeedableEntity[];
  mode: 'upsert' | 'insert' | 'replace';
  dryRun: boolean;
  requestId: string;
}

export interface SeedProgress {
  entity: string;
  created: number;
  updated: number;
  errors: number;
  errorMessages: string[];
}
