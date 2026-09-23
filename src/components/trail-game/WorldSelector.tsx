import React from 'react';

interface DisciplineData {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  bncc: string;
  completedCount: number;
  totalCount: number;
  isNew?: boolean;
}

interface WorldSelectorProps {
  disciplines: DisciplineData[];
  selectedId: string;
  onChange: (id: string) => void;
}

export const WorldSelector: React.FC<WorldSelectorProps> = ({ disciplines, selectedId, onChange }) => {
  return (
    <div role="radiogroup" aria-label="Mundos de aprendizagem">
      <div className="flex gap-3 overflow-x-auto pb-1 px-1 snap-x snap-mandatory scrollbar-none">
        {disciplines.map((disc) => {
          const Icon = disc.icon;
          const isSelected = disc.id === selectedId;
          const progressPct = disc.totalCount > 0
            ? Math.round((disc.completedCount / disc.totalCount) * 100)
            : 0;

          return (
            <button
              key={disc.id}
              role="radio"
              aria-checked={isSelected}
              aria-label={`${disc.label}. ${disc.completedCount} de ${disc.totalCount} fases concluídas. ${disc.bncc}`}
              onClick={() => onChange(disc.id)}
              className={`
                trail-focus snap-start shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all
                min-w-[100px] sm:min-w-[120px] cursor-pointer active:scale-95
                ${isSelected
                  ? `bg-gradient-to-b ${disc.gradient} text-white border-white/40 shadow-xl scale-[1.04] ring-2 ring-white/50`
                  : 'bg-slate-900/60 text-white/60 border-white/10 hover:border-white/25 hover:bg-slate-800/70 hover:text-white/80'
                }
              `}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md ${isSelected ? 'bg-white/25' : 'bg-white/10'}`}>
                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-white/60'}`} />
              </div>

              {/* Label */}
              <div className="text-center leading-none">
                <div className="flex items-center justify-center gap-1">
                  <span className={`text-[11px] font-black leading-tight text-center ${isSelected ? 'text-white' : 'text-white/70'}`}>
                    {disc.label}
                  </span>
                  {disc.isNew && (
                    <span className="px-1.5 py-0.5 rounded-full bg-white/25 text-[8px] font-black text-white">
                      NOVO
                    </span>
                  )}
                </div>
                {/* Mini progress */}
                <div className="mt-1.5 w-full bg-white/20 rounded-full h-1 overflow-hidden">
                  <div
                    className="h-full bg-white/80 rounded-full transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
                <span className={`text-[9px] font-bold mt-0.5 ${isSelected ? 'text-white/80' : 'text-white/40'}`}>
                  {disc.totalCount > 0 ? `${disc.completedCount}/${disc.totalCount}` : '—'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
