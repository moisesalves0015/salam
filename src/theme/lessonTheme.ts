/**
 * SALA DE MISSÕES — TOKENS VISUAIS DAS FASES (LessonRunner)
 *
 * Tema escuro "modo missão" usado dentro das fases das trilhas.
 * Cada tipo de etapa tem uma cor de identidade aplicada em cabeçalho,
 * bordas, ícones, brilhos e botão principal — nunca na tela inteira.
 *
 * As classes são strings completas (não interpoladas) para que o
 * Tailwind consiga detectá-las no build.
 */
import type { LucideIcon } from 'lucide-react';
import {
  Target, MessageCircle, Lightbulb, PenLine, NotebookPen, Handshake,
  Zap, Globe2, Trophy, RotateCcw, Hand,
} from 'lucide-react';
import type { StepType } from '../types';

export interface StepTheme {
  /** Rótulo curto exibido na etiqueta da etapa */
  label: string;
  Icon: LucideIcon;
  /** Texto de destaque (ícones, rótulos) */
  text: string;
  /** Etiqueta (chip) sólida */
  chip: string;
  /** Moldura do ícone da etapa */
  iconBox: string;
  /** Superfície do painel principal da etapa */
  panel: string;
  /** Faixa superior colorida do painel */
  stripe: string;
  /** Brilho ambiente no topo da tela */
  ambient: string;
  /** Preenchimento da barra de progresso */
  progress: string;
  /** Botão principal (ação) */
  button: string;
  /** Anel de foco / seleção */
  ring: string;
}

export const STEP_THEME: Record<StepType, StepTheme> = {
  objective: {
    label: 'Missão',
    Icon: Target,
    text: 'text-blue-300',
    chip: 'bg-blue-600 text-white border-blue-400',
    iconBox: 'bg-gradient-to-br from-blue-500 to-blue-700 border-blue-300/60 shadow-blue-900/50',
    panel: 'bg-[#122148] border-blue-500/50',
    stripe: 'from-blue-400 via-blue-500 to-indigo-500',
    ambient: 'from-blue-600/35',
    progress: 'from-blue-500 via-sky-400 to-cyan-300',
    button: 'from-blue-500 to-indigo-600 shadow-blue-600/40',
    ring: 'ring-blue-400/60',
  },
  dialogue: {
    label: 'Conversa',
    Icon: MessageCircle,
    text: 'text-teal-300',
    chip: 'bg-teal-600 text-white border-teal-400',
    iconBox: 'bg-gradient-to-br from-teal-400 to-cyan-700 border-teal-300/60 shadow-teal-900/50',
    panel: 'bg-[#0f2a33] border-teal-500/50',
    stripe: 'from-teal-300 via-teal-500 to-cyan-500',
    ambient: 'from-teal-500/30',
    progress: 'from-teal-500 via-teal-400 to-emerald-300',
    button: 'from-teal-500 to-cyan-600 shadow-teal-600/40',
    ring: 'ring-teal-400/60',
  },
  explanation: {
    label: 'Explicação',
    Icon: Lightbulb,
    text: 'text-sky-300',
    chip: 'bg-sky-600 text-white border-sky-400',
    iconBox: 'bg-gradient-to-br from-sky-400 to-blue-700 border-sky-300/60 shadow-sky-900/50',
    panel: 'bg-[#0f2340] border-sky-500/50',
    stripe: 'from-sky-300 via-sky-500 to-blue-500',
    ambient: 'from-sky-500/30',
    progress: 'from-sky-500 via-sky-400 to-cyan-300',
    button: 'from-sky-500 to-blue-600 shadow-sky-600/40',
    ring: 'ring-sky-400/60',
  },
  worked_example: {
    label: 'Exemplo Resolvido',
    Icon: PenLine,
    text: 'text-indigo-300',
    chip: 'bg-indigo-600 text-white border-indigo-400',
    iconBox: 'bg-gradient-to-br from-indigo-400 to-indigo-700 border-indigo-300/60 shadow-indigo-900/50',
    panel: 'bg-[#1a1b4b] border-indigo-500/50',
    stripe: 'from-indigo-300 via-indigo-500 to-blue-500',
    ambient: 'from-indigo-500/30',
    progress: 'from-indigo-500 via-blue-400 to-sky-300',
    button: 'from-indigo-500 to-blue-600 shadow-indigo-600/40',
    ring: 'ring-indigo-400/60',
  },
  notebook_demo: {
    label: 'Caderno',
    Icon: NotebookPen,
    text: 'text-amber-300',
    chip: 'bg-amber-500 text-amber-950 border-amber-300',
    iconBox: 'bg-gradient-to-br from-amber-400 to-orange-600 border-amber-200/60 shadow-amber-900/50',
    panel: 'bg-[#2a2010] border-amber-500/50',
    stripe: 'from-amber-300 via-amber-500 to-orange-500',
    ambient: 'from-amber-500/25',
    progress: 'from-amber-500 via-amber-400 to-yellow-300',
    button: 'from-amber-500 to-orange-600 shadow-amber-600/40',
    ring: 'ring-amber-400/60',
  },
  guided_practice: {
    label: 'Prática Guiada',
    Icon: Handshake,
    text: 'text-indigo-300',
    chip: 'bg-indigo-600 text-white border-indigo-400',
    iconBox: 'bg-gradient-to-br from-indigo-400 to-indigo-700 border-indigo-300/60 shadow-indigo-900/50',
    panel: 'bg-[#1a1b4b] border-indigo-500/50',
    stripe: 'from-indigo-300 via-indigo-500 to-blue-500',
    ambient: 'from-indigo-500/30',
    progress: 'from-indigo-500 via-blue-400 to-sky-300',
    button: 'from-indigo-500 to-blue-600 shadow-indigo-600/40',
    ring: 'ring-indigo-400/60',
  },
  independent_exercise: {
    label: 'Exercício',
    Icon: Zap,
    text: 'text-violet-300',
    chip: 'bg-violet-600 text-white border-violet-400',
    iconBox: 'bg-gradient-to-br from-violet-400 to-violet-700 border-violet-300/60 shadow-violet-900/50',
    panel: 'bg-[#23174a] border-violet-500/50',
    stripe: 'from-violet-300 via-violet-500 to-fuchsia-500',
    ambient: 'from-violet-500/30',
    progress: 'from-violet-500 via-violet-400 to-fuchsia-300',
    button: 'from-violet-500 to-purple-600 shadow-violet-600/40',
    ring: 'ring-violet-400/60',
  },
  contextualized_problem: {
    label: 'Problema Real',
    Icon: Globe2,
    text: 'text-rose-300',
    chip: 'bg-rose-600 text-white border-rose-400',
    iconBox: 'bg-gradient-to-br from-rose-400 to-rose-700 border-rose-300/60 shadow-rose-900/50',
    panel: 'bg-[#2c1424] border-rose-500/50',
    stripe: 'from-rose-300 via-rose-500 to-pink-500',
    ambient: 'from-rose-500/25',
    progress: 'from-rose-500 via-pink-400 to-orange-300',
    button: 'from-rose-500 to-pink-600 shadow-rose-600/40',
    ring: 'ring-rose-400/60',
  },
  final_challenge: {
    label: 'Desafio Final',
    Icon: Trophy,
    text: 'text-amber-300',
    chip: 'bg-gradient-to-r from-purple-600 to-amber-500 text-white border-amber-300',
    iconBox: 'bg-gradient-to-br from-purple-500 via-purple-700 to-amber-500 border-amber-300/70 shadow-purple-900/60',
    panel: 'bg-[#251443] border-amber-400/50',
    stripe: 'from-purple-400 via-fuchsia-500 to-amber-400',
    ambient: 'from-purple-600/35',
    progress: 'from-purple-500 via-fuchsia-400 to-amber-300',
    button: 'from-purple-600 to-amber-500 shadow-purple-600/40',
    ring: 'ring-amber-400/60',
  },
  recovery_mission: {
    label: 'Revisão',
    Icon: RotateCcw,
    text: 'text-orange-300',
    chip: 'bg-orange-600 text-white border-orange-400',
    iconBox: 'bg-gradient-to-br from-orange-400 to-orange-700 border-orange-300/60 shadow-orange-900/50',
    panel: 'bg-[#2b1a10] border-orange-500/50',
    stripe: 'from-orange-300 via-orange-500 to-amber-500',
    ambient: 'from-orange-500/25',
    progress: 'from-orange-500 via-amber-400 to-yellow-300',
    button: 'from-orange-500 to-amber-600 shadow-orange-600/40',
    ring: 'ring-orange-400/60',
  },
  interactive_drag_drop: {
    label: 'Prática Interativa',
    Icon: Hand,
    text: 'text-fuchsia-300',
    chip: 'bg-fuchsia-600 text-white border-fuchsia-400',
    iconBox: 'bg-gradient-to-br from-fuchsia-400 to-purple-700 border-fuchsia-300/60 shadow-fuchsia-900/50',
    panel: 'bg-[#2a1540] border-fuchsia-500/50',
    stripe: 'from-fuchsia-300 via-fuchsia-500 to-violet-500',
    ambient: 'from-fuchsia-500/25',
    progress: 'from-fuchsia-500 via-violet-400 to-indigo-300',
    button: 'from-fuchsia-500 to-violet-600 shadow-fuchsia-600/40',
    ring: 'ring-fuchsia-400/60',
  },
};

/** Respeita a preferência do sistema por menos movimento. */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
