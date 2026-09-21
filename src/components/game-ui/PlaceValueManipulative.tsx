import React, { useState } from 'react';
import { PlaceValueBlock } from '../../types';
import { Layers, Box, Square, Grid, Sparkles, RefreshCw } from 'lucide-react';

interface PlaceValueProps {
  initialBlocks?: PlaceValueBlock;
  targetNumber?: number;
  interactive?: boolean;
}

export const PlaceValueManipulative: React.FC<PlaceValueProps> = ({
  initialBlocks = { thousands: 0, hundreds: 2, tens: 4, units: 6 },
  interactive = false
}) => {
  const [blocks, setBlocks] = useState<PlaceValueBlock>(initialBlocks);

  const calculateTotal = (b: PlaceValueBlock) => {
    return b.thousands * 1000 + b.hundreds * 100 + b.tens * 10 + b.units;
  };

  const addUnit = () => {
    setBlocks(prev => {
      const newU = prev.units + 1;
      // Auto-regroup 10 units into 1 ten if child wants!
      if (newU >= 10) {
        return { ...prev, units: 0, tens: prev.tens + 1 };
      }
      return { ...prev, units: newU };
    });
  };

  const addTen = () => {
    setBlocks(prev => {
      const newT = prev.tens + 1;
      if (newT >= 10) {
        return { ...prev, tens: 0, hundreds: prev.hundreds + 1 };
      }
      return { ...prev, tens: newT };
    });
  };

  const addHundred = () => {
    setBlocks(prev => {
      const newH = prev.hundreds + 1;
      if (newH >= 10) {
        return { ...prev, hundreds: 0, thousands: prev.thousands + 1 };
      }
      return { ...prev, hundreds: newH };
    });
  };

  const reset = () => {
    setBlocks(initialBlocks);
  };

  const currentTotal = calculateTotal(blocks);

  return (
    <div className="w-full bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-md">
      {/* Header and Total Value Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
        <div>
          <h4 className="font-fredoka text-slate-800 text-lg font-bold flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            Material Dourado Virtual (Base 10)
          </h4>
          <p className="text-xs text-slate-500 font-sans">
            Veja as peças que formam cada ordem do número!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
            <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block">Total Formado</span>
            <span className="font-mono text-2xl font-black text-emerald-800 tracking-wider">
              {currentTotal.toLocaleString('pt-BR')}
            </span>
          </div>
          {interactive && (
            <button
              onClick={reset}
              title="Reiniciar peças"
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Grid of the 4 Orders */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Unidade de Milhar (1000) */}
        <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3 flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 text-indigo-900 font-fredoka font-bold text-sm mb-2">
            <Box className="w-4 h-4 text-indigo-600" />
            Cubão de 1.000
          </div>
          <div className="min-h-16 flex items-center justify-center flex-wrap gap-1 my-1">
            {blocks.thousands === 0 ? (
              <span className="text-xs text-slate-400 italic">0 milhares</span>
            ) : (
              Array.from({ length: blocks.thousands }).map((_, i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-indigo-500 rounded border-2 border-indigo-700 shadow flex items-center justify-center text-white text-xs font-bold font-mono"
                >
                  1k
                </div>
              ))
            )}
          </div>
          <div className="mt-auto w-full pt-2 border-t border-indigo-100 text-xs font-semibold text-indigo-800">
            {blocks.thousands} × 1.000 = {blocks.thousands * 1000}
          </div>
        </div>

        {/* Centenas (100) */}
        <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-3 flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 text-purple-900 font-fredoka font-bold text-sm mb-2">
            <Square className="w-4 h-4 text-purple-600" />
            Placas de 100
          </div>
          <div className="min-h-16 flex items-center justify-center flex-wrap gap-1 my-1">
            {blocks.hundreds === 0 ? (
              <span className="text-xs text-slate-400 italic">0 centenas</span>
            ) : (
              Array.from({ length: Math.min(blocks.hundreds, 9) }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-amber-400 rounded border border-amber-600 shadow-sm flex items-center justify-center text-[10px] font-bold text-amber-900"
                >
                  100
                </div>
              ))
            )}
          </div>
          <div className="mt-auto w-full pt-2 border-t border-purple-100 text-xs font-semibold text-purple-800 flex items-center justify-between">
            <span>{blocks.hundreds} × 100 = {blocks.hundreds * 100}</span>
            {interactive && (
              <button
                onClick={addHundred}
                className="px-2 py-0.5 bg-purple-200 hover:bg-purple-300 rounded text-purple-900 font-bold text-xs"
              >
                +
              </button>
            )}
          </div>
        </div>

        {/* Dezenas (10) */}
        <div className="bg-sky-50/70 border border-sky-200 rounded-xl p-3 flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 text-sky-900 font-fredoka font-bold text-sm mb-2">
            <Grid className="w-4 h-4 text-sky-600" />
            Barras de 10
          </div>
          <div className="min-h-16 flex items-center justify-center flex-wrap gap-1 my-1">
            {blocks.tens === 0 ? (
              <span className="text-xs text-slate-400 italic">0 dezenas</span>
            ) : (
              Array.from({ length: Math.min(blocks.tens, 9) }).map((_, i) => (
                <div
                  key={i}
                  className="w-2.5 h-10 bg-amber-500 rounded-sm border border-amber-700 shadow-xs"
                  title="1 barra = 10"
                />
              ))
            )}
          </div>
          <div className="mt-auto w-full pt-2 border-t border-sky-100 text-xs font-semibold text-sky-800 flex items-center justify-between">
            <span>{blocks.tens} × 10 = {blocks.tens * 10}</span>
            {interactive && (
              <button
                onClick={addTen}
                className="px-2 py-0.5 bg-sky-200 hover:bg-sky-300 rounded text-sky-900 font-bold text-xs"
              >
                +
              </button>
            )}
          </div>
        </div>

        {/* Unidades (1) */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex flex-col items-center text-center">
          <div className="flex items-center gap-1.5 text-emerald-900 font-fredoka font-bold text-sm mb-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Cubinhos de 1
          </div>
          <div className="min-h-16 flex items-center justify-center flex-wrap gap-1 my-1 max-w-[120px]">
            {blocks.units === 0 ? (
              <span className="text-xs text-slate-400 italic">0 unidades</span>
            ) : (
              Array.from({ length: Math.min(blocks.units, 9) }).map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-amber-400 rounded-xs border border-amber-600 shadow-xs"
                  title="1 cubinho = 1 unidade"
                />
              ))
            )}
          </div>
          <div className="mt-auto w-full pt-2 border-t border-emerald-100 text-xs font-semibold text-emerald-800 flex items-center justify-between">
            <span>{blocks.units} × 1 = {blocks.units}</span>
            {interactive && (
              <button
                onClick={addUnit}
                className="px-2 py-0.5 bg-emerald-200 hover:bg-emerald-300 rounded text-emerald-900 font-bold text-xs"
              >
                +
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Decomposed mathematical notation */}
      <div className="mt-4 p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-center font-mono font-bold text-slate-700 text-sm">
        {blocks.thousands > 0 && `${blocks.thousands * 1000} + `}
        {blocks.hundreds > 0 && `${blocks.hundreds * 100} + `}
        {blocks.tens > 0 && `${blocks.tens * 10} + `}
        {blocks.units} = <span className="text-blue-600 font-black">{currentTotal}</span>
      </div>
    </div>
  );
};
