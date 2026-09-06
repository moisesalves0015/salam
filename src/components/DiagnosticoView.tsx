import React from 'react';
import { Student } from '../types';

interface DiagnosticoViewProps {
  selectedStudent: Student;
  onOpenDiagnostic: () => void;
}

export const DiagnosticoView: React.FC<DiagnosticoViewProps> = ({
  selectedStudent,
  onOpenDiagnostic
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h2 className="text-2xl font-black text-slate-900">Diagnóstico Inicial de Habilidades</h2>
        <p className="text-xs text-slate-600 mt-1 max-w-xl font-medium">
          O diagnóstico da Sala de Missões mapeia com precisão em qual etapa do raciocínio cada estudante se encontra antes do início das trilhas.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            onClick={onOpenDiagnostic}
            className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all cursor-pointer hover:scale-[1.02]"
          >
            Iniciar Diagnóstico com {selectedStudent?.name || 'Estudante'}
          </button>
        </div>
      </div>
    </div>
  );
};
