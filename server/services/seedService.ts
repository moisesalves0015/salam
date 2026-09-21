/**
 * server/services/seedService.ts
 * 
 * Serviço de migração/seed dos dados mockados para o Firestore.
 * 
 * Características:
 * - Idempotente: usa set({ merge: true }) com IDs estáveis
 * - Operações em lote respeitando o limite de 500 do Firestore
 * - Dry-run: valida sem gravar
 * - Logs detalhados por entidade
 * - Transações para dados relacionados
 */

import { Timestamp, WriteBatch } from 'firebase-admin/firestore';
import { getDb } from '../config/firebaseAdmin';
import { SeedableEntity, SeedProgress, FirestoreMigrationRun } from '../types/server';

// Importa os dados mockados do frontend (preservando todos os IDs)
import { INITIAL_STUDENTS, INITIAL_CARDS, INITIAL_ACHIEVEMENTS } from '../../src/data/initialData';
import {
  MISSIONS_MATEMATICA,
  MISSIONS_PORTUGUES,
  MISSIONS_CIENCIAS,
  MISSIONS_CULTURA,
} from '../../src/data/missionsData';

// ─── Constantes ───────────────────────────────────────────────────────────────

const BATCH_SIZE = 400; // Firestore max é 500, usamos 400 como margem de segurança
const MIGRATION_RUNS_COL = 'migrationRuns';

// ─── Dados estáticos do seed ──────────────────────────────────────────────────

const SCHOOL_DATA = {
  id: 'escola-01',
  name: 'Escola Sala de Missões',
  code: 'ESM001',
  active: true,
};

const CLASSROOM_DATA = {
  id: 'turma-5a',
  schoolId: 'escola-01',
  name: 'Turma 5º ano A',
  grade: '5º ano',
  teacherIds: ['user-professor-carla'],
  studentIds: INITIAL_STUDENTS.map((s) => s.id),
  active: true,
};

const USERS_DATA = [
  {
    id: 'user-professor-carla',
    firebaseUid: 'mock-uid-professor-carla',
    name: 'Prof. Carla Souza',
    email: 'carla@escola.dev',
    role: 'professor',
    schoolId: 'escola-01',
    classroomIds: ['turma-5a'],
    active: true,
  },
  ...INITIAL_STUDENTS.map((s) => ({
    id: `user-${s.id}`,
    firebaseUid: `mock-uid-${s.id}`,
    name: s.name,
    email: `${s.id}@escola.dev`,
    role: 'aluno',
    schoolId: 'escola-01',
    classroomIds: ['turma-5a'],
    studentId: s.id,
    active: true,
  })),
];

const TRAILS_DATA = [
  { id: 'trail-mat', name: 'Reino da Matemática', subject: 'Matemática', description: 'Trilha de operações, geometria e resolução de problemas', order: 1, active: true },
  { id: 'trail-por', name: 'Jornada da Língua', subject: 'Língua Portuguesa', description: 'Trilha de leitura, escrita e interpretação', order: 2, active: true },
  { id: 'trail-cie', name: 'Ilha das Ciências', subject: 'Ciências', description: 'Trilha de ciências naturais e método científico', order: 3, active: true },
  { id: 'trail-cul', name: 'Mundo da Cultura', subject: 'Língua Portuguesa', description: 'Trilha de diversidade cultural, literatura e cidadania', order: 4, active: true },
];

// Mapeamento missão → trilha
const MISSION_TRAIL_MAP: Record<string, string> = {
  'mat-': 'trail-mat',
  'por-': 'trail-por',
  'cie-': 'trail-cie',
  'cul-': 'trail-cul',
  'missao-02-grupos': 'trail-mat',
};

const ALL_MISSIONS = [
  ...MISSIONS_MATEMATICA,
  ...MISSIONS_PORTUGUES,
  ...MISSIONS_CIENCIAS,
  ...MISSIONS_CULTURA,
  // Missão extra (não duplica se já existe)
];

// Recompensas da loja (extraídas de LojaMoedasView.tsx)
const REWARDS_DATA = [
  { id: 'lapis', name: 'Kit de Lápis Coloridos', description: 'Conjunto de 12 lápis de cor para suas criações artísticas', cost: 50, category: 'escola', icon: 'Palette', emoji: '✏️', availability: 'disponivel', popular: true, active: true },
  { id: 'caderno', name: 'Caderno de Aventuras', description: 'Caderno especial da Sala de Missões com capa personalizada', cost: 80, category: 'escola', icon: 'BookOpen', emoji: '📓', availability: 'disponivel', active: true },
  { id: 'estojo', name: 'Estojo do Explorador', description: 'Estojo exclusivo com o emblema da Sala de Missões', cost: 120, category: 'escola', icon: 'Star', emoji: '🎒', availability: 'esgotado', note: 'Disponível em 2 semanas', active: true },
  { id: 'borracha', name: 'Borracha Mágica', description: 'Kit com 3 borrachas em formato de animais', cost: 30, category: 'escola', icon: 'Sparkles', emoji: '🐱', availability: 'disponivel', active: true },
  { id: 'regua', name: 'Régua Decorada', description: 'Régua 30cm com motivos da Sala de Missões', cost: 25, category: 'escola', icon: 'Star', emoji: '📏', availability: 'disponivel', active: true },
  { id: 'almoco', name: 'Almoço Especial do Mês', description: 'Um prato preferido no cardápio do refeitório por um dia', cost: 100, category: 'experiencias', icon: 'Gift', emoji: '🍽️', availability: 'disponivel', popular: true, note: 'Sujeito à disponibilidade da cozinha', active: true },
  { id: 'biblioteca', name: 'Visita Guiada à Biblioteca', description: 'Tour especial pela biblioteca com o bibliotecário e escolha de livros', cost: 60, category: 'experiencias', icon: 'BookOpen', emoji: '📚', availability: 'disponivel', active: true },
  { id: 'professor', name: 'Sessão de Jogo com o Professor', description: '15 minutos de jogo livre com o professor da turma', cost: 150, category: 'experiencias', icon: 'Trophy', emoji: '🎮', availability: 'disponivel', popular: true, active: true },
  { id: 'plantio', name: 'Hortinha da Escola', description: 'Cultivar sua própria planta na horta da escola', cost: 80, category: 'experiencias', icon: 'Sparkles', emoji: '🌱', availability: 'disponivel', active: true },
  { id: 'recreio', name: 'Recreio Estendido', description: '10 minutos extras de recreio em data combinada', cost: 200, category: 'experiencias', icon: 'Zap', emoji: '⏰', availability: 'disponivel', note: 'Precisa de aprovação da coordenação', active: true },
  { id: 'emoji', name: 'Pack de Emojis Digitais', description: 'Coleção exclusiva de 20 stickers digitais da Sala de Missões', cost: 40, category: 'digitais', icon: 'Sparkles', emoji: '😎', availability: 'disponivel', active: true },
  { id: 'avatar', name: 'Avatar Especial', description: 'Personalize seu perfil com um avatar exclusivo de Explorador', cost: 75, category: 'digitais', icon: 'Star', emoji: '🎭', availability: 'disponivel', active: true },
  { id: 'titulo', name: 'Título de Explorador Lendário', description: 'Exiba o título especial no seu perfil por uma semana', cost: 300, category: 'digitais', icon: 'Trophy', emoji: '🏅', availability: 'disponivel', active: true },
  { id: 'museu', name: 'Visita ao Museu', description: 'Passeio cultural ao museu com monitoria especial', cost: 500, category: 'cultura', icon: 'BookOpen', emoji: '🏛️', availability: 'reservado', note: 'Requer aprovação da coordenação', active: true },
  { id: 'peça', name: 'Ingresso para Peça Teatral', description: 'Assistir uma peça com a turma em horário especial', cost: 400, category: 'cultura', icon: 'Music', emoji: '🎭', availability: 'disponivel', active: true },
];

// ─── Tipos internos ───────────────────────────────────────────────────────────

export interface SeedOptions {
  entities: SeedableEntity[];
  mode: 'upsert' | 'insert' | 'replace';
  dryRun: boolean;
  requestId: string;
  runId: string;
}

// ─── Execução principal ───────────────────────────────────────────────────────

export async function executeSeed(options: SeedOptions): Promise<SeedProgress[]> {
  const db = getDb();
  const progress: SeedProgress[] = [];

  console.log(`\n[Seed] 🌱 Iniciando seed (requestId: ${options.requestId})`);
  console.log(`[Seed] Modo: ${options.dryRun ? '🔍 DRY-RUN' : '✍️  LIVE'}`);
  console.log(`[Seed] Entidades: ${options.entities.join(', ')}\n`);

  // Atualiza status do migration run
  if (!options.dryRun) {
    await db.collection(MIGRATION_RUNS_COL).doc(options.runId).update({
      status: 'running',
      startedAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }

  // Executa seed por entidade na ordem correta (respeita dependências)
  const entityOrder: SeedableEntity[] = [
    'schools', 'users', 'classrooms', 'students', 'abilities', 'trails',
    'missions', 'studentMissions', 'cards', 'achievements', 'interventions',
    'diagnostics', 'rewards', 'recognitionEvents', 'historyLogs',
  ];

  for (const entity of entityOrder) {
    if (!options.entities.includes(entity)) continue;

    try {
      const entityProgress = await seedEntity(entity, options);
      progress.push(entityProgress);

      // Atualiza progresso no Firestore
      if (!options.dryRun) {
        await db.collection(MIGRATION_RUNS_COL).doc(options.runId).update({
          [`progress.${entity}`]: {
            created: entityProgress.created,
            updated: entityProgress.updated,
            errors: entityProgress.errors,
          },
          updatedAt: Timestamp.now(),
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[Seed] ❌ Erro em ${entity}: ${message}`);
      progress.push({
        entity,
        created: 0,
        updated: 0,
        errors: 1,
        errorMessages: [message],
      });
    }
  }

  // Finaliza migration run
  if (!options.dryRun) {
    const hasErrors = progress.some((p) => p.errors > 0);
    await db.collection(MIGRATION_RUNS_COL).doc(options.runId).update({
      status: hasErrors ? 'partially_completed' : 'completed',
      completedAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  }

  // Sumário
  console.log('\n[Seed] 📊 Sumário:');
  for (const p of progress) {
    const emoji = p.errors > 0 ? '⚠️ ' : '✅';
    console.log(`  ${emoji} ${p.entity}: ${p.created} criados, ${p.updated} atualizados, ${p.errors} erros`);
  }

  return progress;
}

// ─── Seed por entidade ────────────────────────────────────────────────────────

async function seedEntity(
  entity: SeedableEntity,
  options: SeedOptions
): Promise<SeedProgress> {
  console.log(`[Seed] ▶ ${entity}...`);

  switch (entity) {
    case 'schools':        return seedSchools(options);
    case 'users':          return seedUsers(options);
    case 'classrooms':     return seedClassrooms(options);
    case 'students':       return seedStudents(options);
    case 'abilities':      return seedAbilities(options);
    case 'trails':         return seedTrails(options);
    case 'missions':       return seedMissions(options);
    case 'studentMissions': return seedStudentMissions(options);
    case 'cards':          return seedCards(options);
    case 'achievements':   return seedAchievements(options);
    case 'interventions':  return seedInterventions(options);
    case 'diagnostics':    return seedDiagnostics(options);
    case 'rewards':        return seedRewards(options);
    case 'recognitionEvents': return seedRecognitionEvents(options);
    case 'historyLogs':    return seedHistoryLogs(options);
    default:
      throw new Error(`Entidade desconhecida: ${entity}`);
  }
}

// ─── Helpers de batch ─────────────────────────────────────────────────────────

async function commitBatches(
  batches: Array<{ id: string; data: Record<string, unknown> }>,
  collection: string,
  options: SeedOptions
): Promise<SeedProgress> {
  const db = getDb();
  const progress: SeedProgress = { entity: collection, created: 0, updated: 0, errors: 0, errorMessages: [] };

  if (options.dryRun) {
    // Dry-run: apenas valida
    for (const item of batches) {
      if (!item.id) {
        progress.errors++;
        progress.errorMessages.push(`Item sem ID em ${collection}`);
      } else {
        progress.created++;
      }
    }
    return progress;
  }

  // Divide em lotes de BATCH_SIZE
  for (let i = 0; i < batches.length; i += BATCH_SIZE) {
    const chunk = batches.slice(i, i + BATCH_SIZE);
    const batch: WriteBatch = db.batch();

    for (const item of chunk) {
      const ref = db.collection(collection).doc(item.id);
      
      if (options.mode === 'upsert') {
        batch.set(ref, {
          ...item.data,
          updatedAt: Timestamp.now(),
        }, { merge: true });
        progress.updated++;
      } else if (options.mode === 'insert') {
        batch.create(ref, {
          ...item.data,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
        progress.created++;
      } else {
        // replace
        batch.set(ref, {
          ...item.data,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });
        progress.created++;
      }
    }

    await batch.commit();
  }

  return progress;
}

// ─── Implementações por entidade ──────────────────────────────────────────────

async function seedSchools(options: SeedOptions): Promise<SeedProgress> {
  const items = [{ id: SCHOOL_DATA.id, data: { ...SCHOOL_DATA, createdAt: Timestamp.now() } }];
  return commitBatches(items, 'schools', options);
}

async function seedUsers(options: SeedOptions): Promise<SeedProgress> {
  const items = USERS_DATA.map((u) => ({ id: u.id, data: { ...u, createdAt: Timestamp.now() } }));
  return commitBatches(items, 'users', options);
}

async function seedClassrooms(options: SeedOptions): Promise<SeedProgress> {
  const items = [{ id: CLASSROOM_DATA.id, data: { ...CLASSROOM_DATA, createdAt: Timestamp.now() } }];
  return commitBatches(items, 'classrooms', options);
}

async function seedStudents(options: SeedOptions): Promise<SeedProgress> {
  const items = INITIAL_STUDENTS.map((s) => ({
    id: s.id,
    data: {
      userId: `user-${s.id}`,
      schoolId: 'escola-01',
      classroomId: 'turma-5a',
      name: s.name,
      avatar: s.avatar,
      avatarUrl: s.avatarUrl,
      grade: s.grade,
      teacherName: s.teacherName,
      entryDate: s.entryDate,
      status: s.status,
      statusAlertText: s.statusAlertText,
      level: s.level,
      currentXp: s.currentXp,
      nextLevelXp: s.nextLevelXp,
      coins: s.coins || 0,
      streakDays: s.streakDays,
      weekDaysActive: s.weekDaysActive,
      trailProgress: s.trailProgress,
      diagnosticCompleted: s.diagnosticCompleted,
      pedagogicalNotes: s.pedagogicalNotes,
      adaptations: s.adaptations,
      currentMissionId: s.currentMission?.id || null,
      active: true,
      createdAt: Timestamp.now(),
    },
  }));
  return commitBatches(items, 'students', options);
}

async function seedAbilities(options: SeedOptions): Promise<SeedProgress> {
  // Extrai habilidades únicas de todos os alunos
  const abilitiesMap = new Map<string, { id: string; data: Record<string, unknown> }>();

  for (const student of INITIAL_STUDENTS) {
    for (const ab of student.abilities || []) {
      if (!abilitiesMap.has(ab.id)) {
        abilitiesMap.set(ab.id, {
          id: ab.id,
          data: {
            name: ab.name,
            subject: ab.subject,
            description: `Habilidade de ${ab.name} em ${ab.subject}`,
            active: true,
            createdAt: Timestamp.now(),
          },
        });
      }
    }
  }

  const items = Array.from(abilitiesMap.values());
  const progress = await commitBatches(items, 'abilities', options);

  // Também seed das studentAbilities
  const saItems: Array<{ id: string; data: Record<string, unknown> }> = [];
  for (const student of INITIAL_STUDENTS) {
    for (const ab of student.abilities || []) {
      saItems.push({
        id: `${student.id}_${ab.id}`,
        data: {
          studentId: student.id,
          abilityId: ab.id,
          state: ab.state,
          score: ab.score,
          attempts: ab.attempts,
          revisions: ab.revisions,
          interventions: ab.interventions,
          autonomy: ab.autonomy,
          evidence: ab.evidence,
          createdAt: Timestamp.now(),
        },
      });
    }
  }

  if (saItems.length > 0) {
    const saProgress = await commitBatches(saItems, 'studentAbilities', options);
    progress.created += saProgress.created;
    progress.updated += saProgress.updated;
  }

  return progress;
}

async function seedTrails(options: SeedOptions): Promise<SeedProgress> {
  const items = TRAILS_DATA.map((t) => ({
    id: t.id,
    data: { ...t, createdAt: Timestamp.now() },
  }));
  return commitBatches(items, 'trails', options);
}

async function seedMissions(options: SeedOptions): Promise<SeedProgress> {
  const allMissions = [...ALL_MISSIONS];

  // Adiciona a missão de divisão se não duplicar
  const INITIAL_MISSION = {
    id: 'missao-02-grupos',
    title: 'O desafio dos grupos',
    subject: 'Matemática' as const,
    trailName: 'Reino da Matemática',
    primaryAbility: 'Divisão por agrupamento',
    difficulty: 'Média' as const,
    status: 'Em andamento' as const,
    progress: 60,
    objective: 'Compreender divisão como formação de grupos iguais.',
    estimatedMinutes: 15,
    xpReward: 50,
    coinsReward: 30,
    steps: [],
  };

  if (!allMissions.find((m) => m.id === 'missao-02-grupos')) {
    allMissions.push(INITIAL_MISSION as any);
  }

  const items = allMissions.map((m, index) => {
    const prefix = m.id.split('-')[0];
    const trailId = MISSION_TRAIL_MAP[m.id] || MISSION_TRAIL_MAP[`${prefix}-`] || 'trail-mat';

    return {
      id: m.id,
      data: {
        trailId,
        title: m.title,
        subject: m.subject,
        trailName: m.trailName,
        primaryAbility: m.primaryAbility,
        difficulty: m.difficulty,
        status: m.status,
        progress: m.progress,
        objective: m.objective,
        estimatedMinutes: m.estimatedMinutes,
        xpReward: m.xpReward,
        coinsReward: m.coinsReward || 0,
        participationMode: 'individual',
        steps: m.steps || [],
        active: true,
        order: index + 1,
        createdAt: Timestamp.now(),
      },
    };
  });

  return commitBatches(items, 'missions', options);
}

async function seedStudentMissions(options: SeedOptions): Promise<SeedProgress> {
  const items: Array<{ id: string; data: Record<string, unknown> }> = [];

  for (const student of INITIAL_STUDENTS) {
    const cm = student.currentMission;
    if (cm) {
      items.push({
        id: `${student.id}_${cm.id}`,
        data: {
          studentId: student.id,
          missionId: cm.id,
          status: cm.status === 'Em andamento' ? 'em_andamento'
            : cm.status === 'Concluída' ? 'concluida'
            : cm.status === 'Disponível' ? 'disponivel'
            : 'bloqueada',
          progress: cm.progress,
          attempts: 3,
          completedAttempts: cm.progress > 50 ? 2 : 0,
          currentStep: Math.floor(cm.progress / 20),
          createdAt: Timestamp.now(),
        },
      });
    }
  }

  return commitBatches(items, 'studentMissions', options);
}

async function seedCards(options: SeedOptions): Promise<SeedProgress> {
  const items = INITIAL_CARDS.map((c) => ({
    id: c.id,
    data: {
      name: c.name,
      category: c.category,
      description: c.description,
      subject: c.subject,
      rarity: c.rarity,
      icon: c.icon,
      formulaOrQuote: c.formulaOrQuote,
      active: true,
      createdAt: Timestamp.now(),
    },
  }));

  const progress = await commitBatches(items, 'cards', options);

  // StudentCards — cards desbloqueados por aluno
  const scItems: Array<{ id: string; data: Record<string, unknown> }> = [];
  for (const student of INITIAL_STUDENTS) {
    for (const card of student.cards || []) {
      if (card.unlocked) {
        scItems.push({
          id: `${student.id}_${card.id}`,
          data: {
            studentId: student.id,
            cardId: card.id,
            unlockedAt: card.unlockedAt || 'Hoje',
            createdAt: Timestamp.now(),
          },
        });
      }
    }
  }

  if (scItems.length > 0) {
    const scProgress = await commitBatches(scItems, 'studentCards', options);
    progress.created += scProgress.created;
    progress.updated += scProgress.updated;
  }

  return progress;
}

async function seedAchievements(options: SeedOptions): Promise<SeedProgress> {
  const items = INITIAL_ACHIEVEMENTS.map((a) => ({
    id: a.id,
    data: {
      title: a.title,
      description: a.description,
      category: a.category,
      icon: a.icon,
      color: a.color,
      xpReward: a.xpReward,
      active: true,
      createdAt: Timestamp.now(),
    },
  }));

  const progress = await commitBatches(items, 'achievements', options);

  // StudentAchievements
  const saItems: Array<{ id: string; data: Record<string, unknown> }> = [];
  for (const student of INITIAL_STUDENTS) {
    for (const ach of student.achievements || []) {
      if (ach.unlocked) {
        saItems.push({
          id: `${student.id}_${ach.id}`,
          data: {
            studentId: student.id,
            achievementId: ach.id,
            unlockedAt: ach.unlockedAt || 'Hoje',
            createdAt: Timestamp.now(),
          },
        });
      }
    }
  }

  if (saItems.length > 0) {
    const saProgress = await commitBatches(saItems, 'studentAchievements', options);
    progress.created += saProgress.created;
    progress.updated += saProgress.updated;
  }

  return progress;
}

async function seedInterventions(options: SeedOptions): Promise<SeedProgress> {
  const items: Array<{ id: string; data: Record<string, unknown> }> = [];

  for (const student of INITIAL_STUDENTS) {
    for (const intervention of student.interventions || []) {
      items.push({
        id: intervention.id,
        data: {
          studentId: intervention.studentId,
          studentName: intervention.studentName,
          abilityId: intervention.ability.toLowerCase().replace(/\s+/g, '-'),
          ability: intervention.ability,
          subject: intervention.subject,
          date: intervention.date,
          time: intervention.time,
          title: intervention.title,
          strategy: intervention.strategy,
          initialAttemptError: intervention.initialAttemptError || null,
          interventionApplied: intervention.interventionApplied,
          newAttemptResult: intervention.newAttemptResult || null,
          nextStep: intervention.nextStep,
          status: intervention.status,
          createdAt: Timestamp.now(),
        },
      });
    }
  }

  return commitBatches(items, 'interventions', options);
}

async function seedDiagnostics(options: SeedOptions): Promise<SeedProgress> {
  const items: Array<{ id: string; data: Record<string, unknown> }> = [];

  for (const student of INITIAL_STUDENTS) {
    if (student.diagnosticCompleted) {
      items.push({
        id: `diag-${student.id}`,
        data: {
          studentId: student.id,
          abilityId: student.abilities?.[0]?.id || 'general',
          answers: {},
          score: student.abilities?.[0]?.score || 50,
          status: 'concluido',
          completedAt: Timestamp.now(),
          createdAt: Timestamp.now(),
        },
      });
    }
  }

  return commitBatches(items, 'diagnostics', options);
}

async function seedRewards(options: SeedOptions): Promise<SeedProgress> {
  const items = REWARDS_DATA.map((r) => ({
    id: r.id,
    data: { ...r, createdAt: Timestamp.now() },
  }));
  return commitBatches(items, 'rewards', options);
}

async function seedRecognitionEvents(options: SeedOptions): Promise<SeedProgress> {
  const items: Array<{ id: string; data: Record<string, unknown> }> = [];

  for (const student of INITIAL_STUDENTS) {
    if (student.status === 'evoluindo_bem' || student.status === 'pronto_avancar') {
      items.push({
        id: `rec-${student.id}-evolucao`,
        data: {
          studentId: student.id,
          type: 'evolucao',
          title: `Evolução de ${student.name}`,
          description: student.statusAlertText,
          category: 'evolucao',
          celebrated: false,
          createdAt: Timestamp.now(),
        },
      });
    }

    if (student.streakDays >= 4) {
      items.push({
        id: `rec-${student.id}-persistencia`,
        data: {
          studentId: student.id,
          type: 'persistencia',
          title: `Persistência de ${student.name}`,
          description: `${student.streakDays} dias consecutivos de dedicação`,
          category: 'persistencia',
          celebrated: false,
          createdAt: Timestamp.now(),
        },
      });
    }
  }

  return commitBatches(items, 'recognitionEvents', options);
}

async function seedHistoryLogs(options: SeedOptions): Promise<SeedProgress> {
  const items: Array<{ id: string; data: Record<string, unknown> }> = [];

  for (const student of INITIAL_STUDENTS) {
    for (let i = 0; i < (student.historyLog || []).length; i++) {
      const log = student.historyLog[i];
      items.push({
        id: `log-${student.id}-${i}`,
        data: {
          studentId: student.id,
          action: log.action,
          detail: log.detail,
          xpEarned: log.xpEarned || 0,
          createdAt: Timestamp.now(),
        },
      });
    }
  }

  return commitBatches(items, 'historyLogs', options);
}

// ─── Criação do MigrationRun ──────────────────────────────────────────────────

export async function createMigrationRun(params: {
  requestId: string;
  source: string;
  entities: string[];
  mode: string;
  dryRun: boolean;
  createdBy?: string;
}): Promise<string> {
  const db = getDb();

  // Verifica se requestId já foi usado
  const existing = await db
    .collection(MIGRATION_RUNS_COL)
    .where('requestId', '==', params.requestId)
    .limit(1)
    .get();

  if (!existing.empty) {
    const existingRun = existing.docs[0];
    const status = existingRun.data().status;

    if (status === 'completed') {
      throw new Error(
        `Migration requestId "${params.requestId}" já foi executado com sucesso. ` +
        `Use um requestId diferente para uma nova migração.`
      );
    }

    if (status === 'running') {
      throw new Error(
        `Migration requestId "${params.requestId}" já está em execução.`
      );
    }

    // Se falhou, permite reexecução
    return existingRun.id;
  }

  const now = Timestamp.now();
  const runData: Omit<FirestoreMigrationRun, 'id'> = {
    requestId: params.requestId,
    source: params.source,
    entities: params.entities,
    mode: params.mode as 'upsert',
    dryRun: params.dryRun,
    status: 'queued',
    progress: {},
    errorLog: [],
    createdBy: params.createdBy,
    createdAt: now,
    updatedAt: now,
  };

  const ref = await db.collection(MIGRATION_RUNS_COL).add(runData);
  return ref.id;
}

export async function getMigrationRun(runId: string): Promise<FirestoreMigrationRun | null> {
  const db = getDb();
  const doc = await db.collection(MIGRATION_RUNS_COL).doc(runId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() } as FirestoreMigrationRun;
}
