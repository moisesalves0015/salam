import os

file_path = "src/components/gari-mission/GariInteraction.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Props type string
content = content.replace("type: 'path-draw'", "type: string; // 'path-draw'")

# 2. Add the if blocks for new interactions inside the main component
# Find the end of active interactions block
marker = "if (type === 'roulette') {\n    return <RouletteInteraction onComplete={handleComplete} completed={completed} />;\n  }"

new_ifs = """
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
"""

content = content.replace(marker, marker + "\n" + new_ifs)

# 3. Add the actual components at the end of the file
new_components = """
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

      {completed && <p className="mt-4 text-emerald-400 font-bold flex items-center justify-center gap-2"><CheckCircle className="w-4 h-4"/> Fração montada!</p>}
    </div>
  );
};

// --- BAR CHART INTERACTION ---
const BarChartInteraction = ({ onComplete, completed, data }: any) => {
  const categories = data?.categories || ['A', 'B', 'C', 'D'];
  const targets = data?.targets || [20, 12, 10, 5];
  const max = 20;
  
  const [values, setValues] = useState<number[]>(categories.map(() => 0));

  const increment = (i: number) => {
    if (completed) return;
    const newValues = [...values];
    if (newValues[i] < max) newValues[i] += 1; // Or custom increment step
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
            <div className="w-12 bg-slate-700 rounded-t-sm relative flex flex-col justify-end overflow-hidden" style={{ height: '100%' }}>
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
    <div className="bg-slate-800/50 p-6 rounded-2xl border-2 border-amber-500/30">
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

      <div className="flex justify-center gap-4">
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
"""

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content + "\n" + new_components)

print("Injected all new interactive components!")
