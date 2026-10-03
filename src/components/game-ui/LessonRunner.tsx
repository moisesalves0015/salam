import React, { useState } from 'react';
import { Unit, LessonStep } from '../../types';
import { NotebookGrid } from './NotebookGrid';
import { PlaceValueManipulative } from './PlaceValueManipulative';
import { MoneyManipulator } from './MoneyManipulator';
import { VideoModal } from './VideoModal';
import { MathVisuals } from './MathVisuals';
import { DragDropGame } from './DragDropGame';
import { ReadingPassageModal } from './ReadingPassageModal';
import * as LucideIcons from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  ArrowLeft, Sparkles, CheckCircle2, XCircle, Lightbulb,
  Award, Heart, ArrowRight, BookOpen, HelpCircle, PlayCircle,
  Star, Zap, Trophy, Target, ChevronRight
} from 'lucide-react';

interface LessonRunnerProps {
  unit: Unit;
  userStats: any;
  onFinishLesson: (unitId: string, earnedXp: number) => void;
  onClose: () => void;
  onRecordMistake: (unitId: string, skill: string) => void;
}

const STEP_META: Record<LessonStep['type'], { label: string; emoji: string; color: string; bg: string; border: string }> = {
  objective:              { label: 'Objetivo',            emoji: '🎯', color: 'text-emerald-300',  bg: 'bg-emerald-500/20',  border: 'border-emerald-400/40' },
  explanation:            { label: 'Explicação',           emoji: '💡', color: 'text-sky-300',      bg: 'bg-sky-500/20',      border: 'border-sky-400/40' },
  worked_example:         { label: 'Exemplo Resolvido',   emoji: '📐', color: 'text-indigo-300',   bg: 'bg-indigo-500/20',   border: 'border-indigo-400/40' },
  notebook_demo:          { label: 'Caderno',              emoji: '📓', color: 'text-amber-300',    bg: 'bg-amber-500/20',    border: 'border-amber-400/40' },
  guided_practice:        { label: 'Prática Guiada',       emoji: '🤝', color: 'text-blue-300',     bg: 'bg-blue-500/20',     border: 'border-blue-400/40' },
  independent_exercise:   { label: 'Exercício',            emoji: '⚡', color: 'text-violet-300',   bg: 'bg-violet-500/20',   border: 'border-violet-400/40' },
  contextualized_problem: { label: 'Problema Real',        emoji: '🌍', color: 'text-rose-300',     bg: 'bg-rose-500/20',     border: 'border-rose-400/40' },
  final_challenge:        { label: 'Desafio Final',        emoji: '🏆', color: 'text-purple-300',   bg: 'bg-purple-500/20',   border: 'border-purple-400/40' },
  recovery_mission:       { label: 'Revisão',              emoji: '🔄', color: 'text-orange-300',   bg: 'bg-orange-500/20',   border: 'border-orange-400/40' },
  interactive_drag_drop:  { label: 'Prática Interativa',  emoji: '👆', color: 'text-pink-300',     bg: 'bg-pink-500/20',     border: 'border-pink-400/40' },
  dialogue:               { label: 'Eraldo conta',         emoji: '💬', color: 'text-amber-200',    bg: 'bg-amber-500/15',    border: 'border-amber-400/30' },
};

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

  const steps = unit.steps;
  const currentStep: LessonStep = steps[currentStepIndex];
  
  // Encontra o texto/receita mais recente para poder consultar
  const lastReadingPassage = [...steps].slice(0, currentStepIndex + 1).reverse().find(s => s.readingPassage)?.readingPassage;
  const progressPercent = Math.round((currentStepIndex / steps.length) * 100);
  const stepMeta = STEP_META[currentStep?.type] ?? STEP_META['explanation'];

  const triggerCelebration = () => {
    try { confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } }); } catch { /* ignore */ }
  };

  const handleNextStep = () => {
    setStepFeedback({ status: 'idle', message: '' });
    setSelectedOption(null);
    setUserWordProblemAnswer('');
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      triggerCelebration();
      onFinishLesson(unit.id, unit.xpReward);
    }
  };

  const handleCheckQuiz = () => {
    if (!currentStep.quiz || selectedOption === null) return;
    if (selectedOption === currentStep.quiz.correctIndex) {
      setStepFeedback({ status: 'success', message: currentStep.quiz.explanationOnSuccess });
    } else {
      setStepFeedback({ status: 'error', message: currentStep.quiz.explanationOnError });
      setMistakesThisSession(prev => [...prev, currentStep.title]);
      onRecordMistake(unit.id, currentStep.title);
    }
  };

  const handleCheckWordProblem = () => {
    if (!currentStep.wordProblem) return;
    const numericAnswer = parseInt(userWordProblemAnswer.trim(), 10);
    if (numericAnswer === currentStep.wordProblem.expectedAnswer) {
      setStepFeedback({ status: 'success', message: `Excelente raciocínio! ${currentStep.wordProblem.stepExplanation}` });
    } else {
      setStepFeedback({ status: 'error', message: `Ainda não está certo. Dica: ${currentStep.wordProblem.suggestedStrategy}` });
      setMistakesThisSession(prev => [...prev, currentStep.title]);
      onRecordMistake(unit.id, currentStep.title);
    }
  };

  // ── Tela de conclusão ─────────────────────────────────────────────────────
  if (isCompleted) {
    return (
      <div
        className="fixed inset-0 z-[90] flex flex-col items-center justify-center p-6 text-center"
        style={{
          backgroundImage: "url('/assets/trilhas/fundo-trilhas-vertical.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Scrim */}
        <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm" />

        <div className="relative z-10 max-w-md w-full animate-trail-enter">
          {/* Trophy */}
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-2xl border-4 border-yellow-300/50 animate-bounce">
            <Trophy className="w-14 h-14 text-amber-950" />
          </div>

          <span className="inline-block px-4 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-400/30 mb-3">
            ✨ Habilidade Dominada!
          </span>

          <h2 className="text-3xl font-black text-white mb-3 leading-tight">
            Missão Concluída!
          </h2>
          <p className="text-white/60 mb-8 font-sans leading-relaxed">
            Você dominou a unidade <span className="font-black text-white">{unit.title}</span>. Continue avançando na trilha!
          </p>

          {/* Reward cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-yellow-400/15 border border-yellow-400/25 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 mb-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-xs text-yellow-400/70 font-bold uppercase tracking-wide">XP Ganho</span>
              </div>
              <span className="text-3xl font-black text-yellow-300">+{unit.xpReward}</span>
            </div>
            <div className="bg-emerald-500/15 border border-emerald-400/25 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 mb-1">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-400/70 font-bold uppercase tracking-wide">Status</span>
              </div>
              <span className="text-2xl font-black text-emerald-300">100% ✓</span>
            </div>
          </div>

          {mistakesThisSession.length > 0 && (
            <div className="bg-blue-500/10 border border-blue-400/20 rounded-2xl p-4 text-left mb-5 text-sm">
              <p className="font-bold text-blue-300 mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Revisão Espaçada Ativada
              </p>
              <p className="text-blue-300/70 text-xs leading-relaxed">
                O sistema continuará propondo treinos rápidos para fixar o que você praticou!
              </p>
            </div>
          )}

          <button
            onClick={onClose}
            className="trail-focus w-full py-4 rounded-2xl text-slate-900 font-black text-base bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 shadow-xl transition active:scale-95 flex items-center justify-center gap-2"
          >
            <ChevronRight className="w-5 h-5" />
            Continuar na Trilha
          </button>
        </div>
      </div>
    );
  }

  // ── Tela principal do desafio ─────────────────────────────────────────────
  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col overflow-hidden"
      style={{
        backgroundImage: "url('/assets/trilhas/fundo-trilhas-vertical.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      {/* Scrim */}
      <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm z-0" />

      {/* ── TOP BAR / HUD ─────────────────────────────────────── */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-3 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-xl shrink-0">
        {/* Back */}
        <button
          onClick={onClose}
          className="trail-focus flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition active:scale-95 border border-white/10 shrink-0"
          aria-label="Voltar ao mapa da trilha"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Mapa</span>
        </button>

        {/* Progress bar */}
        <div className="flex-1 flex flex-col gap-0.5 min-w-0">
          <div className="flex justify-between items-center mb-0.5">
            <span className="text-[10px] text-white/40 font-medium truncate">{unit.title}</span>
            <span className="text-[10px] font-black text-white/60 ml-2">{currentStepIndex + 1}/{steps.length}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.max(progressPercent, 6)}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsVideoModalOpen(true)}
            className="trail-focus flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/30 rounded-xl text-purple-300 font-bold text-xs transition"
            aria-label="Assistir vídeos de apoio"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Vídeos</span>
          </button>
          <div className="flex items-center gap-1 px-2.5 py-1.5 bg-rose-500/15 border border-rose-400/20 rounded-xl text-rose-300 font-bold text-xs">
            <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
            <span>{userStats.hearts}</span>
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE CONTENT ────────────────────────────────── */}
      <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div className="max-w-2xl mx-auto pb-4">

          {/* Step type badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl ${stepMeta.bg} border ${stepMeta.border} mb-3`}>
            <span className="text-base leading-none">{stepMeta.emoji}</span>
            <span className={`text-xs font-black uppercase tracking-wider ${stepMeta.color}`}>{stepMeta.label}</span>
          </div>

          {/* Step title */}
          <h2 className="text-xl sm:text-2xl font-black text-white mb-3 leading-tight">
            {currentStep.title}
          </h2>

          {/* Character Dialogue Bubble */}
          {currentStep.mascotTip && (
            <div className="flex items-end gap-3 mb-5 animate-in fade-in slide-in-from-left-2 duration-300">
              {/* Avatar do Eraldo */}
              <div className="shrink-0 flex flex-col items-center gap-0.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-2 border-amber-300/70 flex items-center justify-center shadow-lg shadow-amber-900/30">
                  <span className="text-xl">🧑🏽</span>
                </div>
                <span className="text-[9px] font-black text-amber-400/90 uppercase tracking-widest">Eraldo</span>
              </div>
              {/* Balão de fala */}
              <div className="relative bg-slate-800 border border-amber-400/30 p-3.5 rounded-2xl rounded-bl-sm shadow-lg shadow-black/30 flex-1 max-w-[calc(100%-4.5rem)]">
                {/* Cauda do balão */}
                <div className="absolute -left-[7px] bottom-3 w-3.5 h-3.5 bg-slate-800 border-l border-b border-amber-400/30 transform rotate-45" />
                <p className="text-sm text-amber-50/90 leading-relaxed font-medium">
                  {currentStep.mascotTip}
                </p>
              </div>
            </div>
          )}

          {/* Content text */}
          <p className="text-white/75 text-sm sm:text-base mb-4 leading-relaxed whitespace-pre-wrap break-words font-sans">
            {currentStep.content}
          </p>

          {/* Root Custom Visual */}
          {currentStep.customVisual && (
            <div className="my-4 border border-white/10 rounded-xl p-4 bg-white/5 shadow-inner">
              {currentStep.customVisual.type === 'price-table' && (
                <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 max-w-sm mx-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-800 text-slate-400">
                      <tr>
                        <th className="px-4 py-3 font-bold uppercase tracking-wider">Loja</th>
                        <th className="px-4 py-3 font-bold uppercase tracking-wider text-right">Preço</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {(currentStep.customVisual.data as { store: string; price: string; highlight?: boolean }[]).map((row, idx) => (
                        <tr key={idx} className={row.highlight ? 'bg-indigo-500/20' : ''}>
                          <td className={`px-4 py-3 font-medium ${row.highlight ? 'text-indigo-300' : 'text-slate-300'}`}>{row.store}</td>
                          <td className={`px-4 py-3 font-black text-right ${row.highlight ? 'text-indigo-400' : 'text-emerald-400'}`}>{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {currentStep.customVisual.type === 'fraction-box-10' && (
                <div className="flex flex-col items-center gap-2 w-full max-w-md mx-auto my-2">
                  <div className="flex w-full border-2 border-slate-500 rounded-lg overflow-hidden bg-slate-900 h-8 shadow-lg">
                    {Array.from({ length: 10 }).map((_, i) => {
                      const isPainted = i < (currentStep.customVisual!.data as number);
                      return (
                        <div 
                          key={i} 
                          className={`flex-1 border-r border-slate-700 last:border-0 ${isPainted ? 'bg-emerald-500' : 'bg-transparent'} transition-colors duration-500`}
                        />
                      );
                    })}
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{currentStep.customVisual.data} de 10 preenchidos</span>
                </div>
              )}

              {currentStep.customVisual.type === 'vertical-math' && (
                <div className="flex justify-center my-2">
                  <div className="bg-slate-900/80 rounded-2xl p-6 border-2 border-slate-700 shadow-xl inline-block">
                    <div className="text-xl sm:text-2xl font-black text-slate-200 text-right font-mono flex flex-col items-end leading-tight tracking-wider">
                      <div>{(currentStep.customVisual.data as any).top}</div>
                      <div className="border-b-4 border-slate-500 pb-2 mb-2 flex items-center justify-between w-full gap-4">
                        <span className="text-slate-500 font-sans">{(currentStep.customVisual.data as any).operator}</span>
                        <span>{(currentStep.customVisual.data as any).bottom}</span>
                      </div>
                      <div className="pt-1 text-emerald-400">{(currentStep.customVisual.data as any).result}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reading Passage */}
          {currentStep.readingPassage && (
            <div className="my-4 bg-[#fdfbf7] border-4 border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
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
                  <span className="font-black text-slate-600 uppercase tracking-wider text-xs block mb-2">📖 Vocabulário:</span>
                  <div className="space-y-2">
                    {currentStep.readingPassage.glossary.map((g, gi) => (
                      <p key={gi} className="text-sm text-slate-600"><strong className="text-indigo-600">{g.word}:</strong> {g.meaning}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Concept Card */}
          {currentStep.conceptCard && (
            <div className="my-4 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5">
              <span className="text-[10px] uppercase font-black text-indigo-400/70 tracking-wider">Resumo Visual</span>
              <h4 className="font-black text-base sm:text-lg text-white mt-0.5 mb-3">
                {currentStep.conceptCard.title}
              </h4>
              {currentStep.conceptCard.subtitle && (
                <p className="text-xs text-white/40 mb-3">{currentStep.conceptCard.subtitle}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentStep.conceptCard.points.map((pt, pti) => {
                  const IconComponent = pt.iconName ? (LucideIcons as any)[pt.iconName] : null;
                  return (
                    <div key={pti} className="bg-white/8 p-3 rounded-xl border border-white/10">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-base text-indigo-400">
                          {IconComponent ? <IconComponent className="w-4 h-4" /> : (pt as any).iconEmoji || '✨'}
                        </span>
                        <strong className="text-xs sm:text-sm font-black text-white/90">{pt.label}</strong>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed whitespace-pre-line">{pt.text}</p>
                      
                      {pt.customVisual && (
                        <div className="mt-3 pt-3 border-t border-white/5">
                          {pt.customVisual.type === 'price-table' && (
                            <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
                              <table className="w-full text-xs text-left">
                                <thead className="bg-slate-800 text-slate-400">
                                  <tr>
                                    <th className="px-3 py-2 font-bold uppercase tracking-wider">Loja</th>
                                    <th className="px-3 py-2 font-bold uppercase tracking-wider text-right">Preço</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                  {(pt.customVisual.data as { store: string; price: string; highlight?: boolean }[]).map((row, idx) => (
                                    <tr key={idx} className={row.highlight ? 'bg-indigo-500/20' : ''}>
                                      <td className={`px-3 py-2 font-medium ${row.highlight ? 'text-indigo-300' : 'text-slate-300'}`}>{row.store}</td>
                                      <td className={`px-3 py-2 font-black text-right ${row.highlight ? 'text-indigo-400' : 'text-emerald-400'}`}>{row.price}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {pt.customVisual.type === 'fraction-box-10' && (
                            <div className="flex flex-col items-center gap-1.5 w-full">
                              <div className="flex w-full border-2 border-slate-600 rounded-md overflow-hidden bg-slate-900 h-6">
                                {Array.from({ length: 10 }).map((_, i) => {
                                  const isPainted = i < (pt.customVisual!.data as number);
                                  return (
                                    <div 
                                      key={i} 
                                      className={`flex-1 border-r border-slate-700 last:border-0 ${isPainted ? 'bg-indigo-500' : 'bg-transparent'}`}
                                    />
                                  );
                                })}
                              </div>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{pt.customVisual.data} de 10 preenchidos</span>
                            </div>
                          )}

                          {pt.customVisual.type === 'vertical-math' && (
                            <div className="flex justify-center bg-slate-900/50 rounded-xl p-3 border border-slate-700">
                              <div className="text-sm font-black text-slate-200 text-right font-mono flex flex-col items-end leading-tight">
                                <div>{(pt.customVisual.data as any).top}</div>
                                <div className="border-b-2 border-slate-500 pb-1 flex items-center justify-between w-full gap-2">
                                  <span className="text-slate-500 font-sans">{(pt.customVisual.data as any).operator}</span>
                                  <span>{(pt.customVisual.data as any).bottom}</span>
                                </div>
                                <div className="pt-1 text-emerald-400">{(pt.customVisual.data as any).result}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Written Prompt */}
          {currentStep.writtenPrompt && (
            <div className="my-4 bg-blue-500/8 border border-blue-400/20 rounded-2xl p-4 sm:p-5">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-400/70 block mb-2">✍️ Atividade de Registro</span>
              <p className="font-black text-sm sm:text-base text-white mb-2">{currentStep.writtenPrompt.question}</p>
              <div className="bg-blue-400/10 p-3 rounded-xl border border-blue-400/15 text-xs text-blue-300/80 mb-3">
                <strong className="text-blue-300">Como formular:</strong> {currentStep.writtenPrompt.guideline}
              </div>
              <div className="bg-slate-800/60 p-3 rounded-xl border border-white/10">
                <textarea
                  rows={3}
                  placeholder="Escreva sua resposta aqui..."
                  className="w-full text-sm text-white/80 placeholder:text-white/25 outline-none resize-none bg-transparent font-sans"
                />
              </div>
            </div>
          )}

          {/* Place Value Manipulative */}
          {currentStep.placeValueExample && (
            <div className="my-3">
              <PlaceValueManipulative
                initialBlocks={currentStep.placeValueExample.blocks}
                targetNumber={currentStep.placeValueExample.number}
                interactive={true}
              />
            </div>
          )}

          {/* Money / PIX */}
          {currentStep.moneyExample && (
            <div className="my-3">
              <MoneyManipulator data={currentStep.moneyExample} />
            </div>
          )}

          {/* Math Visualizations */}
          {currentStep.mafsVisualization && (
            <div className="my-4">
              <MathVisuals data={currentStep.mafsVisualization} />
            </div>
          )}

          {/* Drag and Drop Interactivity */}
          {currentStep.dragAndDrop && (
            <div className="my-4">
              <DragDropGame data={currentStep.dragAndDrop} />
            </div>
          )}

          {/* Notebook Guide */}
          {currentStep.notebookGuide && (
            <div className="my-3">
              <div className="bg-sky-500/10 border border-sky-400/20 p-3 rounded-xl mb-3 text-xs text-sky-300/80 space-y-1">
                <span className="font-black flex items-center gap-1 text-sky-300">
                  <BookOpen className="w-3.5 h-3.5" /> Dicas de Registro no Caderno:
                </span>
                {currentStep.notebookGuide.tips.map((tip, i) => (
                  <p key={i} className="text-sky-300/70">• {tip}</p>
                ))}
              </div>
              <NotebookGrid operation={currentStep.notebookGuide.operation} interactive={false} />
            </div>
          )}

          {/* Interactive Notebook */}
          {currentStep.interactiveNotebook && (
            <div className="my-3">
              <NotebookGrid
                operation={currentStep.interactiveNotebook.operation}
                interactive={true}
                onComplete={() => setStepFeedback({ status: 'success', message: 'Excelente! Você armou e resolveu cada coluna no caderno perfeitamente!' })}
                onMistake={() => { setMistakesThisSession(prev => [...prev, currentStep.title]); onRecordMistake(unit.id, currentStep.title); }}
              />
            </div>
          )}

          {/* Quiz */}
          {currentStep.quiz && (
            <div className="my-4 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                <h4 className="font-black text-white text-base flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  {currentStep.quiz.question}
                </h4>
                {lastReadingPassage && (
                  <button 
                    onClick={() => setIsReadingModalOpen(true)}
                    className="shrink-0 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wide bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 rounded-lg border border-indigo-500/30 transition-colors w-full sm:w-auto"
                  >
                    <BookOpen className="w-4 h-4" />
                    {lastReadingPassage.genre?.toLowerCase().includes('receita') ? 'Ver Receita' : 'Ver Texto'}
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 gap-2 pt-1">
                {currentStep.quiz.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  return (
                    <button
                      key={idx}
                      disabled={stepFeedback.status === 'success'}
                      onClick={() => { setSelectedOption(idx); setStepFeedback({ status: 'idle', message: '' }); }}
                      className={`trail-focus w-full p-4 text-left rounded-2xl border-2 font-medium transition-all flex items-center justify-between text-sm sm:text-base ${
                        isSelected
                          ? 'border-indigo-400 bg-indigo-500/20 text-white shadow-md ring-2 ring-indigo-400/30'
                          : 'border-white/10 bg-white/5 hover:bg-white/10 text-white/75 hover:text-white'
                      }`}
                      aria-pressed={isSelected}
                    >
                      <span>{option}</span>
                      <span className={`w-7 h-7 rounded-full border-2 flex items-center justify-center font-black text-xs shrink-0 ${
                        isSelected ? 'border-indigo-400 bg-indigo-500 text-white' : 'border-white/20 text-white/40'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Word Problem */}
          {currentStep.wordProblem && (
            <div className="my-4 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="border-l-4 border-amber-400 pl-3 relative">
                <p className="text-white/80 font-medium text-base mb-1 pr-24">{currentStep.wordProblem.story}</p>
                <p className="text-amber-300 font-black text-sm">Pergunta: {currentStep.wordProblem.question}</p>
                
                {lastReadingPassage && (
                  <button 
                    onClick={() => setIsReadingModalOpen(true)}
                    className="absolute top-0 right-0 shrink-0 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wide bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 rounded-lg border border-indigo-500/30 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    {lastReadingPassage.genre?.toLowerCase().includes('receita') ? 'Ver Receita' : 'Ver Texto'}
                  </button>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label className="text-sm font-black text-white/70">Sua Resposta:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={userWordProblemAnswer}
                    onChange={e => setUserWordProblemAnswer(e.target.value)}
                    placeholder="0"
                    disabled={stepFeedback.status === 'success'}
                    className="trail-focus px-4 py-2.5 text-lg font-black bg-white/10 border-2 border-white/20 rounded-xl outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 w-32 text-center text-white placeholder:text-white/20 transition"
                  />
                  <span className="text-sm text-white/50 font-semibold">{currentStep.wordProblem.unitName}</span>
                </div>
              </div>
            </div>
          )}

          {/* Feedback */}
          {stepFeedback.status !== 'idle' && (
            <div className={`rounded-2xl border flex items-start gap-3 my-4 overflow-hidden ${
              stepFeedback.status === 'success'
                ? 'bg-emerald-500/10 border-emerald-400/30'
                : 'bg-amber-500/10 border-amber-400/30'
            }`}>
              {/* Barra lateral colorida */}
              <div className={`w-1 self-stretch shrink-0 ${
                stepFeedback.status === 'success' ? 'bg-emerald-400' : 'bg-amber-400'
              }`} />
              <div className="py-3.5 pr-3.5 flex items-start gap-3">
                {stepFeedback.status === 'success'
                  ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  : <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                }
                <div>
                  <p className={`font-black text-sm mb-0.5 ${
                    stepFeedback.status === 'success' ? 'text-emerald-300' : 'text-amber-300'
                  }`}>
                    {stepFeedback.status === 'success' ? 'Correto!' : 'Quase lá!'}
                  </p>
                  <p className={`text-xs leading-relaxed ${
                    stepFeedback.status === 'success' ? 'text-emerald-100/75' : 'text-amber-100/75'
                  }`}>{stepFeedback.message}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── BOTTOM ACTION BAR ─────────────────────────────────── */}
      <div 
        className="relative z-10 shrink-0 px-4 pt-4 bg-slate-900/90 backdrop-blur-xl border-t border-white/10"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      >
        <div className="max-w-2xl mx-auto">
          {currentStep.quiz && stepFeedback.status !== 'success' ? (
            <button
              onClick={handleCheckQuiz}
              disabled={selectedOption === null}
              className={`trail-focus w-full py-4 rounded-2xl font-black text-[17px] flex items-center justify-center gap-2 transition active:scale-95 ${
                selectedOption === null
                  ? 'bg-white/10 text-white/30 cursor-not-allowed border border-white/10'
                  : 'bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white shadow-xl'
              }`}
            >
              Verificar Resposta
            </button>
          ) : currentStep.wordProblem && stepFeedback.status !== 'success' ? (
            <button
              onClick={handleCheckWordProblem}
              disabled={userWordProblemAnswer.trim() === ''}
              className={`trail-focus w-full py-4 rounded-2xl font-black text-[17px] flex items-center justify-center gap-2 transition active:scale-95 ${
                userWordProblemAnswer.trim() === ''
                  ? 'bg-white/10 text-white/30 cursor-not-allowed border border-white/10'
                  : 'bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white shadow-xl'
              }`}
            >
              Conferir Resposta
            </button>
          ) : (
            <button
              onClick={handleNextStep}
              className="trail-focus w-full py-4 rounded-2xl text-slate-900 font-black text-[17px] bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-xl flex items-center justify-center gap-2 transition active:scale-95"
            >
              <span>{currentStepIndex === steps.length - 1 ? 'Concluir Missão! 🏆' : 'Avançar'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

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
