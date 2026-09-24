import React from 'react';

interface MoneyCoinProps {
  value: number; // Em reais, ex: 1, 0.5, 0.25, 0.1, 0.05
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const MoneyCoin: React.FC<MoneyCoinProps> = ({ value, onClick, className = '', disabled = false }) => {
  
  const getCoinStyle = (v: number) => {
    switch (v) {
      case 1: 
        return {
          bg: 'bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600',
          border: 'border-yellow-600 ring-2 ring-slate-300', // Borda dourada, anel prateado
          text: 'text-yellow-950',
          innerBg: 'bg-slate-200 shadow-inner rounded-full border border-slate-400/50'
        };
      case 0.5: 
        return {
          bg: 'bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400',
          border: 'border-slate-500', 
          text: 'text-slate-800',
          innerBg: ''
        };
      case 0.25: 
        return {
          bg: 'bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-400',
          border: 'border-yellow-500', 
          text: 'text-yellow-900',
          innerBg: ''
        };
      case 0.1: 
        return {
          bg: 'bg-gradient-to-br from-orange-200 via-orange-300 to-orange-500',
          border: 'border-orange-600', 
          text: 'text-orange-950',
          innerBg: ''
        };
      case 0.05: 
        return {
          bg: 'bg-gradient-to-br from-orange-300 via-orange-400 to-orange-600',
          border: 'border-orange-700',
          text: 'text-orange-950',
          innerBg: ''
        };
      default: 
        return {
          bg: 'bg-slate-300', border: 'border-slate-400', text: 'text-slate-800', innerBg: ''
        };
    }
  };

  const style = getCoinStyle(value);
  const displayValue = value < 1 ? Math.round(value * 100).toString() : '1';
  
  const getSizeClass = (v: number) => {
    switch(v) {
      case 1: return 'w-11 h-11 sm:w-14 sm:h-14 text-sm sm:text-base';
      case 0.5: return 'w-10 h-10 sm:w-12 sm:h-12 text-xs sm:text-sm';
      case 0.25: return 'w-10 h-10 sm:w-13 sm:h-13 text-xs sm:text-sm';
      case 0.1: return 'w-8 h-8 sm:w-10 sm:h-10 text-[10px] sm:text-xs';
      case 0.05: return 'w-9 h-9 sm:w-11 sm:h-11 text-[11px] sm:text-xs';
      default: return 'w-10 h-10 text-xs';
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative rounded-full border shadow-md flex items-center justify-center
        transition-all font-serif font-black shrink-0
        ${disabled ? 'opacity-60 cursor-not-allowed grayscale-[30%]' : 'hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95 cursor-pointer'}
        ${getSizeClass(value)}
        ${style.bg}
        ${style.border}
        ${style.text}
        ${className}
      `}
      aria-label={`Moeda de ${value < 1 ? value * 100 + ' centavos' : '1 real'}`}
    >
      <div className={`
        absolute inset-0 m-[10%] flex items-center justify-center flex-col leading-none
        ${style.innerBg || 'rounded-full border border-black/5'}
      `}>
        <span className="drop-shadow-sm">{displayValue}</span>
      </div>
    </button>
  );
};
