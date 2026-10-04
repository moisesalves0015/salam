import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  Lock, Play, BookOpen, Calculator, FlaskConical, Check,
  Sparkles, Printer, User, Users, Globe, Filter, Coins,
  X, Target, Star, Palette, CheckCircle2, Info, MapPin
} from 'lucide-react';
import { GameWorldTrack } from './game-ui/GameWorldTrack';
import { subjectTracksMap } from '../data/curriculum';
import { Student } from '../types';
import { TrailGameShell } from './trail-game/TrailGameShell';
import { WorldSelector } from './trail-game/WorldSelector';
import { TrailProgressCard } from './trail-game/TrailProgressCard';
import { TrailFilterBar } from './trail-game/TrailFilterBar';

interface TrilhasViewProps {
  onStartMission: (missionNode?: any) => void;
  selectedStudent: Student;
  /** Ref to the sidebar/menu button that opened Trilhas, for focus restoration */
  triggerRef?: React.RefObject<HTMLElement | null>;
}

type Discipline = 'mat' | 'por' | 'cie' | 'cul' | 'fin';
type ModalFilter = 'all' | 'individual' | 'dupla' | 'grupo' | 'impresso';

const DISCIPLINES = [
  {
    id: 'mat' as Discipline,
    label: 'Reino da Matemática',
    icon: Calculator,
    gradient: 'from-emerald-500 to-teal-600',
    bncc: 'EF05MA - Operações, geometria e resolução de problemas',
    isNew: false,
    image: '/assets/trilhas/reino-matematica-3d-transparente.png',
  },
  {
    id: 'por' as Discipline,
    label: 'Jornada da Língua',
    icon: BookOpen,
    gradient: 'from-blue-500 to-indigo-600',
    bncc: 'EF05LP - Leitura, produção textual e oralidade',
    isNew: false,
    image: '/assets/trilhas/jornada-lingua-3d-transparente.png',
  },
  {
    id: 'cie' as Discipline,
    label: 'Ilha das Ciências',
    icon: FlaskConical,
    gradient: 'from-amber-500 to-orange-600',
    bncc: 'EF05CI - Vida, ambiente, matéria e energia',
    isNew: false,
    image: '/assets/trilhas/ilha-ciencias-3d-transparente.png',
  },
  {
    id: 'cul' as Discipline,
    label: 'Mundo da Cultura',
    icon: Palette,
    gradient: 'from-purple-500 to-pink-600',
    bncc: 'Arte, Literatura, Música, Cidadania e Diversidade Cultural',
    isNew: true,
    image: '/assets/trilhas/mundo-cultura-3d-transparente.png',
  },
  {
    id: 'fin' as Discipline,
    label: 'Educação Financeira',
    icon: Coins,
    gradient: 'from-yellow-400 to-amber-500',
    bncc: 'Educação Financeira - Consumo consciente e planejamento',
    isNew: false,
    image: '/assets/trilhas/educacao-financeira-3d-transparente.png',
  },
];

interface TrailNode {
  id: string;
  title: string;
  sub: string;
  status: 'concluido' | 'ativo' | 'bloqueado';
  xp: number;
  coins: number;
  modalidade: ModalFilter[];
  habilidades: string[];
  criterioAvanco: string;
  cultural?: string;
  unitData?: any;
}

// ── Static trail data (preservado integralmente) ──────────────────────────────
const MATH_NODES: TrailNode[] = [
  { id: 'mat-01', title: 'Vila dos Números', sub: 'Sistema decimal: unidades, dezenas e centenas', status: 'concluido', xp: 50, coins: 25, modalidade: ['individual', 'impresso'], habilidades: ['Compor e decompor números', 'Reconhecer valor posicional'], criterioAvanco: 'Compor e decompor corretamente números de até 3 ordens em 8 de 10 tentativas' },
  { id: 'mat-02', title: 'O Desafio da Centena', sub: 'Composição e cálculo com reagrupamento', status: 'concluido', xp: 60, coins: 30, modalidade: ['individual', 'dupla', 'impresso'], habilidades: ['Adição com reagrupamento', 'Cálculo mental'], criterioAvanco: 'Calcular adições com reagrupamento com autonomia' },
  { id: 'mat-03', title: 'A Unidade de Milhar', sub: 'Retirar, comparar e achar a diferença', status: 'concluido', xp: 60, coins: 30, modalidade: ['individual', 'dupla', 'impresso'], habilidades: ['Subtração com e sem reagrupamento', 'Ideia de diferença'], criterioAvanco: 'Resolver subtrações identificando a ideia adequada' },
  { id: 'mat-04', title: 'Compondo e Decompondo', sub: 'Agrupamentos e parcelas iguais', status: 'concluido', xp: 70, coins: 35, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Multiplicação por agrupamento', 'Tabuada'], criterioAvanco: 'Multiplicar usando estratégias variadas com autonomia' },
  { id: 'mat-05', title: 'O Desafio da Divisão', sub: 'Grupos iguais e repartição (Missão Atual)', status: 'ativo', xp: 75, coins: 40, modalidade: ['individual', 'dupla', 'grupo', 'impresso'], habilidades: ['Divisão por agrupamento', 'Repartição equitativa', 'Relação divisão-multiplicação'], criterioAvanco: 'Resolver divisões compreendendo o processo de repartição' },
  { id: 'mat-06', title: 'Situações-Problema', sub: 'Aplicação das 4 operações no cotidiano', status: 'ativo', xp: 100, coins: 50, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Interpretação de problemas', 'Escolha da operação adequada', 'Resolução de problemas complexos'], criterioAvanco: 'Resolver problemas com múltiplas etapas identificando as operações corretas' },
];

const PORTUGUESE_NODES: TrailNode[] = [
  { id: 'por-01', title: 'Território das Palavras', sub: 'Relação fonema-grafema e ortografia', status: 'concluido', xp: 50, coins: 25, modalidade: ['individual', 'impresso'], habilidades: ['Sons e letras do português', 'Regras ortográficas básicas'], criterioAvanco: 'Aplicar regras ortográficas estudadas com consistência' },
  { id: 'por-02', title: 'Construção de Frases', sub: 'Sintaxe e pontuação básica', status: 'concluido', xp: 55, coins: 28, modalidade: ['individual', 'dupla', 'impresso'], habilidades: ['Estrutura de frases', 'Uso de pontuação'], criterioAvanco: 'Construir frases coerentes com pontuação adequada' },
  { id: 'por-03', title: 'Compreensão Textual', sub: 'Localizar informações explícitas', status: 'concluido', xp: 60, coins: 30, modalidade: ['individual', 'impresso'], habilidades: ['Localização de informações', 'Pistas textuais explícitas'], criterioAvanco: 'Localizar com precisão informações explícitas em textos variados' },
  { id: 'por-04', title: 'A Ideia Principal', sub: 'Inferências e mensagem central (Missão Atual)', status: 'ativo', xp: 70, coins: 35, modalidade: ['individual', 'dupla', 'impresso'], habilidades: ['Inferência textual', 'Identificar ideia central', 'Uso de conhecimento de mundo'], criterioAvanco: 'Realizar inferências apoiadas em evidências do texto com autonomia' },
  { id: 'por-05', title: 'Produção Textual', sub: 'Organização de parágrafos e coerência', status: 'ativo', xp: 80, coins: 40, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Produção de textos coerentes', 'Organização textual', 'Revisão e reescrita'], criterioAvanco: 'Produzir texto com início, meio e fim organizado e coerente' },
  { id: 'por-06', title: 'Desafio da Escrita Criativa', sub: 'Contos, crônicas e apresentações', status: 'ativo', xp: 100, coins: 50, modalidade: ['grupo', 'dupla', 'impresso'], habilidades: ['Criação literária', 'Narração', 'Expressão pessoal'], criterioAvanco: 'Criar um texto de gênero definido demonstrando autoria' },
];

const SCIENCE_NODES: TrailNode[] = [
  { id: 'cie-01', title: 'Ilha da Observação', sub: 'Seres vivos e seus ambientes', status: 'concluido', xp: 50, coins: 25, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Classificação de seres vivos', 'Observação científica'], criterioAvanco: 'Classificar seres vivos a partir das características observadas' },
  { id: 'cie-02', title: 'Ciclos da Água e Solo', sub: 'Transformações e ecossistemas (Missão Atual)', status: 'ativo', xp: 60, coins: 30, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Ciclo da água', 'Preservação ambiental', 'Ecossistemas'], criterioAvanco: 'Explicar o ciclo da água e sua importância para a vida' },
  { id: 'cie-03', title: 'Laboratório do Explorador', sub: 'Experimentos práticos e hipóteses', status: 'ativo', xp: 80, coins: 40, modalidade: ['grupo', 'impresso'], habilidades: ['Método científico', 'Formulação de hipóteses', 'Experimentação'], criterioAvanco: 'Planejar e executar experimento simples seguindo etapas científicas' },
];

const CULTURE_NODES: TrailNode[] = [
  { id: 'cul-01', title: 'Vozes do Brasil', sub: 'Literatura e diversidade cultural', status: 'ativo', xp: 55, coins: 30, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Apreciação literária', 'Identidade cultural', 'Leitura de textos literários'], criterioAvanco: 'Identificar elementos culturais em textos literários e relacionar com identidade', cultural: '🎭 Literatura, Diversidade e Memória Cultural' },
  { id: 'cul-02', title: 'Ritmos do Brasil', sub: 'Música, expressão e identidade regional', status: 'ativo', xp: 50, coins: 25, modalidade: ['individual', 'grupo'], habilidades: ['Apreciação musical', 'Diversidade regional', 'Expressão artística'], criterioAvanco: 'Reconhecer ritmos musicais brasileiros e suas origens culturais', cultural: '🎵 Música, Ritmo e Expressão Cultural' },
  { id: 'cul-03', title: 'Cidadãos do Mundo', sub: 'Direitos, responsabilidades e cidadania ativa', status: 'ativo', xp: 70, coins: 35, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Cidadania crítica', 'Direitos e responsabilidades', 'Pensamento argumentativo'], criterioAvanco: 'Identificar direitos e responsabilidades cidadãs e propor ações concretas', cultural: '🌍 Cidadania, Ética e Participação Social' },
  { id: 'cul-04', title: 'Arte que Fala', sub: 'Artes visuais e patrimônio cultural', status: 'ativo', xp: 65, coins: 32, modalidade: ['grupo', 'impresso'], habilidades: ['Leitura de obras de arte', 'Patrimônio cultural', 'Expressão visual'], criterioAvanco: 'Analisar obras de arte identificando elementos visuais e contexto cultural', cultural: '🎨 Arte, Criação e Patrimônio' },
];

const TRAIL_DATA: Record<Discipline, TrailNode[]> = {
  mat: MATH_NODES,
  por: PORTUGUESE_NODES,
  cie: SCIENCE_NODES,
  cul: CULTURE_NODES,
  fin: [],
};

// ─────────────────────────────────────────────────────────────────────────────

export const TrilhasView: React.FC<TrilhasViewProps> = ({
  onStartMission,
  selectedStudent,
  triggerRef,
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>('mat');
  const [activeModalFilter, setActiveModalFilter] = useState<ModalFilter>('all');
  const [stageModal, setStageModal] = useState<TrailNode | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  // Modo de revisão
  const isPreviewMode = import.meta.env.VITE_ENABLE_MISSION_PREVIEW === 'true';

  const currentDisc = DISCIPLINES.find(d => d.id === selectedDiscipline)!;
  // Se for preview, força o status para 'ativo'
  const rawNodes = TRAIL_DATA[selectedDiscipline];
  const allNodes = useMemo(() => {
    if (!isPreviewMode) return rawNodes;
    return rawNodes.map(n => ({ ...n, status: 'ativo' as const }));
  }, [rawNodes, isPreviewMode]);

  // Filtered nodes
  const filteredNodes = useMemo(() =>
    activeModalFilter === 'all'
      ? allNodes
      : allNodes.filter(n => n.modalidade.includes(activeModalFilter)),
    [allNodes, activeModalFilter]
  );

  // Counts
  const completedCount = allNodes.length > 0 ? allNodes.filter(n => n.status === 'concluido').length : 0;
  const progressPercent = allNodes.length > 0 ? Math.round((completedCount / allNodes.length) * 100) : 0;

  // Active tracks from curriculum data
  const subjectIdStr = selectedDiscipline === 'mat' ? 'matematica'
    : selectedDiscipline === 'por' ? 'portugues'
    : selectedDiscipline === 'cie' ? 'ciencias'
    : selectedDiscipline === 'cul' ? 'artes'
    : 'financeira';
  const activeTracks = subjectTracksMap[subjectIdStr] || [];

  // Next mission
  const nextNode = allNodes.find(n => n.status === 'ativo');

  // Count per filter for display
  const countByFilter = useMemo(() => {
    const counts: Partial<Record<ModalFilter, number>> = {};
    (['all', 'individual', 'dupla', 'grupo', 'impresso'] as ModalFilter[]).forEach(f => {
      counts[f] = f === 'all' ? allNodes.length : allNodes.filter(n => n.modalidade.includes(f)).length;
    });
    return counts;
  }, [allNodes]);

  // Disciplines with computed counts for WorldSelector
  const worldData = useMemo(() => DISCIPLINES.map(d => {
    const nodes = TRAIL_DATA[d.id];
    return {
      id: d.id,
      label: d.label,
      icon: d.icon,
      gradient: d.gradient,
      bncc: d.bncc,
      isNew: d.isNew,
      image: d.image,
      completedCount: nodes.length > 0 ? nodes.filter(n => n.status === 'concluido').length : 0,
      totalCount: nodes.length,
    };
  }), []);

  // Track nodes from curriculum
  const buildTrackNodes = (track: any) =>
    track.units.map((unit: any, idx: number) => ({
      id: unit.id,
      title: unit.title,
      sub: unit.shortDesc,
      status: isPreviewMode 
        ? 'ativo' 
        : (idx === 0 ? 'concluido' : 'ativo') as 'concluido' | 'ativo' | 'bloqueado',
      xp: unit.xpReward || 50,
      coins: 30,
      modalidade: ['individual'],
      habilidades: [],
      criterioAvanco: '',
      unitData: unit,
    }));

  const handleNodeClick = useCallback((node: TrailNode) => {
    setStageModal(node);
  }, []);

  const handleStartStage = useCallback(() => {
    if (stageModal) {
      setStageModal(null);
      onStartMission(stageModal);
    }
  }, [stageModal, onStartMission]);

  const handleContinueJourney = useCallback(() => {
    if (nextNode) {
      setStageModal(nextNode);
    }
  }, [nextNode]);

  if (!isOpen) return null;

  const currentTrackTitle = activeTracks.length > 0 ? activeTracks[0].title : currentDisc.label;
  const currentTrackDesc = activeTracks.length > 0 ? activeTracks[0].description : currentDisc.bncc;

  // Determine total and completed counts (prefer curriculum tracks if available)
  const totalForHud = activeTracks.length > 0
    ? activeTracks.reduce((s: number, t: any) => s + t.units.length, 0)
    : allNodes.length;
  const completedForHud = activeTracks.length > 0 ? completedCount : completedCount;
  const progressForHud = totalForHud > 0 ? Math.round((completedForHud / totalForHud) * 100) : progressPercent;

  return (
    <TrailGameShell
      student={selectedStudent}
      worldLabel={currentDisc.label}
      worldIcon={currentDisc.icon}
      worldGradient={currentDisc.gradient}
      completedCount={completedCount}
      totalCount={allNodes.length > 0 ? allNodes.length : totalForHud}
      progressPercent={progressForHud}
      nextMissionTitle={nextNode?.title}
      onExit={() => setIsOpen(false)}
      triggerRef={triggerRef}
    >
      {isPreviewMode && (
        <div className="bg-amber-500/20 border border-amber-500/40 text-amber-300 px-4 py-2 text-xs font-bold rounded-xl mb-4 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          Modo de Revisão Ativo: Todas as missões estão desbloqueadas para teste. Nenhum progresso será salvo.
        </div>
      )}

      {/* ── World Selector ───────────────────────────────────────────── */}
      <section aria-label="Selecionar mundo" className="-mx-3 sm:-mx-10 md:-mx-20">
        <p className="text-[11px] text-white/60 font-black uppercase tracking-widest mb-2 px-3 sm:px-10 md:px-20 drop-shadow-md">
          Mundos de Aprendizagem
        </p>
        <div className="px-0 sm:px-6 md:px-16">
          <WorldSelector
            disciplines={worldData}
            selectedId={selectedDiscipline}
            onChange={(id) => {
              setSelectedDiscipline(id as Discipline);
              setActiveModalFilter('all');
            }}
          />
        </div>
      </section>

      {/* ── Progress Card & Filters ────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-stretch gap-3">
        {/* Progress Card (flex-1) */}
        <div className="flex-1 min-w-0">
          <TrailProgressCard
            worldLabel={currentDisc.label}
            worldIcon={currentDisc.icon}
            worldGradient={currentDisc.gradient}
            bncc={currentDisc.bncc}
            completedCount={completedCount}
            totalCount={allNodes.length > 0 ? allNodes.length : totalForHud}
            progressPercent={progressForHud}
            nextMissionTitle={nextNode?.title}
            onContinue={nextNode ? handleContinueJourney : undefined}
            trackTitle={currentTrackTitle}
            trackDescription={currentTrackDesc}
            themeId={selectedDiscipline}
          />
        </div>

        {/* Filter Bar (Dropdown) */}
        {allNodes.length > 0 && (
          <div className="shrink-0">
            <TrailFilterBar
              activeFilter={activeModalFilter}
              onChange={setActiveModalFilter}
              countByFilter={countByFilter}
            />
          </div>
        )}
      </div>

      {filteredNodes.length === 0 && (
        <p className="text-center text-xs text-white/40 mt-3 py-2">
          Nenhuma missão encontrada para este filtro. Tente "Todos".
        </p>
      )}

      {/* ── Track Maps ───────────────────────────────────────────────── */}
      {activeTracks.length > 0 ? (
        <div className="flex flex-col gap-10 mt-4">
          {activeTracks.map((track: any) => {
            const trackNodes = buildTrackNodes(track);
            return (
              <section key={track.id} aria-label={`Trilha: ${track.title}`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className={`h-1 flex-1 bg-gradient-to-r ${currentDisc.gradient} opacity-50 rounded-full`} />
                  <h3 className="text-[15px] sm:text-lg font-black text-white px-2 drop-shadow-lg italic uppercase tracking-wider">{track.title}</h3>
                  <div className={`h-1 flex-1 bg-gradient-to-l ${currentDisc.gradient} opacity-50 rounded-full`} />
                </div>
                <GameWorldTrack
                  trackId={track.id}
                  nodes={trackNodes as any}
                  themeId={selectedDiscipline}
                  onNodeClick={(node) => handleNodeClick(node as any)}
                />
              </section>
            );
          })}
        </div>
      ) : allNodes.length > 0 ? (
        <section aria-label={`Mapa: ${currentDisc.label}`}>
          <GameWorldTrack
            trackId={selectedDiscipline}
            nodes={filteredNodes as any}
            themeId={selectedDiscipline}
            onNodeClick={(node) => handleNodeClick(node as any)}
          />
        </section>
      ) : (
        <div className="text-center py-12 text-white/40 text-sm">
          <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-40" />
          <p className="font-bold">Em breve!</p>
          <p className="text-xs mt-1">Esta trilha está sendo preparada.</p>
        </div>
      )}

      {/* ── Cultural highlight (preserved) ───────────────────────────── */}
      {selectedDiscipline === 'cul' && (
        <div className="bg-[#1a0e2a] border-2 border-purple-500/50 rounded-2xl p-5 shadow-xl shadow-purple-900/20">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg border border-white/20 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[13px] font-black uppercase tracking-wider text-purple-300 mb-1 drop-shadow-md">Trilha Cultural: Formação Humana Integral</h3>
              <p className="text-sm text-purple-200/80 leading-relaxed font-medium">
                O Mundo da Cultura vai além dos conteúdos escolares. Aqui, o estudante amplia seu repertório cultural, desenvolve pensamento crítico, conhece a diversidade do Brasil e se forma como sujeito participativo.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Literatura', 'Música', 'Arte', 'Teatro', 'Cidadania', 'Diversidade', 'Patrimônio'].map(tag => (
                  <span key={tag} className="text-[10px] uppercase font-black px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-200 border border-purple-400/30">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Print missions banner (preserved) ────────────────────────── */}
      <div className="flex items-center gap-3 bg-orange-900/30 border border-orange-400/20 rounded-2xl p-4 backdrop-blur-sm mt-4">
        <div className="w-9 h-9 rounded-xl bg-orange-500/80 flex items-center justify-center shrink-0">
          <Printer className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-xs font-black text-orange-200">Missões com versão impressa disponível</div>
          <div className="text-xs text-orange-300/70 font-medium">
            Missões marcadas com 🖨️ têm versão para impressão. Solicite ao professor.
          </div>
        </div>
      </div>

      {/* ── Stage Modal (preserved + improved) ───────────────────────── */}
      {stageModal && (() => {
        const WorldIcon = currentDisc.icon;
        
        // Cores do CTA baseadas no theme
        const ctaThemes = {
          mat: { bg: 'bg-[#0d2a22]', border: 'border-emerald-400/60', shadow: 'shadow-emerald-900/20', text: 'text-emerald-400', textLight: 'text-emerald-300', btn: 'bg-emerald-500 hover:bg-emerald-400 border-emerald-700' },
          por: { bg: 'bg-[#0d1b38]', border: 'border-blue-400/60', shadow: 'shadow-blue-900/20', text: 'text-blue-400', textLight: 'text-blue-300', btn: 'bg-blue-600 hover:bg-blue-500 border-blue-800' },
          cie: { bg: 'bg-[#2a140b]', border: 'border-orange-400/60', shadow: 'shadow-orange-900/20', text: 'text-orange-400', textLight: 'text-orange-300', btn: 'bg-orange-500 hover:bg-orange-400 border-orange-700' },
          cul: { bg: 'bg-[#200b2a]', border: 'border-purple-400/60', shadow: 'shadow-purple-900/20', text: 'text-purple-400', textLight: 'text-purple-300', btn: 'bg-purple-600 hover:bg-purple-500 border-purple-800' },
          fin: { bg: 'bg-[#2a220b]', border: 'border-yellow-400/60', shadow: 'shadow-yellow-900/20', text: 'text-yellow-400', textLight: 'text-yellow-300', btn: 'bg-yellow-500 hover:bg-yellow-400 border-yellow-700' },
        } as const;
        const ctaTheme = ctaThemes[selectedDiscipline as keyof typeof ctaThemes] || ctaThemes.mat;

        return (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="stage-modal-title"
            onClick={() => setStageModal(null)}
          >
            <div
              className="bg-[#0e1733] border-2 border-slate-500/60 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden animate-trail-enter"
              onClick={e => e.stopPropagation()}
            >
              {/* Gradient top banner */}
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${currentDisc.gradient}`} />

              <div className="p-5 sm:p-6 mt-2">
                {/* Close button */}
                <button
                  onClick={() => setStageModal(null)}
                  className="trail-focus absolute top-5 right-5 w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600/80 text-slate-300 hover:text-white flex items-center justify-center transition active:scale-95 shadow-lg"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Label row */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-white/40 uppercase tracking-widest">
                    <MapPin className="w-3.5 h-3.5" />
                    Percurso Adaptativo
                  </div>
                </div>

                {/* World + Title */}
                <div className="flex flex-col gap-2 mb-6">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r ${currentDisc.gradient} text-white text-[11px] font-black uppercase tracking-wider self-start shadow-lg border border-white/20`}>
                    <WorldIcon className="w-3.5 h-3.5" />
                    {currentDisc.label}
                  </div>
                  <h2 id="stage-modal-title" className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-md" style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}>
                    {stageModal.title}
                  </h2>
                  <p className="text-sm text-slate-300 mt-1 font-medium leading-relaxed">
                    {stageModal.sub || currentDisc.bncc}
                  </p>
                </div>

                {/* Progress bar matching the card */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1">
                    <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/5 mb-2 shadow-inner">
                      <div
                        className={`h-full bg-gradient-to-r ${currentDisc.gradient} rounded-full transition-all`}
                        style={{ width: `${progressForHud}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-white/40 font-black uppercase tracking-wider">
                      <span>Trilhas</span>
                      <span className="text-white/70">{completedForHud} de {totalForHud} dominadas</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-center bg-[#141c38] rounded-xl px-3 py-2 border-2 border-slate-700 shadow-md">
                    <div className="text-xl font-black text-white leading-none drop-shadow-md">{progressForHud}%</div>
                  </div>
                </div>

                {/* Next mission CTA (Próximo destino) */}
                <div className={`flex items-center gap-3 mb-5 p-4 ${ctaTheme.bg} border-2 ${ctaTheme.border} rounded-2xl shadow-lg ${ctaTheme.shadow}`}>
                  <Target className={`w-6 h-6 ${ctaTheme.text} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <div className={`text-[10px] ${ctaTheme.textLight} font-black uppercase tracking-widest mb-0.5 opacity-80`}>Destino da Missão</div>
                    <div className={`text-sm font-black ${ctaTheme.textLight} truncate`}>{stageModal.title}</div>
                  </div>
                  <button
                    onClick={handleStartStage}
                    disabled={stageModal.status === 'bloqueado'}
                    className={`trail-focus shrink-0 px-5 py-2.5 text-white text-[13px] font-black uppercase tracking-wider rounded-xl transition-all shadow-lg border-b-[3px] ${
                      stageModal.status === 'bloqueado' 
                        ? 'bg-slate-700 border-slate-800 text-white/40 cursor-not-allowed'
                        : `${ctaTheme.btn} active:translate-y-1 active:border-b-0`
                    }`}
                  >
                    {stageModal.status === 'bloqueado' ? <Lock className="w-4 h-4 mx-auto" /> : 'Ir!'}
                  </button>
                </div>

                {/* BNCC */}
                <div className="bg-[#141c38] p-4 rounded-xl border border-slate-700">
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> Habilidades BNCC
                  </div>
                  <div className="text-xs text-white/70 leading-relaxed font-medium">
                    {stageModal.habilidades.length > 0 ? stageModal.habilidades.join(', ') : currentDisc.bncc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </TrailGameShell>
  );
};
