import React, { useState } from 'react';
import { ArmedCalculationData, ArmedOperationStep } from '../../types';
import { Check, AlertCircle, HelpCircle, Sparkles, X } from 'lucide-react';
import { DndContext, useDraggable, useDroppable, DragOverlay, DragEndEvent } from '@dnd-kit/core';

interface NotebookGridProps {
  operation: ArmedCalculationData;
  interactive?: boolean;
  onComplete?: () => void;
  onMistake?: (errorDesc: string) => void;
}

// ----------------------------------------------------------------------
// DND COMPONENTS
// ----------------------------------------------------------------------

const DraggableDigit: React.FC<{ digit: string }> = ({ digit }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `drag-${digit}`,
    data: { value: digit },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`w-12 h-12 flex items-center justify-center bg-white border-2 border-indigo-200 rounded-xl shadow-sm text-2xl font-bold font-mono text-indigo-700 cursor-grab active:cursor-grabbing hover:bg-indigo-50 hover:scale-110 transition-all ${isDragging ? 'opacity-50 scale-90' : ''}`}
    >
      {digit}
    </div>
  );
};

const DroppableCell = ({ 
  id, 
  value, 
  placeholder, 
  isCarry, 
  isFocus,
  onRemove
}: { 
  id: string, 
  value: string, 
  placeholder?: string, 
  isCarry?: boolean, 
  isFocus?: boolean,
  onRemove: () => void 
}) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  let baseStyle = "flex items-center justify-center relative font-mono font-bold transition-all ";
  if (isCarry) {
    baseStyle += "w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm rounded border ";
    if (value) {
      baseStyle += "border-amber-400 bg-amber-50 text-amber-800 shadow-sm ";
    } else {
      baseStyle += isFocus ? "border-amber-400 border-dashed bg-amber-50/50 " : "border-slate-200 bg-white/40 text-slate-400 ";
    }
  } else {
    baseStyle += "w-8 sm:w-10 h-8 sm:h-11 text-lg sm:text-2xl rounded-lg border-2 ";
    if (value) {
      baseStyle += "border-emerald-400 bg-emerald-50 text-emerald-800 shadow-sm ";
    } else {
      baseStyle += isFocus ? "border-blue-500 bg-blue-50/80 ring-2 ring-blue-300 scale-105 border-dashed " : "border-slate-300 bg-white text-slate-700 border-dashed ";
    }
  }

  if (isOver && !value) {
    baseStyle += " ring-4 ring-indigo-300 scale-110";
  }

  return (
    <div ref={setNodeRef} className={baseStyle}>
      {value ? (
        <div className="group w-full h-full flex items-center justify-center cursor-pointer" onClick={onRemove}>
          <span>{value}</span>
          <div className="absolute inset-0 bg-red-500/80 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <X className="w-4 h-4 text-white" />
          </div>
        </div>
      ) : (
        <span className="text-slate-300 select-none">{placeholder}</span>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export const NotebookGrid: React.FC<NotebookGridProps> = ({
  operation,
  interactive = false,
  onComplete,
  onMistake
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userInputDigits, setUserInputDigits] = useState<{ [column: string]: string }>({});
  const [userCarries, setUserCarries] = useState<{ [column: string]: string }>({});
  const [activeDragDigit, setActiveDragDigit] = useState<string | null>(null);
  
  const [feedback, setFeedback] = useState<{ type: 'neutral' | 'success' | 'error'; message: string }>({
    type: 'neutral',
    message: operation.steps.length > 0 
      ? operation.steps[0].instruction 
      : 'Arraste os números para as casinhas corretas.'
  });
  const [completed, setCompleted] = useState(false);

  const currentStep: ArmedOperationStep | undefined = operation.steps[currentStepIndex];

  const getOpDigit = (opCol: { UM?: number; C?: number; D?: number; U?: number } | undefined, col: 'UM' | 'C' | 'D' | 'U') => {
    if (!opCol || opCol[col] === undefined) return '';
    return opCol[col];
  };

  const handleDragStart = (e: any) => {
    setActiveDragDigit(e.active.data.current?.value);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveDragDigit(null);
    if (!interactive || completed) return;
    
    const { over, active } = e;
    if (!over) return;
    
    const digit = active.data.current?.value;
    const targetId = over.id as string; // e.g., 'carry-D' or 'result-U'

    if (targetId.startsWith('carry-')) {
      const col = targetId.split('-')[1];
      setUserCarries(prev => ({ ...prev, [col]: digit }));
    } else if (targetId.startsWith('result-')) {
      const col = targetId.split('-')[1];
      setUserInputDigits(prev => ({ ...prev, [col]: digit }));
    } else if (targetId === 'quotient') {
      setUserInputDigits(prev => ({ ...prev, ['quotient']: digit }));
    }
  };

  const handleRemoveItem = (type: 'carry' | 'result', col: string) => {
    if (!interactive || completed) return;
    if (type === 'carry') {
      setUserCarries(prev => ({ ...prev, [col]: '' }));
    } else {
      setUserInputDigits(prev => ({ ...prev, [col]: '' }));
    }
  };

  const checkCurrentStep = () => {
    if (!currentStep) return;

    const focusCol = currentStep.focusColumn;
    const expectedDigit = currentStep.expectedResultDigit;
    const expectedCarry = currentStep.expectedCarry;

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

    if (expectedDigit !== undefined && focusCol !== 'all') {
      const userDigit = Number(userInputDigits[focusCol]);
      if (userDigit !== expectedDigit) {
        const errMsg = currentStep.errorExplanation || `O algarismo da coluna ${focusCol} não está correto. Tente novamente!`;
        setFeedback({ type: 'error', message: errMsg });
        onMistake?.(errMsg);
        return;
      }
    }

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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center w-full max-w-xl mx-auto my-2 overflow-x-hidden">
        {/* Caderno Escolar Container */}
        <div className="w-full bg-[#fcfcf9] rounded-2xl shadow-xl border-2 border-slate-200 overflow-hidden notebook-grid notebook-margin p-3 sm:p-6 mb-4">
          
          <div className="flex items-center justify-between border-b border-sky-200/60 pb-2 mb-4 pl-3 sm:pl-6">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <h4 className="font-fredoka text-xs sm:text-base text-slate-700 font-semibold tracking-wide ml-1 truncate">
                Caderno de Matemática • Adesivos
              </h4>
            </div>
            <span className="font-hand text-base sm:text-lg text-blue-600 font-bold px-2 py-0.5 bg-blue-50 rounded border border-blue-200 flex-shrink-0">
              {operation.op1} {operation.operator} {operation.op2}
            </span>
          </div>

          {/* Vertical Grid */}
          <div className="pl-3 sm:pl-6 flex flex-col items-center w-full">
            <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full max-w-md text-center mb-1.5">
              <div className="text-[10px] sm:text-xs font-bold text-slate-400 self-center">Ordem</div>
              <div className="py-1 px-1 sm:px-2 rounded-lg bg-indigo-100 text-indigo-800 font-fredoka font-bold text-xs sm:text-sm border border-indigo-200">
                UM
              </div>
              <div className="py-1 px-1 sm:px-2 rounded-lg bg-purple-100 text-purple-800 font-fredoka font-bold text-xs sm:text-sm border border-purple-200">
                C
              </div>
              <div className="py-1 px-1 sm:px-2 rounded-lg bg-sky-100 text-sky-800 font-fredoka font-bold text-xs sm:text-sm border border-sky-200">
                D
              </div>
              <div className="py-1 px-1 sm:px-2 rounded-lg bg-emerald-100 text-emerald-800 font-fredoka font-bold text-xs sm:text-sm border border-emerald-200">
                U
              </div>
            </div>

            {/* Carry Row */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full max-w-md text-center mb-1">
              <div className="text-[10px] sm:text-[11px] font-bold text-amber-600 self-center font-hand truncate">
                Vai 1 ⇡
              </div>
              {(['UM', 'C', 'D', 'U'] as const).map(col => {
                const step = currentStep;
                const isCarryActive = step?.focusColumn === (col === 'D' ? 'U' : col === 'C' ? 'D' : 'C');
                const expected = step?.expectedCarry?.[col as 'D' | 'C' | 'UM'];

                return (
                  <div key={col} className="flex justify-center items-center h-7 sm:h-8">
                    {interactive && !completed ? (
                      <DroppableCell 
                        id={`carry-${col}`} 
                        value={userCarries[col]} 
                        isCarry 
                        isFocus={expected !== undefined && isCarryActive}
                        onRemove={() => handleRemoveItem('carry', col)}
                      />
                    ) : (
                      expected ? (
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-200 border border-amber-400 text-amber-900 font-bold text-[10px] sm:text-xs flex items-center justify-center">
                          +{expected}
                        </span>
                      ) : null
                    )}
                  </div>
                );
              })}
            </div>

            {/* Op1 */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full max-w-md text-center py-0.5 sm:py-1 bg-white/80 rounded-xl border border-slate-200 shadow-2xs mb-1.5 sm:mb-2">
              <div className="self-center text-slate-400 text-[10px] sm:text-xs font-mono">1ª parc.</div>
              {(['UM', 'C', 'D', 'U'] as const).map(col => {
                const digit = getOpDigit(operation.alignmentTarget?.op1Columns, col);
                return (
                  <div key={col} className="h-9 sm:h-12 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-mono font-bold text-slate-800">{digit}</span>
                  </div>
                );
              })}
            </div>

            {/* Op2 */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full max-w-md text-center py-0.5 sm:py-1 bg-white/80 rounded-xl border border-slate-200 shadow-2xs mb-1.5 sm:mb-2 relative">
              <div className="self-center font-mono font-bold text-xl sm:text-2xl text-blue-600">
                {operation.operator}
              </div>
              {(['UM', 'C', 'D', 'U'] as const).map(col => {
                const digit = getOpDigit(operation.alignmentTarget?.op2Columns, col);
                return (
                  <div key={col} className="h-9 sm:h-12 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-mono font-bold text-slate-800">{digit}</span>
                  </div>
                );
              })}
            </div>

            <div className="w-full max-w-md border-b-4 border-slate-700 my-1 rounded-full"></div>

            {/* Result */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2 w-full max-w-md text-center py-0.5 sm:py-1">
              <div className="self-center text-emerald-600 font-bold text-[10px] sm:text-xs font-sans">
                = Total
              </div>
              {(['UM', 'C', 'D', 'U'] as const).map(col => {
                const isFocus = currentStep?.focusColumn === col;
                if (interactive && !completed) {
                  return (
                    <div key={col} className="h-9 sm:h-12 flex items-center justify-center">
                      <DroppableCell 
                        id={`result-${col}`} 
                        value={userInputDigits[col]}
                        isFocus={isFocus}
                        placeholder={isFocus ? '?' : ''}
                        onRemove={() => handleRemoveItem('result', col)}
                      />
                    </div>
                  );
                }
                const totalStr = operation.totalResult.toString().padStart(4, ' ');
                const colIndexMap = { UM: 0, C: 1, D: 2, U: 3 };
                const char = totalStr[colIndexMap[col]];
                return (
                  <div key={col} className="h-9 sm:h-12 flex items-center justify-center">
                    <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-700">{char && char !== ' ' ? char : ''}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl border flex items-start gap-2 sm:gap-3 pl-3 sm:pl-6 transition-all ${
            feedback.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800'
              : feedback.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-amber-50/80 border-amber-200 text-amber-900'
          }`}>
            {feedback.type === 'error' ? <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              : feedback.type === 'success' ? <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              : <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />}
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium leading-relaxed font-sans">{feedback.message}</p>
            </div>
          </div>

          {interactive && !completed && (
            <div className="mt-3 flex justify-end">
              <button
                onClick={checkCurrentStep}
                className="px-6 py-2.5 rounded-xl text-white font-fredoka font-bold text-sm btn-3d-blue flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Conferir Passo
              </button>
            </div>
          )}
        </div>

        {/* DRAG AND DROP PALETTE */}
        {interactive && !completed && (
          <div className="w-full bg-white/80 p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex flex-wrap justify-center gap-3">
            {['0','1','2','3','4','5','6','7','8','9'].map(d => (
              <DraggableDigit key={d} digit={d} />
            ))}
          </div>
        )}
      </div>

      <DragOverlay>
        {activeDragDigit ? (
          <div className="w-14 h-14 flex items-center justify-center bg-indigo-500 rounded-xl shadow-2xl text-3xl font-bold font-mono text-white rotate-3 scale-110">
            {activeDragDigit}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
