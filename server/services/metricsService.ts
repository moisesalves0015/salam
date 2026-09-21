/**
 * server/services/metricsService.ts
 * 
 * Cálculo de métricas da turma a partir dos dados reais do Firestore.
 * As métricas são calculadas on-demand — não são persistidas (derivadas puras).
 */

import { getDb } from '../config/firebaseAdmin';
import { FirestoreStudent, MetricsResult } from '../types/server';

// ─── Métricas ─────────────────────────────────────────────────────────────────

export async function calculateClassMetrics(filters?: {
  schoolId?: string;
  classroomId?: string;
}): Promise<MetricsResult> {
  const db = getDb();
  let query: FirebaseFirestore.Query = db.collection('students')
    .where('active', '==', true);

  if (filters?.schoolId) {
    query = query.where('schoolId', '==', filters.schoolId);
  }
  if (filters?.classroomId) {
    query = query.where('classroomId', '==', filters.classroomId);
  }

  const snap = await query.get();
  const students = snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreStudent));

  const totalStudents = students.length;
  if (totalStudents === 0) {
    return getEmptyMetrics();
  }

  // Contagens por status
  const evolvingWell = students.filter((s) => s.status === 'evoluindo_bem').length;
  const needsAttention = students.filter((s) => s.status === 'atencao').length;
  const needsIntervention = students.filter((s) => s.status === 'intervencao').length;
  const readyToAdvance = students.filter((s) => s.status === 'pronto_avancar').length;

  // Progresso médio nas trilhas
  const avgProgress = students.reduce((acc, s) => {
    const avg = (
      s.trailProgress.portugues +
      s.trailProgress.matematica +
      s.trailProgress.ciencias
    ) / 3;
    return acc + avg;
  }, 0) / totalStudents;

  // Engajamento: percentual de alunos com streakDays > 0
  const engaged = students.filter((s) => s.streakDays > 0).length;
  const engagementPercent = Math.round((engaged / totalStudents) * 100);

  // Missões concluídas este mês
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const completedSnap = await db
    .collection('studentMissions')
    .where('status', '==', 'concluida')
    .where('completedAt', '>=', monthStart)
    .get();
  const completedMissionsMonth = completedSnap.size;

  // Trilhas ativas (missions com pelo menos 1 student em andamento)
  const activeTrailsSnap = await db
    .collection('studentMissions')
    .where('status', '==', 'em_andamento')
    .get();
  const activeTrailIds = new Set(
    activeTrailsSnap.docs.map((d) => d.data().missionId?.split('-')[0] || '')
  );
  const activeTrailsCount = Math.min(activeTrailIds.size, 4);

  // Progresso semanal (últimas 5 semanas — simulado a partir dos dados atuais)
  const progressByWeek = generateProgressByWeek(students);

  return {
    totalStudents,
    evolvingWell,
    evolvingWellPercent: Math.round((evolvingWell / totalStudents) * 100),
    needsAttention,
    needsAttentionPercent: Math.round((needsAttention / totalStudents) * 100),
    needsIntervention,
    needsInterventionPercent: Math.round((needsIntervention / totalStudents) * 100),
    readyToAdvance,
    averageMissionProgressPercent: Math.round(avgProgress),
    activeTrailsCount,
    completedMissionsMonth,
    completedMissionsMonthGrowth: 18, // TODO: calcular comparando com mês anterior
    classEngagementPercent: engagementPercent,
    classWeeklyGoalPercent: Math.min(100, Math.round(avgProgress * 1.1)),
    progressByWeek,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getEmptyMetrics(): MetricsResult {
  return {
    totalStudents: 0,
    evolvingWell: 0,
    evolvingWellPercent: 0,
    needsAttention: 0,
    needsAttentionPercent: 0,
    needsIntervention: 0,
    needsInterventionPercent: 0,
    readyToAdvance: 0,
    averageMissionProgressPercent: 0,
    activeTrailsCount: 0,
    completedMissionsMonth: 0,
    completedMissionsMonthGrowth: 0,
    classEngagementPercent: 0,
    classWeeklyGoalPercent: 0,
    progressByWeek: [],
  };
}

function generateProgressByWeek(
  students: FirestoreStudent[]
): { week: string; averageProgress: number }[] {
  // Gera dados de progresso semanal baseados no XP acumulado dos alunos
  const avgXp =
    students.reduce((acc, s) => acc + s.currentXp, 0) / students.length;

  const baseProgress = Math.min(75, Math.round(avgXp / 40));

  const now = new Date();
  const weeks: { week: string; averageProgress: number }[] = [];

  for (let i = 4; i >= 0; i--) {
    const weekDate = new Date(now);
    weekDate.setDate(weekDate.getDate() - i * 7);
    const weekNum = getWeekNumber(weekDate);
    const factor = (4 - i) / 4;
    weeks.push({
      week: `Sem. ${weekNum}`,
      averageProgress: Math.min(
        100,
        Math.round(baseProgress * (0.5 + factor * 0.5))
      ),
    });
  }

  return weeks;
}

function getWeekNumber(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - startOfYear.getTime();
  return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000));
}
