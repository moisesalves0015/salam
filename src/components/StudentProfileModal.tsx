import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  ShieldCheck, 
  BrainCircuit, 
  Printer, 
  Sparkles
} from 'lucide-react';
import { Student, AbilityState } from '../types';

interface StudentProfileModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmMastery: (studentId: string, abilityId: string) => void;
  onCreateIntervention: (studentId: string) => void;
  onStartDiagnostic: (studentId: string) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  student,
  isOpen,
  onClose,
  onConfirmMastery,
  onCreateIntervention,
  onStartDiagnostic
}) => {
  const [activeTab, setActiveTab] = useState<'habilidades' | 'intervencoes' | 'evidencias' | 'adaptacoes'>('habilidades');

  if (!isOpen || !student) return null;

  const getStateBadge = (state: AbilityState) => {
    switch (state) {
      case 'dominada':
      case 'transferencia':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">Dominada</span>;
      case 'consolidando':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-300">Consolidando</span>;
      case 'em_desenvolvimento':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">Em desenvolvimento</span>;
      case 'nao_desenvolvida':
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-300">Precisa desenvolver</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="bg-purple-50/80 px-6 py-5 border-b border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
              {student.avatarUrl ? (
                <img src={student.avatarUrl} alt={student.name} className="w-full h-full rounded-[14px] object-cover" />
              ) : (
                <div className="w-full h-full bg-purple-100 rounded-[14px] flex items-center justify-center text-3xl font-black text-purple-700">
                  {student.avatar}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl font-black text-slate-900">{student.name}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-300 font-semibold">
                  {student.grade} • {student.classroom}
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  student.status === 'intervencao' 
                    ? 'bg-red-100 text-red-800 border border-red-300' 
                    : student.status === 'atencao'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : student.status === 'pronto_avancar'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-purple-100 text-purple-800 border border-purple-300'
                }`}>
                  {student.status === 'intervencao' ? 'Intervenção' : student.status === 'atencao' ? 'Atenção' : student.status === 'pronto_avancar' ? 'Pronto para avançar' : 'Evoluindo bem'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Prontuário Pedagógico Evolutivo • Docente: {student.teacherName} • Entrada: {student.entryDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => onCreateIntervention(student.id)}
              className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Nova Intervenção</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer border border-purple-200 shadow-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 px-6 border-b border-slate-200 flex gap-2 overflow-x-auto">
          {[
            { id: 'habilidades', label: 'Matriz de Habilidades' },
            { id: 'evidencias', label: 'Evidências & Autonomia' },
            { id: 'intervencoes', label: `Intervenções (${student.interventions.length})` },
            { id: 'adaptacoes', label: 'Adaptações & Inclusão' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`py-3 px-3 text-xs font-bold border-b-2 transition-all shrink-0 cursor-pointer ${
                activeTab === t.id
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Tab 1: Habilidades */}
          {activeTab === 'habilidades' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Estados Operacionais de Domínio
                </div>
                <div className="text-[11px] text-purple-700 font-bold">
                  {student.abilities.length} habilidades monitoradas
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {student.abilities.map((ab) => (
                  <div key={ab.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 transition-all flex flex-col justify-between shadow-xs">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{ab.name}</span>
                          <span className="text-[10px] text-slate-500 font-semibold">({ab.subject})</span>
                        </div>
                        {getStateBadge(ab.state)}
                      </div>

                      <div className="space-y-1.5 my-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500 font-medium">Taxa de Acerto & Regularidade</span>
                          <span className="font-bold text-slate-900">{ab.score}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${ab.score >= 80 ? 'bg-emerald-500' : ab.score >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${ab.score}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-3 text-center text-[10px] text-slate-500 bg-white p-2 rounded-xl border border-slate-200">
                        <div>
                          <div className="font-bold text-slate-900 text-xs">{ab.attempts}</div>
                          <div>Tentativas</div>
                        </div>
                        <div>
                          <div className="font-bold text-purple-700 text-xs">{ab.revisions}</div>
                          <div>Revisões</div>
                        </div>
                        <div>
                          <div className="font-bold text-emerald-700 text-xs">{ab.autonomy}%</div>
                          <div>Autonomia</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between">
                      <button
                        onClick={() => onConfirmMastery(student.id, ab.id)}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Confirmar Domínio</span>
                      </button>
                      <button
                        onClick={() => onCreateIntervention(student.id)}
                        className="text-[11px] font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Planejar Intervenção</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Evidências & Autonomia */}
          {activeTab === 'evidencias' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                <div className="flex items-center gap-2 text-purple-900 font-bold text-sm mb-1">
                  <BrainCircuit className="w-4 h-4 text-purple-600" />
                  <span>Critérios Pedagógicos de Confirmação de Domínio</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  O software Sala de Missões não confirma domínio apenas por acertos mecânicos. Acumulam-se evidências de precisão, consistência, explicação do raciocínio e aplicação contextualizada.
                </p>
              </div>

              {student.abilities.map((ab) => (
                <div key={ab.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">Evidências em {ab.name}</span>
                    <span className="text-xs text-purple-700 font-bold">{ab.subject}</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-500 mb-1">Precisão</div>
                      {getStateBadge(ab.evidence.precision)}
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-500 mb-1">Autonomia</div>
                      {getStateBadge(ab.evidence.autonomy)}
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-500 mb-1">Consistência</div>
                      {getStateBadge(ab.evidence.consistency)}
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-500 mb-1">Explicação</div>
                      {getStateBadge(ab.evidence.explanation)}
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-500 mb-1">Contexto Real</div>
                      {getStateBadge(ab.evidence.contextualSituation as any)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Intervenções */}
          {activeTab === 'intervencoes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Histórico de Intervenções Docentes</span>
                <button
                  onClick={() => onCreateIntervention(student.id)}
                  className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Registro</span>
                </button>
              </div>

              {student.interventions.length > 0 ? (
                student.interventions.map((int) => (
                  <div key={int.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 shadow-xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{int.title}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-semibold">
                            {int.ability}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {int.date} às {int.time}
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold">
                        {int.status === 'agendada' ? 'Agendada' : 'Realizada'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Estratégia Utilizada</div>
                        <div className="text-slate-800 mt-1 font-medium">{int.strategy}</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                        <div className="text-[10px] font-bold text-slate-500 uppercase">Ação Aplicada</div>
                        <div className="text-slate-800 mt-1 font-medium">{int.interventionApplied}</div>
                      </div>
                    </div>

                    {int.nextStep && (
                      <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-xs">
                        <span className="font-bold text-purple-900">Próximo Passo: </span>
                        <span className="text-slate-700">{int.nextStep}</span>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  Nenhuma intervenção registrada para este aluno até o momento.
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Adaptações & Inclusão */}
          {activeTab === 'adaptacoes' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Princípio de Inclusão por Padrão (Documento Oficial Sala de Missões)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  "Um aluno não poderá ser penalizado por precisar de mais tempo, leitura mediada, recursos visuais ou uma atividade diferenciada. O objetivo é avaliar aprendizagem e evolução."
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-slate-900">Adaptações Ativas:</div>
                  <div className="flex flex-wrap gap-2">
                    {student.adaptations.map((ad, idx) => (
                      <span key={idx} className="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span>{ad}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <div className="text-xs font-bold text-slate-900 mb-1">Anotações Pedagógicas do Professor:</div>
                  <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200 leading-relaxed">
                    {student.pedagogicalNotes}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => onStartDiagnostic(student.id)}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 shadow-xs"
          >
            <BrainCircuit className="w-4 h-4 text-purple-600" />
            <span>Revisar Diagnóstico</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200 shadow-xs"
            >
              <Printer className="w-4 h-4 text-cyan-600" />
              <span>Imprimir Prontuário</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
