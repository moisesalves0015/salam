import { getDb } from '../config/firebaseAdmin';
import { FirestoreStudent, MetricsResult } from '../types/server';

export interface MetricsFilters {
  schoolId?: string;
  classroomId?: string;
  classroomIds?: string[];
}

export async function calculateClassMetrics(filters?: MetricsFilters): Promise<MetricsResult> {
  const db = getDb();
  let query: FirebaseFirestore.Query = db.collection('students').where('active', '==', true);
  if (filters?.schoolId) query = query.where('schoolId', '==', filters.schoolId);
  if (filters?.classroomId) query = query.where('classroomId', '==', filters.classroomId);
  const snap = await query.get();
  const allowedClassrooms = filters?.classroomIds ? new Set(filters.classroomIds) : undefined;
  const students = snap.docs.map((d) => ({ id: d.id, ...d.data() } as FirestoreStudent))
    .filter((s) => !allowedClassrooms || allowedClassrooms.has(s.classroomId));
  if (!students.length) return getEmptyMetrics();

  const totalStudents = students.length;
  const evolvingWell = students.filter((s) => s.status === 'evoluindo_bem').length;
  const needsAttention = students.filter((s) => s.status === 'atencao').length;
  const needsIntervention = students.filter((s) => s.status === 'intervencao').length;
  const readyToAdvance = students.filter((s) => s.status === 'pronto_avancar').length;
  const avgProgress = students.reduce((acc, s) => acc + ((s.trailProgress?.portugues || 0) + (s.trailProgress?.matematica || 0) + (s.trailProgress?.ciencias || 0)) / 3, 0) / totalStudents;
  const engagementPercent = Math.round((students.filter((s) => s.streakDays > 0).length / totalStudents) * 100);
  const studentIds = new Set(students.map((s) => s.id));
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const completedSnap = await db.collection('studentMissions').where('status', '==', 'concluida').get();
  const completed = completedSnap.docs.filter((d) => studentIds.has(String(d.get('studentId') || '')));
  const completedMissionsMonth = completed.filter((d) => {
    const date = toDate(d.get('completedAt'));
    return !!date && date >= monthStart && date <= now;
  }).length;
  const previousCount = completed.filter((d) => {
    const date = toDate(d.get('completedAt'));
    return !!date && date >= previousMonthStart && date < monthStart;
  }).length;
  const completedMissionsMonthGrowth = previousCount === 0
    ? 0
    : Math.round(((completedMissionsMonth - previousCount) / previousCount) * 100);

  const ongoing = await db.collection('studentMissions').where('status', '==', 'em_andamento').get();
  const missionIds = new Set(ongoing.docs.filter((d) => studentIds.has(String(d.get('studentId') || '')))
    .map((d) => d.get('missionId')).filter((id): id is string => typeof id === 'string' && !!id));
  const trailIds = new Set<string>();
  await Promise.all([...missionIds].map(async (id) => {
    let mission = await db.collection('missions').doc(id).get();
    if (!mission.exists) mission = await db.collection('tours').doc(id).get();
    const trailId = mission.exists ? mission.get('trailId') : undefined;
    if (typeof trailId === 'string' && trailId) trailIds.add(trailId);
  }));

  return {
    totalStudents, evolvingWell, evolvingWellPercent: Math.round(evolvingWell / totalStudents * 100),
    needsAttention, needsAttentionPercent: Math.round(needsAttention / totalStudents * 100),
    needsIntervention, needsInterventionPercent: Math.round(needsIntervention / totalStudents * 100),
    readyToAdvance, averageMissionProgressPercent: Math.round(avgProgress), activeTrailsCount: trailIds.size,
    completedMissionsMonth, completedMissionsMonthGrowth, classEngagementPercent: engagementPercent,
    classWeeklyGoalPercent: Math.min(100, Math.round(avgProgress * 1.1)),
    // Fonte histórica semanal ausente; não derivar uma série fictícia do estado atual.
    progressByWeek: [],
  };
}

function toDate(value: unknown): Date | null {
  if (value instanceof Date) return value;
  if (value && typeof (value as { toDate?: unknown }).toDate === 'function') {
    const d = (value as FirebaseFirestore.Timestamp).toDate();
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
}

function getEmptyMetrics(): MetricsResult {
  return {
    totalStudents: 0, evolvingWell: 0, evolvingWellPercent: 0, needsAttention: 0,
    needsAttentionPercent: 0, needsIntervention: 0, needsInterventionPercent: 0,
    readyToAdvance: 0, averageMissionProgressPercent: 0, activeTrailsCount: 0,
    completedMissionsMonth: 0, completedMissionsMonthGrowth: 0,
    classEngagementPercent: 0, classWeeklyGoalPercent: 0, progressByWeek: [],
  };
}
