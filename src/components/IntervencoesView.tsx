import React from 'react';
import { Student } from '../types';

interface IntervencoesViewProps {
  students: Student[];
  onOpenNewIntervention: () => void;
}

export const IntervencoesView: React.FC<IntervencoesViewProps> = ({
  students,
  onOpenNewIntervention
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-xs gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Central de Intervenções Docentes</h2>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Planejamento de mediação com material manipulável e leitura orientada.
          </p>
        </div>
        <button
          onClick={onOpenNewIntervention}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-purple-600/20 transition-all cursor-pointer hover:scale-[1.02] self-start sm:self-auto"
        >
          + Nova Intervenção
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {students.flatMap(s => s.interventions).map((int) => (
          <div key={int.id} className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-purple-300 transition-all space-y-3 shadow-xs">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold text-slate-900 text-sm">{int.studentName} — {int.ability}</div>
                <div className="text-xs text-slate-500 mt-0.5">{int.date} às {int.time}</div>
              </div>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-300 font-bold">
                {int.subject}
              </span>
            </div>
            <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <strong className="text-purple-700">Estratégia:</strong> {int.strategy}
            </div>
            <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <strong className="text-emerald-700">Ação:</strong> {int.interventionApplied}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
