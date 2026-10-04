import React, { useState, useRef, useEffect } from 'react';
import { Filter, User, Users, Printer, Grid3x3, ChevronDown } from 'lucide-react';

type ModalFilter = 'all' | 'individual' | 'dupla' | 'grupo' | 'impresso';

const FILTER_META: Record<ModalFilter, { label: string; icon: React.ComponentType<{ className?: string }>; shortLabel: string }> = {
  all:       { label: 'Todos',      shortLabel: 'Filtro',   icon: Grid3x3 },
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
  const [isOpen, setIsOpen] = useState(false);
  const filters = Object.keys(FILTER_META) as ModalFilter[];
  const activeMeta = FILTER_META[activeFilter];
  
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative h-full" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-full px-3 sm:px-4 bg-[#0e1733] border-2 border-slate-600/70 rounded-2xl shadow-xl shadow-black/40 flex items-center justify-center gap-2 text-white hover:bg-[#141c38] hover:border-sky-400/50 transition-colors"
        aria-expanded={isOpen}
      >
        <Filter className="w-4 h-4 text-white/50" />
        <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-black">{activeMeta.shortLabel}</span>
        <ChevronDown className={`w-3 h-3 text-white/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-[#0b1430] border-2 border-slate-500/60 rounded-xl shadow-2xl shadow-black/50 py-1 z-[100] animate-in fade-in slide-in-from-top-2">
          {filters.map(filter => {
             const { label, icon: Icon } = FILTER_META[filter];
             const count = countByFilter?.[filter];
             const isActive = activeFilter === filter;
             return (
               <button
                 key={filter}
                 onClick={() => { onChange(filter); setIsOpen(false); }}
                 className={`w-full flex items-center justify-between px-4 py-2.5 text-xs hover:bg-white/10 transition-colors ${isActive ? 'text-yellow-400 font-bold' : 'text-white/70 font-medium'}`}
               >
                 <div className="flex items-center gap-2.5">
                   <Icon className="w-4 h-4" />
                   {label}
                 </div>
                 {count !== undefined && count > 0 && (
                   <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded-full font-bold">{count}</span>
                 )}
               </button>
             );
          })}
        </div>
      )}
    </div>
  );
};
