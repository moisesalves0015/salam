import React, { useState } from 'react';
import { Unit, LessonStep } from '../../types';
import { NotebookGrid } from './NotebookGrid';
import { PlaceValue3D } from './PlaceValue3D';
import { VideoModal } from './VideoModal';
import confetti from 'canvas-confetti';

class ErrorBoundary extends React.Component<any, any> {
  state: { hasError: boolean; error: any } = { hasError: false, error: null };
  constructor(props: any) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error: any) { return { hasError: true, error }; }
  render() { if (this.state.hasError) { return <div className="p-4 bg-red-100 text-red-900">Erro no 3D: {this.state.error?.message}</div>; } return this.props.children; }
}
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Award, 
  Heart, 
  ArrowRight,
  BookOpen,
  HelpCircle,
  PlayCircle
} from 'lucide-react';

interface LessonRunnerProps {
  unit: Unit;
  userStats: any;
  onFinishLesson: (unitId: string, earnedXp: number) => void;
  onClose: () => void;
  onRecordMistake: (unitId: string, skill: string) => void;
}

export const LessonRunner: React.FC<LessonRunnerProps> = ({
  unit,
  userStats,
  onFinishLesson,
  onClose,
  onRecordMistake
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userWordProblemAnswer, setUserWordProblemAnswer] = useState('');
  const [stepFeedback, setStepFeedback] = useState<{
    status: 'idle' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });
  const [isCompleted, setIsCompleted] = useState(false);
  const [mistakesThisSession, setMistakesThisSession] = useState<string[]>([]);

  const steps = unit.steps;
  const currentStep: LessonStep = steps[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex) / steps.length) * 100);

  // Trigger celebration confetti
  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
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
      setStepFeedback({
        status: 'success',
        message: currentStep.quiz.explanationOnSuccess
      });
    } else {
      const err = currentStep.quiz.explanationOnError;
      setStepFeedback({
        status: 'error',
        message: err
      });
      setMistakesThisSession(prev => [...prev, currentStep.title]);
      onRecordMistake(unit.id, currentStep.title);
    }
  };

  const handleCheckWordProblem = () => {
    if (!currentStep.wordProblem) return;

    const numericAnswer = parseInt(userWordProblemAnswer.trim(), 10);
    if (numericAnswer === currentStep.wordProblem.expectedAnswer) {
      setStepFeedback({
        status: 'success',
        message: `Excelente raciocínio! ${currentStep.wordProblem.stepExplanation}`
      });
    } else {
      const err = `Ainda não está certo. Dica: ${currentStep.wordProblem.suggestedStrategy}`;
      setStepFeedback({
        status: 'error',
        message: err
      });
      setMistakesThisSession(prev => [...prev, currentStep.title]);
      onRecordMistake(unit.id, currentStep.title);
    }
  };

  // Get pedagogical badge for the current step type
  const getStepBadge = (type: LessonStep['type']) => {
    switch (type) {
      case 'objective':
        return { label: '1. Objetivo de Aprendizagem', color: 'bg-emerald-100 text-emerald-800' };
      case 'explanation':
        return { label: '2. Explicação Visual', color: 'bg-sky-100 text-sky-800' };
      case 'worked_example':
        return { label: '3. Exemplo Resolvido', color: 'bg-indigo-100 text-indigo-800' };
      case 'notebook_demo':
        return { label: '4. Como Fazer no Caderno', color: 'bg-amber-100 text-amber-800' };
      case 'guided_practice':
        return { label: '5. Prática Guiada', color: 'bg-blue-100 text-blue-800' };
      case 'independent_exercise':
        return { label: '6. Exercício Prático', color: 'bg-violet-100 text-violet-800' };
      case 'contextualized_problem':
        return { label: '7. Problema do Cotidiano', color: 'bg-rose-100 text-rose-800' };
      case 'final_challenge':
        return { label: '8. Desafio de Domínio', color: 'bg-purple-100 text-purple-800' };
      default:
        return { label: 'Etapa de Aprendizagem', color: 'bg-slate-100 text-slate-800' };
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
        <div className="w-24 h-24 bg-amber-100 text-amber-500 rounded-3xl flex items-center justify-center shadow-lg mb-6 border-4 border-amber-300 animate-bounce">
          <Award className="w-14 h-14" />
        </div>

        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold font-fredoka uppercase tracking-wider mb-2">
          Habilidade Dominada!
        </span>

        <h2 className="font-fredoka text-3xl font-bold text-slate-800 mb-2">
          Parabéns, Pequeno Matemático!
        </h2>
        
        <p className="text-slate-600 mb-6 font-sans">
          Você concluiu com sucesso a unidade <span className="font-bold text-slate-800">{unit.title}</span> e aprendeu a organizar seu raciocínio no caderno!
        </p>

        {/* Reward cards */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
            <span className="text-xs text-amber-700 font-bold block">XP Ganho</span>
            <span className="text-3xl font-black font-fredoka text-amber-800">+{unit.xpReward} XP</span>
          </div>
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4">
            <span className="text-xs text-emerald-700 font-bold block">Status</span>
            <span className="text-2xl font-black font-fredoka text-emerald-800">100% Completo</span>
          </div>
        </div>

        {mistakesThisSession.length > 0 && (
          <div className="w-full bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-left mb-6 text-sm">
            <p className="font-semibold text-blue-900 mb-1 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-blue-600" /> Revisão Espaçada Ativada:
            </p>
            <p className="text-blue-800 text-xs">
              Alguns passos foram revisados durante a aula. O sistema continuará propondo pequenos treinos rápidos para você nunca esquecer!
            </p>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-4 rounded-2xl text-white font-fredoka text-lg font-bold btn-3d-emerald shadow-lg"
        >
          Continuar na Trilha
        </button>
      </div>
    );
  }

  const badgeInfo = getStepBadge(currentStep.type);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 min-h-[90vh] flex flex-col justify-between">
      {/* Top Bar with Progress, Hearts and Exit */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-3">
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
            title="Voltar ao mapa"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Progress Bar */}
          <div className="flex-1 bg-slate-200 h-3.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${Math.max(progressPercent, 10)}%` }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Videos Button */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-full text-purple-600 font-bold text-sm transition shadow-sm"
            >
              <PlayCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Vídeos</span>
            </button>
            {/* Hearts / Vidas */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-200 rounded-full text-rose-600 font-bold text-sm shadow-sm">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span>{userStats.hearts}</span>
            </div>
          </div>
        </div>

        {/* Pedagogical Step Tag */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-fredoka ${badgeInfo.color}`}>
            {badgeInfo.label}
          </span>
          <span className="text-xs text-slate-400">
            {currentStepIndex + 1} de {steps.length}
          </span>
        </div>

        {/* Step Title */}
        <h2 className="font-fredoka text-2xl font-bold text-slate-800 mb-2">
          {currentStep.title}
        </h2>
      </div>

      {/* Main Step Content Area */}
      <div className="my-auto py-2">
        {/* Mascot Speech Bubble if available */}
        {currentStep.mascotTip && (
          <div className="flex items-start gap-3 bg-amber-50 border-2 border-amber-200/80 p-3.5 rounded-2xl mb-4 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-xl shadow flex-shrink-0">
              🦉
            </div>
            <div>
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider block font-fredoka">
                Dica do Teco (Mascote)
              </span>
              <p className="text-sm text-amber-950 font-medium leading-relaxed font-sans">
                {currentStep.mascotTip}
              </p>
            </div>
          </div>
        )}

        {/* Content text */}
        <p className="text-slate-700 text-sm sm:text-base mb-4 leading-relaxed font-sans whitespace-pre-line">
          {currentStep.content}
        </p>

        {/* Reading Passage (Português, História) */}
        {currentStep.readingPassage && (
          <div className="my-4 bg-amber-50/40 border-2 border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-amber-200 pb-2 mb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                  {currentStep.readingPassage.genre || 'Texto de Leitura'}
                </span>
                <h4 className="font-fredoka text-base sm:text-lg font-bold text-slate-800">
                  {currentStep.readingPassage.title}
                </h4>
              </div>
              {currentStep.readingPassage.author && (
                <span className="text-xs text-slate-500 italic hidden sm:inline">
                  {currentStep.readingPassage.author}
                </span>
              )}
            </div>

            <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-serif indent-3 whitespace-pre-line">
              {currentStep.readingPassage.text}
            </p>

            {currentStep.readingPassage.glossary && currentStep.readingPassage.glossary.length > 0 && (
              <div className="mt-3 pt-3 border-t border-amber-200/70 text-xs">
                <span className="font-bold text-amber-900 block mb-1">📖 Vocabulário do Texto:</span>
                <div className="space-y-1">
                  {currentStep.readingPassage.glossary.map((g, gi) => (
                    <p key={gi} className="text-slate-700">
                      <strong className="text-amber-900">{g.word}:</strong> {g.meaning}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Concept Card (Ciências, História, Geografia, Artes, Financeira) */}
        {currentStep.conceptCard && (
          <div className="my-4 bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5">
            <div className="mb-3">
              <span className="text-[10px] uppercase font-bold text-indigo-700 tracking-wider">
                Resumo Visual do Conceito
              </span>
              <h4 className="font-fredoka text-base sm:text-lg font-bold text-slate-800">
                {currentStep.conceptCard.title}
              </h4>
              {currentStep.conceptCard.subtitle && (
                <p className="text-xs text-slate-500">{currentStep.conceptCard.subtitle}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentStep.conceptCard.points.map((pt, pti) => (
                <div key={pti} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-base">{pt.iconEmoji || '✨'}</span>
                    <strong className="text-xs sm:text-sm font-fredoka text-slate-800">{pt.label}</strong>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{pt.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Written Prompt with interactive handwriting box */}
        {currentStep.writtenPrompt && (
          <div className="my-4 bg-[#fcfcf9] p-4 sm:p-5 rounded-2xl border-2 border-slate-300 shadow-xs notebook-grid">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block mb-1">
              ✍️ Atividade de Registro no Caderno
            </span>
            <p className="font-fredoka text-sm sm:text-base font-bold text-slate-800 mb-2">
              {currentStep.writtenPrompt.question}
            </p>
            <div className="bg-white/80 p-3 rounded-xl border border-blue-200 text-xs text-blue-900 mb-3">
              <strong>Como formular sua resposta:</strong> {currentStep.writtenPrompt.guideline}
            </div>
            <div className="space-y-3 bg-white p-3 rounded-xl border border-slate-200">
              <textarea
                rows={3}
                placeholder="Escreva sua resposta completa aqui..."
                className="w-full text-sm font-sans text-slate-800 outline-none resize-none bg-transparent"
              />
            </div>
          </div>
        )}

        {/* Place Value / Base 10 Example */}
        {currentStep.placeValueExample && (
          <div className="my-3">
            <ErrorBoundary>
              <PlaceValue3D
                units={currentStep.placeValueExample.blocks.units}
                tens={currentStep.placeValueExample.blocks.tens}
                hundreds={currentStep.placeValueExample.blocks.hundreds}
                interactive={true}
              />
            </ErrorBoundary>
          </div>
        )}

        {/* Notebook Guide (Demonstração no Caderno) */}
        {currentStep.notebookGuide && (
          <div className="my-2">
            <div className="bg-sky-50 border border-sky-200 p-3 rounded-xl mb-3 text-xs text-sky-900 space-y-1">
              <span className="font-bold flex items-center gap-1 text-sky-800">
                <BookOpen className="w-3.5 h-3.5" /> Dicas de Registro no Caderno:
              </span>
              {currentStep.notebookGuide.tips.map((tip, i) => (
                <p key={i}>• {tip}</p>
              ))}
            </div>
            <NotebookGrid
              operation={currentStep.notebookGuide.operation}
              interactive={false}
            />
          </div>
        )}

        {/* Interactive Notebook (Exercício armado guiado) */}
        {currentStep.interactiveNotebook && (
          <div className="my-2">
            <NotebookGrid
              operation={currentStep.interactiveNotebook.operation}
              interactive={true}
              onComplete={() => {
                setStepFeedback({
                  status: 'success',
                  message: 'Excelente! Você armou e resolveu cada coluna no caderno perfeitamente!'
                });
              }}
              onMistake={(err) => {
                setMistakesThisSession(prev => [...prev, currentStep.title]);
                onRecordMistake(unit.id, currentStep.title);
              }}
            />
          </div>
        )}

        {/* Multiple Choice Quiz */}
        {currentStep.quiz && (
          <div className="my-4 space-y-2.5">
            <h4 className="font-fredoka text-slate-800 text-base font-bold flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-indigo-500" />
              {currentStep.quiz.question}
            </h4>

            <div className="grid grid-cols-1 gap-2.5 pt-1">
              {currentStep.quiz.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    disabled={stepFeedback.status === 'success'}
                    onClick={() => {
                      setSelectedOption(idx);
                      setStepFeedback({ status: 'idle', message: '' });
                    }}
                    className={`w-full p-4 text-left rounded-2xl border-2 font-medium transition-all flex items-center justify-between text-sm sm:text-base ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/80 text-blue-900 shadow-md ring-2 ring-blue-300'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <span>{option}</span>
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-xs ${
                      isSelected ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-300 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Word Problem Interactive Input */}
        {currentStep.wordProblem && (
          <div className="my-4 bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-sm space-y-4">
            <div className="border-l-4 border-amber-400 pl-3">
              <p className="text-slate-800 font-medium text-base mb-1">
                {currentStep.wordProblem.story}
              </p>
              <p className="text-blue-900 font-bold text-sm">
                Pergunta: {currentStep.wordProblem.question}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <label className="text-sm font-bold text-slate-700 font-fredoka">
                Sua Resposta:
              </label>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="number"
                  value={userWordProblemAnswer}
                  onChange={(e) => setUserWordProblemAnswer(e.target.value)}
                  placeholder="Número"
                  disabled={stepFeedback.status === 'success'}
                  className="px-4 py-2.5 text-lg font-bold font-mono border-2 border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-32 text-center"
                />
                <span className="text-sm text-slate-500 font-semibold">
                  {currentStep.wordProblem.unitName}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Alert for Quiz / Word Problem */}
        {stepFeedback.status !== 'idle' && (
          <div className={`p-4 rounded-2xl border-2 flex items-start gap-3 my-4 transition-all ${
            stepFeedback.status === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            {stepFeedback.status === 'success' ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-bold text-base">
                {stepFeedback.status === 'success' ? 'Muito Bem!' : 'Vamos Tentar Novamente!'}
              </p>
              <p className="text-sm mt-0.5 font-sans leading-relaxed">
                {stepFeedback.message}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
        {/* If step has quiz and not answered correctly yet */}
        {currentStep.quiz && stepFeedback.status !== 'success' ? (
          <button
            onClick={handleCheckQuiz}
            disabled={selectedOption === null}
            className={`w-full py-3.5 rounded-2xl font-fredoka text-base font-bold flex items-center justify-center gap-2 transition ${
              selectedOption === null
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'text-white btn-3d-blue'
            }`}
          >
            Verificar Resposta
          </button>
        ) : currentStep.wordProblem && stepFeedback.status !== 'success' ? (
          <button
            onClick={handleCheckWordProblem}
            disabled={userWordProblemAnswer.trim() === ''}
            className={`w-full py-3.5 rounded-2xl font-fredoka text-base font-bold flex items-center justify-center gap-2 transition ${
              userWordProblemAnswer.trim() === ''
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'text-white btn-3d-blue'
            }`}
          >
            Conferir Problema
          </button>
        ) : (
          <button
            onClick={handleNextStep}
            className="w-full py-3.5 rounded-2xl text-white font-fredoka text-base font-bold btn-3d-emerald flex items-center justify-center gap-2 shadow-md"
          >
            <span>{currentStepIndex === steps.length - 1 ? 'Concluir Unidade!' : 'Avançar'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
      {/* Modal de Vídeos */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        unitTitle={unit.title}
      />
    </div>
  );
};
