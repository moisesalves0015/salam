import React, { useState, useEffect } from 'react';
import { Settings, Tv, Maximize, Minimize, GraduationCap, Compass, Layers, X, User } from 'lucide-react';
import { UserRole, Student } from '../types';

interface DevAssistantProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  onOpenTvMode: () => void;
  students: Student[];
  selectedStudent: Student;
  setSelectedStudent: (student: Student) => void;
}

export const DevAssistant: React.FC<DevAssistantProps> = ({
  currentRole,
  setCurrentRole,
  onOpenTvMode,
  students,
  selectedStudent,
  setSelectedStudent
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFs = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFs);
    return () => document.removeEventListener('fullscreenchange', handleFs);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Pop-up Menu */}
      {isOpen && (
        <div className="bg-slate-900/95 backdrop-blur-md border border-slate-700 p-4 rounded-3xl shadow-2xl w-64 animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between mb-4 border-b border-slate-700/50 pb-3">
            <h4 className="text-white font-black text-sm flex items-center gap-2">
              <Settings className="w-4 h-4 text-emerald-400" />
              Dev Tools
            </h4>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Quick Actions */}
            <div className="space-y-2">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ações Globais</div>
              <div className="flex gap-2">
                <button
                  onClick={onOpenTvMode}
                  className="flex-1 flex flex-col items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 p-2 rounded-2xl border border-slate-700 transition-colors cursor-pointer"
                >
                  <Tv className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] text-white font-bold">Painel TV</span>
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="flex-1 flex flex-col items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 p-2 rounded-2xl border border-slate-700 transition-colors cursor-pointer"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4 text-sky-400" /> : <Maximize className="w-4 h-4 text-sky-400" />}
                  <span className="text-[10px] text-white font-bold">Tela Cheia</span>
                </button>
              </div>
            </div>

            {/* Role Switcher */}
            <div className="space-y-2">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Alternar Papel</div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setCurrentRole('professor')}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    currentRole === 'professor' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold">Prof</span>
                </button>
                <button
                  onClick={() => setCurrentRole('aluno')}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    currentRole === 'aluno' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold">Aluno</span>
                </button>
                <button
                  onClick={() => setCurrentRole('coordenacao')}
                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    currentRole === 'coordenacao' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold">Coord</span>
                </button>
              </div>
            </div>

            {/* Student Switcher (If in Aluno mode) */}
            {currentRole === 'aluno' && (
              <div className="space-y-2">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Simular Aluno</div>
                <div className="max-h-32 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {students.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStudent(s)}
                      className={`w-full flex items-center justify-between p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        selectedStudent.id === s.id ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {s.avatarUrl ? (
                          <img src={s.avatarUrl} alt="" className="w-4 h-4 rounded-full" />
                        ) : (
                          <User className="w-3 h-3" />
                        )}
                        <span className="truncate">{s.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-2xl hover:bg-slate-800 transition-all cursor-pointer border-2 border-slate-700 hover:scale-110 active:scale-95 group"
        title="Ferramentas de Desenvolvimento"
      >
        <Settings className={`w-6 h-6 text-slate-300 group-hover:text-white transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>
    </div>
  );
};
