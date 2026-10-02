import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Zap, MapPin, Target } from 'lucide-react';

interface TrailProgressCardProps {
  worldLabel: string;
  worldIcon: React.ComponentType<{ className?: string }>;
  worldGradient: string;
  bncc: string;
  completedCount: number;
  totalCount: number;
  progressPercent: number;
  nextMissionTitle?: string;
  onContinue?: () => void;
  trackTitle?: string;
  trackDescription?: string;
}

export const TrailProgressCard: React.FC<TrailProgressCardProps> = ({
  worldLabel,
  worldIcon: WorldIcon,
  worldGradient,
  completedCount,
  totalCount,
  progressPercent,
  nextMissionTitle,
  onContinue,
  trackTitle,
}) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-2xl overflow-hidden shadow-xl flex items-center p-2 sm:p-3 gap-2.5 sm:gap-3 h-full">
      {/* Icon */}
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${worldGradient} flex items-center justify-center shrink-0 shadow-lg`}>
        <WorldIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h2 className="text-[11px] sm:text-xs font-black text-white leading-tight truncate">
          {trackTitle || 'Trilha de Aprendizagem'}
        </h2>
        {/* Progress Bar */}
        <div className="mt-1 flex items-center gap-2">
           <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
             <div className={`h-full bg-gradient-to-r ${worldGradient} transition-all duration-700`} style={{ width: `${progressPercent}%` }} />
           </div>
           <span className="text-[9px] text-white/50 font-bold shrink-0">{completedCount}/{totalCount} ({progressPercent}%)</span>
        </div>
      </div>

      {/* Action */}
      {nextMissionTitle && onContinue && (
        <button
          onClick={onContinue}
          className="trail-focus shrink-0 px-2.5 sm:px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-[10px] font-black rounded-xl transition-all active:scale-95 shadow-md flex items-center gap-1 h-auto"
          aria-label={`Continuar jornada: ${nextMissionTitle}`}
        >
          <Target className="w-3 h-3" />
          <span>Ir</span>
        </button>
      )}
    </div>
  );
};
