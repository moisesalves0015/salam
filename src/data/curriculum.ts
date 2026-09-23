import { Track } from '../types';
import { track1 } from './tracks/track1';
import { track2 } from './tracks/track2';
import { track3 } from './tracks/track3';
import { track4 } from './tracks/track4';
import { track5 } from './tracks/track5';
import { track6 } from './tracks/track6';
import { trackPortugues } from './tracks/trackPortugues';
import { trackCiencias } from './tracks/trackCiencias';
import { trackHistoria } from './tracks/trackHistoria';
import { trackGeografia } from './tracks/trackGeografia';
import { trackArtes } from './tracks/trackArtes';
import { trackFinanceira } from './tracks/trackFinanceira';

export type SubjectId = 'matematica' | 'portugues' | 'ciencias' | 'historia' | 'geografia' | 'artes' | 'financeira';

export interface CurriculumSubject {
  id: SubjectId;
  name: string;
  grade: string;
  icon: string;
  color: string;
  available: boolean;
  totalTracks: number;
}

export const subjects: CurriculumSubject[] = [
  {
    id: 'matematica',
    name: 'Matemática',
    grade: '4º Ano Fundamental',
    icon: 'Calculator',
    color: 'emerald',
    available: true,
    totalTracks: 6
  },
  {
    id: 'portugues',
    name: 'Língua Portuguesa',
    grade: '4º Ano Fundamental',
    icon: 'BookOpen',
    color: 'blue',
    available: true,
    totalTracks: 1
  },
  {
    id: 'ciencias',
    name: 'Ciências da Natureza',
    grade: '4º Ano Fundamental',
    icon: 'FlaskConical',
    color: 'emerald',
    available: true,
    totalTracks: 1
  },
  {
    id: 'historia',
    name: 'História',
    grade: '4º Ano Fundamental',
    icon: 'Clock',
    color: 'amber',
    available: true,
    totalTracks: 1
  },
  {
    id: 'geografia',
    name: 'Geografia',
    grade: '4º Ano Fundamental',
    icon: 'Compass',
    color: 'indigo',
    available: true,
    totalTracks: 1
  },
  {
    id: 'artes',
    name: 'Artes Visuais',
    grade: '4º Ano Fundamental',
    icon: 'Palette',
    color: 'rose',
    available: true,
    totalTracks: 1
  },
  {
    id: 'financeira',
    name: 'Educação Financeira',
    grade: '4º Ano Fundamental',
    icon: 'Coins',
    color: 'amber',
    available: true,
    totalTracks: 1
  }
];

export const mathTracks: Track[] = [
  track1,
  track2,
  track3,
  track4,
  track5,
  track6
];

export const subjectTracksMap: Record<SubjectId, Track[]> = {
  matematica: mathTracks,
  portugues: [trackPortugues],
  ciencias: [trackCiencias],
  historia: [trackHistoria],
  geografia: [trackGeografia],
  artes: [trackArtes],
  financeira: [trackFinanceira]
};

export const allTracks: Track[] = [
  ...mathTracks,
  trackPortugues,
  trackCiencias,
  trackHistoria,
  trackGeografia,
  trackArtes,
  trackFinanceira
];

export const initialany: any = {
  xp: 120,
  level: 1,
  streakDays: 3,
  hearts: 5,
  maxHearts: 5,
  completedUnits: ['t1-u1', 't-port-u1', 't-cien-u1'], // Initial unlocked progress
  completedTracks: [],
  masteredSkills: ['Unidade e Dezena', 'Localização Explícita', 'Produtores e Energia Solar'],
  mistakeHistory: [],
  earnedBadges: [
    {
      id: 'first-step',
      title: 'Primeiro Passo',
      description: 'Iniciou a jornada escolar no 4º ano!',
      icon: 'Rocket',
      unlockedAt: 'Hoje'
    }
  ]
};

