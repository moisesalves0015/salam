import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { Student, InterventionRecord } from '../types';

interface InterventionModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  preselectedStudentId?: string;
  onSaveIntervention: (intervention: InterventionRecord) => void;
}

export const InterventionModal: React.FC<InterventionModalProps> = ({
  isOpen,
  onClose,
  students,
  preselectedStudentId,
  onSaveIntervention
}) => {
  const [studentId, setStudentId] = useState(preselectedStudentId || (students[0]?.id || ''));
  const [ability, setAbility] = useState('Divisão por agrupamento');
  const [subject, setSubject] = useState<'Matemática' | 'Língua Portuguesa' | 'Ciências'>('Matemática');
  const [title, setTitle] = useState('Reforço em pequenos grupos com material manipulável');
  const [strategy, setStrategy] = useState('Uso de tampinhas e formação de grupos iguais');
  const [initialError, setInitialError] = useState('Errou ao determinar o número de grupos por cálculo mental abstrato.');
  const [interventionApplied, setInterventionApplied] = useState('Distribuição física com 24 tampinhas em 4 copos transparentes.');
  const [nextStep, setNextStep] = useState('Aplicar divisão em situação-problema contextualizada da escola.');
  const [date, setDate] = useState('Hoje');
  const [time, setTime] = useState('14:00');

  if (!isOpen) return null;

  const currentStudent = students.find(s => s.id === studentId) || students[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newInt: InterventionRecord = {
      id: `int-${Date.now()}`,
      studentId: currentStudent?.id || studentId || 'aluno-1',
      studentName: currentStudent?.name || 'Estudante',
      ability,
      subject,
      date,
      time,
      title,
      strategy,
      initialAttemptError: initialError,
      interventionApplied,
      nextStep,
      status: 'agendada'
    };

    onSaveIntervention(newInt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        <div className="bg-purple-50/80 px-6 py-4 border-b border-purple-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Registro de Intervenção Pedagógica Docente</h3>
              <p className="text-xs text-slate-600 font-medium">Conforme metodologia oficial Sala de Missões</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white border border-purple-200 text-slate-500 hover:text-slate-900 cursor-pointer shadow-xs">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Aluno Alvo</label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-medium focus:outline-none focus:border-purple-500 shadow-xs"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.grade})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Disciplina</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 font-medium focus:outline-none focus:border-purple-500 shadow-xs"
              >
                <option value="Matemática">Matemática (Trilha dos Números)</option>
                <option value="Língua Portuguesa">Língua Portuguesa (Trilha da Leitura)</option>
                <option value="Ciências">Ciências (Trilha da Natureza)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Habilidade Trabalhada</label>
              <input
                type="text"
                value={ability}
                onChange={(e) => setAbility(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-purple-500 shadow-xs"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Título da Ação</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-purple-500 shadow-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Data</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-purple-500 shadow-xs"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Horário</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-purple-500 shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Tentativa Inicial & Erro Observado</label>
            <textarea
              value={initialError}
              onChange={(e) => setInitialError(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 h-16 resize-none focus:outline-none focus:border-purple-500 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Estratégia & Intervenção Aplicada</label>
            <textarea
              value={interventionApplied}
              onChange={(e) => setInterventionApplied(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 h-16 resize-none focus:outline-none focus:border-purple-500 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Próximo Passo Recomendado</label>
            <input
              type="text"
              value={nextStep}
              onChange={(e) => setNextStep(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:outline-none focus:border-purple-500 shadow-xs"
            />
          </div>

          <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold cursor-pointer shadow-xs"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md shadow-purple-600/20 cursor-pointer transition-all hover:scale-[1.02]"
            >
              Salvar Intervenção
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
