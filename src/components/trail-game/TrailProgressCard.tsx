import React from 'react';
import { Target } from 'lucide-react';

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
  themeId?: string; // 'mat', 'por', 'cie', 'cul', 'fin'
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
  themeId = 'mat'
}) => {
  // Cores dinâmicas para o botão de ação "Ir"
  const BTN_THEMES = {
    mat: 'bg-emerald-500 hover:bg-emerald-400 border-emerald-700 text-emerald-950',
    por: 'bg-blue-500 hover:bg-blue-400 border-blue-700 text-blue-950',
    cie: 'bg-orange-500 hover:bg-orange-400 border-orange-700 text-orange-950',
    cul: 'bg-purple-500 hover:bg-purple-400 border-purple-700 text-purple-950',
    fin: 'bg-yellow-500 hover:bg-yellow-400 border-yellow-700 text-yellow-950'
  } as const;
  
  const activeBtnTheme = BTN_THEMES[themeId as keyof typeof BTN_THEMES] || BTN_THEMES.mat;

  return (
    <div className="bg-[#0e1733] border-2 border-slate-600/70 rounded-2xl overflow-hidden shadow-xl shadow-black/40 flex items-center p-2.5 sm:p-4 gap-3 sm:gap-4 h-full relative">
      {/* Detalhe visual de borda superior */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${worldGradient}`} />

      {/* Icon */}
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${worldGradient} flex items-center justify-center shrink-0 shadow-lg border border-white/20`}>
        <WorldIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h2 className="text-xs sm:text-[14px] font-black text-white italic uppercase tracking-wider truncate drop-shadow-md" style={{ textShadow: '1px 1px 0 rgba(0,0,0,0.5)' }}>
          {trackTitle || 'Trilha de Aprendizagem'}
        </h2>
        {/* Progress Bar */}
        <div className="mt-1.5 flex items-center gap-2">
           <div className="h-2 flex-1 bg-slate-900 rounded-full overflow-hidden border border-white/5 shadow-inner relative">
             <div className={`absolute top-0 left-0 h-full bg-gradient-to-r ${worldGradient} transition-all duration-700`} style={{ width: `${progressPercent}%` }} />
           </div>
           <span className="text-[10px] text-white font-black shrink-0 drop-shadow-md">{completedCount}/{totalCount} ({progressPercent}%)</span>
        </div>
      </div>

      {/* Action */}
      {nextMissionTitle && onContinue && (
        <button
          onClick={onContinue}
          className={`trail-focus shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 ${activeBtnTheme} border-b-[3px] text-[11px] sm:text-xs font-black uppercase tracking-wider rounded-xl transition-all active:translate-y-1 active:border-b-0 shadow-lg flex items-center gap-1.5 h-auto`}
          aria-label={`Continuar jornada: ${nextMissionTitle}`}
        >
          <Target className="w-4 h-4" />
          <span>Ir</span>
        </button>
      )}
    </div>
  );
};
