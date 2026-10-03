import React from 'react';

/**
 * Renderização de números decimais e expressões matemáticas com
 * hierarquia de cor + rótulo (nunca só cor):
 *   parte inteira → sky | vírgula → amber | décimos → emerald | centésimos → violet
 */

const NUMBER_RE = /(R\$\s?)?\d+(?:,\d+)?/g;

export const DecimalNumber: React.FC<{ value: string; className?: string }> = ({ value, className = '' }) => {
  const m = value.match(/^(R\$\s?)?(\d+)(?:,(\d+))?$/);
  if (!m) return <span className={className}>{value}</span>;
  const [, currency, intPart, dec] = m;
  return (
    <span className={`lesson-math whitespace-nowrap ${className}`}>
      {currency && <span className="text-slate-300 font-bold mr-0.5">R$&nbsp;</span>}
      <span className="text-sky-300">{intPart}</span>
      {dec !== undefined && (
        <>
          <span className="text-amber-300 font-black">,</span>
          {dec.split('').map((d, i) => (
            <span key={i} className={i === 0 ? 'text-emerald-300' : i === 1 ? 'text-violet-300' : 'text-pink-300'}>{d}</span>
          ))}
        </>
      )}
    </span>
  );
};

/** Converte uma expressão em nós coloridos (números decimais destacados). */
export const renderExpression = (expr: string): React.ReactNode[] => {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  for (const match of expr.matchAll(NUMBER_RE)) {
    const idx = match.index ?? 0;
    if (idx > last) nodes.push(<span key={`t${idx}`} className="text-slate-300">{expr.slice(last, idx)}</span>);
    nodes.push(<DecimalNumber key={`n${idx}`} value={match[0].replace(/\s+/, ' ')} />);
    last = idx + match[0].length;
  }
  if (last < expr.length) nodes.push(<span key="tail" className="text-slate-300">{expr.slice(last)}</span>);
  return nodes;
};

const MATH_LINE_RE = /^[\sR$\d.,/=<>≠≈−\-+×÷()?]+$/;
const OPERATOR_RE = /[=<>≠≈−+×÷]/;

/** Linha curta composta só por números/operadores (ex.: "2/10 = 0,2"). */
export const isMathLine = (line: string): boolean => {
  const t = line.trim();
  return t.length > 0 && t.length <= 48 && /\d/.test(t) && OPERATOR_RE.test(t) && MATH_LINE_RE.test(t);
};

/** Bloco de destaque para expressões; o resultado (após o último "=") ganha um chip. */
export const MathHighlight: React.FC<{ lines: string[]; size?: 'md' | 'lg' }> = ({ lines, size = 'lg' }) => {
  const hasDecimal = lines.some(l => /\d,\d/.test(l));
  const textSize = size === 'lg' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl';
  return (
    <div className="my-2 rounded-xl bg-[#0a1230] border border-sky-400/30 px-3 py-2.5 shadow-inner">
      <div className="flex flex-col gap-1.5">
        {lines.map((line, i) => {
          const eqIdx = line.lastIndexOf('=');
          const left = eqIdx >= 0 ? line.slice(0, eqIdx + 1) : line;
          const right = eqIdx >= 0 ? line.slice(eqIdx + 1).trim() : '';
          return (
            <div key={i} className={`font-black ${textSize} flex flex-wrap items-center gap-x-2 gap-y-1`}>
              <span>{renderExpression(left.trim())}</span>
              {right && (
                <span className="inline-flex items-center rounded-lg bg-emerald-500/15 border border-emerald-400/50 px-2 py-0.5">
                  {renderExpression(right)}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {hasDecimal && <DecimalLegend />}
    </div>
  );
};

export const DecimalLegend: React.FC = () => (
  <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-bold" aria-label="Legenda das cores dos números">
    <span className="flex items-center gap-1 text-sky-300"><span className="w-2 h-2 rounded-full bg-sky-300" />Inteiro</span>
    <span className="flex items-center gap-1 text-amber-300"><span className="w-2 h-2 rounded-full bg-amber-300" />Vírgula</span>
    <span className="flex items-center gap-1 text-emerald-300"><span className="w-2 h-2 rounded-full bg-emerald-300" />Décimos</span>
    <span className="flex items-center gap-1 text-violet-300"><span className="w-2 h-2 rounded-full bg-violet-300" />Centésimos</span>
  </div>
);

/**
 * Texto com parágrafos; sequências de linhas matemáticas viram blocos de destaque.
 */
export const RichLessonText: React.FC<{ text: string; className?: string; mathSize?: 'md' | 'lg' }> = ({ text, className = '', mathSize = 'lg' }) => {
  const lines = text.split('\n');
  const blocks: { kind: 'text' | 'math' | 'gap'; lines: string[] }[] = [];
  for (const raw of lines) {
    const kind = raw.trim() === '' ? 'gap' : isMathLine(raw) ? 'math' : 'text';
    const prev = blocks[blocks.length - 1];
    if (prev && prev.kind === kind && kind !== 'gap') prev.lines.push(raw);
    else blocks.push({ kind, lines: [raw] });
  }
  return (
    <div className={className}>
      {blocks.map((b, i) => {
        if (b.kind === 'gap') return <div key={i} className="h-2" aria-hidden="true" />;
        if (b.kind === 'math') return <MathHighlight key={i} lines={b.lines.map(l => l.trim())} size={mathSize} />;
        return (
          <p key={i} className="whitespace-pre-line break-words">
            {b.lines.join('\n')}
          </p>
        );
      })}
    </div>
  );
};
