import React, { useState } from 'react';
import { 
  X, 
  BrainCircuit, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Student } from '../types';

interface DiagnosticModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onCompleteDiagnostic: (studentId: string, results: Record<number, number>) => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  student,
  isOpen,
  onClose,
  onCompleteDiagnostic
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen || !student) return null;

  const questions = [
    {
      id: 1,
      block: 'Números e Composição',
      subject: 'Matemática',
      text: 'Qual é o número formado por 3 centenas, 4 dezenas e 8 unidades?',
      options: ['348', '384', '438', '3048'],
      correct: 0,
      ability: 'Reconhecer e compor números'
    },
    {
      id: 2,
      block: 'Operações Fundamentais',
      subject: 'Matemática',
      text: 'Se temos 24 chocolates e queremos repartir em 4 caixas iguais, quantos chocolates vão em cada caixa?',
      options: ['4 chocolates', '6 chocolates', '8 chocolates', '12 chocolates'],
      correct: 1,
      ability: 'Divisão por agrupamento'
    },
    {
      id: 3,
      block: 'Resolução de Problemas',
      subject: 'Matemática',
      text: 'Uma biblioteca tinha 150 livros. Recebeu 3 caixas com 20 livros cada. Quantos livros a biblioteca tem agora?',
      options: ['170 livros', '210 livros', '190 livros', '230 livros'],
      correct: 1,
      ability: 'Interpretação e problemas'
    },
    {
      id: 4,
      block: 'Leitura e Interpretação',
      subject: 'Língua Portuguesa',
      text: 'No texto: "A coruja vigiava o bosque na escuridão com seus olhos atentos." Qual palavra mostra o momento em que a ação acontece?',
      options: ['Coruja', 'Bosque', 'Escuridão', 'Atentos'],
      correct: 2,
      ability: 'Localização de pistas explícitas'
    }
  ];

  const currentQ = questions[currentQuestionIndex];

  const handleSelect = (optionIdx: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIdx }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
      confetti({ particleCount: 70, spread: 70 });
      setTimeout(() => {
        onCompleteDiagnostic(student.id, answers);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col my-auto">
        <div className="bg-purple-50/80 px-6 py-4 border-b border-purple-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-purple-800 uppercase">Diagnóstico Inicial de Habilidades</div>
              <h3 className="text-sm font-bold text-slate-900">Aluno: {student.name} ({student.grade})</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white border border-purple-200 text-slate-500 hover:text-slate-900 cursor-pointer shadow-xs">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-600">
            <span>Questão {currentQuestionIndex + 1} de {questions.length}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-semibold">
              {currentQ.block}
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="h-full bg-purple-600 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-900 leading-relaxed">
            {currentQ.text}
          </div>

          <div className="space-y-2 pt-1">
            {currentQ.options.map((opt, idx) => {
              const isSelected = answers[currentQuestionIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-100 border-purple-400 text-purple-900 font-bold shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="inline-block w-5 text-purple-700 font-bold">{String.fromCharCode(65 + idx)})</span> {opt}
                </button>
              );
            })}
          </div>

          {isFinished && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-center text-xs text-emerald-800 font-semibold animate-in zoom-in-95 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Diagnóstico concluído! O perfil de aprendizagem e as trilhas foram atualizados.</span>
            </div>
          )}
        </div>

        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer shadow-xs"
          >
            Cancelar
          </button>
          <button
            onClick={handleNext}
            disabled={answers[currentQuestionIndex] === undefined}
            className="px-5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <span>{currentQuestionIndex === questions.length - 1 ? 'Concluir Diagnóstico' : 'Próxima Questão'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
