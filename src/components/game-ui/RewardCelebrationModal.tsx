import React, { useEffect } from 'react';
import { Sparkles, Trophy, ArrowRight, Award, CheckCircle2, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GameButton, RarityBadge } from './GameComponents';
import { CardItem } from '../../types';

interface RewardCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  missionTitle: string;
  xpEarned: number;
  coinsEarned: number;
  cardUnlocked?: CardItem;
}

export const RewardCelebrationModal: React.FC<RewardCelebrationModalProps> = ({
  isOpen,
  onClose,
  missionTitle,
  xpEarned,
  coinsEarned,
  cardUnlocked,
}) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border-2 border-emerald-300 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col my-auto text-center relative">
        {/* Header with Emerald Celebration */}
        <div className="bg-gradient-to-b from-emerald-600 via-teal-600 to-emerald-700 pt-7 pb-10 px-6 text-white relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-100 text-xs font-black uppercase tracking-widest mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>Missão Cumprida com Sucesso!</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white drop-shadow-sm font-display">
            RECOMPENSA DE EXPLORADOR
          </h2>
          <p className="text-xs text-emerald-100 mt-1 font-medium line-clamp-1">
            {missionTitle}
          </p>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-300 border-4 border-white shadow-xl flex items-center justify-center text-white">
            <Award className="w-8 h-8 text-emerald-950" />
          </div>
        </div>

        {/* Content Body */}
        <div className="pt-12 pb-6 px-6 space-y-4">
          {/* Rewards Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col items-center">
              <div className="text-xs font-bold text-amber-700 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Experiência</span>
              </div>
              <div className="text-2xl font-black text-amber-950 mt-0.5">
                +{xpEarned} <span className="text-xs font-bold text-amber-600">XP</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-yellow-50 border border-yellow-300 flex flex-col items-center">
              <div className="text-xs font-bold text-amber-700 uppercase flex items-center gap-1">
                <span>🪙 Moedas</span>
              </div>
              <div className="text-2xl font-black text-amber-950 mt-0.5">
                +{coinsEarned} <span className="text-xs font-bold text-amber-600">Coins</span>
              </div>
            </div>
          </div>

          {/* Card Unlocked Highlight if present */}
          {cardUnlocked && (
            <div className="p-4 rounded-2xl bg-purple-50/90 border border-purple-300 text-left space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-purple-900 uppercase tracking-wider flex items-center gap-1">
                  <Star className="w-3 h-3 text-purple-600 fill-purple-600" />
                  <span>Novo Card Colecionável Desbloqueado!</span>
                </span>
                <RarityBadge rarity={cardUnlocked.rarity} size="sm" />
              </div>

              <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-purple-200">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-xl shrink-0 font-black text-purple-700">
                  {cardUnlocked.icon}
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">{cardUnlocked.name}</div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{cardUnlocked.description}</p>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2">
            <GameButton
              variant="success"
              size="lg"
              onClick={onClose}
              className="w-full justify-center shadow-lg shadow-emerald-600/30"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Coletar & Voltar à Sala
            </GameButton>
          </div>
        </div>
      </div>
    </div>
  );
};
