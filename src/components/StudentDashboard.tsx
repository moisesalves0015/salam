import React from 'react';
import { Flame, Sparkles, ArrowRight, BookOpen, Calculator, FlaskConical, Check, Compass, Trophy, Zap, ChevronRight } from 'lucide-react';
import { Student, Mission, CardItem } from '../types';

interface StudentDashboardProps {
  student: Student;
  mission: Pick<Mission, 'id' | 'title' | 'primaryAbility' | 'difficulty' | 'status' | 'progress' | 'xpReward' | 'objective'>;
  unlockedCard?: CardItem;
  onStartMission: () => void;
  onViewCard: (card: CardItem) => void;
  onViewAchievements: () => void;
  onViewTrails: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  mission,
  unlockedCard,
  onStartMission,
  onViewCard,
  onViewAchievements,
  onViewTrails,
}) => {
  const currentCard = unlockedCard ?? student.cards?.find((card) => card.unlocked);
  const unlockedAchievements = student.achievements?.filter((achievement) => achievement.unlocked) ?? [];
  const xpPercent = student.nextLevelXp > 0 ? Math.min(100, Math.round((student.currentXp / student.nextLevelXp) * 100)) : null;
  const subjects = [
    { label: 'Português', value: student.trailProgress?.portugues, icon: BookOpen, color: 'cyan' },
    { label: 'Matemática', value: student.trailProgress?.matematica, icon: Calculator, color: 'emerald' },
    { label: 'Ciências', value: student.trailProgress?.ciencias, icon: FlaskConical, color: 'amber' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <section className="lg:col-span-5 bg-gradient-to-br from-indigo-50/90 via-purple-50/70 to-pink-50/60 p-5 sm:p-6 rounded-3xl border-2 border-indigo-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
          <div>
            <div className="flex items-center gap-4 relative z-10">
              {student.avatarUrl || student.avatar ? (
                <img src={student.avatarUrl || student.avatar} alt={student.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400 shadow-md shadow-indigo-500/20" />
              ) : (
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center text-indigo-700 text-xl font-black" aria-label="Avatar indisponível">{student.name?.charAt(0) || '?'}</div>
              )}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Olá, {student.name}!</h2>
                  {student.classroom && <span className="px-2 py-0.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold">{student.classroom}</span>}
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-1 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-amber-500" /><span>{student.grade || 'Turma não informada'}</span></div>
              </div>
            </div>
            <div className="mt-5 space-y-1.5 relative z-10">
              <div className="flex justify-between items-center text-xs"><span className="font-bold text-slate-700 flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" />Progresso de Experiência</span><span className="font-mono font-bold text-purple-700">{xpPercent === null ? 'Progresso indisponível' : `${xpPercent}%`}</span></div>
              {xpPercent !== null && <div className="h-3.5 w-full bg-white rounded-full p-0.5 overflow-hidden border border-purple-200 shadow-inner"><div className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 transition-all duration-1000 shadow-xs" style={{ width: `${xpPercent}%` }} /></div>}
              <div className="flex justify-between items-center text-[11px] pt-0.5"><span className="font-mono font-black text-slate-900">{student.currentXp.toLocaleString('pt-BR')} XP</span><span className="text-slate-500 font-medium">Próximo nível: <b className="text-slate-800 font-mono">{student.nextLevelXp.toLocaleString('pt-BR')} XP</b></span></div>
            </div>
          </div>
          <div className="relative z-10 pt-4 mt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-2xl bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-600 shadow-xs"><Flame className="w-5 h-5 fill-orange-400 text-orange-500" /></div><div><div className="text-xs font-black text-slate-900">Sequência: {student.streakDays} dias</div><div className="text-[10px] text-slate-500">Atividade registrada</div></div></div>
            <div className="flex items-center gap-1.5">{student.weekDaysActive?.map((day, index) => <div key={`${day.day}-${index}`} className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black border ${day.active ? 'bg-emerald-100 border-emerald-300 text-emerald-800' : day.isToday ? 'bg-purple-100 border-purple-300 text-purple-800' : 'bg-white border-slate-200 text-slate-400'}`}>{day.active ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : day.day}</div>)}</div>
          </div>
        </section>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {subjects.map(({ label, value, icon: Icon, color }) => (
            <button key={label} type="button" onClick={onViewTrails} className={`bg-white p-5 rounded-3xl border border-slate-200 hover:border-${color}-400 transition-all flex flex-col items-center justify-between text-center shadow-sm`}>
              <div className="flex items-center gap-2.5 self-start text-xs font-bold text-slate-700"><div className={`w-8 h-8 rounded-xl bg-${color}-100 border border-${color}-300 text-${color}-700 flex items-center justify-center`}><Icon className="w-4 h-4" /></div><div className="text-left text-xs font-black text-slate-900">{label}</div></div>
              {typeof value === 'number' ? <><div className="relative w-24 h-24 my-3 flex items-center justify-center"><svg className="w-full h-full -rotate-90" viewBox="0 0 36 36"><path className="text-slate-100 stroke-current" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /><path className={`text-${color}-500 stroke-current`} strokeDasharray={`${Math.min(100, Math.max(0, value))}, 100`} strokeLinecap="round" strokeWidth="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg><span className="absolute text-xl font-black text-slate-900 font-mono">{value}%</span></div><div className="text-xs text-slate-500">Progresso da trilha</div></> : <div className="py-8 text-xs text-slate-500">Progresso indisponível</div>}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <section className="lg:col-span-5 bg-gradient-to-br from-purple-50 via-pink-50/70 to-amber-50/60 p-6 rounded-3xl border-2 border-purple-200/80 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />
          <div><div className="flex items-center gap-2"><span className="px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider">Missão</span><span className="text-xs text-slate-500 font-bold font-mono">+{mission.xpReward} XP</span></div><h3 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">{mission.title}</h3><div className="mt-4 p-3.5 rounded-2xl bg-white/90 border border-purple-200 shadow-xs"><div className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Objetivo Pedagógico</div><p className="text-xs text-slate-800 mt-1 leading-relaxed font-medium">{mission.objective}</p></div><div className="mt-3 text-xs text-slate-600">{mission.primaryAbility} · {mission.difficulty} · {mission.status}{typeof mission.progress === 'number' && <span> · {mission.progress}%</span>}</div></div>
          <button onClick={onStartMission} className="w-full mt-5 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm shadow-md flex items-center justify-center gap-2 group transition-all"><span>Iniciar Missão</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></button>
        </section>
        <section className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"><div className="text-base font-black text-slate-900 flex items-center gap-2"><Compass className="w-5 h-5 text-purple-600" />Sua Jornada de Aprendizado</div><p className="mt-4 text-sm text-slate-500">As etapas da jornada não estão disponíveis.</p></section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="bg-white p-5 rounded-3xl border border-slate-200 flex items-center justify-between shadow-sm"><div>{currentCard ? <><div className="text-xs font-black text-amber-600 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" />Card disponível</div><h4 className="text-sm font-black text-slate-900 mt-0.5">{currentCard.name}</h4><p className="text-xs text-slate-600 mt-0.5">{currentCard.description}</p><button onClick={() => onViewCard(currentCard)} className="text-xs text-purple-600 font-bold mt-2 inline-flex items-center gap-1"><span>Ver álbum de cards</span><ChevronRight className="w-3.5 h-3.5" /></button></> : <p className="text-sm text-slate-500">Nenhum card desbloqueado disponível.</p>}</div></section>
        <section className="bg-white p-5 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm"><div><div className="text-xs text-emerald-700 font-bold">Conquistas</div><div className="text-xl font-black text-slate-900 mt-0.5">{unlockedAchievements.length} desbloqueadas</div><p className="text-xs text-slate-600 mt-1">{unlockedAchievements.length ? 'Conquistas registradas.' : 'Nenhuma conquista desbloqueada disponível.'}</p></div><button onClick={onViewAchievements} className="w-full mt-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5"><Trophy className="w-3.5 h-3.5" />Abrir Mural de Conquistas</button></section>
        <section className="bg-white p-5 rounded-3xl border border-slate-200 flex items-start gap-3.5 justify-between shadow-sm"><div><div className="text-xs font-bold text-cyan-700">Reflexão do Explorador</div><p className="text-xs text-slate-600 mt-1">Nenhuma mensagem de revisão disponível.</p></div><Compass className="w-6 h-6 text-cyan-700 shrink-0" /></section>
      </div>
    </div>
  );
};
