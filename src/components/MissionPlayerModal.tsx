import React, { useState } from 'react';
import {
  X, Sparkles, CheckCircle2, ArrowRight, ArrowLeft,
  RefreshCw, Award, Lightbulb, Binoculars, Check, Star,
  Trophy, ChevronRight
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
  mission, isOpen, onClose, onCompleteMission
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
  const progressPercent = Math.round(((currentStepIndex + 1) / totalSteps) * 100);

  const handleSelectOption = (index: number, correct: boolean) => {
    setSelectedOption(index);
    setShowFeedback(true);
    setIsCorrect(correct);
    if (correct) confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
  };

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setSelectedOption(null);
      setShowFeedback(false);
      setIsCorrect(false);
    } else {
      setCompleted(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      setTimeout(() => { onCompleteMission(mission.xpReward, mission.primaryAbility); }, 1800);
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
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 overflow-y-auto"
      style={{
        backgroundImage: "url('/assets/trilhas/fundo-trilhas-vertical.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Scrim */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-2xl my-auto animate-trail-enter">
        {/* ── CARD ──────────────────────────────────────────────── */}
        <div className="bg-slate-900/90 border border-white/15 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/30 border border-purple-400/30 flex items-center justify-center text-purple-300 font-black text-lg shadow-md">
                ÷
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-purple-400/70 uppercase tracking-widest">Missão Interativa</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-400/15 text-yellow-300 border border-yellow-400/20 font-bold flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                    +{mission.xpReward} XP
                  </span>
                </div>
                <h2 className="text-base font-black text-white leading-tight">{mission.title}</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="trail-focus w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white/60 hover:text-white flex items-center justify-center transition border border-white/10"
              aria-label="Fechar missão"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress */}
          <div className="px-5 py-3 bg-slate-900/50 border-b border-white/8">
            <div className="flex justify-between text-[10px] text-white/40 mb-1.5 font-medium">
              <span>Etapa {currentStepIndex + 1} de {totalSteps}: <span className="text-white/60 font-bold">{currentStep.title}</span></span>
              <span className="font-black text-white/50">{progressPercent}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
                role="progressbar"
                aria-valuenow={progressPercent}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            {/* Step pills */}
            <div className="flex gap-1">
              {mission.steps.map((st, idx) => (
                <div
                  key={idx}
                  className={`flex-1 h-1 rounded-full transition-all ${
                    idx < currentStepIndex ? 'bg-emerald-400'
                    : idx === currentStepIndex ? 'bg-purple-400'
                    : 'bg-white/10'
                  }`}
                  title={st.title}
                />
              ))}
            </div>
          </div>

          {/* Step body */}
          <div className="p-5 space-y-4 flex-1 min-h-[320px]">
            {/* Subtitle */}
            <div className="text-[10px] font-black text-purple-400/60 uppercase tracking-widest">
              {currentStep.subtitle}
            </div>

            {/* Content */}
            <p className="text-sm text-white/75 leading-relaxed font-medium bg-white/5 p-4 rounded-2xl border border-white/8">
              {currentStep.content}
            </p>

            {/* Explorar */}
            {currentStep.type === 'explorar' && (
              <div className="space-y-4">
                <div className="text-xs font-bold text-white/50">
                  Visualização: 12 estrelas divididas em 3 baús
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map(groupNum => (
                    <div key={groupNum} className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
                      <div className="text-xs font-bold text-purple-300 mb-2">Baú {groupNum}</div>
                      <div className="grid grid-cols-2 gap-1.5 p-2 rounded-xl bg-white/5 border border-white/8 min-h-[60px] items-center justify-items-center">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Sparkles key={i} className="w-5 h-5 text-amber-400 fill-amber-400/50" />
                        ))}
                      </div>
                      <div className="text-[11px] font-bold text-emerald-300 mt-2">4 estrelas</div>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-400/20 text-xs text-purple-200 text-center flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                  <span><strong>Conclusão:</strong> 12 ÷ 3 = 4, porque 3 grupos de 4 = 12 (3×4=12)!</span>
                </div>
              </div>
            )}

            {/* Tentar / Revisar / Desafiar */}
            {(currentStep.type === 'tentar' || currentStep.type === 'revisar' || currentStep.type === 'desafiar') && (
              <div className="space-y-3">
                <div className="text-sm font-black text-white flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  {currentStep.question || currentStep.contextProblem?.question}
                </div>
                <div className="space-y-2">
                  {currentStep.options?.map((opt, oIndex) => {
                    const isSelected = selectedOption === oIndex;
                    return (
                      <button
                        key={oIndex}
                        onClick={() => handleSelectOption(oIndex, opt.correct)}
                        className={`trail-focus w-full text-left p-3.5 rounded-2xl border text-sm font-medium transition-all flex items-center justify-between gap-3 ${
                          isSelected
                            ? opt.correct
                              ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200'
                              : 'bg-amber-500/15 border-amber-400/40 text-amber-200'
                            : 'bg-white/5 border-white/10 text-white/70 hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-white'
                        }`}
                        aria-pressed={isSelected}
                      >
                        <span>{opt.text}</span>
                        {isSelected && (
                          opt.correct
                            ? <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0"><Check className="w-3.5 h-3.5" /></span>
                            : <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0">!</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {showFeedback && selectedOption !== null && currentStep.options && (
                  <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-400/25 text-emerald-200'
                      : 'bg-amber-500/10 border-amber-400/25 text-amber-200'
                  }`}>
                    <div className="font-black flex items-center gap-1.5 mb-1">
                      {isCorrect
                        ? <><CheckCircle2 className="w-4 h-4 text-emerald-400" /><span>Excelente raciocínio!</span></>
                        : <><RefreshCw className="w-4 h-4 text-amber-400" /><span>Vamos tentar de outra maneira!</span></>
                      }
                    </div>
                    <div className="opacity-80">{currentStep.options[selectedOption].feedback}</div>
                  </div>
                )}
              </div>
            )}

            {/* Refletir */}
            {currentStep.type === 'refletir' && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-400/20 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/20 text-purple-300 flex items-center justify-center shrink-0">
                    <Binoculars className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white">Reflexão do Explorador</div>
                    <p className="text-xs text-white/50 mt-0.5">Como você descobriu o resultado das divisões hoje?</p>
                  </div>
                </div>
                <textarea
                  value={userReflection}
                  onChange={e => setUserReflection(e.target.value)}
                  placeholder="Exemplo: Percebi que dividir em 3 grupos é como fazer a tabuada do 3 ao contrário..."
                  className="trail-focus w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs text-white/80 placeholder:text-white/25 focus:outline-none focus:border-purple-400/50 h-24 resize-none"
                />
                <div className="flex items-center gap-2 text-xs text-emerald-300 font-bold">
                  <Award className="w-4 h-4" />
                  Registrar sua reflexão concede +15 XP de aprendizagem ativa!
                </div>
              </div>
            )}

            {/* Completed */}
            {completed && (
              <div className="p-5 rounded-2xl bg-gradient-to-tr from-emerald-500/15 to-teal-500/15 border border-emerald-400/25 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-500 text-amber-950 flex items-center justify-center mx-auto shadow-xl">
                  <Trophy className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white">Missão Cumprida! 🎉</h3>
                <p className="text-xs text-emerald-300 font-medium">
                  Você conquistou +{mission.xpReward} XP!
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div 
            className="px-5 pt-4 bg-slate-900/80 border-t border-white/10 flex items-center justify-between gap-3"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="trail-focus px-4 py-2 rounded-xl bg-white/8 border border-white/10 text-white/60 hover:bg-white/15 hover:text-white text-xs font-bold disabled:opacity-25 disabled:cursor-not-allowed flex items-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Anterior
            </button>

            <button
              onClick={handleNextStep}
              disabled={
                (currentStep.type === 'tentar' || currentStep.type === 'revisar' || currentStep.type === 'desafiar') &&
                (!showFeedback || !isCorrect)
              }
              className="trail-focus px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white text-xs font-black shadow-lg disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition active:scale-95"
            >
              <span>{currentStepIndex === totalSteps - 1 ? 'Concluir Missão' : 'Próxima Etapa'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
