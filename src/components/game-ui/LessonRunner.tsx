import React, { useEffect, useRef, useState } from 'react';
import { Unit, LessonStep } from '../../types';
import { NotebookGrid } from './NotebookGrid';
import { PlaceValueManipulative } from './PlaceValueManipulative';
import { MoneyManipulator } from './MoneyManipulator';
import { VideoModal } from './VideoModal';
import { MathVisuals } from './MathVisuals';
import { DragDropGame } from './DragDropGame';
import { GariInteraction } from '../gari-mission/GariInteraction';
import { ReadingPassageModal } from './ReadingPassageModal';
import { DecimalNumber, RichLessonText, DecimalLegend } from './LessonMath';
import { STEP_THEME, prefersReducedMotion } from '../../theme/lessonTheme';
import * as LucideIcons from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  X, Sparkles, CheckCircle2, Lightbulb, Heart, ArrowRight, BookOpen,
  HelpCircle, PlayCircle, Star, Zap, Trophy, ChevronRight, RotateCcw,
  CircleDot, PenLine, Calculator, SearchCheck, Candy, Store, Flag,
  MessageCircle, Map as MapIcon,
} from 'lucide-react';

interface LessonRunnerProps {
  unit: Unit;
  userStats: any;
  onFinishLesson: (unitId: string, earnedXp: number) => void;
  onClose: () => void;
  onRecordMistake: (unitId: string, skill: string) => void;
}

type CustomVisual = NonNullable<LessonStep['customVisual']>;

/** Paleta cíclica dos cards de conceito (borda + ícone). */
const CONCEPT_ACCENTS = [
  { box: 'bg-sky-500/20 border-sky-400/60 text-sky-200', edge: 'border-l-sky-400' },
  { box: 'bg-violet-500/20 border-violet-400/60 text-violet-200', edge: 'border-l-violet-400' },
  { box: 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200', edge: 'border-l-emerald-400' },
  { box: 'bg-blue-500/20 border-blue-400/60 text-blue-200', edge: 'border-l-blue-400' },
];
const WARNING_ACCENT = { box: 'bg-amber-500/25 border-amber-400/70 text-amber-200', edge: 'border-l-amber-400' };

/** Remove marcas que revelariam a resposta no texto da alternativa. */
const cleanOption = (option: string) => option.replace(/\s*[✓✔✅]\s*/g, ' ').trim();

/** Pequena explosão de partículas ao lado do ícone de acerto (nunca sobre o texto). */
const SPARKS = [
  { sx: '-26px', sy: '-22px', c: 'bg-emerald-300' }, { sx: '24px', sy: '-26px', c: 'bg-amber-300' },
  { sx: '30px', sy: '4px', c: 'bg-sky-300' }, { sx: '18px', sy: '26px', c: 'bg-emerald-300' },
  { sx: '-20px', sy: '24px', c: 'bg-amber-300' }, { sx: '-30px', sy: '0px', c: 'bg-violet-300' },
];

export const LessonRunner: React.FC<LessonRunnerProps> = ({
  unit, userStats, onFinishLesson, onClose, onRecordMistake
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userWordProblemAnswer, setUserWordProblemAnswer] = useState('');
  const [stepFeedback, setStepFeedback] = useState<{ status: 'idle' | 'success' | 'error'; message: string }>({ status: 'idle', message: '' });
  const [isCompleted, setIsCompleted] = useState(false);
  const [mistakesThisSession, setMistakesThisSession] = useState<string[]>([]);
  const [isReadingModalOpen, setIsReadingModalOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isChallengeExpanded, setIsChallengeExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const steps = unit.steps;
  const currentStep: LessonStep = steps[currentStepIndex];
  const theme = STEP_THEME[currentStep?.type] ?? STEP_THEME.explanation;
  const StepIcon = theme.Icon;
  const isEraldoTrack = unit.trackId === 'trilha-mat-7';
  const mascotName = isEraldoTrack ? 'Eraldo' : 'Guia da Missão';

  // Encontra o texto/receita mais recente para poder consultar
  const lastReadingPassage = [...steps].slice(0, currentStepIndex + 1).reverse().find(s => s.readingPassage)?.readingPassage;

  const stepSucceeded = stepFeedback.status === 'success';
  const completedSteps = currentStepIndex + (stepSucceeded ? 1 : 0);
  const progressPercent = Math.round((completedSteps / steps.length) * 100);
  const stepXp = Math.max(5, Math.round(unit.xpReward / steps.length));
  const sessionXp = Math.min(unit.xpReward, Math.round((unit.xpReward * completedSteps) / steps.length));
  const isLastStep = currentStepIndex === steps.length - 1;

  // Volta ao topo ao trocar de etapa
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }, [currentStepIndex]);

  const triggerCelebration = () => {
    if (prefersReducedMotion()) return;
    try { confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 }, colors: ['#34d399', '#fbbf24', '#60a5fa', '#a78bfa'] }); } catch { /* ignore */ }
  };

  const resetStepState = () => {
    setStepFeedback({ status: 'idle', message: '' });
    setSelectedOption(null);
    setUserWordProblemAnswer('');
    setShowHint(false);
    setIsChallengeExpanded(false);
  };

  useEffect(() => {
    if (stepFeedback.status === 'success') {
      if (!prefersReducedMotion()) {
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.85 },
            colors: ['#34d399', '#10b981', '#059669', '#a7f3d0', '#047857']
          });
        } catch { /* ignore */ }
      }
      
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.scrollTo({
            top: contentRef.current.scrollHeight,
            behavior: prefersReducedMotion() ? 'auto' : 'smooth'
          });
        }
      }, 50);
    }
  }, [stepFeedback.status]);

  const handleNextStep = () => {
    resetStepState();
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      triggerCelebration();
      onFinishLesson(unit.id, unit.xpReward);
    }
  };

  const recordMistake = () => {
    setMistakesThisSession(prev => [...prev, currentStep.title]);
    onRecordMistake(unit.id, currentStep.title);
  };

  const handleCheckQuiz = () => {
    if (!currentStep.quiz || selectedOption === null) return;
    if (selectedOption === currentStep.quiz.correctIndex) {
      setStepFeedback({ status: 'success', message: currentStep.quiz.explanationOnSuccess });
    } else {
      setStepFeedback({ status: 'error', message: currentStep.quiz.explanationOnError });
      recordMistake();
    }
  };

  const handleCheckWordProblem = () => {
    if (!currentStep.wordProblem) return;
    const numericAnswer = parseInt(userWordProblemAnswer.trim(), 10);
    if (numericAnswer === currentStep.wordProblem.expectedAnswer) {
      setStepFeedback({ status: 'success', message: `Excelente raciocínio! ${currentStep.wordProblem.stepExplanation}` });
    } else {
      setStepFeedback({ status: 'error', message: `Ainda não está certo. Dica: ${currentStep.wordProblem.suggestedStrategy}` });
      recordMistake();
    }
  };

  const handleTryAgain = () => {
    setStepFeedback({ status: 'idle', message: '' });
    setSelectedOption(null);
    setUserWordProblemAnswer('');
  };

  // ── Visuais customizados (tabela, caixa de 10, conta armada) ───────────────
  const renderCustomVisual = (cv: CustomVisual, compact = false) => {
    if (cv.type === 'price-table') {
      const rows = cv.data as { store: string; price: string; highlight?: boolean }[];
      return (
        <div className={`rounded-xl overflow-hidden border border-slate-500/50 bg-[#0b1430] ${compact ? '' : 'max-w-sm mx-auto'}`}>
          <div className="grid grid-cols-[1fr_auto] bg-gradient-to-r from-slate-700 to-slate-800 text-slate-100 text-[11px] font-black uppercase tracking-widest">
            <span className="px-4 py-2.5 flex items-center gap-1.5"><Store className="w-3.5 h-3.5" /> Loja</span>
            <span className="px-4 py-2.5 text-right">Preço</span>
          </div>
          <ul className="divide-y divide-slate-700/80">
            {rows.map((row, idx) => (
              <li key={idx} className={`grid grid-cols-[1fr_auto] items-center ${row.highlight ? 'bg-indigo-500/25' : idx % 2 ? 'bg-white/[0.03]' : ''}`}>
                <span className={`px-4 py-3 font-bold flex items-center gap-2 ${row.highlight ? 'text-indigo-100' : 'text-slate-200'}`}>
                  {row.highlight && <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" aria-label="destaque" />}
                  {row.store}
                </span>
                <span className={`px-4 py-3 text-right font-black ${compact ? 'text-base' : 'text-lg'}`}>
                  <DecimalNumber value={row.price.replace(/\s+/, ' ')} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    if (cv.type === 'fraction-box-10') {
      const filled = Number(cv.data) || 0;
      return (
        <div className={`flex flex-col items-center gap-3 w-full ${compact ? '' : 'max-w-md mx-auto'}`}>
          <div className="grid grid-cols-10 gap-1 w-full p-1.5 rounded-xl bg-[#0b1430] border-2 border-slate-500/60" role="img" aria-label={`${filled} de 10 espaços preenchidos`}>
            {Array.from({ length: 10 }).map((_, i) => {
              const isPainted = i < filled;
              return (
                <div
                  key={i}
                  className={`${compact ? 'h-7' : 'h-10 sm:h-12'} rounded-md flex items-center justify-center transition-colors duration-500 ${
                    isPainted
                      ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 border border-emerald-200/60 shadow-[0_0_10px_rgba(52,211,153,0.45)]'
                      : 'bg-slate-800 border border-dashed border-slate-500/70'
                  }`}
                >
                  {isPainted && !compact && <Candy className="w-4 h-4 text-emerald-950/70" aria-hidden="true" />}
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-black">
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-500/60 text-slate-100">{filled} de 10 espaços</span>
            <span className="text-slate-400">=</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-500/60 text-slate-100 lesson-math">{filled}/10</span>
            {filled < 10 && (
              <>
                <span className="text-slate-400">=</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/60 text-lg"><DecimalNumber value={`0,${filled}`} /></span>
              </>
            )}
          </div>
        </div>
      );
    }

    if (cv.type === 'vertical-math') {
      const d = cv.data as { top: string; bottom: string; operator: string; result: string };
      const unknown = /\?/.test(d.result);
      return (
        <div className="flex flex-col items-center">
          <div className={`rounded-2xl bg-[#0b1430] border-2 border-slate-500/60 shadow-xl ${compact ? 'p-3' : 'p-5 sm:p-6'} inline-block`}>
            <div className={`${compact ? 'text-base' : 'text-2xl sm:text-3xl'} font-black font-mono text-right flex flex-col items-end leading-tight tracking-wider`}>
              <DecimalNumber value={d.top} />
              <div className="border-b-4 border-slate-400 pb-2 mb-2 flex items-center justify-between w-full gap-6">
                <span className="text-amber-300 font-sans">{d.operator === '-' ? '−' : d.operator}</span>
                <DecimalNumber value={d.bottom} />
              </div>
              {unknown ? (
                <span className="px-3 rounded-lg border-2 border-dashed border-amber-400/80 bg-amber-500/10 text-amber-300" aria-label="resultado a descobrir">?</span>
              ) : (
                <span className="px-2 rounded-lg bg-emerald-500/15 border border-emerald-400/50"><DecimalNumber value={d.result} /></span>
              )}
            </div>
          </div>
          {!compact && <div className="w-full max-w-xs"><DecimalLegend /></div>}
        </div>
      );
    }
    return null;
  };

  // ── Tela de conclusão ─────────────────────────────────────────────────────
  if (isCompleted) {
    return (
      <div className="fixed inset-0 z-[90] flex flex-col items-center justify-center p-6 text-center overflow-y-auto bg-[#020617]">
        {/* Background image layers from Trail */}
        <div className="absolute inset-0 z-0 md:hidden pointer-events-none" aria-hidden="true" style={{ backgroundImage: "url('/assets/trilhas/fundo-ciep-rio-vertical.png')", backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }} />
        <div className="absolute inset-0 z-0 hidden md:block pointer-events-none" aria-hidden="true" style={{ backgroundImage: "url('/assets/trilhas/fundo-mapa-ciep-aventura-pc.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        <div className="trail-scrim absolute inset-0 z-[1] pointer-events-none" aria-hidden="true" />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-amber-500/25 to-transparent z-[2]" />

        <div className="relative z-10 max-w-md w-full animate-trail-enter">
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-600/40 border-4 border-yellow-200/70 lesson-pop">
            <Trophy className="w-14 h-14 text-amber-950" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-black uppercase tracking-widest border border-emerald-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Habilidade dominada!
          </span>

          <h2 className="text-3xl font-black text-white mb-3 leading-tight">Missão concluída!</h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Você dominou a fase <span className="font-black text-white">{unit.title}</span>. Continue avançando na trilha!
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl p-4 bg-[#2a2210] border-2 border-amber-400/60 shadow-lg shadow-amber-900/30 lesson-card-in">
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span className="text-xs text-amber-200 font-black uppercase tracking-wide">XP ganho</span>
              </div>
              <span className="text-3xl font-black text-amber-300">+{unit.xpReward}</span>
            </div>
            <div className="rounded-2xl p-4 bg-[#0d2a22] border-2 border-emerald-400/60 shadow-lg shadow-emerald-900/30 lesson-card-in" style={{ animationDelay: '80ms' }}>
              <div className="flex items-center gap-1.5 mb-1">
                <Zap className="w-4 h-4 text-emerald-300" />
                <span className="text-xs text-emerald-200 font-black uppercase tracking-wide">Etapas</span>
              </div>
              <span className="text-2xl font-black text-emerald-300 flex items-center gap-1.5">
                {steps.length}/{steps.length} <CheckCircle2 className="w-5 h-5" aria-label="concluídas" />
              </span>
            </div>
          </div>

          {mistakesThisSession.length > 0 && (
            <div className="bg-[#10213f] border border-sky-400/40 rounded-2xl p-4 text-left mb-5 text-sm">
              <p className="font-black text-sky-200 mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Revisão espaçada ativada
              </p>
              <p className="text-sky-100/80 text-xs leading-relaxed">
                O sistema continuará propondo treinos rápidos para fixar o que você praticou!
              </p>
            </div>
          )}

          <button
            onClick={onClose}
            className="trail-focus w-full min-h-[56px] rounded-2xl text-slate-900 font-black text-base bg-gradient-to-r from-yellow-300 to-amber-400 hover:brightness-110 shadow-xl shadow-amber-600/40 transition active:scale-[0.97] flex items-center justify-center gap-2 lesson-pulse-cta"
          >
            Continuar na trilha
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // ── Botão principal (barra inferior) ─────────────────────────────────────
  const primaryBase = 'trail-focus w-full min-h-[56px] rounded-2xl font-black text-[17px] flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.97]';
  const disabledCls = 'bg-slate-800 text-slate-500 cursor-not-allowed border-2 border-slate-700';
  const activeCls = `bg-gradient-to-r ${theme.button} text-white shadow-lg hover:brightness-110 border border-white/20`;

  let primaryButton: React.ReactNode;
  if (stepFeedback.status === 'error' && (currentStep.quiz || currentStep.wordProblem)) {
    primaryButton = (
      <button onClick={handleTryAgain} className={`${primaryBase} bg-gradient-to-r from-amber-400 to-orange-500 text-amber-950 shadow-lg shadow-amber-600/30 hover:brightness-110`}>
        <RotateCcw className="w-5 h-5" /> Tentar novamente
      </button>
    );
  } else if (currentStep.quiz && !stepSucceeded) {
    primaryButton = (
      <button onClick={handleCheckQuiz} disabled={selectedOption === null} className={`${primaryBase} ${selectedOption === null ? disabledCls : activeCls}`}>
        <SearchCheck className="w-5 h-5" /> Verificar resposta
      </button>
    );
  } else if (currentStep.wordProblem && !stepSucceeded) {
    const empty = userWordProblemAnswer.trim() === '';
    primaryButton = (
      <button onClick={handleCheckWordProblem} disabled={empty} className={`${primaryBase} ${empty ? disabledCls : activeCls}`}>
        <Calculator className="w-5 h-5" /> Conferir cálculo
      </button>
    );
  } else {
    primaryButton = (
      <button
        key={`next-${currentStepIndex}-${stepFeedback.status}`}
        onClick={handleNextStep}
        className={`${primaryBase} ${isLastStep
          ? 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-400 text-white shadow-lg shadow-purple-600/40 hover:brightness-110'
          : stepSucceeded
            ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-emerald-950 shadow-lg shadow-emerald-600/40 hover:brightness-110'
            : activeCls} ${stepSucceeded ? 'lesson-pulse-cta' : ''}`}
      >
        {isLastStep ? <Trophy className="w-5 h-5" /> : null}
        <span>{isLastStep ? 'Concluir missão' : 'Continuar missão'}</span>
        {!isLastStep && <ArrowRight className="w-5 h-5" />}
      </button>
    );
  }

  const hasExplanation = !!(
    currentStep.mascotTip ||
    currentStep.content ||
    currentStep.customVisual ||
    currentStep.conceptCard ||
    currentStep.readingPassage ||
    currentStep.placeValueExample ||
    currentStep.moneyExample ||
    currentStep.mafsVisualization ||
    currentStep.notebookGuide
  );
  
  const hasChallenge = !!(
    currentStep.quiz ||
    currentStep.wordProblem ||
    currentStep.writtenPrompt ||
    currentStep.dragAndDrop ||
    currentStep.interactiveNotebook
  );
  
  const challengeVisible = !hasExplanation || isChallengeExpanded || stepFeedback.status !== 'idle';

  // ── Tela principal do desafio ─────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[90] flex flex-col overflow-hidden bg-[#020617]">
      {/* Background image layers from Trail */}
      <div className="absolute inset-0 z-0 md:hidden pointer-events-none" aria-hidden="true" style={{ backgroundImage: "url('/assets/trilhas/fundo-ciep-rio-vertical.png')", backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat' }} />
      <div className="absolute inset-0 z-0 hidden md:block pointer-events-none" aria-hidden="true" style={{ backgroundImage: "url('/assets/trilhas/fundo-mapa-ciep-aventura-pc.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
      <div className="trail-scrim absolute inset-0 z-[1] pointer-events-none" aria-hidden="true" />

      {/* Brilho ambiente com a cor da etapa (troca suave a cada etapa) */}
      <div
        key={`ambient-${currentStepIndex}`}
        className={`pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b ${theme.ambient} to-transparent z-[2] lesson-card-in`}
        aria-hidden="true"
      />

      {/* ── 1. BARRA SUPERIOR / HUD ─────────────────────────────── */}
      <header className="relative z-10 shrink-0 bg-[#0a1128]/95 border-b border-slate-700/80 shadow-lg shadow-black/40">
        <div className="max-w-3xl mx-auto flex items-center gap-2.5 px-3 sm:px-4 py-2.5">
          <button
            onClick={onClose}
            className="trail-focus w-11 h-11 shrink-0 flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition active:scale-95"
            aria-label="Fechar fase e voltar ao mapa da trilha"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="shrink-0 px-2 py-0.5 rounded-md bg-slate-700 text-[10px] font-black text-white uppercase tracking-wider flex items-center gap-1">
                  <MapIcon className="w-3 h-3" /> Fase {unit.number}
                </span>
                <span className="text-xs text-slate-300 font-bold truncate">{unit.title}</span>
              </div>
              <span className="shrink-0 text-[11px] font-black text-slate-200 flex items-center gap-1" aria-live="polite">
                {stepSucceeded && <CheckCircle2 key={`ck-${currentStepIndex}`} className="w-3.5 h-3.5 text-emerald-300 lesson-pop" aria-hidden="true" />}
                Etapa {currentStepIndex + 1} de {steps.length}
              </span>
            </div>
            <div
              className="relative h-3 rounded-full bg-slate-900 border border-slate-700 overflow-hidden"
              role="progressbar"
              aria-label="Progresso da fase"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                key={`pg-${completedSteps}`}
                className={`lesson-progress-shine relative h-full rounded-full bg-gradient-to-r ${theme.progress} transition-[width] duration-700 ease-out overflow-hidden`}
                style={{ width: `${Math.max(progressPercent, 4)}%` }}
              >
                <span className="absolute right-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-1 h-9 px-2.5 rounded-xl bg-[#2a2210] border border-amber-400/60 text-amber-300 font-black text-xs" aria-label={`${sessionXp} XP acumulado nesta fase`}>
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span key={`xp-${sessionXp}`} className="lesson-pop">{sessionXp}</span>
              <span className="hidden sm:inline text-amber-200/80">XP</span>
            </div>
            <div className="hidden min-[400px]:flex items-center gap-1 h-9 px-2.5 rounded-xl bg-[#2c1424] border border-rose-400/50 text-rose-200 font-black text-xs" aria-label={`${userStats.hearts} vidas`}>
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              <span>{userStats.hearts}</span>
            </div>
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="trail-focus w-9 h-9 flex items-center justify-center rounded-xl bg-[#23174a] hover:bg-[#2e1f60] border border-violet-400/50 text-violet-200 transition"
              aria-label="Assistir vídeos de apoio"
            >
              <PlayCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── CONTEÚDO ROLÁVEL ─────────────────────────────────────── */}
      <main ref={contentRef} className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-4 py-4 sm:py-6" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div key={currentStep.id} className="max-w-3xl mx-auto pb-6 space-y-4">

          {/* ── 2. CABEÇALHO DA MISSÃO ─────────────────────────────── */}
          <section className="flex items-start gap-3 lesson-card-in">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl border-2 flex items-center justify-center shadow-lg ${theme.iconBox}`}>
              <StepIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg border text-[11px] font-black uppercase tracking-wider ${theme.chip}`}>
                {theme.label}
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-white leading-tight mt-1.5 break-words">
                {currentStep.title}
              </h1>
              {currentStep.subtitle && (
                <p className="text-sm text-slate-300 mt-1">{currentStep.subtitle}</p>
              )}
            </div>
          </section>

          {/* ── 3. ÁREA DO PERSONAGEM ─────────────────────────────── */}
          {currentStep.mascotTip && (
            <section className="flex items-end gap-2.5 sm:gap-3 lesson-bubble-in" aria-label={`Fala de ${mascotName}`}>
              <div className="shrink-0 flex flex-col items-center justify-end">
                {isEraldoTrack ? (
                  <img 
                    src="/assets/trilhas/eraldo_closeup_pointing.png" 
                    alt="Eraldo Apontando" 
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-xl -mb-1" 
                  />
                ) : (
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-[3px] border-teal-300 shadow-lg shadow-teal-900/50 bg-gradient-to-br from-teal-500 to-blue-700 flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-white" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="relative flex-1 min-w-0 rounded-2xl rounded-bl-md bg-gradient-to-br from-[#0f3a46] to-[#0d2c45] border-2 border-teal-400/70 shadow-xl shadow-teal-950/50 lesson-glow-once">
                {/* Cauda do balão */}
                <div className="absolute -left-[9px] bottom-4 w-4 h-4 bg-[#0e3445] border-l-2 border-b-2 border-teal-400/70 rotate-45" aria-hidden="true" />
                <div className="relative px-3.5 pt-2.5 pb-3 sm:px-4">
                  <span className="inline-flex items-center gap-1 -mt-0.5 mb-1.5 px-2 py-0.5 rounded-md bg-teal-400 text-teal-950 text-[10px] font-black uppercase tracking-widest">
                    <MessageCircle className="w-3 h-3" aria-hidden="true" /> {mascotName}
                  </span>
                  <p className="text-[15px] sm:text-base text-white leading-relaxed font-medium">
                    {currentStep.mascotTip}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ── 4. CONTEÚDO PRINCIPAL ─────────────────────────────── */}
          {(currentStep.content || currentStep.customVisual || currentStep.conceptCard) && (
            <section className={`relative rounded-2xl border-2 overflow-hidden shadow-xl shadow-black/40 lesson-card-in ${theme.panel}`} style={{ animationDelay: '60ms' }}>
              <div className={`h-1.5 bg-gradient-to-r ${theme.stripe}`} aria-hidden="true" />
              <div className="p-4 sm:p-5 space-y-4">
                {currentStep.content && (
                  <RichLessonText
                    text={currentStep.content}
                    className="text-slate-100 text-[15px] sm:text-base leading-relaxed space-y-1 max-w-prose"
                  />
                )}

                {currentStep.customVisual && (
                  <div className="rounded-xl p-3 sm:p-4 bg-black/25 border border-white/10">
                    {renderCustomVisual(currentStep.customVisual)}
                  </div>
                )}

                {/* Concept Card */}
                {currentStep.conceptCard && (
                  <div className="rounded-xl bg-[#0a1230] border border-white/10 p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className={`w-4 h-4 ${theme.text}`} aria-hidden="true" />
                      <span className={`text-[11px] uppercase font-black tracking-widest ${theme.text}`}>Resumo visual</span>
                    </div>
                    <h2 className="font-black text-lg sm:text-xl text-white leading-tight">{currentStep.conceptCard.title}</h2>
                    {currentStep.conceptCard.subtitle && (
                      <div className="mt-2">
                        <span className="inline-flex flex-wrap items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-500/15 border border-sky-400/50 text-base font-black">
                          {currentStep.conceptCard.subtitle.split(/(\d+,\d+)/).map((part, i) =>
                            /^\d+,\d+$/.test(part) ? <DecimalNumber key={i} value={part} /> : <span key={i} className="text-sky-100">{part}</span>
                          )}
                        </span>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                      {currentStep.conceptCard.points.map((pt, pti) => {
                        const IconComponent = pt.iconName ? (LucideIcons as any)[pt.iconName] : null;
                        const isWarning = pt.iconName === 'AlertTriangle' || pt.iconName === 'TriangleAlert';
                        const accent = isWarning ? WARNING_ACCENT : CONCEPT_ACCENTS[pti % CONCEPT_ACCENTS.length];
                        return (
                          <article
                            key={pti}
                            className={`rounded-xl border border-slate-600/70 border-l-4 ${accent.edge} ${isWarning ? 'bg-[#2a1f0c]' : 'bg-[#141e3d]'} p-3.5 lesson-card-in`}
                            style={{ animationDelay: `${100 + pti * 70}ms` }}
                          >
                            <div className="flex items-center gap-2.5 mb-2">
                              <span className={`w-9 h-9 shrink-0 rounded-lg border flex items-center justify-center ${accent.box}`}>
                                {IconComponent ? <IconComponent className="w-5 h-5" aria-hidden="true" /> : <Sparkles className="w-5 h-5" aria-hidden="true" />}
                              </span>
                              <h3 className="text-sm sm:text-[15px] font-black text-white leading-snug">{pt.label}</h3>
                            </div>
                            <RichLessonText text={pt.text} mathSize="md" className="text-[13px] sm:text-sm text-slate-200 leading-relaxed" />
                            {pt.customVisual && (
                              <div className="mt-3 pt-3 border-t border-white/10">
                                {renderCustomVisual(pt.customVisual, true)}
                              </div>
                            )}
                          </article>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Reading Passage */}
          {currentStep.readingPassage && (
            <section className="bg-[#fdfbf7] border-4 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-lg lesson-card-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-200/60 pb-3 mb-4 gap-2">
                <div>
                  <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest bg-slate-100 px-2 py-1 rounded-md">
                    {currentStep.readingPassage.genre || 'Texto de Leitura'}
                  </span>
                  <h4 className="font-black text-lg sm:text-xl text-slate-800 leading-tight mt-2">
                    {currentStep.readingPassage.title}
                  </h4>
                </div>
                {currentStep.readingPassage.author && (
                  <div className="text-xs text-slate-500 font-medium sm:text-right">
                    <span className="block uppercase text-[9px] tracking-wider text-slate-400">Fonte / Autor</span>
                    {currentStep.readingPassage.author}
                  </div>
                )}
              </div>
              <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-serif whitespace-pre-wrap break-words">
                {currentStep.readingPassage.text}
              </p>
              {currentStep.readingPassage.glossary && currentStep.readingPassage.glossary.length > 0 && (
                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-black text-slate-600 uppercase tracking-wider text-xs mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Vocabulário:
                  </span>
                  <div className="space-y-2">
                    {currentStep.readingPassage.glossary.map((g, gi) => (
                      <p key={gi} className="text-sm text-slate-600"><strong className="text-indigo-600">{g.word}:</strong> {g.meaning}</p>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Place Value Manipulative */}
          {currentStep.placeValueExample && (
            <div className="lesson-card-in">
              <PlaceValueManipulative
                initialBlocks={currentStep.placeValueExample.blocks}
                targetNumber={currentStep.placeValueExample.number}
                interactive={true}
              />
            </div>
          )}

          {/* Money / PIX */}
          {currentStep.moneyExample && (
            <div className="lesson-card-in">
              <MoneyManipulator data={currentStep.moneyExample} />
            </div>
          )}

          {/* Math Visualizations */}
          {currentStep.mafsVisualization && (
            <div className="lesson-card-in" style={{ animationDelay: '120ms' }}>
              <MathVisuals data={currentStep.mafsVisualization} />
            </div>
          )}

          {/* Notebook Guide */}
          {currentStep.notebookGuide && (
            <div className="lesson-card-in">
              <div className="bg-[#0f2340] border-2 border-sky-500/50 p-3.5 rounded-xl mb-3 text-sm text-sky-100 space-y-1">
                <span className="font-black flex items-center gap-1.5 text-sky-200">
                  <BookOpen className="w-4 h-4" /> Dicas de registro no caderno
                </span>
                {currentStep.notebookGuide.tips.map((tip, i) => (
                  <p key={i} className="text-sky-100/90">• {tip}</p>
                ))}
              </div>
              <NotebookGrid operation={currentStep.notebookGuide.operation} interactive={false} />
            </div>
          )}

          {/* ── INTERAÇÃO DE LEITURA / EXPLICAÇÃO (BOTÃO ENTENDI) ────────── */}
          {hasExplanation && hasChallenge && !isChallengeExpanded && stepFeedback.status === 'idle' && (
            <div className="flex justify-center mt-6 mb-2 lesson-card-in" style={{ animationDelay: '300ms' }}>
              <button
                onClick={() => {
                  setIsChallengeExpanded(true);
                  setTimeout(() => {
                    contentRef.current?.scrollTo({ top: contentRef.current.scrollHeight, behavior: 'smooth' });
                  }, 100);
                }}
                className="group flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black uppercase tracking-wider text-sm sm:text-base rounded-2xl shadow-lg border-b-4 border-emerald-700 active:translate-y-1 active:border-b-0 transition-all"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-900 group-hover:scale-110 transition-transform" />
                Entendi! Mostrar Desafio
              </button>
            </div>
          )}

          {/* ── ÁREAS DE DESAFIO ─────────────────────────── */}
          {challengeVisible && (
            <div className="space-y-4 pb-4 lesson-card-in">
              {/* Written Prompt */}
              {currentStep.writtenPrompt && (
                <section className="rounded-2xl border-2 border-blue-500/50 bg-[#122148] p-4 sm:p-5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-blue-300 mb-2 flex items-center gap-1.5">
                    <PenLine className="w-3.5 h-3.5" /> Atividade de registro
                  </span>
                  <p className="font-black text-sm sm:text-base text-white mb-2">{currentStep.writtenPrompt.question}</p>
                  <div className="bg-blue-500/15 p-3 rounded-xl border border-blue-400/40 text-xs text-blue-100 mb-3">
                    <strong className="text-blue-200">Como formular:</strong> {currentStep.writtenPrompt.guideline}
                  </div>
                  <textarea
                    rows={3}
                    aria-label="Sua resposta escrita"
                    placeholder="Escreva sua resposta aqui..."
                    className="trail-focus w-full text-sm text-white placeholder:text-slate-400 outline-none resize-none bg-[#0b1430] border-2 border-slate-500/60 focus:border-sky-300 rounded-xl p-3"
                  />
                </section>
              )}

              {/* Drag and Drop Interactivity */}
              {currentStep.dragAndDrop && (
                <div>
                  <DragDropGame
                    data={currentStep.dragAndDrop}
                    onComplete={() => setStepFeedback({ status: 'success', message: currentStep.dragAndDrop!.successMessage })}
                  />
                </div>
              )}

              {/* Interactive Notebook */}
              {currentStep.interactiveNotebook && (
                <div>
                  <NotebookGrid
                    operation={currentStep.interactiveNotebook.operation}
                    interactive={true}
                    onComplete={() => setStepFeedback({ status: 'success', message: 'Excelente! Você armou e resolveu cada coluna no caderno perfeitamente!' })}
                    onMistake={recordMistake}
                  />
                </div>
              )}

              {/* Gari Interaction */}
              {currentStep.gariInteraction && (
                <div>
                  <GariInteraction
                    type={currentStep.gariInteraction.type}
                    data={currentStep.gariInteraction.data}
                    onComplete={() => setStepFeedback({ status: 'success', message: 'Muito bem! Você concluiu a tarefa do gari!' })}
                  />
                </div>
              )}

              {/* Gari Interaction */}
              {currentStep.gariInteraction && (
                <div>
                  <GariInteraction
                    type={currentStep.gariInteraction.type}
                    data={currentStep.gariInteraction.data}
                    onComplete={() => setStepFeedback({ status: 'success', message: 'Muito bem! Você concluiu a tarefa do gari!' })}
                  />
                </div>
              )}

              {/* ── 5. ÁREA DA ATIVIDADE: QUIZ ─────────────────────────── */}
              {currentStep.quiz && (
                <section className="rounded-2xl border-2 border-slate-600/70 bg-[#0e1733] p-3.5 sm:p-5 shadow-xl shadow-black/40" aria-labelledby="quiz-question">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 ${theme.text}`}>
                      <HelpCircle className="w-4 h-4" aria-hidden="true" /> Sua vez
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {stepSucceeded ? 'Respondida' : stepFeedback.status === 'error' ? 'Tente outra alternativa' : selectedOption === null ? 'Escolha uma alternativa' : 'Pronto para verificar'}
                    </span>
                  </div>
                  <h2 id="quiz-question" className="font-black text-white text-base sm:text-lg leading-snug mb-3">
                    {currentStep.quiz.question}
                  </h2>

                  {lastReadingPassage && (
                    <button
                      onClick={() => setIsReadingModalOpen(true)}
                      className="trail-focus mb-3 inline-flex items-center gap-1.5 min-h-[40px] px-3 text-xs font-black uppercase tracking-wide bg-indigo-600/30 text-indigo-100 hover:bg-indigo-600/45 rounded-xl border border-indigo-400/60 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      {lastReadingPassage.genre?.toLowerCase().includes('receita') ? 'Ver receita' : 'Ver texto'}
                    </button>
                  )}

                  <div className="grid grid-cols-1 gap-2.5" role="radiogroup" aria-labelledby="quiz-question">
                    {currentStep.quiz.options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrectShown = stepSucceeded && idx === currentStep.quiz!.correctIndex;
                      const isWrongShown = stepFeedback.status === 'error' && isSelected;
                      const isDimmed = stepSucceeded && !isCorrectShown;

                      let stateCls = 'bg-[#1a2547] border-slate-500/60 text-slate-100 hover:bg-[#213060] hover:border-slate-300';
                      let markerCls = 'bg-slate-700 border-slate-400 text-slate-100';
                      let StateIcon: LucideIcons.LucideIcon | null = null;
                      let stateIconCls = '';
                      if (isCorrectShown) {
                        stateCls = 'bg-gradient-to-r from-emerald-600/40 to-emerald-700/30 border-emerald-300 text-white shadow-lg shadow-emerald-900/40 lesson-glow-once';
                        markerCls = 'bg-emerald-400 border-emerald-200 text-emerald-950';
                        StateIcon = CheckCircle2; stateIconCls = 'text-emerald-300 lesson-pop';
                      } else if (isWrongShown) {
                        stateCls = 'bg-gradient-to-r from-amber-600/35 to-orange-700/25 border-amber-300 text-white';
                        markerCls = 'bg-amber-400 border-amber-200 text-amber-950';
                        StateIcon = RotateCcw; stateIconCls = 'text-amber-300 lesson-pop';
                      } else if (isSelected) {
                        stateCls = `bg-gradient-to-r from-blue-600/45 to-indigo-600/35 border-sky-300 text-white shadow-lg shadow-blue-900/50 ring-4 ${theme.ring} lesson-glow-once`;
                        markerCls = 'bg-sky-300 border-white text-blue-950';
                        StateIcon = CircleDot; stateIconCls = 'text-sky-200';
                      } else if (isDimmed) {
                        stateCls = 'bg-[#141c38] border-slate-700 text-slate-400 opacity-70';
                      }

                      return (
                        <button
                          key={idx}
                          role="radio"
                          aria-checked={isSelected}
                          disabled={stepSucceeded}
                          onClick={() => { setSelectedOption(idx); setStepFeedback({ status: 'idle', message: '' }); }}
                          className={`trail-focus w-full min-h-[56px] px-3 py-3 text-left rounded-2xl border-2 font-semibold transition-all duration-150 active:scale-[0.98] flex items-center gap-3 text-[15px] sm:text-base disabled:cursor-default ${stateCls}`}
                        >
                          <span className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center font-black text-sm shrink-0 transition-colors ${markerCls}`} aria-hidden="true">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="flex-1 min-w-0 break-words leading-snug">{cleanOption(option)}</span>
                          {StateIcon && <StateIcon className={`w-6 h-6 shrink-0 ${stateIconCls}`} aria-hidden="true" />}
                          {isCorrectShown && <span className="sr-only">(resposta correta)</span>}
                          {isWrongShown && <span className="sr-only">(resposta a revisar)</span>}
                        </button>
                      );
                    })}
                  </div>

                  {currentStep.quiz.hint && !stepSucceeded && (
                    <div className="mt-3">
                      {showHint ? (
                        <div className="flex items-start gap-2.5 rounded-xl bg-[#10213f] border border-sky-400/50 p-3 lesson-card-in" role="note">
                          <Lightbulb className="w-5 h-5 text-sky-300 shrink-0 mt-0.5" aria-hidden="true" />
                          <p className="text-sm text-sky-50 leading-relaxed"><strong className="text-sky-200">Dica: </strong>{currentStep.quiz.hint}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowHint(true)}
                          className="trail-focus inline-flex items-center gap-1.5 min-h-[40px] px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-500/70 text-sky-200 text-sm font-bold transition"
                        >
                          <Lightbulb className="w-4 h-4" /> Pedir uma dica
                        </button>
                      )}
                    </div>
                  )}
                </section>
              )}

              {/* ── 6. ÁREA DA ATIVIDADE: PROBLEMA NUMÉRICO ────────────── */}
              {currentStep.wordProblem && (
                <section className="rounded-2xl border-2 border-slate-600/70 bg-[#0e1733] p-4 sm:p-5 space-y-4 shadow-xl shadow-black/40">
                  <div className="border-l-4 border-amber-400 pl-3">
                    <p className="text-slate-100 font-medium text-base mb-1.5">{currentStep.wordProblem.story}</p>
                    <p className="text-amber-300 font-black text-sm sm:text-base">Pergunta: {currentStep.wordProblem.question}</p>
                  </div>
                  {lastReadingPassage && (
                    <button
                      onClick={() => setIsReadingModalOpen(true)}
                      className="trail-focus inline-flex items-center gap-1.5 min-h-[40px] px-3 text-xs font-black uppercase tracking-wide bg-indigo-600/30 text-indigo-100 hover:bg-indigo-600/45 rounded-xl border border-indigo-400/60 transition-colors"
                    >
                      <BookOpen className="w-4 h-4" />
                      {lastReadingPassage.genre?.toLowerCase().includes('receita') ? 'Ver receita' : 'Ver texto'}
                    </button>
                  )}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <label htmlFor="word-answer" className="text-sm font-black text-slate-200">Sua resposta:</label>
                    <div className="flex items-stretch gap-2">
                      <input
                        id="word-answer"
                        type="number"
                        inputMode="numeric"
                        value={userWordProblemAnswer}
                        onChange={e => { setUserWordProblemAnswer(e.target.value); if (stepFeedback.status === 'error') setStepFeedback({ status: 'idle', message: '' }); }}
                        placeholder="0"
                        disabled={stepSucceeded}
                        className={`trail-focus h-14 px-4 text-xl font-black bg-[#0b1430] border-2 rounded-xl outline-none focus:ring-4 w-36 text-center text-white placeholder:text-slate-500 transition ${
                          stepSucceeded ? 'border-emerald-400 ring-emerald-400/30' : stepFeedback.status === 'error' ? 'border-amber-400 focus:ring-amber-400/30' : 'border-slate-400/70 focus:border-sky-300 focus:ring-sky-400/30'
                        }`}
                      />
                      <span className="h-14 inline-flex items-center px-3 rounded-xl bg-slate-800 border border-slate-600 text-sm text-slate-200 font-bold">
                        {currentStep.wordProblem.unitName}
                      </span>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}

          {/* ── 6. FEEDBACK ───────────────────────────────────────── */}
          {stepFeedback.status !== 'idle' && (
            <section
              key={`fb-${stepFeedback.status}-${stepFeedback.message.length}`}
              role="status"
              aria-live="polite"
              className={`relative rounded-2xl border-2 flex items-start gap-3 p-3.5 sm:p-4 lesson-card-in ${
                stepSucceeded
                  ? 'bg-[#0d2a22] border-emerald-400/80 shadow-lg shadow-emerald-950/50'
                  : 'bg-[#2a1f0c] border-amber-400/80 shadow-lg shadow-amber-950/50'
              }`}
            >
              <div className="relative shrink-0">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center lesson-pop ${stepSucceeded ? 'bg-emerald-400 text-emerald-950' : 'bg-amber-400 text-amber-950'}`}>
                  {stepSucceeded ? <CheckCircle2 className="w-6 h-6" aria-hidden="true" /> : <Lightbulb className="w-6 h-6" aria-hidden="true" />}
                </div>
                {stepSucceeded && SPARKS.map((s, i) => (
                  <span
                    key={i}
                    className={`lesson-spark absolute left-1/2 top-1/2 -ml-1 -mt-1 w-2 h-2 rounded-full ${s.c}`}
                    style={{ ['--sx' as any]: s.sx, ['--sy' as any]: s.sy, animationDelay: `${i * 25}ms` }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className={`font-black text-base ${stepSucceeded ? 'text-emerald-200' : 'text-amber-200'}`}>
                    {stepSucceeded ? 'Mandou bem!' : 'Quase lá! Vamos pensar juntos.'}
                  </p>
                  {stepSucceeded && (
                    <span className="lesson-xp-rise shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-400 text-amber-950 text-xs font-black">
                      <Star className="w-3 h-3 fill-amber-950" aria-hidden="true" /> +{stepXp} XP
                    </span>
                  )}
                </div>
                <p className={`text-sm leading-relaxed ${stepSucceeded ? 'text-emerald-50' : 'text-amber-50'}`}>{stepFeedback.message}</p>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* ── 7. BARRA INFERIOR ─────────────────────────────────────── */}
      <footer
        className="relative z-10 shrink-0 px-3 sm:px-4 pt-3 bg-[#0a1128]/95 border-t border-slate-700/80 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.6)]"
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      >
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-400 shrink-0">
            <Flag className={`w-4 h-4 ${theme.text}`} aria-hidden="true" />
            {theme.label}
          </div>
          <div className="flex-1">{primaryButton}</div>
        </div>
      </footer>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        unitTitle={unit.title}
      />

      {lastReadingPassage && (
        <ReadingPassageModal
          isOpen={isReadingModalOpen}
          onClose={() => setIsReadingModalOpen(false)}
          passage={lastReadingPassage}
        />
      )}
    </div>
  );
};
