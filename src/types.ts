export type UserRole = 'professor' | 'aluno' | 'coordenacao';

export type AbilityState = 
  | 'nao_desenvolvida' 
  | 'em_desenvolvimento' 
  | 'consolidando' 
  | 'dominada' 
  | 'transferencia';

export type StudentStatus = 
  | 'evoluindo_bem' 
  | 'atencao' 
  | 'intervencao' 
  | 'pronto_avancar';

export type Subject = 'Matemática' | 'Língua Portuguesa' | 'Ciências';

export interface AbilityDetail {
  id: string;
  name: string;
  subject: Subject;
  state: AbilityState;
  score: number; // 0 to 100
  attempts: number;
  revisions: number;
  interventions: number;
  autonomy: number; // 0 to 100
  evidence: {
    precision: AbilityState;
    autonomy: AbilityState;
    consistency: AbilityState;
    explanation: AbilityState;
    contextualSituation: AbilityState | 'nao_demonstrada';
  };
}

export interface CardItem {
  id: string;
  name: string;
  category: 'conhecimento' | 'conquista' | 'especiais' | 'personagens';
  description: string;
  subject?: Subject;
  rarity: 'comum' | 'incomum' | 'raro' | 'epico' | 'lendario';
  icon: string;
  formulaOrQuote?: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  category: 'evolucao' | 'persistencia' | 'colaboracao' | 'dominio';
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
}

export interface InterventionRecord {
  id: string;
  studentId: string;
  studentName: string;
  ability: string;
  subject: Subject;
  date: string;
  time: string;
  title: string;
  strategy: string; // e.g. "Uso de tampinhas e representação visual"
  initialAttemptError?: string;
  interventionApplied: string;
  newAttemptResult?: string;
  nextStep: string;
  status: 'agendada' | 'realizada' | 'em_andamento';
}

export interface MissionStep {
  type: 'explorar' | 'tentar' | 'revisar' | 'desafiar' | 'refletir';
  title: string;
  subtitle: string;
  content: string;
  question?: string;
  interactiveData?: {
    totalItems: number;
    targetGroups: number;
    itemsPerGroup: number;
    itemName: string;
    itemEmoji: string;
  };
  options?: { text: string; correct: boolean; feedback: string }[];
  contextProblem?: {
    scenario: string;
    total: number;
    divisor: number;
    question: string;
    expectedAnswer: number;
    explanationPrompt: string;
  };
  reflectionPrompt?: string;
}

export interface Mission {
  id: string;
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
  coinsReward?: number;
  steps: MissionStep[];
}

export interface Student {
  id: string;
  name: string;
  avatar: string;
  avatarUrl?: string;
  classroom: string;
  grade: string;
  teacherName: string;
  entryDate: string;
  status: StudentStatus;
  statusAlertText: string;
  level: number;
  currentXp: number;
  nextLevelXp: number;
  coins?: number;
  streakDays: number;
  weekDaysActive: { day: string; active: boolean; isToday?: boolean }[];
  trailProgress: {
    portugues: number;
    matematica: number;
    ciencias: number;
  };
  abilities: AbilityDetail[];
  currentMission: {
    id: string;
    title: string;
    primaryAbility: string;
    difficulty: 'Fácil' | 'Média' | 'Difícil';
    status: 'Em andamento' | 'Concluída' | 'Disponível' | 'Bloqueada';
    progress: number;
  };
  cards: CardItem[];
  achievements: AchievementItem[];
  interventions: InterventionRecord[];
  pedagogicalNotes: string;
  adaptations: string[];
  diagnosticCompleted: boolean;
  historyLog: {
    date: string;
    action: string;
    detail: string;
    xpEarned?: number;
  }[];
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
