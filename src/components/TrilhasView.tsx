import React, { useCallback, useMemo, useState } from 'react';
import {
  BookOpen, Calculator, FlaskConical, Palette, Coins, Compass, Globe,
  Lock, MapPin, Sparkles, Target, X,
} from 'lucide-react';
import { GameWorldTrack } from './game-ui/GameWorldTrack';
import { Student, Mission } from '../types';
import { TrailGameShell } from './trail-game/TrailGameShell';
import { WorldSelector } from './trail-game/WorldSelector';
import { TrailProgressCard } from './trail-game/TrailProgressCard';
import { TrailFilterBar } from './trail-game/TrailFilterBar';

export interface TrailCatalogItem {
  id: string;
  name: string;
  subject: string;
  description?: string;
  order?: number;
  icon?: string;
  color?: string;
  bnccSkills?: string[];
  active?: boolean;
}

export interface TrilhasViewProps {
  onStartMission: (missionNode?: any) => void;
  selectedStudent: Student;
  triggerRef?: React.RefObject<HTMLElement | null>;
  trails?: TrailCatalogItem[];
  missions?: Mission[];
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
}

type MissionExtra = Mission & {
  trailId?: string;
  order?: number;
  primaryAbility?: string;
  coinsReward?: number;
  estimatedMinutes?: number;
};
type ModalFilter = 'all' | 'individual' | 'dupla' | 'grupo' | 'impresso';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  book: BookOpen,
  bookopen: BookOpen,
  calculator: Calculator,
  science: FlaskConical,
  flaskconical: FlaskConical,
  palette: Palette,
  culture: Globe,
  coins: Coins,
  compass: Compass,
};
const THEMES = [
  { gradient: 'from-emerald-500 to-teal-600', color: 'text-emerald-300', bg: 'bg-[#0d2a22]', border: 'border-emerald-400/60', btn: 'bg-emerald-500 hover:bg-emerald-400 border-emerald-700' },
  { gradient: 'from-blue-500 to-indigo-600', color: 'text-blue-300', bg: 'bg-[#0d1b38]', border: 'border-blue-400/60', btn: 'bg-blue-600 hover:bg-blue-500 border-blue-800' },
  { gradient: 'from-amber-500 to-orange-600', color: 'text-orange-300', bg: 'bg-[#2a140b]', border: 'border-orange-400/60', btn: 'bg-orange-500 hover:bg-orange-400 border-orange-700' },
  { gradient: 'from-purple-500 to-pink-600', color: 'text-purple-300', bg: 'bg-[#200b2a]', border: 'border-purple-400/60', btn: 'bg-purple-600 hover:bg-purple-500 border-purple-800' },
  { gradient: 'from-yellow-400 to-amber-500', color: 'text-yellow-300', bg: 'bg-[#2a220b]', border: 'border-yellow-400/60', btn: 'bg-yellow-500 hover:bg-yellow-400 border-yellow-700' },
];
const iconFor = (value?: string) => ICONS[(value ?? '').toLowerCase().replace(/[^a-z]/g, '')] ?? Compass;
const themeFor = (trail: TrailCatalogItem, index: number) => ({
  ...THEMES[index % THEMES.length],
  ...(trail.color?.trim() ? { gradient: trail.color.trim() } : {}),
});

export const TrilhasView: React.FC<TrilhasViewProps> = ({
  onStartMission, selectedStudent, triggerRef, trails = [], missions = [],
  loading = false, error = null, onRefresh,
}) => {
  const [selectedTrailId, setSelectedTrailId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<ModalFilter>('all');
  const [selectedMission, setSelectedMission] = useState<MissionExtra | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const activeTrails = useMemo(() => trails
    .filter(trail => trail.active !== false)
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)), [trails]);
  const currentTrail = activeTrails.find(trail => trail.id === selectedTrailId) ?? activeTrails[0];
  const currentIndex = currentTrail ? activeTrails.findIndex(trail => trail.id === currentTrail.id) : 0;
  const currentTheme = currentTrail ? themeFor(currentTrail, currentIndex) : THEMES[0];
  const currentIcon = iconFor(currentTrail?.icon);
  const trailMissions = useMemo(() => {
    if (!currentTrail) return [];
    return missions
      .filter(mission => (mission as MissionExtra).trailId === currentTrail.id)
      .slice()
      .sort((a, b) => (((a as MissionExtra).order ?? 0) - ((b as MissionExtra).order ?? 0)));
  }, [currentTrail, missions]);
  const completedCount = trailMissions.filter(mission => mission.status === 'Concluída').length;
  const totalCount = trailMissions.length;
  const progressPercent = totalCount ? Math.round(completedCount / totalCount * 100) : 0;
  const nextMission = trailMissions.find(mission => mission.status === 'Em andamento' || mission.status === 'Disponível');
  const visibleMissions = activeFilter === 'all' ? trailMissions : [];

  const worldData = activeTrails.map((trail, index) => {
    const worldMissions = missions.filter(mission => (mission as MissionExtra).trailId === trail.id);
    const done = worldMissions.filter(mission => mission.status === 'Concluída').length;
    return {
      id: trail.id,
      label: trail.name,
      icon: iconFor(trail.icon),
      gradient: themeFor(trail, index).gradient,
      bncc: trail.description ?? trail.bnccSkills?.join(' · ') ?? '',
      completedCount: done,
      totalCount: worldMissions.length,
    };
  });
  const asTrackNode = (mission: Mission) => {
    const extra = mission as MissionExtra;
    return {
      id: mission.id,
      title: mission.title,
      sub: mission.objective,
      status: mission.status === 'Concluída' ? 'concluido' as const : mission.status === 'Bloqueada' ? 'bloqueado' as const : 'ativo' as const,
      xp: mission.xpReward,
      coins: extra.coinsReward ?? 0,
      modalidade: [],
      habilidades: extra.primaryAbility ? [extra.primaryAbility] : [],
      criterioAvanco: mission.objective,
    };
  };
  const openMission = useCallback((mission: Mission) => setSelectedMission(mission as MissionExtra), []);
  const startSelectedMission = useCallback(() => {
    if (!selectedMission || selectedMission.status === 'Bloqueada') return;
    const mission = selectedMission;
    setSelectedMission(null);
    onStartMission(mission);
  }, [selectedMission, onStartMission]);
  const continueMission = useCallback(() => {
    if (nextMission) openMission(nextMission);
  }, [nextMission, openMission]);

  if (!isOpen) return null;
  return (
    <TrailGameShell
      student={selectedStudent}
      worldLabel={currentTrail?.name ?? 'Mundos de aprendizagem'}
      worldIcon={currentIcon}
      worldGradient={currentTheme.gradient}
      completedCount={completedCount}
      totalCount={totalCount}
      progressPercent={progressPercent}
      nextMissionTitle={nextMission?.title}
      onExit={() => setIsOpen(false)}
      triggerRef={triggerRef}
    >
      <section aria-label="Selecionar mundo" className="-mx-3 sm:-mx-10 md:-mx-20">
        <p className="text-[11px] text-white/60 font-black uppercase tracking-widest mb-2 px-3 sm:px-10 md:px-20 drop-shadow-md">Mundos de Aprendizagem</p>
        <div className="px-0 sm:px-6 md:px-16">
          <WorldSelector disciplines={worldData} selectedId={currentTrail?.id ?? ''} onChange={id => { setSelectedTrailId(id); setActiveFilter('all'); setSelectedMission(null); }} />
        </div>
      </section>

      {(loading || error || !currentTrail || !trailMissions.length) && (
        <div className="rounded-2xl border border-white/15 bg-slate-950/40 px-5 py-7 text-center text-white/75" role={error ? 'alert' : 'status'}>
          {loading ? <><Sparkles className="mx-auto mb-2 h-7 w-7 animate-pulse" /><p className="font-bold">Carregando trilhas e progresso…</p></> : error ? <><p className="font-bold">Não foi possível carregar as trilhas.</p><p className="mt-1 text-sm text-white/55">{error}</p></> : <><Compass className="mx-auto mb-2 h-7 w-7 opacity-60" /><p className="font-bold">Nenhuma trilha ou missão disponível.</p><p className="mt-1 text-sm text-white/55">Quando houver dados, eles aparecerão aqui.</p></>}
          {error && onRefresh && <button type="button" onClick={onRefresh} className="trail-focus mt-4 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white hover:bg-white/15">Tentar novamente</button>}
        </div>
      )}

      {currentTrail && <>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch gap-3">
          <div className="flex-1 min-w-0">
            <TrailProgressCard
              worldLabel={currentTrail.name}
              worldIcon={currentIcon}
              worldGradient={currentTheme.gradient}
              bncc={currentTrail.bnccSkills?.join(' · ') ?? ''}
              completedCount={completedCount}
              totalCount={totalCount}
              progressPercent={progressPercent}
              nextMissionTitle={nextMission?.title}
              onContinue={nextMission ? continueMission : undefined}
              trackTitle={currentTrail.name}
              trackDescription={currentTrail.description}
              themeId={currentTrail.id}
            />
          </div>
          {trailMissions.length > 0 && <div className="shrink-0"><TrailFilterBar activeFilter={activeFilter} onChange={setActiveFilter} countByFilter={{ all: trailMissions.length, individual: 0, dupla: 0, grupo: 0, impresso: 0 }} /></div>}
        </div>
        {activeFilter !== 'all' && trailMissions.length > 0 && <p className="text-center text-xs text-white/50">Os dados recebidos não incluem modalidade para filtrar missões.</p>}
        {visibleMissions.length > 0 && <section aria-label={`Mapa: ${currentTrail.name}`}>
          <GameWorldTrack trackId={currentTrail.id} nodes={visibleMissions.map(asTrackNode)} themeId={currentTrail.id} onNodeClick={node => { const mission = visibleMissions.find(item => item.id === node.id); if (mission) openMission(mission); }} />
        </section>}
      </>}

      {selectedMission && currentTrail && (() => {
        const mission = selectedMission;
        const Icon = currentIcon;
        const blocked = mission.status === 'Bloqueada';
        const skills = currentTrail.bnccSkills ?? [];
        return <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="stage-modal-title" onClick={() => setSelectedMission(null)}>
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border-2 border-slate-500/60 bg-[#0e1733] shadow-2xl" onClick={event => event.stopPropagation()}>
            <div className={`absolute top-0 h-1.5 w-full bg-gradient-to-r ${currentTheme.gradient}`} />
            <div className="relative mt-2 p-5 sm:p-6">
              <button onClick={() => setSelectedMission(null)} className="trail-focus absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-xl border border-slate-600/80 bg-slate-800 text-slate-300" aria-label="Fechar"><X className="h-5 w-5" /></button>
              <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40"><MapPin className="h-3.5 w-3.5" /> Percurso</div>
              <div className="mb-6 flex flex-col gap-2">
                <div className={`inline-flex self-start items-center gap-1.5 rounded-xl border border-white/20 bg-gradient-to-r ${currentTheme.gradient} px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-white`}><Icon className="h-3.5 w-3.5" />{currentTrail.name}</div>
                <h2 id="stage-modal-title" className="text-2xl font-black leading-tight text-white">{mission.title}</h2>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-300">{mission.objective}</p>
                <p className="text-xs text-white/50">Status: {mission.status} · Progresso: {mission.progress}%</p>
              </div>
              <div className="mb-5 flex items-center gap-3 rounded-2xl border-2 border-slate-600 bg-slate-900/50 p-4">
                <Target className={`h-6 w-6 shrink-0 ${currentTheme.color}`} />
                <div className="min-w-0 flex-1"><div className="text-[10px] font-black uppercase tracking-widest text-white/50">Missão</div><div className="truncate text-sm font-black text-white">{mission.title}</div></div>
                <button onClick={startSelectedMission} disabled={blocked} className={`trail-focus shrink-0 rounded-xl border-b-[3px] px-5 py-2.5 text-[13px] font-black uppercase tracking-wider text-white ${blocked ? 'cursor-not-allowed border-slate-800 bg-slate-700 text-white/40' : `${currentTheme.btn} active:translate-y-1 active:border-b-0`}`}>
                  {blocked ? <Lock className="mx-auto h-4 w-4" /> : 'Iniciar'}
                </button>
              </div>
              {(mission.primaryAbility || skills.length > 0) && <div className="rounded-xl border border-slate-700 bg-[#141c38] p-4"><div className="mb-2 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/40"><BookOpen className="h-4 w-4" /> Habilidades</div><div className="text-xs font-medium leading-relaxed text-white/70">{[mission.primaryAbility, ...skills].filter(Boolean).join(' · ')}</div></div>}
            </div>
          </div>
        </div>;
      })()}
    </TrailGameShell>
  );
};
