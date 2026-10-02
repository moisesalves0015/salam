import React, { useState } from 'react';
import { MafsVisualization } from '../../types';

interface MathVisualsProps {
  data: MafsVisualization;
}

export const MathVisuals: React.FC<MathVisualsProps> = ({ data }) => {
  if (data.type === 'number-line') {
    const targetVals = Array.isArray(data.value) ? data.value : [data.value];
    // Um slider simples
    const [currentVal, setCurrentVal] = useState(0);

    return (
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <h4 className="text-center font-bold text-slate-300 text-sm uppercase tracking-wider mb-2">Deslize para explorar a reta numérica</h4>
        
        <div className="relative pt-8 pb-4 px-4">
          {/* Base line */}
          <div className="absolute top-10 left-4 right-4 h-1 bg-slate-700 rounded-full"></div>
          
          {/* Target Markers */}
          {targetVals.map((v, i) => (
            <div 
              key={i} 
              className="absolute top-9 w-3 h-3 bg-indigo-500 rounded-full -ml-1.5 shadow-[0_0_10px_rgba(99,102,241,0.8)]"
              style={{ left: `calc(1rem + (100% - 2rem) * ${v})` }}
            >
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold text-indigo-300 bg-slate-800 px-2 py-0.5 rounded-md border border-indigo-500/30">
                {v.toFixed(1)}
              </span>
            </div>
          ))}

          {/* Interactive Slider */}
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.1" 
            value={currentVal}
            onChange={(e) => setCurrentVal(parseFloat(e.target.value))}
            className="absolute top-8 left-4 right-4 w-[calc(100%-2rem)] h-5 opacity-0 cursor-pointer z-20"
          />

          {/* Slider Thumb Visual */}
          <div 
            className="absolute top-8 w-5 h-5 bg-white border-4 border-emerald-500 rounded-full -ml-2.5 z-10 pointer-events-none transition-all duration-100"
            style={{ left: `calc(1rem + (100% - 2rem) * ${currentVal})` }}
          >
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-black text-emerald-400 bg-slate-800 px-2.5 py-1 rounded-lg border border-emerald-500/50 shadow-lg whitespace-nowrap">
              Você está no: {currentVal.toFixed(1)}
            </span>
          </div>

          {/* Ticks 0 to 1 */}
          <div className="flex justify-between mt-6 text-xs text-slate-500 font-bold">
            <span>0.0</span>
            <span>0.1</span>
            <span>0.2</span>
            <span>0.3</span>
            <span>0.4</span>
            <span>0.5</span>
            <span>0.6</span>
            <span>0.7</span>
            <span>0.8</span>
            <span>0.9</span>
            <span>1.0</span>
          </div>
        </div>
      </div>
    );
  }

  if (data.type === 'grid-100') {
    const targetCount = Array.isArray(data.value) ? data.value[0] : data.value;
    const [selected, setSelected] = useState<Set<number>>(new Set());

    const toggleSquare = (i: number) => {
      const next = new Set(selected);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      setSelected(next);
    };

    return (
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-white mb-1">Malha de Centésimos</h4>
            <p className="text-sm text-slate-400">Clique para pintar e descubra o valor decimal correspondente!</p>
          </div>
          <div className="bg-indigo-500/20 px-4 py-2 rounded-xl border border-indigo-500/30 text-center">
            <span className="block text-xs text-indigo-300 font-bold uppercase">Valor Atual</span>
            <span className="text-2xl font-black text-white">0,{(selected.size).toString().padStart(2, '0')}</span>
          </div>
        </div>

        <div className="grid grid-cols-10 gap-0.5 sm:gap-1 max-w-[300px] mx-auto p-2 bg-slate-800 rounded-xl">
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i}
              onClick={() => toggleSquare(i)}
              className={`aspect-square rounded-sm cursor-pointer transition-colors duration-200 
                ${selected.has(i) ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]' : 'bg-slate-700 hover:bg-slate-600'}`}
            />
          ))}
        </div>
        
        {selected.size === targetCount && (
          <div className="mt-6 text-center text-emerald-400 font-bold animate-pulse">
            ✨ Perfeito! Você representou {targetCount} centésimos (0,{targetCount.toString().padStart(2, '0')}) corretamente!
          </div>
        )}
      </div>
    );
  }

  if (data.type === 'grid-10') {
    const targetCount = Array.isArray(data.value) ? data.value[0] : data.value;
    const [selected, setSelected] = useState<Set<number>>(new Set());

    const toggleSquare = (i: number) => {
      const next = new Set(selected);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      setSelected(next);
    };

    return (
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-white mb-1">Malha de Décimos</h4>
            <p className="text-sm text-slate-400">Pinte as fatias para formar o número decimal.</p>
          </div>
          <div className="bg-emerald-500/20 px-4 py-2 rounded-xl border border-emerald-500/30 text-center">
            <span className="block text-xs text-emerald-300 font-bold uppercase">Valor Atual</span>
            <span className="text-2xl font-black text-white">0,{selected.size}</span>
          </div>
        </div>

        <div className="flex gap-1 max-w-full overflow-hidden p-2 bg-slate-800 rounded-xl h-24">
          {Array.from({ length: 10 }).map((_, i) => (
            <div 
              key={i}
              onClick={() => toggleSquare(i)}
              className={`flex-1 rounded-sm cursor-pointer transition-colors duration-200 
                ${selected.has(i) ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-slate-700 hover:bg-slate-600'}`}
            />
          ))}
        </div>
        
        {selected.size === targetCount && (
          <div className="mt-6 text-center text-emerald-400 font-bold animate-pulse">
            🎯 Muito bem! Você marcou {targetCount} décimos (0,{targetCount}).
          </div>
        )}
      </div>
    );
  }

  if (data.type === 'money-breakdown') {
    return (
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700 animate-in fade-in zoom-in-95 duration-300">
        <h4 className="font-bold text-white mb-6 text-center">Entendendo o Dinheiro como Decimais</h4>
        <div className="flex flex-col items-center gap-4">
          <div className="bg-emerald-500/20 px-8 py-4 rounded-2xl border-2 border-emerald-500/50 flex flex-col items-center">
            <span className="text-4xl font-black text-emerald-400">R$ 1,00</span>
            <div className="flex mt-2 gap-12 text-sm font-bold text-slate-300">
              <div className="flex flex-col items-center">
                <span className="text-indigo-400 text-lg">1</span>
                <span>Inteiro</span>
                <span className="text-xs text-slate-500">(Reais)</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-amber-400 text-lg">, 0 0</span>
                <span>Centésimos</span>
                <span className="text-xs text-slate-500">(Centavos)</span>
              </div>
            </div>
          </div>
          <div className="text-slate-400 text-sm italic mt-4 text-center">
            A vírgula separa a parte inteira (reais) da parte decimal (centavos).<br />
            "Centavo" significa a centésima parte de um real!
          </div>
        </div>
      </div>
    );
  }

  return null;
};
