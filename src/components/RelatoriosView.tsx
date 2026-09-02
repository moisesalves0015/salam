import React, { useState } from 'react';
import { 
  BarChart3, 
  Printer, 
  Download, 
  TrendingUp, 
  Users, 
  BrainCircuit, 
  CheckCircle2, 
  Award
} from 'lucide-react';
import { Student, ClassMetrics } from '../types';

interface RelatoriosViewProps {
  students: Student[];
  metrics: ClassMetrics;
}

export const RelatoriosView: React.FC<RelatoriosViewProps> = ({
  metrics
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 border border-purple-500/50 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-purple-700 uppercase tracking-widest">
            <BarChart3 className="w-4 h-4" />
            <span>Relatórios & Memória Pedagógica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
            Relatórios de Evolução e Evidências
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Dados agregados e percurso pedagógico sem rotulação estigmatizante • Turma 5º ano A.
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
            onClick={() => showToast('Relatório pedagógico exportado em PDF e CSV com sucesso!')}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-black shadow-md shadow-purple-600/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Dados</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500 font-bold uppercase">Alunos Atendidos</div>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">{metrics.totalStudents}</div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">100% com diagnóstico inicial</div>
          </div>
          <div className="text-[11px] text-slate-500">Turma 5º ano A</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500 font-bold uppercase">Missões Concluídas</div>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">{metrics.completedMissionsMonth}</div>
            <div className="text-xs text-emerald-700 font-semibold mt-1">+{metrics.completedMissionsMonthGrowth}% vs mês anterior</div>
          </div>
          <div className="text-[11px] text-slate-500">Ritmo de superação acelerado</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500 font-bold uppercase">Autonomia Média</div>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-purple-700 font-mono">74%</div>
            <div className="text-xs text-purple-800 font-semibold mt-1">Evolução de +18% no bimestre</div>
          </div>
          <div className="text-[11px] text-slate-500">Redução de dependência direta</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500 font-bold uppercase">Intervenções Realizadas</div>
            <BrainCircuit className="w-4 h-4 text-pink-600" />
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-pink-700 font-mono">28</div>
            <div className="text-xs text-pink-800 font-semibold mt-1">Com materiais manipuláveis</div>
          </div>
          <div className="text-[11px] text-slate-500">Mediação pedagógica documentada</div>
        </div>

      </div>

      {/* Comparative Diagnostic vs Final Evolution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Comparison Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Comparativo: Diagnóstico Inicial vs Estado Atual</span>
            </h3>
            <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Ganhos de Aprendizagem
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between text-slate-800 mb-1.5 font-bold">
                <span>Adição e Subtração com Reagrupamento</span>
                <span className="text-emerald-700 font-mono">88% (+32%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: '88%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-800 mb-1.5 font-bold">
                <span>Multiplicação no Cotidiano</span>
                <span className="text-emerald-700 font-mono">75% (+28%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: '75%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-800 mb-1.5 font-bold">
                <span>Divisão por Agrupamento & Problemas</span>
                <span className="text-amber-700 font-mono">60% (+35%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500" style={{ width: '60%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-800 mb-1.5 font-bold">
                <span>Interpretação e Ideia Central do Texto</span>
                <span className="text-cyan-700 font-mono">70% (+22%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: '70%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Interventions Impact Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-purple-600" />
              <span>Distribuição de Estratégias Pedagógicas Aplicadas</span>
            </h3>
            <span className="text-xs text-purple-800 font-bold bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
              Registros da Turma
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  42%
                </div>
                <div>
                  <span className="font-bold text-slate-900">Material Concreto & Fichas Táteis</span>
                  <div className="text-[11px] text-slate-500">Apoio direto na transição do cálculo abstrato</div>
                </div>
              </div>
              <span className="text-purple-700 font-bold font-mono">12 sessões</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  28%
                </div>
                <div>
                  <span className="font-bold text-slate-900">Leitura Dialogada & Perguntas Chave</span>
                  <div className="text-[11px] text-slate-500">Orientação estruturada para síntese textual</div>
                </div>
              </div>
              <span className="text-indigo-700 font-bold font-mono">8 sessões</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  20%
                </div>
                <div>
                  <span className="font-bold text-slate-900">Representação Gráfica e Desenhos</span>
                  <div className="text-[11px] text-slate-500">Esquematização visual das situações-problema</div>
                </div>
              </div>
              <span className="text-cyan-700 font-bold font-mono">5 sessões</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  10%
                </div>
                <div>
                  <span className="font-bold text-slate-900">Atividades em Duplas Solidárias</span>
                  <div className="text-[11px] text-slate-500">Monitoria entre pares e apoio colaborativo</div>
                </div>
              </div>
              <span className="text-emerald-700 font-bold font-mono">3 sessões</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
