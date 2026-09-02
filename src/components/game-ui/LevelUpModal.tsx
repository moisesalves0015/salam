import React, { useEffect } from 'react';
import { Sparkles, Trophy, Zap, ArrowRight, Award, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GameButton } from './GameComponents';

interface LevelUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  newLevel: number;
  studentName: string;
  unlockedTitle?: string;
  bonusCoins?: number;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  isOpen,
  onClose,
  newLevel,
  studentName,
  unlockedTitle = 'Guardião do Conhecimento Avançado',
  bonusCoins = 100,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      const timer = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border-2 border-purple-300 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col my-auto text-center relative">
        {/* Glow Header Banner */}
        <div className="bg-gradient-to-b from-purple-600 via-indigo-600 to-purple-700 pt-8 pb-12 px-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-300/30 via-transparent to-transparent" />
          
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-black uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Evolução de Aprendizagem</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white drop-shadow-sm font-display">
              LEVEL UP!
            </h2>
            <p className="text-xs text-purple-100 font-medium">
              Parabéns, <strong className="text-white">{studentName}</strong>! Sua persistência deu frutos.
            </p>
          </div>

          {/* Level Emblem Badge */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-4 border-white shadow-xl flex flex-col items-center justify-center text-amber-950 font-black">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-900 -mb-1">NÍVEL</span>
            <span className="text-3xl leading-none font-black">{newLevel}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="pt-14 pb-6 px-6 space-y-4">
          <div className="bg-purple-50/80 border border-purple-200 p-4 rounded-2xl space-y-2">
            <div className="text-xs font-bold text-purple-900 flex items-center justify-center gap-1.5">
              <Trophy className="w-4 h-4 text-purple-600" />
              <span>Novo Título Conquistado:</span>
            </div>
            <div className="text-sm font-black text-slate-800 bg-white py-1.5 px-3 rounded-xl border border-purple-200 shadow-2xs">
              ⭐ {unlockedTitle}
            </div>
          </div>

          {/* Unlocked Bonuses */}
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="text-[10px] font-bold text-amber-700 uppercase">Bônus de Ouro</div>
              <div className="text-base font-black text-amber-950 mt-0.5 flex items-center gap-1">
                <span>+{bonusCoins}</span>
                <span className="text-xs">🪙 Moedas</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
              <div className="text-[10px] font-bold text-emerald-700 uppercase">Novos Desafios</div>
              <div className="text-base font-black text-emerald-950 mt-0.5 flex items-center gap-1">
                <span>Missões Nív. {newLevel}</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <GameButton
              variant="primary"
              size="lg"
              onClick={onClose}
              className="w-full justify-center shadow-lg shadow-indigo-600/30"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Continuar Aventura
            </GameButton>
          </div>
        </div>
      </div>
    </div>
  );
};
