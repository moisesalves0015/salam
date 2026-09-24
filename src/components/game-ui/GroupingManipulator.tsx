import React, { useState } from 'react';
import { Sparkles, Package, RefreshCw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GroupingManipulatorProps {
  totalItems: number;
  groupsCount: number;
  mode?: 'division' | 'multiplication'; // default division
  onComplete?: () => void;
}

export const GroupingManipulator: React.FC<GroupingManipulatorProps> = ({ 
  totalItems, 
  groupsCount, 
  mode = 'division',
  onComplete 
}) => {
  const [distributedItems, setDistributedItems] = useState<number[]>(Array(groupsCount).fill(0));
  const [completed, setCompleted] = useState(false);
  
  const itemsPerGroup = Math.floor(totalItems / groupsCount);
  const remainder = totalItems % groupsCount;

  const totalDistributed = distributedItems.reduce((a, b) => a + b, 0);
  const remainingItems = totalItems - totalDistributed;

  const handleDistribute = (groupIndex: number) => {
    if (remainingItems > 0 && distributedItems[groupIndex] < itemsPerGroup) {
      const newDistribution = [...distributedItems];
      newDistribution[groupIndex]++;
      setDistributedItems(newDistribution);
      
      if (remainingItems - 1 === remainder) {
        setCompleted(true);
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
        if (onComplete) setTimeout(onComplete, 1000);
      }
    }
  };

  const handleReset = () => {
    setDistributedItems(Array(groupsCount).fill(0));
    setCompleted(false);
  };

  const handleAutoDistribute = () => {
    setDistributedItems(Array(groupsCount).fill(itemsPerGroup));
    setCompleted(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    if (onComplete) setTimeout(onComplete, 1000);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col items-center">
      <div className="flex items-center justify-between w-full mb-6">
        <div>
          <h3 className="font-fredoka text-lg font-bold text-slate-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-500" />
            {mode === 'division' ? 'Divisão em Grupos' : 'Agrupamento (Multiplicação)'}
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            {mode === 'division' 
              ? `Distribua ${totalItems} itens em ${groupsCount} grupos iguais.`
              : `Forme ${groupsCount} grupos com ${itemsPerGroup} itens cada.`}
          </p>
        </div>
        <button 
          onClick={handleReset}
          className="p-2 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-colors active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Pool of Remaining Items */}
      <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-6 flex flex-col items-center">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Para Distribuir</div>
        <div className="flex flex-wrap justify-center gap-1.5 min-h-[40px]">
          {Array.from({ length: remainingItems }).map((_, i) => (
            <div key={i} className="animate-in fade-in zoom-in duration-200">
              <Sparkles className="w-6 h-6 text-amber-400 fill-amber-300 drop-shadow-sm" />
            </div>
          ))}
          {remainingItems === 0 && (
            <div className="text-sm font-bold text-emerald-500 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Todos distribuídos!
            </div>
          )}
        </div>
      </div>

      {/* Groups Container */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
        {distributedItems.map((count, index) => (
          <button
            key={index}
            onClick={() => handleDistribute(index)}
            disabled={count >= itemsPerGroup || remainingItems === 0}
            className={`
              relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center min-h-[120px]
              ${count === itemsPerGroup 
                ? 'bg-emerald-50 border-emerald-200 shadow-inner' 
                : 'bg-white border-slate-200 shadow-sm hover:border-purple-300 hover:bg-purple-50 active:scale-95 cursor-pointer'}
              ${count >= itemsPerGroup || remainingItems === 0 ? 'cursor-default' : ''}
            `}
          >
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Grupo {index + 1}</div>
            
            <div className="flex-1 flex flex-wrap content-center justify-center gap-1">
              {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="animate-in zoom-in spin-in-12 duration-300">
                  <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400 drop-shadow-sm" />
                </div>
              ))}
              {count === 0 && <span className="text-xs text-slate-300 italic self-center">Vazio</span>}
            </div>

            <div className={`mt-2 text-xs font-bold px-2 py-0.5 rounded-full ${count === itemsPerGroup ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
              {count} / {itemsPerGroup}
            </div>
          </button>
        ))}
      </div>

      {/* Auto Distribute helper for debugging/laziness */}
      {remainingItems > 0 && (
        <button 
          onClick={handleAutoDistribute}
          className="mt-6 text-xs font-bold text-purple-500 hover:text-purple-700 underline underline-offset-4 opacity-50 hover:opacity-100 transition-opacity"
        >
          Distribuir Automaticamente
        </button>
      )}
    </div>
  );
};
