import React from 'react';
import { X, Trophy, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { AchievementItem } from '../types';

interface AchievementsModalProps {
  achievements: AchievementItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  achievements,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        <div className="bg-amber-50/70 px-6 py-4 border-b border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">Mural de Conquistas</div>
              <h3 className="text-base font-black text-slate-900">Reconhecimento de Evolução e Persistência</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white border border-amber-200 text-slate-500 hover:text-slate-900 cursor-pointer shadow-xs">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all ${
                  ach.unlocked
                    ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                  ach.unlocked ? 'bg-amber-100 text-amber-700 border border-amber-300' : 'bg-slate-200 text-slate-400 border border-slate-300'
                }`}>
                  {ach.unlocked ? <Sparkles className="w-5 h-5 text-amber-600" /> : <Lock className="w-5 h-5" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{ach.title}</h4>
                    <span className="text-[10px] font-bold text-amber-700">+{ach.xpReward} XP</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{ach.description}</p>
                  <div className="mt-2 text-[10px] font-semibold text-emerald-700 flex items-center gap-1">
                    {ach.unlocked ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Desbloqueada {ach.unlockedAt ? `• ${ach.unlockedAt}` : ''}</span>
                      </>
                    ) : (
                      <span className="text-slate-400">Bloqueada</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer shadow-xs"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
