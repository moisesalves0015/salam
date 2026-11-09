import React from 'react';
import {
  BarChart3,
  Printer,
  Download,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';
import { Student, ClassMetrics } from '../types';

interface RelatoriosViewProps {
  students: Student[];
  metrics: ClassMetrics;
}

export const RelatoriosView: React.FC<RelatoriosViewProps> = ({ metrics }) => {
  const hasWeeklyProgress = metrics.progressByWeek.length > 0;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-purple-700 uppercase tracking-widest">
            <BarChart3 className="w-4 h-4" />
            <span>Relatórios & Memória Pedagógica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
            Relatórios e indicadores
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Dados agregados disponíveis para esta turma.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-2 transition-all border border-slate-200 cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-cyan-600" />
            <span>Imprimir Relatório</span>
          </button>
          <button
            type="button"
            disabled
            title="Exportação indisponível: não há endpoint de exportação configurado."
            className="px-4 py-2.5 rounded-2xl bg-slate-200 text-slate-500 text-xs font-black flex items-center gap-2 border border-slate-200 cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            <span>Exportação indisponível</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Alunos atendidos" value={metrics.totalStudents} icon={<Users className="w-4 h-4 text-purple-600" />} />
        <MetricCard title="Missões concluídas no mês" value={metrics.completedMissionsMonth} icon={<Award className="w-4 h-4 text-emerald-600" />} />
        <MetricCard title="Progresso médio das missões" value={`${metrics.averageMissionProgressPercent}%`} icon={<TrendingUp className="w-4 h-4 text-cyan-600" />} />
        <MetricCard title="Engajamento da turma" value={`${metrics.classEngagementPercent}%`} icon={<Users className="w-4 h-4 text-pink-600" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Progresso semanal
          </h3>
          {hasWeeklyProgress ? (
            <div className="space-y-3.5 text-xs">
              {metrics.progressByWeek.map(({ week, averageProgress }) => (
                <div key={week}>
                  <div className="flex justify-between text-slate-800 mb-1.5 font-bold">
                    <span>{week}</span>
                    <span className="text-emerald-700 font-mono">{averageProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      style={{ width: `${Math.max(0, Math.min(100, averageProgress))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Sem dados de progresso semanal disponíveis.</p>
          )}
        </section>

        <section className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-black text-slate-900">Outros indicadores</h3>
          <p className="text-sm text-slate-500">
            Autonomia, evolução diagnóstica, intervenções, competências e estratégias não estão disponíveis nos dados recebidos.
          </p>
        </section>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => (
  <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
    <div className="flex items-center justify-between">
      <div className="text-xs text-slate-500 font-bold uppercase">{title}</div>
      {icon}
    </div>
    <div className="my-3 text-3xl sm:text-4xl font-black text-slate-900 font-mono">{value}</div>
    <div className="text-[11px] text-slate-500">Informação agregada recebida</div>
  </div>
);
