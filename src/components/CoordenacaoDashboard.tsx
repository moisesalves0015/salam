import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  ChevronRight, 
  Download, 
  Printer, 
  BrainCircuit, 
  Layers, 
  ShieldCheck
} from 'lucide-react';
import { Student, ClassMetrics } from '../types';

interface CoordenacaoDashboardProps {
  students: Student[];
  metrics: ClassMetrics;
  onNavigateToTab?: (tab: string) => void;
}

export const CoordenacaoDashboard: React.FC<CoordenacaoDashboardProps> = () => {
  const [selectedClassTab, setSelectedClassTab] = useState<'todos' | '5ano' | '4ano'>('todos');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const schoolClasses = [
    { 
      id: '5a', 
      name: '5º Ano A', 
      grade: '5º ano', 
      teacher: 'Profª Carla Souza', 
      teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      totalStudents: 32, 
      progressPercent: 72, 
      interventionsCount: 5,
      dominancePercent: 68,
      status: 'Em meta' 
    },
    { 
      id: '5b', 
      name: '5º Ano B', 
      grade: '5º ano', 
      teacher: 'Prof. Marcos Vinícius', 
      teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      totalStudents: 30, 
      progressPercent: 68, 
      interventionsCount: 7,
      dominancePercent: 62,
      status: 'Em meta' 
    },
    { 
      id: '4a', 
      name: '4º Ano A', 
      grade: '4º ano', 
      teacher: 'Profª Beatriz Lima', 
      teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      totalStudents: 28, 
      progressPercent: 79, 
      interventionsCount: 3,
      dominancePercent: 74,
      status: 'Destaque' 
    },
    { 
      id: '4b', 
      name: '4º Ano B', 
      grade: '4º ano', 
      teacher: 'Prof. Renato Santos', 
      teacherAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      totalStudents: 29, 
      progressPercent: 64, 
      interventionsCount: 8,
      dominancePercent: 58,
      status: 'Acompanhamento' 
    }
  ];

  const filteredClasses = schoolClasses.filter(c => {
    if (selectedClassTab === '5ano') return c.grade === '5º ano';
    if (selectedClassTab === '4ano') return c.grade === '4º ano';
    return true;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 border border-purple-500/50 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP HERO BANNER */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50/70 to-pink-50/60 p-5 sm:p-6 rounded-3xl border border-purple-200 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 z-10">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" 
              alt="Coordenadora" 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-purple-500 shadow-xs"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center">
              <Building2 className="w-3 h-3 text-white" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Painel da Coordenação Pedagógica
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-300 text-purple-800 text-xs font-bold">
                Gestão Escolar
              </span>
            </div>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Coordª Helena Ramos • EM Monte das Águas • 4 turmas monitoradas em tempo real
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 z-10 self-start md:self-auto flex-wrap">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4 text-cyan-600" />
            <span>Imprimir Síntese</span>
          </button>
          <button
            onClick={() => showToast('Relatório executivo exportado em PDF e CSV!')}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Relatório BNCC</span>
          </button>
        </div>
      </div>

      {/* 4 TOP INSTITUTIONAL METRICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
              4 Turmas
            </span>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">119</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Estudantes Atendidos</div>
          </div>
          <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% cadastrados na Sala de Missões</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              +14% Bimestre
            </span>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono tracking-tight">66%</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Domínio Médio da Matriz BNCC</div>
          </div>
          <div className="text-xs text-slate-500 font-semibold">
            Meta institucional: 70% até o fim do trimestre
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              Acompanhadas
            </span>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-amber-700 font-mono tracking-tight">23</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Planos de Mediação em Curso</div>
          </div>
          <div className="text-xs text-slate-500 font-semibold">
            Com registros de mediação e materiais táteis
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-2xl bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-50 text-pink-800 border border-pink-200">
              Memória Ativa
            </span>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">94%</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Presença Pedagógica Diária</div>
          </div>
          <div className="text-xs text-pink-700 font-semibold">
            Zero rotulação estigmatizante
          </div>
        </div>

      </div>

      {/* COMPARATIVO DE TURMAS - BENTO GRID */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-600" />
              <span>Matriz Comparativa das Turmas</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Acompanhamento de ritmo, progresso de trilhas e planos de mediação por regente.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setSelectedClassTab('todos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedClassTab === 'todos'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todas (4)
            </button>
            <button
              onClick={() => setSelectedClassTab('5ano')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedClassTab === '5ano'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              5º Anos
            </button>
            <button
              onClick={() => setSelectedClassTab('4ano')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedClassTab === '4ano'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              4º Anos
            </button>
          </div>
        </div>

        {/* Classes Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredClasses.map((cls) => (
            <div 
              key={cls.id}
              className="bg-slate-50 p-5 rounded-3xl border border-slate-200 hover:border-purple-300 transition-all flex flex-col justify-between shadow-xs group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-slate-900">{cls.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    cls.status === 'Destaque'
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800'
                      : cls.status === 'Em meta'
                        ? 'bg-purple-100 border-purple-300 text-purple-800'
                        : 'bg-amber-100 border-amber-300 text-amber-800'
                  }`}>
                    {cls.status}
                  </span>
                </div>

                {/* Teacher Info */}
                <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-slate-200">
                  <img 
                    src={cls.teacherAvatar} 
                    alt={cls.teacher} 
                    className="w-8 h-8 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 truncate">{cls.teacher}</div>
                    <div className="text-[10px] text-slate-500">{cls.totalStudents} estudantes</div>
                  </div>
                </div>

                {/* Progression Bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Conclusão de Missões</span>
                    <span className="font-mono font-black text-slate-900">{cls.progressPercent}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${cls.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Domínio & Intervenções */}
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200 text-center">
                  <div className="p-2 rounded-2xl bg-white border border-slate-200">
                    <div className="text-[10px] text-slate-500">Domínio BNCC</div>
                    <div className="text-sm font-black text-emerald-700 font-mono">{cls.dominancePercent}%</div>
                  </div>
                  <div className="p-2 rounded-2xl bg-white border border-slate-200">
                    <div className="text-[10px] text-slate-500">Intervenções</div>
                    <div className="text-sm font-black text-amber-700 font-mono">{cls.interventionsCount} ativas</div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => showToast(`Abrindo painel detalhado do ${cls.name}...`)}
                className="mt-4 w-full py-2 rounded-2xl bg-white hover:bg-purple-50 border border-slate-200 text-purple-700 hover:text-purple-900 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-xs"
              >
                <span>Ver Relatório da Turma</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 3: COMPARATIVO DIAGNÓSTICO VS EVOLUÇÃO & DISTRIBUIÇÃO ESTRATÉGICA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Comparative Diagnostic Evolution */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <span>Evolução Geral: Diagnóstico vs Atual</span>
            </h3>
            <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Ganhos Reais
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between text-slate-700 mb-1.5 font-bold">
                <span>Adição e Subtração com Reagrupamento</span>
                <span className="text-emerald-700 font-mono">88% (+32% de ganho)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700" style={{ width: '88%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1.5 font-bold">
                <span>Multiplicação no Cotidiano</span>
                <span className="text-emerald-700 font-mono">75% (+28% de ganho)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700" style={{ width: '75%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1.5 font-bold">
                <span>Divisão por Agrupamento & Problemas</span>
                <span className="text-amber-700 font-mono">60% (+35% de ganho)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700" style={{ width: '60%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 mb-1.5 font-bold">
                <span>Interpretação e Localização de Informação</span>
                <span className="text-cyan-700 font-mono">70% (+22% de ganho)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700" style={{ width: '70%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Pedagogical Interventions Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-purple-600" />
              <span>Estratégias Pedagógicas Mais Efetivas</span>
            </h3>
            <span className="text-xs text-purple-800 font-bold bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-200">
              Evidências
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  42%
                </div>
                <div>
                  <div className="font-bold text-slate-900">Material Concreto & Fichas Táteis</div>
                  <div className="text-[11px] text-slate-500">92% de superação em cálculo de divisão</div>
                </div>
              </div>
              <span className="text-emerald-700 font-black text-xs">Alta Eficácia</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  28%
                </div>
                <div>
                  <div className="font-bold text-slate-900">Leitura Dialogada & Perguntas Orientadas</div>
                  <div className="text-[11px] text-slate-500">84% de retenção da ideia central de textos</div>
                </div>
              </div>
              <span className="text-emerald-700 font-black text-xs">Alta Eficácia</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold">
                  20%
                </div>
                <div>
                  <div className="font-bold text-slate-900">Representação Gráfica & Esquemas Visuais</div>
                  <div className="text-[11px] text-slate-500">Estruturação do raciocínio lógico</div>
                </div>
              </div>
              <span className="text-cyan-700 font-black text-xs">Consistente</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  10%
                </div>
                <div>
                  <div className="font-bold text-slate-900">Monitoria e Atividades em Duplas Solidárias</div>
                  <div className="text-[11px] text-slate-500">Enriquecimento e colaboração ativa</div>
                </div>
              </div>
              <span className="text-emerald-700 font-black text-xs">Excelente</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
