import React, { useState } from 'react';
import { 
  CheckCircle,
  Lock, 
  Star, 
  Trophy, 
  Play, 
  Crown, 
  Sparkles, 
  Compass, 
  Gift, 
  Flame,
  X,
  TreePine,
  Trees,
  Sprout,
  Tent,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface TrailNode {
  id: string;
  title: string;
  sub: string;
  status: 'concluido' | 'ativo' | 'bloqueado';
  xp: number;
  coins: number;
  modalidade: string[];
  habilidades: string[];
  criterioAvanco: string;
  cultural?: string;
}

interface GameWorldTrackProps {
  trackId: string;
  nodes: TrailNode[];
  onNodeClick: (node: TrailNode) => void;
  onRewardBonusXp?: (amount: number, reason: string) => void;
}

interface ChestModalData {
  title: string;
  fact: string;
  xp: number;
}

export const GameWorldTrack: React.FC<GameWorldTrackProps> = ({
  trackId,
  nodes,
  onNodeClick,
  onRewardBonusXp
}) => {
  const [openedChests, setOpenedChests] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`trilha_chests_${trackId}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [chestModal, setChestModal] = useState<ChestModalData | null>(null);

  const trackCompleted = nodes.every(n => n.status === 'concluido');

  // Geometry configuration
  const SVG_WIDTH = 440;
  const START_Y = 70;
  const STEP_Y = 140;

  // Calculate coordinates for all units
  const nodePositions = nodes.map((node, idx) => {
    const cycle = idx % 4;
    let x = 220;
    if (cycle === 1) x = 325; // curve right
    else if (cycle === 3) x = 115; // curve left

    const y = START_Y + idx * STEP_Y;
    return { x, y, node, idx };
  });

  // Boss coordinate / End coordinate (Stops exactly at the last node)
  const endY = nodes.length > 0 ? START_Y + (nodes.length - 1) * STEP_Y : START_Y;
  const totalSvgHeight = endY + 80;

  // Build segments
  const allPoints = [...nodePositions.map(n => ({ x: n.x, y: n.y }))];

  const segments: { d: string; isLocked: boolean }[] = [];
  for (let i = 0; i < allPoints.length - 1; i++) {
    const p0 = allPoints[i];
    const p1 = allPoints[i + 1];
    const dy = p1.y - p0.y;
    const cp1X = p0.x;
    const cp1Y = p0.y + dy * 0.52;
    const cp2X = p1.x;
    const cp2Y = p1.y - dy * 0.48;
    const d = `M ${p0.x} ${p0.y} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${p1.x} ${p1.y}`;
    
    const targetNode = nodes[i + 1];
    const isLocked = targetNode?.status === 'bloqueado';
    
    segments.push({ d, isLocked });
  }

  // Interactive Treasure Chest handler
  const handleOpenChest = (chestId: string, fact: string) => {
    if (openedChests.includes(chestId)) {
      setChestModal({
        title: 'Baú já Conquistado!',
        fact: fact,
        xp: 0
      });
      return;
    }

    // Mocking sound playback here to avoid breaking without audio files
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 }
    });

    const nextOpened = [...openedChests, chestId];
    setOpenedChests(nextOpened);
    try {
      localStorage.setItem(`trilha_chests_${trackId}`, JSON.stringify(nextOpened));
    } catch {
      // ignore
    }

    if (onRewardBonusXp) {
      onRewardBonusXp(15, `Baú da Trilha ${trackId}`);
    }

    setChestModal({
      title: 'Tesouro Encontrado!',
      fact: fact,
      xp: 15
    });
  };

  // Educational curiosities for chests
  const getChestFact = (index: number) => {
    const facts = [
      'Você sabia? No sistema de numeração decimal, o número zero (0) foi uma invenção revolucionária que facilitou todas as contas modernas!',
      'Dica: Sempre confira se a soma das partes é igual ao todo antes de partir para a próxima fase!',
      'Curiosidade: Os algarismos que usamos (0 a 9) são chamados de indo-arábicos porque foram criados na Índia e difundidos pelos árabes!'
    ];
    return facts[index % facts.length];
  };

  return (
    <div className="relative w-full max-w-[460px] mx-auto select-none">
      {/* Background Ambience / Biome Grass Texture */}
      <div 
        className="relative w-full rounded-3xl overflow-hidden py-4 px-2"
        style={{ minHeight: `${totalSvgHeight}px` }}
      >
        {/* SVG Road Layer */}
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${totalSvgHeight}`}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Road drop shadow filter */}
            <filter id={`road-shadow-${trackId}`} x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#78350f" floodOpacity="0.22" />
            </filter>

            {/* Golden cobblestone gradient for active track */}
            <linearGradient id={`gold-road-${trackId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>

            {/* Gray gradient for locked track */}
            <linearGradient id={`gray-road-${trackId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>

          {/* Render Path Segments */}
          {segments.map((seg, i) => (
            <React.Fragment key={`seg-${i}`}>
              {/* 1. Road Deep Ground Shadow */}
              <path
                d={seg.d}
                fill="none"
                stroke={seg.isLocked ? '#475569' : '#b45309'}
                strokeWidth="52"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.25"
                filter={`url(#road-shadow-${trackId})`}
              />

              {/* 2. Road Earth / Curb Bedding */}
              <path
                d={seg.d}
                fill="none"
                stroke={seg.isLocked ? '#64748b' : '#d97706'}
                strokeWidth="42"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 3. Road Inner Walking Surface */}
              <path
                d={seg.d}
                fill="none"
                stroke={`url(#${seg.isLocked ? 'gray' : 'gold'}-road-${trackId})`}
                strokeWidth="32"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 4. Cobblestone Stepping Stones Centerline */}
              <path
                d={seg.d}
                fill="none"
                stroke={seg.isLocked ? '#475569' : '#b45309'}
                strokeWidth="6"
                strokeDasharray="12 16"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.8"
              />
            </React.Fragment>
          ))}
        </svg>

        {/* Decorative Scenery Elements Placed at Road Bends */}
        {nodePositions.map((pos, i) => {
          const isRight = pos.x > 220;
          const isLeft = pos.x < 220;
          const chestId = `chest_${trackId}_${i}`;
          const isChestOpened = openedChests.includes(chestId);

          return (
            <React.Fragment key={`decor-${i}`}>
              {/* If node curves right, place scenery on the left */}
              {isRight && (
                <div
                  className="absolute z-10 pointer-events-auto flex items-center gap-2"
                  style={{
                    left: '8%',
                    top: `${pos.y - 25}px`,
                  }}
                >
                  {/* Alternating: Treasure Chest or Campfire/Trees */}
                  {i % 2 !== 0 ? (
                    <button
                      onClick={() => handleOpenChest(chestId, getChestFact(i))}
                      className="group flex flex-col items-center cursor-pointer transition transform hover:scale-110 active:scale-95"
                      title="Baú Secreto da Trilha! Clique para abrir"
                    >
                      <div className={`relative p-2.5 rounded-2xl border-2 shadow-md transition-all ${
                        isChestOpened
                          ? 'bg-amber-100 border-amber-300 text-amber-600'
                          : 'bg-gradient-to-tr from-amber-400 to-yellow-300 border-amber-500 text-amber-950 animate-pulse'
                      }`}>
                        <Gift className="w-6 h-6 fill-current drop-shadow-xs" />
                        {!isChestOpened && (
                          <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-white">
                            +XP
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-amber-900 mt-1 bg-white/90 px-2 py-0.5 rounded-full border border-amber-200 shadow-2xs flex items-center gap-1">
                        {isChestOpened ? (
                          <>
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            <span>Conquistado</span>
                          </>
                        ) : (
                          <span>Baú Mágico</span>
                        )}
                      </span>
                    </button>
                  ) : (
                    <div className="flex items-end gap-1.5 opacity-90 select-none bg-emerald-50/80 p-1.5 rounded-2xl border border-emerald-200/70 shadow-xs backdrop-blur-xs">
                      <div className="flex flex-col items-center">
                        <TreePine className="w-6 h-6 text-emerald-700 fill-emerald-600/30" />
                      </div>
                      <div className="flex flex-col items-center -ml-1">
                        <Trees className="w-6 h-6 text-emerald-800 fill-emerald-700/30" />
                      </div>
                      <Sprout className="w-4 h-4 text-emerald-600" />
                    </div>
                  )}
                </div>
              )}

              {/* If node curves left, place scenery on the right */}
              {isLeft && (
                <div
                  className="absolute z-10 pointer-events-auto flex items-center gap-2"
                  style={{
                    right: '8%',
                    top: `${pos.y - 25}px`,
                  }}
                >
                  <div className="flex items-center gap-2 bg-amber-50/90 px-2.5 py-1.5 rounded-2xl border border-amber-200/90 shadow-xs">
                    <div className="flex flex-col items-center">
                      <Flame className="w-4 h-4 text-amber-500 fill-amber-400 animate-pulse" />
                      <span className="text-[9px] font-bold text-amber-900 uppercase">
                        Descanso
                      </span>
                    </div>
                    <Tent className="w-5 h-5 text-amber-800" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* =================================================================== */}
        {/* INTERACTIVE LEVEL NODES */}
        {/* =================================================================== */}
        {nodePositions.map(({ x, y, node, idx }) => {
          const isDone = node.status === 'concluido';
          const isCurrent = node.status === 'ativo';
          const leftPercent = (x / SVG_WIDTH) * 100;

          return (
            <div
              key={node.id}
              className="absolute z-20 flex flex-col items-center"
              style={{
                left: `${leftPercent}%`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Player Avatar Pin (If active on this node) */}
              {isCurrent && (
                <div className="absolute -top-14 z-40 flex flex-col items-center animate-bounce pointer-events-none">
                  {/* Active Speech Tag */}
                  <div className="bg-emerald-600 text-white px-3 py-1 rounded-full shadow-lg border-2 border-white text-xs font-bold whitespace-nowrap flex items-center gap-1.5 ring-3 ring-emerald-300">
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>SUA VEZ!</span>
                  </div>
                  <div className="w-2.5 h-2.5 bg-emerald-600 rotate-45 -mt-1 border-r-2 border-b-2 border-white"></div>

                  {/* Cute Student / Explorer Pin Face */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 border-2 border-white shadow-md flex items-center justify-center text-white -mt-1 ring-2 ring-emerald-400">
                    <GraduationCap className="w-5 h-5 drop-shadow-xs" />
                  </div>

                  {/* Soft Shadow on the ground */}
                  <div className="w-8 h-2 rounded-full bg-slate-900/30 blur-[1px] mt-0.5"></div>
                </div>
              )}

              {/* 3D Round Arcade Node Pedestal */}
              <button
                onClick={() => onNodeClick(node)}
                className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full flex flex-col items-center justify-center relative cursor-pointer transition-all ${
                  isDone
                    ? 'bg-gradient-to-b from-amber-200 to-amber-300 text-amber-950 hover:scale-105 border-b-4 border-amber-500'
                    : isCurrent
                    ? 'bg-gradient-to-b from-emerald-400 to-emerald-500 text-white hover:scale-105 ring-4 ring-emerald-300 border-b-4 border-emerald-700'
                    : 'bg-slate-200 text-slate-400 hover:scale-100 border-b-4 border-slate-300'
                }`}
                title={`${node.title}`}
              >
                {/* Upper 3D Glass Highlights */}
                <div className="absolute top-2 left-3 right-3 h-3 rounded-full bg-white/40 pointer-events-none"></div>

                {isDone ? (
                  <div className="flex flex-col items-center pointer-events-none">
                    <Crown className="w-8 h-8 text-amber-950 fill-amber-400 drop-shadow-xs" />
                    <span className="text-[10px] font-bold text-amber-950 tracking-wider uppercase -mt-0.5">
                      Fase {idx + 1}
                    </span>
                  </div>
                ) : isCurrent ? (
                  <div className="flex flex-col items-center pointer-events-none">
                    <Star className="w-8 h-8 fill-white text-white drop-shadow-md animate-pulse" />
                    <span className="text-[10px] font-bold text-white tracking-wider uppercase -mt-0.5">
                      Fase {idx + 1}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center opacity-70 pointer-events-none">
                    <Lock className="w-6 h-6 text-slate-500 mb-0.5" />
                    <span className="text-[9px] font-bold text-slate-500 uppercase">
                      Fase {idx + 1}
                    </span>
                  </div>
                )}

                {/* 3 Golden Stars pill below completed node */}
                {isDone && (
                  <div className="absolute -bottom-2 bg-white px-2 py-0.5 rounded-full border-2 border-amber-400 shadow-md flex items-center gap-0.5 z-20 pointer-events-none">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                  </div>
                )}
              </button>

              {/* Compact Name Pill below the button */}
              <div 
                onClick={() => onNodeClick(node)}
                className="mt-2 text-center max-w-[130px] sm:max-w-[145px] cursor-pointer group"
              >
                <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs truncate max-w-full transition group-hover:scale-105 ${
                  isDone 
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : isCurrent
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300 ring-2 ring-emerald-200'
                    : 'bg-white/90 text-slate-500 border-slate-200'
                }`}>
                  {node.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* TREASURE CHEST SECRET MODAL */}
      {/* =================================================================== */}
      {chestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border-4 border-amber-500 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setChestModal(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition active:scale-90 z-20 border border-slate-200"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center shadow-md border-2 border-amber-500 text-amber-950">
                <Gift className="w-8 h-8 fill-amber-500 text-amber-950" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {chestModal.title}
                </h3>
                {chestModal.xp > 0 && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    +{chestModal.xp} XP Adicionados ao Perfil!
                  </span>
                )}
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 mb-5">
              <div className="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-amber-700" />
                Dica de Ouro:
              </div>
              <p className="text-sm text-slate-700 font-sans leading-relaxed">
                {chestModal.fact}
              </p>
            </div>

            <button
              onClick={() => setChestModal(null)}
              className="w-full py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md transition active:scale-95 border-b-4 border-amber-700 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-200 fill-amber-200" />
              <span>Continuar a Jornada!</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
