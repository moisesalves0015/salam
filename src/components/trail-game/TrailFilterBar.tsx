import React from 'react';
import { Filter, User, Users, Printer, Grid3x3 } from 'lucide-react';

type ModalFilter = 'all' | 'individual' | 'dupla' | 'grupo' | 'impresso';

const FILTER_META: Record<ModalFilter, { label: string; icon: React.ComponentType<{ className?: string }>; shortLabel: string }> = {
  all:       { label: 'Todos',      shortLabel: 'Todos',    icon: Grid3x3 },
  individual:{ label: 'Individual', shortLabel: 'Solo',     icon: User },
  dupla:     { label: 'Em Dupla',   shortLabel: 'Dupla',    icon: Users },
  grupo:     { label: 'Em Grupo',   shortLabel: 'Grupo',    icon: Users },
  impresso:  { label: 'Impresso',   shortLabel: 'Impresso', icon: Printer },
};

interface TrailFilterBarProps {
  activeFilter: ModalFilter;
  onChange: (filter: ModalFilter) => void;
  countByFilter?: Partial<Record<ModalFilter, number>>;
}

export const TrailFilterBar: React.FC<TrailFilterBarProps> = ({ activeFilter, onChange, countByFilter }) => {
  const filters = Object.keys(FILTER_META) as ModalFilter[];

  return (
    <fieldset className="border-0 m-0 p-0">
      <legend className="sr-only">Filtrar missões por modalidade</legend>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
        <div className="flex items-center gap-1 mr-1 shrink-0">
          <Filter className="w-3 h-3 text-white/40" />
          <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Modo:</span>
        </div>
        {filters.map((filter) => {
          const { label, shortLabel, icon: Icon } = FILTER_META[filter];
          const isActive = activeFilter === filter;
          const count = countByFilter?.[filter];

          return (
            <button
              key={filter}
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(filter)}
              aria-label={`${label}${count !== undefined ? `, ${count} missões` : ''}`}
              className={`
                trail-focus shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold
                transition-all cursor-pointer border active:scale-95
                ${isActive
                  ? 'bg-yellow-400/25 text-yellow-300 border-yellow-400/40 shadow-sm'
                  : 'bg-white/8 text-white/50 border-white/10 hover:bg-white/15 hover:text-white/70'
                }
              `}
            >
              <Icon className="w-3 h-3" />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{shortLabel}</span>
              {count !== undefined && count > 0 && (
                <span className={`ml-0.5 text-[9px] font-black px-1.5 rounded-full ${isActive ? 'bg-yellow-400/30 text-yellow-200' : 'bg-white/10 text-white/40'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};
