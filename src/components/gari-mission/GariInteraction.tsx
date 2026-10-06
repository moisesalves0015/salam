import React, { useState, useEffect } from 'react';
import { Ruler, Palette, Hexagon, PlayCircle, MapPin, CheckCircle, Trash2, Info, BookOpen } from 'lucide-react';

interface Props {
  type: string; // 'path-draw' | 'measure' | 'paint' | 'cubes' | 'roulette' | 'demo-path' | 'demo-perimeter' | 'demo-area' | 'demo-prob';
  data: any;
  onComplete?: () => void;
}

export const GariInteraction: React.FC<Props> = ({ type, data, onComplete }) => {
  const [completed, setCompleted] = useState(false);
  
  const handleComplete = () => {
    if (!completed) {
      setCompleted(true);
      if (onComplete) onComplete();
    }
  };

  // ── DIDACTIC DEMOS (Read-only, illustrative) ──
  
  if (type === 'demo-path') {
    return (
      <div className="bg-slate-800/80 border-2 border-sky-500/30 rounded-2xl p-6 text-center shadow-lg mb-6">
        <h4 className="text-sky-300 font-bold mb-4 flex items-center justify-center gap-2">
          <BookOpen className="w-5 h-5" /> O que é um Trajeto?
        </h4>
        <div className="text-left text-slate-300 text-sm space-y-3 mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
          <p>Um <strong>trajeto</strong> é o caminho percorrido de um ponto a outro.</p>
          <p>Na malha quadriculada, cada "lado" do quadradinho representa uma quadra da rua. Para contar o trajeto, começamos no ponto de partida e contamos <strong>cada lado</strong> até virar a esquina.</p>
        </div>
        <div className="relative w-48 h-48 mx-auto bg-[#c2d6c2] border-4 border-slate-600 rounded-xl p-2">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-2">
            {Array.from({length: 9}).map((_, i) => <div key={i} className="bg-[#a3c2a3] rounded-sm opacity-50"></div>)}
          </div>
          {/* Animated Path */}
          <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100">
            <path 
              d="M 16 16 L 82 16 L 82 50 L 50 50" 
              fill="none" 
              stroke="#0284c7" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              strokeDasharray="200"
              className="animate-[dash_3s_ease-in-out_infinite]"
            />
            <circle cx="16" cy="16" r="6" fill="#0ea5e9" className="animate-pulse" />
            <circle cx="50" cy="50" r="6" fill="#ef4444" />
          </svg>
          <style>{`
            @keyframes dash {
              0% { stroke-dashoffset: 200; }
              50% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: 200; }
            }
          `}</style>
        </div>
        <p className="mt-4 text-xs text-sky-200 font-bold">Exemplo: 2 quadras para a direita, 1 para baixo, 1 para a esquerda.</p>
      </div>
    );
  }

  if (type === 'demo-perimeter') {
    return (
      <div className="bg-slate-800/80 border-2 border-amber-500/30 rounded-2xl p-6 text-center shadow-lg mb-6">
        <h4 className="text-amber-300 font-bold mb-4 flex items-center justify-center gap-2">
          <BookOpen className="w-5 h-5" /> Entendendo o Perímetro
        </h4>
        <div className="text-left text-slate-300 text-sm space-y-3 mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
          <p>O <strong>Perímetro</strong> é a medida do contorno de uma figura. É como se você esticasse uma fita ao redor de todo o espaço.</p>
          <p>Para calcular, você deve <strong>somar todos os lados externos</strong>.</p>
        </div>
        <div className="relative w-64 h-40 mx-auto bg-slate-700 border-2 border-slate-600 rounded-xl flex items-center justify-center overflow-hidden">
          <div className="relative w-32 h-20 bg-emerald-900/50 border-4 border-dashed border-amber-400">
            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-amber-300 font-bold text-sm">6 m</span>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-amber-300 font-bold text-sm">6 m</span>
            <span className="absolute top-1/2 -left-8 -translate-y-1/2 text-amber-300 font-bold text-sm">3 m</span>
            <span className="absolute top-1/2 -right-8 -translate-y-1/2 text-amber-300 font-bold text-sm">3 m</span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-amber-900/30 rounded-lg inline-block border border-amber-500/30">
          <p className="text-amber-200 text-sm font-mono font-bold">6 + 3 + 6 + 3 = 18 m</p>
        </div>
      </div>
    );
  }

  if (type === 'demo-area') {
    return (
      <div className="bg-slate-800/80 border-2 border-emerald-500/30 rounded-2xl p-6 text-center shadow-lg mb-6">
        <h4 className="text-emerald-300 font-bold mb-4 flex items-center justify-center gap-2">
          <BookOpen className="w-5 h-5" /> Entendendo a Área
        </h4>
        <div className="text-left text-slate-300 text-sm space-y-3 mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
          <p>A <strong>Área</strong> é o espaço interno de uma figura. É a superfície total que ela cobre.</p>
          <p>Na malha, calculamos a área <strong>contando a quantidade de quadradinhos internos</strong>. No retângulo, basta multiplicar Comprimento × Largura.</p>
        </div>
        <div className="relative w-48 h-32 mx-auto grid grid-cols-6 grid-rows-4 gap-[1px] bg-emerald-900 border-2 border-emerald-500 p-[1px]">
          {Array.from({length: 24}).map((_, i) => (
            <div key={i} className="bg-emerald-500/40 w-full h-full flex items-center justify-center text-[8px] text-emerald-200/50">1m²</div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-slate-900/80 px-3 py-1 rounded-lg text-emerald-300 font-black text-sm border border-emerald-500">6 × 4 = 24 m²</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'demo-prob') {
    return (
      <div className="bg-slate-800/80 border-2 border-purple-500/30 rounded-2xl p-6 text-center shadow-lg mb-6">
        <h4 className="text-purple-300 font-bold mb-4 flex items-center justify-center gap-2">
          <BookOpen className="w-5 h-5" /> O que é Probabilidade?
        </h4>
        <div className="text-left text-slate-300 text-sm space-y-3 mb-6 bg-slate-900/50 p-4 rounded-xl border border-slate-700">
          <p><strong>Probabilidade</strong> é a matemática de medir o quanto algo tem chance de acontecer.</p>
          <p>Comparamos o que queremos que aconteça (Casos Favoráveis) com TUDO o que pode acontecer (Total de Casos).</p>
        </div>
        <div className="flex justify-center items-center gap-6">
          <div className="flex flex-wrap w-32 gap-2 bg-slate-700 p-3 rounded-xl border border-slate-600">
            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
            <div className="w-6 h-6 bg-red-500 rounded-full"></div>
          </div>
          <div className="text-left">
            <p className="text-blue-300 font-bold">Bolas Azuis: 3</p>
            <p className="text-red-300 font-bold">Bolas Vermelhas: 2</p>
            <p className="text-slate-300 font-bold mt-2 border-t border-slate-600 pt-2">Total: 5</p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-purple-900/30 rounded-lg inline-block border border-purple-500/30">
          <p className="text-purple-200 text-sm font-bold">Chance de tirar Azul: 3 em 5 (ou 3/5)</p>
        </div>
      </div>
    );
  }

  // ── ACTIVE INTERACTIONS (The ones the user plays with) ──

  if (type === 'path-draw') {
    return <PathDrawInteraction onComplete={handleComplete} completed={completed} data={data} />;
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

  if (type === 'dice') {
    return <DiceInteraction onComplete={handleComplete} completed={completed} data={data} />;
  }

  if (type === 'fraction-pie') {
    return <FractionPieInteraction onComplete={handleComplete} completed={completed} data={data} />;
  }

  if (type === 'bar-chart') {
    return <BarChartInteraction onComplete={handleComplete} completed={completed} data={data} />;
  }

  if (type === 'grid-compare') {
    return <GridCompareInteraction onComplete={handleComplete} completed={completed} data={data} />;
  }

  if (type === 'area-perimeter-toggle') {
    return <AreaPerimeterToggleInteraction onComplete={handleComplete} completed={completed} data={data} />;
  }


  return null;
};

// --- PATH DRAW INTERACTION (The Map) ---
const PathDrawInteraction = ({ onComplete, completed, data }: { onComplete: () => void, completed: boolean, data: any }) => {
  const gridSize = data?.gridSize || 5;
  const target = data?.target || 6;
  const [path, setPath] = useState<number[]>([]);
  
  const handleCellClick = (index: number) => {
    if (completed) return;
    
    if (path.length === 0) {
      setPath([index]);
      return;
    }
    
    const lastCell = path[path.length - 1];
    const row1 = Math.floor(lastCell / gridSize);
    const col1 = lastCell % gridSize;
    const row2 = Math.floor(index / gridSize);
    const col2 = index % gridSize;
    const isAdjacent = Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
    
    if (isAdjacent && !path.includes(index)) {
      const newPath = [...path, index];
      setPath(newPath);
      if (newPath.length >= target) {
        onComplete();
      }
    } else if (index === lastCell) {
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
        Clique nos quarteirões vizinhos para desenhar o caminho. Trace {target} quadras!
      </p>
      
      <div className="relative mx-auto bg-[#8bb58b] border-4 border-slate-700 rounded-xl p-3 shadow-inner" style={{ width: '280px', height: '280px' }}>
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
              <line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e3a8a" strokeWidth="8" strokeLinecap="round" strokeDasharray="10, 5" className="animate-pulse" />
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
        <span>Quarteirões: {path.length}/{target}</span>
        <button onClick={() => setPath([])} className="text-red-400 hover:text-red-300 flex items-center gap-1"><Trash2 className="w-4 h-4" /> Desfazer</button>
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
        <Ruler className="w-6 h-6 text-emerald-400" /> Medindo a Rua
      </h3>
      <p className="text-emerald-100/80 text-sm mb-8">Arraste a ponta da régua amarela até medir exatamente a caçamba (12 cm).</p>
      <div className="relative w-full max-w-md mx-auto h-28 bg-slate-800/80 rounded-xl p-4 flex flex-col justify-end border border-slate-600 shadow-inner overflow-hidden">
        <div className="absolute bottom-10 left-4 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-md border border-red-700 flex items-center justify-center shadow-lg" style={{ width: '60%' }}>
          <span className="text-white text-xs font-bold uppercase tracking-widest opacity-80">Caçamba</span>
        </div>
        <div className="absolute bottom-4 left-4 h-8 bg-yellow-400 rounded-sm border-2 border-yellow-600 flex shadow-md overflow-hidden transition-all duration-75" style={{ width: `${Math.max(10, rulerWidth)}%` }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-yellow-600/50 h-full flex flex-col justify-between">
              <div className="h-2 border-l border-yellow-800"></div>
              {i % 2 === 0 && <span className="text-[10px] text-yellow-900 font-bold self-start ml-1 leading-none">{i/2}</span>}
            </div>
          ))}
        </div>
      </div>
      <input type="range" min="0" max="100" value={rulerWidth} onChange={(e) => {
        const val = Number(e.target.value);
        setRulerWidth(val);
        if (val >= 58 && val <= 62 && !completed) onComplete();
      }} className="w-full max-w-md mt-6 accent-emerald-400 h-4 rounded-lg appearance-none bg-slate-700 cursor-pointer shadow-inner" />
      <div className="mt-6 flex items-center justify-center gap-3 text-emerald-200 text-sm font-bold bg-emerald-900/30 w-max mx-auto px-6 py-2 rounded-full border border-emerald-500/30">
        Medida na Régua: <span className="text-2xl text-emerald-400">{Math.round(rulerWidth / 5)} cm</span>
      </div>
    </div>
  );
};

// --- PAINT INTERACTION ---
const PaintInteraction = ({ onComplete, completed, data }: { onComplete: () => void, completed: boolean, data: any }) => {
  const total = data?.totalRegions || 15;
  const target = data?.paintedRegions || 6;
  const [activeCells, setActiveCells] = useState<number[]>([]);
  const togglePaint = (index: number) => {
    if (completed) return;
    const newCells = [...activeCells];
    if (newCells.includes(index)) newCells.splice(newCells.indexOf(index), 1);
    else newCells.push(index);
    setActiveCells(newCells);
    if (newCells.length >= target) onComplete();
  };
  return (
    <div className="bg-gradient-to-b from-[#0b1430] to-[#11224f] border-2 border-pink-400/50 rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_20px_rgba(244,114,182,0.2)]">
      <h3 className="text-white font-black mb-2 flex items-center justify-center gap-2 text-xl"><Palette className="w-6 h-6 text-pink-400" /> Pintando Canteiros</h3>
      <p className="text-pink-100/80 text-sm mb-6">Clique para gramar as áreas de terra. Pinte {target} áreas para terminar.</p>
      <div className="flex flex-wrap justify-center gap-2 max-w-xs sm:max-w-md mx-auto bg-slate-800 p-4 rounded-xl border-2 border-slate-600 shadow-inner">
        {Array.from({ length: total }).map((_, idx) => (
          <button key={idx} onClick={() => togglePaint(idx)} className={`w-12 h-12 rounded-lg border-2 transition-all duration-300 transform ${activeCells.includes(idx) ? 'bg-green-500 border-green-300 scale-105 rotate-3 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 'bg-amber-900 border-amber-700 hover:border-green-500/50'}`} />
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
  const handlePointerDown = (e: React.PointerEvent) => { setIsDragging(true); setLastPos({ x: e.clientX, y: e.clientY }); };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setRotation({ x: rotation.x - (e.clientY - lastPos.y) * 0.5, y: rotation.y + (e.clientX - lastPos.x) * 0.5 });
    setLastPos({ x: e.clientX, y: e.clientY });
  };
  const handlePointerUp = () => { setIsDragging(false); onComplete(); };
  return (
    <div className="bg-gradient-to-b from-[#0b1430] to-[#11224f] border-2 border-amber-400/50 rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_20px_rgba(251,191,36,0.2)] select-none">
      <h3 className="text-white font-black mb-2 flex items-center justify-center gap-2 text-xl"><Hexagon className="w-6 h-6 text-amber-400" /> Visualizador 3D</h3>
      <p className="text-amber-100/80 text-sm mb-6">Arraste para girar a estrutura e ver como blocos de tamanho 2 se encaixam!</p>
      <div className="relative w-64 h-64 mx-auto perspective-[800px] cursor-grab active:cursor-grabbing bg-slate-900/50 rounded-xl border border-slate-700 overflow-hidden" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}>
        <div className="w-full h-full absolute transform-style-3d transition-transform duration-75" style={{ transform: `translateZ(-50px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}>
          <div className="absolute inset-0 flex items-center justify-center transform-style-3d">
            <div className="relative w-20 h-20 transform-style-3d">
              <div className="absolute inset-0 bg-amber-600/90 border-2 border-amber-800" style={{ transform: 'translateZ(-40px)' }}></div>
              <div className="absolute inset-0 bg-amber-400/90 border-2 border-amber-600" style={{ transform: 'translateZ(40px)' }}></div>
              <div className="absolute inset-0 bg-amber-500/90 border-2 border-amber-700" style={{ transform: 'rotateY(90deg) translateZ(40px)' }}></div>
              <div className="absolute inset-0 bg-amber-700/90 border-2 border-amber-900" style={{ transform: 'rotateY(-90deg) translateZ(40px)' }}></div>
              <div className="absolute inset-0 bg-amber-300/90 border-2 border-amber-500" style={{ transform: 'rotateX(90deg) translateZ(40px)' }}></div>
              <div className="absolute inset-0 bg-amber-800/90 border-2 border-amber-950" style={{ transform: 'rotateX(-90deg) translateZ(40px)' }}></div>
            </div>
          </div>
        </div>
      </div>
      {completed && <p className="mt-6 text-amber-400 font-bold">Análise concluída!</p>}
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
    setSpinDegree(spinDegree + (360 * 5) + Math.floor(Math.random() * 360));
    setTimeout(() => { setSpinning(false); onComplete(); }, 4000);
  };
  return (
    <div className="bg-gradient-to-b from-[#0b1430] to-[#11224f] border-2 border-purple-400/50 rounded-2xl p-4 sm:p-6 text-center shadow-[0_0_20px_rgba(168,85,247,0.2)]">
      <h3 className="text-white font-black mb-2 flex items-center justify-center gap-2 text-xl"><PlayCircle className="w-6 h-6 text-purple-400" /> Sorteio das Tarefas</h3>
      <p className="text-purple-100/80 text-sm mb-8">Gire a roleta para ver a probabilidade. Onde será que vai parar?</p>
      <div className="relative w-56 h-56 mx-auto mb-8">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-white z-20 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"></div>
        <div className="w-full h-full rounded-full border-8 border-slate-800 relative shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-slate-900">
          <div className="w-full h-full rounded-full overflow-hidden absolute inset-0" style={{ transform: `rotate(${spinDegree}deg)`, transition: 'transform 4s cubic-bezier(0.1, 0.9, 0.2, 1)' }}>
            <div className="absolute inset-0" style={{ background: `conic-gradient(#3b82f6 0deg 180deg, #ec4899 180deg 300deg, #f59e0b 300deg 360deg)` }}></div>
            <div className="absolute inset-0 rotate-0 w-full h-[2px] bg-slate-900 top-1/2 -translate-y-1/2"></div>
            <div className="absolute inset-0 rotate-60 w-full h-[2px] bg-slate-900 top-1/2 -translate-y-1/2"></div>
            <div className="absolute inset-0 rotate-120 w-full h-[2px] bg-slate-900 top-1/2 -translate-y-1/2"></div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full z-10 border-4 border-slate-600 shadow-xl"></div>
        </div>
      </div>
      <button onClick={handleSpin} disabled={spinning} className="px-8 py-4 bg-gradient-to-b from-purple-500 to-purple-700 text-white font-black uppercase tracking-wider rounded-2xl hover:from-purple-400 hover:to-purple-600 transition shadow-[0_6px_0_#581c87] active:translate-y-1 disabled:opacity-50 text-lg">
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
\n
// --- DICE INTERACTION ---
const DiceInteraction = ({ onComplete, completed, data }: any) => {
  const [rolls, setRolls] = useState<number[]>([]);
  const targetRolls = 2;

  const handleRoll = () => {
    if (completed || rolls.length >= targetRolls) return;
    const newRoll = Math.floor(Math.random() * 6) + 1;
    const newRolls = [...rolls, newRoll];
    setRolls(newRolls);
    if (newRolls.length === targetRolls) {
      setTimeout(() => onComplete(), 1000);
    }
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl text-center border-2 border-indigo-500/30">
      <h3 className="text-xl font-bold text-indigo-300 mb-4 flex items-center justify-center gap-2">
        <Hexagon className="w-5 h-5" /> Lance os Dados
      </h3>
      <div className="flex justify-center gap-4 mb-6">
        {rolls.map((val, i) => (
          <div key={i} className="w-16 h-16 bg-white rounded-xl shadow-inner flex items-center justify-center text-3xl font-black text-slate-800 border-4 border-slate-300">
            {val}
          </div>
        ))}
        {rolls.length < targetRolls && (
          <div className="w-16 h-16 bg-slate-700/50 rounded-xl flex items-center justify-center border-4 border-dashed border-slate-500">
            ?
          </div>
        )}
      </div>
      <button 
        onClick={handleRoll}
        disabled={completed || rolls.length >= targetRolls}
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl active:scale-95 disabled:opacity-50 transition"
      >
        {rolls.length === 0 ? 'Lançar 1º Dado' : rolls.length === 1 ? 'Lançar 2º Dado' : 'Calculando...'}
      </button>
      {completed && <p className="mt-4 text-emerald-400 font-bold">Resultados registrados!</p>}
    </div>
  );
};

// --- FRACTION PIE INTERACTION ---
const FractionPieInteraction = ({ onComplete, completed, data }: any) => {
  const slices = data?.slices || 10;
  const target = data?.target || 5;
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSlice = (i: number) => {
    if (completed) return;
    const newSelected = selected.includes(i) ? selected.filter(x => x !== i) : [...selected, i];
    setSelected(newSelected);
    if (newSelected.length === target) {
      setTimeout(() => onComplete(), 500);
    }
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl text-center border-2 border-rose-500/30">
      <h3 className="text-xl font-bold text-rose-300 mb-4 flex items-center justify-center gap-2">
        <Palette className="w-5 h-5" /> Dividindo a Pizza
      </h3>
      <p className="text-slate-300 text-sm mb-6">Selecione {target} fatias para formar a fração!</p>
      
      <div className="relative w-48 h-48 mx-auto rounded-full border-4 border-rose-900 bg-rose-950 overflow-hidden flex items-center justify-center">
        {Array.from({length: slices}).map((_, i) => {
          const rotate = (360 / slices) * i;
          const isSelected = selected.includes(i);
          return (
            <div 
              key={i}
              onClick={() => toggleSlice(i)}
              className={`absolute w-[100px] h-[100px] origin-bottom-right cursor-pointer border border-rose-900/50 transition-colors duration-300 hover:brightness-125
                ${isSelected ? 'bg-rose-500' : 'bg-rose-800/40'}`}
              style={{
                transform: `rotate(${rotate}deg) skewY(${90 - (360/slices)}deg)`,
                right: '50%',
                bottom: '50%'
              }}
            />
          );
        })}
        {/* Cover center hole for aesthetics */}
        <div className="absolute w-8 h-8 bg-rose-900 rounded-full z-10 pointer-events-none shadow-inner" />
      </div>

      {completed && <p className="mt-4 text-emerald-400 font-bold flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4 inline"/> Fração montada!</p>}
    </div>
  );
};

// --- BAR CHART INTERACTION ---
const BarChartInteraction = ({ onComplete, completed, data }: any) => {
  const categories = data?.categories || ['A', 'B', 'C', 'D'];
  const targets = data?.targets || [20, 12, 10, 5];
  const max = Math.max(...targets, 20);
  
  const [values, setValues] = useState<number[]>(categories.map(() => 0));

  const increment = (i: number) => {
    if (completed) return;
    const newValues = [...values];
    if (newValues[i] < max) newValues[i] += 1;
    setValues(newValues);
    checkComplete(newValues);
  };
  
  const decrement = (i: number) => {
    if (completed) return;
    const newValues = [...values];
    if (newValues[i] > 0) newValues[i] -= 1;
    setValues(newValues);
    checkComplete(newValues);
  };

  const checkComplete = (vals: number[]) => {
    if (vals.every((v, i) => v === targets[i])) {
      setTimeout(() => onComplete(), 500);
    }
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border-2 border-teal-500/30">
      <h3 className="text-xl font-bold text-teal-300 mb-4 text-center flex items-center justify-center gap-2">
        <Ruler className="w-5 h-5" /> Estatística da Coleta
      </h3>
      <p className="text-slate-300 text-sm mb-6 text-center">Ajuste as barras para bater com a tabela!</p>

      <div className="flex items-end justify-center gap-4 h-48 border-b-2 border-l-2 border-slate-600 pl-2 pb-2">
        {categories.map((cat: string, i: number) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-8 sm:w-12 bg-slate-700 rounded-t-sm relative flex flex-col justify-end overflow-hidden" style={{ height: '100px' }}>
              <div 
                className="w-full bg-teal-500 transition-all duration-300 flex items-start justify-center pt-1" 
                style={{ height: `${(values[i] / max) * 100}%` }}
              >
                <span className="text-[10px] font-bold text-teal-900">{values[i]}</span>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => decrement(i)} className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded text-white text-xs leading-none">-</button>
              <button onClick={() => increment(i)} className="w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded text-white text-xs leading-none">+</button>
            </div>
            <span className="text-xs text-slate-300 font-bold">{cat}</span>
          </div>
        ))}
      </div>
      {completed && <p className="mt-4 text-emerald-400 font-bold text-center"><CheckCircle className="w-4 h-4 inline"/> Gráfico correto!</p>}
    </div>
  );
};

// --- GRID COMPARE INTERACTION ---
const GridCompareInteraction = ({ onComplete, completed, data }: any) => {
  const [painted1, setPainted1] = useState<number>(0);
  const [painted2, setPainted2] = useState<number>(0);
  
  const target1 = data?.target1 || 18; // 6x3
  const target2 = data?.target2 || 18; // 3x6

  const handlePaint1 = () => {
    if (!completed && painted1 < target1) {
      setPainted1(painted1 + 1);
      checkComplete(painted1 + 1, painted2);
    }
  };

  const handlePaint2 = () => {
    if (!completed && painted2 < target2) {
      setPainted2(painted2 + 1);
      checkComplete(painted1, painted2 + 1);
    }
  };

  const checkComplete = (p1: number, p2: number) => {
    if (p1 === target1 && p2 === target2) onComplete();
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border-2 border-amber-500/30 overflow-hidden">
      <h3 className="text-xl font-bold text-amber-300 mb-4 text-center flex items-center justify-center gap-2">
        <MapPin className="w-5 h-5" /> Retângulos Equivalentes
      </h3>
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
        
        <div className="text-center">
          <p className="text-sm font-bold text-amber-200 mb-2">6 × 3 = {painted1}</p>
          <div className="grid grid-cols-6 gap-[1px] bg-amber-900 border-2 border-amber-500 p-1 cursor-pointer" onClick={handlePaint1}>
            {Array.from({length: 18}).map((_, i) => (
              <div key={i} className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors ${i < painted1 ? 'bg-amber-500' : 'bg-slate-800'}`} />
            ))}
          </div>
        </div>

        <div className="text-xl text-slate-400 font-black">=</div>

        <div className="text-center">
          <p className="text-sm font-bold text-orange-200 mb-2">3 × 6 = {painted2}</p>
          <div className="grid grid-cols-3 gap-[1px] bg-orange-900 border-2 border-orange-500 p-1 cursor-pointer" onClick={handlePaint2}>
            {Array.from({length: 18}).map((_, i) => (
              <div key={i} className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors ${i < painted2 ? 'bg-orange-500' : 'bg-slate-800'}`} />
            ))}
          </div>
        </div>

      </div>
      {completed && <p className="mt-4 text-emerald-400 font-bold text-center"><CheckCircle className="w-4 h-4 inline"/> Figuras formadas!</p>}
    </div>
  );
};

// --- AREA PERIMETER TOGGLE INTERACTION ---
const AreaPerimeterToggleInteraction = ({ onComplete, completed, data }: any) => {
  const [mode, setMode] = useState<'none'|'area'|'perimeter'>('none');
  
  const handleToggle = (m: 'area'|'perimeter') => {
    setMode(m);
    if (!completed) onComplete();
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border-2 border-pink-500/30 text-center">
      <h3 className="text-xl font-bold text-pink-300 mb-4 flex items-center justify-center gap-2">
        <Palette className="w-5 h-5" /> Área ou Perímetro?
      </h3>
      
      <div className="relative w-48 h-32 mx-auto bg-slate-900 border-2 border-slate-700 rounded-lg mb-6 flex items-center justify-center overflow-hidden transition-all duration-500">
        <div className={`absolute inset-2 bg-pink-500/20 transition-opacity duration-500 ${mode === 'area' ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-full grid grid-cols-4 grid-rows-3 gap-[1px]">
             {Array.from({length: 12}).map((_,i) => <div key={i} className="bg-pink-500/60" />)}
          </div>
        </div>
        <div className={`absolute inset-2 border-4 border-emerald-400 transition-opacity duration-500 ${mode === 'perimeter' ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button onClick={() => handleToggle('area')} className={`px-4 py-2 rounded-xl font-bold transition ${mode === 'area' ? 'bg-pink-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
          Ver Área (Interno)
        </button>
        <button onClick={() => handleToggle('perimeter')} className={`px-4 py-2 rounded-xl font-bold transition ${mode === 'perimeter' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
          Ver Perímetro (Contorno)
        </button>
      </div>
    </div>
  );
};
