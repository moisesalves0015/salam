/**
 * src/services/api.ts
 * 
 * Cliente tipado de API para o frontend.
 * 
 * Centraliza todas as chamadas ao backend Express.
 * Fallback para dados mockados quando VITE_ENABLE_MOCK_FALLBACK=true.
 * 
 * NUNCA espalhar chamadas fetch diretamente nos componentes.
 */

import { Student, Mission, CardItem, AchievementItem, InterventionRecord } from '../types';
import { INITIAL_STUDENTS, INITIAL_CARDS, INITIAL_ACHIEVEMENTS, INITIAL_CLASS_METRICS } from '../data/initialData';
import { MISSIONS_MATEMATICA, MISSIONS_PORTUGUES, MISSIONS_CIENCIAS, MISSIONS_CULTURA } from '../data/missionsData';

// ─── Configuração ─────────────────────────────────────────────────────────────

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';
const MOCK_FALLBACK = (import.meta as any).env?.VITE_ENABLE_MOCK_FALLBACK === 'true';

export const ALL_MISSIONS_MOCK: Mission[] = [
  ...MISSIONS_MATEMATICA,
  ...MISSIONS_PORTUGUES,
  ...MISSIONS_CIENCIAS,
  ...MISSIONS_CULTURA,
];

// ─── Tipos de resposta ────────────────────────────────────────────────────────

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  total?: number;
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

// ─── Fetch wrapper ────────────────────────────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        // Adicione o Bearer token aqui quando implementar Firebase Auth:
        // 'Authorization': `Bearer ${await getFirebaseIdToken()}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || `HTTP ${response.status}`,
      };
    }

    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro de rede';
    console.warn(`[API] Erro em ${path}:`, message);
    return { success: false, error: message };
  }
}

// ─── Verificação de saúde do backend ─────────────────────────────────────────

let _backendHealthy: boolean | null = null;
let _healthCheckPromise: Promise<boolean> | null = null;

export async function checkBackendHealth(): Promise<boolean> {
  if (_backendHealthy !== null) return _backendHealthy;

  if (_healthCheckPromise) return _healthCheckPromise;

  _healthCheckPromise = fetch(`${API_URL}/api/health`, { signal: AbortSignal.timeout(3000) })
    .then((r) => r.ok)
    .catch(() => false)
    .then((healthy) => {
      _backendHealthy = healthy;
      _healthCheckPromise = null;
      if (!healthy) {
        console.warn('[API] ⚠️  Backend offline — usando dados mockados como fallback');
      }
      return healthy;
    });

  return _healthCheckPromise;
}

/** Reseta o cache de saúde (útil para reconexão) */
export function resetHealthCache(): void {
  _backendHealthy = null;
}

async function shouldUseMock(): Promise<boolean> {
  if (MOCK_FALLBACK) {
    const healthy = await checkBackendHealth();
    return !healthy;
  }
  return false;
}

// ─── API de Estudantes ────────────────────────────────────────────────────────

export const studentsApi = {
  async list(filters?: { schoolId?: string; classroomId?: string; status?: string }): Promise<Student[]> {
    if (await shouldUseMock()) {
      console.log('[API] Mock: students.list');
      return INITIAL_STUDENTS;
    }

    const params = new URLSearchParams(filters as Record<string, string>);
    const result = await apiFetch<Student[]>(`/api/students?${params}`);

    if (!result.success || !result.data) {
      if (MOCK_FALLBACK) return INITIAL_STUDENTS;
      throw new Error(result.error || 'Falha ao buscar estudantes');
    }

    return result.data;
  },

  async get(studentId: string): Promise<Student | null> {
    if (await shouldUseMock()) {
      return INITIAL_STUDENTS.find((s) => s.id === studentId) || null;
    }

    const result = await apiFetch<Student>(`/api/students/${studentId}`);
    if (!result.success) return null;
    return result.data || null;
  },

  async create(data: { name: string; grade: string; classroom: string; pedagogicalNotes?: string; adaptations?: string[] }): Promise<Student> {
    const result = await apiFetch<Student>('/api/students', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Falha ao criar estudante');
    }

    return result.data;
  },

  async completeDiagnostic(studentId: string, payload: { abilityId: string; answers: Record<string, unknown>; score?: number }): Promise<void> {
    const result = await apiFetch(`/api/students/${studentId}/diagnostics`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!result.success) {
      throw new Error(result.error || 'Falha ao registrar diagnóstico');
    }
  },

  async confirmMastery(studentId: string, abilityId: string, evidence?: Record<string, string>): Promise<void> {
    const result = await apiFetch(
      `/api/students/${studentId}/abilities/${abilityId}/mastery`,
      {
        method: 'POST',
        body: JSON.stringify({ evidence }),
      }
    );

    if (!result.success) {
      throw new Error(result.error || 'Falha ao confirmar domínio');
    }
  },
};

// ─── API de Missões ───────────────────────────────────────────────────────────

export const missionsApi = {
  async list(filters?: { trailId?: string; subject?: string }): Promise<Mission[]> {
    if (await shouldUseMock()) {
      console.log('[API] Mock: missions.list');
      return ALL_MISSIONS_MOCK;
    }

    const params = new URLSearchParams(filters as Record<string, string>);
    const result = await apiFetch<Mission[]>(`/api/missions?${params}`);

    if (!result.success || !result.data) {
      if (MOCK_FALLBACK) return ALL_MISSIONS_MOCK;
      throw new Error(result.error || 'Falha ao buscar missões');
    }

    return result.data;
  },

  async get(missionId: string): Promise<Mission | null> {
    if (await shouldUseMock()) {
      return ALL_MISSIONS_MOCK.find((m) => m.id === missionId) || null;
    }

    const result = await apiFetch<Mission>(`/api/missions/${missionId}`);
    return result.data || null;
  },

  async attempt(missionId: string, payload: {
    studentId: string;
    stepIndex: number;
    answer: string;
    timeSpentSeconds?: number;
  }): Promise<AttemptResult> {
    if (await shouldUseMock()) {
      // Mock: sempre retorna correto para demonstração
      return {
        attemptId: `mock-${Date.now()}`,
        isCorrect: true,
        feedback: 'Ótimo trabalho! (modo demonstração)',
        missionProgress: Math.min(100, (payload.stepIndex + 1) * 20),
      };
    }

    const result = await apiFetch<AttemptResult>(`/api/missions/${missionId}/attempts`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Falha ao registrar tentativa');
    }

    return result.data;
  },

  async complete(missionId: string, payload: {
    studentId: string;
    reflection?: string;
    evidence?: { explanation?: string; autonomy?: boolean };
  }): Promise<CompleteResult> {
    if (await shouldUseMock()) {
      return {
        success: true,
        xpEarned: 50,
        coinsEarned: 30,
        unlockedCards: ['card-guardiao-divisao'],
        unlockedAchievements: [],
      };
    }

    const result = await apiFetch<CompleteResult>(`/api/missions/${missionId}/complete`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Falha ao concluir missão');
    }

    return result.data;
  },
};

// ─── API de Intervenções ──────────────────────────────────────────────────────

export const interventionsApi = {
  async list(filters?: { studentId?: string; status?: string }): Promise<InterventionRecord[]> {
    if (await shouldUseMock()) {
      return INITIAL_STUDENTS.flatMap((s) => s.interventions || []);
    }

    const params = new URLSearchParams(filters as Record<string, string>);
    const result = await apiFetch<InterventionRecord[]>(`/api/interventions?${params}`);

    if (!result.success || !result.data) {
      if (MOCK_FALLBACK) return INITIAL_STUDENTS.flatMap((s) => s.interventions || []);
      throw new Error(result.error || 'Falha ao buscar intervenções');
    }

    return result.data;
  },

  async create(payload: Omit<InterventionRecord, 'id'>): Promise<InterventionRecord> {
    if (await shouldUseMock()) {
      return { ...payload, id: `int-${Date.now()}` };
    }

    const result = await apiFetch<InterventionRecord>('/api/interventions', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Falha ao criar intervenção');
    }

    return result.data;
  },
};

// ─── API de Cards ─────────────────────────────────────────────────────────────

export const cardsApi = {
  async list(): Promise<CardItem[]> {
    if (await shouldUseMock()) {
      return INITIAL_CARDS;
    }

    const result = await apiFetch<CardItem[]>('/api/cards');

    if (!result.success || !result.data) {
      if (MOCK_FALLBACK) return INITIAL_CARDS;
      throw new Error(result.error || 'Falha ao buscar cards');
    }

    return result.data;
  },

  async getStudentCards(studentId: string): Promise<CardItem[]> {
    if (await shouldUseMock()) {
      const student = INITIAL_STUDENTS.find((s) => s.id === studentId);
      return student?.cards || INITIAL_CARDS;
    }

    const result = await apiFetch<CardItem[]>(`/api/cards/student/${studentId}`);
    return result.data || [];
  },
};

// ─── API de Conquistas ────────────────────────────────────────────────────────

export const achievementsApi = {
  async list(): Promise<AchievementItem[]> {
    if (await shouldUseMock()) {
      return INITIAL_ACHIEVEMENTS;
    }

    const result = await apiFetch<AchievementItem[]>('/api/achievements');

    if (!result.success || !result.data) {
      if (MOCK_FALLBACK) return INITIAL_ACHIEVEMENTS;
      throw new Error(result.error || 'Falha ao buscar conquistas');
    }

    return result.data;
  },

  async getStudentAchievements(studentId: string): Promise<AchievementItem[]> {
    if (await shouldUseMock()) {
      const student = INITIAL_STUDENTS.find((s) => s.id === studentId);
      return student?.achievements || INITIAL_ACHIEVEMENTS;
    }

    const result = await apiFetch<AchievementItem[]>(`/api/achievements/student/${studentId}`);
    return result.data || [];
  },
};

// ─── API de Métricas ──────────────────────────────────────────────────────────

export const metricsApi = {
  async getClassMetrics(filters?: { schoolId?: string; classroomId?: string }): Promise<ClassMetrics> {
    if (await shouldUseMock()) {
      return INITIAL_CLASS_METRICS;
    }

    const params = new URLSearchParams(filters as Record<string, string>);
    const result = await apiFetch<ClassMetrics>(`/api/admin/metrics?${params}`);

    if (!result.success || !result.data) {
      if (MOCK_FALLBACK) return INITIAL_CLASS_METRICS;
      throw new Error(result.error || 'Falha ao buscar métricas');
    }

    return result.data;
  },
};

// ─── API de Recompensas ───────────────────────────────────────────────────────

export const rewardsApi = {
  async list(): Promise<object[]> {
    const result = await apiFetch<object[]>('/api/rewards');
    return result.data || [];
  },

  async redeem(rewardId: string, studentId: string): Promise<{ remainingCoins: number }> {
    const result = await apiFetch<{ remainingCoins: number }>(`/api/rewards/${rewardId}/redeem`, {
      method: 'POST',
      body: JSON.stringify({ studentId }),
    });

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Falha ao resgatar recompensa');
    }

    return result.data;
  },
};

// ─── API Administrativa ───────────────────────────────────────────────────────

export const adminApi = {
  async seed(payload: {
    source: 'mock';
    entities: string[];
    mode: 'upsert' | 'insert' | 'replace';
    dryRun: boolean;
    requestId: string;
  }): Promise<{ migrationRunId: string; progress?: unknown[] }> {
    const result = await apiFetch<{ migrationRunId: string; progress?: unknown[] }>(
      '/api/admin/seed',
      {
        method: 'POST',
        body: JSON.stringify(payload),
      }
    );

    if (!result.success || !result.data) {
      throw new Error(result.error || 'Falha ao executar seed');
    }

    return result.data;
  },

  async getSeedStatus(migrationRunId: string): Promise<unknown> {
    const result = await apiFetch(`/api/admin/seed/${migrationRunId}`);
    return result.data;
  },
};

// ─── Export unificado ─────────────────────────────────────────────────────────

export const api = {
  students: studentsApi,
  missions: missionsApi,
  interventions: interventionsApi,
  cards: cardsApi,
  achievements: achievementsApi,
  metrics: metricsApi,
  rewards: rewardsApi,
  admin: adminApi,
  checkHealth: checkBackendHealth,
  resetHealth: resetHealthCache,
};

export default api;
