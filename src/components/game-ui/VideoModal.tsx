import React from 'react';
import { X, PlayCircle, Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  unitTitle: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, unitTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-2 sm:p-4 animate-fadeIn">
      <div className="bg-black rounded-[2rem] sm:rounded-[3rem] w-full max-w-[400px] h-[90vh] sm:h-[85vh] overflow-hidden shadow-2xl flex flex-col relative border-4 sm:border-8 border-slate-800">
        
        {/* Header Overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/60 to-transparent">
          <h3 className="font-fredoka text-lg font-bold text-white shadow-sm">
            Shorts: {unitTitle}
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Video Area (Vertical) */}
        <div className="flex-1 relative bg-slate-900 flex items-center justify-center cursor-pointer group">
          {/* Mock Video Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900"></div>
          
          {/* Center Play Button */}
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 z-10 border border-white/20">
            <PlayCircle className="w-10 h-10 ml-1" />
          </div>

          {/* Bottom Info Area */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div>
                <h4 className="text-white font-bold font-fredoka leading-tight">
                  Profª Maria
                </h4>
                <span className="text-white/70 text-xs">@profa_maria</span>
              </div>
              <button className="ml-2 px-3 py-1 bg-white text-black text-xs font-bold rounded-full cursor-pointer hover:bg-slate-200">
                Seguir
              </button>
            </div>
            <p className="text-white text-sm font-medium drop-shadow-md line-clamp-2">
              Aprenda a decompor os números usando o Material Dourado de uma vez por todas! 🧱✨ #Matemática #AprenderBrincando
            </p>
          </div>

          {/* Right Floating Actions */}
          <div className="absolute right-4 bottom-24 z-20 flex flex-col items-center gap-6">
            <button className="flex flex-col items-center gap-1 text-white group/btn">
              <div className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover/btn:bg-rose-500 transition-colors">
                <Heart className="w-6 h-6 fill-transparent group-hover/btn:fill-white" />
              </div>
              <span className="text-xs font-bold shadow-sm">1.2k</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white group/btn">
              <div className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover/btn:bg-blue-500 transition-colors">
                <MessageCircle className="w-6 h-6 fill-transparent group-hover/btn:fill-white" />
              </div>
              <span className="text-xs font-bold shadow-sm">34</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white group/btn">
              <div className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover/btn:bg-emerald-500 transition-colors">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold shadow-sm">Compart.</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-white">
              <div className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/40 transition">
                <MoreVertical className="w-6 h-6" />
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Recommended Videos (Floating outside on Desktop, hidden on small screens) */}
      <div className="hidden lg:flex flex-col gap-4 ml-8 w-64 h-[85vh] overflow-y-auto no-scrollbar">
        <h4 className="font-fredoka text-white text-xl font-bold mb-2 flex items-center gap-2">
          <PlayCircle className="text-rose-500" /> Mais Shorts
        </h4>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3 bg-slate-800/80 backdrop-blur-sm p-3 rounded-2xl cursor-pointer hover:bg-slate-700 hover:scale-105 transition-all border border-slate-700/50 shadow-xl group">
            {/* Vertical Thumbnail */}
            <div className="w-16 aspect-[9/16] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex-shrink-0 flex items-center justify-center relative overflow-hidden">
              <PlayCircle className="w-6 h-6 text-white/50 group-hover:text-white group-hover:scale-110 transition" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm font-bold text-white line-clamp-2 leading-snug">
                Dica Rápida: Resolução #{i}
              </span>
              <span className="text-xs text-slate-400 mt-1">@profa_maria</span>
              <span className="text-xs text-rose-400 font-bold mt-2">12k views</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
