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
    showToast(`${item.emoji} ${item.name} resgatado! Mostre o comprovante ao seu professor.`);
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
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 border border-amber-500/50 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-2 max-w-xs">
          <Coins className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-3xl border-2 border-amber-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-amber-700 uppercase tracking-widest mb-1">
              <ShoppingBag className="w-4 h-4" />
              Loja de Recompensas
            </div>
            <h2 className="text-2xl font-black text-slate-900">Troque suas Moedas!</h2>
            <p className="text-xs text-amber-700 mt-1 font-medium max-w-lg leading-relaxed">
              Cada moeda representa uma conquista real de aprendizagem. Troque por recompensas reais ou experiências especiais.
            </p>
          </div>

          {/* Coin Balance */}
          <div className="flex flex-col items-center sm:items-end gap-2">
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg text-white">
              <span className="text-2xl">🪙</span>
              <div>
                <div className="text-2xl font-black">{studentCoins}</div>
                <div className="text-[10px] font-bold opacity-80">Suas Moedas</div>
              </div>
            </div>
            <div className="text-xs text-amber-700 font-medium">
              {redeemed.length} resgatado{redeemed.length !== 1 ? 's' : ''} nesta sessão
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-700 leading-relaxed font-medium">
          <strong>Como funciona:</strong> Escolha um item, clique em "Resgatar", mostre o comprovante ao seu professor. Recompensas físicas têm baixo custo e são organizadas pela escola. Pergunte ao professor quais estão disponíveis hoje!
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORY_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer border-2 ${
              activeCategory === tab.id
                ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300 hover:text-amber-700'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
              activeCategory === tab.id ? 'bg-white/20' : 'bg-slate-100'
            }`}>
              {categoryTotal[tab.id]}
            </span>
          </button>
        ))}
      </div>

      {/* Store Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => {
          const isRedeemed = redeemed.includes(item.id);
          const canAfford = studentCoins >= item.cost;

          return (
            <div
              key={item.id}
              className={`relative rounded-3xl border-2 overflow-hidden transition-all ${
                isRedeemed ? 'border-emerald-400 bg-emerald-50' :
                item.availability === 'esgotado' ? 'border-slate-200 bg-slate-50 opacity-70' :
                item.availability === 'reservado' ? 'border-blue-300 bg-blue-50' :
                canAfford ? 'border-slate-200 bg-white hover:border-amber-300 hover:shadow-md hover:shadow-amber-500/10' :
                'border-slate-200 bg-white opacity-75'
              }`}
            >
              {/* Popular Badge */}
              {item.popular && !isRedeemed && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-black shadow-sm">
                  ⭐ Popular
                </div>
              )}
              {isRedeemed && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[9px] font-black shadow-sm">
                  ✅ Resgatado
                </div>
              )}
              {item.availability === 'esgotado' && (
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-slate-400 text-white text-[9px] font-black">
                  Esgotado
                </div>
              )}

              <div className="p-5">
                {/* Item emoji & icon */}
                <div className="text-3xl mb-3">{item.emoji}</div>

                <h3 className="text-sm font-black text-slate-900 mb-1">{item.name}</h3>
                <p className="text-xs text-slate-500 font-medium leading-snug mb-3">{item.desc}</p>

                {item.note && (
                  <div className="text-[10px] text-slate-500 italic mb-3 flex items-center gap-1">
                    <Info className="w-3 h-3 shrink-0" />
                    {item.note}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {/* Cost */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">🪙</span>
                    <span className={`text-lg font-black ${canAfford ? 'text-amber-600' : 'text-slate-400'}`}>
                      {item.cost}
                    </span>
                    {!canAfford && !isRedeemed && (
                      <span className="text-[10px] text-red-500 font-bold">
                        (faltam {item.cost - studentCoins})
                      </span>
                    )}
                  </div>

                  {/* Redeem Button */}
                  {isRedeemed ? (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-700 text-xs font-black">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Resgatado
                    </div>
                  ) : item.availability === 'esgotado' ? (
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-200 text-slate-500 text-xs font-bold">
                      <Clock className="w-3 h-3" />
                      Indisponível
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRedeem(item)}
                      disabled={!canAfford}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        canAfford
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90 shadow-sm'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Resgatar
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* How to earn more coins */}
      <div className="p-5 rounded-3xl bg-slate-900 text-white">
        <h3 className="text-sm font-black mb-3 flex items-center gap-2">
          <Coins className="w-4 h-4 text-amber-400" />
          Como ganhar mais moedas?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { emoji: '✅', action: 'Completar uma missão', coins: '+25 a +50' },
            { emoji: '🎯', action: 'Dominar uma habilidade', coins: '+30 a +75' },
            { emoji: '🔥', action: 'Manter sequência de dias', coins: '+10 por dia' },
            { emoji: '🤝', action: 'Missão em dupla concluída', coins: '+35' },
            { emoji: '🏆', action: 'Conquistar medalha especial', coins: '+50 a +100' },
            { emoji: '📄', action: 'Entregar atividade impressa', coins: '+20' },
          ].map((tip, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xl">{tip.emoji}</span>
              <div className="flex-1">
                <div className="text-xs text-slate-300 font-medium">{tip.action}</div>
              </div>
              <span className="text-xs font-black text-amber-400 shrink-0">{tip.coins} 🪙</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
