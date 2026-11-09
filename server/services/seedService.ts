/**
 * Seed seguro de catálogos curriculares globais. Nunca popula dados de usuários,
 * estudantes, escolas, turmas, progresso ou eventos de demonstração.
 * Escritas são insert-only; documentos existentes são preservados.
 */
import { Timestamp } from 'firebase-admin/firestore';
import { getDb } from '../config/firebaseAdmin';
import { SeedProgress, SeedableEntity } from '../types/server';
import { INITIAL_CARDS, INITIAL_ACHIEVEMENTS } from '../../src/data/initialData';
import {
  MISSIONS_MATEMATICA,
  MISSIONS_PORTUGUES,
  MISSIONS_CIENCIAS,
  MISSIONS_CULTURA,
} from '../../src/data/missionsData';

export type CatalogEntity = Extract<SeedableEntity, 'trails' | 'missions' | 'abilities' | 'cards' | 'achievements' | 'rewards'>;
export interface SeedOptions {
  entities: CatalogEntity[];
  mode?: 'insert';
  dryRun: boolean;
  requestId?: string;
  runId?: string;
}

type CatalogItem = { id: string; data: Record<string, unknown> };
const ALL_MISSIONS = [
  ...MISSIONS_MATEMATICA,
  ...MISSIONS_PORTUGUES,
  ...MISSIONS_CIENCIAS,
  ...MISSIONS_CULTURA,
];
const TRAILS: CatalogItem[] = [
  { id: 'trail-mat', data: { name: 'Reino da Matemática', subject: 'Matemática', description: 'Trilha de operações, geometria e resolução de problemas', order: 1, active: true } },
  { id: 'trail-por', data: { name: 'Jornada da Língua', subject: 'Língua Portuguesa', description: 'Trilha de leitura, escrita e interpretação', order: 2, active: true } },
  { id: 'trail-cie', data: { name: 'Ilha das Ciências', subject: 'Ciências', description: 'Trilha de ciências naturais e método científico', order: 3, active: true } },
  { id: 'trail-cul', data: { name: 'Mundo da Cultura', subject: 'Língua Portuguesa', description: 'Trilha de diversidade cultural, literatura e cidadania', order: 4, active: true } },
];
const trailBySubject: Record<string, string> = {
  Matemática: 'trail-mat',
  'Língua Portuguesa': 'trail-por',
  Ciências: 'trail-cie',
};
const MISSIONS: CatalogItem[] = ALL_MISSIONS.map((mission) => ({
  id: mission.id,
  data: {
    trailId: trailBySubject[mission.subject] || 'trail-cul',
    title: mission.title,
    subject: mission.subject,
    trailName: mission.trailName,
    primaryAbility: mission.primaryAbility,
    difficulty: mission.difficulty,
    objective: mission.objective,
    estimatedMinutes: mission.estimatedMinutes,
    xpReward: mission.xpReward,
    coinsReward: mission.coinsReward || 0,
    participationMode: 'individual',
    steps: mission.steps || [],
    unlocksCards: [],
    unlocksAchievements: [],
  },
}));
const ABILITIES: CatalogItem[] = Array.from(new Set(ALL_MISSIONS.map((m) => m.primaryAbility)))
  .filter(Boolean)
  .map((name) => ({
    id: name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    data: { name, subject: ALL_MISSIONS.find((m) => m.primaryAbility === name)?.subject || '' },
  }));
const CARDS: CatalogItem[] = INITIAL_CARDS.map(({ id, name, category, description, subject, rarity, icon, formulaOrQuote }) => ({
  id,
  data: { name, category, description, subject: subject || null, rarity, icon, formulaOrQuote: formulaOrQuote || null },
}));
const ACHIEVEMENTS: CatalogItem[] = INITIAL_ACHIEVEMENTS.map(({ id, title, description, category, icon, color, xpReward }) => ({
  id,
  data: { title, description, category, icon, color, xpReward },
}));
const REWARDS: CatalogItem[] = [
  { id: 'lapis', data: { name: 'Kit de Lápis Coloridos', description: 'Conjunto de 12 lápis de cor para criações artísticas', cost: 50, category: 'escola', icon: 'Palette', emoji: '✏️' } },
  { id: 'caderno', data: { name: 'Caderno de Aventuras', description: 'Caderno para atividades e anotações', cost: 80, category: 'escola', icon: 'BookOpen', emoji: '📓' } },
  { id: 'estojo', data: { name: 'Estojo do Explorador', description: 'Estojo escolar', cost: 120, category: 'escola', icon: 'Star', emoji: '🎒' } },
  { id: 'borracha', data: { name: 'Borracha', description: 'Borracha escolar', cost: 30, category: 'escola', icon: 'Sparkles', emoji: '🐱' } },
  { id: 'regua', data: { name: 'Régua Decorada', description: 'Régua escolar de 30 cm', cost: 25, category: 'escola', icon: 'Star', emoji: '📏' } },
  { id: 'almoco', data: { name: 'Almoço Especial', description: 'Refeição especial sujeita à disponibilidade', cost: 100, category: 'experiencias', icon: 'Gift', emoji: '🍽️' } },
  { id: 'biblioteca', data: { name: 'Visita à Biblioteca', description: 'Visita guiada à biblioteca', cost: 60, category: 'experiencias', icon: 'BookOpen', emoji: '📚' } },
  { id: 'professor', data: { name: 'Jogo com o Professor', description: 'Sessão de jogo com o professor', cost: 150, category: 'experiencias', icon: 'Trophy', emoji: '🎮' } },
  { id: 'plantio', data: { name: 'Hortinha da Escola', description: 'Atividade de cultivo na horta', cost: 80, category: 'experiencias', icon: 'Sparkles', emoji: '🌱' } },
  { id: 'recreio', data: { name: 'Recreio Estendido', description: 'Tempo adicional de recreio, sujeito a aprovação', cost: 200, category: 'experiencias', icon: 'Zap', emoji: '⏰' } },
  { id: 'emoji', data: { name: 'Pack de Emojis Digitais', description: 'Coleção de stickers digitais', cost: 40, category: 'digitais', icon: 'Sparkles', emoji: '😎' } },
  { id: 'avatar', data: { name: 'Avatar Especial', description: 'Personalização de avatar', cost: 75, category: 'digitais', icon: 'Star', emoji: '🎭' } },
  { id: 'titulo', data: { name: 'Título de Explorador', description: 'Título digital para o perfil', cost: 300, category: 'digitais', icon: 'Trophy', emoji: '🏅' } },
  { id: 'museu', data: { name: 'Visita ao Museu', description: 'Visita cultural sujeita à aprovação', cost: 500, category: 'cultura', icon: 'BookOpen', emoji: '🏛️' } },
  { id: 'peca-teatral', data: { name: 'Ingresso para Peça Teatral', description: 'Experiência cultural em grupo', cost: 400, category: 'cultura', icon: 'Music', emoji: '🎭' } },
];

const CATALOGS: Record<CatalogEntity, CatalogItem[]> = {
  trails: TRAILS,
  missions: MISSIONS,
  abilities: ABILITIES,
  cards: CARDS,
  achievements: ACHIEVEMENTS,
  rewards: REWARDS,
};
const ALLOWED = new Set<string>(Object.keys(CATALOGS));

function validateCatalog(entity: CatalogEntity, items: CatalogItem[]): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const item of items) {
    if (!item.id || ids.has(item.id)) errors.push(`${entity}: ID ausente ou duplicado (${item.id || 'vazio'})`);
    ids.add(item.id);
    try {
      const json = JSON.stringify(item.data);
      if (!json || JSON.stringify(JSON.parse(json)) !== json) errors.push(`${entity}/${item.id}: payload JSON inválido`);
    } catch {
      errors.push(`${entity}/${item.id}: payload não serializável em JSON`);
    }
  }
  return errors;
}

/** Dry-run só valida os catálogos locais e não inicializa nem consulta Firebase. */
export async function executeSeed(options: SeedOptions): Promise<SeedProgress[]> {
  const requested = options.entities as string[];
  const forbidden = requested.filter((entity) => !ALLOWED.has(entity));
  if (forbidden.length) throw new Error(`Coleções não permitidas para seed: ${forbidden.join(', ')}`);
  if (!requested.length) throw new Error('Informe ao menos uma coleção de catálogo permitida.');
  if (!options.dryRun && options.mode !== 'insert') {
    throw new Error('Escritas reais são insert-only; não há suporte a upsert/replace.');
  }
  const db = options.dryRun ? undefined : getDb();
  const results: SeedProgress[] = [];
  for (const entity of requested as CatalogEntity[]) {
    const items = CATALOGS[entity];
    const errors = validateCatalog(entity, items);
    let created = 0;
    let updated = 0;
    if (!errors.length && options.dryRun) created = items.length;
    if (!errors.length && db) {
      const collection = db.collection(entity);
      for (const item of items) {
        const ref = collection.doc(item.id);
        const existing = await ref.get();
        if (existing.exists) {
          // Não substituir nem limpar dados que possam ter sido gravados anteriormente.
          updated++;
          continue;
        }
        await ref.create({ ...item.data, createdAt: Timestamp.now() });
        created++;
      }
    }
    results.push({ entity, created, updated, errors: errors.length, errorMessages: errors });
  }
  return results;
}
