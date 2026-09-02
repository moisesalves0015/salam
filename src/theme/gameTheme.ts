/**
 * SALA DE MISSÕES - GAME DESIGN SYSTEM TOKENS & UTILITIES
 * 
 * Sistema visual de game educativo premium em tema claro.
 * Otimizado para TV da sala de aula (16:9) e dispositivos de alunos e professores.
 */

export const SM_TOKENS = {
  canvas: '#F6FAFF',
  surface: '#FFFFFF',
  surfaceSoft: '#EAF4FF',
  ink: '#18324A',
  inkMuted: '#60758A',
  primary: '#2676D9',
  primaryDeep: '#1652A3',
  turquoise: '#19B9B0',
  reward: '#F6B928',
  rewardDeep: '#D68E08',
  success: '#43B96A',
  attention: '#F28C38',
  error: '#E85D63',
  special: '#8059D9',
  border: '#C9DDF0',
} as const;

export const GAME_COLORS = {
  // Primária: Azul Vibrante da Marca e Foco (#2676D9)
  primary: {
    DEFAULT: '#2676D9',
    hover: '#1B65C2',
    deep: '#1652A3',
    light: '#EAF4FF',
    border: '#C9DDF0',
    text: '#1652A3',
    glow: 'rgba(38, 118, 217, 0.25)',
  },
  // Turquesa: Progresso, Avanço e Interações Positivas (#19B9B0)
  turquoise: {
    DEFAULT: '#19B9B0',
    hover: '#139E96',
    light: '#E6FAF9',
    border: '#B0EBE7',
    text: '#0D7A74',
    glow: 'rgba(25, 185, 176, 0.25)',
  },
  // Dourado de Recompensa: Troféus, Moedas, Estrelas, Botões Principais (#F6B928)
  reward: {
    DEFAULT: '#F6B928',
    hover: '#E5A61A',
    deep: '#D68E08',
    light: '#FEF8EA',
    border: '#FCE09D',
    text: '#945E00',
    glow: 'rgba(246, 185, 40, 0.35)',
  },
  // Sucesso: Verde para missões concluídas e respostas certas (#43B96A)
  success: {
    DEFAULT: '#43B96A',
    hover: '#36A25B',
    light: '#EBF8F0',
    border: '#BFE7CD',
    text: '#226D3C',
    glow: 'rgba(67, 185, 106, 0.25)',
  },
  // Atenção / Pendente: Laranja para streak e contadores (#F28C38)
  attention: {
    DEFAULT: '#F28C38',
    hover: '#DC7624',
    light: '#FEF4EC',
    border: '#FBD2B1',
    text: '#A64D07',
  },
  // Especial: Roxo para conquistas raras e especiais (#8059D9)
  special: {
    DEFAULT: '#8059D9',
    hover: '#6F47C7',
    light: '#F4EFFC',
    border: '#D8C7F5',
    text: '#4F2E9E',
    glow: 'rgba(128, 89, 217, 0.25)',
  },
  // Erro suave / Intervenção: Coral (#E85D63)
  error: {
    DEFAULT: '#E85D63',
    hover: '#D44A50',
    light: '#FDF0F1',
    border: '#F8C1C4',
    text: '#9E242A',
  },
};

export type CardRarity = 'comum' | 'incomum' | 'raro' | 'epico' | 'lendario';

export interface RarityConfig {
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  cardBorder: string;
  cardBg: string;
  cardGradient: string;
  glowClass: string;
  iconColor: string;
  accentColor: string;
}

export const RARITY_CONFIGS: Record<CardRarity, RarityConfig> = {
  comum: {
    label: 'Comum',
    badgeBg: 'bg-[#EAF4FF]',
    badgeText: 'text-[#18324A]',
    badgeBorder: 'border-[#C9DDF0]',
    cardBorder: 'border-[#C9DDF0] hover:border-[#2676D9]',
    cardBg: 'bg-[#FFFFFF]',
    cardGradient: 'from-[#F6FAFF] to-[#FFFFFF]',
    glowClass: '',
    iconColor: 'text-[#2676D9]',
    accentColor: '#2676D9',
  },
  incomum: {
    label: 'Incomum',
    badgeBg: 'bg-[#E6FAF9]',
    badgeText: 'text-[#0D7A74]',
    badgeBorder: 'border-[#B0EBE7]',
    cardBorder: 'border-[#B0EBE7] hover:border-[#19B9B0]',
    cardBg: 'bg-[#F4FCFB]',
    cardGradient: 'from-[#E6FAF9] to-[#FFFFFF]',
    glowClass: 'hover:shadow-[#19B9B0]/20',
    iconColor: 'text-[#19B9B0]',
    accentColor: '#19B9B0',
  },
  raro: {
    label: 'Raro',
    badgeBg: 'bg-[#EAF4FF]',
    badgeText: 'text-[#1652A3]',
    badgeBorder: 'border-[#94C2F7]',
    cardBorder: 'border-[#94C2F7] hover:border-[#2676D9]',
    cardBg: 'bg-[#F0F7FF]',
    cardGradient: 'from-[#EAF4FF] to-[#FFFFFF]',
    glowClass: 'hover:shadow-[#2676D9]/25',
    iconColor: 'text-[#2676D9]',
    accentColor: '#2676D9',
  },
  epico: {
    label: 'Épico',
    badgeBg: 'bg-[#F4EFFC]',
    badgeText: 'text-[#4F2E9E]',
    badgeBorder: 'border-[#D8C7F5]',
    cardBorder: 'border-[#D8C7F5] hover:border-[#8059D9]',
    cardBg: 'bg-gradient-to-br from-[#FAF7FD] to-[#FFFFFF]',
    cardGradient: 'from-[#F4EFFC] to-[#FFFFFF]',
    glowClass: 'shadow-xs shadow-[#8059D9]/15 hover:shadow-[#8059D9]/30',
    iconColor: 'text-[#8059D9]',
    accentColor: '#8059D9',
  },
  lendario: {
    label: 'Lendário',
    badgeBg: 'bg-gradient-to-r from-[#FEF8EA] to-[#FFF3D6]',
    badgeText: 'text-[#945E00]',
    badgeBorder: 'border-[#FCE09D]',
    cardBorder: 'border-[#FCE09D] hover:border-[#F6B928]',
    cardBg: 'bg-gradient-to-br from-[#FEF8EA] via-[#FFFFFF] to-[#FFF9ED]',
    cardGradient: 'from-[#FEF8EA] to-[#FFFFFF]',
    glowClass: 'shadow-sm shadow-[#F6B928]/25 hover:shadow-[#F6B928]/40',
    iconColor: 'text-[#D68E08]',
    accentColor: '#F6B928',
  },
};

export type QuestStatus = 'Disponível' | 'Em andamento' | 'Concluída' | 'Bloqueada' | 'Especial';

export interface QuestStatusConfig {
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  iconName: 'play' | 'clock' | 'check-circle' | 'lock' | 'sparkles';
  accentBorder: string;
}

export const QUEST_STATUS_CONFIGS: Record<QuestStatus, QuestStatusConfig> = {
  'Disponível': {
    label: 'Disponível',
    badgeBg: 'bg-[#FEF8EA]',
    badgeText: 'text-[#945E00]',
    badgeBorder: 'border-[#FCE09D]',
    iconName: 'play',
    accentBorder: 'border-[#FCE09D] hover:border-[#F6B928]',
  },
  'Em andamento': {
    label: 'Em Andamento',
    badgeBg: 'bg-[#EAF4FF]',
    badgeText: 'text-[#1652A3]',
    badgeBorder: 'border-[#94C2F7]',
    iconName: 'clock',
    accentBorder: 'border-[#2676D9] hover:border-[#1652A3]',
  },
  'Concluída': {
    label: 'Concluída',
    badgeBg: 'bg-[#EBF8F0]',
    badgeText: 'text-[#226D3C]',
    badgeBorder: 'border-[#BFE7CD]',
    iconName: 'check-circle',
    accentBorder: 'border-[#43B96A]',
  },
  'Bloqueada': {
    label: 'Bloqueada',
    badgeBg: 'bg-[#F1F5F9]',
    badgeText: 'text-[#60758A]',
    badgeBorder: 'border-[#C9DDF0]',
    iconName: 'lock',
    accentBorder: 'border-[#C9DDF0] opacity-80',
  },
  'Especial': {
    label: 'Quest Especial',
    badgeBg: 'bg-[#F4EFFC]',
    badgeText: 'text-[#4F2E9E]',
    badgeBorder: 'border-[#D8C7F5]',
    iconName: 'sparkles',
    accentBorder: 'border-[#8059D9] shadow-[#8059D9]/15',
  },
};

