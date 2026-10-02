import React from 'react';
import { X, BookOpen } from 'lucide-react';
import { ReadingPassage } from '../../types';

interface ReadingPassageModalProps {
  isOpen: boolean;
  onClose: () => void;
  passage: ReadingPassage;
}

export const ReadingPassageModal: React.FC<ReadingPassageModalProps> = ({ isOpen, onClose, passage }) => {
  if (!isOpen) return null;

  const isRecipe = passage.genre?.toLowerCase().includes('receita');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className={`relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200 
          ${isRecipe ? 'bg-[#fdfbf7] text-slate-900 border-4 border-slate-200' : 'bg-slate-900 border border-slate-700 text-white'}`}
      >
        {/* Header */}
        <div className={`sticky top-0 z-10 flex items-center justify-between p-4 px-6 border-b 
          ${isRecipe ? 'bg-[#fdfbf7]/90 border-slate-200/50 backdrop-blur-md' : 'bg-slate-900/90 border-slate-800 backdrop-blur-md'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${isRecipe ? 'bg-orange-100 text-orange-600' : 'bg-indigo-500/20 text-indigo-400'}`}>
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className={`font-black text-lg ${isRecipe ? 'text-slate-800' : 'text-white'}`}>
                {passage.title}
              </h2>
              {passage.genre && (
                <p className={`text-xs font-bold uppercase tracking-wider ${isRecipe ? 'text-slate-500' : 'text-slate-400'}`}>
                  {passage.genre}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors ${isRecipe ? 'hover:bg-slate-200 text-slate-500' : 'hover:bg-white/10 text-slate-400'}`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className={`p-6 px-6 sm:px-8 space-y-6 ${isRecipe ? 'font-serif' : 'font-sans'}`}>
          <div className={`text-base sm:text-lg leading-relaxed whitespace-pre-wrap 
            ${isRecipe ? 'text-slate-800' : 'text-slate-300'}`}>
            {passage.text}
          </div>

          {passage.glossary && passage.glossary.length > 0 && (
            <div className={`mt-8 p-5 rounded-2xl border 
              ${isRecipe ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'}`}>
              <h4 className={`text-sm font-black mb-3 uppercase tracking-wider 
                ${isRecipe ? 'text-slate-600' : 'text-white/60'}`}>
                Vocabulário
              </h4>
              <ul className="space-y-3">
                {passage.glossary.map((item, i) => (
                  <li key={i} className={`text-sm flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2`}>
                    <strong className={isRecipe ? 'text-orange-700' : 'text-indigo-300'}>{item.word}:</strong>
                    <span className={isRecipe ? 'text-slate-700' : 'text-slate-400'}>{item.meaning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
