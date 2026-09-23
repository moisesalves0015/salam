import React from 'react';
import {
  ArrowLeft, Zap, ZapOff, HelpCircle, Star, Coins, Flame,
  GraduationCap, MapPin
} from 'lucide-react';
import { Student } from '../../types';

interface TrailHudProps {
  student: Student;
  worldLabel: string;
  worldIcon: React.ComponentType<{ className?: string }>;
  worldGradient: string;
  completedCount: number;
  totalCount: number;
  progressPercent: number;
  nextMissionTitle?: string;
  motionReduced: boolean;
  onToggleMotion: () => void;
  onExit: () => void;
}

export const TrailHud: React.FC<TrailHudProps> = ({
  student,
  worldLabel,
  worldIcon: WorldIcon,
  worldGradient,
  completedCount,
  totalCount,
  progressPercent,
  nextMissionTitle,
  motionReduced,
  onToggleMotion,
  onExit
}) => {
  return (
    <div
      className={`animate-hud-in sticky top-0 z-50 w-full ${motionReduced ? '' : ''}`}
      role="banner"
      aria-label="HUD do Modo Trilheiro"
    >
      {/* Glassmorphism HUD bar */}
      <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2.5 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-xl">

        {/* Exit button */}
        <button
          onClick={onExit}
          className="trail-focus flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all active:scale-95 shrink-0 border border-white/15"
          aria-label="Sair do Modo Trilheiro e voltar ao app"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sair</span>
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/15 shrink-0" />

        {/* Explorer identity */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 border-2 border-white/30 flex items-center justify-center shadow-md">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-[9px] text-white/50 uppercase tracking-widest font-bold">Explorador</span>
            <span className="text-xs font-black text-white">{student?.name || 'Estudante'}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-white/15 shrink-0 hidden sm:block" />

        {/* World badge */}
        <div className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-gradient-to-r ${worldGradient} text-white text-xs font-black shrink-0 shadow-md`}>
          <WorldIcon className="w-3 h-3" />
          <span className="max-w-[120px] truncate">{worldLabel}</span>
        </div>

        {/* Progress — grows to fill */}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          {/* Counts */}
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] text-white/60 font-medium truncate">
              <span className="text-white font-bold">{completedCount}</span> de {totalCount} fases
              {nextMissionTitle && (
                <span className="hidden sm:inline text-white/50"> · Próxima: <span className="text-yellow-300">{nextMissionTitle}</span></span>
              )}
            </span>
            <span className="text-[10px] text-white font-black ml-2">{progressPercent}%</span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-yellow-400 to-emerald-400 rounded-full transition-all duration-700 ${motionReduced ? '' : 'transition-all duration-700'}`}
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progresso da trilha: ${progressPercent}%`}
            />
          </div>
        </div>

        {/* XP badge */}
        <div className="shrink-0 flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded-xl border border-yellow-400/30">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] font-black text-yellow-300">{student?.currentXp || 0}</span>
        </div>

        {/* Streak */}
        {student?.streakDays > 0 && (
          <div className="shrink-0 hidden sm:flex items-center gap-1 bg-orange-400/20 px-2 py-1 rounded-xl border border-orange-400/30">
            <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
            <span className="text-[10px] font-black text-orange-300">{student.streakDays}</span>
          </div>
        )}

        {/* Motion toggle */}
        <button
          onClick={onToggleMotion}
          className="trail-focus shrink-0 w-7 h-7 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all border border-white/10"
          aria-label={motionReduced ? 'Ativar animações' : 'Reduzir animações'}
          title={motionReduced ? 'Ativar animações completas' : 'Reduzir animações'}
        >
          {motionReduced ? <ZapOff className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
