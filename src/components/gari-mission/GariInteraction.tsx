import React, { useState } from 'react';
import { Ruler, Palette, Hexagon, PlayCircle, MapPin, CheckCircle, Trash2 } from 'lucide-react';

interface Props {
  type: 'path-draw' | 'measure' | 'paint' | 'cubes' | 'roulette';
  data: any;
  onComplete: () => void;
}

export const GariInteraction: React.FC<Props> = ({ type, data, onComplete }) => {
  const [completed, setCompleted] = useState(false);
  
  const handleComplete = () => {
    if (!completed) {
      setCompleted(true);
      onComplete();
    }
  };

  if (type === 'path-draw') {
    return <PathDrawInteraction onComplete={handleComplete} completed={completed} />;
  }

  if (type === 'measure') {
    return <MeasureInteraction onComplete={handleComplete} completed={completed} />;
  }

  if (type === 'paint') {
    return <PaintInteraction onComplete={handleComplete} completed={completed} data={data} />;
  }

  if (type === 'cubes') {
    return <CubesInteraction onComplete={handleComplete} completed={completed} />;
  }

  if (type === 'roulette') {
    return <RouletteInteraction onComplete={handleComplete} completed={completed} />;
  }

  return null;
};

// --- PATH DRAW INTERACTION (The Map) ---
const PathDrawInteraction = ({ onComplete, completed }: { onComplete: () => void, completed: boolean }) => {
  const gridSize = 5;
  const [path, setPath] = useState<number[]>([]);
  
  const handleCellClick = (index: number) => {
    if (completed) return;
    
    // Reset if clicking start
    if (path.length === 0) {
      setPath([index]);
      return;
    }
    
    const lastCell = path[path.length - 1];
    
    // Check adjacency (up, down, left, right)
    const row1 = Math.floor(lastCell / gridSize);
    const col1 = lastCell % gridSize;
    const row2 = Math.floor(index / gridSize);
    const col2 = index % gridSize;
    
    const isAdjacent = Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
    
    if (isAdjacent && !path.includes(index)) {
      const newPath = [...path, index];
      setPath(newPath);
      if (newPath.length >= 6) {
        onComplete();
      }
    } else if (index === lastCell) {
      // Undo last step
      setPath(path.slice(0, -1));
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0b1430] to-[#11224f] border-2 border-sky-400/50 rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_20px_rgba(56,189,248,0.2)]">
      <h3 className="text-white font-black mb-2 flex items-center justify-center gap-2 text-xl">
        <MapPin className="w-6 h-6 text-sky-400" />
        Trace a Rota do Gari
      </h3>
      <p className="text-sky-200/80 text-sm mb-6">
        Clique nos quarteirões adjacentes para desenhar o caminho. Siga até marcar 6 quarteirões!
      </p>
      
      <div className="relative mx-auto bg-[#8bb58b] border-4 border-slate-700 rounded-xl p-3 shadow-inner" style={{ width: '280px', height: '280px' }}>
        {/* Draw lines between path cells */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ padding: '12px' }}>
          {path.map((cell, i) => {
            if (i === 0) return null;
            const prevCell = path[i - 1];
            
            const cellW = 248 / gridSize;
            const cellH = 248 / gridSize;
            
            const x1 = (prevCell % gridSize) * cellW + cellW / 2;
            const y1 = Math.floor(prevCell / gridSize) * cellH + cellH / 2;
            const x2 = (cell % gridSize) * cellW + cellW / 2;
            const y2 = Math.floor(cell / gridSize) * cellH + cellH / 2;
            
            return (
              <line 
                key={`line-${i}`} 
                x1={x1} y1={y1} x2={x2} y2={y2} 
                stroke="#1e3a8a" strokeWidth="8" strokeLinecap="round" strokeDasharray="10, 5"
                className="animate-pulse"
              />
            );
          })}
        </svg>

        <div className="grid gap-2 h-full w-full relative z-20" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
          {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
            const isPath = path.includes(idx);
            const isStart = path[0] === idx;
            const isCurrent = path[path.length - 1] === idx;
            
            return (
              <button
                key={idx}
                onClick={() => handleCellClick(idx)}
                className={`w-full h-full rounded shadow-sm transition-all duration-200 flex items-center justify-center ${
                  isStart ? 'bg-sky-500 border-2 border-sky-200 scale-110 z-30' :
                  isCurrent ? 'bg-sky-400 border-2 border-white scale-110 z-30 shadow-[0_0_10px_rgba(56,189,248,0.8)]' :
                  isPath ? 'bg-sky-300 border border-sky-100' : 
                  'bg-[#c2d6c2] border border-[#a3c2a3] hover:bg-[#b0ccb0]'
                }`}
                aria-label={`Quarteirão ${idx + 1}`}
              >
                {isStart && <MapPin className="w-5 h-5 text-white" />}
                {!isStart && isPath && <div className="w-2 h-2 bg-blue-900 rounded-full" />}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="mt-6 flex justify-between items-center bg-slate-800/50 px-4 py-2 rounded-lg text-sky-200 text-xs font-bold uppercase tracking-wider">
        <span>Quarteirões: {path.length}/6</span>
        <button onClick={() => setPath([])} className="text-red-400 hover:text-red-300 flex items-center gap-1">
          <Trash2 className="w-4 h-4" /> Desfazer
        </button>
        {completed && <span className="text-emerald-400 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Finalizado!</span>}
      </div>
    </div>
  );
};

// --- MEASURE INTERACTION ---
const MeasureInteraction = ({ onComplete, completed }: { onComplete: () => void, completed: boolean }) => {
  const [rulerWidth, setRulerWidth] = useState(0);
  
  return (
    <div className="bg-gradient-to-b from-[#0b1430] to-[#11224f] border-2 border-emerald-400/50 rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_20px_rgba(52,211,153,0.2)]">
      <h3 className="text-white font-black mb-2 flex items-center justify-center gap-2 text-xl">
        <Ruler className="w-6 h-6 text-emerald-400" />
        Medindo a Rua
      </h3>
      <p className="text-emerald-100/80 text-sm mb-8">
        Arraste a ponta da régua amarela até medir exatamente a lixeira vermelha (12 cm).
      </p>
      
      <div className="relative w-full max-w-md mx-auto h-28 bg-slate-800/80 rounded-xl p-4 flex flex-col justify-end border border-slate-600 shadow-inner overflow-hidden">
        {/* Objeto */}
        <div className="absolute bottom-10 left-4 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-md border border-red-700 flex items-center justify-center shadow-lg" style={{ width: '60%' }}>
          <span className="text-white text-xs font-bold uppercase tracking-widest opacity-80">Caçamba</span>
        </div>
        
        {/* Régua */}
        <div className="absolute bottom-4 left-4 h-8 bg-yellow-400 rounded-sm border-2 border-yellow-600 flex shadow-md overflow-hidden transition-all duration-75" style={{ width: `${Math.max(10, rulerWidth)}%` }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-yellow-600/50 h-full flex flex-col justify-between">
              <div className="h-2 border-l border-yellow-800"></div>
              {i % 2 === 0 && <span className="text-[10px] text-yellow-900 font-bold self-start ml-1 leading-none">{i/2}</span>}
            </div>
          ))}
        </div>
      </div>

      <input 
        type="range" 
        min="0" 
        max="100" 
        value={rulerWidth} 
        className="w-full max-w-md mt-6 accent-emerald-400 h-4 rounded-lg appearance-none bg-slate-700 cursor-pointer shadow-inner"
        onChange={(e) => {
          const val = Number(e.target.value);
          setRulerWidth(val);
          if (val >= 58 && val <= 62 && !completed) {
            onComplete();
          }
        }}
      />
      <div className="mt-6 flex items-center justify-center gap-3 text-emerald-200 text-sm font-bold bg-emerald-900/30 w-max mx-auto px-6 py-2 rounded-full border border-emerald-500/30">
        Medida na Régua: <span className="text-2xl text-emerald-400">{Math.round(rulerWidth / 5)} cm</span>
      </div>
    </div>
  );
};

// --- PAINT INTERACTION ---
const PaintInteraction = ({ onComplete, completed, data }: { onComplete: () => void, completed: boolean, data: any }) => {
  const total = data.totalRegions || 15;
  const target = data.paintedRegions || 6;
  const [activeCells, setActiveCells] = useState<number[]>([]);
  
  const togglePaint = (index: number) => {
    if (completed) return;
    const newCells = [...activeCells];
    if (newCells.includes(index)) {
      newCells.splice(newCells.indexOf(index), 1);
    } else {
      newCells.push(index);
    }
    setActiveCells(newCells);
    if (newCells.length >= target) {
      onComplete();
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#0b1430] to-[#11224f] border-2 border-pink-400/50 rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_20px_rgba(244,114,182,0.2)]">
      <h3 className="text-white font-black mb-2 flex items-center justify-center gap-2 text-xl">
        <Palette className="w-6 h-6 text-pink-400" />
        Pintando Canteiros
      </h3>
      <p className="text-pink-100/80 text-sm mb-6">
        Clique para gramar as áreas de terra. Pinte {target} áreas para terminar.
      </p>
      
      <div className="flex flex-wrap justify-center gap-2 max-w-xs sm:max-w-md mx-auto bg-slate-800 p-4 rounded-xl border-2 border-slate-600 shadow-inner">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => togglePaint(idx)}
            className={`w-12 h-12 rounded-lg border-2 transition-all duration-300 transform ${
              activeCells.includes(idx)
                ? 'bg-green-500 border-green-300 scale-105 rotate-3 shadow-[0_0_15px_rgba(34,197,94,0.6)]'
                : 'bg-amber-900 border-amber-700 hover:border-green-500/50'
            }`}
          />
        ))}
      </div>
      
      <div className="mt-6 flex justify-between items-center max-w-md mx-auto text-pink-200 text-xs font-bold uppercase tracking-wider bg-pink-900/30 px-4 py-2 rounded-lg border border-pink-500/30">
        <span>Grama plantada: {activeCells.length} de {target}</span>
        {completed && <span className="text-green-400 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Excelente!</span>}
      </div>
    </div>
  );
};

// --- CUBES INTERACTION ---
const CubesInteraction = ({ onComplete, completed }: { onComplete: () => void, completed: boolean }) => {
  const [rotation, setRotation] = useState({ x: -20, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastPos.x;
    const deltaY = e.clientY - lastPos.y;
    setRotation({
      x: rotation.x - deltaY * 0.5,
      y: rotation.y + deltaX * 0.5
    });
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    onComplete();
  };

  return (
    <div className="bg-gradient-to-b from-[#0b1430] to-[#11224f] border-2 border-amber-400/50 rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_20px_rgba(251,191,36,0.2)] select-none">
      <h3 className="text-white font-black mb-2 flex items-center justify-center gap-2 text-xl">
        <Hexagon className="w-6 h-6 text-amber-400" />
        Visualizador 3D de Blocos
      </h3>
      <p className="text-amber-100/80 text-sm mb-6">
        Clique e arraste para girar a estrutura e ver como os blocos duplos se encaixam!
      </p>
      
      <div 
        className="relative w-64 h-64 mx-auto perspective-[800px] cursor-grab active:cursor-grabbing bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <div 
          className="w-full h-full absolute transform-style-3d transition-transform duration-75"
          style={{ transform: `translateZ(-50px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
        >
          {/* Central Cube representing 2 connected blocks */}
          <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
            <div className="relative w-20 h-20 transform-style-3d">
              {/* Back */}
              <div className="absolute inset-0 bg-amber-600/90 border-2 border-amber-800" style={{ transform: 'translateZ(-40px)' }}></div>
              {/* Front */}
              <div className="absolute inset-0 bg-amber-400/90 border-2 border-amber-600" style={{ transform: 'translateZ(40px)' }}></div>
              {/* Right */}
              <div className="absolute inset-0 bg-amber-500/90 border-2 border-amber-700" style={{ transform: 'rotateY(90deg) translateZ(40px)' }}></div>
              {/* Left */}
              <div className="absolute inset-0 bg-amber-700/90 border-2 border-amber-900" style={{ transform: 'rotateY(-90deg) translateZ(40px)' }}></div>
              {/* Top */}
              <div className="absolute inset-0 bg-amber-300/90 border-2 border-amber-500" style={{ transform: 'rotateX(90deg) translateZ(40px)' }}></div>
              {/* Bottom */}
              <div className="absolute inset-0 bg-amber-800/90 border-2 border-amber-950" style={{ transform: 'rotateX(-90deg) translateZ(40px)' }}></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 left-0 right-0 text-amber-500/50 text-xs font-bold">Arraste para girar</div>
      </div>
      
      {completed && <p className="mt-6 text-amber-400 font-bold bg-amber-900/30 py-2 rounded-lg border border-amber-500/30">Análise concluída!</p>}
    </div>
  );
};

// --- ROULETTE INTERACTION ---
const RouletteInteraction = ({ onComplete, completed }: { onComplete: () => void, completed: boolean }) => {
  const [spinning, setSpinning] = useState(false);
  const [spinDegree, setSpinDegree] = useState(0);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    const newDegree = spinDegree + (360 * 5) + Math.floor(Math.random() * 360);
    setSpinDegree(newDegree);
    
    setTimeout(() => {
      setSpinning(false);
      onComplete();
    }, 4000);
  };

  return (
    <div className="bg-gradient-to-b from-[#0b1430] to-[#11224f] border-2 border-purple-400/50 rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_20px_rgba(168,85,247,0.2)]">
      <h3 className="text-white font-black mb-2 flex items-center justify-center gap-2 text-xl">
        <PlayCircle className="w-6 h-6 text-purple-400" />
        Sorteio das Tarefas
      </h3>
      <p className="text-purple-100/80 text-sm mb-8">
        Gire a roleta para ver a probabilidade ao vivo. Onde será que vai parar?
      </p>
      
      <div className="relative w-56 h-56 mx-auto mb-8">
        {/* Pointer */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-white z-20 filter drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"></div>
        
        {/* Wheel container */}
        <div className="w-full h-full rounded-full border-8 border-slate-800 relative shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-slate-900">
          <div 
            className="w-full h-full rounded-full overflow-hidden absolute inset-0"
            style={{ 
              transform: `rotate(${spinDegree}deg)`, 
              transition: 'transform 4s cubic-bezier(0.1, 0.9, 0.2, 1)' 
            }}
          >
            {/* The 6 slices (3 varrição, 2 pintura, 1 lavar) */}
            <div className="absolute inset-0" style={{
              background: `conic-gradient(
                #3b82f6 0deg 180deg,    /* 3 fatias Azuis (Varrer) */
                #ec4899 180deg 300deg,  /* 2 fatias Rosas (Pintar) */
                #f59e0b 300deg 360deg   /* 1 fatia Laranja (Lavar) */
              )`
            }}></div>
            
            {/* Lines separating slices */}
            <div className="absolute inset-0 rotate-0 w-full h-[2px] bg-slate-900 top-1/2 -translate-y-1/2"></div>
            <div className="absolute inset-0 rotate-60 w-full h-[2px] bg-slate-900 top-1/2 -translate-y-1/2"></div>
            <div className="absolute inset-0 rotate-120 w-full h-[2px] bg-slate-900 top-1/2 -translate-y-1/2"></div>
          </div>
          
          {/* Center Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full z-10 border-4 border-slate-600 shadow-xl"></div>
        </div>
      </div>
      
      <button 
        onClick={handleSpin}
        disabled={spinning}
        className="px-8 py-4 bg-gradient-to-b from-purple-500 to-purple-700 text-white font-black uppercase tracking-wider rounded-2xl hover:from-purple-400 hover:to-purple-600 transition shadow-[0_6px_0_#581c87] active:shadow-[0_0px_0_#581c87] active:translate-y-1 disabled:opacity-50 disabled:shadow-[0_0px_0_#581c87] disabled:translate-y-1 text-lg"
      >
        {spinning ? 'Girando...' : completed ? 'Girar de Novo' : 'Girar Roleta'}
      </button>

      <div className="mt-6 flex justify-center gap-4 text-xs font-bold">
        <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Varrer (3/6)</span>
        <span className="flex items-center gap-1"><div className="w-3 h-3 bg-pink-500 rounded-sm"></div> Pintar (2/6)</span>
        <span className="flex items-center gap-1"><div className="w-3 h-3 bg-amber-500 rounded-sm"></div> Lavar (1/6)</span>
      </div>
    </div>
  );
};
