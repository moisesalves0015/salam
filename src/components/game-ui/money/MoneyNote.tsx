import React from 'react';

interface MoneyNoteProps {
  value: number;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const MoneyNote: React.FC<MoneyNoteProps> = ({ value, onClick, className = '', disabled = false }) => {
  
  const getNoteStyle = (v: number) => {
    switch (v) {
      case 200: return 'bg-slate-300 border-slate-400 text-slate-800';
      case 100: return 'bg-sky-200 border-sky-400 text-sky-900';
      case 50: return 'bg-orange-300 border-orange-500 text-orange-950';
      case 20: return 'bg-yellow-400 border-yellow-500 text-yellow-900';
      case 10: return 'bg-rose-400 border-rose-600 text-rose-950';
      case 5: return 'bg-purple-300 border-purple-500 text-purple-950';
      case 2: return 'bg-blue-800 border-blue-900 text-blue-100';
      default: return 'bg-emerald-200 border-emerald-400 text-emerald-900';
    }
  };

  const getAnimalIcon = (v: number) => {
    switch(v) {
      case 200: return '🐺'; // Lobo Guará
      case 100: return '🐟'; // Garoupa
      case 50: return '🐆'; // Onça
      case 20: return '🐒'; // Mico-leão
      case 10: return '🦜'; // Arara
      case 5: return '🦩'; // Garça/Flamingo
      case 2: return '🐢'; // Tartaruga
      default: return '💵';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-[130px] h-[60px] sm:w-[170px] sm:h-[80px] rounded-lg sm:rounded-xl 
        border-2 shadow-sm flex items-center justify-between px-2 sm:px-3 
        overflow-hidden transition-all shrink-0
        ${disabled ? 'opacity-60 cursor-not-allowed grayscale-[30%]' : 'hover:-translate-y-1 hover:shadow-md active:scale-95 active:-translate-y-0 cursor-pointer'}
        ${getNoteStyle(value)}
        ${className}
      `}
      aria-label={`Nota de ${value} reais`}
    >
      {/* Texture pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/20 via-transparent to-black/20 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }} />
      
      {/* Note Content */}
      <span className="font-serif font-black text-xs sm:text-lg drop-shadow-sm z-10">{value}</span>
      
      {/* Center Circle/Animal */}
      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border border-black/10 bg-white/30 flex items-center justify-center z-10 backdrop-blur-sm shadow-inner">
        <span className="text-xs sm:text-lg opacity-80">{getAnimalIcon(value)}</span>
      </div>
      
      <span className="font-serif font-black text-xs sm:text-lg drop-shadow-sm z-10">{value}</span>
    </button>
  );
};
