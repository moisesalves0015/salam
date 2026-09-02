import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Award, 
  Lightbulb, 
  Binoculars, 
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Mission, Student } from '../types';

interface MissionPlayerModalProps {
  mission: Mission;
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onCompleteMission: (xpEarned: number, updatedAbility: string) => void;
}

export const MissionPlayerModal: React.FC<MissionPlayerModalProps> = ({
  mission,
  isOpen,
  onClose,
  onCompleteMission
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userReflection, setUserReflection] = useState('');
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const currentStep = mission.steps[currentStepIndex];
  const totalSteps = mission.steps.length;

  const handleSelectOption = (index: number, correct: boolean) => {
    setSelectedOption(index);
    setShowFeedback(true);
    setIsCorrect(correct);

    if (correct) {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.6 }
      });
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      setCompleted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
      setTimeout(() => {
        onCompleteMission(mission.xpReward, mission.primaryAbility);
      }, 1800);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Modal Header */}
        <div className="bg-purple-50/80 px-6 py-4 border-b border-purple-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 flex items-center justify-center text-white font-black text-lg shadow-xs">
              ÷
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">Missão Interativa</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300 font-bold">
                  +{mission.xpReward} XP
                </span>
              </div>
              <h2 className="text-lg font-black text-slate-900">{mission.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer border border-purple-200 shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar & Stepper Indicator */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                Etapa {currentStepIndex + 1} de {totalSteps}: {currentStep.title}
              </span>
            </div>
            <span className="text-xs text-purple-700 font-bold">
              {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}%
            </span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
            />
          </div>

          {/* Stepper pills */}
          <div className="flex justify-between items-center mt-3 gap-1">
            {mission.steps.map((st, idx) => (
              <div 
                key={idx}
                className={`flex-1 text-center py-1 rounded-lg text-[10px] font-bold border transition-all ${
                  idx === currentStepIndex
                    ? 'bg-purple-100 border-purple-400 text-purple-900 shadow-xs'
                    : idx < currentStepIndex
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                {st.title}
              </div>
            ))}
          </div>
        </div>

        {/* Step Body Content */}
        <div className="p-6 space-y-5 flex-1 min-h-[320px]">
          {/* Subtitle & Story narrative */}
          <div>
            <div className="text-xs font-bold text-purple-800 uppercase tracking-wide">
              {currentStep.subtitle}
            </div>
            <p className="text-sm text-slate-800 mt-2 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {currentStep.content}
            </p>
          </div>

          {/* Step 1: Explorar (Visual Interactive Manipulation) */}
          {currentStep.type === 'explorar' && (
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-700">
                Visualização interativa: 12 estrelas divididas igualmente em 3 baús
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((groupNum) => (
                  <div key={groupNum} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center shadow-xs">
                    <div className="text-xs font-bold text-purple-800 mb-2">Baú {groupNum}</div>
                    <div className="grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-white border border-slate-200 min-h-[64px] items-center justify-items-center">
                      {Array.from({ length: 4 }).map((_, itemIndex) => (
                        <span key={itemIndex} className="text-amber-500 animate-bounce" style={{ animationDelay: `${itemIndex * 150}ms` }}>
                          <Sparkles className="w-5 h-5 fill-amber-400 text-amber-500" />
                        </span>
                      ))}
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700 mt-2">
                      4 estrelas
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 text-center flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <span><strong>Conclusão:</strong> 12 divididos por 3 é igual a 4, porque 3 grupos de 4 formam exatamente 12 (3 × 4 = 12)!</span>
              </div>
            </div>
          )}

          {/* Step 2: Tentar / Step 3: Revisar / Step 4: Desafiar (Multiple Choice with Positive Feedback) */}
          {(currentStep.type === 'tentar' || currentStep.type === 'revisar' || currentStep.type === 'desafiar') && (
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>{currentStep.question || currentStep.contextProblem?.question}</span>
              </div>

              <div className="space-y-2">
                {currentStep.options?.map((opt, oIndex) => {
                  const isSelected = selectedOption === oIndex;
                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleSelectOption(oIndex, opt.correct)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs font-bold transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? opt.correct
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-900 shadow-xs'
                            : 'bg-amber-100 border-amber-400 text-amber-900'
                          : 'bg-white border-slate-200 text-slate-800 hover:border-purple-300 hover:bg-purple-50/40'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {isSelected && (
                        opt.correct ? (
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-black shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center font-black shrink-0">
                            !
                          </span>
                        )
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Box */}
              {showFeedback && selectedOption !== null && currentStep.options && (
                <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed animate-in fade-in ${
                  isCorrect 
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900' 
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}>
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Excelente raciocínio!</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 text-amber-600" />
                        <span>Vamos tentar de outra maneira!</span>
                      </>
                    )}
                  </div>
                  <div>{currentStep.options[selectedOption].feedback}</div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Refletir */}
          {currentStep.type === 'refletir' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Binoculars className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">Reflexão do Explorador</div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Como você descobriu o resultado das divisões hoje?
                  </p>
                </div>
              </div>

              <textarea
                value={userReflection}
                onChange={(e) => setUserReflection(e.target.value)}
                placeholder="Exemplo: Percebi que dividir em 3 grupos é como fazer a tabuada do 3 ao contrário..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-500 h-24 resize-none shadow-xs"
              />

              <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Registrar sua reflexão concede +15 XP de aprendizagem ativa!</span>
              </div>
            </div>
          )}

          {/* Completed State Animation */}
          {completed && (
            <div className="p-5 rounded-2xl bg-gradient-to-tr from-emerald-50 to-teal-50 border border-emerald-300 text-center space-y-2 animate-in zoom-in-95 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Missão Cumprida com Sucesso!</h3>
              <p className="text-xs text-emerald-800 font-medium">
                Você conquistou +{mission.xpReward} XP e avançou na Trilha dos Números!
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNextStep}
              disabled={
                (currentStep.type === 'tentar' || currentStep.type === 'revisar' || currentStep.type === 'desafiar') &&
                (!showFeedback || !isCorrect)
              }
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-bold shadow-md shadow-purple-600/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <span>{currentStepIndex === totalSteps - 1 ? 'Concluir Missão & Ganhar XP' : 'Próxima Etapa'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
