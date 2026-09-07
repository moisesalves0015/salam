import React, { useState } from 'react';
import { 
  Rocket, 
  Bell, 
  ChevronDown, 
  Compass, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';
import { UserRole, Student } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  selectedStudent: Student;
  onOpenNotifications: () => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  selectedStudent,
  onOpenNotifications,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen
}) => {
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('Turma 5º ano A');

  return (
    <header className="sticky top-2 sm:top-4 z-40 mx-2 sm:mx-4 lg:mx-8 bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2 sm:gap-4 transition-all shadow-md">
      {/* Left: Mobile Hamburger & Brand Logo */}
      <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-6 shrink-0">
        {/* Hamburger Menu Toggle Button */}
        {setIsMobileMenuOpen && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 sm:p-2 -ml-1 rounded-2xl bg-white/90 hover:bg-white text-slate-700 border border-slate-200/80 transition-all lg:hidden flex items-center justify-center cursor-pointer active:scale-95 shadow-2xs"
            aria-label="Abrir Menu de Navegação"
            title="Menu lateral"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
            ) : (
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
            )}
          </button>
        )}

        <div className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-tr from-[#123cc4] to-[#05148d] rounded-full flex items-center justify-center font-bold text-sm text-white shadow-xs shrink-0">
            {currentRole === 'aluno' ? (
              <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            ) : (
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-[#123cc4] uppercase">SALA DE</span>
            </div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-[#00067a] leading-tight">
              MISSÕES
            </h1>
          </div>
        </div>

        {/* Classroom selector (Visible in Professor and Coordenacao roles on desktop) */}
        {currentRole !== 'aluno' ? (
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
              className="flex items-center gap-2 bg-[#EAF4FF] hover:bg-[#D6E8FA] text-[#1652A3] px-3.5 py-1.5 rounded-2xl border-2 border-[#C9DDF0] text-xs font-black transition-colors cursor-pointer"
            >
              <span>{selectedClass}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#2676D9]" />
            </button>

            {isClassDropdownOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-white border-2 border-[#C9DDF0] rounded-2xl shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 overflow-hidden">
                {['Turma 5º ano A', 'Turma 5º ano B', 'Turma 4º ano A', 'Turma 4º ano B'].map((cls) => (
                  <button
                    key={cls}
                    onClick={() => {
                      setSelectedClass(cls);
                      setIsClassDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                      selectedClass === cls ? 'bg-[#EAF4FF] text-[#1652A3] font-black' : 'text-[#18324A] hover:bg-[#F6FAFF]'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="hidden sm:flex items-center gap-2 bg-[#FEF8EA] text-[#945E00] px-3.5 py-1.5 rounded-2xl border-2 border-[#FCE09D] text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-[#F6B928]" />
            <span>Academia dos Exploradores</span>
          </div>
        )}
      </div>

      {/* Right Side: Notifications & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        
        {/* Notifications Icon */}
        <button
          onClick={onOpenNotifications}
          className="relative p-1.5 sm:p-2 rounded-2xl bg-white/90 hover:bg-white text-slate-700 border border-slate-200/80 transition-all cursor-pointer shadow-2xs active:scale-95"
          title="Notificações e Alertas Pedagógicos"
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E85D63] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
            3
          </span>
        </button>

        {/* Static User Profile View */}
        <div className="flex items-center gap-2.5 bg-white/60 px-2 sm:px-3 py-1.5 rounded-3xl border border-white/90 shadow-2xs">
          {currentRole === 'aluno' ? (
            selectedStudent?.avatarUrl ? (
              <img src={selectedStudent.avatarUrl} alt={selectedStudent.name || 'Aluno'} className="w-8 h-8 rounded-full object-cover border-2 border-white ring-2 ring-[#123cc4] shadow-2xs" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-amber-700 font-black text-[10px] border-2 border-white ring-2 ring-amber-400 shadow-2xs">
                {selectedStudent?.avatar || '🌟'}
              </div>
            )
          ) : currentRole === 'coordenacao' ? (
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" alt="Coordenação" className="w-8 h-8 rounded-full object-cover border-2 border-white ring-2 ring-[#8059D9] shadow-2xs" />
          ) : (
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Professora" className="w-8 h-8 rounded-full object-cover border-2 border-white ring-2 ring-[#123cc4] shadow-2xs" />
          )}

          <div className="text-left hidden md:block">
            <div className="text-xs font-black text-slate-900 leading-tight">
              {currentRole === 'aluno' ? (selectedStudent?.name || 'Estudante') : currentRole === 'coordenacao' ? 'Coord. Paula' : 'Prof. Carla'}
            </div>
            <div className="text-[10px] text-slate-500 font-bold leading-none mt-0.5">
              {currentRole === 'aluno' ? `Aluno • Nível ${selectedStudent?.level || 1}` : currentRole === 'coordenacao' ? 'Coordenação' : 'Professora'}
            </div>
          </div>
          
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5 hidden sm:block" />
        </div>

      </div>
    </header>
  );
};
