import React, { useState } from 'react';
import {
  ShoppingBag,
  Star,
  Clock,
  Gift,
  BookOpen,
  Palette,
  Music,
  Zap,
  Info
} from 'lucide-react';
import { Student } from '../types';

type Category = 'all' | 'escola' | 'experiencias' | 'digitais' | 'cultura';
type RewardAvailability = 'disponivel' | 'esgotado' | 'reservado';

export interface LojaReward {
  id: string;
  name: string;
  desc: string;
  cost: number;
  category: Exclude<Category, 'all'>;
  availability: RewardAvailability;
  popular?: boolean;
  note?: string;
}

interface LojaMoedasViewProps {
  student: Student;
  rewards?: LojaReward[];
  loading?: boolean;
  error?: string | null;
  onRedeem?: (rewardId: string) => Promise<number>;
}

const ShinyCoin: React.FC<{ size?: 'xs' | 'sm' | 'md' | 'lg' | 'tv', className?: string }> = ({ size = 'md', className = '' }) => {
  const sizeMap = { xs: 'w-3 h-3', sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6', tv: 'w-8 h-8' };
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 select-none ${sizeMap[size]} ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-xs">
        <circle cx="12" cy="12" r="11" fill="url(#blueCoinOuter)" />
        <circle cx="12" cy="12" r="9.5" fill="url(#blueCoinBody)" />
        <circle cx="12" cy="12" r="7.5" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.85" fill="none" />
        <path d="M12 6.5L13.5 10.2H17.5L14.2 12.6L15.4 16.5L12 14.1L8.6 16.5L9.8 12.6L6.5 10.2H10.5L12 6.5Z" fill="#FFFFFF" fillOpacity="0.95" />
        <defs>
          <linearGradient id="blueCoinOuter" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#123cc4" /><stop offset="0.5" stopColor="#0e2fb2" /><stop offset="1" stopColor="#05148d" />
          </linearGradient>
          <linearGradient id="blueCoinBody" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#123cc4" /><stop offset="0.4" stopColor="#09219f" /><stop offset="1" stopColor="#00067a" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const CATEGORY_TABS: { id: Category; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'Todos', icon: ShoppingBag },
  { id: 'escola', label: 'Materiais', icon: BookOpen },
  { id: 'experiencias', label: 'Experiências', icon: Gift },
  { id: 'digitais', label: 'Digital', icon: Zap },
  { id: 'cultura', label: 'Cultura', icon: Palette },
];

const categoryIcon: Record<LojaReward['category'], React.ComponentType<{ className?: string }>> = {
  escola: Palette,
  experiencias: Gift,
  digitais: Zap,
  cultura: Music,
};

export const LojaMoedasView: React.FC<LojaMoedasViewProps> = ({
  student,
  rewards = [],
  loading = false,
  error = null,
  onRedeem,
}) => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [pendingReward, setPendingReward] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const studentCoins = typeof student?.coins === 'number' && Number.isFinite(student.coins) ? student.coins : null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredItems = activeCategory === 'all' ? rewards : rewards.filter(item => item.category === activeCategory);
  const categoryTotal = (category: Category) => rewards.filter(item =>
    item.availability === 'disponivel' && (category === 'all' || item.category === category)
  ).length;

  const handleRedeem = async (item: LojaReward) => {
    if (!onRedeem || pendingReward || item.availability !== 'disponivel') return;
    setPendingReward(item.id);
    try {
      const remainingCoins = await onRedeem(item.id);
      showToast(`Resgate confirmado. Saldo restante: ${remainingCoins} moedas.`);
    } catch {
      showToast('Não foi possível confirmar o resgate. Tente novamente.');
    } finally {
      setPendingReward(null);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#00067a] border border-[#123cc4]/50 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-2 max-w-xs">
          <ShinyCoin size="sm" /><span>{toastMessage}</span>
        </div>
      )}

      <div className="bg-white/85 backdrop-blur-xl border border-white/90 shadow-md p-5 sm:p-6 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-black text-[#123cc4] uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />Loja de Recompensas
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">Troque suas Moedas!</h1>
            <p className="text-xs text-slate-500 font-bold leading-relaxed mt-1 max-w-lg">
              Cada moeda representa uma conquista real de aprendizagem. Troque por recompensas reais ou experiências especiais.
            </p>
          </div>
          {studentCoins !== null && (
            <div className="flex flex-col items-center sm:items-end gap-2">
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-tr from-[#123cc4] to-[#05148d] shadow-lg text-white">
                <ShinyCoin size="lg" />
                <div>
                  <div className="text-2xl font-black leading-tight">{studentCoins}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#123cc4] mix-blend-screen opacity-90">Suas Moedas</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#123cc4]/5 border border-[#123cc4]/20">
        <Info className="w-5 h-5 text-[#123cc4] shrink-0 mt-0.5" />
        <div className="text-xs text-[#0e2fb2] leading-relaxed font-bold">
          <strong>Como funciona:</strong> Escolha uma recompensa disponível e solicite o resgate. A confirmação depende da resposta do sistema.
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORY_TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveCategory(tab.id)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 border ${activeCategory === tab.id ? 'bg-[#123cc4] text-white border-[#123cc4]/50 shadow-sm scale-102' : 'bg-white/90 text-slate-700 hover:text-[#123cc4] border-white/90 hover:bg-white shadow-2xs'}`}>
            <tab.icon className="w-4 h-4" /><span>{tab.label}</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${activeCategory === tab.id ? 'bg-white/20' : 'bg-slate-200 text-slate-600'}`}>{categoryTotal(tab.id)}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="p-8 text-center rounded-2xl bg-white/85 border border-slate-100 text-sm font-bold text-slate-500">Carregando recompensas…</div>
      ) : error ? (
        <div role="alert" className="p-8 text-center rounded-2xl bg-white/85 border border-rose-200 text-sm font-bold text-rose-700">Não foi possível carregar as recompensas. {error}</div>
      ) : filteredItems.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-white/85 border border-slate-100 text-sm font-bold text-slate-500">Nenhuma recompensa disponível nesta categoria.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          {filteredItems.map(item => {
            const canAfford = studentCoins !== null && studentCoins >= item.cost;
            const isPending = pendingReward === item.id;
            const Icon = categoryIcon[item.category];
            return (
              <div key={item.id} className={`relative flex flex-col h-full rounded-2xl border transition-all overflow-hidden group ${item.availability === 'esgotado' ? 'border-slate-200 bg-slate-50/50 opacity-70' : item.availability === 'reservado' ? 'border-[#123cc4]/20 bg-[#123cc4]/5' : canAfford ? 'border-slate-200 bg-white/90 backdrop-blur-xl hover:border-[#123cc4]/30 hover:shadow-lg hover:shadow-[#123cc4]/5 hover:-translate-y-0.5' : 'border-slate-200 bg-white/60 backdrop-blur-sm opacity-90'}`}>
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
                  {item.popular && <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#123cc4] to-[#05148d] text-white text-[8px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 w-fit"><Star className="w-2.5 h-2.5 fill-white" /> Destaque</div>}
                  {item.availability === 'esgotado' && <div className="px-2 py-0.5 rounded-full bg-slate-500 text-white text-[8px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 w-fit"><Clock className="w-2.5 h-2.5" /> Esgotado</div>}
                  {item.availability === 'reservado' && <div className="px-2 py-0.5 rounded-full bg-[#123cc4] text-white text-[8px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 w-fit"><Clock className="w-2.5 h-2.5" /> Reservado</div>}
                </div>
                <div className="w-full h-24 sm:h-28 bg-gradient-to-br from-[#123cc4]/5 to-[#05148d]/5 flex items-center justify-center border-b border-slate-100 relative shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-[#123cc4]/10 group-hover:scale-110 transition-transform duration-300"><Icon className="w-6 h-6 text-[#123cc4]" /></div>
                </div>
                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  <div className="flex-1">
                    <h3 className="text-sm font-black text-slate-800 leading-tight line-clamp-1 mb-1">{item.name}</h3>
                    <p className="text-[10px] text-slate-500 font-medium leading-relaxed line-clamp-2 mb-3">{item.desc}</p>
                    {item.note && <div className="inline-flex items-center gap-1 text-[8px] text-[#0e2fb2] font-bold uppercase bg-[#123cc4]/5 px-2 py-1 rounded-lg border border-[#123cc4]/10 max-w-full"><Info className="w-2.5 h-2.5 shrink-0" /><span className="truncate">{item.note}</span></div>}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1"><ShinyCoin size="xs" /><span className={`text-sm sm:text-base font-black ${canAfford ? 'text-[#00067a]' : 'text-slate-400'}`}>{item.cost}</span></div>
                    {item.availability !== 'disponivel' ? (
                      <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-[9px] font-black uppercase flex items-center gap-1"><Clock className="w-3 h-3" />Indisponível</div>
                    ) : (
                      <button onClick={() => void handleRedeem(item)} disabled={!onRedeem || !canAfford || !!pendingReward}
                        className={`px-3 sm:px-4 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 ${onRedeem && canAfford && !pendingReward ? 'bg-[#123cc4] text-white hover:bg-[#0e2fb2] active:scale-95' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                        {isPending ? 'Aguarde…' : canAfford ? 'Resgatar' : studentCoins === null ? 'Saldo indisponível' : `- ${item.cost - studentCoins} Moedas`}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
