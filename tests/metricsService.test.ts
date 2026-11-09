import { beforeEach, describe, expect, it, vi } from 'vitest';

const { db } = vi.hoisted(() => {
  const emptySnapshot = { docs: [], size: 0 };
  const query = { where: vi.fn(() => query), get: vi.fn(async () => emptySnapshot) };
  const db = { collection: vi.fn(() => query) };
  return { db };
});

vi.mock('../server/config/firebaseAdmin', () => ({ getDb: () => db }));

import { calculateClassMetrics } from '../server/services/metricsService';

describe('calculateClassMetrics', () => {
  beforeEach(() => vi.clearAllMocks());

  it('returns neutral contract values when the scoped query has no students', async () => {
    const result = await calculateClassMetrics({ schoolId: 'school-scope' });
    expect(result).toEqual({
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
    });
    expect(db.collection).toHaveBeenCalledWith('students');
  });
});
