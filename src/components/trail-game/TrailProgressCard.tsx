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
  bncc,
  completedCount,
  totalCount,
  progressPercent,
  nextMissionTitle,
  onContinue,
  trackTitle,
  trackDescription,
}) => {
  const [bnccOpen, setBnccOpen] = useState(false);

  return (
    <div className="bg-slate-900/70 backdrop-blur-xl border border-white/15 rounded-2xl overflow-hidden shadow-xl">
      {/* Gradient banner */}
      <div className={`h-1.5 bg-gradient-to-r ${worldGradient}`} />

      <div className="p-4 sm:p-5">
        {/* Label row */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 text-[10px] font-black text-white/40 uppercase tracking-widest">
            <MapPin className="w-3 h-3" />
            Percurso de Aprendizagem Adaptativo
          </div>
        </div>

        {/* World + Title */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r ${worldGradient} text-white text-xs font-black mb-1.5 shadow-md`}>
              <WorldIcon className="w-3 h-3" />
              {worldLabel}
            </div>
            <h2 className="text-base sm:text-lg font-black text-white leading-tight">
              {trackTitle || 'Trilha de Aprendizagem'}
            </h2>
            {trackDescription && (
              <p className="text-xs text-white/55 mt-1 leading-relaxed line-clamp-2">
                {trackDescription}
              </p>
            )}
          </div>

          {/* Progress badge */}
          <div className="shrink-0 text-center bg-white/10 rounded-xl px-3 py-2 border border-white/10">
            <div className="text-2xl font-black text-white leading-none">{progressPercent}%</div>
            <div className="text-[9px] text-white/50 font-bold mt-0.5">{completedCount}/{totalCount}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
            <div
              className={`h-full bg-gradient-to-r ${worldGradient} rounded-full transition-all duration-700`}
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${completedCount} de ${totalCount} fases concluídas`}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/40 mt-1 font-medium">
            <span>Trilhas de Aprendizagem</span>
            <span className="font-black text-white/60">{completedCount} de {totalCount} fases dominadas</span>
          </div>
        </div>

        {/* Next mission CTA */}
        {nextMissionTitle && onContinue && (
          <div className="flex items-center gap-2 mb-3 p-3 bg-emerald-500/15 border border-emerald-400/25 rounded-xl">
            <Target className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[9px] text-emerald-400/70 font-bold uppercase tracking-wider">Próximo destino</div>
              <div className="text-xs font-black text-emerald-300 truncate">{nextMissionTitle}</div>
            </div>
            <button
              onClick={onContinue}
              className="trail-focus shrink-0 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-black rounded-xl transition-all active:scale-95 shadow-md"
              aria-label={`Continuar jornada: ${nextMissionTitle}`}
            >
              Ir!
            </button>
          </div>
        )}

        {/* BNCC disclosure */}
        <button
          onClick={() => setBnccOpen(v => !v)}
          aria-expanded={bnccOpen}
          aria-controls="bncc-panel"
          className="trail-focus w-full flex items-center justify-between text-[10px] text-white/40 hover:text-white/60 font-bold uppercase tracking-wider transition-colors py-1"
        >
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3 h-3" />
            <span>Habilidades BNCC</span>
          </div>
          {bnccOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {bnccOpen && (
          <div
            id="bncc-panel"
            className="mt-2 p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-white/60 font-medium leading-relaxed"
          >
            {bncc}
          </div>
        )}
      </div>
    </div>
  );
};
