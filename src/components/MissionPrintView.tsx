import React, { useRef } from 'react';
import { X, Printer, QrCode, BookOpen, Star, Calendar, User, ArrowRight } from 'lucide-react';
import { Mission, Student } from '../types';

interface MissionPrintViewProps {
  mission: Mission;
  student?: Student;
  isOpen: boolean;
  onClose: () => void;
}

export const MissionPrintView: React.FC<MissionPrintViewProps> = ({
  mission,
  student,
  isOpen,
  onClose
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden my-auto">
        {/* Screen-only header */}
        <div className="bg-orange-50 px-6 py-4 border-b border-orange-200 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-orange-500 text-white flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-orange-800 uppercase">Versão para Impressão</div>
              <h3 className="text-sm font-black text-slate-900">{mission.title}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir
            </button>
            <button onClick={onClose} className="p-1.5 rounded-xl bg-white border border-orange-200 text-slate-500 hover:text-slate-900 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Content */}
        <div ref={printRef} className="p-8 space-y-6 print:p-6 print:space-y-4">
          {/* Print Header */}
          <div className="border-b-2 border-slate-200 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[9px] font-black text-orange-600 uppercase tracking-widest">SALA DE MISSÕES</div>
                    <div className="text-[9px] text-slate-500 font-medium">Atividade para Impressão</div>
                  </div>
                </div>
                <h1 className="text-xl font-black text-slate-900">{mission.title}</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold border border-blue-200">
                    {mission.subject}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                    {mission.trailName}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold border border-purple-200">
                    {mission.difficulty}
                  </span>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="shrink-0 w-20 h-20 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-center">
                <QrCode className="w-6 h-6 text-slate-400 mb-1" />
                <div className="text-[8px] text-slate-400 font-bold leading-tight">QR para<br/>registrar</div>
              </div>
            </div>
          </div>

          {/* Student Info Fields */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <div className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-1">
                <User className="w-2.5 h-2.5" />
                Nome do Aluno
              </div>
              <div className="border-b-2 border-slate-300 pb-1 text-sm text-slate-900 font-semibold min-h-[1.5rem]">
                {student?.name || ''}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-1">
                <BookOpen className="w-2.5 h-2.5" />
                Turma
              </div>
              <div className="border-b-2 border-slate-300 pb-1 text-sm text-slate-900 font-semibold min-h-[1.5rem]">
                {student?.classroom || ''}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-[9px] font-black text-slate-500 uppercase flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5" />
                Data
              </div>
              <div className="border-b-2 border-slate-300 pb-1 text-sm text-slate-900 font-semibold min-h-[1.5rem]">
                ___/___/______
              </div>
            </div>
          </div>

          {/* Objective */}
          <div className="p-4 rounded-2xl bg-slate-50 border-l-4 border-blue-500">
            <div className="text-xs font-black text-blue-700 mb-1 uppercase tracking-wide">Objetivo desta Missão</div>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">{mission.objective}</p>
          </div>

          {/* Mission Steps as printed activities */}
          <div className="space-y-5">
            {mission.steps.map((step, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-black text-slate-600 uppercase tracking-wide">{step.type.toUpperCase()}</div>
                    <div className="text-sm font-black text-slate-900">{step.title}</div>
                  </div>
                </div>

                <div className="ml-8 space-y-3">
                  {step.content && (
                    <div className="text-sm text-slate-700 leading-relaxed font-medium p-3 bg-slate-50 rounded-xl border border-slate-200">
                      {step.content}
                    </div>
                  )}

                  {step.question && (
                    <div>
                      <div className="text-xs font-black text-slate-600 mb-2 uppercase">
                        <ArrowRight className="w-3 h-3 inline mr-1" />
                        Pergunta:
                      </div>
                      <div className="text-sm font-black text-slate-900 p-3 border-2 border-slate-300 rounded-xl">
                        {step.question}
                      </div>
                    </div>
                  )}

                  {/* Multiple choice options - print version */}
                  {step.options && step.options.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-[10px] font-black text-slate-500 uppercase">Opções (marque sua resposta):</div>
                      {step.options.map((opt, oi) => (
                        <div key={oi} className="flex items-center gap-2 p-2 rounded-lg border border-slate-200">
                          <div className="w-5 h-5 rounded-full border-2 border-slate-400 flex items-center justify-center shrink-0 text-xs font-black text-slate-500">
                            {String.fromCharCode(65 + oi)}
                          </div>
                          <span className="text-xs text-slate-700 font-medium">{opt.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Written answer space */}
                  {(step.type === 'refletir' || step.type === 'desafiar' || step.contextProblem) && (
                    <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase mb-2">
                        {step.contextProblem ? step.contextProblem.question : 'Sua resposta / reflexão:'}
                      </div>
                      <div className="space-y-2">
                        {step.contextProblem?.scenario && (
                          <div className="text-xs text-slate-600 font-medium p-3 bg-amber-50 border border-amber-200 rounded-xl leading-relaxed">
                            {step.contextProblem.scenario}
                          </div>
                        )}
                        {/* Writing lines */}
                        {[...Array(4)].map((_, li) => (
                          <div key={li} className="border-b border-slate-200 pb-5" />
                        ))}
                      </div>
                    </div>
                  )}

                  {step.reflectionPrompt && !step.contextProblem && (
                    <div>
                      <div className="text-[10px] font-black text-slate-500 uppercase mb-2 flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Para pensar:
                      </div>
                      <div className="text-xs text-slate-600 italic font-medium p-3 bg-purple-50 border border-purple-100 rounded-xl leading-relaxed">
                        {step.reflectionPrompt}
                      </div>
                      {[...Array(3)].map((_, li) => (
                        <div key={li} className="border-b border-slate-200 pb-5 mt-2" />
                      ))}
                    </div>
                  )}
                </div>

                {idx < mission.steps.length - 1 && (
                  <div className="border-b border-dashed border-slate-200 pt-2" />
                )}
              </div>
            ))}
          </div>

          {/* Teacher sign-off area */}
          <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-300">
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1">
                <div className="text-[9px] font-black text-slate-500 uppercase">Resultado (professor)</div>
                <div className="flex gap-3 mt-2">
                  <label className="flex items-center gap-1 text-xs text-slate-600 cursor-pointer font-medium">
                    <div className="w-4 h-4 rounded border-2 border-emerald-400 shrink-0" />
                    Dominada
                  </label>
                  <label className="flex items-center gap-1 text-xs text-slate-600 cursor-pointer font-medium">
                    <div className="w-4 h-4 rounded border-2 border-amber-400 shrink-0" />
                    Revisar
                  </label>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] font-black text-slate-500 uppercase">Próximo passo</div>
                <div className="border-b-2 border-slate-300 pb-1 min-h-[1.5rem]" />
                <div className="border-b-2 border-slate-300 pb-1 min-h-[1.5rem] mt-2" />
              </div>
              <div className="space-y-1">
                <div className="text-[9px] font-black text-slate-500 uppercase">Assinatura do Professor</div>
                <div className="border-b-2 border-slate-300 min-h-[2.5rem]" />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-[9px] text-slate-400 mt-4 print:mt-2">
            Sala de Missões • Escola Municipal Monte das Águas • 4º e 5º Anos •
            Missão: {mission.id} • +{mission.xpReward} XP ao concluir
          </div>
        </div>
      </div>
    </div>
  );
};
