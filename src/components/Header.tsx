import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  Search, 
  Bell, 
  ChevronDown, 
  User, 
  GraduationCap, 
  Sparkles, 
  Layers, 
  Compass, 
  Tv, 
  Menu, 
  X, 
  Clock, 
  Maximize, 
  Minimize 
} from 'lucide-react';
import { UserRole, Student } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  selectedStudent: Student;
  setSelectedStudent: (student: Student) => void;
  students: Student[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenNotifications: () => void;
  onOpenTvMode?: () => void;
  onSelectStudentDrawer?: (student: Student) => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  setCurrentRole,
  selectedStudent,
  setSelectedStudent,
  students,
  searchQuery,
  setSearchQuery,
  onOpenNotifications,
  onOpenTvMode,
  onSelectStudentDrawer,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen
}) => {
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState('Turma 5º ano A');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const filteredSearchStudents = searchQuery.trim() === '' 
    ? [] 
    : students.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.statusAlertText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.currentMission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.currentMission.primaryAbility.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <header className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b-2 border-[#C9DDF0] px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4 transition-all shadow-2xs">
      {/* Left: Mobile Hamburger & Brand Logo */}
      <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-6 shrink-0">
        {/* Hamburger Menu Toggle Button */}
        {setIsMobileMenuOpen && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-1 rounded-2xl bg-[#EAF4FF] hover:bg-[#D6E8FA] text-[#1652A3] border-2 border-[#C9DDF0] transition-colors lg:hidden flex items-center justify-center cursor-pointer active:scale-95"
            aria-label="Abrir Menu de Navegação"
            title="Menu lateral"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-[#2676D9]" />
            ) : (
              <Menu className="w-5 h-5 text-[#2676D9]" />
            )}
          </button>
        )}

        <div 
          onClick={() => setCurrentRole('professor')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-tr from-[#2676D9] to-[#19B9B0] rounded-2xl flex items-center justify-center font-bold text-sm text-white shadow-md shadow-[#2676D9]/25 group-hover:scale-105 transition-transform shrink-0 border-2 border-white">
            {currentRole === 'aluno' ? (
              <Compass className="w-5 h-5 text-white" />
            ) : (
              <Rocket className="w-5 h-5 text-white" />
            )}
          </div>
          <div className="hidden xs:block">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-[#2676D9] uppercase">SALA DE</span>
            </div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-[#18324A] leading-tight">
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

      {/* Center: Search Bar (Desktop) */}
      <div className="relative flex-1 max-w-md hidden md:block">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#60758A] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            placeholder="Buscar aluno, missão ou habilidade BNCC..."
            className="w-full bg-[#EAF4FF] text-[#18324A] placeholder-[#60758A] pl-10 pr-4 py-2 text-xs font-bold rounded-2xl border-2 border-[#C9DDF0] focus:bg-white focus:outline-none focus:border-[#2676D9] transition-all"
          />
        </div>

        {/* Live Search Suggestions Dropdown */}
        {isSearchFocused && searchQuery.trim() !== '' && (
          <div className="absolute left-0 right-0 mt-2 bg-white border-2 border-[#C9DDF0] rounded-2xl shadow-xl p-2 z-50 max-h-80 overflow-y-auto">
            <div className="text-[10px] font-black text-[#60758A] px-3 py-1 uppercase tracking-widest">
              Resultados ({filteredSearchStudents.length})
            </div>
            {filteredSearchStudents.length > 0 ? (
              <div className="space-y-1">
                {filteredSearchStudents.map((s) => (
                  <div
                    key={s.id}
                    onMouseDown={() => {
                      if (currentRole === 'aluno') {
                        setSelectedStudent(s);
                      } else if (onSelectStudentDrawer) {
                        onSelectStudentDrawer(s);
                      }
                      setSearchQuery('');
                    }}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-[#EAF4FF] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      {s.avatarUrl ? (
                        <img src={s.avatarUrl} alt={s.name} className="w-7 h-7 rounded-xl object-cover border border-[#C9DDF0]" />
                      ) : (
                        <div className="w-7 h-7 rounded-xl bg-[#EAF4FF] flex items-center justify-center text-[#2676D9] font-black">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-black text-[#18324A]">{s.name}</div>
                        <div className="text-[11px] text-[#60758A] font-medium">Missão: {s.currentMission.title}</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FEF8EA] text-[#945E00] border border-[#FCE09D] font-black">
                      Nível {s.level}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 text-xs text-[#60758A] text-center font-medium">
                Nenhum aluno ou missão encontrado com "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Side: Clock, Controls, Notifications & Role/Profile Switcher */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        
        {/* Live Clock Badge */}
        {currentTime && (
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#EAF4FF] border-2 border-[#C9DDF0] text-xs font-black text-[#1652A3] font-mono">
            <Clock className="w-3.5 h-3.5 text-[#2676D9]" />
            <span>{currentTime}</span>
          </div>
        )}

        {/* Fullscreen Toggle Button */}
        <button
          onClick={toggleFullscreen}
          className="hidden sm:flex p-2 rounded-2xl bg-[#EAF4FF] hover:bg-[#D6E8FA] text-[#1652A3] border-2 border-[#C9DDF0] transition-colors cursor-pointer"
          title={isFullscreen ? "Sair da Tela Cheia" : "Expandir Tela Cheia (Modo Sala)"}
        >
          {isFullscreen ? (
            <Minimize className="w-4 h-4 text-[#2676D9]" />
          ) : (
            <Maximize className="w-4 h-4 text-[#2676D9]" />
          )}
        </button>

        {/* Role Quick Switch Pill */}
        <div className="hidden lg:flex items-center bg-[#EAF4FF] p-1 rounded-2xl border-2 border-[#C9DDF0]">
          <button
            onClick={() => setCurrentRole('professor')}
            className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              currentRole === 'professor'
                ? 'bg-[#2676D9] text-white shadow-xs'
                : 'text-[#1652A3] hover:text-[#18324A]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Professor</span>
          </button>
          <button
            onClick={() => setCurrentRole('aluno')}
            className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              currentRole === 'aluno'
                ? 'bg-[#2676D9] text-white shadow-xs'
                : 'text-[#1652A3] hover:text-[#18324A]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Aluno</span>
          </button>
          <button
            onClick={() => setCurrentRole('coordenacao')}
            className={`px-2.5 py-1.5 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              currentRole === 'coordenacao'
                ? 'bg-[#2676D9] text-white shadow-xs'
                : 'text-[#1652A3] hover:text-[#18324A]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Coordenação</span>
          </button>
        </div>

        {/* TV Mode Action Button with Gold highlight */}
        {onOpenTvMode && (
          <button
            onClick={onOpenTvMode}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-2xl bg-[#F6B928] hover:bg-[#E5A61A] text-[#18324A] border-2 border-[#D68E08] text-xs font-black transition-all shadow-md shadow-[#F6B928]/30 cursor-pointer active:scale-95 glow-reward"
            title="Abrir Painel da Sala de Missões para TV (Modo Apresentação 16:9)"
          >
            <Tv className="w-4 h-4 text-[#18324A]" />
            <span className="hidden sm:inline">Painel TV</span>
          </button>
        )}

        {/* Notifications Icon */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-2xl bg-[#EAF4FF] hover:bg-[#D6E8FA] text-[#1652A3] border-2 border-[#C9DDF0] transition-colors cursor-pointer"
          title="Notificações e Alertas Pedagógicos"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E85D63] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
            3
          </span>
        </button>

        {/* User / Profile Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center gap-2 bg-[#EAF4FF] hover:bg-[#D6E8FA] px-2 sm:px-3 py-1.5 rounded-2xl border-2 border-[#C9DDF0] transition-colors cursor-pointer"
          >
            {currentRole === 'aluno' ? (
              selectedStudent?.avatarUrl ? (
                <img src={selectedStudent.avatarUrl} alt={selectedStudent.name || 'Aluno'} className="w-7 h-7 rounded-xl object-cover border-2 border-[#F6B928] shadow-xs" />
              ) : (
                <div className="w-7 h-7 rounded-xl bg-[#FEF8EA] border-2 border-[#FCE09D] flex items-center justify-center text-[#945E00] shadow-xs font-black text-xs">
                  {selectedStudent?.avatar || '🌟'}
                </div>
              )
            ) : currentRole === 'coordenacao' ? (
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" alt="Coordenação" className="w-7 h-7 rounded-xl object-cover border-2 border-[#8059D9] shadow-xs" />
            ) : (
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Professora" className="w-7 h-7 rounded-xl object-cover border-2 border-[#2676D9] shadow-xs" />
            )}

            <div className="text-left hidden md:block">
              <div className="text-xs font-black text-[#18324A] leading-tight">
                {currentRole === 'aluno' ? (selectedStudent?.name || 'Estudante') : currentRole === 'coordenacao' ? 'Coord. Paula' : 'Prof. Carla'}
              </div>
              <div className="text-[10px] text-[#60758A] font-bold leading-none mt-0.5">
                {currentRole === 'aluno' ? `Aluno • Nível ${selectedStudent?.level || 1}` : currentRole === 'coordenacao' ? 'Coordenação' : 'Professora'}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#2676D9] ml-0.5 hidden sm:block" />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-[#C9DDF0] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 divide-y divide-[#EAF4FF]">
              <div className="px-4 py-2">
                <div className="text-[10px] font-black text-[#60758A] uppercase tracking-widest">Alternar Perfil</div>
                <div className="text-xs text-[#60758A] font-medium mt-0.5">Explore a visão docente ou de estudante</div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setCurrentRole('professor');
                    setIsProfileDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2 text-xs text-left hover:bg-[#F6FAFF] transition-colors ${
                    currentRole === 'professor' ? 'bg-[#EAF4FF] text-[#1652A3] font-black' : 'text-[#18324A]'
                  }`}
                >
                  <div className="w-7 h-7 rounded-xl bg-[#2676D9] text-white text-xs font-black flex items-center justify-center">CS</div>
                  <div>
                    <div className="text-xs font-black text-[#18324A]">Prof. Carla Souza</div>
                    <div className="text-[10px] text-[#60758A]">Dashboard do Professor</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setCurrentRole('coordenacao');
                    setIsProfileDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2 text-xs text-left hover:bg-[#F6FAFF] transition-colors ${
                    currentRole === 'coordenacao' ? 'bg-[#EAF4FF] text-[#1652A3] font-black' : 'text-[#18324A]'
                  }`}
                >
                  <div className="w-7 h-7 rounded-xl bg-[#8059D9] text-white text-xs font-black flex items-center justify-center">CP</div>
                  <div>
                    <div className="text-xs font-black text-[#18324A]">Coordenação Pedagógica</div>
                    <div className="text-[10px] text-[#60758A]">Visão Geral da Escola</div>
                  </div>
                </button>
              </div>

              <div className="py-1 max-h-48 overflow-y-auto">
                <div className="px-3.5 py-1 text-[10px] font-black text-[#60758A] uppercase tracking-widest">Alunos (Visão do Estudante)</div>
                {students.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setSelectedStudent(s);
                      setCurrentRole('aluno');
                      setIsProfileDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-1.5 text-xs text-left hover:bg-[#F6FAFF] transition-colors ${
                      currentRole === 'aluno' && selectedStudent?.id === s.id
                        ? 'bg-[#FEF8EA] text-[#945E00] font-black'
                        : 'text-[#18324A]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {s.avatarUrl ? (
                        <img src={s.avatarUrl} alt={s.name} className="w-5 h-5 rounded-full object-cover border border-[#C9DDF0]" />
                      ) : (
                        <span className="text-xs">{s.avatar}</span>
                      )}
                      <span className="truncate font-bold">{s.name} ({s.grade})</span>
                    </div>
                    <span className="text-[10px] text-[#D68E08] shrink-0 font-black">Nv. {s.level}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
