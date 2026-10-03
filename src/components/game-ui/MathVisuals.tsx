import React, { useState } from 'react';
import { MafsVisualization } from '../../types';
import { CheckCircle2, MousePointerClick, MoveHorizontal, Coins, Grid3x3, Columns3, type LucideIcon } from 'lucide-react';
import { DecimalNumber, DecimalLegend } from './LessonMath';

interface MathVisualsProps {
  data: MafsVisualization;
}

/** Formata um número em decimal brasileiro (vírgula). */
const fmt = (v: number, digits: number) => v.toFixed(digits).replace('.', ',');

/** Moldura comum das ferramentas visuais. */
const ToolFrame: React.FC<{
  title: string;
  icon: LucideIcon;
  instruction: string;
  accent: 'sky' | 'emerald' | 'violet' | 'amber';
  aside?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon: Icon, instruction, accent, aside, children }) => {
  const accents = {
    sky: { frame: 'border-sky-500/60', stripe: 'from-sky-300 via-sky-500 to-blue-500', icon: 'from-sky-400 to-blue-700', text: 'text-sky-200', note: 'bg-sky-500/15 border-sky-400/50 text-sky-50' },
    emerald: { frame: 'border-emerald-500/60', stripe: 'from-emerald-300 via-emerald-500 to-teal-500', icon: 'from-emerald-400 to-teal-700', text: 'text-emerald-200', note: 'bg-emerald-500/15 border-emerald-400/50 text-emerald-50' },
    violet: { frame: 'border-violet-500/60', stripe: 'from-violet-300 via-violet-500 to-indigo-500', icon: 'from-violet-400 to-indigo-700', text: 'text-violet-200', note: 'bg-violet-500/15 border-violet-400/50 text-violet-50' },
    amber: { frame: 'border-amber-500/60', stripe: 'from-amber-300 via-amber-500 to-orange-500', icon: 'from-amber-400 to-orange-600', text: 'text-amber-200', note: 'bg-amber-500/15 border-amber-400/50 text-amber-50' },
  }[accent];
  return (
    <div className={`rounded-2xl border-2 ${accents.frame} bg-[#0e1733] overflow-hidden shadow-xl shadow-black/40`}>
      <div className={`h-1.5 bg-gradient-to-r ${accents.stripe}`} aria-hidden="true" />
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className={`w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br ${accents.icon} border border-white/30 flex items-center justify-center shadow-lg`}>
              <Icon className="w-5 h-5 text-white" aria-hidden="true" />
            </span>
            <h3 className={`font-black text-base sm:text-lg ${accents.text}`}>{title}</h3>
          </div>
          {aside}
        </div>
        <p className={`mb-4 rounded-xl border px-3 py-2 text-sm font-semibold flex items-start gap-2 ${accents.note}`}>
          <MousePointerClick className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          {instruction}
        </p>
        {children}
      </div>
    </div>
  );
};

const SuccessBanner: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-[#0d2a22] border-2 border-emerald-400/80 px-3 py-2.5 lesson-card-in" role="status" aria-live="polite">
    <span className="w-8 h-8 shrink-0 rounded-lg bg-emerald-400 text-emerald-950 flex items-center justify-center lesson-pop">
      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
    </span>
    <p className="text-sm font-bold text-emerald-50">{children}</p>
  </div>
);

const ProgressNote: React.FC<{ current: number; target: number; unit: string }> = ({ current, target, unit }) => {
  if (current === target) return null;
  const diff = Math.abs(target - current);
  return (
    <p className="mt-3 text-center text-xs font-bold text-slate-300" aria-live="polite">
      {current < target ? `Faltam ${diff} ${unit} para chegar ao alvo.` : `Você passou ${diff} ${unit} do alvo. Toque para desmarcar.`}
    </p>
  );
};

const CounterBadge: React.FC<{ label: string; value: string; caption: string; tone: 'sky' | 'emerald' | 'violet' }> = ({ label, value, caption, tone }) => {
  const tones = {
    sky: 'bg-[#0f2340] border-sky-400/70',
    emerald: 'bg-[#0d2a22] border-emerald-400/70',
    violet: 'bg-[#23174a] border-violet-400/70',
  }[tone];
  return (
    <div className={`self-start sm:self-auto rounded-xl border-2 px-4 py-2 text-center min-w-[120px] ${tones}`} aria-live="polite">
      <span className="block text-[10px] text-slate-300 font-black uppercase tracking-widest">{label}</span>
      <span className="block text-3xl font-black"><DecimalNumber value={value} /></span>
      <span className="block text-[11px] text-slate-300 font-bold">{caption}</span>
    </div>
  );
};

// ── Reta numérica ───────────────────────────────────────────────────────────
const NumberLine: React.FC<{ targets: number[] }> = ({ targets }) => {
  const [currentVal, setCurrentVal] = useState(0);
  const ticks = Array.from({ length: 11 }, (_, i) => i / 10);
  const pos = (v: number) => `calc(1rem + (100% - 2rem) * ${v})`;
  const hit = targets.some(t => Math.abs(t - currentVal) < 0.001);

  return (
    <ToolFrame
      title="Reta numérica dos décimos"
      icon={MoveHorizontal}
      accent="sky"
      instruction="Arraste o marcador verde (ou use as setas do teclado) até um dos pontos destacados."
      aside={<CounterBadge label="Você está em" value={fmt(currentVal, 1)} caption={`${Math.round(currentVal * 10)} décimos`} tone="emerald" />}
    >
      <div className="relative h-28 rounded-xl bg-[#0a1230] border border-slate-600/60 px-0">
        {/* Trilho */}
        <div className="absolute top-14 left-4 right-4 h-2 bg-slate-700 rounded-full" aria-hidden="true" />
        <div
          className="absolute top-14 left-4 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-300 transition-[width] duration-150"
          style={{ width: `calc((100% - 2rem) * ${currentVal})` }}
          aria-hidden="true"
        />

        {/* Marcas */}
        {ticks.map((t) => {
          const major = t === 0 || t === 0.5 || t === 1;
          return (
            <div key={t} className="absolute top-12" style={{ left: pos(t) }} aria-hidden="true">
              <div className={`-ml-px w-0.5 ${major ? 'h-6 bg-slate-300' : 'h-4 mt-1 bg-slate-500'}`} />
              <span className={`absolute top-7 left-1/2 -translate-x-1/2 font-black whitespace-nowrap ${major ? 'text-xs text-white' : 'text-[10px] text-slate-400 hidden min-[420px]:block'}`}>
                {fmt(t, 1)}
              </span>
            </div>
          );
        })}

        {/* Alvos */}
        {targets.map((v, i) => {
          const reached = Math.abs(v - currentVal) < 0.001;
          return (
            <div key={i} className="absolute top-[3.15rem]" style={{ left: pos(v) }} aria-hidden="true">
              <div className={`-ml-2.5 w-5 h-5 rounded-full border-2 ${reached ? 'bg-emerald-400 border-white' : 'bg-indigo-500 border-indigo-200'} shadow-[0_0_12px_rgba(129,140,248,0.9)]`} />
              <span className={`absolute -top-9 left-1/2 -translate-x-1/2 text-xs font-black px-2 py-0.5 rounded-md border whitespace-nowrap ${reached ? 'bg-emerald-400 text-emerald-950 border-emerald-200' : 'bg-indigo-600 text-white border-indigo-300'}`}>
                {fmt(v, 1)}
              </span>
            </div>
          );
        })}

        {/* Slider acessível */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={currentVal}
          onChange={(e) => setCurrentVal(parseFloat(e.target.value))}
          aria-label="Posição na reta numérica"
          aria-valuetext={`${fmt(currentVal, 1)}`}
          className="peer absolute top-10 left-4 right-4 w-[calc(100%-2rem)] h-10 opacity-0 cursor-pointer z-20"
        />

        {/* Marcador visível */}
        <div
          className="absolute top-[2.85rem] -ml-3.5 w-7 h-7 rounded-full bg-white border-[5px] border-emerald-500 shadow-[0_0_14px_rgba(52,211,153,0.8)] z-10 pointer-events-none transition-[left] duration-100 peer-focus-visible:ring-4 peer-focus-visible:ring-yellow-300"
          style={{ left: pos(currentVal) }}
          aria-hidden="true"
        />
      </div>

      {hit && (
        <SuccessBanner>
          Alvo alcançado! Você parou em <strong>{fmt(currentVal, 1)}</strong> — ou seja, {Math.round(currentVal * 10)} de 10 partes até o 1 inteiro.
        </SuccessBanner>
      )}
    </ToolFrame>
  );
};

// ── Malha de 100 ───────────────────────────────────────────────────────────
const Grid100: React.FC<{ target: number }> = ({ target }) => {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i); else next.add(i);
    setSelected(next);
  };
  const n = selected.size;
  const value = n === 100 ? '1,00' : `0,${n.toString().padStart(2, '0')}`;

  return (
    <ToolFrame
      title="Malha de centésimos"
      icon={Grid3x3}
      accent="violet"
      instruction={`Toque nos quadradinhos para pintar ${target} centésimos. Cada quadradinho vale 0,01.`}
      aside={<CounterBadge label="Valor atual" value={value} caption={`${n} de 100 quadrados`} tone="violet" />}
    >
      <div className="grid grid-cols-10 gap-1 w-full max-w-[340px] mx-auto p-2 bg-[#0a1230] rounded-xl border border-slate-600/60">
        {Array.from({ length: 100 }).map((_, i) => {
          const on = selected.has(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={on}
              aria-label={`Quadrado ${i + 1}`}
              className={`trail-focus aspect-square rounded-[4px] transition-all duration-150 active:scale-90 ${
                on ? 'bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)] border border-white/60' : 'bg-slate-700 hover:bg-slate-500 border border-slate-600'
              }`}
            />
          );
        })}
      </div>
      <div className="max-w-[340px] mx-auto"><DecimalLegend /></div>
      <ProgressNote current={n} target={target} unit="centésimos" />
      {n === target && (
        <SuccessBanner>
          Perfeito! Você representou {target} centésimos: <strong>0,{target.toString().padStart(2, '0')}</strong>.
        </SuccessBanner>
      )}
    </ToolFrame>
  );
};

// ── Malha de 10 ────────────────────────────────────────────────────────────
const Grid10: React.FC<{ target: number }> = ({ target }) => {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i); else next.add(i);
    setSelected(next);
  };
  const n = selected.size;
  const value = n === 10 ? '1,0' : `0,${n}`;

  return (
    <ToolFrame
      title="Malha de décimos"
      icon={Columns3}
      accent="emerald"
      instruction={`Pinte ${target} fatias. Cada fatia é 1 décimo (0,1) da caixa.`}
      aside={<CounterBadge label="Valor atual" value={value} caption={`${n} de 10 fatias`} tone="emerald" />}
    >
      <div className="grid grid-cols-10 gap-1 sm:gap-1.5 p-2 bg-[#0a1230] rounded-xl border border-slate-600/60 h-24 sm:h-28">
        {Array.from({ length: 10 }).map((_, i) => {
          const on = selected.has(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={on}
              aria-label={`Fatia ${i + 1}`}
              className={`trail-focus rounded-md transition-all duration-150 active:scale-95 flex items-end justify-center pb-1 ${
                on ? 'bg-gradient-to-b from-emerald-300 to-emerald-600 shadow-[0_0_10px_rgba(52,211,153,0.8)] border border-white/60' : 'bg-slate-700 hover:bg-slate-500 border border-slate-600'
              }`}
            >
              <span className={`text-[10px] font-black ${on ? 'text-emerald-950' : 'text-slate-400'}`}>{i + 1}</span>
            </button>
          );
        })}
      </div>
      <ProgressNote current={n} target={target} unit="décimos" />
      {n === target && (
        <SuccessBanner>
          Muito bem! Você marcou {target} décimos: <strong>0,{target}</strong>.
        </SuccessBanner>
      )}
    </ToolFrame>
  );
};

// ── Dinheiro como decimal ───────────────────────────────────────────────────
const MoneyBreakdown: React.FC = () => (
  <ToolFrame
    title="O dinheiro é um número decimal"
    icon={Coins}
    accent="amber"
    instruction="Observe onde ficam os reais e onde ficam os centavos."
  >
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-2xl bg-[#0a1230] border-2 border-amber-400/60 px-6 py-4 flex flex-col items-center">
        <span className="text-4xl sm:text-5xl font-black"><DecimalNumber value="R$ 1,00" /></span>
        <div className="grid grid-cols-2 mt-3 gap-3 text-sm font-bold w-full">
          <div className="flex flex-col items-center rounded-xl bg-sky-500/15 border border-sky-400/50 px-3 py-2">
            <span className="text-sky-300 text-lg font-black">1</span>
            <span className="text-white">Inteiro</span>
            <span className="text-xs text-slate-300">(reais)</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-emerald-500/15 border border-emerald-400/50 px-3 py-2">
            <span className="text-lg font-black"><span className="text-amber-300">,</span><span className="text-emerald-300">0</span><span className="text-violet-300">0</span></span>
            <span className="text-white">Centésimos</span>
            <span className="text-xs text-slate-300">(centavos)</span>
          </div>
        </div>
      </div>
      <p className="text-slate-200 text-sm text-center leading-relaxed max-w-sm">
        A vírgula separa a parte inteira (reais) da parte decimal (centavos).
        <br />"Centavo" significa a centésima parte de um real!
      </p>
    </div>
  </ToolFrame>
);

export const MathVisuals: React.FC<MathVisualsProps> = ({ data }) => {
  const first = Array.isArray(data.value) ? data.value[0] : data.value;
  switch (data.type) {
    case 'number-line':
      return <NumberLine targets={Array.isArray(data.value) ? data.value : [data.value]} />;
    case 'grid-100':
      return <Grid100 target={first} />;
    case 'grid-10':
      return <Grid10 target={first} />;
    case 'money-breakdown':
      return <MoneyBreakdown />;
    default:
      return null;
  }
};
