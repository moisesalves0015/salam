import { Student, Mission, CardItem, AchievementItem, InterventionRecord } from '../types';
import { getCurrentIdToken } from './firebaseClient';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3001';

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

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const token = await getCurrentIdToken();
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type') && options.body !== undefined) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_URL}${path}`, { ...options, headers });
  let data: ApiResponse<T> | undefined;
  try {
    data = await response.json() as ApiResponse<T>;
  } catch {
    if (response.ok) throw new Error(`Resposta inválida da API (HTTP ${response.status})`);
  }
  if (!response.ok) {
    throw new Error(data?.error || `HTTP ${response.status}`);
  }
  if (!data || data.success === false) {
    throw new Error(data?.error || 'Resposta inválida da API');
  }
  return data;
}

function requireData<T>(response: ApiResponse<T>, message: string): T {
  if (response.data === undefined || response.data === null) {
    throw new Error(response.error || message);
  }
  return response.data;
}

let _backendHealthy: boolean | null = null;
let _healthCheckPromise: Promise<boolean> | null = null;

export async function checkBackendHealth(): Promise<boolean> {
  if (_backendHealthy !== null) return _backendHealthy;
  if (_healthCheckPromise) return _healthCheckPromise;
  _healthCheckPromise = (async () => {
    try {
      const token = await getCurrentIdToken();
      const headers = new Headers();
      if (token) headers.set('Authorization', `Bearer ${token}`);
      const response = await fetch(`${API_URL}/api/health`, {
        signal: AbortSignal.timeout(3000),
        headers,
      });
      _backendHealthy = response.ok;
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

export const studentsApi = {
  async list(filters?: { schoolId?: string; classroomId?: string; status?: string }): Promise<Student[]> {
    const params = new URLSearchParams(Object.entries(filters ?? {}).filter(([, value]) => value !== undefined) as [string, string][]);
    return requireData(await apiFetch<Student[]>(`/api/students?${params}`), 'Falha ao buscar estudantes');
  },
  async get(studentId: string): Promise<Student | null> {
    const result = await apiFetch<Student>(`/api/students/${studentId}`);
    return result.data ?? null;
  },
  async create(data: { name: string; grade: string; classroom: string; pedagogicalNotes?: string; adaptations?: string[] }): Promise<Student> {
    return requireData(await apiFetch<Student>('/api/students', { method: 'POST', body: JSON.stringify(data) }), 'Falha ao criar estudante');
  },
  async completeDiagnostic(studentId: string, payload: { abilityId: string; answers: Record<string, unknown>; score?: number }): Promise<void> {
    await apiFetch(`/api/students/${studentId}/diagnostics`, { method: 'POST', body: JSON.stringify(payload) });
  },
  async confirmMastery(studentId: string, abilityId: string, evidence?: Record<string, string>): Promise<void> {
    await apiFetch(`/api/students/${studentId}/abilities/${abilityId}/mastery`, { method: 'POST', body: JSON.stringify({ evidence }) });
  },
};

export const missionsApi = {
  async list(filters?: { trailId?: string; subject?: string; studentId?: string }): Promise<Mission[]> {
    const params = new URLSearchParams(Object.entries(filters ?? {}).filter(([, value]) => value !== undefined) as [string, string][]);
    const path = filters?.studentId
      ? `/api/missions/student/${encodeURIComponent(filters.studentId)}?${params}`
      : `/api/missions?${params}`;
    return requireData(await apiFetch<Mission[]>(path), 'Falha ao buscar missões');
  },
  async get(missionId: string): Promise<Mission | null> {
    const result = await apiFetch<Mission>(`/api/missions/${missionId}`);
    return result.data ?? null;
  },
  async attempt(missionId: string, payload: { studentId: string; stepIndex: number; answer: string; timeSpentSeconds?: number }): Promise<AttemptResult> {
    return requireData(await apiFetch<AttemptResult>(`/api/missions/${missionId}/attempts`, { method: 'POST', body: JSON.stringify(payload) }), 'Falha ao registrar tentativa');
  },
  async complete(missionId: string, payload: { studentId: string; reflection?: string; evidence?: { explanation?: string; autonomy?: boolean } }): Promise<CompleteResult> {
    return requireData(await apiFetch<CompleteResult>(`/api/missions/${missionId}/complete`, { method: 'POST', body: JSON.stringify(payload) }), 'Falha ao concluir missão');
  },
};

export const interventionsApi = {
  async list(filters?: { studentId?: string; status?: string }): Promise<InterventionRecord[]> {
    const params = new URLSearchParams(filters as Record<string, string>);
    return requireData(await apiFetch<InterventionRecord[]>(`/api/interventions?${params}`), 'Falha ao buscar intervenções');
  },
  async create(payload: Omit<InterventionRecord, 'id'>): Promise<InterventionRecord> {
    return requireData(await apiFetch<InterventionRecord>('/api/interventions', { method: 'POST', body: JSON.stringify(payload) }), 'Falha ao criar intervenção');
  },
};

export const cardsApi = {
  async list(): Promise<CardItem[]> {
    return requireData(await apiFetch<CardItem[]>('/api/cards'), 'Falha ao buscar cards');
  },
  async getStudentCards(studentId: string): Promise<CardItem[]> {
    return requireData(await apiFetch<CardItem[]>(`/api/cards/student/${studentId}`), 'Falha ao buscar cards do estudante');
  },
};

export const achievementsApi = {
  async list(): Promise<AchievementItem[]> {
    return requireData(await apiFetch<AchievementItem[]>('/api/achievements'), 'Falha ao buscar conquistas');
  },
  async getStudentAchievements(studentId: string): Promise<AchievementItem[]> {
    return requireData(await apiFetch<AchievementItem[]>(`/api/achievements/student/${studentId}`), 'Falha ao buscar conquistas do estudante');
  },
};

export const metricsApi = {
  async getClassMetrics(filters?: { schoolId?: string; classroomId?: string }): Promise<ClassMetrics> {
    const params = new URLSearchParams(filters as Record<string, string>);
    return requireData(await apiFetch<ClassMetrics>(`/api/admin/metrics?${params}`), 'Falha ao buscar métricas');
  },
};

export const rewardsApi = {
  async list(): Promise<object[]> {
    return requireData(await apiFetch<object[]>('/api/rewards'), 'Falha ao buscar recompensas');
  },
  async redeem(rewardId: string, studentId: string): Promise<{ remainingCoins: number }> {
    return requireData(await apiFetch<{ remainingCoins: number }>(`/api/rewards/${rewardId}/redeem`, { method: 'POST', body: JSON.stringify({ studentId }) }), 'Falha ao resgatar recompensa');
  },
};

export const adminApi = {
  async me(): Promise<{ firebaseUid: string; userId: string; email: string; name: string; role: 'aluno' | 'professor' | 'coordenacao' | 'admin'; schoolId: string; classroomIds: string[]; studentId?: string }> {
    return requireData(await apiFetch<{ firebaseUid: string; userId: string; email: string; name: string; role: 'aluno' | 'professor' | 'coordenacao' | 'admin'; schoolId: string; classroomIds: string[]; studentId?: string }>('/api/auth/me'), 'Sessão sem perfil válido');
  },
  async studentSession(loginCode: string, pin: string): Promise<{ token: string }> {
    return requireData(await apiFetch<{ token: string }>('/api/auth/students/session', { method: 'POST', body: JSON.stringify({ loginCode, pin }) }), 'Falha no login do aluno');
  },
  async getOverview(): Promise<Record<string, number>> {
    return requireData(await apiFetch<Record<string, number>>('/api/admin-console/overview'), 'Falha ao carregar resumo administrativo');
  },
  async listRecords(collection: string, filters?: { schoolId?: string; status?: string; active?: boolean; limit?: number; startAfter?: string }): Promise<Record<string, unknown>[]> {
    const params = new URLSearchParams(Object.entries(filters ?? {}).filter(([, value]) => value !== undefined).map(([key, value]) => [key, String(value)]));
    return requireData(await apiFetch<Record<string, unknown>[]>(`/api/admin-console/${encodeURIComponent(collection)}?${params}`), `Falha ao buscar ${collection}`);
  },
  async createRecord(collection: string, payload: Record<string, unknown>): Promise<unknown> {
    const response = await apiFetch<Record<string, unknown>>(`/api/admin-console/${encodeURIComponent(collection)}`, { method: 'POST', body: JSON.stringify(payload) });
    const record = requireData(response, `Falha ao criar registro em ${collection}`);
    return { ...record, ...(response.passwordSetup ? { passwordSetup: response.passwordSetup } : {}), ...(response.credentials ? { credentials: response.credentials } : {}) };
  },
  async updateRecord(collection: string, id: string, payload: Record<string, unknown>): Promise<unknown> {
    return requireData(await apiFetch(`/api/admin-console/${encodeURIComponent(collection)}/${encodeURIComponent(id)}`, { method: 'PATCH', body: JSON.stringify(payload) }), `Falha ao editar registro em ${collection}`);
  },
  async archiveRecord(collection: string, id: string): Promise<void> {
    await apiFetch(`/api/admin-console/${encodeURIComponent(collection)}/${encodeURIComponent(id)}`, { method: 'DELETE' });
  },
};

export interface TrailCatalogItem {
  id: string;
  name: string;
  subject: string;
  description?: string;
  order?: number;
  icon?: string;
  color?: string;
  bnccSkills?: string[];
  active?: boolean;
}

export const trailsApi = {
  async list(): Promise<TrailCatalogItem[]> {
    return requireData(await apiFetch<TrailCatalogItem[]>('/api/trails'), 'Falha ao carregar trilhas');
  },
};

export const api = {
  students: studentsApi,
  missions: missionsApi,
  interventions: interventionsApi,
  cards: cardsApi,
  achievements: achievementsApi,
  metrics: metricsApi,
  rewards: rewardsApi,
  trails: trailsApi,
  admin: adminApi,
  checkHealth: checkBackendHealth,
  resetHealth: resetHealthCache,
};

export default api;
