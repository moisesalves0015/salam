import React, { useState } from 'react';
import {
  ShoppingBag,
  Star,
  Coins,
  CheckCircle2,
  Clock,
  Gift,
  Trophy,
  BookOpen,
  Palette,
  Music,
  Zap,
  Filter,
  Printer,
  Info,
  Sparkles
} from 'lucide-react';
import { Student } from '../types';

interface LojaMoedasViewProps {
  student: Student;
}

type Category = 'all' | 'escola' | 'experiencias' | 'digitais' | 'cultura';

interface StoreItem {
  id: string;
  name: string;
  desc: string;
  cost: number;
  category: Category;
  icon: React.ComponentType<{ className?: string }>;
  emoji: string;
  availability: 'disponivel' | 'esgotado' | 'reservado';
  popular?: boolean;
  note?: string;
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
            <stop stopColor="#123cc4" />
            <stop offset="0.5" stopColor="#0e2fb2" />
            <stop offset="1" stopColor="#05148d" />
          </linearGradient>
          <linearGradient id="blueCoinBody" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#123cc4" />
            <stop offset="0.4" stopColor="#09219f" />
            <stop offset="1" stopColor="#00067a" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const STORE_ITEMS: StoreItem[] = [
  // Escola
  { id: 'lapis', name: 'Kit de Lápis Coloridos', desc: 'Conjunto de 12 lápis de cor para suas criações artísticas', cost: 50, category: 'escola', icon: Palette, emoji: '✏️', availability: 'disponivel', popular: true },
  { id: 'caderno', name: 'Caderno de Aventuras', desc: 'Caderno especial da Sala de Missões com capa personalizada', cost: 80, category: 'escola', icon: BookOpen, emoji: '📓', availability: 'disponivel' },
  { id: 'estojo', name: 'Estojo do Explorador', desc: 'Estojo exclusivo com o emblema da Sala de Missões', cost: 120, category: 'escola', icon: Star, emoji: '🎒', availability: 'esgotado', note: 'Disponível em 2 semanas' },
  { id: 'borracha', name: 'Borracha Mágica', desc: 'Kit com 3 borrachas em formato de animais', cost: 30, category: 'escola', icon: Sparkles, emoji: '🐱', availability: 'disponivel' },
  { id: 'regua', name: 'Régua Decorada', desc: 'Régua 30cm com motivos da Sala de Missões', cost: 25, category: 'escola', icon: Star, emoji: '📏', availability: 'disponivel' },

  // Experiências
  { id: 'almoco', name: 'Almoço Especial do Mês', desc: 'Um prato preferido no cardápio do refeitório por um dia', cost: 100, category: 'experiencias', icon: Gift, emoji: '🍽️', availability: 'disponivel', popular: true, note: 'Sujeito à disponibilidade da cozinha' },
  { id: 'biblioteca', name: 'Visita Guiada à Biblioteca', desc: 'Tour especial pela biblioteca com o bibliotecário e escolha de livros', cost: 60, category: 'experiencias', icon: BookOpen, emoji: '📚', availability: 'disponivel' },
  { id: 'professor', name: 'Sessão de Jogo com o Professor', desc: '15 minutos de jogo livre com o professor da turma', cost: 150, category: 'experiencias', icon: Trophy, emoji: '🎮', availability: 'disponivel', popular: true },
  { id: 'plantio', name: 'Hortinha da Escola', desc: 'Cultivar sua própria planta na horta da escola', cost: 80, category: 'experiencias', icon: Sparkles, emoji: '🌱', availability: 'disponivel' },
  { id: 'recreio', name: 'Recreio Estendido', desc: '10 minutos extras de recreio em data combinada', cost: 200, category: 'experiencias', icon: Zap, emoji: '⏰', availability: 'disponivel', note: 'Precisa de aprovação da coordenação' },

  // Digitais / Missões
  { id: 'dica', name: 'Dica Secreta de Missão', desc: 'Uma dica extra na próxima missão difícil', cost: 40, category: 'digitais', icon: Zap, emoji: '💡', availability: 'disponivel' },
  { id: 'skin', name: 'Avatar Especial', desc: 'Um avatar temático exclusivo para seu perfil', cost: 75, category: 'digitais', icon: Star, emoji: '🦸', availability: 'disponivel', popular: true },
  { id: 'card-especial', name: 'Card Raro Garantido', desc: 'Um card raro desbloqueado imediatamente na sua coleção', cost: 100, category: 'digitais', icon: Trophy, emoji: '🃏', availability: 'disponivel' },
  { id: 'xp-boost', name: 'XP Duplo por 1 Dia', desc: 'Todas as missões dão XP em dobro por um dia inteiro', cost: 150, category: 'digitais', icon: Zap, emoji: '⚡', availability: 'reservado', note: 'Você tem 1 reservado' },

  // Cultura
  { id: 'musica', name: 'Sessão de Música', desc: 'Participar de uma roda de música com instrumentos da escola', cost: 90, category: 'cultura', icon: Music, emoji: '🎵', availability: 'disponivel' },
  { id: 'teatro', name: 'Teatro Improvisado', desc: 'Participar de atividade teatral com colegas escolhidos', cost: 120, category: 'cultura', icon: Sparkles, emoji: '🎭', availability: 'disponivel' },
  { id: 'arte', name: 'Aula de Arte Livre', desc: 'Uma aula de arte sem roteiro — expresse o que quiser', cost: 80, category: 'cultura', icon: Palette, emoji: '🎨', availability: 'disponivel', popular: true },
];

const CATEGORY_TABS: { id: Category; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'Todos', icon: ShoppingBag },
  { id: 'escola', label: 'Materiais', icon: BookOpen },
  { id: 'experiencias', label: 'Experiências', icon: Gift },
  { id: 'digitais', label: 'Digital', icon: Zap },
  { id: 'cultura', label: 'Cultura', icon: Palette },
];

export const LojaMoedasView: React.FC<LojaMoedasViewProps> = ({ student }) => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [cart, setCart] = useState<string[]>([]);
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const studentCoins = student?.coins || 320;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredItems = activeCategory === 'all' ? STORE_ITEMS : STORE_ITEMS.filter(item => item.category === activeCategory);

  const handleRedeem = (item: StoreItem) => {
    if (studentCoins < item.cost) {
      showToast(`Você precisa de ${item.cost - studentCoins} moedas a mais para resgatar este item.`);
      return;
    }
    if (item.availability !== 'disponivel') {
      showToast('Este item não está disponível no momento.');
      return;
    }
    setRedeemed(prev => [...prev, item.id]);
    showToast(`O item "${item.name}" foi resgatado! Mostre o comprovante ao seu professor.`);
  };

  const categoryTotal: Record<Category, number> = {
    all: STORE_ITEMS.filter(i => i.availability === 'disponivel').length,
    escola: STORE_ITEMS.filter(i => i.category === 'escola' && i.availability === 'disponivel').length,
    experiencias: STORE_ITEMS.filter(i => i.category === 'experiencias' && i.availability === 'disponivel').length,
    digitais: STORE_ITEMS.filter(i => i.category === 'digitais' && i.availability === 'disponivel').length,
    cultura: STORE_ITEMS.filter(i => i.category === 'cultura' && i.availability === 'disponivel').length,
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#00067a] border border-[#123cc4]/50 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-2 max-w-xs">
          <ShinyCoin size="sm" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/85 backdrop-blur-xl border border-white/90 shadow-md p-5 sm:p-6 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-black text-[#123cc4] uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              Loja de Recompensas
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Troque suas Moedas!
            </h1>
            <p className="text-xs text-slate-500 font-bold leading-relaxed mt-1 max-w-lg">
              Cada moeda representa uma conquista real de aprendizagem. Troque por recompensas reais ou experiências especiais.
            </p>
          </div>

          {/* Coin Balance */}
          <div className="flex flex-col items-center sm:items-end gap-2">
            <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-tr from-[#123cc4] to-[#05148d] shadow-lg text-white">
              <ShinyCoin size="lg" />
              <div>
                <div className="text-2xl font-black leading-tight">{studentCoins}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#123cc4] mix-blend-screen opacity-90">Suas Moedas</div>
              </div>
            </div>
            <div className="text-xs text-slate-500 font-black tracking-wide">
              {redeemed.length} resgatado{redeemed.length !== 1 ? 's' : ''} hoje
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#123cc4]/5 border border-[#123cc4]/20">
        <Info className="w-5 h-5 text-[#123cc4] shrink-0 mt-0.5" />
        <div className="text-xs text-[#0e2fb2] leading-relaxed font-bold">
          <strong>Como funciona:</strong> Escolha um item, clique em "Resgatar", mostre o comprovante ao seu professor. Recompensas físicas têm baixo custo e são organizadas pela escola. Pergunte ao professor quais estão disponíveis hoje!
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORY_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 border ${
              activeCategory === tab.id
                ? 'bg-[#123cc4] text-white border-[#123cc4]/50 shadow-sm scale-102'
                : 'bg-white/90 text-slate-700 hover:text-[#123cc4] border-white/90 hover:bg-white shadow-2xs'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
              activeCategory === tab.id ? 'bg-white/20' : 'bg-slate-200 text-slate-600'
            }`}>
              {categoryTotal[tab.id]}
            </span>
          </button>
        ))}
      </div>

      {/* Store Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {filteredItems.map(item => {
          const isRedeemed = redeemed.includes(item.id);
          const canAfford = studentCoins >= item.cost;

          return (
            <div
              key={item.id}
              className={`relative flex flex-col h-full rounded-2xl border transition-all overflow-hidden group ${
                isRedeemed ? 'border-emerald-200 bg-emerald-50/80' :
                item.availability === 'esgotado' ? 'border-slate-200 bg-slate-50/50 opacity-70' :
                item.availability === 'reservado' ? 'border-[#123cc4]/20 bg-[#123cc4]/5' :
                canAfford ? 'border-slate-200 bg-white/90 backdrop-blur-xl hover:border-[#123cc4]/30 hover:shadow-lg hover:shadow-[#123cc4]/5 hover:-translate-y-0.5' :
                'border-slate-200 bg-white/60 backdrop-blur-sm opacity-90'
              }`}
            >
              {/* Badges Flutuantes (Absolutos) */}
              <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
                {item.popular && !isRedeemed && (
                  <div className="px-2 py-0.5 rounded-full bg-gradient-to-r from-[#123cc4] to-[#05148d] text-white text-[8px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 w-fit">
                    <Star className="w-2.5 h-2.5 fill-white" /> Destaque
                  </div>
                )}
                {isRedeemed && (
                  <div className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 w-fit">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Adquirido
                  </div>
                )}
                {item.availability === 'esgotado' && (
                  <div className="px-2 py-0.5 rounded-full bg-slate-500 text-white text-[8px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 w-fit">
                    <Clock className="w-2.5 h-2.5" /> Esgotado
                  </div>
                )}
              </div>

              {/* Área de Imagem Compacta */}
              <div className="w-full h-24 sm:h-28 bg-gradient-to-br from-[#123cc4]/5 to-[#05148d]/5 flex items-center justify-center border-b border-slate-100 relative shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-[#123cc4]/10 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-[#123cc4]" />
                </div>
              </div>

              {/* Corpo do Card */}
              <div className="p-3 sm:p-4 flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="text-sm font-black text-slate-800 leading-tight line-clamp-1 mb-1">
                    {item.name}
                  </h3>
                  
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed line-clamp-2 mb-3">
                    {item.desc}
                  </p>

                  {item.note && (
                    <div className="inline-flex items-center gap-1 text-[8px] text-[#0e2fb2] font-bold uppercase bg-[#123cc4]/5 px-2 py-1 rounded-lg border border-[#123cc4]/10 max-w-full">
                      <Info className="w-2.5 h-2.5 shrink-0" />
                      <span className="truncate">{item.note}</span>
                    </div>
                  )}
                </div>

                {/* Rodapé: Preço e Ação */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <ShinyCoin size="xs" />
                    <span className={`text-sm sm:text-base font-black ${canAfford ? 'text-[#00067a]' : 'text-slate-400'}`}>
                      {item.cost}
                    </span>
                  </div>

                  {/* Botão de Ação */}
                  {isRedeemed ? (
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Feito
                    </div>
                  ) : item.availability === 'esgotado' ? (
                    <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-[9px] font-black uppercase flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Faltou
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRedeem(item)}
                      disabled={!canAfford}
                      className={`px-3 sm:px-4 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5 ${
                        canAfford
                          ? 'bg-[#123cc4] text-white hover:bg-[#0e2fb2] active:scale-95'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? (
                        <>Resgatar</>
                      ) : (
                        <span className="text-[8px]">- {item.cost - studentCoins} Moedas</span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* How to earn more coins */}
      <div className="p-5 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 shadow-md">
        <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
          <ShinyCoin size="sm" />
          Como ganhar mais moedas?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: CheckCircle2, action: 'Completar uma missão', coins: '+25 a +50' },
            { icon: Trophy, action: 'Dominar uma habilidade', coins: '+30 a +75' },
            { icon: Zap, action: 'Manter sequência de dias', coins: '+10 por dia' },
            { icon: Star, action: 'Missão em dupla concluída', coins: '+35' },
            { icon: Gift, action: 'Conquistar medalha especial', coins: '+50 a +100' },
            { icon: Printer, action: 'Entregar atividade impressa', coins: '+20' },
          ].map((tip, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-[#123cc4]/5 border border-[#123cc4]/10 shadow-2xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center border border-[#123cc4]/20 shrink-0">
                  <tip.icon className="w-4 h-4 text-[#123cc4]" />
                </div>
                <div className="text-[10px] text-[#0e2fb2] font-black uppercase tracking-wide">{tip.action}</div>
              </div>
              <div className="flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-black text-[#00067a]">{tip.coins}</span>
                <ShinyCoin size="xs" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
