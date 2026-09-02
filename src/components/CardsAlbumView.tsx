import React, { useState } from 'react';
import { 
  Sparkles, 
  Printer, 
  Lock, 
  CheckCircle2,
  Filter,
  Layers,
  Award,
  Zap
} from 'lucide-react';
import { CardItem } from '../types';
import { RARITY_CONFIGS, CardRarity } from '../theme/gameTheme';
import { GameButton, RarityBadge } from './game-ui/GameComponents';

interface CardsAlbumViewProps {
  cards: CardItem[];
  onSelectCard: (card: CardItem) => void;
}

export const CardsAlbumView: React.FC<CardsAlbumViewProps> = ({
  cards,
  onSelectCard
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [selectedRarity, setSelectedRarity] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todas as Áreas' },
    { id: 'personagens', label: 'Personagens' },
    { id: 'conhecimento', label: 'Conhecimento' },
    { id: 'conquista', label: 'Conquistas' },
    { id: 'especiais', label: 'Especiais' },
  ];

  const rarities: { id: string; label: string }[] = [
    { id: 'todos', label: 'Todas Raridades' },
    { id: 'comum', label: 'Comum' },
    { id: 'incomum', label: 'Incomum' },
    { id: 'raro', label: 'Raro' },
    { id: 'epico', label: 'Épico' },
    { id: 'lendario', label: 'Lendário' },
  ];

  const filteredCards = cards.filter(c => {
    const matchCat = selectedCategory === 'todos' || c.category === selectedCategory;
    const matchRarity = selectedRarity === 'todos' || c.rarity === selectedRarity;
    return matchCat && matchRarity;
  });

  const unlockedCount = cards.filter(c => c.unlocked).length;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border-2 border-[#C9DDF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#2676D9] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#F6B928]" />
            <span>Álbum de Cards Colecionáveis • Sala de Missões</span>
          </div>
          <h2 className="text-2xl font-black text-[#18324A] mt-1">Meus Cards Colecionáveis</h2>
          <p className="text-xs sm:text-sm text-[#60758A] mt-1 max-w-xl font-bold leading-relaxed">
            Cards funcionam como elementos de identidade, conquista pedagógica e ferramenta didática interativa em sala de aula e em casa.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-5 py-2.5 rounded-2xl bg-[#FEF8EA] border-2 border-[#FCE09D] text-center shadow-2xs">
            <div className="text-xl font-black text-[#945E00]">{unlockedCount} / {cards.length}</div>
            <div className="text-[10px] text-[#D68E08] uppercase font-black tracking-wider">Desbloqueados</div>
          </div>
          <GameButton
            variant="reward"
            size="md"
            onClick={() => window.print()}
            icon={<Printer className="w-4 h-4" />}
          >
            Imprimir Cards
          </GameButton>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 cursor-pointer border-2 ${
                selectedCategory === cat.id
                  ? 'bg-[#2676D9] text-white border-[#1652A3] shadow-md shadow-[#2676D9]/25'
                  : 'bg-white text-[#18324A] hover:text-[#1652A3] border-[#C9DDF0] hover:bg-[#EAF4FF]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Rarities Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <span className="text-[10px] font-black text-[#60758A] uppercase tracking-wider mr-1">Raridade:</span>
          {rarities.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRarity(r.id)}
              className={`px-3 py-1 rounded-xl text-[11px] font-black transition-all shrink-0 cursor-pointer border-2 ${
                selectedRarity === r.id
                  ? 'bg-[#8059D9] text-white border-[#5631A8] shadow-2xs'
                  : 'bg-[#F6FAFF] text-[#18324A] hover:text-[#8059D9] border-[#C9DDF0] hover:bg-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredCards.map((card) => {
          const rConfig = RARITY_CONFIGS[card.rarity] || RARITY_CONFIGS.comum;
          return (
            <div
              key={card.id}
              onClick={() => onSelectCard(card)}
              className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                card.unlocked
                  ? `${rConfig.cardBg} ${rConfig.cardBorder} hover:-translate-y-1.5 hover:shadow-lg shadow-2xs`
                  : 'bg-[#F6FAFF] border-[#C9DDF0] opacity-60 hover:opacity-80'
              }`}
            >
              {/* Card Badge / Category */}
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider mb-2">
                <RarityBadge rarity={card.rarity} size="sm" />
                <span className="text-[#60758A] font-black px-2 py-0.5 rounded-lg bg-white/90 border border-[#C9DDF0]">{card.category}</span>
              </div>

              {/* Card Illustration Visual Box */}
              <div className="h-36 rounded-2xl bg-white/95 border-2 border-[#C9DDF0] flex flex-col items-center justify-center relative p-3 text-center my-2 shadow-inner">
                {card.unlocked ? (
                  <>
                    <div className="text-3xl font-black text-[#2676D9] filter drop-shadow-xs group-hover:scale-110 transition-transform">
                      {card.icon}
                    </div>
                    {card.formulaOrQuote && (
                      <div className="mt-2 text-[10px] font-black text-[#945E00] bg-[#FEF8EA] px-2.5 py-1 rounded-lg border border-[#FCE09D] truncate max-w-full">
                        {card.formulaOrQuote}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center text-[#60758A]">
                    <Lock className="w-8 h-8 mb-1 text-[#60758A]" />
                    <span className="text-[10px] font-black">Bloqueado</span>
                  </div>
                )}
              </div>

              {/* Card Info */}
              <div className="space-y-1 mt-1">
                <h4 className="text-sm font-black text-[#18324A] group-hover:text-[#2676D9] transition-colors line-clamp-1">
                  {card.name}
                </h4>
                <p className="text-xs text-[#60758A] line-clamp-2 leading-relaxed font-bold">
                  {card.description}
                </p>
              </div>

              {/* Footer status */}
              <div className="mt-3 pt-2.5 border-t border-[#C9DDF0] flex items-center justify-between text-[11px]">
                {card.unlocked ? (
                  <span className="inline-flex items-center gap-1 font-black text-[#43B96A]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Desbloqueado</span>
                  </span>
                ) : (
                  <span className="text-[#60758A] font-bold">Cumpra missões</span>
                )}
                <span className="text-[#60758A] text-[10px] font-mono font-black">SM-CARD</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

