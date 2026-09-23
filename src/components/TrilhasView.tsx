import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  Lock, Play, BookOpen, Calculator, FlaskConical, Check,
  Sparkles, Printer, User, Users, Globe, Filter, Coins,
  X, Target, Star, Palette, CheckCircle2, Info
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
  },
  {
    id: 'por' as Discipline,
    label: 'Jornada da Língua',
    icon: BookOpen,
    gradient: 'from-blue-500 to-indigo-600',
    bncc: 'EF05LP - Leitura, produção textual e oralidade',
    isNew: false,
  },
  {
    id: 'cie' as Discipline,
    label: 'Ilha das Ciências',
    icon: FlaskConical,
    gradient: 'from-amber-500 to-orange-600',
    bncc: 'EF05CI - Vida, ambiente, matéria e energia',
    isNew: false,
  },
  {
    id: 'cul' as Discipline,
    label: 'Mundo da Cultura',
    icon: Palette,
    gradient: 'from-purple-500 to-pink-600',
    bncc: 'Arte, Literatura, Música, Cidadania e Diversidade Cultural',
    isNew: true,
  },
  {
    id: 'fin' as Discipline,
    label: 'Educação Financeira',
    icon: Coins,
    gradient: 'from-yellow-400 to-amber-500',
    bncc: 'Educação Financeira - Consumo consciente e planejamento',
    isNew: false,
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
  { id: 'mat-06', title: 'Situações-Problema', sub: 'Aplicação das 4 operações no cotidiano', status: 'bloqueado', xp: 100, coins: 50, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Interpretação de problemas', 'Escolha da operação adequada', 'Resolução de problemas complexos'], criterioAvanco: 'Resolver problemas com múltiplas etapas identificando as operações corretas' },
];

const PORTUGUESE_NODES: TrailNode[] = [
  { id: 'por-01', title: 'Território das Palavras', sub: 'Relação fonema-grafema e ortografia', status: 'concluido', xp: 50, coins: 25, modalidade: ['individual', 'impresso'], habilidades: ['Sons e letras do português', 'Regras ortográficas básicas'], criterioAvanco: 'Aplicar regras ortográficas estudadas com consistência' },
  { id: 'por-02', title: 'Construção de Frases', sub: 'Sintaxe e pontuação básica', status: 'concluido', xp: 55, coins: 28, modalidade: ['individual', 'dupla', 'impresso'], habilidades: ['Estrutura de frases', 'Uso de pontuação'], criterioAvanco: 'Construir frases coerentes com pontuação adequada' },
  { id: 'por-03', title: 'Compreensão Textual', sub: 'Localizar informações explícitas', status: 'concluido', xp: 60, coins: 30, modalidade: ['individual', 'impresso'], habilidades: ['Localização de informações', 'Pistas textuais explícitas'], criterioAvanco: 'Localizar com precisão informações explícitas em textos variados' },
  { id: 'por-04', title: 'A Ideia Principal', sub: 'Inferências e mensagem central (Missão Atual)', status: 'ativo', xp: 70, coins: 35, modalidade: ['individual', 'dupla', 'impresso'], habilidades: ['Inferência textual', 'Identificar ideia central', 'Uso de conhecimento de mundo'], criterioAvanco: 'Realizar inferências apoiadas em evidências do texto com autonomia' },
  { id: 'por-05', title: 'Produção Textual', sub: 'Organização de parágrafos e coerência', status: 'bloqueado', xp: 80, coins: 40, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Produção de textos coerentes', 'Organização textual', 'Revisão e reescrita'], criterioAvanco: 'Produzir texto com início, meio e fim organizado e coerente' },
  { id: 'por-06', title: 'Desafio da Escrita Criativa', sub: 'Contos, crônicas e apresentações', status: 'bloqueado', xp: 100, coins: 50, modalidade: ['grupo', 'dupla', 'impresso'], habilidades: ['Criação literária', 'Narração', 'Expressão pessoal'], criterioAvanco: 'Criar um texto de gênero definido demonstrando autoria' },
];

const SCIENCE_NODES: TrailNode[] = [
  { id: 'cie-01', title: 'Ilha da Observação', sub: 'Seres vivos e seus ambientes', status: 'concluido', xp: 50, coins: 25, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Classificação de seres vivos', 'Observação científica'], criterioAvanco: 'Classificar seres vivos a partir das características observadas' },
  { id: 'cie-02', title: 'Ciclos da Água e Solo', sub: 'Transformações e ecossistemas (Missão Atual)', status: 'ativo', xp: 60, coins: 30, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Ciclo da água', 'Preservação ambiental', 'Ecossistemas'], criterioAvanco: 'Explicar o ciclo da água e sua importância para a vida' },
  { id: 'cie-03', title: 'Laboratório do Explorador', sub: 'Experimentos práticos e hipóteses', status: 'bloqueado', xp: 80, coins: 40, modalidade: ['grupo', 'impresso'], habilidades: ['Método científico', 'Formulação de hipóteses', 'Experimentação'], criterioAvanco: 'Planejar e executar experimento simples seguindo etapas científicas' },
];

const CULTURE_NODES: TrailNode[] = [
  { id: 'cul-01', title: 'Vozes do Brasil', sub: 'Literatura e diversidade cultural', status: 'ativo', xp: 55, coins: 30, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Apreciação literária', 'Identidade cultural', 'Leitura de textos literários'], criterioAvanco: 'Identificar elementos culturais em textos literários e relacionar com identidade', cultural: '🎭 Literatura, Diversidade e Memória Cultural' },
  { id: 'cul-02', title: 'Ritmos do Brasil', sub: 'Música, expressão e identidade regional', status: 'ativo', xp: 50, coins: 25, modalidade: ['individual', 'grupo'], habilidades: ['Apreciação musical', 'Diversidade regional', 'Expressão artística'], criterioAvanco: 'Reconhecer ritmos musicais brasileiros e suas origens culturais', cultural: '🎵 Música, Ritmo e Expressão Cultural' },
  { id: 'cul-03', title: 'Cidadãos do Mundo', sub: 'Direitos, responsabilidades e cidadania ativa', status: 'ativo', xp: 70, coins: 35, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Cidadania crítica', 'Direitos e responsabilidades', 'Pensamento argumentativo'], criterioAvanco: 'Identificar direitos e responsabilidades cidadãs e propor ações concretas', cultural: '🌍 Cidadania, Ética e Participação Social' },
  { id: 'cul-04', title: 'Arte que Fala', sub: 'Artes visuais e patrimônio cultural', status: 'bloqueado', xp: 65, coins: 32, modalidade: ['grupo', 'impresso'], habilidades: ['Leitura de obras de arte', 'Patrimônio cultural', 'Expressão visual'], criterioAvanco: 'Analisar obras de arte identificando elementos visuais e contexto cultural', cultural: '🎨 Arte, Criação e Patrimônio' },
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

  const currentDisc = DISCIPLINES.find(d => d.id === selectedDiscipline)!;
  const allNodes = TRAIL_DATA[selectedDiscipline];

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
      status: (idx === 0 ? 'concluido' : idx === 1 ? 'ativo' : 'bloqueado') as 'concluido' | 'ativo' | 'bloqueado',
      xp: unit.xpReward || 50,
      coins: 30,
      modalidade: ['individual'],
      habilidades: [],
      criterioAvanco: '',
      unitData: unit,
    }));

  const handleNodeClick = useCallback((node: TrailNode) => {
    // Use local nodes (with modal preview) or direct start from curriculum
    if (node.unitData) {
      onStartMission(node);
    } else {
      setStageModal(node);
    }
  }, [onStartMission]);

  const handleStartStage = useCallback(() => {
    if (stageModal) {
      setStageModal(null);
      onStartMission(stageModal);
    }
  }, [stageModal, onStartMission]);

  const handleContinueJourney = useCallback(() => {
    if (nextNode) {
      if (nextNode.unitData) {
        onStartMission(nextNode);
      } else {
        setStageModal(nextNode);
      }
    }
  }, [nextNode, onStartMission]);

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
      {/* ── World Selector ───────────────────────────────────────────── */}
      <section aria-label="Selecionar mundo">
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-2 ml-1">
          Mundos de Aprendizagem
        </p>
        <WorldSelector
          disciplines={worldData}
          selectedId={selectedDiscipline}
          onChange={(id) => {
            setSelectedDiscipline(id as Discipline);
            setActiveModalFilter('all');
          }}
        />
      </section>

      {/* ── Trail Progress Card ───────────────────────────────────────── */}
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
      />

      {/* ── Filter Bar ───────────────────────────────────────────────── */}
      {allNodes.length > 0 && (
        <div className="bg-slate-900/60 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3">
          <TrailFilterBar
            activeFilter={activeModalFilter}
            onChange={setActiveModalFilter}
            countByFilter={countByFilter}
          />
          {filteredNodes.length === 0 && (
            <p className="text-center text-xs text-white/40 mt-3 py-2">
              Nenhuma missão encontrada para este filtro. Tente "Todos".
            </p>
          )}
        </div>
      )}

      {/* ── Track Maps ───────────────────────────────────────────────── */}
      {activeTracks.length > 0 ? (
        <div className="flex flex-col gap-10">
          {activeTracks.map((track: any) => {
            const trackNodes = buildTrackNodes(track);
            return (
              <section key={track.id} aria-label={`Trilha: ${track.title}`}>
                <div className="mb-3 flex items-center gap-2">
                  <div className={`h-0.5 flex-1 bg-gradient-to-r ${currentDisc.gradient} opacity-40 rounded-full`} />
                  <h3 className="text-sm font-black text-white/80 px-2">{track.title}</h3>
                  <div className={`h-0.5 flex-1 bg-gradient-to-l ${currentDisc.gradient} opacity-40 rounded-full`} />
                </div>
                <GameWorldTrack
                  trackId={track.id}
                  nodes={trackNodes as any}
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
        <div className="bg-purple-900/40 border border-purple-400/25 rounded-2xl p-5 backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-md shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-purple-200 mb-1">Trilha Cultural: Formação Humana Integral</h3>
              <p className="text-xs text-purple-300/80 leading-relaxed">
                O Mundo da Cultura vai além dos conteúdos escolares. Aqui, o estudante amplia seu repertório cultural, desenvolve pensamento crítico, conhece a diversidade do Brasil e se forma como sujeito participativo.
              </p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['Literatura', 'Música', 'Arte', 'Teatro', 'Cidadania', 'Diversidade', 'Patrimônio'].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/20 font-bold">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Print missions banner (preserved) ────────────────────────── */}
      <div className="flex items-center gap-3 bg-orange-900/30 border border-orange-400/20 rounded-2xl p-4 backdrop-blur-sm">
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
      {stageModal && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="stage-modal-title"
          onClick={() => setStageModal(null)}
        >
          <div
            className="bg-slate-900 border border-white/15 rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl relative overflow-hidden animate-trail-enter"
            onClick={e => e.stopPropagation()}
          >
            {/* Gradient top accent */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${currentDisc.gradient}`} />

            {/* Close */}
            <button
              onClick={() => setStageModal(null)}
              className="trail-focus absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white flex items-center justify-center transition border border-white/10"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Badges row */}
            <div className="flex items-center gap-2 mb-4 flex-wrap pr-8">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white/60 px-2.5 py-0.5 rounded-full border border-white/10">
                {currentDisc.label}
              </span>
              <span className="text-[10px] font-bold text-yellow-300 bg-yellow-400/15 px-2.5 py-0.5 rounded-full border border-yellow-400/20 flex items-center gap-1">
                <Star className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                +{stageModal.xp} XP
              </span>
              <span className="text-[10px] font-bold text-amber-300 bg-amber-400/15 px-2.5 py-0.5 rounded-full border border-amber-400/20 flex items-center gap-1">
                <Coins className="w-2.5 h-2.5 text-amber-400" />
                {stageModal.coins} moedas
              </span>
            </div>

            {/* Title + icon */}
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0 ${
                stageModal.status === 'concluido' ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950'
                : stageModal.status === 'ativo' ? `bg-gradient-to-r ${currentDisc.gradient} text-white`
                : 'bg-slate-700 text-slate-400'
              }`}>
                {stageModal.status === 'concluido' ? <Check className="w-7 h-7 stroke-[3]" />
                  : stageModal.status === 'ativo' ? <Play className="w-7 h-7 fill-white" />
                  : <Lock className="w-6 h-6" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-1 mb-1">
                  {stageModal.modalidade.map((mod: any) => (
                    <span key={mod} className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-white/10 text-white/50 border border-white/10 flex items-center gap-1">
                      {mod === 'individual' ? <User className="w-2.5 h-2.5" /> : mod === 'impresso' ? <Printer className="w-2.5 h-2.5" /> : <Users className="w-2.5 h-2.5" />}
                      {mod}
                    </span>
                  ))}
                </div>
                <h3 id="stage-modal-title" className="font-black text-lg text-white leading-tight">
                  {stageModal.title}
                </h3>
              </div>
            </div>

            {/* Objective */}
            <div className="bg-amber-400/10 p-3.5 rounded-xl border border-amber-400/20 mb-3">
              <div className="text-[10px] font-bold text-amber-400/70 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Target className="w-3 h-3" /> Objetivo da Fase
              </div>
              <p className="text-sm text-white/80 leading-relaxed">{stageModal.sub}</p>
            </div>

            {/* Criteria */}
            {stageModal.criterioAvanco && (
              <div className="bg-white/5 p-3 rounded-xl border border-white/10 mb-4">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> Critério de Avanço
                </div>
                <p className="text-xs text-white/60 leading-relaxed">{stageModal.criterioAvanco}</p>
              </div>
            )}

            {/* Skills */}
            {stageModal.habilidades.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {stageModal.habilidades.map(h => (
                  <span key={h} className="text-[10px] px-2 py-0.5 rounded-full bg-white/8 text-white/50 border border-white/10 font-medium">
                    {h}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            {stageModal.status !== 'bloqueado' ? (
              <button
                onClick={handleStartStage}
                className={`trail-focus w-full py-3.5 px-6 rounded-2xl text-white font-black text-base flex items-center justify-center gap-2 shadow-xl transition active:scale-95 bg-gradient-to-r ${
                  stageModal.status === 'concluido'
                    ? 'from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400'
                    : `${currentDisc.gradient} hover:opacity-90`
                }`}
                aria-label={stageModal.status === 'concluido' ? `Jogar novamente: ${stageModal.title}` : `Começar fase: ${stageModal.title}`}
              >
                <Play className="w-5 h-5 fill-white" />
                {stageModal.status === 'concluido' ? 'JOGAR NOVAMENTE' : 'COMEÇAR FASE AGORA'}
              </button>
            ) : (
              <div className="bg-slate-800 p-4 rounded-2xl border border-white/10 text-center space-y-2" role="alert">
                <div className="flex items-center justify-center gap-1.5 text-sm font-bold text-white/50">
                  <Lock className="w-4 h-4 text-slate-400" />
                  <span>Esta fase está bloqueada</span>
                </div>
                <p className="text-xs text-white/35">
                  Conclua as fases anteriores para liberar esta missão!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </TrailGameShell>
  );
};
