import React, { useEffect, useMemo, useState } from 'react';
import { Maximize2, Minimize2, Clock, Users2, GraduationCap, Star, Trophy, BookOpen, Target, X } from 'lucide-react';
import { Student, CardItem, AchievementItem, ClassMetrics } from '../types';

interface PainelSalaMissoesProps {
  students?: Student[];
  cards?: CardItem[];
  achievements?: AchievementItem[];
  metrics?: ClassMetrics;
  loading?: boolean;
  error?: string | null;
  onClose?: () => void;
}

export const ShinyCoin: React.FC<{ size?: 'xs' | 'sm' | 'md' | 'lg'; className?: string }> = ({ size = 'sm', className = '' }) => {
  const dimensions = { xs: 'w-4 h-4', sm: 'w-5 h-5', md: 'w-7 h-7', lg: 'w-9 h-9' };
  return <span aria-hidden="true" className={`inline-flex items-center justify-center rounded-full border-2 border-cyan-100 bg-gradient-to-br from-cyan-200 via-blue-500 to-indigo-800 text-white shadow-[0_0_18px_rgba(56,189,248,.8)] ${dimensions[size]} ${className}`}><Star className="w-1/2 h-1/2 fill-white" /></span>;
};

export const GlassCoinBadge: React.FC<{ amount: number | string; size?: 'xs' | 'sm' | 'md'; prefix?: string; className?: string }> = ({ amount, size = 'sm', prefix = '', className = '' }) => (
  <span className={`inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-white backdrop-blur ${className}`}><ShinyCoin size={size === 'md' ? 'md' : size === 'xs' ? 'xs' : 'sm'} />{prefix}{typeof amount === 'number' ? amount.toLocaleString('pt-BR') : amount} moedas</span>
);

export const GlassXpBadge: React.FC<{ amount: number | string; size?: 'xs' | 'sm' | 'md'; prefix?: string; className?: string }> = ({ amount, size = 'sm', prefix = '+', className = '' }) => (
  <span className={`inline-flex items-center gap-2 rounded-full border border-amber-200/30 bg-amber-300/10 px-3 py-1.5 font-bold text-amber-100 backdrop-blur ${className}`}><Star className={`${size === 'md' ? 'w-5 h-5' : 'w-4 h-4'} fill-amber-300 text-amber-200`} />{prefix}{typeof amount === 'number' ? amount.toLocaleString('pt-BR') : amount} XP</span>
);

const unavailable = '—';
const finiteNumber = (value: unknown): number | null => typeof value === 'number' && Number.isFinite(value) ? value : null;
const numberText = (value: number) => (finiteNumber(value) ?? 0).toLocaleString('pt-BR');

export const PainelSalaMissoes: React.FC<PainelSalaMissoesProps> = ({ students = [], cards = [], achievements = [], metrics, loading = false, error, onClose }) => {
  const [now, setNow] = useState(new Date());
  const [fullscreen, setFullscreen] = useState(false);
  const classrooms = useMemo(() => [...new Set(students.map(student => student.classroom).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR')), [students]);
  const [selectedClassroom, setSelectedClassroom] = useState('');

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (!classrooms.includes(selectedClassroom)) setSelectedClassroom(classrooms[0] ?? '');
  }, [classrooms, selectedClassroom]);
  useEffect(() => {
    const syncFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', syncFullscreen);
    return () => document.removeEventListener('fullscreenchange', syncFullscreen);
  }, []);

  const classStudents = useMemo(() => students.filter(student => student.classroom === selectedClassroom), [students, selectedClassroom]);
  const teacherNames = [...new Set(classStudents.map(student => student.teacherName?.trim()).filter((name): name is string => Boolean(name)))];
  const teacher = teacherNames.length === 1 && classStudents.every(student => student.teacherName?.trim() === teacherNames[0]) ? teacherNames[0] : 'Professor não informado';
  const xpTotal = classStudents.reduce((sum, student) => sum + (finiteNumber(student.currentXp) ?? 0), 0);
  const coinTotal = classStudents.reduce((sum, student) => sum + (finiteNumber(student.coins) ?? 0), 0);
  const progressValues = classStudents.flatMap(student => [student.trailProgress.portugues, student.trailProgress.matematica, student.trailProgress.ciencias]).map(finiteNumber).filter((value): value is number => value !== null);
  const averageProgress = progressValues.length ? Math.round(progressValues.reduce((sum, value) => sum + value, 0) / progressValues.length) : null;
  const classCards = cards.length ? cards : classStudents.flatMap(student => student.cards ?? []);
  const classAchievements = achievements.length ? achievements : classStudents.flatMap(student => student.achievements ?? []);
  const uniqueCards = [...new Map(classCards.map(card => [card.id, card])).values()];
  const uniqueAchievements = [...new Map(classAchievements.map(item => [item.id, item])).values()];
  const progressMetric = finiteNumber(metrics?.averageMissionProgressPercent);
  const visibleProgress = progressMetric ?? averageProgress;
  const totalStudentsMetric = finiteNumber(metrics?.totalStudents);

  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch { /* fullscreen indisponível no navegador */ }
  };

  return (
    <main className="min-h-screen bg-[#070b24] text-white selection:bg-cyan-300/30" aria-label="Painel da sala de missões">
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-blue-700/20 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[32rem] w-[32rem] rounded-full bg-indigo-500/20 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 h-80 w-96 rounded-full bg-cyan-500/10 blur-[110px]" />
      </div>
      <div className="relative mx-auto w-full max-w-[1800px] p-4 sm:p-7 lg:p-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-5 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan-200/25 bg-gradient-to-br from-blue-500/40 to-indigo-700/40 shadow-[0_0_30px_rgba(59,130,246,.2)]"><Target className="h-7 w-7 text-cyan-100" /></div>
            <div><p className="text-xs font-bold uppercase tracking-[.28em] text-cyan-200/70">Painel da turma</p><h1 className="text-2xl font-black tracking-tight sm:text-4xl">Sala de Missões</h1></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-right sm:block"><div className="flex items-center justify-end gap-2 text-lg font-bold tabular-nums"><Clock className="h-4 w-4 text-cyan-200" />{now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div><div className="text-xs text-blue-100/60">{now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</div></div>
            <button type="button" onClick={toggleFullscreen} className="rounded-xl border border-white/15 bg-white/10 p-3 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-200" aria-label={fullscreen ? 'Sair da tela cheia' : 'Ativar tela cheia'}>{fullscreen ? <Minimize2 /> : <Maximize2 />}</button>
            {onClose && <button type="button" onClick={onClose} className="rounded-xl border border-white/15 bg-white/10 p-3 transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-200" aria-label="Fechar painel"><X /></button>}
          </div>
        </header>

        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <div><h2 className="text-2xl font-extrabold sm:text-3xl">{selectedClassroom || 'Turma não disponível'}</h2><p className="mt-1 flex items-center gap-2 text-blue-100/70"><GraduationCap className="h-4 w-4" />{classStudents.length ? teacher : 'Selecione uma turma com dados disponíveis'}</p></div>
          {classrooms.length > 0 && <label className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 backdrop-blur"><span className="text-sm text-blue-100/80">Turma</span><select value={selectedClassroom} onChange={event => setSelectedClassroom(event.target.value)} className="max-w-[240px] bg-transparent font-bold text-white outline-none [&>option]:text-slate-900" aria-label="Selecionar turma">{classrooms.map(classroom => <option key={classroom} value={classroom}>{classroom}</option>)}</select></label>}
        </div>

        {loading || error || classStudents.length === 0 ? (
          <section className="grid min-h-[48vh] place-items-center rounded-3xl border border-white/10 bg-white/[.045] px-6 py-14 text-center backdrop-blur-xl" aria-live="polite">
            <div className="max-w-xl"><div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-3xl border border-cyan-200/20 bg-blue-400/10 shadow-[0_0_45px_rgba(56,189,248,.18)]"><Users2 className="h-10 w-10 text-cyan-200" /></div><h3 className="text-2xl font-extrabold sm:text-3xl">{loading ? 'Carregando dados da turma' : error ? 'Não foi possível carregar a turma' : 'Ainda não há dados de turma'}</h3><p className="mt-3 leading-relaxed text-blue-100/65">{loading ? 'Aguarde enquanto os dados reais da turma são carregados.' : error ? error : 'Quando os dados reais dos estudantes estiverem disponíveis, esta tela exibirá o progresso, as missões atuais e as conquistas da turma.'}</p></div>
          </section>
        ) : <>
          <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Indicadores da turma">
            <Kpi label="Estudantes" value={numberText(totalStudentsMetric ?? classStudents.length)} icon={<Users2 />} accent="cyan" />
            <Kpi label="XP acumulado" value={numberText(xpTotal)} icon={<Star />} accent="amber" />
            <Kpi label="Saldo de moedas" value={numberText(coinTotal)} icon={<ShinyCoin />} accent="blue" />
            <Kpi label="Progresso médio" value={visibleProgress == null ? unavailable : `${Math.round(visibleProgress)}%`} icon={<Target />} accent="violet" />
          </section>
          <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[.055] p-5 shadow-2xl shadow-blue-950/20 backdrop-blur-xl sm:p-7">
              <div className="mb-5 flex items-center justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-200/65">Acompanhamento</p><h3 className="mt-1 text-xl font-bold">Progresso por estudante</h3></div><span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-blue-100/70">{classStudents.length} estudantes</span></div>
              <div className="max-h-[440px] space-y-3 overflow-y-auto pr-1">{classStudents.map(student => <article key={student.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/[.08] bg-[#0b1234]/60 p-4"><div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full border border-white/20 bg-indigo-400/20 text-sm font-bold text-cyan-100">{student.avatarUrl || student.avatar ? <img className="h-full w-full object-cover" src={student.avatarUrl || student.avatar} alt="" /> : student.name.slice(0, 1).toUpperCase()}</div><div className="min-w-[130px] flex-1"><div className="font-bold">{student.name}</div><div className="text-xs text-blue-100/55">Nível {student.level} · {student.currentMission?.title || 'Missão não informada'}</div></div><div className="w-full min-w-[150px] sm:w-40"><div className="mb-1 flex justify-between text-xs text-blue-100/65"><span>Trilhas</span><span>{Math.round((student.trailProgress.portugues + student.trailProgress.matematica + student.trailProgress.ciencias) / 3)}%</span></div><div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-300" style={{ width: `${Math.min(100, Math.max(0, (student.trailProgress.portugues + student.trailProgress.matematica + student.trailProgress.ciencias) / 3))}%` }} /></div></div><GlassXpBadge amount={student.currentXp} prefix="" /></article>)}</div>
            </div>
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/[.055] p-5 backdrop-blur-xl sm:p-6"><div className="mb-4 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-400/15 text-cyan-200"><BookOpen /></div><div><h3 className="font-bold">Missões atuais</h3><p className="text-xs text-blue-100/55">Dados recebidos dos estudantes</p></div></div><div className="space-y-3">{classStudents.filter(student => student.currentMission?.title).map(student => <div key={student.id} className="rounded-xl border border-white/[.08] bg-[#0b1234]/55 p-3"><div className="text-xs text-cyan-100/60">{student.name}</div><div className="mt-1 font-semibold">{student.currentMission.title}</div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-cyan-300" style={{ width: `${Math.max(0, Math.min(100, student.currentMission.progress))}%` }} /></div></div>)}{classStudents.every(student => !student.currentMission?.title) && <p className="rounded-xl border border-dashed border-white/15 p-4 text-sm text-blue-100/60">Nenhuma missão atual disponível.</p>}</div></div>
              <div className="rounded-3xl border border-white/10 bg-white/[.055] p-5 backdrop-blur-xl sm:p-6"><div className="mb-4 flex items-center gap-3"><Trophy className="h-6 w-6 text-amber-200" /><div><h3 className="font-bold">Conquistas</h3><p className="text-xs text-blue-100/55">{uniqueAchievements.length} disponíveis</p></div></div><div className="grid grid-cols-1 gap-2 sm:grid-cols-2">{uniqueAchievements.slice(0, 6).map(item => <Achievement key={item.id} item={item} />)}{uniqueAchievements.length === 0 && <p className="col-span-full rounded-xl border border-dashed border-white/15 p-4 text-sm text-blue-100/60">Nenhuma conquista disponível.</p>}</div></div>
            </div>
          </section>
          <section className="mt-6 rounded-3xl border border-white/10 bg-white/[.055] p-5 backdrop-blur-xl sm:p-6"><div className="mb-4 flex items-center justify-between"><div><h3 className="text-xl font-bold">Coleção de cards</h3><p className="text-sm text-blue-100/55">Cards enviados para esta turma</p></div><span className="text-sm text-cyan-100/70">{uniqueCards.length} cards</span></div>{uniqueCards.length ? <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">{uniqueCards.slice(0, 12).map(card => <Card key={card.id} item={card} />)}</div> : <p className="rounded-xl border border-dashed border-white/15 p-4 text-sm text-blue-100/60">Nenhum card disponível.</p>}</section>
        </>}
        <footer className="pt-8 text-center text-xs text-blue-100/35">Painel em modo de exibição · {now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</footer>
      </div>
    </main>
  );
};

const Kpi: React.FC<{ label: string; value: string; icon: React.ReactNode; accent: 'cyan' | 'amber' | 'blue' | 'violet' }> = ({ label, value, icon, accent }) => {
  const colors = { cyan: 'text-cyan-200 bg-cyan-300/10', amber: 'text-amber-200 bg-amber-300/10', blue: 'text-blue-200 bg-blue-300/10', violet: 'text-violet-200 bg-violet-300/10' };
  return <div className="rounded-2xl border border-white/10 bg-white/[.055] p-4 backdrop-blur-lg sm:p-5"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-blue-100/65 sm:text-sm">{label}</span><span className={`grid h-9 w-9 place-items-center rounded-xl ${colors[accent]}`}>{icon}</span></div><div className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">{value}</div></div>;
};

const Card: React.FC<{ item: CardItem }> = ({ item }) => <article className={`rounded-2xl border p-4 ${item.unlocked ? 'border-cyan-200/25 bg-gradient-to-br from-blue-500/20 to-indigo-600/10' : 'border-white/10 bg-white/[.025] opacity-60'}`}><div className="text-3xl" aria-hidden="true">{item.icon}</div><div className="mt-3 font-bold">{item.name}</div><p className="mt-1 line-clamp-2 text-xs text-blue-100/60">{item.description}</p><div className="mt-3 text-[10px] font-bold uppercase tracking-wider text-cyan-100/55">{item.unlocked ? 'Desbloqueado' : 'Bloqueado'} · {item.rarity}</div></article>;

const Achievement: React.FC<{ item: AchievementItem }> = ({ item }) => <article className={`rounded-xl border p-3 ${item.unlocked ? 'border-amber-200/20 bg-amber-300/[.07]' : 'border-white/[.08] bg-[#0b1234]/40 opacity-65'}`}><div className="flex items-center gap-2"><span aria-hidden="true" className="text-xl">{item.icon}</span><span className="line-clamp-1 text-sm font-semibold">{item.title}</span></div><p className="mt-1 line-clamp-2 text-xs text-blue-100/55">{item.description}</p></article>;

export default PainelSalaMissoes;
