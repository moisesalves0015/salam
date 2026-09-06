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
  HeartHandshake, 
  Home, 
  Pause, 
  PlayCircle, 
  Clock, 
  Globe2, 
  GraduationCap, 
  Users2, 
  Smile, 
  Crown, 
  Sparkle, 
  Camera,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Student, CardItem, AchievementItem, ClassMetrics } from '../types';

interface PainelSalaMissoesProps {
  students?: Student[];
  cards?: CardItem[];
  achievements?: AchievementItem[];
  metrics?: ClassMetrics;
  onClose?: () => void;
}

// Ultra-Polished Shiny Blue Game Coin (Vector with 3D Bevel & Radiant Cyan/Blue Gradients + Star)
export const ShinyCoin: React.FC<{ size?: 'xs' | 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'sm', 
  className = '' 
}) => {
  const sizeMap = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4.5 h-4.5',
    md: 'w-6 h-6',
    lg: 'w-7.5 h-7.5'
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${sizeMap[size]} ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-xs">
        {/* Outer Radiant Blue Rim */}
        <circle cx="12" cy="12" r="11" fill="url(#blueCoinOuter)" />
        {/* Main Radiant Blue Body */}
        <circle cx="12" cy="12" r="9.5" fill="url(#blueCoinBody)" />
        {/* Specular White Engraved Ring */}
        <circle cx="12" cy="12" r="7.5" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.85" fill="none" />
        {/* Center Star Emblem */}
        <path d="M12 6.5L13.5 10.2H17.5L14.2 12.6L15.4 16.5L12 14.1L8.6 16.5L9.8 12.6L6.5 10.2H10.5L12 6.5Z" fill="#FFFFFF" fillOpacity="0.95" />
        <defs>
          <linearGradient id="blueCoinOuter" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#123cc4" />
            <stop offset="0.5" stopColor="#0e2fb2" />
            <stop offset="1" stopColor="#05148d" />
          </linearGradient>
          <linearGradient id="blueCoinBody" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#123cc4" />
            <stop offset="0.4" stopColor="#09219f" />
            <stop offset="1" stopColor="#00067a" />
          </linearGradient>
        </defs>
      </svg>
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
    <span className={`inline-flex items-center font-black rounded-full bg-[#123cc4]/10 backdrop-blur-md border border-[#123cc4]/25 text-[#00067a] shadow-2xs ${paddingMap[size]} ${className}`}>
      <ShinyCoin size={size === 'xs' ? 'xs' : 'sm'} />
      <span>{prefix}{typeof amount === 'number' ? amount.toLocaleString('pt-BR') : amount}</span>
      <span className="text-[9px] text-[#0e2fb2] font-bold uppercase tracking-wider">Moedas</span>
    </span>
  );
};

// Standard Frosted Glass XP Badge - Custom Blue Palette
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
    <span className={`inline-flex items-center font-black rounded-full bg-[#123cc4]/10 backdrop-blur-md border border-[#123cc4]/25 text-[#00067a] shadow-2xs ${paddingMap[size]} ${className}`}>
      <Star className="w-3.5 h-3.5 fill-[#123cc4] text-[#0e2fb2] shrink-0" />
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
    photoUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80',
    tag: 'Laboratório Vivo'
  },
  {
    title: 'Desafio da Leitura Criativa',
    caption: 'Criando histórias e contos incríveis com toda a turma unida!',
    photoUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80',
    tag: 'Clube do Livro'
  },
  {
    title: 'Oficina de Robótica & Lógica',
    caption: 'Montando engrenagens e resolvendo enigmas em equipe!',
    photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
    tag: 'Makers da Sala'
  },
  {
    title: 'Gincana da Matemática Divertida',
    caption: 'Quando todo mundo ajuda, nenhum desafio é difícil demais!',
    photoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    tag: 'Matemáticos Mirins'
  }
];

interface ClassroomAdventureData {
  id: string;
  name: string;
  grade: string;
  totalXp: number;
  xpToday: number;
  completedMissions: number;
  coinsCount: number;
  
  teacher: {
    name: string;
    role: string;
    avatar: string;
  };

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
    accentColor: string;
    tag: string;
    availableMissions: number;
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
    statusTag: string;
    xpReward: number;
  }[];

  explorers: {
    name: string;
    avatar: string;
    level: number;
    xp: number;
    tag: string;
  }[];
}

// 4 Standard Worlds — All use same custom blue palette
const STANDARD_WORLDS_TEMPLATE = [
  {
    id: 'w1',
    name: 'Reino dos Números',
    icon: Calculator,
    accentColor: 'text-[#09219f] bg-[#123cc4]/10 border-[#123cc4]/20',
    tag: 'Lógica & Cálculos',
    availableMissions: 5
  },
  {
    id: 'w2',
    name: 'Jornada da Leitura',
    icon: BookOpen,
    accentColor: 'text-[#09219f] bg-[#123cc4]/10 border-[#123cc4]/20',
    tag: 'Contos & Poesias',
    availableMissions: 4
  },
  {
    id: 'w3',
    name: 'Ilha das Ciências',
    icon: Atom,
    accentColor: 'text-[#09219f] bg-[#123cc4]/10 border-[#123cc4]/20',
    tag: 'Natureza & Espaço',
    availableMissions: 3
  },
  {
    id: 'w4',
    name: 'Mundo dos Desafios',
    icon: BrainCircuit,
    accentColor: 'text-[#09219f] bg-[#123cc4]/10 border-[#123cc4]/20',
    tag: 'Enigmas & Robótica',
    availableMissions: 6
  }
];

const CLASSROOM_ADVENTURES: ClassroomAdventureData[] = [
  {
    id: '5a',
    name: '5º ANO A',
    grade: '5º Ano Fundamental',
    totalXp: 8420,
    xpToday: 450,
    completedMissions: 134,
    coinsCount: 3280,
    
    teacher: {
      name: 'Profª. Camila Ribeiro',
      role: 'Educadora Responsável',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80'
    },

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
        worldBadgeClass: 'text-[#00067a] bg-[#123cc4]/10 border-[#123cc4]/20',
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
        worldBadgeClass: 'text-[#00067a] bg-[#123cc4]/10 border-[#123cc4]/20',
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
        worldBadgeClass: 'text-[#00067a] bg-[#123cc4]/10 border-[#123cc4]/20',
        xpReward: 250,
        coinsReward: 120,
        coverUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=80',
        availability: 'Amanhã 09:00'
      }
    ],

    adventureWorlds: STANDARD_WORLDS_TEMPLATE.map(w => ({ ...w, availableMissions: 5 })),

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
        statusTag: 'Missão em Grupo Ativa',
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
        statusTag: 'Equipe Avançando',
        xpReward: 320
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
    totalXp: 7890,
    xpToday: 380,
    completedMissions: 118,
    coinsCount: 2940,
    
    teacher: {
      name: 'Prof. Rafael Albuquerque',
      role: 'Educador Responsável',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&auto=format&fit=crop&q=80'
    },

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
        worldBadgeClass: 'text-[#00067a] bg-[#123cc4]/10 border-[#123cc4]/20',
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
        worldBadgeClass: 'text-[#00067a] bg-[#123cc4]/10 border-[#123cc4]/20',
        xpReward: 210,
        coinsReward: 105,
        coverUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=80',
        availability: 'Amanhã 10:00'
      }
    ],

    adventureWorlds: STANDARD_WORLDS_TEMPLATE.map(w => ({ ...w, availableMissions: 4 })),

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
        statusTag: 'Construção Coletiva',
        xpReward: 310
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
    totalXp: 7120,
    xpToday: 320,
    completedMissions: 104,
    coinsCount: 2650,
    
    teacher: {
      name: 'Profª. Juliana Mendes',
      role: 'Educadora Responsável',
      avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=160&auto=format&fit=crop&q=80'
    },

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
        worldBadgeClass: 'text-[#00067a] bg-[#123cc4]/10 border-[#123cc4]/20',
        xpReward: 180,
        coinsReward: 90,
        coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
        availability: 'Hoje às 11:30'
      }
    ],

    adventureWorlds: STANDARD_WORLDS_TEMPLATE.map(w => ({ ...w, availableMissions: 6 })),

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
        statusTag: 'Pesquisa em Andamento',
        xpReward: 280
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
    totalXp: 6850,
    xpToday: 290,
    completedMissions: 98,
    coinsCount: 2410,
    
    teacher: {
      name: 'Prof. Marcos Vinícius',
      role: 'Educador Responsável',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80'
    },

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
        worldBadgeClass: 'text-[#00067a] bg-[#123cc4]/10 border-[#123cc4]/20',
        xpReward: 190,
        coinsReward: 95,
        coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
        availability: 'Hoje às 15:30'
      }
    ],

    adventureWorlds: STANDARD_WORLDS_TEMPLATE.map(w => ({ ...w, availableMissions: 4 })),

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
        statusTag: 'Oficina de Rimas',
        xpReward: 260
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
    totalXp: 30280,
    xpToday: 1440,
    completedMissions: 454,
    coinsCount: 11280,
    
    teacher: {
      name: 'Corpo Docente',
      role: 'Equipe Pedagógica',
      avatar: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=160&auto=format&fit=crop&q=80'
    },

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
        worldBadgeClass: 'text-[#00067a] bg-[#123cc4]/10 border-[#123cc4]/20',
        xpReward: 400,
        coinsReward: 200,
        coverUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=500&auto=format&fit=crop&q=80',
        availability: 'Sexta-feira'
      }
    ],

    adventureWorlds: STANDARD_WORLDS_TEMPLATE.map(w => ({ ...w, availableMissions: 18 })),

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
        statusTag: 'Interclasses da Escola',
        xpReward: 600
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

  // Micro-carousels State for Rotating Photos (3.5s smooth transition)
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

  // Classroom Memories Auto-Rotator (every 3.5 seconds for dynamic flow)
  useEffect(() => {
    if (!isAutoRotationActive) return;
    const memTimer = setInterval(() => {
      setMemoryPhotoIdx((prev) => (prev + 1) % CLASSROOM_MEMORIES.length);
    }, 3500);
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

  const h = currentTime.getHours().toString().padStart(2, '0');
  const m = currentTime.getMinutes().toString().padStart(2, '0');
  const s = currentTime.getSeconds().toString().padStart(2, '0');

  const handleSelectClass = (idx: number) => {
    setCurrentClassIndex(idx);
    setClassTimer(16);
  };

  const currentMemory = CLASSROOM_MEMORIES[memoryPhotoIdx % CLASSROOM_MEMORIES.length];

  // Guaranteed 4 worlds with empty-state handling
  const displayWorlds = activeClass.adventureWorlds && activeClass.adventureWorlds.length === 4
    ? activeClass.adventureWorlds
    : STANDARD_WORLDS_TEMPLATE;

  // Duplicate arrays for seamless infinite marquee flow without scrollbars
  const marqueePairs = [...activeClass.pairs, ...activeClass.pairs, ...activeClass.pairs];
  const marqueeExplorers = [...activeClass.explorers, ...activeClass.explorers, ...activeClass.explorers];

  return (
    <div className="w-full min-h-screen lg:h-screen lg:max-h-screen text-slate-800 font-sans p-2.5 sm:p-3.5 lg:p-4 flex flex-col justify-between overflow-y-auto lg:overflow-hidden select-none relative gap-3.5 no-scrollbar">
      
      {/* ========================================================================= */}
      {/* 0. BACKGROUND: RADIAL GRADIENT                                           */}
      {/* ========================================================================= */}
      <div className="fixed lg:absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none bg-[radial-gradient(circle_at_center,rgba(18,60,196,1)_0%,rgba(0,6,122,1)_100%)]" />

      {/* ========================================================================= */}
      {/* 1. TOP HEADER BAR: FROSTED GLASS TOPBAR (RESPONSIVE WRAP/SCROLL)          */}
      {/* ========================================================================= */}
      <header className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-2.5 px-3 sm:px-4 py-2 bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl shrink-0 shadow-md z-20">
        
        {/* Left: App Identity */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-2xl bg-white/90 hover:bg-white text-slate-700 text-xs font-black flex items-center gap-1.5 border border-slate-200/80 transition-all cursor-pointer shadow-2xs active:scale-95 shrink-0"
              title="Voltar ao Painel Principal"
            >
              <Home className="w-3.5 h-3.5 text-[#123cc4]" />
              <span>Início</span>
            </button>
          )}

          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-[#123cc4] to-[#05148d] flex items-center justify-center text-white shadow-xs shrink-0">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black tracking-wider text-slate-900 flex items-center gap-1.5 sm:gap-2 leading-none">
                <span>SALA DE MISSÕES</span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-[#123cc4]/15 border border-[#123cc4]/30 text-[#00067a] text-[8px] sm:text-[9px] font-black uppercase flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#123cc4] animate-pulse" /> TV AO VIVO
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-[#0e2fb2] font-black block mt-0.5">
                Painel da Turma • Projeção Escolar
              </span>
            </div>
          </div>
        </div>

        {/* Center: Classroom Tabs (Scrollable on Mobile) */}
        <nav className="flex items-center gap-1.5 bg-slate-200/60 backdrop-blur-md p-1 rounded-2xl border border-white/60 overflow-x-auto max-w-full no-scrollbar order-3 lg:order-2 w-full lg:w-auto justify-start sm:justify-center">
          {CLASSROOM_ADVENTURES.map((cls, idx) => {
            const isActive = currentClassIndex === idx;
            return (
              <button
                key={cls.id}
                onClick={() => handleSelectClass(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive 
                    ? 'bg-[#123cc4] text-white font-black shadow-sm scale-102' 
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
        <div className="flex items-center gap-1.5 sm:gap-2 order-2 lg:order-3 shrink-0">
          {/* Pause / Play */}
          <button
            onClick={() => setIsAutoRotationActive(!isAutoRotationActive)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer border shadow-2xs ${
              isAutoRotationActive 
                ? 'bg-[#123cc4]/10 text-[#00067a] border-[#123cc4]/25 hover:bg-[#123cc4]/15' 
                : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-white'
            }`}
            title={isAutoRotationActive ? "Pausar Rotação Automática" : "Ativar Rotação Automática"}
          >
            {isAutoRotationActive ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#123cc4]" />
                <span className="text-[10px] font-black hidden sm:inline">Auto</span>
              </>
            ) : (
              <>
                <PlayCircle className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[10px] font-black hidden sm:inline">Pausa</span>
              </>
            )}
          </button>

          {/* Clock */}
          <div className="flex items-baseline gap-1 font-mono text-slate-800 bg-white/90 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-2xl border border-white/80 shadow-2xs">
            <Clock className="w-3 h-3 text-[#123cc4] mr-0.5 sm:mr-1 self-center" />
            <span className="font-black text-xs">{h}:{m}</span>
            <span className="text-[#123cc4] text-[10px] font-bold">:{s}</span>
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
      {/* 2. HERO SECTION: CLASS OVERVIEW & SPECIAL MISSION (RESPONSIVE GRIDS)       */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-12 gap-3.5 shrink-0">
        
        {/* Left Hero Card: Class Summary with TEACHER RECOGNITION */}
        <div className="col-span-12 lg:col-span-5 bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 sm:p-3.5 flex flex-col justify-between shadow-md gap-3">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#123cc4] to-[#05148d] flex items-center justify-center text-white text-lg font-black shadow-xs shrink-0">
                {activeClass.id === 'escola' ? <Globe2 className="w-5 h-5" /> : <GraduationCap className="w-5 h-5 text-white" />}
              </div>
              <div>
                <span className="text-[9px] uppercase font-black tracking-widest text-[#123cc4] block leading-tight">
                  Turma Ativa
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  {activeClass.name}
                </h2>
              </div>
            </div>

            {/* Teacher Recognition Box */}
            <div className="flex items-center gap-2 bg-white/95 border border-slate-200/80 px-2.5 py-1 rounded-2xl shadow-2xs">
              <img 
                src={activeClass.teacher.avatar} 
                alt={activeClass.teacher.name}
                className="w-8 h-8 rounded-xl object-cover border border-white shadow-2xs ring-1 ring-[#123cc4] shrink-0" 
              />
              <div className="overflow-hidden">
                <span className="text-[8px] font-black uppercase text-[#0e2fb2] tracking-wider block leading-tight">
                  {activeClass.teacher.role}
                </span>
                <span className="text-xs font-black text-slate-900 truncate block leading-tight max-w-[150px]">
                  {activeClass.teacher.name}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Clear Stats with Coordinated Palette */}
          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {/* 1. XP */}
            <div className="p-2 rounded-2xl bg-[#123cc4]/8 border border-[#123cc4]/20 flex flex-col items-center justify-center text-center shadow-2xs">
              <div className="flex items-center gap-1 text-[#00067a] font-black text-xs sm:text-sm">
                <Star className="w-3.5 h-3.5 fill-[#123cc4] text-[#0e2fb2]" />
                <span>{activeClass.totalXp.toLocaleString('pt-BR')}</span>
              </div>
              <span className="text-[8px] sm:text-[9px] font-black text-[#0e2fb2] uppercase tracking-wider mt-0.5 truncate max-w-full">
                XP (+{activeClass.xpToday})
              </span>
            </div>

            {/* 2. Missions */}
            <div className="p-2 rounded-2xl bg-[#123cc4]/8 border border-[#123cc4]/20 flex flex-col items-center justify-center text-center shadow-2xs">
              <div className="flex items-center gap-1 text-[#00067a] font-black text-xs sm:text-sm">
                <Target className="w-3.5 h-3.5 text-[#123cc4]" />
                <span>{activeClass.completedMissions}</span>
              </div>
              <span className="text-[8px] sm:text-[9px] font-black text-[#0e2fb2] uppercase tracking-wider mt-0.5 truncate max-w-full">
                Missões Feitas
              </span>
            </div>

            {/* 3. Coins */}
            <div className="p-2 rounded-2xl bg-[#123cc4]/8 border border-[#123cc4]/20 flex flex-col items-center justify-center text-center shadow-2xs">
              <div className="flex items-center gap-1 text-[#00067a] font-black text-xs sm:text-sm">
                <ShinyCoin size="xs" />
                <span>{activeClass.coinsCount.toLocaleString('pt-BR')}</span>
              </div>
              <span className="text-[8px] sm:text-[9px] font-black text-[#0e2fb2] uppercase tracking-wider mt-0.5 truncate max-w-full">
                Moedas
              </span>
            </div>
          </div>
        </div>

        {/* Right Hero Card: Special Mission with BORDERLESS BLUE FALLING COINS & PROMINENT "RECOMPENSA COLETIVA" */}
        <div className="col-span-12 lg:col-span-7 bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 sm:p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md relative overflow-hidden">
          
          {/* Borderless Radiant Shiny Blue Coins Drifting Down */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute left-[36%] top-0 animate-coin-fall-1">
              <ShinyCoin size="md" className="drop-shadow-md opacity-90" />
            </div>
            <div className="absolute left-[48%] top-0 animate-coin-fall-2">
              <ShinyCoin size="sm" className="drop-shadow-sm opacity-85" />
            </div>
            <div className="absolute left-[62%] top-0 animate-coin-fall-3">
              <ShinyCoin size="lg" className="drop-shadow-lg opacity-95" />
            </div>
            <div className="absolute left-[76%] top-0 animate-coin-fall-4">
              <ShinyCoin size="sm" className="drop-shadow-sm opacity-80" />
            </div>
          </div>

          {/* Left: Mission Info */}
          <div className="flex items-center gap-4 overflow-hidden z-10 w-full sm:w-auto pl-36 sm:pl-48 md:pl-56">
            
            {/* Absolute Full-Height Left Edge Image */}
            <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-40 md:w-48 z-0 border-r border-slate-200/50">
              <img 
                src={activeClass.specialMission.coverUrl} 
                alt={activeClass.specialMission.title}
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-[#05148d] text-[8px] font-black text-white flex items-center gap-0.5 shadow-2xs border border-[#123cc4]/40 z-20">
                <Star className="w-2 h-2 fill-white/80 text-white/80" />
                <span>ÉPICO</span>
              </div>
            </div>

            <div className="overflow-hidden space-y-0.5 flex-1 relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#123cc4]/10 text-[#00067a] text-[9px] font-black uppercase tracking-wider border border-[#123cc4]/20 flex items-center gap-1 shadow-2xs">
                  <Flame className="w-2.5 h-2.5 text-[#123cc4]" /> {activeClass.specialMission.badge}
                </span>
                <span className="text-[9px] font-bold text-slate-500 flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5 text-[#123cc4]" />
                  {activeClass.specialMission.timeLeft}
                </span>
              </div>
              
              <h3 className="text-xs sm:text-sm font-black text-slate-900 leading-tight truncate">
                {activeClass.specialMission.title}
              </h3>
              
              <p className="text-[10px] text-slate-600 truncate font-bold">
                Trilha: <span className="text-[#123cc4] font-black">{activeClass.specialMission.theme}</span>
              </p>
              
              {/* Rewards */}
              <div className="flex items-center gap-2 pt-0.5">
                <GlassXpBadge amount={activeClass.specialMission.xpReward} size="xs" />
                <GlassCoinBadge amount={activeClass.specialMission.coinsReward} size="xs" prefix="+" />
                <span className="text-[8px] font-black text-[#00067a] bg-[#123cc4]/10 px-2 py-0.5 rounded-lg border border-[#123cc4]/20">
                  {activeClass.specialMission.status}
                </span>
              </div>
            </div>
          </div>

          {/* Center: BIG BOLD EYE-CATCHING "RECOMPENSA COLETIVA" */}
          <div className="flex sm:flex flex-col items-center justify-center text-center z-10 shrink-0 px-2 sm:px-4 self-center sm:self-auto">
            <span className="text-xs sm:text-sm md:text-base font-black tracking-widest text-[#0e2fb2] uppercase drop-shadow-xs">
              RECOMPENSA COLETIVA
            </span>
          </div>

          {/* Right: Challenge Crown Tag */}
          <div className="hidden sm:flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#123cc4]/8 border border-[#123cc4]/20 text-center shrink-0 min-w-[95px] shadow-2xs z-10">
            <Crown className="w-5 h-5 text-[#123cc4] animate-bounce" />
            <span className="text-[10px] font-black text-[#00067a] mt-0.5">Desafio</span>
            <span className="text-[8px] font-bold text-[#0e2fb2]">Jogue em Equipe!</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BENTO GRID: 3 RESPONSIVE FROSTED GLASS COLUMNS                           */}
      {/* COL 1: MUNDOS + PRÓXIMAS MISSÕES                                          */}
      {/* COL 2 (CENTER): MOMENTOS DA TURMA (PROMINENT & FULL-HEIGHT)               */}
      {/* COL 3 (RIGHT): GUILDAS & EQUIPES EM AÇÃO                                  */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-12 gap-3.5 flex-1 min-h-0 lg:overflow-hidden">
        
        {/* ======================================================================= */}
        {/* COLUMN 1 (LEFT): MUNDOS DO SABER & PRÓXIMAS MISSÕES                     */}
        {/* ======================================================================= */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-start gap-3.5 min-h-0">
          
          {/* Worlds (Mundos & Trilhas - Clean, Modern Cards with NO Progress Bars) */}
          <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 flex flex-col justify-start gap-2 shadow-md shrink-0">
            <div className="flex items-center justify-between mb-0.5 px-0.5">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#123cc4]" /> Mundos do Saber
              </span>
              <span className="text-[10px] font-black text-[#0e2fb2]">
                4 Trilhas Abertas
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {displayWorlds.map((w) => (
                <div 
                  key={w.id} 
                  className="p-2.5 rounded-2xl bg-white/90 border border-slate-200/80 hover:border-[#123cc4]/60 flex flex-col justify-between transition-all shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-1.5 rounded-xl border ${w.accentColor}`}>
                      <w.icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-black text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      {w.availableMissions} missões
                    </span>
                  </div>
                  <div className="mt-2">
                    <h4 className="text-xs font-black leading-tight text-slate-900 truncate">{w.name}</h4>
                    <p className="text-[9px] font-bold text-slate-500 truncate mt-0.5">{w.tag}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Próximas Missões (Aligned to Top) */}
          <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 flex flex-col justify-start gap-2 flex-1 min-h-0 shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-0.5 px-0.5 shrink-0">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5 text-[#123cc4]" /> Próximas Missões
              </span>
              <span className="text-[9px] font-bold text-slate-500">
                Missões Seguintes
              </span>
            </div>

            {/* List stacked from the top */}
            <div className="flex flex-col justify-start gap-2 overflow-hidden flex-1">
              {activeClass.upcomingMissions.slice(0, 2).map((m) => (
                <div key={m.id} className="relative rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs flex items-center shrink-0 overflow-hidden min-h-[72px]">
                  
                  {/* Absolute Full-Height Left Edge Image */}
                  <div className="absolute left-0 top-0 bottom-0 w-24 z-0 border-r border-slate-200/50">
                    <img src={m.coverUrl} alt={m.title} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Content with left padding to clear the image */}
                  <div className="relative z-10 pl-28 pr-2 py-2 flex-1 overflow-hidden">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded truncate border ${m.worldBadgeClass}`}>
                        {m.world}
                      </span>
                      <span className="text-[9px] font-bold text-[#123cc4] truncate">
                        {m.availability}
                      </span>
                    </div>
                    <h5 className="text-xs font-black text-slate-900 truncate leading-tight mt-0.5">
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
        {/* COLUMN 2 (CENTER): MOMENTOS DA TURMA (INTERACTIVE CLICKABLE DOTS & 3.5s) */}
        {/* ======================================================================= */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-start min-h-0">
          <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 flex flex-col justify-between flex-1 min-h-0 shadow-md relative overflow-hidden">
            
            {/* Gallery Header with CLICKABLE INTERACTIVE DOTS */}
            <div className="flex items-center justify-between px-0.5 mb-1 shrink-0">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-[#123cc4]" /> Momentos da Turma
              </span>
              
              {/* Clickable Indicator Dots */}
              <div className="flex items-center gap-1.5">
                {CLASSROOM_MEMORIES.map((m, i) => {
                  const isSelected = i === (memoryPhotoIdx % CLASSROOM_MEMORIES.length);
                  return (
                    <button 
                      key={i}
                      type="button"
                      onClick={() => setMemoryPhotoIdx(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer p-0 border-0 ${
                        isSelected 
                          ? 'bg-[#123cc4] w-4 shadow-2xs' 
                          : 'bg-slate-300 hover:bg-slate-400 w-2'
                      }`}
                      title={`Ver: ${m.title}`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  );
                })}
                <span className="text-[9px] font-bold text-[#0e2fb2] ml-1">
                  Nossa Galeria
                </span>
              </div>
            </div>

            {/* Big Prominent Classroom Photo with Overlay and Interactive Arrows */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs h-64 sm:h-72 lg:h-auto lg:flex-1 min-h-0 group my-1">
              <img 
                src={currentMemory.photoUrl} 
                alt={currentMemory.title} 
                className="w-full h-full object-cover transition-all duration-500 animate-fade-in" 
              />

              {/* Previous Photo Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMemoryPhotoIdx((prev) => (prev - 1 + CLASSROOM_MEMORIES.length) % CLASSROOM_MEMORIES.length);
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md z-20"
                title="Foto Anterior"
                aria-label="Foto Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Next Photo Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMemoryPhotoIdx((prev) => (prev + 1) % CLASSROOM_MEMORIES.length);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md z-20"
                title="Próxima Foto"
                aria-label="Próxima Foto"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Rich Gradient Overlay with Belonging Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-3 text-white pointer-events-none">
                <span className="text-[9px] font-black text-[#123cc4] uppercase tracking-wider block">
                  {currentMemory.tag}
                </span>
                <div className="text-sm font-black leading-tight truncate mt-0.5">
                  {currentMemory.title}
                </div>
                <p className="text-[10px] text-slate-200 line-clamp-2 mt-1 font-medium italic leading-snug">
                  "{currentMemory.caption}"
                </p>
              </div>
            </div>

            {/* Clean Subtitle at Bottom */}
            <div className="px-2 py-1 flex items-center justify-between text-[10px] font-bold text-slate-600 shrink-0">
              <span className="flex items-center gap-1">
                <Sparkle className="w-3 h-3 text-[#123cc4]" />
                <span>Nossa Turma em Ação</span>
              </span>
              <span className="text-[#0e2fb2] font-black">
                Juntos somos mais fortes!
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* COLUMN 3 (RIGHT): GUILDAS E EQUIPES EM AÇÃO (NO PROGRESS BARS)          */}
        {/* ========================================================================= */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-start min-h-0">
          <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-3 flex flex-col justify-between flex-1 min-h-0 shadow-md gap-2">
            <div className="flex items-center justify-between mb-1 px-0.5 shrink-0">
              <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Users2 className="w-3.5 h-3.5 text-[#123cc4]" /> Guildas & Equipes em Ação
              </span>
              <span className="text-[9px] font-black text-[#00067a] bg-[#123cc4]/10 px-2.5 py-0.5 rounded-full border border-[#123cc4]/20 shadow-2xs">
                Cooperação
              </span>
            </div>

            {/* Guild Items with Team Shield/Emblem & Status */}
            <div className="space-y-2 overflow-hidden flex-1 my-1">
              {activeClass.groups.map((grp, i) => (
                <div key={i} className="p-3 rounded-2xl bg-white/90 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#123cc4]/10 border border-[#123cc4]/20 flex items-center justify-center text-[#09219f] font-black text-xs shrink-0">
                        <Users2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-slate-900 truncate leading-tight">{grp.name}</h5>
                        <span className="text-[9px] font-black text-[#0e2fb2] block">{grp.statusTag}</span>
                      </div>
                    </div>

                    <div className="flex items-center -space-x-1.5">
                      {grp.avatars.map((av, idx) => (
                        <img 
                          key={idx} 
                          src={av} 
                          alt="Membro" 
                          className="w-5.5 h-5.5 rounded-full object-cover border-2 border-white shadow-2xs ring-1 ring-[#123cc4]" 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100">
                    <span className="text-[9px] text-slate-600 font-bold truncate max-w-[190px]">
                      Missão: <span className="text-slate-800">{grp.mission}</span>
                    </span>
                    <GlassXpBadge amount={grp.xpReward} size="xs" />
                  </div>
                </div>
              ))}
            </div>

            {/* Teamwork Incentive Footer */}
            <div className="p-2.5 rounded-2xl bg-white/90 border border-[#123cc4]/20 flex items-center gap-2.5 shadow-2xs shrink-0 mt-auto">
              <div className="w-8 h-8 rounded-xl bg-[#123cc4] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-[9px] font-black uppercase text-[#00067a] flex items-center gap-1">
                  <Sparkle className="w-2.5 h-2.5 text-[#123cc4]" /> Força da Equipe
                </div>
                <div className="text-[10px] font-black text-slate-800 leading-tight">
                  Juntos, cada desafio se torna uma grande conquista!
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. FOOTER: DUPLAS EM AÇÃO & EXPLORADORES DA TURMA (RESPONSIVE)           */}
      {/* ========================================================================= */}
      <footer className="grid grid-cols-1 lg:grid-cols-2 gap-3.5 shrink-0">
        
        {/* Marquee 1: Duplas em Ação (Compact Uniform Height h-[116px], Width w-[145px]) */}
        <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-2.5 shadow-md flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="text-[11px] font-black text-slate-900 flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-[#123cc4]" /> Duplas em Ação
            </span>
            <span className="text-[8px] text-[#00067a] font-black bg-[#123cc4]/10 px-2.5 py-0.5 rounded-full border border-[#123cc4]/20 shadow-2xs">
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
                      className="w-9 h-9 rounded-full object-cover border-2 border-white ring-2 ring-[#123cc4] shadow-2xs" 
                    />
                    <img 
                      src={pair.avatar2} 
                      alt={pair.name2} 
                      className="w-9 h-9 rounded-full object-cover border-2 border-white ring-2 ring-[#123cc4] shadow-2xs" 
                    />
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
        <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-2.5 shadow-md flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="text-[11px] font-black text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#123cc4]" /> Exploradores da Turma
            </span>
            <span className="text-[8px] text-[#00067a] font-black bg-[#123cc4]/10 px-2.5 py-0.5 rounded-full border border-[#123cc4]/20 shadow-2xs">
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
                      className="w-10 h-10 rounded-full object-cover border-2 border-white ring-2 ring-[#123cc4] shadow-2xs" 
                    />
                    <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-slate-900 text-white text-[8px] font-black shadow-2xs border border-white">
                      Nv {exp.level}
                    </div>
                  </div>
                  
                  <div className="w-full">
                    <span className="text-[11px] font-black text-slate-900 truncate block leading-tight">
                      {exp.name}
                    </span>
                    <span className="text-[8px] font-black text-[#00067a] bg-[#123cc4]/10 border border-[#123cc4]/20 px-1.5 py-0.2 rounded-md inline-block truncate max-w-full">
                      {exp.tag}
                    </span>
                  </div>
                  
                  <div className="w-full flex justify-center">
                    <GlassXpBadge amount={exp.xp} size="xs" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 5. BOTTOM INSPIRATION BAR (RESPONSIVE)                                    */}
      {/* ========================================================================= */}
      <div className="px-3 sm:px-4 py-1.5 bg-white/85 backdrop-blur-md border border-white/90 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[10px] text-slate-600 font-medium shrink-0 shadow-2xs">
        <div className="flex items-center gap-2 overflow-hidden">
          <Smile className="w-3.5 h-3.5 text-[#123cc4] shrink-0" />
          <span className="text-[#0e2fb2] font-black shrink-0">Dica do Explorador:</span>
          <span className="text-slate-800 truncate italic font-bold">
            "{ADVENTURE_QUOTES[quoteIdx % ADVENTURE_QUOTES.length].text}"
          </span>
        </div>

        <span className="text-slate-500 font-bold shrink-0 flex items-center gap-1 self-end sm:self-auto">
          <Sparkle className="w-2.5 h-2.5 text-[#123cc4]" />
          {ADVENTURE_QUOTES[quoteIdx % ADVENTURE_QUOTES.length].author}
        </span>
      </div>

    </div>
  );
};
