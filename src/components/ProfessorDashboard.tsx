import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  AlertCircle, 
  AlertTriangle, 
  ChevronRight, 
  ClipboardList, 
  Lightbulb, 
  Calendar, 
  Sparkles, 
  Plus, 
  KeyRound, 
  Trophy, 
  BookOpen, 
  Rocket, 
  Calculator,
  BarChart3,
  HeartHandshake
} from 'lucide-react';
import { Student, ClassMetrics } from '../types';

interface ProfessorDashboardProps {
  students: Student[];
  metrics: ClassMetrics;
  onSelectStudent: (student: Student) => void;
  onNavigateToTab: (tab: string) => void;
  onOpenNewInterventionModal: (studentId?: string) => void;
  onOpenResourceModal?: () => void;
}

export const ProfessorDashboard: React.FC<ProfessorDashboardProps> = ({
  students,
  metrics,
  onSelectStudent,
  onNavigateToTab,
  onOpenNewInterventionModal,
  onOpenResourceModal
}) => {
  const firstStudent = students[0] || {
    id: 'aluno-joao',
    name: 'João Silva',
    avatar: '👦',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    classroom: 'Turma 5º ano A',
    grade: '5º ano',
    teacherName: 'Prof. Carla Souza',
    entryDate: '15/02/2026',
    status: 'intervencao' as const,
    statusAlertText: 'Divisão — dificuldade persistente.',
    level: 12,
    currentXp: 1840,
    nextLevelXp: 2500,
    streakDays: 4,
    weekDaysActive: [],
    trailProgress: { portugues: 80, matematica: 60, ciencias: 40 },
    abilities: [],
    interventions: [],
    currentMission: {
      id: 'm1',
      title: 'O Desafio dos Grupos',
      subject: 'Matemática' as const,
      trailName: 'Trilha dos Números',
      primaryAbility: 'Divisão por agrupamento',
      difficulty: 'Média' as const,
      status: 'Em andamento' as const,
      progress: 60,
      objective: 'Compreender divisão como agrupamento',
      estimatedMinutes: 15,
      xpReward: 50,
      steps: []
    }
  };

  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student>(
    students.find(s => s.id === 'aluno-joao') || firstStudent
  );

  const joao = students.find(s => s.id === 'aluno-joao') || students[0] || firstStudent;
  const maria = students.find(s => s.id === 'aluno-maria') || students[1] || students[0] || firstStudent;
  const pedro = students.find(s => s.id === 'aluno-pedro') || students[2] || students[0] || firstStudent;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* TOP HERO BANNER - PROFESSOR WELCOME & CLASS SUMMARY                       */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-indigo-50/90 via-purple-50/70 to-pink-50/60 p-5 sm:p-6 rounded-3xl border-2 border-indigo-200/80 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 z-10">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
              alt="Professora" 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-purple-500 shadow-md shadow-purple-600/20"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Painel do Educador
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold">
                Turma 5º ano A
              </span>
            </div>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Profª Carla Souza • EM Monte das Águas • 32 exploradores ativos hoje
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 z-10 self-start md:self-auto">
          <button
            onClick={() => onNavigateToTab('painel-tv')}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md shadow-purple-600/20 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Rocket className="w-4 h-4" />
            <span>Abrir Painel TV da Sala</span>
          </button>
          <button
            onClick={() => onOpenNewInterventionModal()}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-purple-600" />
            <span>Nova Intervenção</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 TOP VIBRANT KPI CARDS + CLASS PROGRESS WAVEFORM                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
        
        {/* KPI 1: Total Alunos */}
        <div 
          onClick={() => onNavigateToTab('alunos')}
          className="lg:col-span-2 bg-white p-5 rounded-3xl border border-slate-200 hover:border-purple-300 cursor-pointer transition-all flex flex-col justify-between shadow-xs group hover:scale-[1.01]"
        >
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Turma</span>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight">{metrics.totalStudents}</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Alunos Acompanhados</div>
          </div>
          <div className="flex items-center text-xs font-bold text-purple-600 group-hover:text-purple-800">
            <span>Ver listagem completa</span>
            <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* KPI 2: Evoluindo Bem */}
        <div 
          onClick={() => onNavigateToTab('alunos')}
          className="lg:col-span-2 bg-white p-5 rounded-3xl border border-slate-200 hover:border-emerald-300 cursor-pointer transition-all flex flex-col justify-between shadow-xs group hover:scale-[1.01]"
        >
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono">
              {metrics.evolvingWellPercent}%
            </span>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono tracking-tight">{metrics.evolvingWell}</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Evoluindo com Autonomia</div>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Ritmo consistente e trilhas ativas
          </div>
        </div>

        {/* KPI 3: Atenção */}
        <div 
          onClick={() => onNavigateToTab('alunos')}
          className="lg:col-span-2 bg-white p-5 rounded-3xl border border-slate-200 hover:border-amber-300 cursor-pointer transition-all flex flex-col justify-between shadow-xs group hover:scale-[1.01]"
        >
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:scale-110 transition-transform">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-mono">
              {metrics.needsAttentionPercent}%
            </span>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-amber-700 font-mono tracking-tight">{metrics.needsAttention}</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Em Ponto de Atenção</div>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Apoio pontual em leitura/cálculo
          </div>
        </div>

        {/* KPI 4: Intervenção */}
        <div 
          onClick={() => onNavigateToTab('alunos')}
          className="lg:col-span-2 bg-white p-5 rounded-3xl border border-slate-200 hover:border-rose-300 cursor-pointer transition-all flex flex-col justify-between shadow-xs group hover:scale-[1.01]"
        >
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 rounded-2xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-700 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 font-mono">
              {metrics.needsInterventionPercent}%
            </span>
          </div>
          <div className="my-3">
            <div className="text-3xl sm:text-4xl font-black text-rose-700 font-mono tracking-tight">{metrics.needsIntervention}</div>
            <div className="text-xs text-slate-600 font-semibold mt-1">Intervenção Guiada</div>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Mediação com material concreto
          </div>
        </div>

        {/* KPI 5: Gráfico Semanal da Turma */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span>Conclusão Média das Missões</span>
            </div>
            <span className="text-xs font-mono font-black text-purple-800 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
              72% média
            </span>
          </div>

          <div className="relative h-20 my-2 flex items-end gap-2 px-1">
            {[
              { label: 'Sem 14', val: 38 },
              { label: 'Sem 15', val: 45 },
              { label: 'Sem 16', val: 52 },
              { label: 'Sem 17', val: 62 },
              { label: 'Sem 18', val: 72 }
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-bold text-slate-600 font-mono">{bar.val}%</span>
                <div className="w-full bg-slate-100 rounded-t-lg h-12 overflow-hidden flex items-end">
                  <div 
                    className="w-full bg-gradient-to-t from-purple-600 via-fuchsia-500 to-pink-500 rounded-t-lg transition-all duration-700 shadow-xs"
                    style={{ height: `${bar.val}%` }}
                  />
                </div>
                <span className="text-[9px] font-bold text-slate-500">{bar.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Crescimento de +18% no mês</span>
            </span>
            <span className="text-purple-600 font-bold">Meta: 70% Superada</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* ROW 2: ALUNOS EM FOCO COM FOTOS REAIS                                     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* João Card - Intervenção com Foto Real */}
        <div 
          onClick={() => {
            setSelectedStudentForDetail(joao);
            onSelectStudent(joao);
          }}
          className={`p-5 rounded-3xl border transition-all group flex items-center justify-between gap-3.5 cursor-pointer shadow-xs ${
            selectedStudentForDetail.id === 'aluno-joao'
              ? 'bg-rose-50/70 border-rose-400 ring-2 ring-rose-300'
              : 'bg-white border-slate-200 hover:border-rose-300'
          }`}
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative">
              <img 
                src={joao.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'} 
                alt="João" 
                className="w-13 h-13 rounded-2xl object-cover border-2 border-rose-500 shadow-xs group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-black">
                !
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-900">{joao.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 font-bold">
                  Intervenção
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-rose-700 truncate">
                <Calculator className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Divisão — grupos iguais</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                Reforço hoje às 14:00 (material tátil)
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all shrink-0" />
        </div>

        {/* Maria Card - Atenção com Foto Real */}
        <div 
          onClick={() => {
            setSelectedStudentForDetail(maria);
            onSelectStudent(maria);
          }}
          className={`p-5 rounded-3xl border transition-all group flex items-center justify-between gap-3.5 cursor-pointer shadow-xs ${
            selectedStudentForDetail.id === 'aluno-maria'
              ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-300'
              : 'bg-white border-slate-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative">
              <img 
                src={maria.avatarUrl || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'} 
                alt="Maria" 
                className="w-13 h-13 rounded-2xl object-cover border-2 border-amber-500 shadow-xs group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-black">
                ★
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-900">{maria.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-bold">
                  Atenção
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-amber-700 truncate">
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Interpretação e síntese</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                Leitura dialogada amanhã 09:30
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all shrink-0" />
        </div>

        {/* Pedro Card - Pronto para Avançar com Foto Real */}
        <div 
          onClick={() => {
            setSelectedStudentForDetail(pedro);
            onSelectStudent(pedro);
          }}
          className={`p-5 rounded-3xl border transition-all group flex items-center justify-between gap-3.5 cursor-pointer shadow-xs ${
            selectedStudentForDetail.id === 'aluno-pedro'
              ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-300'
              : 'bg-white border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative">
              <img 
                src={pedro.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'} 
                alt="Pedro" 
                className="w-13 h-13 rounded-2xl object-cover border-2 border-emerald-500 shadow-xs group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">
                ✓
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-900">{pedro.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold">
                  Destaque
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-xs font-bold text-emerald-700 truncate">
                <Rocket className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Desafios & Monitoria</span>
              </div>
              <div className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                100% de conclusão nas trilhas
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0" />
        </div>

      </div>

      {/* ========================================================================= */}
      {/* ROW 3: BENTO TRIAD (MISSÕES DO DIA, DETALHE PEDAGÓGICO, INTERVENÇÕES)     */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Box 1: Missões de hoje (col 5) */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-base font-black text-slate-900">
                <ClipboardList className="w-5 h-5 text-purple-600" />
                <span>Missões de Hoje</span>
              </div>
              <button 
                onClick={() => onNavigateToTab('missoes')}
                className="text-xs text-purple-700 hover:text-purple-900 font-bold px-3 py-1 rounded-xl bg-purple-50 border border-purple-200 transition-colors cursor-pointer"
              >
                Ver Todas
              </button>
            </div>

            <div className="space-y-2.5">
              {students.slice(0, 4).map((s) => (
                <div 
                  key={s.id}
                  onClick={() => setSelectedStudentForDetail(s)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    selectedStudentForDetail.id === s.id
                      ? 'bg-purple-50/70 border-purple-300'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={s.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'} 
                      alt={s.name} 
                      className="w-9 h-9 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">{s.name}</span>
                        <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                          s.currentMission.difficulty === 'Fácil'
                            ? 'bg-emerald-100 text-emerald-800'
                            : s.currentMission.difficulty === 'Média'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                        }`}>
                          {s.currentMission.difficulty}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 truncate font-medium">{s.currentMission.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-bold text-purple-700 font-mono">{s.currentMission.progress}%</span>
                    </div>
                    <div className="w-14 h-2 rounded-full bg-slate-200 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          s.currentMission.progress === 100 
                            ? 'bg-emerald-500' 
                            : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}
                        style={{ width: `${s.currentMission.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div 
            onClick={() => onNavigateToTab('missoes')}
            className="pt-3.5 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600 hover:text-purple-800 cursor-pointer"
          >
            <span>Ver mapa de missões da turma</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Box 2: Detalhe Pedagógico do Aluno Selecionado (col 4) */}
        <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedStudentForDetail.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'} 
                  alt={selectedStudentForDetail.name} 
                  className="w-10 h-10 rounded-2xl object-cover border-2 border-purple-400 shadow-xs"
                />
                <div>
                  <h4 className="text-sm font-black text-slate-900">{selectedStudentForDetail.name}</h4>
                  <span className="text-[10px] text-purple-700 font-bold">Diagnóstico & Habilidades</span>
                </div>
              </div>
              <button 
                onClick={() => onSelectStudent(selectedStudentForDetail)}
                className="text-xs text-purple-700 hover:text-purple-900 font-bold px-2.5 py-1 rounded-xl bg-purple-50 border border-purple-200 transition-colors cursor-pointer"
              >
                Perfil
              </button>
            </div>

            <div className="space-y-3 my-2">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Matriz de Habilidades</div>
              
              {selectedStudentForDetail.abilities.length > 0 ? (
                selectedStudentForDetail.abilities.map((ab) => (
                  <div key={ab.id} className="flex items-center justify-between text-xs gap-3">
                    <div className="flex items-center gap-1.5 text-slate-800 w-32 shrink-0 truncate font-semibold">
                      <span className="text-purple-600">•</span>
                      <span className="truncate">{ab.name}</span>
                    </div>
                    <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          ab.score >= 80 ? 'bg-emerald-500' : ab.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${ab.score}%` }}
                      />
                    </div>
                    <span className="text-slate-700 font-mono font-bold w-9 text-right text-xs">{ab.score}%</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 py-3 text-center">
                  Habilidades sendo consolidadas no diagnóstico.
                </div>
              )}
            </div>
          </div>

          {/* Dica Pedagógica Box */}
          <div className="mt-3.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-700 leading-relaxed font-medium">
              <span className="font-black text-amber-800">Dica Pedagógica:</span> Reforce estratégias com materiais concretos (tampinhas/fichas) antes de transitar para o cálculo abstrato.
            </div>
          </div>
        </div>

        {/* Box 3: Próximas Intervenções (col 3) */}
        <div className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                <Calendar className="w-4 h-4 text-pink-600" />
                <span>Intervenções</span>
              </div>
              <button
                onClick={() => onOpenNewInterventionModal()}
                className="w-7 h-7 rounded-xl bg-pink-100 hover:bg-pink-200 border border-pink-200 flex items-center justify-center text-pink-700 transition-colors cursor-pointer"
                title="Agendar Intervenção"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {/* Item 1 */}
              <div 
                onClick={() => onSelectStudent(joao)}
                className="p-3 rounded-2xl bg-rose-50/50 border border-rose-200 hover:border-rose-300 cursor-pointer transition-all flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img 
                    src={joao.avatarUrl} 
                    alt="João" 
                    className="w-8 h-8 rounded-xl object-cover border border-rose-300 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-black text-slate-900 truncate">João — Divisão</div>
                    <div className="text-[10px] text-slate-500 truncate">Reforço com material concreto</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-bold text-rose-700 font-mono">Hoje</span>
                  <div className="text-[10px] text-slate-500">14:00</div>
                </div>
              </div>

              {/* Item 2 */}
              <div 
                onClick={() => onSelectStudent(maria)}
                className="p-3 rounded-2xl bg-amber-50/50 border border-amber-200 hover:border-amber-300 cursor-pointer transition-all flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img 
                    src={maria.avatarUrl} 
                    alt="Maria" 
                    className="w-8 h-8 rounded-xl object-cover border border-amber-300 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-black text-slate-900 truncate">Maria — Leitura</div>
                    <div className="text-[10px] text-slate-500 truncate">Leitura guiada em duplas</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-bold text-amber-700 font-mono">Amanhã</span>
                  <div className="text-[10px] text-slate-500">09:30</div>
                </div>
              </div>

              {/* Item 3 */}
              <div 
                onClick={() => onSelectStudent(pedro)}
                className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-200 hover:border-emerald-300 cursor-pointer transition-all flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img 
                    src={pedro.avatarUrl} 
                    alt="Pedro" 
                    className="w-8 h-8 rounded-xl object-cover border border-emerald-300 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-black text-slate-900 truncate">Pedro — Desafios</div>
                    <div className="text-[10px] text-slate-500 truncate">Monitoria e ampliação</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-bold text-emerald-700 font-mono">Sexta</span>
                  <div className="text-[10px] text-slate-500">10:00</div>
                </div>
              </div>
            </div>
          </div>

          <div 
            onClick={() => onNavigateToTab('relatorios')}
            className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-pink-600 hover:text-pink-800 cursor-pointer"
          >
            <span>Ver plano de apoio completo</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* ROW 4: 4 BOTTOM STATUS WIDGETS                                            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Widget 1: Trilhas do Conhecimento */}
        <div 
          onClick={() => onNavigateToTab('trilhas')}
          className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-purple-300 cursor-pointer transition-all flex flex-col justify-between shadow-xs group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 group-hover:scale-110 transition-transform">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold">Trilhas em Andamento</div>
              <div className="text-2xl font-black text-slate-900 font-mono">{metrics.activeTrailsCount} <span className="text-xs text-purple-600 font-normal">ativas</span></div>
            </div>
          </div>
          <div className="flex items-center text-xs font-bold text-purple-600 group-hover:text-purple-800 mt-3">
            <span>Explorar trilhas curriculares</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </div>
        </div>

        {/* Widget 2: Conquistas do Mês */}
        <div 
          onClick={() => onNavigateToTab('missoes')}
          className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-emerald-300 cursor-pointer transition-all flex flex-col justify-between shadow-xs group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold">Missões Vencidas (Mês)</div>
              <div className="text-2xl font-black text-slate-900 font-mono">{metrics.completedMissionsMonth}</div>
            </div>
          </div>
          <div className="text-xs font-bold text-emerald-700 mt-3">
            +{metrics.completedMissionsMonthGrowth}% <span className="text-slate-500 font-normal">vs mês anterior</span>
          </div>
        </div>

        {/* Widget 3: Engajamento & Frequência */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold">Engajamento Coletivo</div>
              <div className="text-2xl font-black text-slate-900 font-mono">{metrics.classEngagementPercent}%</div>
            </div>
          </div>
          <div className="text-xs text-slate-500 mt-3">
            8 duplas ativas no momento
          </div>
        </div>

        {/* Widget 4: Recursos Didáticos */}
        <div 
          onClick={onOpenResourceModal}
          className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-pink-300 cursor-pointer transition-all flex flex-col justify-between shadow-xs group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-700 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold">Banco de Recursos</div>
              <div className="text-sm font-black text-slate-900">Materiais e Fichas</div>
            </div>
          </div>
          <div className="flex items-center text-xs font-bold text-pink-600 group-hover:text-pink-800 mt-3">
            <span>Acessar acervo pedagógico</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </div>
        </div>

      </div>

    </div>
  );
};
