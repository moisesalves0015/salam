import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  Atom, 
  Maximize2, 
  Minimize2, 
  Compass, 
  Flame, 
  Star, 
  BrainCircuit, 
  Target, 
  Trophy, 
  HeartHandshake, 
  Home, 
  Pause, 
  PlayCircle, 
  Coins, 
  Clock, 
  Globe2, 
  GraduationCap, 
  Lock, 
  Users2, 
  Smile, 
  Crown, 
  TrendingUp, 
  Sparkle, 
  Camera,
  CheckCircle2,
  Award
} from 'lucide-react';
import { Student, CardItem, AchievementItem, ClassMetrics } from '../types';

interface PainelSalaMissoesProps {
  students?: Student[];
  cards?: CardItem[];
  achievements?: AchievementItem[];
  metrics?: ClassMetrics;
  onClose?: () => void;
}

// Standard Frosted Glass Coin Badge - Pure Emerald Theme (No Yellow / No Mismatched Purple)
export const GlassCoin: React.FC<{ size?: 'xs' | 'sm' | 'md' }> = ({ size = 'sm' }) => {
  const sizeMap = {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6'
  };

  const iconMap = {
    xs: 'w-2.5 h-2.5',
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5'
  };

  return (
    <div className={`inline-flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-2xs shrink-0 ${sizeMap[size]}`}>
      <Coins className={`${iconMap[size]} text-white`} />
    </div>
  );
};

export const GlassCoinBadge: React.FC<{ 
  amount: number | string; 
  size?: 'xs' | 'sm' | 'md';
  prefix?: string;
  className?: string;
}> = ({ 
  amount, 
  size = 'sm', 
  prefix = '',
  className = '' 
}) => {
  const paddingMap = {
    xs: 'px-2 py-0.5 text-[9px] gap-1',
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-xs sm:text-sm gap-2'
  };

  return (
    <span className={`inline-flex items-center font-black rounded-xl bg-emerald-50/90 backdrop-blur-md border border-emerald-200/90 text-emerald-900 shadow-2xs ${paddingMap[size]} ${className}`}>
      <GlassCoin size={size === 'xs' ? 'xs' : 'sm'} />
      <span>{prefix}{typeof amount === 'number' ? amount.toLocaleString('pt-BR') : amount}</span>
      <span className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider">Moedas</span>
    </span>
  );
};

// Standard Frosted Glass XP Badge - Pure Sky/Blue Theme
export const GlassXpBadge: React.FC<{
  amount: number | string;
  size?: 'xs' | 'sm' | 'md';
  prefix?: string;
  className?: string;
}> = ({
  amount,
  size = 'sm',
  prefix = '+',
  className = ''
}) => {
  const paddingMap = {
    xs: 'px-2 py-0.5 text-[9px] gap-1',
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3 py-1.5 text-xs sm:text-sm gap-2'
  };

  return (
    <span className={`inline-flex items-center font-black rounded-xl bg-sky-50/90 backdrop-blur-md border border-sky-200/90 text-sky-900 shadow-2xs ${paddingMap[size]} ${className}`}>
      <Star className="w-3.5 h-3.5 fill-sky-500 text-sky-600 shrink-0" />
      <span>{prefix}{typeof amount === 'number' ? amount.toLocaleString('pt-BR') : amount} XP</span>
    </span>
  );
};

// Motivational adventure phrases for children
const ADVENTURE_QUOTES = [
  { text: "Cada tentativa faz você e sua turma avançarem mais longe!", author: "Academia dos Exploradores" },
  { text: "Errar faz parte da aventura de descobrir coisas novas!", author: "Espírito Científico" },
  { text: "Juntos em duplas e grupos, construímos superpoderes!", author: "Clube da Colaboração" },
  { text: "Toda missão concluída é um novo saber conquistado!", author: "Mundo dos Saberes" },
  { text: "A curiosidade é a bússola dos verdadeiros heróis do saber!", author: "Sala de Missões" }
];

// Classroom Memory Photos with inspiring team captions
const CLASSROOM_MEMORIES = [
  {
    title: 'Projeto Científico em Grupo',
    caption: 'Descobrindo os segredos da natureza e das plantas com muita curiosidade!',
    photoUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80',
    tag: 'Laboratório Vivo'
  },
  {
    title: 'Desafio da Leitura Criativa',
    caption: 'Criando histórias e contos incríveis com toda a turma unida!',
    photoUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80',
    tag: 'Clube do Livro'
  },
  {
    title: 'Oficina de Robótica & Lógica',
    caption: 'Montando engrenagens e resolvendo enigmas em equipe!',
    photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
    tag: 'Makers da Sala'
  },
  {
    title: 'Gincana da Matemática Divertida',
    caption: 'Quando todo mundo ajuda, nenhum desafio é difícil demais!',
    photoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80',
    tag: 'Matemáticos Mirins'
  }
];

interface ClassroomAdventureData {
  id: string;
  name: string;
  grade: string;
  tagline: string;
  totalXp: number;
  xpToday: number;
  completedMissions: number;
  coinsCount: number;
  
  specialMission: {
    title: string;
    theme: string;
    coverUrl: string;
    xpReward: number;
    coinsReward: number;
    badge: string;
    timeLeft: string;
    status: string;
  };

  upcomingMissions: {
    id: string;
    title: string;
    world: string;
    worldIcon: React.ComponentType<{ className?: string }>;
    worldBadgeClass: string;
    xpReward: number;
    coinsReward: number;
    coverUrl: string;
    availability: string;
  }[];

  adventureWorlds: {
    id: string;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    colorClass: string;
    badgeClass: string;
    barColor: string;
    availableMissions: number;
    progressPct: number;
  }[];

  pairs: {
    name1: string;
    name2: string;
    avatar1: string;
    avatar2: string;
    mission: string;
    step: string;
    xpReward: number;
  }[];

  groups: {
    name: string;
    mission: string;
    avatars: string[];
    progressPct: number;
    xpReward: number;
  }[];

  recentCelebrations: {
    type: 'missao' | 'sequencia' | 'fase' | 'dupla';
    title: string;
    classroom: string;
    xp: number;
    coins: number;
    author: string;
    avatar: string;
  }[];

  positiveHighlights: {
    category: string;
    studentName: string;
    avatar: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badgeClass: string;
  }[];

  explorers: {
    name: string;
    avatar: string;
    level: number;
    xp: number;
    tag: string;
  }[];
}

// 4 Standard Worlds guaranteed in ALL classrooms (Blue, Indigo, Emerald, Purple - Harmonious Tones)
const STANDARD_WORLDS_TEMPLATE = [
  {
    id: 'w1',
    name: 'Reino dos Números',
    icon: Calculator,
    colorClass: 'text-sky-900 bg-sky-50/90 border-sky-200/90',
    badgeClass: 'bg-sky-600 text-white',
    barColor: 'bg-sky-500',
    availableMissions: 5,
    progressPct: 80
  },
  {
    id: 'w2',
    name: 'Jornada da Leitura',
    icon: BookOpen,
    colorClass: 'text-indigo-900 bg-indigo-50/90 border-indigo-200/90',
    badgeClass: 'bg-indigo-600 text-white',
    barColor: 'bg-indigo-600',
    availableMissions: 4,
    progressPct: 75
  },
  {
    id: 'w3',
    name: 'Ilha das Ciências',
    icon: Atom,
    colorClass: 'text-emerald-900 bg-emerald-50/90 border-emerald-200/90',
    badgeClass: 'bg-emerald-600 text-white',
    barColor: 'bg-emerald-600',
    availableMissions: 3,
    progressPct: 70
  },
  {
    id: 'w4',
    name: 'Mundo dos Desafios',
    icon: BrainCircuit,
    colorClass: 'text-purple-900 bg-purple-50/90 border-purple-200/90',
    badgeClass: 'bg-purple-600 text-white',
    barColor: 'bg-purple-600',
    availableMissions: 6,
    progressPct: 88
  }
];

const CLASSROOM_ADVENTURES: ClassroomAdventureData[] = [
  {
    id: '5a',
    name: '5º ANO A',
    grade: '5º Ano Fundamental',
    tagline: 'Exploradores da Lógica & Aventura dos Números',
    totalXp: 8420,
    xpToday: 450,
    completedMissions: 134,
    coinsCount: 3280,
    
    specialMission: {
      title: 'O Enigma do Tesouro Perdido dos Números',
      theme: 'Reino dos Números',
      coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      xpReward: 350,
      coinsReward: 150,
      badge: 'Desafio da Semana',
      timeLeft: '01h 45m',
      status: 'EM ANDAMENTO'
    },

    upcomingMissions: [
      {
        id: 'up1',
        title: 'A Batalha das Frações Coloridas',
        world: 'Reino dos Números',
        worldIcon: Calculator,
        worldBadgeClass: 'bg-sky-100 text-sky-800 border-sky-200',
        xpReward: 160,
        coinsReward: 80,
        coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=500&auto=format&fit=crop&q=80',
        availability: 'Em 15 min'
      },
      {
        id: 'up2',
        title: 'Expedição ao Ecossistema da Floresta',
        world: 'Ilha das Ciências',
        worldIcon: Atom,
        worldBadgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        xpReward: 220,
        coinsReward: 110,
        coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
        availability: 'Hoje às 14:30'
      },
      {
        id: 'up3',
        title: 'O Labirinto dos Códigos Secretos',
        world: 'Mundo dos Desafios',
        worldIcon: BrainCircuit,
        worldBadgeClass: 'bg-purple-100 text-purple-800 border-purple-200',
        xpReward: 250,
        coinsReward: 120,
        coverUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=80',
        availability: 'Amanhã 09:00'
      }
    ],

    adventureWorlds: STANDARD_WORLDS_TEMPLATE.map(w => ({ ...w, availableMissions: 5, progressPct: 82 })),

    pairs: [
      {
        name1: 'João M.',
        name2: 'Maria E.',
        avatar1: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160',
        avatar2: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160',
        mission: 'Desafio da Divisão',
        step: 'Etapa 3/4',
        xpReward: 100
      },
      {
        name1: 'Sofia R.',
        name2: 'Lucas P.',
        avatar1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160',
        avatar2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160',
        mission: 'Mistério da Leitura',
        step: 'Etapa 2/3',
        xpReward: 120
      },
      {
        name1: 'Pedro H.',
        name2: 'Ana Clara',
        avatar1: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160',
        avatar2: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160',
        mission: 'Cadeia dos Ecossistemas',
        step: 'Fase Final',
        xpReward: 150
      },
      {
        name1: 'Gabriel S.',
        name2: 'Manuela B.',
        avatar1: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160',
        avatar2: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160',
        mission: 'Enigma dos Ângulos',
        step: 'Etapa 1/2',
        xpReward: 90
      }
    ],

    groups: [
      {
        name: 'Equipe Exploradores da Ciência',
        mission: 'Investigação do Ecossistema',
        avatars: [
          'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
        ],
        progressPct: 80,
        xpReward: 300
      },
      {
        name: 'Guardiões da Lógica & Raciocínio',
        mission: 'Desafio do Resto da Divisão',
        avatars: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
        ],
        progressPct: 92,
        xpReward: 320
      }
    ],

    recentCelebrations: [
      {
        type: 'missao',
        title: 'MISSÃO CONCLUÍDA!',
        classroom: '5º Ano A',
        xp: 200,
        coins: 100,
        author: 'João & Maria',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120'
      },
      {
        type: 'sequencia',
        title: 'SEQUÊNCIA DE 5 DIAS!',
        classroom: '5º Ano A',
        xp: 150,
        coins: 80,
        author: 'Sofia R.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120'
      },
      {
        type: 'fase',
        title: 'NOVA FASE DESBLOQUEADA!',
        classroom: 'Turma Toda',
        xp: 300,
        coins: 150,
        author: 'Mundo das Frações',
        avatar: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=120'
      }
    ],

    positiveHighlights: [
      {
        category: 'Super Colaboração',
        studentName: 'Lucas P. & Pedro H.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=140',
        description: 'Ajudaram colegas na missão de divisão com muita paciência!',
        icon: HeartHandshake,
        badgeClass: 'text-emerald-900 bg-emerald-50 border-emerald-200'
      },
      {
        category: 'Grande Evolução',
        studentName: 'Ana Clara M.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=140',
        description: 'Superou o desafio de leitura e descobriu todas as pistas!',
        icon: TrendingUp,
        badgeClass: 'text-sky-900 bg-sky-50 border-sky-200'
      },
      {
        category: 'Foco & Criatividade',
        studentName: 'Manuela B.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140',
        description: 'Criou uma solução genial para organizar o grupo nas ciências!',
        icon: Sparkles,
        badgeClass: 'text-purple-900 bg-purple-50 border-purple-200'
      }
    ],

    explorers: [
      { name: 'Lucas P.', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160', level: 12, xp: 1840, tag: 'Foco' },
      { name: 'Ana Clara', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160', level: 10, xp: 1520, tag: 'Evoluindo' },
      { name: 'Gabriel M.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160', level: 9, xp: 1410, tag: 'Colaborador' },
      { name: 'Sofia R.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160', level: 11, xp: 1730, tag: 'Leitora' },
      { name: 'Enzo S.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160', level: 8, xp: 1290, tag: 'Cientista' },
      { name: 'Manuela B.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160', level: 13, xp: 2100, tag: 'Avançado' },
      { name: 'Pedro H.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160', level: 9, xp: 1380, tag: 'Rápido' },
      { name: 'Laura V.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160', level: 11, xp: 1690, tag: 'Dedicada' }
    ]
  },
  {
    id: '5b',
    name: '5º ANO B',
    grade: '5º Ano Fundamental',
    tagline: 'Mestres dos Sólidos 3D & Construtores de Ideias',
    totalXp: 7890,
    xpToday: 380,
    completedMissions: 118,
    coinsCount: 2940,
    
    specialMission: {
      title: 'A Construção da Fortaleza dos Sólidos 3D',
      theme: 'Mundo dos Desafios',
      coverUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80',
      xpReward: 320,
      coinsReward: 140,
      badge: 'Desafio da Semana',
      timeLeft: '02h 10m',
      status: 'EM ANDAMENTO'
    },

    upcomingMissions: [
      {
        id: 'up5',
        title: 'A Batalha da Energia Solar',
        world: 'Ilha das Ciências',
        worldIcon: Atom,
        worldBadgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        xpReward: 190,
        coinsReward: 95,
        coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
        availability: 'Hoje às 15:00'
      },
      {
        id: 'up6',
        title: 'Poliedros e Prismas Mágicos',
        world: 'Reino dos Números',
        worldIcon: Calculator,
        worldBadgeClass: 'bg-sky-100 text-sky-800 border-sky-200',
        xpReward: 210,
        coinsReward: 105,
        coverUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=80',
        availability: 'Amanhã 10:00'
      }
    ],

    adventureWorlds: STANDARD_WORLDS_TEMPLATE.map(w => ({ ...w, availableMissions: 4, progressPct: 75 })),

    pairs: [
      {
        name1: 'Beatriz L.',
        name2: 'Matheus F.',
        avatar1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160',
        avatar2: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160',
        mission: 'Poliedros 3D',
        step: 'Etapa 4/5',
        xpReward: 110
      },
      {
        name1: 'Helena C.',
        name2: 'Davi K.',
        avatar1: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160',
        avatar2: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160',
        mission: 'Redação das Lendas',
        step: 'Etapa 2/3',
        xpReward: 130
      }
    ],

    groups: [
      {
        name: 'Arquitetos 3D',
        mission: 'Montagem de Prismas e Pirâmides',
        avatars: [
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
          'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100',
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
        ],
        progressPct: 88,
        xpReward: 310
      }
    ],

    recentCelebrations: [
      {
        type: 'missao',
        title: 'FORTALEZA 3D COMPLETA!',
        classroom: '5º Ano B',
        xp: 220,
        coins: 110,
        author: 'Beatriz & Matheus',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120'
      }
    ],

    positiveHighlights: [
      {
        category: 'Criatividade Espacial',
        studentName: 'Helena C.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=140',
        description: 'Montou o prisma mais simétrico da turma toda!',
        icon: Sparkles,
        badgeClass: 'text-indigo-900 bg-indigo-50 border-indigo-200'
      }
    ],

    explorers: [
      { name: 'Beatriz L.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160', level: 11, xp: 1670, tag: 'Líder' },
      { name: 'Matheus F.', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160', level: 10, xp: 1490, tag: 'Preciso' },
      { name: 'Helena C.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160', level: 12, xp: 1810, tag: 'Escritora' },
      { name: 'Davi K.', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160', level: 9, xp: 1340, tag: 'Evolução' }
    ]
  },
  {
    id: '4a',
    name: '4º ANO A',
    grade: '4º Ano Fundamental',
    tagline: 'Campeões da Multiplicação & Contadores de Histórias',
    totalXp: 7120,
    xpToday: 320,
    completedMissions: 104,
    coinsCount: 2650,
    
    specialMission: {
      title: 'A Grande Fábrica da Multiplicação Mágica',
      theme: 'Reino dos Números',
      coverUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80',
      xpReward: 300,
      coinsReward: 130,
      badge: 'Desafio da Semana',
      timeLeft: '03h 00m',
      status: 'EM ANDAMENTO'
    },

    upcomingMissions: [
      {
        id: 'up7',
        title: 'O Segredo da Germinação da Semente',
        world: 'Ilha das Ciências',
        worldIcon: Atom,
        worldBadgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        xpReward: 180,
        coinsReward: 90,
        coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
        availability: 'Hoje às 11:30'
      }
    ],

    adventureWorlds: STANDARD_WORLDS_TEMPLATE.map(w => ({ ...w, availableMissions: 6, progressPct: 84 })),

    pairs: [
      {
        name1: 'Bernardo S.',
        name2: 'Luiza M.',
        avatar1: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160',
        avatar2: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160',
        mission: 'Multiplicação Ágil',
        step: 'Etapa 3/3',
        xpReward: 120
      }
    ],

    groups: [
      {
        name: 'Botânicos Mirins',
        mission: 'Ciclo da Água e Plantas',
        avatars: [
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
        ],
        progressPct: 80,
        xpReward: 280
      }
    ],

    recentCelebrations: [
      {
        type: 'missao',
        title: 'TABUADA CONQUISTADA!',
        classroom: '4º Ano A',
        xp: 190,
        coins: 95,
        author: 'Bernardo & Luiza',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120'
      }
    ],

    positiveHighlights: [
      {
        category: 'Rapidez & Alegria',
        studentName: 'Luiza M.',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=140',
        description: 'Leu o conto em voz alta com entonação incrível!',
        icon: BookOpen,
        badgeClass: 'text-indigo-900 bg-indigo-50 border-indigo-200'
      }
    ],

    explorers: [
      { name: 'Bernardo S.', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160', level: 10, xp: 1450, tag: 'Rápido' },
      { name: 'Luiza M.', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160', level: 11, xp: 1620, tag: 'Expressiva' }
    ]
  },
  {
    id: '4b',
    name: '4º ANO B',
    grade: '4º Ano Fundamental',
    tagline: 'Detetives das Frações & Criadores Poéticos',
    totalXp: 6850,
    xpToday: 290,
    completedMissions: 98,
    coinsCount: 2410,
    
    specialMission: {
      title: 'A Pizza Mágica das Frações',
      theme: 'Reino dos Números',
      coverUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=600&auto=format&fit=crop&q=80',
      xpReward: 290,
      coinsReward: 125,
      badge: 'Desafio da Semana',
      timeLeft: '02h 30m',
      status: 'EM ANDAMENTO'
    },

    upcomingMissions: [
      {
        id: 'up8',
        title: 'O Ciclo Secreto da Chuva',
        world: 'Ilha das Ciências',
        worldIcon: Atom,
        worldBadgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        xpReward: 190,
        coinsReward: 95,
        coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
        availability: 'Hoje às 15:30'
      }
    ],

    adventureWorlds: STANDARD_WORLDS_TEMPLATE.map(w => ({ ...w, availableMissions: 4, progressPct: 72 })),

    pairs: [
      {
        name1: 'Samuel V.',
        name2: 'Melissa T.',
        avatar1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160',
        avatar2: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160',
        mission: 'Frações na Pizza',
        step: 'Etapa 2/3',
        xpReward: 100
      }
    ],

    groups: [
      {
        name: 'Poetas das Frações',
        mission: 'Rimas com Números',
        avatars: [
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
        ],
        progressPct: 75,
        xpReward: 260
      }
    ],

    recentCelebrations: [
      {
        type: 'missao',
        title: 'FRAÇÃO 1/2 DESVENDADA!',
        classroom: '4º Ano B',
        xp: 170,
        coins: 85,
        author: 'Samuel & Melissa',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120'
      }
    ],

    positiveHighlights: [
      {
        category: 'Poeta da Turma',
        studentName: 'Samuel V.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=140',
        description: 'Compôs uma rima genial sobre a água e a chuva!',
        icon: Sparkles,
        badgeClass: 'text-indigo-900 bg-indigo-50 border-indigo-200'
      }
    ],

    explorers: [
      { name: 'Samuel V.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160', level: 9, xp: 1390, tag: 'Poeta' },
      { name: 'Melissa T.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160', level: 10, xp: 1480, tag: 'Foco' }
    ]
  },
  {
    id: 'escola',
    name: 'ESCOLA TODA',
    grade: 'EM Monte das Águas • 4º e 5º Anos',
    tagline: 'Todos os Exploradores Juntos na Grande Aventura!',
    totalXp: 30280,
    xpToday: 1440,
    completedMissions: 454,
    coinsCount: 11280,
    
    specialMission: {
      title: 'A Grande Jornada dos 50.000 XP da Escola',
      theme: 'Aventura Escolar Coletiva',
      coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      xpReward: 1000,
      coinsReward: 500,
      badge: 'Meta da Escola',
      timeLeft: 'Em aberto',
      status: 'AO VIVO'
    },

    upcomingMissions: [
      {
        id: 'up9',
        title: 'Festival da Leitura e das Histórias',
        world: 'Jornada da Leitura',
        worldIcon: BookOpen,
        worldBadgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        xpReward: 400,
        coinsReward: 200,
        coverUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500&auto=format&fit=crop&q=80',
        availability: 'Sexta-feira'
      }
    ],

    adventureWorlds: STANDARD_WORLDS_TEMPLATE.map(w => ({ ...w, availableMissions: 18, progressPct: 85 })),

    pairs: [
      {
        name1: 'João & Maria',
        name2: '(5º A)',
        avatar1: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160',
        avatar2: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160',
        mission: 'Desafio da Divisão',
        step: 'Etapa 3/4',
        xpReward: 100
      },
      {
        name1: 'Beatriz & Matheus',
        name2: '(5º B)',
        avatar1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160',
        avatar2: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=160',
        mission: 'Poliedros 3D',
        step: 'Etapa 4/5',
        xpReward: 110
      },
      {
        name1: 'Bernardo & Luiza',
        name2: '(4º A)',
        avatar1: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=160',
        avatar2: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160',
        mission: 'Multiplicação Ágil',
        step: 'Etapa 3/3',
        xpReward: 120
      },
      {
        name1: 'Samuel & Melissa',
        name2: '(4º B)',
        avatar1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160',
        avatar2: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160',
        mission: 'Frações na Pizza',
        step: 'Etapa 2/3',
        xpReward: 100
      }
    ],

    groups: [
      {
        name: '42 Equipes em Ação Cooperativa',
        mission: 'Desafios Interclasses Cooperativos',
        avatars: [
          'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
          'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
        ],
        progressPct: 86,
        xpReward: 600
      }
    ],

    recentCelebrations: [
      {
        type: 'missao',
        title: '454 MISSÕES CONCLUÍDAS!',
        classroom: 'Toda a Escola',
        xp: 1000,
        coins: 500,
        author: '4º e 5º Anos',
        avatar: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=120'
      }
    ],

    positiveHighlights: [
      {
        category: 'Super Colaboração Escolar',
        studentName: 'Todos os Exploradores',
        avatar: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=140',
        description: 'Mais de 100 crianças aprendendo e descobrindo juntas!',
        icon: Globe2,
        badgeClass: 'text-sky-900 bg-sky-50 border-sky-200'
      }
    ],

    explorers: [
      { name: 'Lucas (5ºA)', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160', level: 12, xp: 1840, tag: '5º A' },
      { name: 'Beatriz (5ºB)', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160', level: 11, xp: 1670, tag: '5º B' },
      { name: 'Luiza (4ºA)', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160', level: 11, xp: 1620, tag: '4º A' },
      { name: 'Samuel (4ºB)', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160', level: 9, xp: 1390, tag: '4º B' }
    ]
  }
];

export const PainelSalaMissoes: React.FC<PainelSalaMissoesProps> = ({ 
  students,
  cards,
  achievements,
  metrics,
  onClose 
}) => {
  // Live Clock & Fullscreen
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [quoteIdx, setQuoteIdx] = useState<number>(0);

  // Classroom Rotation Engine (16 seconds per view)
  const [currentClassIndex, setCurrentClassIndex] = useState<number>(0);
  const [classTimer, setClassTimer] = useState<number>(16);
  const [isAutoRotationActive, setIsAutoRotationActive] = useState<boolean>(true);

  // Micro-carousels State for Rotating Cards
  const [celebrationIdx, setCelebrationIdx] = useState<number>(0);
  const [highlightIdx, setHighlightIdx] = useState<number>(0);
  const [memoryPhotoIdx, setMemoryPhotoIdx] = useState<number>(0);

  const activeClass = CLASSROOM_ADVENTURES[currentClassIndex];

  // Fullscreen toggle helper
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => console.warn(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        });
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Live clock ticker
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Motivational adventure quotes
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setQuoteIdx((prev) => (prev + 1) % ADVENTURE_QUOTES.length);
    }, 9000);
    return () => clearInterval(quoteTimer);
  }, []);

  // Classroom Memories Auto-Rotator (every 6 seconds)
  useEffect(() => {
    if (!isAutoRotationActive) return;
    const memTimer = setInterval(() => {
      setMemoryPhotoIdx((prev) => (prev + 1) % CLASSROOM_MEMORIES.length);
    }, 6000);
    return () => clearInterval(memTimer);
  }, [isAutoRotationActive]);

  // Automatic classroom rotation (16 seconds per classroom view)
  useEffect(() => {
    if (!isAutoRotationActive) return;

    const rotTimer = setInterval(() => {
      setClassTimer((prev) => {
        if (prev <= 1) {
          setCurrentClassIndex((curr) => (curr + 1) % CLASSROOM_ADVENTURES.length);
          return 16;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(rotTimer);
  }, [isAutoRotationActive]);

  useEffect(() => {
    if (!isAutoRotationActive) return;

    const hlTimer = setInterval(() => {
      if (activeClass?.positiveHighlights?.length > 0) {
        setHighlightIdx((prev) => (prev + 1) % activeClass.positiveHighlights.length);
      }
    }, 6500);
    return () => clearInterval(hlTimer);
  }, [isAutoRotationActive, activeClass]);

  useEffect(() => {
    if (!isAutoRotationActive) return;

    const celTimer = setInterval(() => {
      if (activeClass?.recentCelebrations?.length > 0) {
        setCelebrationIdx((prev) => (prev + 1) % activeClass.recentCelebrations.length);
      }
    }, 5500);
    return () => clearInterval(celTimer);
  }, [isAutoRotationActive, activeClass]);

  const h = currentTime.getHours().toString().padStart(2, '0');
  const m = currentTime.getMinutes().toString().padStart(2, '0');
  const s = currentTime.getSeconds().toString().padStart(2, '0');

  const handleSelectClass = (idx: number) => {
    setCurrentClassIndex(idx);
    setClassTimer(16);
  };

  const currentCelebration = activeClass.recentCelebrations[celebrationIdx % activeClass.recentCelebrations.length];
  const currentHighlight = activeClass.positiveHighlights[highlightIdx % activeClass.positiveHighlights.length];
  const currentMemory = CLASSROOM_MEMORIES[memoryPhotoIdx % CLASSROOM_MEMORIES.length];

  // Guaranteed 4 worlds with empty-state handling
  const displayWorlds = activeClass.adventureWorlds && activeClass.adventureWorlds.length === 4
    ? activeClass.adventureWorlds
    : STANDARD_WORLDS_TEMPLATE;

  // Duplicate arrays for seamless infinite marquee flow without scrollbars
  const marqueePairs = [...activeClass.pairs, ...activeClass.pairs, ...activeClass.pairs];
  const marqueeExplorers = [...activeClass.explorers, ...activeClass.explorers, ...activeClass.explorers];

  return (
    <div className="w-full h-screen max-h-screen bg-slate-100/85 text-slate-800 font-sans p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden select-none relative bg-gradient-to-br from-slate-100 via-sky-50/40 to-slate-100 gap-3.5">
      
      {/* Background glow highlights */}
      <div className="absolute top-12 left-12 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. TOP HEADER BAR: FROSTED GLASS TOPBAR                                   */}
      {/* ========================================================================= */}
      <header className="flex items-center justify-between gap-3.5 px-4 py-2 bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl shrink-0 shadow-xs z-20">
        
        {/* Left: App Identity */}
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-2xl bg-white/90 hover:bg-white text-slate-700 text-xs font-black flex items-center gap-1.5 border border-slate-200/80 transition-all cursor-pointer shadow-2xs active:scale-95"
              title="Voltar ao Painel Principal"
            >
              <Home className="w-3.5 h-3.5 text-blue-600" />
              <span>Início</span>
            </button>
          )}

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-black tracking-wider text-slate-900 flex items-center gap-2 leading-none">
                <span>SALA DE MISSÕES</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-800 text-[9px] font-black uppercase flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> TV AO VIVO
                </span>
              </div>
              <span className="text-[10px] text-blue-600 font-black block mt-0.5">
                Painel da Turma • Projeção Escolar
              </span>
            </div>
          </div>
        </div>

        {/* Center: Classroom Tabs (Rotator) */}
        <nav className="flex items-center gap-1.5 bg-slate-200/60 backdrop-blur-md p-1 rounded-2xl border border-white/60">
          {CLASSROOM_ADVENTURES.map((cls, idx) => {
            const isActive = currentClassIndex === idx;
            return (
              <button
                key={cls.id}
                onClick={() => handleSelectClass(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive 
                    ? 'bg-blue-600 text-white font-black shadow-sm scale-102' 
                    : 'text-slate-700 hover:text-slate-900 hover:bg-white/70'
                }`}
              >
                {cls.id === 'escola' ? <Globe2 className="w-3.5 h-3.5" /> : <GraduationCap className="w-3.5 h-3.5" />}
                <span>{cls.name}</span>
                {isActive && isAutoRotationActive && (
                  <span className="text-[9px] font-mono font-bold bg-white/20 px-1.5 py-0.5 rounded text-white ml-0.5">
                    {classTimer}s
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Controls & Clock */}
        <div className="flex items-center gap-2">
          {/* Pause / Play */}
          <button
            onClick={() => setIsAutoRotationActive(!isAutoRotationActive)}
            className={`px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border shadow-2xs ${
              isAutoRotationActive 
                ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100' 
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
            title={isAutoRotationActive ? "Pausar Rotação Automática" : "Ativar Rotação Automática"}
          >
            {isAutoRotationActive ? (
              <>
                <Pause className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-black">Auto</span>
              </>
            ) : (
              <>
                <PlayCircle className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] font-black">Pausa</span>
              </>
            )}
          </button>

          {/* Clock */}
          <div className="flex items-baseline gap-1 font-mono text-slate-800 bg-white/90 backdrop-blur-md px-3 py-1 rounded-2xl border border-white/80 shadow-2xs">
            <Clock className="w-3 h-3 text-blue-600 mr-1 self-center" />
            <span className="font-black text-xs">{h}:{m}</span>
            <span className="text-blue-600 text-[10px] font-bold">:{s}</span>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-2xl bg-white/90 hover:bg-white text-slate-700 border border-slate-200/80 cursor-pointer transition-all active:scale-95 shadow-2xs"
            title="Tela Cheia"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO SECTION: CLASS OVERVIEW & SPECIAL MISSION WITH FALLING COINS       */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-12 gap-3.5 shrink-0">
        
        {/* Left Hero Card: Class Summary & Big 3 Visual Stats (Harmonious Colors) */}
        <div className="col-span-12 lg:col-span-5 bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-lg font-black shadow-xs shrink-0">
                {activeClass.id === 'escola' ? <Globe2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5 text-sky-200" />}
              </div>
              <div>
                <span className="text-[9px] uppercase font-black tracking-widest text-blue-600 block leading-tight">
                  Turma Ativa
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  {activeClass.name}
                </h2>
              </div>
            </div>

            <span className="text-[10px] text-emerald-900 font-bold bg-emerald-50/90 border border-emerald-200/90 px-2.5 py-1 rounded-full truncate max-w-[190px]">
              {activeClass.tagline}
            </span>
          </div>

          {/* 3 Clear Stats for Kids with Pure Matching Palette */}
          <div className="grid grid-cols-3 gap-2.5 mt-2">
            {/* 1. XP (Pure Sky/Blue Theme) */}
            <div className="p-2 rounded-2xl bg-sky-50/90 border border-sky-200/80 flex flex-col items-center justify-center text-center shadow-2xs">
              <div className="flex items-center gap-1 text-sky-950 font-black text-sm">
                <Star className="w-3.5 h-3.5 fill-sky-500 text-sky-600" />
                <span>{activeClass.totalXp.toLocaleString('pt-BR')}</span>
              </div>
              <span className="text-[9px] font-black text-sky-700 uppercase tracking-wider mt-0.5">
                XP (+{activeClass.xpToday})
              </span>
            </div>

            {/* 2. Missions (Pure Indigo Theme) */}
            <div className="p-2 rounded-2xl bg-indigo-50/90 border border-indigo-200/80 flex flex-col items-center justify-center text-center shadow-2xs">
              <div className="flex items-center gap-1 text-indigo-950 font-black text-sm">
                <Target className="w-3.5 h-3.5 text-indigo-600" />
                <span>{activeClass.completedMissions}</span>
              </div>
              <span className="text-[9px] font-black text-indigo-700 uppercase tracking-wider mt-0.5">
                Missões Feitas
              </span>
            </div>

            {/* 3. Coins (Pure Emerald Theme - Harmonious Emerald Background & Icon) */}
            <div className="p-2 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 flex flex-col items-center justify-center text-center shadow-2xs">
              <div className="flex items-center gap-1 text-emerald-950 font-black text-sm">
                <GlassCoin size="xs" />
                <span>{activeClass.coinsCount.toLocaleString('pt-BR')}</span>
              </div>
              <span className="text-[9px] font-black text-emerald-700 uppercase tracking-wider mt-0.5">
                Moedas
              </span>
            </div>
          </div>
        </div>

        {/* Right Hero Card: Special Mission with ANIMATED FALLING COINS & INCENTIVES */}
        <div className="col-span-12 lg:col-span-7 bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 sm:p-3.5 flex items-center justify-between gap-3 shadow-xs relative overflow-hidden">
          
          {/* Falling Coins Animation Effect in the Background & Mid-area */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute left-[38%] top-0 animate-coin-fall-1">
              <div className="w-4 h-4 rounded-full bg-emerald-400/70 border border-emerald-600 flex items-center justify-center shadow-xs">
                <Coins className="w-2.5 h-2.5 text-emerald-950" />
              </div>
            </div>
            <div className="absolute left-[50%] top-0 animate-coin-fall-2">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 border border-emerald-700 flex items-center justify-center shadow-xs">
                <Coins className="w-2 h-2 text-white" />
              </div>
            </div>
            <div className="absolute left-[64%] top-0 animate-coin-fall-3">
              <div className="w-4.5 h-4.5 rounded-full bg-emerald-400/80 border border-emerald-600 flex items-center justify-center shadow-xs">
                <Coins className="w-3 h-3 text-emerald-950" />
              </div>
            </div>
            <div className="absolute left-[78%] top-0 animate-coin-fall-4">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/70 border border-emerald-700 flex items-center justify-center shadow-xs">
                <Coins className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>

          {/* Left: Mission Info */}
          <div className="flex items-center gap-3 overflow-hidden z-10">
            <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-slate-200/80 shrink-0 shadow-2xs">
              <img 
                src={activeClass.specialMission.coverUrl} 
                alt={activeClass.specialMission.title}
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-purple-600 text-[8px] font-black text-white flex items-center gap-0.5 shadow-2xs">
                <Star className="w-2 h-2 fill-current" />
                <span>ÉPICO</span>
              </div>
            </div>

            <div className="overflow-hidden space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[9px] font-black uppercase tracking-wider border border-purple-200 flex items-center gap-1 shadow-2xs">
                  <Flame className="w-2.5 h-2.5 text-purple-600" /> {activeClass.specialMission.badge}
                </span>
                <span className="text-[9px] font-bold text-slate-500 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-blue-600" />
                  {activeClass.specialMission.timeLeft}
                </span>
              </div>
              
              <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight truncate">
                {activeClass.specialMission.title}
              </h3>
              
              <p className="text-[10px] text-slate-600 truncate font-bold">
                Trilha: <span className="text-blue-600 font-black">{activeClass.specialMission.theme}</span>
              </p>
              
              {/* Rewards */}
              <div className="flex items-center gap-2 pt-0.5">
                <GlassXpBadge amount={activeClass.specialMission.xpReward} size="xs" />
                <GlassCoinBadge amount={activeClass.specialMission.coinsReward} size="xs" prefix="+" />
                <span className="text-[8px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                  {activeClass.specialMission.status}
                </span>
              </div>
            </div>
          </div>

          {/* Center-Right: Encouraging Incentive Slogan & Coin Particle Callout */}
          <div className="hidden md:flex flex-col items-center justify-center text-center px-3 py-1.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 shadow-2xs z-10 shrink-0">
            <div className="flex items-center gap-1 text-[9px] font-black text-emerald-900 uppercase">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Recompensa Coletiva</span>
            </div>
            <span className="text-[10px] font-black text-emerald-700 leading-tight mt-0.5">
              Ganhe Moedas em Dobro!
            </span>
          </div>

          {/* Right: Challenge Crown Tag */}
          <div className="hidden sm:flex flex-col items-center justify-center p-2.5 rounded-2xl bg-purple-50/90 border border-purple-200/80 text-center shrink-0 min-w-[95px] shadow-2xs z-10">
            <Crown className="w-5 h-5 text-purple-600 animate-bounce" />
            <span className="text-[10px] font-black text-purple-900 mt-0.5">Desafio</span>
            <span className="text-[8px] font-bold text-purple-700">Jogue em Equipe!</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BENTO GRID: 3 BALANCED FROSTED GLASS COLUMNS (TOP-ALIGNED WITH UNIFORM GAP) */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-12 gap-3.5 flex-1 min-h-0 overflow-hidden">
        
        {/* ======================================================================= */}
        {/* COLUMN 1: MUNDOS DO SABER & PRÓXIMAS MISSÕES (TOP-ALIGNED)              */}
        {/* ======================================================================= */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-start gap-3.5 min-h-0 overflow-hidden">
          
          {/* Worlds (Mundos & Trilhas) */}
          <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 flex flex-col justify-start gap-2 shadow-xs shrink-0">
            <div className="flex items-center justify-between mb-0.5 px-0.5">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-blue-600" /> Mundos do Saber
              </span>
              <span className="text-[9px] font-black text-blue-700 uppercase bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/80 shadow-2xs">
                4 Trilhas Abertas
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {displayWorlds.map((w) => (
                <div 
                  key={w.id} 
                  className={`p-2 rounded-2xl border flex flex-col justify-between transition-all shadow-2xs ${w.colorClass}`}
                >
                  <div className="flex items-center justify-between">
                    <w.icon className="w-4 h-4" />
                    <span className={`text-[8px] font-black px-1.5 py-0.2 rounded-md ${w.badgeClass}`}>
                      {w.availableMissions} {w.availableMissions === 1 ? 'missão' : 'missões'}
                    </span>
                  </div>
                  <div className="mt-1">
                    <h4 className="text-[11px] font-black leading-tight truncate">{w.name}</h4>
                    <div className="w-full bg-white/80 h-1.5 rounded-full overflow-hidden mt-1 border border-slate-200/60">
                      <div 
                        className={`h-full rounded-full ${w.barColor}`} 
                        style={{ width: `${w.progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Próximas Missões (Aligned to Top - No Vertical Gap Spread) */}
          <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 flex flex-col justify-start gap-2 flex-1 min-h-0 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-0.5 px-0.5 shrink-0">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5 text-blue-600" /> Próximas Missões
              </span>
              <span className="text-[8px] font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                Missões Seguintes
              </span>
            </div>

            {/* List stacked directly from the top */}
            <div className="flex flex-col justify-start gap-2 overflow-hidden flex-1">
              {activeClass.upcomingMissions.slice(0, 2).map((m) => (
                <div key={m.id} className="p-2 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs flex items-center gap-2.5 shrink-0">
                  <div className="relative w-13 h-13 rounded-xl overflow-hidden border border-slate-200 shrink-0 shadow-2xs">
                    <img src={m.coverUrl} alt={m.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="overflow-hidden flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[8px] font-black uppercase px-1.5 py-0.2 rounded border truncate ${m.worldBadgeClass}`}>
                        {m.world}
                      </span>
                      <span className="text-[8px] font-black text-blue-600 truncate">
                        {m.availability}
                      </span>
                    </div>
                    <h5 className="text-[11px] font-black text-slate-900 truncate leading-tight mt-0.5">
                      {m.title}
                    </h5>
                    <div className="flex items-center gap-1.5 mt-1">
                      <GlassXpBadge amount={m.xpReward} size="xs" />
                      <GlassCoinBadge amount={m.coinsReward} size="xs" prefix="+" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* COLUMN 2: GUILDAS E EQUIPES EM AÇÃO (TOP-ALIGNED)                        */}
        {/* ======================================================================= */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-start gap-3.5 min-h-0 overflow-hidden">
          
          {/* Groups & Guilds (Top-Aligned List + Teamwork Incentive Box) */}
          <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 flex flex-col justify-start gap-2.5 flex-1 min-h-0 shadow-xs">
            <div className="flex items-center justify-between mb-0.5 px-0.5 shrink-0">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Users2 className="w-3.5 h-3.5 text-blue-600" /> Guildas & Equipes em Ação
              </span>
              <span className="text-[9px] font-black text-indigo-800 uppercase bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/80 shadow-2xs">
                Cooperação
              </span>
            </div>

            {/* Guild Items stacked at the top */}
            <div className="flex flex-col justify-start gap-2 overflow-hidden">
              {activeClass.groups.map((grp, i) => (
                <div key={i} className="p-2 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs flex flex-col justify-between shrink-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-[11px] font-black text-slate-900 truncate">{grp.name}</h5>
                    <div className="flex items-center -space-x-1.5">
                      {grp.avatars.map((av, idx) => (
                        <img 
                          key={idx} 
                          src={av} 
                          alt="Membro" 
                          className="w-5 h-5 rounded-full object-cover border border-white shadow-2xs ring-1 ring-blue-500" 
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-[9px] text-slate-600 font-bold truncate mt-0.5">
                    {grp.mission}
                  </p>

                  <div className="flex items-center justify-between mt-1">
                    <div className="w-3/5 bg-slate-200/80 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-blue-600" 
                        style={{ width: `${grp.progressPct}%` }}
                      />
                    </div>
                    <GlassXpBadge amount={grp.xpReward} size="xs" />
                  </div>
                </div>
              ))}
            </div>

            {/* Teamwork Incentive Footer Box */}
            <div className="mt-auto p-2.5 rounded-2xl bg-emerald-50/90 border border-emerald-200/90 flex items-center gap-2.5 shadow-2xs shrink-0">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[9px] font-black uppercase text-emerald-900 flex items-center gap-1">
                  <Sparkle className="w-2.5 h-2.5 text-emerald-600" /> Força da Turma
                </div>
                <div className="text-[10px] font-black text-slate-800 leading-tight">
                  Aprenda com seus amigos! Compartilhar saberes torna cada missão uma festa.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* COLUMN 3: CONQUISTAS, DESTAQUES & MOMENTOS DA TURMA (FOTOS)              */}
        {/* ======================================================================= */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-start gap-3.5 min-h-0 overflow-hidden">
          
          {/* Recent Celebrations (Conquistas Recentes) */}
          <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 flex flex-col justify-start gap-2 shadow-xs shrink-0">
            <div className="flex items-center justify-between mb-0.5 px-0.5">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-blue-600" /> Conquistas Recentes
              </span>
              <span className="text-[9px] font-black text-blue-800 uppercase bg-sky-100/90 px-2.5 py-0.5 rounded-full border border-sky-200/80 shadow-2xs">
                Parabéns!
              </span>
            </div>

            {currentCelebration && (
              <div className="p-2 rounded-2xl bg-white/90 border border-slate-200/80 flex items-center gap-2.5 animate-fade-in shadow-2xs">
                <img 
                  src={currentCelebration.avatar} 
                  alt={currentCelebration.author}
                  className="w-10 h-10 rounded-2xl object-cover ring-2 ring-blue-500 shadow-2xs shrink-0" 
                />
                <div className="overflow-hidden">
                  <span className="text-[8px] font-black text-blue-600 uppercase tracking-wider block">
                    {currentCelebration.title}
                  </span>
                  <h4 className="text-xs font-black text-slate-900 leading-tight truncate">
                    {currentCelebration.author}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-1">
                    <GlassXpBadge amount={currentCelebration.xp} size="xs" />
                    <GlassCoinBadge amount={currentCelebration.coins} size="xs" prefix="+" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Highlights (Destaques da Sala) */}
          <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 flex flex-col justify-start gap-2 shadow-xs shrink-0">
            <div className="flex items-center justify-between mb-0.5 px-0.5">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-sky-500 text-sky-600" /> Destaques da Turma
              </span>
              <span className="text-[9px] font-black text-purple-800 uppercase bg-purple-100/90 px-2.5 py-0.5 rounded-full border border-purple-200/80 shadow-2xs">
                Todos Brilham
              </span>
            </div>

            {currentHighlight && (
              <div className="p-2 rounded-2xl bg-white/90 border border-slate-200/80 flex items-center gap-2.5 animate-fade-in shadow-2xs">
                <img 
                  src={currentHighlight.avatar} 
                  alt={currentHighlight.studentName}
                  className="w-9 h-9 rounded-2xl object-cover ring-2 ring-blue-500 shadow-2xs shrink-0" 
                />
                <div className="overflow-hidden">
                  <div className="flex items-center gap-1">
                    <currentHighlight.icon className="w-3 h-3 text-purple-600" />
                    <span className="text-[8px] font-black uppercase text-purple-700">
                      {currentHighlight.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-slate-900 truncate leading-tight mt-0.5">
                    {currentHighlight.studentName}
                  </h4>
                  <p className="text-[8px] text-slate-600 font-bold line-clamp-1">
                    {currentHighlight.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* MOMENTOS DA TURMA (Classroom Photo Gallery - Top Aligned) */}
          <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 flex flex-col justify-start gap-2 flex-1 min-h-0 shadow-xs">
            <div className="flex items-center justify-between px-0.5 mb-0.5 shrink-0">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-blue-600" /> Momentos da Turma
              </span>
              <span className="text-[8px] font-black text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200/80 shadow-2xs">
                Nossa Galeria
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs flex-1 min-h-0 group">
              <img 
                src={currentMemory.photoUrl} 
                alt={currentMemory.title} 
                className="w-full h-full object-cover animate-fade-in" 
              />
              {/* Overlay with Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-2.5 text-white">
                <span className="text-[8px] font-black text-emerald-300 uppercase tracking-wider block">
                  {currentMemory.tag}
                </span>
                <div className="text-[11px] font-black leading-tight truncate">
                  {currentMemory.title}
                </div>
                <p className="text-[8px] text-slate-200 line-clamp-1 mt-0.5 font-medium">
                  "{currentMemory.caption}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FOOTER: COMPACT HEIGHT & TIGHT SPACING FOR DUPLAS & EXPLORADORES       */}
      {/* ========================================================================= */}
      <footer className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 shrink-0">
        
        {/* Marquee 1: Duplas em Ação (Compact Uniform Height h-[116px], Width w-[145px]) */}
        <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-2.5 shadow-xs flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="text-[11px] font-black text-slate-900 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-blue-600" /> Duplas em Ação
            </span>
            <span className="text-[8px] text-blue-800 font-black bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-200/80 shadow-2xs">
              Colaborando Juntos
            </span>
          </div>

          <div className="relative overflow-hidden w-full no-scrollbar">
            <div className="animate-marquee-smooth flex items-center gap-2.5">
              {marqueePairs.map((pair, idx) => (
                <div 
                  key={idx} 
                  className="w-[145px] h-[116px] flex flex-col items-center justify-between p-2 rounded-2xl bg-white/95 hover:bg-white border border-slate-200/80 transition-all shrink-0 shadow-2xs text-center"
                >
                  {/* Compact Avatars */}
                  <div className="relative flex items-center -space-x-2 shrink-0">
                    <img 
                      src={pair.avatar1} 
                      alt={pair.name1} 
                      className="w-9 h-9 rounded-full object-cover border-2 border-white ring-2 ring-blue-500 shadow-2xs" 
                    />
                    <img 
                      src={pair.avatar2} 
                      alt={pair.name2} 
                      className="w-9 h-9 rounded-full object-cover border-2 border-white ring-2 ring-blue-500 shadow-2xs" 
                    />
                    <span className="absolute -bottom-0.5 right-0 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
                  </div>
                  
                  <div className="w-full">
                    <span className="text-[11px] font-black text-slate-900 truncate block leading-tight">
                      {pair.name1} & {pair.name2}
                    </span>
                    <span className="text-[8px] font-bold text-slate-500 truncate block">
                      {pair.mission}
                    </span>
                  </div>
                  
                  <div className="w-full flex justify-center">
                    <GlassXpBadge amount={pair.xpReward} size="xs" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee 2: Exploradores da Turma (Compact Uniform Height h-[116px], Width w-[120px]) */}
        <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-2.5 shadow-xs flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="text-[11px] font-black text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" /> Exploradores da Turma
            </span>
            <span className="text-[8px] text-purple-800 font-black bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200/80 shadow-2xs">
              Nível & Conquistas
            </span>
          </div>

          <div className="relative overflow-hidden w-full no-scrollbar">
            <div className="animate-marquee-slow flex items-center gap-2.5">
              {marqueeExplorers.map((exp, idx) => (
                <div 
                  key={idx} 
                  className="w-[120px] h-[116px] flex flex-col items-center justify-between p-2 rounded-2xl bg-white/95 hover:bg-white border border-slate-200/80 transition-all shrink-0 shadow-2xs text-center"
                >
                  <div className="relative shrink-0">
                    <img 
                      src={exp.avatar} 
                      alt={exp.name} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-white ring-2 ring-blue-500 shadow-2xs" 
                    />
                    <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-slate-900 text-white text-[8px] font-black shadow-2xs border border-white">
                      Nv {exp.level}
                    </div>
                  </div>
                  
                  <div className="w-full">
                    <span className="text-[11px] font-black text-slate-900 truncate block leading-tight">
                      {exp.name}
                    </span>
                    <span className="text-[8px] font-black text-blue-700 bg-sky-50 border border-sky-200 px-1.5 py-0.2 rounded-md inline-block truncate max-w-full">
                      {exp.tag}
                    </span>
                  </div>
                  
                  <span className="text-[9px] font-bold text-slate-500">
                    {exp.xp.toLocaleString('pt-BR')} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 5. BOTTOM INSPIRATION BAR                                                 */}
      {/* ========================================================================= */}
      <div className="px-4 py-1.5 bg-white/85 backdrop-blur-md border border-white/90 rounded-2xl flex items-center justify-between text-[10px] text-slate-600 font-medium shrink-0 shadow-2xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <Smile className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="text-blue-700 font-black shrink-0">Dica do Explorador:</span>
          <span className="text-slate-800 truncate italic font-bold">
            "{ADVENTURE_QUOTES[quoteIdx % ADVENTURE_QUOTES.length].text}"
          </span>
        </div>

        <span className="hidden sm:inline text-slate-500 font-bold shrink-0 flex items-center gap-1">
          <Sparkle className="w-2.5 h-2.5 text-emerald-600" />
          {ADVENTURE_QUOTES[quoteIdx % ADVENTURE_QUOTES.length].author}
        </span>
      </div>

    </div>
  );
};
