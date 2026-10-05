/**
 * Geometria e dados de cenário da missão "Um dia no trabalho com um gari".
 * Todas as respostas numéricas de área/perímetro são CALCULADAS a partir
 * destas formas, para que visual e gabarito nunca fiquem dessincronizados.
 */

export type Cell = [number, number];

export const cellKey = (c: Cell) => `${c[0]},${c[1]}`;

export function rectCells(x0: number, y0: number, w: number, h: number): Cell[] {
  const out: Cell[] = [];
  for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) out.push([x, y]);
  return out;
}

export const areaOf = (cells: Cell[]) => cells.length;

const DIRS: Cell[] = [[1, 0], [-1, 0], [0, 1], [0, -1]];

export function perimeterOf(cells: Cell[]): number {
  const set = new Set(cells.map(cellKey));
  let p = 0;
  for (const [x, y] of cells) for (const [dx, dy] of DIRS) if (!set.has(`${x + dx},${y + dy}`)) p++;
  return p;
}

/** Segmentos (em unidades da malha) que formam o contorno externo de uma região. */
export function outlineSegments(cells: Cell[]): [number, number, number, number][] {
  const set = new Set(cells.map(cellKey));
  const segs: [number, number, number, number][] = [];
  for (const [x, y] of cells) {
    if (!set.has(`${x},${y - 1}`)) segs.push([x, y, x + 1, y]);
    if (!set.has(`${x},${y + 1}`)) segs.push([x, y + 1, x + 1, y + 1]);
    if (!set.has(`${x - 1},${y}`)) segs.push([x, y, x, y + 1]);
    if (!set.has(`${x + 1},${y}`)) segs.push([x + 1, y, x + 1, y + 1]);
  }
  return segs;
}

export interface GridRegion {
  id: string;
  name: string;      // nome da cor (usado nas respostas)
  label: string;     // o que a região representa na praça
  color: string;     // cor do contorno
  cells: Cell[];
}

// ── MISSÃO 1/2 · Rota do gari ────────────────────────────────────────────────
export type Dir = 'R' | 'L' | 'U' | 'D';
export const DIR_LABEL: Record<Dir, string> = { R: 'direita', L: 'esquerda', U: 'para cima', D: 'para baixo' };
export const DIRECTION_OPTIONS = ['direita', 'esquerda', 'para cima', 'para baixo'];

export const ROUTE = {
  cols: 9,
  rows: 6,
  start: [1, 5] as Cell,
  steps: [
    { dir: 'R' as Dir, n: 2 },
    { dir: 'U' as Dir, n: 3 },
    { dir: 'R' as Dir, n: 4 },
    { dir: 'D' as Dir, n: 2 },
    { dir: 'L' as Dir, n: 1 },
  ],
};

export function routePoints(): Cell[] {
  const pts: Cell[] = [ROUTE.start];
  let [x, y] = ROUTE.start;
  for (const s of ROUTE.steps) {
    if (s.dir === 'R') x += s.n;
    if (s.dir === 'L') x -= s.n;
    if (s.dir === 'U') y -= s.n;
    if (s.dir === 'D') y += s.n;
    pts.push([x, y]);
  }
  return pts;
}

export const ROUTE_TOTAL = ROUTE.steps.reduce((s, st) => s + st.n, 0); // 12 quadras
export const MAP_SQUARE_CM = 2; // no mapa ampliado, cada lado de quadradinho mede 2 cm

// ── MISSÃO 3 · Planta da praça ───────────────────────────────────────────────
export const PRACA_GRID = { cols: 15, rows: 8 };
export const PRACA_REGIONS: GridRegion[] = [
  { id: 'azul', name: 'Azul', label: 'Canteiro de flores', color: '#3b82f6', cells: rectCells(1, 1, 3, 2) },
  { id: 'laranja', name: 'Laranja', label: 'Calçada em L', color: '#f97316', cells: [[5, 1], [5, 2], [5, 3], [5, 4], [6, 4], [7, 4]] },
  { id: 'vermelho', name: 'Vermelho', label: 'Área de coleta', color: '#ef4444', cells: rectCells(9, 1, 4, 2) },
  { id: 'verde', name: 'Verde', label: 'Gramado', color: '#22c55e', cells: [[2, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [2, 6], [3, 6]] },
  { id: 'roxo', name: 'Roxo', label: 'Espaço das lixeiras', color: '#a855f7', cells: [[10, 4], [9, 5], [10, 5], [11, 5], [10, 6]] },
];

// Planta em cm² (cada quadrado tem 1 cm de lado)
export const CM_GRID = { cols: 12, rows: 8 };
export const CM_REGIONS: GridRegion[] = [
  { id: 'amarela', name: 'Amarela', label: 'Passeio', color: '#eab308', cells: rectCells(1, 1, 4, 3) },
  { id: 'ciano', name: 'Azul-clara', label: 'Canteiro em escada', color: '#06b6d4', cells: [[7, 1], [7, 2], [8, 2], [7, 3], [8, 3], [9, 3], [7, 4], [8, 4], [9, 4], [10, 4]] },
  { id: 'rosa', name: 'Rosa', label: 'Ponto de coleta', color: '#ec4899', cells: [[2, 5], [3, 5], [4, 5], [2, 6], [3, 6], [4, 6], [5, 6]] },
];

// ── MISSÃO 5 · Fita de segurança (perímetro × área) ──────────────────────────
export const PERIM_GRID = { cols: 14, rows: 6 };
export const PERIM_REGIONS: GridRegion[] = [
  { id: 'azul', name: 'Azul', label: 'Trecho da calçada', color: '#3b82f6', cells: rectCells(1, 1, 4, 2) },
  { id: 'roxa', name: 'Roxa', label: 'Esquina em L', color: '#a855f7', cells: [[6, 1], [6, 2], [6, 3], [7, 3], [8, 3]] },
  { id: 'verde', name: 'Verde', label: 'Canteiro quadrado', color: '#22c55e', cells: rectCells(10, 2, 2, 2) },
];

// ── MISSÃO 6 · Caixa de recicláveis ──────────────────────────────────────────
export const MATERIAL_TYPES = [
  { id: 'plastico', name: 'Plástico', icon: '🧴', desc: 'garrafa PET', count: 7, color: '#ef4444' },
  { id: 'metal', name: 'Metal', icon: '🥫', desc: 'lata', count: 4, color: '#eab308' },
  { id: 'papel', name: 'Papel', icon: '📰', desc: 'jornal', count: 3, color: '#3b82f6' },
  { id: 'vidro', name: 'Vidro', icon: '🫙', desc: 'pote de vidro', count: 2, color: '#22c55e' },
];

// ── MISSÃO 7 · Roleta de tarefas ─────────────────────────────────────────────
export const TASKS = {
  varrer: { name: 'Varrer a calçada', short: 'Varrer', color: '#f97316', icon: '🧹' },
  folhas: { name: 'Recolher folhas', short: 'Folhas', color: '#22c55e', icon: '🍂' },
  reciclaveis: { name: 'Separar recicláveis', short: 'Recicláveis', color: '#3b82f6', icon: '♻️' },
  praca: { name: 'Limpar a praça', short: 'Praça', color: '#a855f7', icon: '🌳' },
} as const;
export type TaskId = keyof typeof TASKS;
export const ROULETTE: TaskId[] = ['varrer', 'folhas', 'varrer', 'reciclaveis', 'folhas', 'varrer', 'praca', 'folhas', 'reciclaveis', 'varrer'];
export const rouletteCount = (t: TaskId) => ROULETTE.filter(s => s === t).length;

// ── MISSÃO 8 · Balões da campanha ────────────────────────────────────────────
export const BALLOONS = [
  { id: 'vermelho', name: 'Vermelho', color: '#ef4444', count: 5 },
  { id: 'azul', name: 'Azul', color: '#3b82f6', count: 3 },
  { id: 'verde', name: 'Verde', color: '#22c55e', count: 4 },
];
export const BALLOON_TOTAL = BALLOONS.reduce((s, b) => s + b.count, 0); // 12

// ── MISSÃO 9 · Sacola de recicláveis ─────────────────────────────────────────
export const BAG = [
  { id: 'papel', name: 'Papel', icon: '📄', count: 6, color: '#3b82f6' },
  { id: 'plastico', name: 'Plástico', icon: '🥤', count: 8, color: '#ef4444' },
  { id: 'metal', name: 'Metal', icon: '🥫', count: 4, color: '#eab308' },
];
export const BAG_TOTAL = BAG.reduce((s, b) => s + b.count, 0); // 18

// ── MISSÃO 11 · Registro do turno ────────────────────────────────────────────
export const FREQUENCIES = [
  { id: 'plastico', name: 'Plástico', count: 20, color: '#ef4444', icon: '🧴' },
  { id: 'papel', name: 'Papel', count: 12, color: '#3b82f6', icon: '📰' },
  { id: 'metal', name: 'Metal', count: 10, color: '#eab308', icon: '🥫' },
  { id: 'vidro', name: 'Vidro', count: 5, color: '#22c55e', icon: '🫙' },
];
export const FREQ_TOTAL = FREQUENCIES.reduce((s, f) => s + f.count, 0); // 47

// ── MISSÃO 12 · 10 sacos de resíduos ─────────────────────────────────────────
export const TEN_BAGS = [
  { id: 'sem', name: 'Sem classificação', count: 1, color: '#94a3b8' },
  { id: 'papel', name: 'Papel', count: 2, color: '#3b82f6' },
  { id: 'plastico', name: 'Plástico', count: 3, color: '#ef4444' },
  { id: 'organico', name: 'Orgânico (compostagem)', count: 4, color: '#a16207' },
];

// ── MISSÃO 13/14 · Gráfico de coleta anual (toneladas) ───────────────────────
export const TONS_CHART = [
  { year: '2015', tons: 14 },
  { year: '2016', tons: 18 },
  { year: '2017', tons: 26 },
  { year: '2018', tons: 22 },
  { year: '2019', tons: 30 },
  { year: '2020', tons: 34 },
];

// ── MISSÃO 15 · Placas em sequência ──────────────────────────────────────────
export const PATTERN = [
  { id: 'separar', name: 'Separar', color: '#3b82f6' },
  { id: 'reduzir', name: 'Reduzir', color: '#f97316' },
  { id: 'reutilizar', name: 'Reutilizar', color: '#a855f7' },
  { id: 'reciclar', name: 'Reciclar', color: '#22c55e' },
];
export const PATTERN_TARGET = 27;

// ── MISSÃO 16 · Estruturas de cubinhos ───────────────────────────────────────
export type Cube = [number, number, number];
export interface CubeStructure {
  id: string;
  label: string;
  cubes: Cube[];
  /** Pares de índices (blocos de 2 cubinhos) de uma montagem possível; vazio = impossível. */
  pairs: [number, number][];
  description: string;
}

const c2: Cube[] = [[0, 0, 0], [0, 0, 1], [1, 0, 0], [1, 0, 1], [0, 1, 0], [0, 1, 1], [1, 1, 0], [1, 1, 1]];

export const CUBE_STRUCTURES: CubeStructure[] = [
  {
    id: 'e1', label: 'Estrutura 1', cubes: c2, pairs: [[0, 1], [2, 3], [4, 5], [6, 7]],
    description: 'Um cubo grande formado por 2 camadas de 2 × 2 cubinhos (8 cubinhos).',
  },
  {
    id: 'e2', label: 'Estrutura 2',
    cubes: [[0, 0, 0], [1, 0, 0], [2, 0, 0], [3, 0, 0], [0, 1, 0], [1, 1, 0], [2, 1, 0], [3, 1, 0]],
    pairs: [[0, 1], [2, 3], [4, 5], [6, 7]],
    description: 'Uma placa baixa com 2 fileiras de 4 cubinhos, todos no chão (8 cubinhos).',
  },
  {
    id: 'e3', label: 'Estrutura 3',
    cubes: [[1, 1, 0], [0, 1, 0], [2, 1, 0], [1, 0, 0], [1, 2, 0], [1, 1, 1], [1, 1, 2], [1, 1, 3]],
    pairs: [],
    description: 'Uma cruz no chão: um cubinho central com quatro pontas (uma para cada lado). Sobre o cubinho central há uma torre de mais 3 cubinhos (8 cubinhos).',
  },
  {
    id: 'e4', label: 'Estrutura 4',
    cubes: [[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 1, 0], [1, 1, 0], [2, 1, 0], [0, 0, 1], [0, 1, 1]],
    pairs: [[0, 3], [1, 4], [2, 5], [6, 7]],
    description: 'Uma base com 2 fileiras de 3 cubinhos e, sobre uma das pontas, mais 2 cubinhos lado a lado, como um degrau (8 cubinhos).',
  },
];

// ── MISSÃO 17 · Mapa de limpeza com faixas pintadas ──────────────────────────
export const PAINT_GRID = { cols: 9, rows: 6 };
export const PAINT_STRIPES: { id: string; name: string; color: string; cells: Cell[] }[] = [
  { id: 'verde', name: 'Faixa verde (Rua das Flores)', color: '#22c55e', cells: rectCells(1, 1, 6, 1) },
  { id: 'azul', name: 'Faixa azul (Travessa do Rio)', color: '#3b82f6', cells: rectCells(7, 1, 1, 4) },
  { id: 'laranja', name: 'Faixa laranja (Rua da Feira)', color: '#f97316', cells: rectCells(2, 4, 4, 1) },
];
export const PAINT_TOTAL = PAINT_STRIPES.reduce((s, st) => s + st.cells.length, 0); // 14
