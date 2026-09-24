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
    <div role="radiogroup" aria-label="Mundos de aprendizagem" className="w-full">
      <div className="flex gap-3 overflow-x-auto pb-3 pt-1 snap-x snap-mandatory scrollbar-none">
        {disciplines.map((disc, index) => {
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
                relative trail-focus snap-start shrink-0 transition-all duration-300 ease-out
                w-[120px] sm:w-[150px] cursor-pointer
                ${index === 0 ? 'ml-3 sm:ml-5 scroll-ml-3 sm:scroll-ml-5' : ''}
                ${index === disciplines.length - 1 ? 'mr-3 sm:mr-5 scroll-mr-3 sm:scroll-mr-5' : ''}
              `}
            >
              <div className={`
                w-full transition-all duration-300
                ${isSelected ? 'scale-110 drop-shadow-[0_10px_20px_rgba(255,255,255,0.2)] brightness-110 -translate-y-2' : 'scale-90 opacity-50 brightness-75 hover:scale-100 hover:opacity-90'}
                active:scale-95
              `}>
                {disc.image ? (
                  <img 
                    src={disc.image} 
                    alt={disc.label} 
                    className="w-full h-auto object-contain pointer-events-none drop-shadow-xl" 
                    draggable={false}
                  />
                ) : (
                  <div className="w-full aspect-square bg-white/10 rounded-2xl flex items-center justify-center">
                    <Icon className="w-10 h-10 text-white/50" />
                  </div>
                )}
              </div>
              
              {disc.isNew && (
                <span className={`absolute top-0 right-2 px-2 py-0.5 rounded-full bg-pink-500 text-[10px] font-black text-white shadow-lg z-10 transition-transform ${isSelected ? 'scale-110 -translate-y-2' : 'scale-100'}`}>
                  NOVO
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
