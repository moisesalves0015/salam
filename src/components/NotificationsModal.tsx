import React from 'react';
import { X, Bell, AlertTriangle, AlertCircle, Rocket } from 'lucide-react';
import { Student } from '../types';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStudent: (student: Student) => void;
  students: Student[];
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onSelectStudent,
  students
}) => {
  if (!isOpen) return null;

  const joao = students.find(s => s.id === 'aluno-joao') || students[0];
  const maria = students.find(s => s.id === 'aluno-maria') || students[1];
  const pedro = students.find(s => s.id === 'aluno-pedro') || students[2];

  const notifications = [
    {
      id: 'notif-1',
      student: joao,
      title: 'João — Divisão (Dificuldade persistente)',
      desc: 'Motor pedagógico sugere intervenção com agrupamentos e materiais manipuláveis.',
      type: 'intervencao',
      time: '10 min atrás'
    },
    {
      id: 'notif-2',
      student: maria,
      title: 'Maria — Interpretação de texto (Atenção)',
      desc: 'Progresso lento nas últimas 2 semanas. Sugerida leitura guiada com fábulas.',
      type: 'atencao',
      time: '1 hora atrás'
    },
    {
      id: 'notif-3',
      student: pedro,
      title: 'Pedro — Pronto para avançar',
      desc: 'Desempenho consolidado em todas as etapas da Trilha dos Números!',
      type: 'avanco',
      time: 'Hoje cedo'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col my-auto">
        <div className="bg-purple-50/80 px-6 py-4 border-b border-purple-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Alertas & Notificações Pedagógicas</h3>
              <p className="text-[11px] text-slate-600 font-medium">3 avisos prioritários requerem sua atenção docente</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white border border-purple-200 text-slate-500 hover:text-slate-900 cursor-pointer shadow-xs">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onSelectStudent(n.student);
                onClose();
              }}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:bg-purple-50/30 cursor-pointer transition-all flex items-start gap-3 shadow-xs"
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                n.type === 'intervencao' ? 'bg-red-100 text-red-700 border border-red-200' :
                n.type === 'atencao' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                'bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}>
                {n.type === 'intervencao' ? <AlertTriangle className="w-4 h-4" /> : n.type === 'atencao' ? <AlertCircle className="w-4 h-4" /> : <Rocket className="w-4 h-4" />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{n.title}</h4>
                  <span className="text-[10px] text-slate-500">{n.time}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{n.desc}</p>
                <div className="text-[10px] font-semibold text-purple-700 mt-2">
                  Abrir prontuário pedagógico do aluno →
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold cursor-pointer shadow-xs"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
