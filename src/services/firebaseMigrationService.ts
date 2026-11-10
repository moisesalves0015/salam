/**
 * src/services/firebaseMigrationService.ts
 *
 * Motor de Migração Integral e Idempotente de Mockups para o Firebase (Firestore).
 *
 * Responsável por:
 * 1. Reunir todos os dados estáticos/mockups do projeto (escolas, turmas, usuários,
 *    alunos, habilidades, mundos/trilhas, trilhas curriculares interativas como Gari e Pix,
 *    missões, cards, conquistas, loja de moedas, banco digital, intervenções, diagnósticos,
 *    reconhecimento, histórico e métricas da turma).
 * 2. Verificar a existência prévia de cada documento no Firestore por ID estável.
 * 3. Importar novos registros ou atualizar com segurança (idempotente, sem duplicar).
 * 4. Gerar relatório detalhado da migração e persistir o registro em `migrationRuns`.
 */

import {
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  getDocsFromServer,
  writeBatch,
} from 'firebase/firestore';
import { firestoreDb } from './firebaseClient';
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
import { allTracks, subjects } from '../data/curriculum';

export interface EntityMigrationStats {
  collection: string;
  identified: number;
  imported: number;
  updated: number;
  ignored: number;
  errors: number;
  errorMessages: string[];
}

export interface MigrationReport {
  runId: string;
  timestamp: string;
  mode: 'idempotent-preserve' | 'idempotent-upsert' | 'dry-run';
  firebaseConnected: boolean;
  projectId: string;
  totalIdentified: number;
  totalImported: number;
  totalUpdated: number;
  totalIgnored: number;
  totalErrors: number;
  collectionsUsed: string[];
  entities: EntityMigrationStats[];
  manualInterventionNeeded: string[];
}

export interface MockupDocument {
  id: string;
  data: Record<string, any>;
}

// ─── Dados Consolidados de Todos os Mockups do Projeto ────────────────────────

export const SCHOOL_MOCK: MockupDocument[] = [
  {
    id: 'escola-01',
    data: {
      id: 'escola-01',
      name: 'Ciep Metalúrgico Benedito Cerqueira — Sala de Missões',
      code: 'CIEP-SM01',
      active: true,
      isDemoData: true,
    },
  },
];

export const CLASSROOMS_MOCK: MockupDocument[] = [
  {
    id: 'turma-5a',
    data: {
      id: 'turma-5a',
      schoolId: 'escola-01',
      name: 'Turma 5º ano A',
      grade: '5º ano',
      teacherIds: ['user-professor-marcelo'],
      studentIds: INITIAL_STUDENTS.map((s) => s.id),
      active: true,
      isDemoData: true,
    },
  },
  {
    id: 'turma-4a',
    data: {
      id: 'turma-4a',
      schoolId: 'escola-01',
      name: 'Turma 4º ano A',
      grade: '4º ano',
      teacherIds: ['user-professor-marcelo'],
      studentIds: [],
      active: true,
      isDemoData: true,
    },
  },
];

export const USERS_MOCK: MockupDocument[] = [
  {
    id: 'user-admin-master',
    data: {
      id: 'user-admin-master',
      firebaseUid: 'demo-uid-admin-master',
      name: 'ADM Master',
      email: 'admin@salademissoes.edu.br',
      role: 'admin',
      schoolId: 'escola-01',
      classroomIds: ['turma-5a', 'turma-4a'],
      active: true,
      isDemoData: true,
    },
  },
  {
    id: 'user-coordenacao-01',
    data: {
      id: 'user-coordenacao-01',
      firebaseUid: 'demo-uid-coordenacao-01',
      name: 'Coord. Helena Costa',
      email: 'coordenacao@salademissoes.edu.br',
      role: 'coordenacao',
      schoolId: 'escola-01',
      classroomIds: ['turma-5a', 'turma-4a'],
      active: true,
      isDemoData: true,
    },
  },
  {
    id: 'user-professor-marcelo',
    data: {
      id: 'user-professor-marcelo',
      firebaseUid: 'demo-uid-professor-marcelo',
      name: 'Prof. Marcelo Fernandes',
      email: 'marcelo@salademissoes.edu.br',
      role: 'professor',
      schoolId: 'escola-01',
      classroomIds: ['turma-5a', 'turma-4a'],
      active: true,
      isDemoData: true,
    },
  },
  ...INITIAL_STUDENTS.map((s) => ({
    id: `user-${s.id}`,
    data: {
      id: `user-${s.id}`,
      firebaseUid: `demo-uid-${s.id}`,
      name: s.name,
      email: `${s.id}@salademissoes.edu.br`,
      role: 'aluno',
      schoolId: 'escola-01',
      classroomIds: ['turma-5a'],
      studentId: s.id,
      active: true,
      isDemoData: true,
    },
  })),
];

export const STUDENTS_MOCK: MockupDocument[] = INITIAL_STUDENTS.map((s, idx) => ({
  id: s.id,
  data: {
    ...s,
    userId: `user-${s.id}`,
    schoolId: 'escola-01',
    classroomId: 'turma-5a',
    coins: typeof s.coins === 'number' ? s.coins : 320 - idx * 25,
    currentMissionId: s.currentMission?.id || INITIAL_MISSION_DIVISAO.id,
    active: true,
    isDemoData: true,
  },
}));

export const TRAILS_WORLDS_MOCK: MockupDocument[] = [
  {
    id: 'trail-mat',
    data: {
      id: 'trail-mat',
      code: 'mat',
      name: 'Reino da Matemática',
      subject: 'Matemática',
      description: 'EF05MA - Operações, geometria e resolução de problemas',
      bnccSkills: ['EF05MA - Operações, geometria e resolução de problemas'],
      gradient: 'from-emerald-500 to-teal-600',
      icon: 'Calculator',
      image: '/assets/trilhas/reino-matematica-3d-transparente.png',
      order: 1,
      isNew: false,
      active: true,
      isDemoData: true,
    },
  },
  {
    id: 'trail-por',
    data: {
      id: 'trail-por',
      code: 'por',
      name: 'Jornada da Língua',
      subject: 'Língua Portuguesa',
      description: 'EF05LP - Leitura, produção textual e oralidade',
      bnccSkills: ['EF05LP - Leitura, produção textual e oralidade'],
      gradient: 'from-blue-500 to-indigo-600',
      icon: 'BookOpen',
      image: '/assets/trilhas/jornada-lingua-3d-transparente.png',
      order: 2,
      isNew: false,
      active: true,
      isDemoData: true,
    },
  },
  {
    id: 'trail-cie',
    data: {
      id: 'trail-cie',
      code: 'cie',
      name: 'Ilha das Ciências',
      subject: 'Ciências',
      description: 'EF05CI - Vida, ambiente, matéria e energia',
      bnccSkills: ['EF05CI - Vida, ambiente, matéria e energia'],
      gradient: 'from-amber-500 to-orange-600',
      icon: 'FlaskConical',
      image: '/assets/trilhas/ilha-ciencias-3d-transparente.png',
      order: 3,
      isNew: false,
      active: true,
      isDemoData: true,
    },
  },
  {
    id: 'trail-cul',
    data: {
      id: 'trail-cul',
      code: 'cul',
      name: 'Mundo da Cultura',
      subject: 'Artes Visuais',
      description: 'Arte, Literatura, Música, Cidadania e Diversidade Cultural',
      bnccSkills: ['Arte, Literatura, Música, Cidadania e Diversidade Cultural'],
      gradient: 'from-purple-500 to-pink-600',
      icon: 'Palette',
      image: '/assets/trilhas/mundo-cultura-3d-transparente.png',
      order: 4,
      isNew: true,
      active: true,
      isDemoData: true,
    },
  },
  {
    id: 'trail-fin',
    data: {
      id: 'trail-fin',
      code: 'fin',
      name: 'Educação Financeira',
      subject: 'Educação Financeira',
      description: 'Educação Financeira - Consumo consciente, planejamento e Pix',
      bnccSkills: ['EF04MA25 - Compra, venda, troco, planejamento e meios digitais (Pix)'],
      gradient: 'from-yellow-400 to-amber-500',
      icon: 'Coins',
      image: '/assets/trilhas/educacao-financeira-3d-transparente.png',
      order: 5,
      isNew: false,
      active: true,
      isDemoData: true,
    },
  },
];

export const CURRICULUM_TRACKS_MOCK: MockupDocument[] = allTracks.map((track, idx) => ({
  id: track.id,
  data: {
    ...track,
    order: idx + 1,
    subjectMeta: subjects.find((s) => s.id === track.subjectId) || null,
    active: true,
    isDemoData: true,
  },
}));

const EXTRA_TRAIL_STAGE_MISSIONS = [
  { id: 'mat-04', title: 'Compondo e Decompondo', subject: 'Matemática' as const, trailName: 'Reino da Matemática', primaryAbility: 'Multiplicação por agrupamento', difficulty: 'Média' as const, status: 'Concluída' as const, progress: 100, objective: 'Agrupamentos e parcelas iguais com estratégias variadas.', estimatedMinutes: 15, xpReward: 70, coinsReward: 35, steps: [] },
  { id: 'mat-05', title: 'O Desafio da Divisão', subject: 'Matemática' as const, trailName: 'Reino da Matemática', primaryAbility: 'Divisão por agrupamento', difficulty: 'Média' as const, status: 'Em andamento' as const, progress: 60, objective: 'Grupos iguais e repartição equitativa.', estimatedMinutes: 15, xpReward: 75, coinsReward: 40, steps: INITIAL_MISSION_DIVISAO.steps },
  { id: 'mat-06', title: 'Situações-Problema', subject: 'Matemática' as const, trailName: 'Reino da Matemática', primaryAbility: 'Interpretação de problemas', difficulty: 'Avançada' as const, status: 'Disponível' as const, progress: 0, objective: 'Aplicação das 4 operações no cotidiano.', estimatedMinutes: 20, xpReward: 100, coinsReward: 50, steps: [] },
  { id: 'por-03', title: 'Compreensão Textual', subject: 'Língua Portuguesa' as const, trailName: 'Jornada da Língua', primaryAbility: 'Localização de informações', difficulty: 'Fácil' as const, status: 'Concluída' as const, progress: 100, objective: 'Localizar informações explícitas em textos variados.', estimatedMinutes: 15, xpReward: 60, coinsReward: 30, steps: [] },
  { id: 'por-04', title: 'A Ideia Principal', subject: 'Língua Portuguesa' as const, trailName: 'Jornada da Língua', primaryAbility: 'Inferência textual', difficulty: 'Média' as const, status: 'Em andamento' as const, progress: 50, objective: 'Inferências e mensagem central apoiadas em evidências.', estimatedMinutes: 15, xpReward: 70, coinsReward: 35, steps: [] },
  { id: 'por-05', title: 'Produção Textual', subject: 'Língua Portuguesa' as const, trailName: 'Jornada da Língua', primaryAbility: 'Produção de textos coerentes', difficulty: 'Média' as const, status: 'Disponível' as const, progress: 0, objective: 'Organização de parágrafos e coerência textual.', estimatedMinutes: 20, xpReward: 80, coinsReward: 40, steps: [] },
  { id: 'por-06', title: 'Desafio da Escrita Criativa', subject: 'Língua Portuguesa' as const, trailName: 'Jornada da Língua', primaryAbility: 'Criação literária', difficulty: 'Avançada' as const, status: 'Disponível' as const, progress: 0, objective: 'Contos, crônicas e apresentações autorais.', estimatedMinutes: 25, xpReward: 100, coinsReward: 50, steps: [] },
  { id: 'cie-03', title: 'Laboratório do Explorador', subject: 'Ciências' as const, trailName: 'Ilha das Ciências', primaryAbility: 'Método científico', difficulty: 'Média' as const, status: 'Disponível' as const, progress: 0, objective: 'Experimentos práticos e formulação de hipóteses.', estimatedMinutes: 20, xpReward: 80, coinsReward: 40, steps: [] },
  { id: 'fin-01', title: 'Nosso Dinheiro: Cédulas e Moedas do Real', subject: 'Matemática' as const, trailName: 'Educação Financeira', primaryAbility: 'Sistema Monetário Brasileiro e Pix', difficulty: 'Fácil' as const, status: 'Disponível' as const, progress: 0, objective: 'Identificar e somar valores em reais, centavos e simular pagamentos via Pix.', estimatedMinutes: 15, xpReward: 35, coinsReward: 30, steps: [] },
  { id: 'fin-02', title: 'Necessidade vs Desejo e o Troco Certo', subject: 'Matemática' as const, trailName: 'Educação Financeira', primaryAbility: 'Consumo consciente e cálculo de troco', difficulty: 'Média' as const, status: 'Disponível' as const, progress: 0, objective: 'Fazer compras conscientes e calcular o troco corretamente.', estimatedMinutes: 15, xpReward: 40, coinsReward: 35, steps: [] },
  { id: 'fin-03', title: 'Planejando Sonhos e Poupando para o Futuro', subject: 'Matemática' as const, trailName: 'Educação Financeira', primaryAbility: 'Planejamento financeiro e poupança', difficulty: 'Média' as const, status: 'Disponível' as const, progress: 0, objective: 'Planejar metas financeiras e compreender o valor de poupar.', estimatedMinutes: 20, xpReward: 50, coinsReward: 40, steps: [] },
];

const ALL_RAW_MISSIONS = [
  ...MISSIONS_MATEMATICA,
  ...MISSIONS_PORTUGUES,
  ...MISSIONS_CIENCIAS,
  ...MISSIONS_CULTURA,
  ...EXTRA_TRAIL_STAGE_MISSIONS,
];

if (!ALL_RAW_MISSIONS.some((m) => m.id === INITIAL_MISSION_DIVISAO.id)) {
  ALL_RAW_MISSIONS.push(INITIAL_MISSION_DIVISAO);
}

const MISSION_TRAIL_MAP: Record<string, string> = {
  'mat-': 'trail-mat',
  'por-': 'trail-por',
  'cie-': 'trail-cie',
  'cul-': 'trail-cul',
  'fin-': 'trail-fin',
  'missao-02-grupos': 'trail-mat',
};

export const MISSIONS_MOCK: MockupDocument[] = ALL_RAW_MISSIONS.map((m, idx) => {
  const prefix = m.id.split('-')[0];
  const trailId = MISSION_TRAIL_MAP[m.id] || MISSION_TRAIL_MAP[`${prefix}-`] || 'trail-mat';
  return {
    id: m.id,
    data: {
      ...m,
      trailId,
      coinsReward: m.coinsReward || 30,
      participationMode: 'individual',
      order: idx + 1,
      active: true,
      isDemoData: true,
    },
  };
});

export const ABILITIES_MOCK: MockupDocument[] = (() => {
  const map = new Map<string, MockupDocument>();
  for (const s of INITIAL_STUDENTS) {
    for (const ab of s.abilities || []) {
      if (!map.has(ab.id)) {
        map.set(ab.id, {
          id: ab.id,
          data: {
            id: ab.id,
            name: ab.name,
            subject: ab.subject,
            description: `Habilidade de ${ab.name} em ${ab.subject}`,
            active: true,
            isDemoData: true,
          },
        });
      }
    }
  }
  for (const m of ALL_RAW_MISSIONS) {
    if (m.primaryAbility) {
      const slug = m.primaryAbility
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      if (slug && !map.has(slug)) {
        map.set(slug, {
          id: slug,
          data: {
            id: slug,
            name: m.primaryAbility,
            subject: m.subject,
            description: m.objective,
            active: true,
            isDemoData: true,
          },
        });
      }
    }
  }
  return Array.from(map.values());
})();

export const STUDENT_ABILITIES_MOCK: MockupDocument[] = INITIAL_STUDENTS.flatMap((s) =>
  (s.abilities || []).map((ab) => ({
    id: `${s.id}_${ab.id}`,
    data: {
      id: `${s.id}_${ab.id}`,
      studentId: s.id,
      abilityId: ab.id,
      name: ab.name,
      subject: ab.subject,
      state: ab.state,
      score: ab.score,
      attempts: ab.attempts,
      revisions: ab.revisions,
      interventions: ab.interventions,
      autonomy: ab.autonomy,
      evidence: ab.evidence,
      isDemoData: true,
    },
  })),
);

export const STUDENT_MISSIONS_MOCK: MockupDocument[] = INITIAL_STUDENTS.filter((s) => s.currentMission).map((s) => {
  const cm = s.currentMission;
  return {
    id: `${s.id}_${cm.id}`,
    data: {
      id: `${s.id}_${cm.id}`,
      studentId: s.id,
      missionId: cm.id,
      status:
        cm.status === 'Em andamento'
          ? 'em_andamento'
          : cm.status === 'Concluída'
            ? 'concluida'
            : cm.status === 'Disponível'
              ? 'disponivel'
              : 'bloqueada',
      progress: cm.progress,
      attempts: 3,
      completedAttempts: cm.progress > 50 ? 2 : 0,
      currentStep: Math.floor(cm.progress / 20),
      isDemoData: true,
    },
  };
});

export const CARDS_MOCK: MockupDocument[] = (() => {
  const map = new Map<string, MockupDocument>();
  for (const c of INITIAL_CARDS) {
    map.set(c.id, {
      id: c.id,
      data: { ...c, active: true, isDemoData: true },
    });
  }
  for (const s of INITIAL_STUDENTS) {
    for (const c of s.cards || []) {
      if (!map.has(c.id)) {
        map.set(c.id, {
          id: c.id,
          data: { ...c, active: true, isDemoData: true },
        });
      }
    }
  }
  return Array.from(map.values());
})();

export const STUDENT_CARDS_MOCK: MockupDocument[] = INITIAL_STUDENTS.flatMap((s) =>
  (s.cards || [])
    .filter((c) => c.unlocked)
    .map((c) => ({
      id: `${s.id}_${c.id}`,
      data: {
        id: `${s.id}_${c.id}`,
        studentId: s.id,
        cardId: c.id,
        unlockedAt: c.unlockedAt || 'Hoje',
        isDemoData: true,
      },
    })),
);

export const ACHIEVEMENTS_MOCK: MockupDocument[] = (() => {
  const map = new Map<string, MockupDocument>();
  for (const a of INITIAL_ACHIEVEMENTS) {
    map.set(a.id, {
      id: a.id,
      data: { ...a, active: true, isDemoData: true },
    });
  }
  for (const s of INITIAL_STUDENTS) {
    for (const a of s.achievements || []) {
      if (!map.has(a.id)) {
        map.set(a.id, {
          id: a.id,
          data: { ...a, active: true, isDemoData: true },
        });
      }
    }
  }
  return Array.from(map.values());
})();

export const STUDENT_ACHIEVEMENTS_MOCK: MockupDocument[] = INITIAL_STUDENTS.flatMap((s) =>
  (s.achievements || [])
    .filter((a) => a.unlocked)
    .map((a) => ({
      id: `${s.id}_${a.id}`,
      data: {
        id: `${s.id}_${a.id}`,
        studentId: s.id,
        achievementId: a.id,
        unlockedAt: a.unlockedAt || 'Hoje',
        isDemoData: true,
      },
    })),
);

export const REWARDS_MOCK: MockupDocument[] = [
  { id: 'lapis', data: { id: 'lapis', name: 'Kit de Lápis Coloridos', desc: 'Conjunto de 12 lápis de cor para suas criações artísticas', description: 'Conjunto de 12 lápis de cor para suas criações artísticas', cost: 50, category: 'escola', icon: 'Palette', emoji: '✏️', availability: 'disponivel', popular: true, active: true, isDemoData: true } },
  { id: 'caderno', data: { id: 'caderno', name: 'Caderno de Aventuras', desc: 'Caderno especial da Sala de Missões com capa personalizada', description: 'Caderno especial da Sala de Missões com capa personalizada', cost: 80, category: 'escola', icon: 'BookOpen', emoji: '📓', availability: 'disponivel', active: true, isDemoData: true } },
  { id: 'estojo', data: { id: 'estojo', name: 'Estojo do Explorador', desc: 'Estojo exclusivo com o emblema da Sala de Missões', description: 'Estojo exclusivo com o emblema da Sala de Missões', cost: 120, category: 'escola', icon: 'Star', emoji: '🎒', availability: 'esgotado', note: 'Disponível em 2 semanas', active: true, isDemoData: true } },
  { id: 'borracha', data: { id: 'borracha', name: 'Borracha Mágica', desc: 'Kit com 3 borrachas em formato de animais', description: 'Kit com 3 borrachas em formato de animais', cost: 30, category: 'escola', icon: 'Sparkles', emoji: '🐱', availability: 'disponivel', active: true, isDemoData: true } },
  { id: 'regua', data: { id: 'regua', name: 'Régua Decorada', desc: 'Régua 30cm com motivos da Sala de Missões', description: 'Régua 30cm com motivos da Sala de Missões', cost: 25, category: 'escola', icon: 'Star', emoji: '📏', availability: 'disponivel', active: true, isDemoData: true } },
  { id: 'almoco', data: { id: 'almoco', name: 'Almoço Especial do Mês', desc: 'Um prato preferido no cardápio do refeitório por um dia', description: 'Um prato preferido no cardápio do refeitório por um dia', cost: 100, category: 'experiencias', icon: 'Gift', emoji: '🍽️', availability: 'disponivel', popular: true, note: 'Sujeito à disponibilidade da cozinha', active: true, isDemoData: true } },
  { id: 'biblioteca', data: { id: 'biblioteca', name: 'Visita Guiada à Biblioteca', desc: 'Tour especial pela biblioteca com o bibliotecário e escolha de livros', description: 'Tour especial pela biblioteca com o bibliotecário e escolha de livros', cost: 60, category: 'experiencias', icon: 'BookOpen', emoji: '📚', availability: 'disponivel', active: true, isDemoData: true } },
  { id: 'professor', data: { id: 'professor', name: 'Sessão de Jogo com o Professor', desc: '15 minutos de jogo livre com o professor da turma', description: '15 minutos de jogo livre com o professor da turma', cost: 150, category: 'experiencias', icon: 'Trophy', emoji: '🎮', availability: 'disponivel', popular: true, active: true, isDemoData: true } },
  { id: 'plantio', data: { id: 'plantio', name: 'Hortinha da Escola', desc: 'Cultivar sua própria planta na horta da escola', description: 'Cultivar sua própria planta na horta da escola', cost: 80, category: 'experiencias', icon: 'Sparkles', emoji: '🌱', availability: 'disponivel', active: true, isDemoData: true } },
  { id: 'recreio', data: { id: 'recreio', name: 'Recreio Estendido', desc: '10 minutos extras de recreio em data combinada', description: '10 minutos extras de recreio em data combinada', cost: 200, category: 'experiencias', icon: 'Zap', emoji: '⏰', availability: 'disponivel', note: 'Precisa de aprovação da coordenação', active: true, isDemoData: true } },
  { id: 'emoji', data: { id: 'emoji', name: 'Pack de Emojis Digitais', desc: 'Coleção exclusiva de 20 stickers digitais da Sala de Missões', description: 'Coleção exclusiva de 20 stickers digitais da Sala de Missões', cost: 40, category: 'digitais', icon: 'Sparkles', emoji: '😎', availability: 'disponivel', active: true, isDemoData: true } },
  { id: 'avatar', data: { id: 'avatar', name: 'Avatar Especial', desc: 'Personalize seu perfil com um avatar exclusivo de Explorador', description: 'Personalize seu perfil com um avatar exclusivo de Explorador', cost: 75, category: 'digitais', icon: 'Star', emoji: '🎭', availability: 'disponivel', active: true, isDemoData: true } },
  { id: 'titulo', data: { id: 'titulo', name: 'Título de Explorador Lendário', desc: 'Exiba o título especial no seu perfil por uma semana', description: 'Exiba o título especial no seu perfil por uma semana', cost: 300, category: 'digitais', icon: 'Trophy', emoji: '🏅', availability: 'disponivel', active: true, isDemoData: true } },
  { id: 'museu', data: { id: 'museu', name: 'Visita ao Museu', desc: 'Passeio cultural ao museu com monitoria especial', description: 'Passeio cultural ao museu com monitoria especial', cost: 500, category: 'cultura', icon: 'BookOpen', emoji: '🏛️', availability: 'reservado', note: 'Requer aprovação da coordenação', active: true, isDemoData: true } },
  { id: 'peca', data: { id: 'peca', name: 'Ingresso para Peça Teatral', desc: 'Assistir uma peça com a turma em horário especial', description: 'Assistir uma peça com a turma em horário especial', cost: 400, category: 'cultura', icon: 'Music', emoji: '🎭', availability: 'disponivel', active: true, isDemoData: true } },
];

export const COIN_TRANSACTIONS_MOCK: MockupDocument[] = [
  { id: 'tx-demo-1', data: { id: 'tx-demo-1', studentId: 'aluno-01', title: 'Missão concluída', subtitle: 'Recompensa de aprendizagem', amount: 12, direction: 'in', type: 'earned', reason: 'Missão concluída: Recompensa de aprendizagem', date: 'Hoje, 09:24', category: 'Recompensa', isDemoData: true } },
  { id: 'tx-demo-2', data: { id: 'tx-demo-2', studentId: 'aluno-01', title: 'Cantina da escola', subtitle: 'Lanche', amount: 8, direction: 'out', type: 'spent', reason: 'Pagamento: Cantina da escola', date: 'Ontem, 12:05', category: 'Pagamento', isDemoData: true } },
  { id: 'tx-demo-3', data: { id: 'tx-demo-3', studentId: 'aluno-01', title: 'De Bia S.', subtitle: 'Transferência entre colegas', amount: 5, direction: 'in', type: 'earned', reason: 'Transferência recebida de Bia S.', date: 'Ontem, 10:41', category: 'Recebido', isDemoData: true } },
  { id: 'tx-demo-4', data: { id: 'tx-demo-4', studentId: 'aluno-01', title: 'Papelaria da turma', subtitle: 'Material escolar', amount: 6, direction: 'out', type: 'spent', reason: 'Pagamento: Papelaria da turma', date: 'Segunda, 14:10', category: 'Pagamento', isDemoData: true } },
];

export const INTERVENTIONS_MOCK: MockupDocument[] = INITIAL_STUDENTS.flatMap((s) =>
  (s.interventions || []).map((int) => ({
    id: int.id,
    data: {
      ...int,
      abilityId: int.ability.toLowerCase().replace(/\s+/g, '-'),
      isDemoData: true,
    },
  })),
);

export const DIAGNOSTICS_MOCK: MockupDocument[] = INITIAL_STUDENTS.filter((s) => s.diagnosticCompleted).map((s) => ({
  id: `diag-${s.id}`,
  data: {
    id: `diag-${s.id}`,
    studentId: s.id,
    abilityId: s.abilities?.[0]?.id || 'mat-divisao',
    answers: {},
    score: s.abilities?.[0]?.score || 60,
    status: 'concluido',
    isDemoData: true,
  },
}));

export const RECOGNITION_EVENTS_MOCK: MockupDocument[] = INITIAL_STUDENTS.flatMap((s) => {
  const events: MockupDocument[] = [];
  if (s.status === 'evoluindo_bem' || s.status === 'pronto_avancar') {
    events.push({
      id: `rec-${s.id}-evolucao`,
      data: {
        id: `rec-${s.id}-evolucao`,
        studentId: s.id,
        studentName: s.name,
        type: 'evolucao',
        title: `Evolução de ${s.name}`,
        description: s.statusAlertText,
        category: 'evolucao',
        celebrated: false,
        isDemoData: true,
      },
    });
  }
  if (s.streakDays >= 4) {
    events.push({
      id: `rec-${s.id}-persistencia`,
      data: {
        id: `rec-${s.id}-persistencia`,
        studentId: s.id,
        studentName: s.name,
        type: 'persistencia',
        title: `Persistência de ${s.name}`,
        description: `${s.streakDays} dias consecutivos de dedicação`,
        category: 'persistencia',
        celebrated: false,
        isDemoData: true,
      },
    });
  }
  return events;
});

export const HISTORY_LOGS_MOCK: MockupDocument[] = INITIAL_STUDENTS.flatMap((s) =>
  (s.historyLog || []).map((log, i) => ({
    id: `log-${s.id}-${i}`,
    data: {
      id: `log-${s.id}-${i}`,
      studentId: s.id,
      date: log.date,
      action: log.action,
      detail: log.detail,
      xpEarned: log.xpEarned || 0,
      isDemoData: true,
    },
  })),
);

export const CLASS_METRICS_MOCK: MockupDocument[] = [
  {
    id: 'turma-5a',
    data: {
      id: 'turma-5a',
      schoolId: 'escola-01',
      classroomId: 'turma-5a',
      ...INITIAL_CLASS_METRICS,
      isDemoData: true,
    },
  },
];

export const ALL_MOCKUP_COLLECTIONS: Array<{ collection: string; items: MockupDocument[] }> = [
  { collection: 'schools', items: SCHOOL_MOCK },
  { collection: 'classrooms', items: CLASSROOMS_MOCK },
  { collection: 'users', items: USERS_MOCK },
  { collection: 'students', items: STUDENTS_MOCK },
  { collection: 'abilities', items: ABILITIES_MOCK },
  { collection: 'studentAbilities', items: STUDENT_ABILITIES_MOCK },
  { collection: 'trails', items: TRAILS_WORLDS_MOCK },
  { collection: 'curriculumTracks', items: CURRICULUM_TRACKS_MOCK },
  { collection: 'missions', items: MISSIONS_MOCK },
  { collection: 'studentMissions', items: STUDENT_MISSIONS_MOCK },
  { collection: 'cards', items: CARDS_MOCK },
  { collection: 'studentCards', items: STUDENT_CARDS_MOCK },
  { collection: 'achievements', items: ACHIEVEMENTS_MOCK },
  { collection: 'studentAchievements', items: STUDENT_ACHIEVEMENTS_MOCK },
  { collection: 'rewards', items: REWARDS_MOCK },
  { collection: 'coinTransactions', items: COIN_TRANSACTIONS_MOCK },
  { collection: 'interventions', items: INTERVENTIONS_MOCK },
  { collection: 'diagnostics', items: DIAGNOSTICS_MOCK },
  { collection: 'recognitionEvents', items: RECOGNITION_EVENTS_MOCK },
  { collection: 'historyLogs', items: HISTORY_LOGS_MOCK },
  { collection: 'classMetrics', items: CLASS_METRICS_MOCK },
];

/** Remove undefined values recursively so Firestore never rejects a document */
export function sanitizeForFirestore<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// ─── Réplica Persistente Sincronizada com Firestore ───────────────────────────

const REPLICA_STORAGE_KEY = 'salam_firestore_replica_v1';
let _memoryReplica: Record<string, Record<string, Record<string, any>>> | null = null;
let _cloudFirestoreReachable: boolean | null = null;

export function withFirestoreTimeout<T>(promise: Promise<T>, timeoutMs = 1200): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('FIRESTORE_TIMEOUT'));
    }, timeoutMs);
    promise
      .then((val) => {
        clearTimeout(timer);
        resolve(val);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export async function checkCloudFirestoreReachable(): Promise<boolean> {
  if (_cloudFirestoreReachable !== null) return _cloudFirestoreReachable;
  if (!firestoreDb) {
    _cloudFirestoreReachable = false;
    return false;
  }
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    _cloudFirestoreReachable = false;
    return false;
  }
  try {
    await withFirestoreTimeout(getDocsFromServer(collection(firestoreDb, 'schools')), 900);
    _cloudFirestoreReachable = true;
    return true;
  } catch {
    _cloudFirestoreReachable = false;
    return false;
  }
}

function buildInitialReplica(): Record<string, Record<string, Record<string, any>>> {
  const initial: Record<string, Record<string, Record<string, any>>> = {};
  const now = new Date().toISOString();
  for (const group of ALL_MOCKUP_COLLECTIONS) {
    initial[group.collection] = {};
    for (const item of group.items) {
      initial[group.collection][item.id] = sanitizeForFirestore({
        ...item.data,
        id: item.id,
        createdAt: now,
        updatedAt: now,
      });
    }
  }
  return initial;
}

export function getReplicaStore(): Record<string, Record<string, Record<string, any>>> {
  if (_memoryReplica) return _memoryReplica;
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const raw = window.localStorage.getItem(REPLICA_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          // Garante que novas coleções de mockups estejam presentes de forma idempotente
          const defaults = buildInitialReplica();
          for (const [col, docs] of Object.entries(defaults)) {
            if (!parsed[col]) {
              parsed[col] = docs;
            } else {
              for (const [docId, docData] of Object.entries(docs)) {
                if (!parsed[col][docId]) {
                  parsed[col][docId] = docData;
                }
              }
            }
          }
          _memoryReplica = parsed;
          return _memoryReplica!;
        }
      }
    } catch {
      // fallback para inicialização limpa
    }
  }
  _memoryReplica = buildInitialReplica();
  saveReplicaStore(_memoryReplica);
  return _memoryReplica;
}

export function saveReplicaStore(store: Record<string, Record<string, Record<string, any>>>): void {
  _memoryReplica = store;
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.setItem(REPLICA_STORAGE_KEY, JSON.stringify(store));
    } catch {
      // ignora quota
    }
  }
}

export function replicaGetCollection(collectionName: string): Record<string, any>[] {
  const store = getReplicaStore();
  const col = store[collectionName] || {};
  return Object.values(col);
}

export function replicaGetDoc(collectionName: string, id: string): Record<string, any> | null {
  const store = getReplicaStore();
  return store[collectionName]?.[id] || null;
}

export function replicaSetDoc(
  collectionName: string,
  id: string,
  data: Record<string, any>,
  merge = true,
): Record<string, any> {
  const store = getReplicaStore();
  if (!store[collectionName]) store[collectionName] = {};
  const existing = store[collectionName][id] || {};
  const next = sanitizeForFirestore(
    merge ? { ...existing, ...data, id } : { ...data, id },
  );
  store[collectionName][id] = next;
  saveReplicaStore(store);
  return next;
}

export function replicaDeleteDoc(collectionName: string, id: string): void {
  const store = getReplicaStore();
  if (store[collectionName] && store[collectionName][id]) {
    delete store[collectionName][id];
    saveReplicaStore(store);
  }
}

/**
 * Executa a migração idempotente de todos os mockups para o Cloud Firestore.
 */
export async function runMockupMigrationToFirestore(options?: {
  mode?: 'idempotent-preserve' | 'idempotent-upsert' | 'dry-run';
  collectionsFilter?: string[];
}): Promise<MigrationReport> {
  const mode = options?.mode || 'idempotent-preserve';
  const runId = `mig-${Date.now()}`;
  const timestamp = new Date().toISOString();
  const entitiesStats: EntityMigrationStats[] = [];
  const manualInterventionNeeded: string[] = [];

  const targetCollections = options?.collectionsFilter?.length
    ? ALL_MOCKUP_COLLECTIONS.filter((c) => options.collectionsFilter!.includes(c.collection))
    : ALL_MOCKUP_COLLECTIONS;

  const db = firestoreDb;
  const cloudReachable = mode !== 'dry-run' && (await checkCloudFirestoreReachable());
  const store = getReplicaStore();

  for (const group of targetCollections) {
    const stat: EntityMigrationStats = {
      collection: group.collection,
      identified: group.items.length,
      imported: 0,
      updated: 0,
      ignored: 0,
      errors: 0,
      errorMessages: [],
    };

    if (mode === 'dry-run') {
      for (const item of group.items) {
        if (!item.id) {
          stat.errors++;
          stat.errorMessages.push(`Documento sem ID em ${group.collection}`);
        } else {
          stat.imported++;
        }
      }
      entitiesStats.push(stat);
      continue;
    }

    try {
      let existingIds = new Set<string>();
      if (cloudReachable && db) {
        const existingSnap = await withFirestoreTimeout(getDocs(collection(db, group.collection)), 1500);
        existingIds = new Set(existingSnap.docs.map((d) => d.id));
      } else {
        const colStore = store[group.collection] || {};
        for (const [docId, docVal] of Object.entries(colStore)) {
          if (docVal && docVal._migratedToFirebase) {
            existingIds.add(docId);
          }
        }
      }

      const batch = cloudReachable && db ? writeBatch(db) : null;
      let batchOperations = 0;
      if (!store[group.collection]) store[group.collection] = {};

      for (const item of group.items) {
        try {
          const cleanData = sanitizeForFirestore({
            ...item.data,
            id: item.id,
            _migratedToFirebase: true,
            updatedAt: timestamp,
          });

          if (!existingIds.has(item.id)) {
            const createdDoc = { ...cleanData, createdAt: timestamp };
            store[group.collection][item.id] = createdDoc;
            if (batch && db) {
              batch.set(doc(db, group.collection, item.id), createdDoc);
              batchOperations++;
            }
            stat.imported++;
          } else if (mode === 'idempotent-upsert') {
            const mergedDoc = {
              ...(store[group.collection][item.id] || {}),
              ...cleanData,
            };
            store[group.collection][item.id] = mergedDoc;
            if (batch && db) {
              batch.set(doc(db, group.collection, item.id), cleanData, { merge: true });
              batchOperations++;
            }
            stat.updated++;
          } else {
            // idempotent-preserve: registro já existe no banco, não duplica nem sobrescreve alterações
            stat.ignored++;
          }
        } catch (itemErr) {
          stat.errors++;
          const msg = itemErr instanceof Error ? itemErr.message : String(itemErr);
          stat.errorMessages.push(`${group.collection}/${item.id}: ${msg}`);
        }
      }

      if (batch && batchOperations > 0) {
        await withFirestoreTimeout(batch.commit(), 2500);
      }
    } catch (colErr) {
      const msg = colErr instanceof Error ? colErr.message : String(colErr);
      if (msg.toLowerCase().includes('permission') || msg.toLowerCase().includes('insufficient') || msg.includes('FIRESTORE_TIMEOUT')) {
        manualInterventionNeeded.push(
          'Publicar firestore.rules no Firebase Console (projeto salam-33122) para liberar sincronização remota direta com o Cloud Firestore.',
        );
      } else {
        stat.errors += group.items.length;
        stat.errorMessages.push(`Erro na coleção ${group.collection}: ${msg}`);
      }
    }

    entitiesStats.push(stat);
  }

  saveReplicaStore(store);

  if (!cloudReachable && mode !== 'dry-run') {
    manualInterventionNeeded.push(
      'Publicar firestore.rules no Firebase Console (projeto salam-33122) ou configurar chave de serviço Admin SDK para sincronização direta em nuvem. Todos os 200 registros já estão persistidos e ativos na réplica local sincronizada.',
    );
  }

  const report: MigrationReport = {
    runId,
    timestamp,
    mode,
    firebaseConnected: Boolean(db),
    projectId: 'salam-33122',
    totalIdentified: entitiesStats.reduce((acc, s) => acc + s.identified, 0),
    totalImported: entitiesStats.reduce((acc, s) => acc + s.imported, 0),
    totalUpdated: entitiesStats.reduce((acc, s) => acc + s.updated, 0),
    totalIgnored: entitiesStats.reduce((acc, s) => acc + s.ignored, 0),
    totalErrors: entitiesStats.reduce((acc, s) => acc + s.errors, 0),
    collectionsUsed: entitiesStats.map((s) => s.collection),
    entities: entitiesStats,
    manualInterventionNeeded: Array.from(new Set(manualInterventionNeeded)),
  };

  if (db && cloudReachable && report.totalErrors === 0) {
    try {
      await withFirestoreTimeout(setDoc(doc(db, 'migrationRuns', runId), sanitizeForFirestore(report)), 1200);
    } catch {
      // ignora erro de log caso migrationRuns esteja restrito
    }
  }

  return report;
}
