import React, { useState } from 'react';
import { Ruler, Palette, Hexagon, PlayCircle, MapPin, Grid as GridIcon } from 'lucide-react';

interface Props {
  type: 'path-draw' | 'measure' | 'paint' | 'cubes' | 'roulette';
  data: any;
  onComplete: () => void;
}

export const GariInteraction: React.FC<Props> = ({ type, data, onComplete }) => {
  const [completed, setCompleted] = useState(false);
  const [activeCells, setActiveCells] = useState<number[]>([]);
  const [rulerWidth, setRulerWidth] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [spinDegree, setSpinDegree] = useState(0);

  const handleComplete = () => {
    if (!completed) {
      setCompleted(true);
      onComplete();
    }
  };

  if (type === 'path-draw') {
    const gridSize = 5;
    const totalCells = gridSize * gridSize;
    
    const toggleCell = (index: number) => {
      if (completed) return;
      
      const newCells = [...activeCells];
      if (newCells.includes(index)) {
        newCells.splice(newCells.indexOf(index), 1);
      } else {
        newCells.push(index);
      }
      
      setActiveCells(newCells);
      
      // If they clicked at least 5 cells, consider it complete for the sake of interaction
      if (newCells.length >= 5 && !completed) {
        handleComplete();
      }
    };

    return (
      <div className="bg-[#0b1430] border-2 border-sky-400/50 rounded-2xl p-4 sm:p-6 text-center">
        <h3 className="text-white font-black mb-4 flex items-center justify-center gap-2">
          <MapPin className="w-5 h-5 text-sky-400" />
          Trace o Caminho do Gari na Malha
        </h3>
        <p className="text-sky-100/80 text-sm mb-4">Clique nos quadradinhos para formar o trajeto. (Marque pelo menos 5 quadras para completar)</p>
        
        <div 
          className="mx-auto bg-slate-800 border-2 border-slate-600 rounded-lg p-2" 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gap: '4px',
            width: '250px',
            height: '250px'
          }}
        >
          {Array.from({ length: totalCells }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => toggleCell(idx)}
              className={`w-full h-full rounded transition-colors ${
                activeCells.includes(idx) 
                  ? 'bg-sky-400 border border-sky-200' 
                  : 'bg-slate-700 hover:bg-slate-600 border border-slate-500/50'
              }`}
              aria-label={`Quadra ${idx + 1}`}
            />
          ))}
        </div>
        
        <div className="mt-4 flex justify-between text-sky-200 text-xs font-bold uppercase tracking-wider">
          <span>Quadras marcadas: {activeCells.length}</span>
          {completed && <span className="text-emerald-400">Trajeto Finalizado!</span>}
        </div>
      </div>
    );
  }

  if (type === 'measure') {
    return (
      <div className="bg-[#0b1430] border-2 border-emerald-400/50 rounded-2xl p-4 sm:p-6 text-center">
        <h3 className="text-white font-black mb-4 flex items-center justify-center gap-2">
          <Ruler className="w-5 h-5 text-emerald-400" />
          Medição Interativa
        </h3>
        <p className="text-emerald-100/80 text-sm mb-6">Deslize a régua amarela até cobrir todo o objeto azul (Ajuste para 10 cm).</p>
        
        <div className="relative w-full max-w-md mx-auto h-24 bg-slate-800 rounded-xl p-4 flex flex-col justify-center">
          {/* Objeto a ser medido */}
          <div className="absolute top-4 left-4 h-4 bg-blue-500 rounded-sm" style={{ width: '60%' }}></div>
          <span className="absolute top-2 left-1/2 text-xs text-blue-200">Objeto</span>
          
          {/* Régua */}
          <div className="absolute bottom-4 left-4 h-6 bg-yellow-500 rounded-sm overflow-hidden flex" style={{ width: `${Math.max(10, rulerWidth)}%` }}>
            {/* Marcações da régua */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="flex-1 border-r border-yellow-700 h-full text-[8px] text-yellow-900 font-bold pt-1">
                {i % 2 === 0 ? i/2 : ''}
              </div>
            ))}
          </div>
        </div>

        <input 
          type="range" 
          min="0" 
          max="100" 
          value={rulerWidth} 
          className="w-full max-w-md mt-6 accent-emerald-400 h-3 rounded-lg appearance-none bg-slate-700 cursor-pointer"
          onChange={(e) => {
            const val = Number(e.target.value);
            setRulerWidth(val);
            if (val >= 58 && val <= 62 && !completed) {
              handleComplete();
            }
          }}
        />
        <div className="mt-4 text-emerald-200 text-sm font-bold">
          Medida da régua: <span className="text-xl text-emerald-400">{Math.round(rulerWidth / 6)} cm</span>
        </div>
      </div>
    );
  }

  if (type === 'paint') {
    const total = data.totalRegions || 10;
    
    const togglePaint = (index: number) => {
      if (completed) return;
      const newCells = [...activeCells];
      if (newCells.includes(index)) {
        newCells.splice(newCells.indexOf(index), 1);
      } else {
        newCells.push(index);
      }
      setActiveCells(newCells);
      
      if (newCells.length >= (data.paintedRegions || 4) && !completed) {
        handleComplete();
      }
    };

    return (
      <div className="bg-[#0b1430] border-2 border-pink-400/50 rounded-2xl p-4 sm:p-6 text-center">
        <h3 className="text-white font-black mb-4 flex items-center justify-center gap-2">
          <Palette className="w-5 h-5 text-pink-400" />
          Pinte as Áreas da Praça
        </h3>
        <p className="text-pink-100/80 text-sm mb-4">Clique nas regiões abaixo para pintá-las (Pinte {data.paintedRegions || 4} regiões).</p>
        
        <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
          {Array.from({ length: total }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => togglePaint(idx)}
              className={`w-12 h-12 rounded-lg border-2 transition-all duration-300 ${
                activeCells.includes(idx)
                  ? 'bg-pink-500 border-pink-300 scale-105 shadow-[0_0_10px_rgba(236,72,153,0.6)]'
                  : 'bg-slate-800 border-slate-600 hover:border-pink-500/50'
              }`}
            />
          ))}
        </div>
        
        <div className="mt-4 flex justify-between items-center max-w-md mx-auto text-pink-200 text-xs font-bold uppercase tracking-wider">
          <span>Áreas pintadas: {activeCells.length} de {total}</span>
          {completed && <span className="text-pink-400 px-3 py-1 bg-pink-500/20 rounded-lg">Excelente!</span>}
        </div>
      </div>
    );
  }

  if (type === 'cubes') {
    return (
      <div className="bg-[#0b1430] border-2 border-amber-400/50 rounded-2xl p-4 sm:p-6 text-center">
        <h3 className="text-white font-black mb-4 flex items-center justify-center gap-2">
          <Hexagon className="w-5 h-5 text-amber-400" />
          Laboratório 3D do Gari
        </h3>
        <p className="text-amber-100/80 text-sm mb-6">Analise como os blocos se encaixam. (Clique para visualizar peças)</p>
        
        <div className="relative w-48 h-48 mx-auto perspective-1000">
          <div className="w-full h-full absolute transition-transform duration-700 transform-style-3d hover:rotate-y-180 cursor-pointer" onClick={handleComplete}>
            {/* Front face (simulated cubes) */}
            <div className="absolute inset-0 bg-amber-600/20 border-2 border-amber-500 rounded-xl flex flex-wrap p-2 gap-2 justify-center items-center backdrop-blur-sm">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="w-16 h-8 bg-amber-500 border border-amber-300 rounded shadow-sm"></div>
              ))}
              <span className="w-full text-amber-200 font-bold text-xs mt-2">Clique para inspecionar</span>
            </div>
          </div>
        </div>
        
        {completed && <p className="mt-6 text-amber-400 font-bold">Análise concluída!</p>}
      </div>
    );
  }

  if (type === 'roulette') {
    const handleSpin = () => {
      if (spinning) return;
      setSpinning(true);
      // Spin between 3 and 5 full rotations + random offset
      const newDegree = spinDegree + (360 * 4) + Math.floor(Math.random() * 360);
      setSpinDegree(newDegree);
      
      setTimeout(() => {
        setSpinning(false);
        handleComplete();
      }, 3000);
    };

    return (
      <div className="bg-[#0b1430] border-2 border-purple-400/50 rounded-2xl p-4 sm:p-6 text-center">
        <h3 className="text-white font-black mb-4 flex items-center justify-center gap-2">
          <PlayCircle className="w-5 h-5 text-purple-400" />
          Roleta das Tarefas
        </h3>
        <p className="text-purple-100/80 text-sm mb-6">Gire a roleta para ver qual tarefa tem maior probabilidade de sair!</p>
        
        <div className="relative w-48 h-48 mx-auto mb-6">
          {/* Seta indicadora */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-white z-10"></div>
          
          {/* Disco da roleta */}
          <div 
            className="w-full h-full rounded-full border-4 border-slate-700 overflow-hidden relative shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            style={{ 
              transform: `rotate(${spinDegree}deg)`, 
              transition: 'transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)' 
            }}
          >
            {/* Simulando fatias (conic-gradient) */}
            <div className="absolute inset-0" style={{
              background: 'conic-gradient(#a855f7 0deg 180deg, #3b82f6 180deg 270deg, #ec4899 270deg 360deg)'
            }}></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-slate-800 rounded-full z-10 border-2 border-slate-600"></div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleSpin}
          disabled={spinning}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-black uppercase tracking-wider rounded-xl hover:from-purple-500 hover:to-fuchsia-500 transition shadow-lg disabled:opacity-50"
        >
          {spinning ? 'Girando...' : completed ? 'Girar Novamente' : 'Girar Roleta'}
        </button>
      </div>
    );
  }

  return null;
};
