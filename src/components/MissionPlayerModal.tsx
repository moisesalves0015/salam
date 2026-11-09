import React, { useState } from 'react';
import {
  X, CheckCircle2, ArrowRight, Lightbulb, Binoculars, Check,
  Trophy, RefreshCw, Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Mission, Student } from '../types';

interface MissionPlayerModalProps {
  mission: Mission;
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onRecordAttempt: (stepIndex: number, answer: string) => Promise<{ isCorrect: boolean; feedback: string }>;
  onCompleteMission: (xpEarned: number, updatedAbility: string) => Promise<void> | void;
}

export const MissionPlayerModal: React.FC<MissionPlayerModalProps> = ({
  mission, isOpen, onClose, onRecordAttempt, onCompleteMission
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [userReflection, setUserReflection] = useState('');
  const [contextAnswer, setContextAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);
  const [lastStepRecorded, setLastStepRecorded] = useState(false);

  if (!isOpen) return null;
  const totalSteps = mission.steps.length;
  const currentStep = mission.steps[currentStepIndex];
  const hasOptions = Boolean(currentStep?.options?.length);
  const isEmpty = totalSteps === 0;

  const recordAnswer = async (answer: string, advance: boolean) => {
    if (isSubmitting || completed || !currentStep) return;
    setIsSubmitting(true);
    setError('');
    try {
      const result = await onRecordAttempt(currentStepIndex, answer);
      setFeedback(result.feedback);
      setIsCorrect(result.isCorrect);
      if (result.isCorrect) {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
        if (advance && currentStepIndex === totalSteps - 1) setLastStepRecorded(true);
        if (advance) await advanceOrComplete();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível registrar a tentativa. Verifique a conexão e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const advanceOrComplete = async () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(index => index + 1);
      setSelectedOption(null);
      setFeedback('');
      setIsCorrect(false);
      setUserReflection('');
      setContextAnswer('');
      return;
    }
    try {
      await onCompleteMission(mission.xpReward, mission.primaryAbility);
      setCompleted(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível confirmar a conclusão da missão. Tente novamente.');
    }
  };

  const handleNext = async () => {
    if (isSubmitting || completed || !currentStep) return;
    if (currentStepIndex === totalSteps - 1 && lastStepRecorded && error) {
      await handleRetryCompletion();
      return;
    }
    if (hasOptions) {
      if (!isCorrect) return;
      setIsSubmitting(true);
      setError('');
      try {
        // A conclusão só é enviada depois de todas as etapas terem sido registradas.
        await advanceOrComplete();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Não foi possível avançar. Tente novamente.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    const answer = currentStep.type === 'refletir'
      ? userReflection.trim()
      : currentStep.contextProblem
        ? contextAnswer.trim()
        : 'Etapa registrada';
    if ((currentStep.type === 'refletir' || currentStep.contextProblem) && !answer) return;
    await recordAnswer(answer, true);
  };

  const handleRetryCompletion = async () => {
    if (isSubmitting || !isCorrect || currentStepIndex !== totalSteps - 1) return;
    setIsSubmitting(true);
    setError('');
    try {
      await onCompleteMission(mission.xpReward, mission.primaryAbility);
      setCompleted(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível confirmar a conclusão da missão. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 overflow-y-auto" style={{ backgroundImage: "url('/assets/trilhas/fundo-ciep-rio-vertical.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-2xl my-auto animate-trail-enter">
        <div className="bg-slate-900/90 border border-white/15 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/30 border border-purple-400/30 flex items-center justify-center text-purple-300 font-black text-lg">✦</div>
              <div>
                <span className="text-[10px] font-black text-purple-400/70 uppercase tracking-widest">Missão Interativa</span>
                <h2 className="text-base font-black text-white leading-tight">{mission.title}</h2>
              </div>
            </div>
            <button onClick={onClose} disabled={isSubmitting} className="trail-focus w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white/60 hover:text-white flex items-center justify-center transition border border-white/10 disabled:opacity-40" aria-label="Fechar missão"><X className="w-4 h-4" /></button>
          </div>

          {isEmpty ? (
            <div className="p-8 text-center text-sm text-white/70">Esta missão ainda não tem etapas e não pode ser concluída.</div>
          ) : <>
            {!completed && <div className="px-5 py-3 bg-slate-900/50 border-b border-white/8">
              <div className="text-[10px] text-white/50 font-medium">Etapa {currentStepIndex + 1} de {totalSteps}: <span className="text-white/70 font-bold">{currentStep.title}</span></div>
            </div>}
            <div className="p-5 space-y-4 flex-1 min-h-[320px]">
              {completed ? <div className="p-5 rounded-2xl bg-gradient-to-tr from-emerald-500/15 to-teal-500/15 border border-emerald-400/25 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto"><Trophy className="w-8 h-8" /></div>
                <h3 className="text-xl font-black text-white">Missão concluída</h3>
                <p className="text-xs text-emerald-200 font-medium">Conclusão confirmada pelo servidor.</p>
              </div> : <>
                <div className="text-[10px] font-black text-purple-400/60 uppercase tracking-widest">{currentStep.subtitle}</div>
                <p className="text-sm text-white/75 leading-relaxed font-medium bg-white/5 p-4 rounded-2xl border border-white/8">{currentStep.content}</p>

                {currentStep.interactiveData && <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/75 text-sm">
                  <div className="font-bold text-purple-200 mb-2">Visualização da etapa</div>
                  <div className="flex flex-wrap items-center gap-2"><span className="text-2xl" aria-hidden="true">{currentStep.interactiveData.itemEmoji}</span><span>{currentStep.interactiveData.totalItems} {currentStep.interactiveData.itemName}</span><span>em {currentStep.interactiveData.targetGroups} grupos</span><span>({currentStep.interactiveData.itemsPerGroup} por grupo)</span></div>
                </div>}

                {hasOptions && <div className="space-y-3">
                  <div className="text-sm font-black text-white flex items-start gap-2"><Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />{currentStep.question || currentStep.contextProblem?.question}</div>
                  <div className="space-y-2">{currentStep.options!.map((option, index) => {
                    const isSelected = selectedOption === index;
                    return <button key={index} disabled={isSubmitting || isCorrect} onClick={() => { setSelectedOption(index); void recordAnswer(option.text, false); }} className={`trail-focus w-full text-left p-3.5 rounded-2xl border text-sm font-medium transition-all flex items-center justify-between gap-3 disabled:cursor-not-allowed ${isSelected ? (isCorrect ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200' : 'bg-amber-500/15 border-amber-400/40 text-amber-200') : 'bg-white/5 border-white/10 text-white/70 hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-white'}`} aria-pressed={isSelected}>
                      <span>{option.text}</span>{isSelected && isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : isSelected && isCorrect ? <Check className="w-4 h-4" /> : isSelected && feedback ? <span className="font-black">!</span> : null}
                    </button>;
                  })}</div>
                </div>}

                {currentStep.type === 'refletir' && <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-400/20 flex items-center gap-3"><Binoculars className="w-5 h-5 text-purple-300" /><div><div className="text-sm font-black text-white">Reflexão</div><p className="text-xs text-white/50 mt-0.5">{currentStep.reflectionPrompt || 'Compartilhe sua reflexão sobre esta etapa.'}</p></div></div>
                  <textarea value={userReflection} onChange={e => setUserReflection(e.target.value)} disabled={isSubmitting || isCorrect} placeholder="Escreva sua reflexão..." className="trail-focus w-full bg-white/5 border border-white/10 rounded-2xl p-3 text-xs text-white/80 placeholder:text-white/25 focus:outline-none focus:border-purple-400/50 h-24 resize-none disabled:opacity-60" />
                </div>}

                {currentStep.contextProblem && !hasOptions && <div className="space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
                    <p className="font-bold text-white">{currentStep.contextProblem.scenario}</p>
                    <p className="mt-2">{currentStep.contextProblem.question}</p>
                  </div>
                  <label className="block text-xs font-bold text-white/70" htmlFor="mission-context-answer">Sua resposta
                    <input id="mission-context-answer" type="text" inputMode="decimal" value={contextAnswer} onChange={event => setContextAnswer(event.target.value)} disabled={isSubmitting || isCorrect} className="trail-focus mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-base text-white placeholder:text-white/30" placeholder="Digite sua resposta" />
                  </label>
                </div>}

                {feedback && <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${isCorrect ? 'bg-emerald-500/10 border-emerald-400/25 text-emerald-200' : 'bg-amber-500/10 border-amber-400/25 text-amber-200'}`}>
                  <div className="font-black flex items-center gap-1.5 mb-1">{isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <RefreshCw className="w-4 h-4 text-amber-400" />}{isCorrect ? 'Resposta registrada' : 'Tente novamente'}</div><div className="opacity-80">{feedback}</div>
                </div>}
                {error && <div role="alert" className="p-3 rounded-xl bg-red-500/10 border border-red-400/30 text-xs text-red-200">{error}</div>}
              </>}
            </div>
            {!completed && <div className="px-5 pt-4 bg-slate-900/80 border-t border-white/10 flex items-center justify-end gap-3" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
              <button onClick={currentStepIndex === totalSteps - 1 && isCorrect && error ? handleRetryCompletion : handleNext} disabled={isSubmitting || (hasOptions && !isCorrect) || (!hasOptions && currentStep.type === 'refletir' && !userReflection.trim()) || (!hasOptions && Boolean(currentStep.contextProblem) && !contextAnswer.trim())} className="trail-focus px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white text-xs font-black shadow-lg disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2 transition active:scale-95">
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}<span>{isSubmitting ? 'Registrando…' : currentStepIndex === totalSteps - 1 ? 'Concluir Missão' : 'Próxima Etapa'}</span><ArrowRight className="w-4 h-4" />
              </button>
            </div>}
          </>}
        </div>
      </div>
    </div>
  );
};
