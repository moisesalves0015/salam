import React from 'react';
import {
  Users, TrendingUp, AlertCircle, AlertTriangle, ChevronRight,
  ClipboardList, Lightbulb, Calendar, Plus, Trophy, BookOpen,
  Rocket, Calculator, BarChart3, HeartHandshake, KeyRound
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
  const firstStudent = students[0];
  const teacherName = firstStudent?.teacherName;
  const classroom = firstStudent?.classroom;
  const selectedStudent = firstStudent;
  const interventions = students.flatMap(student =>
    student.interventions.map(intervention => ({ student, intervention }))
  ).slice(0, 3);
  const focusStudents = students.slice(0, 3);
  const missionStudents = students.filter(student => student.currentMission).slice(0, 4);

  const metricCards = [
    { label: 'Alunos Acompanhados', value: metrics.totalStudents, icon: Users, tone: 'purple' },
    { label: 'Evoluindo com Autonomia', value: metrics.evolvingWell, percent: metrics.evolvingWellPercent, icon: TrendingUp, tone: 'emerald' },
    { label: 'Em Ponto de Atenção', value: metrics.needsAttention, percent: metrics.needsAttentionPercent, icon: AlertCircle, tone: 'amber' },
    { label: 'Intervenção Guiada', value: metrics.needsIntervention, percent: metrics.needsInterventionPercent, icon: AlertTriangle, tone: 'rose' }
  ];
  const metricStyles: Record<string, { border: string; icon: string; badge: string; value: string }> = {
    purple: { border: 'hover:border-purple-300', icon: 'bg-purple-100 border-purple-200 text-purple-700', badge: 'bg-purple-100 text-purple-800 border-purple-200', value: 'text-purple-700' },
    emerald: { border: 'hover:border-emerald-300', icon: 'bg-emerald-100 border-emerald-200 text-emerald-700', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200', value: 'text-emerald-700' },
    amber: { border: 'hover:border-amber-300', icon: 'bg-amber-100 border-amber-200 text-amber-700', badge: 'bg-amber-100 text-amber-800 border-amber-200', value: 'text-amber-700' },
    rose: { border: 'hover:border-rose-300', icon: 'bg-rose-100 border-rose-200 text-rose-700', badge: 'bg-rose-100 text-rose-800 border-rose-200', value: 'text-rose-700' }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="bg-gradient-to-r from-indigo-50/90 via-purple-50/70 to-pink-50/60 p-5 sm:p-6 rounded-3xl border-2 border-indigo-200/80 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-4 z-10">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-purple-100 border-2 border-purple-300 text-purple-700 flex items-center justify-center"><Users className="w-7 h-7" /></div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Painel do Educador</h1>
              {classroom && <span className="px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold">{classroom}</span>}
            </div>
            <p className="text-sm text-slate-600 font-medium mt-1">{teacherName || 'Professor(a)'}{classroom ? ` • ${classroom}` : ''} • {students.length} aluno(s)</p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 z-10 self-start md:self-auto">
          <button onClick={() => onNavigateToTab('painel-tv')} className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"><Rocket className="w-4 h-4" /><span>Abrir Painel TV da Sala</span></button>
          <button onClick={() => onOpenNewInterventionModal()} className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"><Plus className="w-4 h-4 text-purple-600" /><span>Nova Intervenção</span></button>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-600"><Users className="w-8 h-8 mx-auto mb-3 text-purple-500" /><p className="font-bold">Nenhum aluno disponível para esta turma.</p><p className="text-sm mt-1">Os indicadores e atividades serão exibidos quando houver dados.</p></div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
            {metricCards.map(({ label, value, percent, icon: Icon, tone }) => (
              <div key={label} onClick={() => onNavigateToTab('alunos')} className={`lg:col-span-2 bg-white p-5 rounded-3xl border border-slate-200 ${metricStyles[tone].border} cursor-pointer transition-all flex flex-col justify-between shadow-xs group`}>
                <div className="flex items-start justify-between"><div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${metricStyles[tone].icon}`}><Icon className="w-5 h-5" /></div>{percent !== undefined && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border font-mono ${metricStyles[tone].badge}`}>{percent}%</span>}</div>
                <div className="my-3"><div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${metricStyles[tone].value}`}>{value}</div><div className="text-xs text-slate-600 font-semibold mt-1">{label}</div></div>
                <div className="flex items-center text-xs font-bold text-purple-600">Ver dados da turma<ChevronRight className="w-4 h-4 ml-0.5" /></div>
              </div>
            ))}
            <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-xs">
              <div className="flex items-center justify-between"><div className="text-xs font-bold text-slate-900 flex items-center gap-1.5"><BarChart3 className="w-4 h-4 text-purple-600" /><span>Conclusão Média das Missões</span></div><span className="text-xs font-mono font-black text-purple-800 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">{metrics.averageMissionProgressPercent}% média</span></div>
              {metrics.progressByWeek.length ? <div className="relative h-20 my-2 flex items-end gap-2 px-1">{metrics.progressByWeek.map((bar, index) => <div key={`${bar.week}-${index}`} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"><span className="text-[10px] font-bold text-slate-600 font-mono">{bar.averageProgress}%</span><div className="w-full bg-slate-100 rounded-t-lg h-12 overflow-hidden flex items-end"><div className="w-full bg-gradient-to-t from-purple-600 via-fuchsia-500 to-pink-500 rounded-t-lg" style={{ height: `${bar.averageProgress}%` }} /></div><span className="text-[9px] font-bold text-slate-500">{bar.week}</span></div>)}</div> : <p className="text-xs text-slate-500 text-center py-6">Sem dados semanais disponíveis.</p>}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-500"><span>Meta semanal da turma</span><span className="text-purple-600 font-bold">{metrics.classWeeklyGoalPercent}%</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {focusStudents.map(student => {
              const palette = student.status === 'intervencao' ? 'rose' : student.status === 'atencao' ? 'amber' : 'emerald';
              return <button key={student.id} onClick={() => onSelectStudent(student)} className={`text-left p-5 rounded-3xl border transition-all group flex items-center justify-between gap-3.5 cursor-pointer shadow-xs bg-${palette}-50/70 border-${palette}-300`}>
                <div className="flex items-center gap-3.5 min-w-0">{student.avatarUrl ? <img src={student.avatarUrl} alt={student.name} className={`w-13 h-13 rounded-2xl object-cover border-2 border-${palette}-500`} /> : <div className={`w-13 h-13 rounded-2xl bg-${palette}-100 border-2 border-${palette}-300 flex items-center justify-center text-xl`}>{student.avatar}</div>}<div className="min-w-0"><div className="text-base font-black text-slate-900 truncate">{student.name}</div><div className={`flex items-center gap-1.5 mt-1 text-xs font-bold text-${palette}-700 truncate`}><Calculator className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{student.statusAlertText || student.currentMission.primaryAbility}</span></div><div className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">{student.currentMission.title}</div></div></div><ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
              </button>;
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <section className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs"><div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2 text-base font-black text-slate-900"><ClipboardList className="w-5 h-5 text-purple-600" /><span>Missões de Hoje</span></div><button onClick={() => onNavigateToTab('missoes')} className="text-xs text-purple-700 font-bold px-3 py-1 rounded-xl bg-purple-50 border border-purple-200">Ver Todas</button></div><div className="space-y-2.5">{missionStudents.length ? missionStudents.map(student => <button key={student.id} onClick={() => onSelectStudent(student)} className="w-full p-3 rounded-2xl border bg-slate-50 border-slate-200 flex items-center justify-between gap-3 text-left"><span className="min-w-0"><span className="block text-xs font-black text-slate-900">{student.name}</span><span className="block text-[11px] text-slate-600 truncate">{student.currentMission.title}</span></span><span className="text-xs font-bold text-purple-700 font-mono">{student.currentMission.progress}%</span></button>) : <p className="text-xs text-slate-500 text-center py-4">Nenhuma missão disponível.</p>}</div><button onClick={() => onNavigateToTab('missoes')} className="pt-3.5 mt-3 border-t border-slate-100 w-full flex items-center justify-between text-xs font-bold text-purple-600">Ver mapa de missões da turma<ChevronRight className="w-4 h-4" /></button></section>

            <section className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs"><div className="flex items-center justify-between mb-4"><div className="flex items-center gap-3">{selectedStudent?.avatarUrl ? <img src={selectedStudent.avatarUrl} alt={selectedStudent.name} className="w-10 h-10 rounded-2xl object-cover border-2 border-purple-400" /> : <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center">{selectedStudent?.avatar}</div>}<div><h4 className="text-sm font-black text-slate-900">{selectedStudent?.name}</h4><span className="text-[10px] text-purple-700 font-bold">Diagnóstico &amp; Habilidades</span></div></div><button onClick={() => selectedStudent && onSelectStudent(selectedStudent)} className="text-xs text-purple-700 font-bold px-2.5 py-1 rounded-xl bg-purple-50 border border-purple-200">Perfil</button></div><div className="space-y-3 my-2"><div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Matriz de Habilidades</div>{selectedStudent?.abilities.length ? selectedStudent.abilities.map(ability => <div key={ability.id} className="flex items-center justify-between text-xs gap-3"><span className="text-slate-800 w-32 truncate font-semibold">{ability.name}</span><div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full rounded-full bg-purple-500" style={{ width: `${ability.score}%` }} /></div><span className="text-slate-700 font-mono font-bold">{ability.score}%</span></div>) : <p className="text-xs text-slate-500 py-3 text-center">Não há habilidades registradas.</p>}</div><div className="mt-3.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3"><Lightbulb className="w-5 h-5 text-amber-600 shrink-0" /><p className="text-xs text-slate-700 leading-relaxed">Dica Pedagógica: use materiais concretos para apoiar a aprendizagem.</p></div></section>

            <section className="lg:col-span-3 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs"><div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2 text-sm font-black text-slate-900"><Calendar className="w-4 h-4 text-pink-600" /><span>Intervenções</span></div><button onClick={() => onOpenNewInterventionModal()} className="w-7 h-7 rounded-xl bg-pink-100 border border-pink-200 flex items-center justify-center text-pink-700" title="Agendar Intervenção"><Plus className="w-4 h-4" /></button></div><div className="space-y-2.5">{interventions.length ? interventions.map(({ student, intervention }) => <button key={intervention.id} onClick={() => onSelectStudent(student)} className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-left"><span className="min-w-0"><span className="block text-xs font-black text-slate-900 truncate">{intervention.studentName} — {intervention.ability}</span><span className="block text-[10px] text-slate-500 truncate">{intervention.title} • {intervention.status}</span></span><span className="text-[10px] text-slate-500 shrink-0">{intervention.date}</span></button>) : <p className="text-xs text-slate-500 text-center py-4">Nenhuma intervenção registrada.</p>}</div><button onClick={() => onNavigateToTab('relatorios')} className="pt-3 mt-3 border-t border-slate-100 w-full flex items-center justify-between text-xs font-bold text-pink-600">Ver plano de apoio completo<ChevronRight className="w-4 h-4" /></button></section>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button onClick={() => onNavigateToTab('trilhas')} className="bg-white p-5 rounded-3xl border border-slate-200 text-left shadow-xs"><div className="flex items-center gap-3"><KeyRound className="w-6 h-6 text-purple-600" /><div><div className="text-xs text-slate-500 font-semibold">Trilhas em Andamento</div><div className="text-2xl font-black text-slate-900 font-mono">{metrics.activeTrailsCount} <span className="text-xs text-purple-600 font-normal">ativas</span></div></div></div></button>
            <button onClick={() => onNavigateToTab('missoes')} className="bg-white p-5 rounded-3xl border border-slate-200 text-left shadow-xs"><div className="flex items-center gap-3"><Trophy className="w-6 h-6 text-emerald-600" /><div><div className="text-xs text-slate-500 font-semibold">Missões Vencidas (Mês)</div><div className="text-2xl font-black text-slate-900 font-mono">{metrics.completedMissionsMonth}</div></div></div><div className="text-xs font-bold text-emerald-700 mt-3">{metrics.completedMissionsMonthGrowth}% vs mês anterior</div></button>
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs"><div className="flex items-center gap-3"><HeartHandshake className="w-6 h-6 text-cyan-600" /><div><div className="text-xs text-slate-500 font-semibold">Engajamento Coletivo</div><div className="text-2xl font-black text-slate-900 font-mono">{metrics.classEngagementPercent}%</div></div></div></div>
            <button onClick={onOpenResourceModal} className="bg-white p-5 rounded-3xl border border-slate-200 text-left shadow-xs"><div className="flex items-center gap-3"><BookOpen className="w-6 h-6 text-pink-600" /><div><div className="text-xs text-slate-500 font-semibold">Banco de Recursos</div><div className="text-sm font-black text-slate-900">Materiais e Fichas</div></div></div></button>
          </div>
        </>
      )}
    </div>
  );
};
