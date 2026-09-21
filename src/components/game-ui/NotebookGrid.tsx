import React, { useState } from 'react';
import { ArmedCalculationData, ArmedOperationStep } from '../../types';
import { Check, AlertCircle, HelpCircle, ArrowDown, Sparkles } from 'lucide-react';

interface NotebookGridProps {
  operation: ArmedCalculationData;
  interactive?: boolean;
  onComplete?: () => void;
  onMistake?: (errorDesc: string) => void;
}

export const NotebookGrid: React.FC<NotebookGridProps> = ({
  operation,
  interactive = false,
  onComplete,
  onMistake
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userInputDigits, setUserInputDigits] = useState<{ [column: string]: string }>({});
  const [userCarries, setUserCarries] = useState<{ [column: string]: string }>({});
  const [feedback, setFeedback] = useState<{ type: 'neutral' | 'success' | 'error'; message: string }>({
    type: 'neutral',
    message: operation.steps.length > 0 
      ? operation.steps[0].instruction 
      : 'Observe como os algarismos ficam alinhados em cada coluna.'
  });
  const [completed, setCompleted] = useState(false);

  const currentStep: ArmedOperationStep | undefined = operation.steps[currentStepIndex];

  // Helper to get digit for operand
  const getOpDigit = (opCol: { UM?: number; C?: number; D?: number; U?: number } | undefined, col: 'UM' | 'C' | 'D' | 'U') => {
    if (!opCol || opCol[col] === undefined) return '';
    return opCol[col];
  };

  const handleDigitInput = (col: string, val: string) => {
    if (!interactive || completed) return;
    const sanitized = val.slice(-1); // only single digit
    setUserInputDigits(prev => ({ ...prev, [col]: sanitized }));
  };

  const handleCarryInput = (col: string, val: string) => {
    if (!interactive || completed) return;
    const sanitized = val.slice(-1);
    setUserCarries(prev => ({ ...prev, [col]: sanitized }));
  };

  const checkCurrentStep = () => {
    if (!currentStep) return;

    const focusCol = currentStep.focusColumn;
    const expectedDigit = currentStep.expectedResultDigit;
    const expectedCarry = currentStep.expectedCarry;

    // Check carry if required for this step
    if (expectedCarry) {
      for (const [colKey, val] of Object.entries(expectedCarry)) {
        if (Number(userCarries[colKey]) !== val) {
          const errMsg = `Atenção no "Vai 1": Você precisa colocar ${val} na casinha lá em cima da coluna ${colKey}!`;
          setFeedback({ type: 'error', message: errMsg });
          onMistake?.(errMsg);
          return;
        }
      }
    }

    // Check result digit if expected
    if (expectedDigit !== undefined && focusCol !== 'all') {
      const userDigit = Number(userInputDigits[focusCol]);
      if (userDigit !== expectedDigit) {
        const errMsg = currentStep.errorExplanation || `O algarismo da coluna ${focusCol} não está correto. Tente novamente!`;
        setFeedback({ type: 'error', message: errMsg });
        onMistake?.(errMsg);
        return;
      }
    }

    // If correct step:
    if (currentStepIndex < operation.steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setFeedback({
        type: 'success',
        message: `Muito bem! ${operation.steps[nextIndex].instruction}`
      });
    } else {
      setCompleted(true);
      setFeedback({
        type: 'success',
        message: `Parabéns! Você resolveu a conta armada com perfeição! Resultado: ${operation.totalResult}`
      });
      onComplete?.();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto my-2 overflow-x-hidden">
      {/* Caderno Escolar Container */}
      <div className="w-full bg-[#fcfcf9] rounded-2xl shadow-xl border-2 border-slate-200 overflow-hidden notebook-grid notebook-margin p-3 sm:p-6">
        {/* Notebook Title Bar */}
        <div className="flex items-center justify-between border-b border-sky-200/60 pb-2 mb-4 pl-3 sm:pl-6">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <h4 className="font-fredoka text-xs sm:text-base text-slate-700 font-semibold tracking-wide ml-1 truncate">
              Caderno de Matemática • Malha Quadriculada
            </h4>
          </div>
          <span className="font-hand text-base sm:text-lg text-blue-600 font-bold px-2 py-0.5 bg-blue-50 rounded border border-blue-200 flex-shrink-0">
            {operation.op1} {operation.operator} {operation.op2}
          </span>
        </div>

        {/* Division Key View or Standard Column View */}
        {operation.operator === '÷' ? (
          /* Visual Division Key (Chave) */
          <div className="pl-3 sm:pl-6 py-2 sm:py-4 flex flex-col items-center">
            <div className="flex items-start gap-2 sm:gap-4 text-2xl sm:text-3xl font-mono font-bold text-slate-800">
              <div className="flex flex-col items-end">
                <span className="px-2 sm:px-3 py-1 bg-amber-100/70 border border-amber-300 rounded text-amber-900">
                  {operation.op1}
                </span>
                <span className="text-[10px] sm:text-xs font-sans text-slate-500 mt-0.5 sm:mt-1">Dividendo</span>
              </div>

              {/* The "Chave" symbol */}
              <div className="border-l-4 border-b-4 border-slate-800 px-3 sm:px-4 py-1 flex flex-col">
                <div className="text-blue-600 pb-1">
                  {operation.op2}
                  <span className="text-[10px] sm:text-xs font-sans text-slate-500 block">Divisor</span>
                </div>
                <div className="pt-2 text-emerald-600 font-bold border-t-2 border-dashed border-slate-300">
                  {interactive && !completed ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        maxLength={2}
                        value={userInputDigits['quotient'] || ''}
                        onChange={(e) => handleDigitInput('quotient', e.target.value)}
                        placeholder="?"
                        className="w-10 sm:w-12 h-9 sm:h-10 text-center text-xl sm:text-2xl font-bold bg-white border-2 border-emerald-400 rounded-lg text-emerald-700 outline-none focus:ring-2 focus:ring-emerald-400"
                      />
                    </div>
                  ) : (
                    <span>{operation.totalResult}</span>
                  )}
                  <span className="text-[10px] sm:text-xs font-sans text-slate-500 block">Quociente</span>
                </div>
              </div>
            </div>

            {/* Division Steps Explanatory Notes */}
            <div className="mt-4 sm:mt-6 w-full max-w-sm bg-white/90 p-3 sm:p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1.5 font-sans">
              <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" /> Passo a Passo da Chave:
              </p>
              <p>1. Divida as dezenas: {Math.floor(operation.op1 / 10)} ÷ {operation.op2} = {Math.floor(operation.totalResult / 10)}</p>
              <p>2. Multiplique de volta e subtraia o que deu.</p>
              <p>3. Abaixe a unidade e termine a divisão!</p>
              {operation.remainder !== undefined && (
                <p className="text-amber-700 font-medium">Resto da divisão: {operation.remainder}</p>
              )}
            </div>
          </div>
        ) : (
          /* Addition / Subtraction / Multiplication Vertical Grid */
          <div className="pl-3 sm:pl-6 flex flex-col items-center w-full">
            {/* Column Headers (UM, C, D, U) */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full max-w-md text-center mb-1.5">
              <div className="text-[10px] sm:text-xs font-bold text-slate-400 self-center">Ordem</div>
              <div className="py-1 px-1 sm:px-2 rounded-lg bg-indigo-100 text-indigo-800 font-fredoka font-bold text-xs sm:text-sm border border-indigo-200">
                UM <span className="hidden sm:inline text-[10px] font-normal block text-indigo-600">Milhar</span>
              </div>
              <div className="py-1 px-1 sm:px-2 rounded-lg bg-purple-100 text-purple-800 font-fredoka font-bold text-xs sm:text-sm border border-purple-200">
                C <span className="hidden sm:inline text-[10px] font-normal block text-purple-600">Centena</span>
              </div>
              <div className="py-1 px-1 sm:px-2 rounded-lg bg-sky-100 text-sky-800 font-fredoka font-bold text-xs sm:text-sm border border-sky-200">
                D <span className="hidden sm:inline text-[10px] font-normal block text-sky-600">Dezena</span>
              </div>
              <div className="py-1 px-1 sm:px-2 rounded-lg bg-emerald-100 text-emerald-800 font-fredoka font-bold text-xs sm:text-sm border border-emerald-200">
                U <span className="hidden sm:inline text-[10px] font-normal block text-emerald-600">Unidade</span>
              </div>
            </div>

            {/* Carry Row (O "Vai 1" / Empréstimo) */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full max-w-md text-center mb-1">
              <div className="text-[10px] sm:text-[11px] font-bold text-amber-600 self-center font-hand truncate">
                {operation.operator === '-' ? 'Troca ↷' : 'Vai 1 ⇡'}
              </div>
              {(['UM', 'C', 'D', 'U'] as const).map(col => {
                const step = currentStep;
                const isCarryActive = step?.focusColumn === (col === 'D' ? 'U' : col === 'C' ? 'D' : 'C');
                const expected = step?.expectedCarry?.[col as 'D' | 'C' | 'UM'];
                const borrow = step?.expectedBorrow?.[col as 'D' | 'C' | 'UM'];

                return (
                  <div key={col} className="flex justify-center items-center h-7 sm:h-8">
                    {borrow ? (
                      <span className="text-[10px] sm:text-xs font-bold text-rose-600 bg-rose-100 border border-rose-300 rounded px-1 sm:px-1.5 py-0.5 animate-pulse">
                        vira {borrow.newValue}
                      </span>
                    ) : interactive ? (
                      <input
                        type="text"
                        maxLength={1}
                        placeholder={expected !== undefined && isCarryActive ? '?' : ''}
                        value={userCarries[col] || ''}
                        onChange={(e) => handleCarryInput(col, e.target.value)}
                        className={`w-6 h-6 sm:w-7 sm:h-7 text-center font-bold text-xs rounded border transition-all ${
                          expected !== undefined
                            ? 'border-amber-400 bg-amber-50 text-amber-800 font-mono shadow-sm'
                            : 'border-slate-200 bg-white/40 text-slate-400'
                        }`}
                      />
                    ) : (
                      step?.expectedCarry?.[col as 'D' | 'C' | 'UM'] ? (
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-200 border border-amber-400 text-amber-900 font-bold text-[10px] sm:text-xs flex items-center justify-center">
                          +{step.expectedCarry[col as 'D' | 'C' | 'UM']}
                        </span>
                      ) : null
                    )}
                  </div>
                );
              })}
            </div>

            {/* First Operand Row */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full max-w-md text-center py-0.5 sm:py-1 bg-white/80 rounded-xl border border-slate-200 shadow-2xs mb-1.5 sm:mb-2">
              <div className="self-center text-slate-400 text-[10px] sm:text-xs font-mono">1ª parc.</div>
              {(['UM', 'C', 'D', 'U'] as const).map(col => {
                const digit = getOpDigit(operation.alignmentTarget?.op1Columns, col);
                const isScratched = currentStep?.expectedBorrow?.[col as 'D' | 'C' | 'UM'];
                return (
                  <div key={col} className="h-9 sm:h-12 flex items-center justify-center">
                    <span className={`text-xl sm:text-2xl font-mono font-bold ${
                      isScratched 
                        ? 'line-through text-rose-500 decoration-rose-600 decoration-2' 
                        : 'text-slate-800'
                    }`}>
                      {digit !== '' ? digit : ''}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Second Operand Row with Operator */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full max-w-md text-center py-0.5 sm:py-1 bg-white/80 rounded-xl border border-slate-200 shadow-2xs mb-1.5 sm:mb-2 relative">
              <div className="self-center font-mono font-bold text-xl sm:text-2xl text-blue-600">
                {operation.operator}
              </div>
              {(['UM', 'C', 'D', 'U'] as const).map(col => {
                const digit = getOpDigit(operation.alignmentTarget?.op2Columns, col);
                return (
                  <div key={col} className="h-9 sm:h-12 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-mono font-bold text-slate-800">
                      {digit !== '' ? digit : ''}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Horizontal Line (Traço de Igual / Régua) */}
            <div className="w-full max-w-md border-b-4 border-slate-700 my-1 rounded-full"></div>

            {/* Result Row */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full max-w-md text-center py-0.5 sm:py-1">
              <div className="self-center text-emerald-600 font-bold text-[10px] sm:text-xs font-sans">
                = Total
              </div>
              {(['UM', 'C', 'D', 'U'] as const).map(col => {
                const isFocus = currentStep?.focusColumn === col;
                const val = userInputDigits[col] || '';

                if (interactive && !completed) {
                  return (
                    <div key={col} className="h-9 sm:h-12 flex items-center justify-center">
                      <input
                        type="text"
                        maxLength={1}
                        value={val}
                        onChange={(e) => handleDigitInput(col, e.target.value)}
                        placeholder="?"
                        className={`w-8 sm:w-10 h-8 sm:h-11 text-center text-lg sm:text-2xl font-mono font-bold rounded-lg border-2 transition-all ${
                          isFocus
                            ? 'border-blue-500 bg-blue-50/80 text-blue-900 shadow ring-2 ring-blue-300 scale-105'
                            : 'border-slate-300 bg-white text-slate-700'
                        }`}
                      />
                    </div>
                  );
                }

                // If non-interactive or already completed, show digits
                const totalStr = operation.totalResult.toString().padStart(4, ' ');
                const colIndexMap = { UM: 0, C: 1, D: 2, U: 3 };
                const char = totalStr[colIndexMap[col]];

                return (
                  <div key={col} className="h-9 sm:h-12 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-700">
                      {char && char !== ' ' ? char : ''}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step-by-Step Pedagogical Feedback Box */}
        <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl border flex items-start gap-2 sm:gap-3 pl-3 sm:pl-6 transition-all ${
          feedback.type === 'error'
            ? 'bg-rose-50 border-rose-200 text-rose-800'
            : feedback.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-amber-50/80 border-amber-200 text-amber-900'
        }`}>
          {feedback.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          ) : feedback.type === 'success' ? (
            <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="text-xs sm:text-sm font-medium leading-relaxed font-sans">{feedback.message}</p>
            {currentStep?.hint && feedback.type !== 'success' && (
              <p className="text-[11px] sm:text-xs text-slate-500 mt-1 font-sans">
                💡 <span className="font-semibold">Dica do Caderno:</span> {currentStep.hint}
              </p>
            )}
          </div>
        </div>

        {/* Interactive Validation Button */}
        {interactive && !completed && (
          <div className="mt-3 sm:mt-4 flex justify-end">
            <button
              onClick={checkCurrentStep}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-white font-fredoka font-bold text-sm sm:text-base btn-3d-blue flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              Conferir Passo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
