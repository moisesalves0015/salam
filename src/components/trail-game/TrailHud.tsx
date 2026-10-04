import React from 'react';
import { Star } from 'lucide-react';
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
  motionReduced,
  onExit
}) => {
  return (
    <div
      className={`animate-hud-in relative w-full z-50 p-2 sm:p-4 flex justify-center pointer-events-none ${motionReduced ? '' : ''}`}
      role="banner"
      aria-label="HUD do Modo Trilheiro"
    >
      {/* Container principal */}
      <div className="flex items-center w-full max-w-5xl pointer-events-auto px-2 sm:px-0">
        
        {/* A Cápsula Central - Arredondamento replicando o botão (rounded-xl) */}
        <div className="relative flex-1 bg-slate-900 rounded-xl flex items-center h-12 sm:h-14 shadow-2xl border-b-[3px] border-slate-950 ml-2 sm:ml-4">
          
          {/* Avatar (Destacado na esquerda, deslocado ligeiramente para baixo) */}
          <div className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 mt-2 sm:mt-3 z-20">
            <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-br ${worldGradient} shadow-lg`}>
              <div className="w-full h-full rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800 flex items-center justify-center relative">
                {/* Imagem do Eraldo (ou genérica) */}
                <img 
                  src="/assets/trilhas/eraldo-avatar.jpg" 
                  alt="Avatar" 
                  className="w-full h-full object-cover absolute inset-0 z-0"
                />
              </div>
              
              {/* Badge de Nível (Retângulo com bordas arredondadas) */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-slate-900 border-2 border-slate-700 rounded-md flex items-center justify-center shadow-lg z-30 whitespace-nowrap">
                <span className="text-white font-black text-xs sm:text-sm">
                  Nvl {student?.level || 1}
                </span>
              </div>
            </div>
          </div>

          {/* Nome e Barra de Progresso (XP) */}
          <div className="pl-14 sm:pl-20 pr-2 flex flex-col justify-center h-full gap-1">
            <span className="text-white font-black italic uppercase tracking-wider text-[13px] sm:text-[15px] leading-none drop-shadow-md mt-0.5">
              {student?.name || 'EXPLORADOR'}
            </span>
            <div className="relative w-28 sm:w-40 h-3 sm:h-4 bg-slate-950 rounded-full overflow-hidden flex items-center border border-white/10 shadow-inner">
              <div 
                className={`absolute top-0 left-0 h-full bg-gradient-to-r ${worldGradient}`}
                style={{ width: `${Math.min(100, Math.max(0, ((student?.currentXp || 0) / (student?.nextLevelXp || 1)) * 100))}%` }}
              />
              <span className="relative z-10 w-full text-center text-[9px] sm:text-[10px] font-black text-white leading-none drop-shadow-md">
                {student?.currentXp || 0} / {student?.nextLevelXp || 100}
              </span>
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Área de Recursos - Informações Reais da Trilha */}
          <div className="flex items-center gap-2 sm:gap-4 pr-2 sm:pr-4">
            
            {/* Etiqueta do Mundo Atual (Informação real e adaptada às cores) */}
            <div className={`hidden md:flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r ${worldGradient} text-white text-xs font-black shadow-md border border-white/10`}>
              <WorldIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="max-w-[120px] truncate">{worldLabel}</span>
            </div>

            {/* Recurso 1: XP (Visual Moeda de Ouro - Mantido pois é vital) */}
            <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 sm:px-2.5 rounded-lg border border-white/5 shadow-inner">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-yellow-100 shadow-sm">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-700 fill-yellow-700" />
              </div>
              <span className="text-white font-black text-[12px] sm:text-[14px]">{student?.currentXp || 0}</span>
            </div>
          </div>
        </div>

        {/* Botão de Menu (Hambúrguer) - Serve como Saída */}
        <button
          onClick={onExit}
          title="Sair da Missão"
          className="relative w-12 h-12 sm:w-14 sm:h-14 bg-slate-900 hover:bg-slate-800 rounded-xl flex items-center justify-center shadow-lg border-b-[4px] border-slate-950 transition-all active:translate-y-1 active:border-b-0 shrink-0 group ml-2"
        >
          <div className="flex flex-col gap-1 sm:gap-1.5 group-hover:scale-105 transition-transform">
            <div className="w-5 sm:w-6 h-0.5 sm:h-1 bg-white rounded-full"></div>
            <div className="w-5 sm:w-6 h-0.5 sm:h-1 bg-white rounded-full"></div>
            <div className="w-5 sm:w-6 h-0.5 sm:h-1 bg-white rounded-full"></div>
          </div>
        </button>

      </div>
    </div>
  );
};

