import React from 'react';
import { Building2, Users, TrendingUp, Layers } from 'lucide-react';
import { Student, ClassMetrics } from '../types';

interface CoordenacaoDashboardProps {
  students: Student[];
  metrics: ClassMetrics;
  onNavigateToTab?: (tab: string) => void;
}

export const CoordenacaoDashboard: React.FC<CoordenacaoDashboardProps> = ({ students, metrics }) => {
  const studentsByClass = students.reduce<Record<string, Student[]>>((groups, student) => {
    const classroom = student.classroom?.trim();
    if (classroom) (groups[classroom] ??= []).push(student);
    return groups;
  }, {});
  const classes = Object.entries(studentsByClass);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/70 to-pink-50/60 p-5 sm:p-6 rounded-3xl border border-purple-200 shadow-xs relative overflow-hidden flex items-center gap-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-100 border-2 border-purple-300 flex items-center justify-center text-purple-700">
          <Building2 className="w-7 h-7" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Painel da Coordenação Pedagógica</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-300 text-purple-800 text-xs font-bold">Gestão Escolar</span>
          </div>
          <p className="text-sm text-slate-600 font-medium mt-1">Acompanhamento das informações disponíveis dos estudantes e da turma.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-11 h-11 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700"><Users className="w-5 h-5" /></div>
          <div className="my-3"><div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">{metrics.totalStudents}</div><div className="text-xs text-slate-600 font-semibold mt-1">Estudantes</div></div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700"><TrendingUp className="w-5 h-5" /></div>
          <div className="my-3"><div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono tracking-tight">{metrics.averageMissionProgressPercent}%</div><div className="text-xs text-slate-600 font-semibold mt-1">Progresso médio das missões</div></div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-11 h-11 rounded-2xl bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700"><Layers className="w-5 h-5" /></div>
          <div className="my-3"><div className="text-3xl sm:text-4xl font-black text-indigo-700 font-mono tracking-tight">{metrics.activeTrailsCount}</div><div className="text-xs text-slate-600 font-semibold mt-1">Trilhas ativas</div></div>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-11 h-11 rounded-2xl bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-700"><TrendingUp className="w-5 h-5" /></div>
          <div className="my-3"><div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">{metrics.completedMissionsMonth}</div><div className="text-xs text-slate-600 font-semibold mt-1">Missões concluídas no mês</div></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="mb-6">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2"><Layers className="w-5 h-5 text-purple-600" /><span>Estudantes por sala</span></h3>
          <p className="text-xs text-slate-500 mt-0.5">Salas identificadas nos dados recebidos.</p>
        </div>
        {students.length === 0 ? (
          <p className="text-sm text-slate-500 py-6 text-center">Nenhum estudante disponível no momento.</p>
        ) : classes.length === 0 ? (
          <p className="text-sm text-slate-500 py-6 text-center">Não há informação de sala nos dados dos estudantes.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {classes.map(([classroom, classmates]) => (
              <div key={classroom} className="bg-slate-50 p-5 rounded-3xl border border-slate-200 hover:border-purple-300 transition-all shadow-xs">
                <div className="flex items-center justify-between gap-2"><span className="text-base font-black text-slate-900">{classroom}</span><span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-purple-100 border-purple-300 text-purple-800">{classmates.length} estudantes</span></div>
                <ul className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                  {classmates.map(student => <li key={student.id} className="text-xs text-slate-700 truncate" title={student.name}>{student.name}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
