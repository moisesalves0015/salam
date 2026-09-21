/**
 * server/validators/schemas.ts
 * 
 * Schemas de validação Zod para todos os payloads da API.
 * 
 * Garante:
 * - Tipos corretos
 * - Valores dentro dos ranges esperados
 * - Campos obrigatórios presentes
 * - Enums válidos
 */

import { z } from 'zod';

// ─── Enums base ───────────────────────────────────────────────────────────────

export const SubjectEnum = z.enum(['Matemática', 'Língua Portuguesa', 'Ciências']);

export const AbilityStateEnum = z.enum([
  'nao_desenvolvida',
  'em_desenvolvimento',
  'consolidando',
  'dominada',
  'transferencia',
]);

export const StudentStatusEnum = z.enum([
  'evoluindo_bem',
  'atencao',
  'intervencao',
  'pronto_avancar',
]);

export const DifficultyEnum = z.enum(['Fácil', 'Média', 'Difícil']);

export const MissionStatusEnum = z.enum([
  'Disponível',
  'Em andamento',
  'Concluída',
  'Bloqueada',
]);

export const ParticipationModeEnum = z.enum([
  'individual',
  'dupla',
  'grupo',
  'impresso',
]);

export const UserRoleEnum = z.enum(['aluno', 'professor', 'coordenacao', 'admin']);

export const InterventionStatusEnum = z.enum([
  'agendada',
  'realizada',
  'em_andamento',
]);

export const CardCategoryEnum = z.enum([
  'conhecimento',
  'conquista',
  'especiais',
  'personagens',
]);

export const CardRarityEnum = z.enum([
  'comum',
  'incomum',
  'raro',
  'epico',
  'lendario',
]);

export const AchievementCategoryEnum = z.enum([
  'evolucao',
  'persistencia',
  'colaboracao',
  'dominio',
]);

// ─── Schemas de Missão ────────────────────────────────────────────────────────

export const missionAttemptSchema = z.object({
  studentId: z.string().min(1, 'studentId é obrigatório'),
  stepIndex: z.number().int().min(0, 'stepIndex deve ser >= 0'),
  answer: z.string().min(1, 'answer é obrigatório'),
  timeSpentSeconds: z.number().int().min(0).max(3600).optional().default(0),
});

export const completeMissionSchema = z.object({
  studentId: z.string().min(1, 'studentId é obrigatório'),
  reflection: z.string().optional(),
  evidence: z
    .object({
      explanation: z.string().optional(),
      autonomy: z.boolean().optional(),
      precision: z.boolean().optional(),
    })
    .optional(),
});

export type MissionAttemptPayload = z.infer<typeof missionAttemptSchema>;
export type CompleteMissionPayload = z.infer<typeof completeMissionSchema>;

// ─── Schema de Intervenção ────────────────────────────────────────────────────

export const interventionSchema = z.object({
  studentId: z.string().min(1),
  studentName: z.string().min(1),
  ability: z.string().min(1),
  subject: SubjectEnum,
  date: z.string().min(1),
  time: z.string().min(1),
  title: z.string().min(1),
  strategy: z.string().min(1),
  initialAttemptError: z.string().optional(),
  interventionApplied: z.string().min(1),
  newAttemptResult: z.string().optional(),
  nextStep: z.string().min(1),
  status: InterventionStatusEnum.default('agendada'),
});

export type InterventionPayload = z.infer<typeof interventionSchema>;

// ─── Schema de Diagnóstico ────────────────────────────────────────────────────

export const diagnosticSchema = z.object({
  abilityId: z.string().min(1),
  answers: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
  score: z.number().min(0).max(100).optional(),
});

export type DiagnosticPayload = z.infer<typeof diagnosticSchema>;

// ─── Schema de Confirmação de Domínio ─────────────────────────────────────────

export const masterySchema = z.object({
  notes: z.string().optional(),
  evidence: z
    .object({
      precision: AbilityStateEnum.optional(),
      autonomy: AbilityStateEnum.optional(),
      consistency: AbilityStateEnum.optional(),
      explanation: AbilityStateEnum.optional(),
      contextualSituation: z
        .union([AbilityStateEnum, z.literal('nao_demonstrada')])
        .optional(),
    })
    .optional(),
  confirmedAt: z.string().optional(),
});

export type MasteryPayload = z.infer<typeof masterySchema>;

// ─── Schema de Seed (migração) ────────────────────────────────────────────────

export const seedableEntityEnum = z.enum([
  'schools',
  'users',
  'classrooms',
  'students',
  'abilities',
  'trails',
  'missions',
  'studentMissions',
  'cards',
  'achievements',
  'interventions',
  'diagnostics',
  'rewards',
  'recognitionEvents',
  'historyLogs',
]);

export const seedRequestSchema = z.object({
  source: z.literal('mock'),
  entities: z.array(seedableEntityEnum).min(1, 'Selecione pelo menos uma entidade'),
  mode: z.enum(['upsert', 'insert', 'replace']).default('upsert'),
  dryRun: z.boolean().default(false),
  requestId: z.string().min(1, 'requestId é obrigatório'),
});

export const rollbackSchema = z.object({
  requestId: z.string().min(1),
  confirmed: z.literal(true, {
    message: 'confirmed deve ser true para executar rollback',
  }),
  entities: z.array(seedableEntityEnum).optional(),
});

export type SeedRequestPayload = z.infer<typeof seedRequestSchema>;
export type RollbackPayload = z.infer<typeof rollbackSchema>;

// ─── Schema de Estudante ──────────────────────────────────────────────────────

export const createStudentSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  grade: z.string().min(1),
  classroom: z.string().min(1),
  pedagogicalNotes: z.string().optional(),
  adaptations: z.array(z.string()).optional(),
});

export type CreateStudentPayload = z.infer<typeof createStudentSchema>;

// ─── Schema de Resgate de Recompensa ─────────────────────────────────────────

export const redeemRewardSchema = z.object({
  studentId: z.string().min(1),
});

export type RedeemRewardPayload = z.infer<typeof redeemRewardSchema>;

// ─── Helper de validação ──────────────────────────────────────────────────────

export type ValidationResult<T> = 
  | { success: true; data: T; errors?: undefined }
  | { success: false; errors: string[]; data?: undefined };

export function validatePayload<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }

  const zodError = result.error;
  const errors = (zodError?.issues || []).map(
    (e: z.ZodIssue) => `${e.path.join('.')}: ${e.message}`
  );
  
  return { success: false, errors };
}
