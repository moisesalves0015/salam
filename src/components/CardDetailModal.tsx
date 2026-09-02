import React from 'react';
import { X, Sparkles, Printer, Shield, BookOpen, CheckCircle2, Award, Zap } from 'lucide-react';
import { CardItem } from '../types';
import { RARITY_CONFIGS } from '../theme/gameTheme';
import { GameButton, RarityBadge } from './game-ui/GameComponents';

interface CardDetailModalProps {
  card: CardItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  isOpen,
  onClose
}) => {
  if (!isOpen || !card) return null;

  const rarityConfig = RARITY_CONFIGS[card.rarity] || RARITY_CONFIGS.comum;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white border-2 border-slate-200 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col my-auto text-slate-900">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black text-indigo-700 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Card Colecionável Pedagógico</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer shadow-2xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          
          {/* Card Physical Visual Representation with Rarity Border */}
          <div className={`w-60 h-84 rounded-3xl ${rarityConfig.cardBg} p-4 border-2 ${rarityConfig.cardBorder} shadow-xl flex flex-col justify-between relative transform hover:scale-[1.03] transition-transform duration-300`}>
            <div className="flex justify-between items-center text-[10px] font-black uppercase">
              <RarityBadge rarity={card.rarity} size="sm" />
              <span className="text-slate-600 font-bold px-2 py-0.5 rounded-md bg-white/80 border border-slate-200">{card.category}</span>
            </div>

            <div className="my-auto flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-white border-2 border-slate-200 shadow-md flex items-center justify-center text-4xl mb-3 font-black text-indigo-700">
                {card.icon}
              </div>
              <h3 className="text-base font-black text-slate-900 leading-tight">{card.name}</h3>
              {card.formulaOrQuote && (
                <div className="text-[11px] font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-xl border border-amber-300 mt-2.5 shadow-2xs">
                  {card.formulaOrQuote}
                </div>
              )}
            </div>

            <div className="text-[9px] font-bold text-slate-500 border-t border-slate-200/80 pt-2 flex justify-between">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Sala de Missões</span>
              </span>
              <span>Coleção Oficial</span>
            </div>
          </div>

          <div className="space-y-1.5 max-w-sm">
            <h4 className="text-lg font-black text-slate-900">{card.name}</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {card.description}
            </p>
          </div>

          {/* Didactic Application Box */}
          <div className="w-full bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200 text-left text-xs space-y-1">
            <div className="font-black text-indigo-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Uso Didático em Sala e em Casa:</span>
            </div>
            <p className="text-slate-700 text-[11px] leading-relaxed font-medium">
              Os cards servem como ferramenta ativa: o professor e a turma podem utilizá-los para compor desafios práticos, rodadas de perguntas e respostas ou conexões interdisciplinares.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-between items-center">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-300 shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-600" />
            <span>Imprimir este card</span>
          </button>
          
          <GameButton
            variant="primary"
            size="md"
            onClick={onClose}
          >
            Concluir
          </GameButton>
        </div>
      </div>
    </div>
  );
};
