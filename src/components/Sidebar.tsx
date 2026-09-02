import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, 
  Users, 
  Flag, 
  GitBranch, 
  BarChart3, 
  Compass, 
  Rocket, 
  Map, 
  Star, 
  Trophy, 
  Building2, 
  Activity, 
  FileSpreadsheet, 
  Calendar, 
  Tv, 
  X, 
  Clock, 
  Maximize, 
  Minimize, 
  GraduationCap, 
  Layers, 
  ChevronDown,
  User
} from 'lucide-react';
import { UserRole, Student } from '../types';

interface SidebarProps {
  currentRole: UserRole;
  setCurrentRole?: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenMission?: () => void;
  onOpenNewIntervention?: () => void;
  onOpenCards?: () => void;
  onOpenTvMode?: () => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
  selectedStudent?: Student;
  setSelectedStudent?: (student: Student) => void;
  students?: Student[];
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  action?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  setCurrentRole,
  activeTab,
  onTabChange,
  onOpenMission,
  onOpenCards,
  onOpenTvMode,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen,
  selectedStudent,
  setSelectedStudent,
  students = []
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isStudentSelectorOpen, setIsStudentSelectorOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<string>('Turma 5º ano A');
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const nowOk = new Date();
      setCurrentTime(nowOk.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentDate(nowOk.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }));
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

  const handleNavClick = (item: NavItem) => {
    if (item.action) {
      item.action();
    } else {
      onTabChange(item.id);
    }
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const professorNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutGrid },
    { id: 'painel-tv', label: 'Painel TV (16:9)', icon: Tv, badge: 'Escola', badgeColor: 'bg-[#FEF8EA] text-[#945E00] border border-[#FCE09D]', action: onOpenTvMode || (() => onTabChange('painel-tv')) },
    { id: 'alunos', label: 'Alunos & Prontuários', icon: Users, badge: `${students.length}` },
    { id: 'missoes', label: 'Missões & BNCC', icon: Flag },
    { id: 'trilhas', label: 'Trilhas de Aprendizagem', icon: GitBranch },
    { id: 'intervencoes', label: 'Intervenções Docentes', icon: Calendar },
    { id: 'relatorios', label: 'Relatórios & Memória', icon: BarChart3 },
    { id: 'cards', label: 'Álbum de Cards', icon: Star },
  ];

  const alunoNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Minha Jornada', icon: Compass },
    { id: 'painel-tv', label: 'Painel da Turma (TV)', icon: Tv, badge: 'Ao vivo', badgeColor: 'bg-[#FEF8EA] text-[#945E00] border border-[#FCE09D]', action: onOpenTvMode || (() => onTabChange('painel-tv')) },
    { id: 'proxima-missao', label: 'Próxima Missão', icon: Rocket, action: onOpenMission },
    { id: 'trilhas', label: 'Minhas Trilhas', icon: Map },
    { id: 'cards', label: 'Meus Cards Colecionáveis', icon: Star, action: onOpenCards },
    { id: 'conquistas', label: 'Conquistas & Selos', icon: Trophy },
    { id: 'relatorios', label: 'Minha Evolução', icon: Activity },
  ];

  const coordenacaoNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Visão Institucional', icon: Building2 },
    { id: 'painel-tv', label: 'Painel TV da Escola', icon: Tv, badge: 'Ao vivo', badgeColor: 'bg-[#FEF8EA] text-[#945E00] border border-[#FCE09D]', action: onOpenTvMode || (() => onTabChange('painel-tv')) },
    { id: 'alunos', label: 'Turmas & Alunos', icon: Users },
    { id: 'relatorios', label: 'Relatórios & Memória', icon: FileSpreadsheet },
    { id: 'trilhas', label: 'Matriz Curricular', icon: GitBranch },
  ];

  const navItems = currentRole === 'aluno' 
    ? alunoNavItems 
    : currentRole === 'coordenacao' 
      ? coordenacaoNavItems 
      : professorNavItems;

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between space-y-4">
      <div className="space-y-4">
        
        {/* Drawer Header (Visible inside mobile drawer) */}
        <div className="flex items-center justify-between pb-3 border-b-2 border-[#C9DDF0] lg:hidden">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#2676D9] to-[#19B9B0] flex items-center justify-center text-white font-black text-sm shadow-md border-2 border-white">
              <Rocket className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-black text-[#2676D9] uppercase tracking-widest leading-none block">SALA DE</span>
              <h3 className="text-sm font-black text-[#18324A] leading-tight">MISSÕES</h3>
            </div>
          </div>
          {setIsMobileMenuOpen && (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-xl bg-[#EAF4FF] hover:bg-[#D6E8FA] text-[#1652A3] border-2 border-[#C9DDF0] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 1. HORÁRIO EM TEMPO REAL & CONTROLES DE TELA EXPANDIDA */}
        <div className="p-3 rounded-2xl bg-[#F6FAFF] border-2 border-[#C9DDF0] shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#18324A]">
              <Clock className="w-4 h-4 text-[#2676D9] animate-pulse" />
              <div>
                <span className="text-xs font-black font-mono text-[#18324A] block leading-none">{currentTime || '--:--:--'}</span>
                <span className="text-[9px] font-bold text-[#60758A] uppercase tracking-wider capitalize">{currentDate}</span>
              </div>
            </div>

            {/* Expandir / Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#EAF4FF] text-[#1652A3] border-2 border-[#C9DDF0] text-[11px] font-black transition-all shadow-2xs cursor-pointer active:scale-95"
              title={isFullscreen ? "Sair da Tela Cheia" : "Expandir Tela Cheia"}
            >
              {isFullscreen ? (
                <>
                  <Minimize className="w-3.5 h-3.5 text-[#2676D9]" />
                  <span className="text-[10px]">Reduzir</span>
                </>
              ) : (
                <>
                  <Maximize className="w-3.5 h-3.5 text-[#2676D9]" />
                  <span className="text-[10px]">Expandir</span>
                </>
              )}
            </button>
          </div>

          {/* Botão da TV / Painel da Sala de Missões */}
          <button
            onClick={() => {
              if (onOpenTvMode) onOpenTvMode();
              else onTabChange('painel-tv');
              if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-[#FEF8EA] hover:bg-[#FCE09D]/60 text-[#945E00] border-2 border-[#FCE09D] text-xs font-black transition-all shadow-2xs cursor-pointer group active:scale-95"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-xl bg-[#F6B928] text-[#18324A] flex items-center justify-center border border-[#D68E08] group-hover:scale-110 transition-transform">
                <Tv className="w-3.5 h-3.5 text-[#18324A]" />
              </div>
              <span className="tracking-tight font-black">Painel TV da Sala</span>
            </div>
            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#F6B928] text-[#18324A] border border-[#D68E08] shadow-2xs">
              16:9
            </span>
          </button>
        </div>

        {/* 2. ALTERNÂNCIA DE PERFIL / TELA DENTRO DO MENU */}
        {setCurrentRole && (
          <div className="space-y-1.5">
            <div className="px-1 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#60758A]">
              <span>Alternar Visão</span>
              <span className="text-[9px] text-[#2676D9] font-bold lowercase">
                {currentRole === 'aluno' ? 'estudante' : currentRole === 'coordenacao' ? 'gestão' : 'docente'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1 bg-[#EAF4FF] p-1 rounded-2xl border-2 border-[#C9DDF0]">
              <button
                onClick={() => setCurrentRole('professor')}
                className={`py-1.5 px-2 text-[11px] font-black rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  currentRole === 'professor'
                    ? 'bg-[#2676D9] text-white shadow-2xs'
                    : 'text-[#1652A3] hover:text-[#18324A]'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span className="text-[10px] leading-none">Prof</span>
              </button>

              <button
                onClick={() => setCurrentRole('aluno')}
                className={`py-1.5 px-2 text-[11px] font-black rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  currentRole === 'aluno'
                    ? 'bg-[#2676D9] text-white shadow-2xs'
                    : 'text-[#1652A3] hover:text-[#18324A]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span className="text-[10px] leading-none">Aluno</span>
              </button>

              <button
                onClick={() => setCurrentRole('coordenacao')}
                className={`py-1.5 px-2 text-[11px] font-black rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
                  currentRole === 'coordenacao'
                    ? 'bg-[#2676D9] text-white shadow-2xs'
                    : 'text-[#1652A3] hover:text-[#18324A]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="text-[10px] leading-none">Coord</span>
              </button>
            </div>

            {/* SELETOR DE ESTUDANTE NO MODO ALUNO */}
            {currentRole === 'aluno' && students.length > 0 && setSelectedStudent && (
              <div className="relative mt-1.5">
                <button
                  onClick={() => setIsStudentSelectorOpen(!isStudentSelectorOpen)}
                  className="w-full flex items-center justify-between p-2 rounded-2xl bg-white hover:bg-[#EAF4FF] border-2 border-[#C9DDF0] text-xs transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    {selectedStudent?.avatarUrl ? (
                      <img src={selectedStudent.avatarUrl} alt="" className="w-5 h-5 rounded-md object-cover border border-[#C9DDF0]" />
                    ) : (
                      <span className="text-xs">{selectedStudent?.avatar || '🌟'}</span>
                    )}
                    <span className="font-black text-[#18324A] text-[11px] truncate">{selectedStudent?.name || 'Selecionar Aluno'}</span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#2676D9] shrink-0" />
                </button>

                {isStudentSelectorOpen && (
                  <div className="mt-1 p-1 bg-white border-2 border-[#C9DDF0] rounded-2xl shadow-xl space-y-1 max-h-36 overflow-y-auto">
                    {students.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          setSelectedStudent(st);
                          setIsStudentSelectorOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left rounded-xl text-xs transition-colors ${
                          selectedStudent?.id === st.id ? 'bg-[#FEF8EA] text-[#945E00] font-black' : 'text-[#18324A] hover:bg-[#F6FAFF]'
                        }`}
                      >
                        <span className="truncate font-bold">{st.name}</span>
                        <span className="text-[9px] text-[#D68E08] font-black">Nv.{st.level}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* 3. SELETOR DE TURMA DENTRO DO MENU LATERAL */}
        {currentRole !== 'aluno' && (
          <div className="space-y-1">
            <div className="px-1 text-[10px] font-black uppercase tracking-widest text-[#60758A]">Turma Ativa</div>
            <div className="relative">
              <button
                onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                className="w-full flex items-center justify-between px-3 py-2 bg-white hover:bg-[#EAF4FF] border-2 border-[#C9DDF0] rounded-2xl text-xs font-black text-[#1652A3] transition-colors"
              >
                <span>{selectedClass}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#2676D9]" />
              </button>

              {isClassDropdownOpen && (
                <div className="mt-1 p-1 bg-white border-2 border-[#C9DDF0] rounded-2xl shadow-xl space-y-1">
                  {['Turma 5º ano A', 'Turma 5º ano B', 'Turma 4º ano A', 'Turma 4º ano B'].map((cls) => (
                    <button
                      key={cls}
                      onClick={() => {
                        setSelectedClass(cls);
                        setIsClassDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                        selectedClass === cls ? 'bg-[#EAF4FF] text-[#1652A3] font-black' : 'text-[#18324A] hover:bg-[#F6FAFF]'
                      }`}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. NAVEGAÇÃO PRINCIPAL / ITENS DE ROTA */}
        <div className="space-y-1 pt-1">
          <div className="px-1 text-[10px] font-black uppercase tracking-widest text-[#60758A]">
            {currentRole === 'aluno' ? 'Área do Aluno' : currentRole === 'coordenacao' ? 'Coordenação' : 'Navegação'}
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-[#2676D9] text-white shadow-md shadow-[#2676D9]/25'
                      : 'text-[#18324A] hover:text-[#1652A3] hover:bg-[#EAF4FF]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#60758A] group-hover:text-[#2676D9]'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${item.badgeColor || (isActive ? 'bg-white/25 text-white' : 'bg-[#EAF4FF] text-[#1652A3] border border-[#C9DDF0]')}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* 5. Mini Motivational / Status Footer Card */}
      <div className="pt-3 border-t-2 border-[#C9DDF0]">
        <div className="p-3 rounded-2xl bg-[#F6FAFF] border-2 border-[#C9DDF0] text-left space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-[#60758A] uppercase tracking-widest">
              {currentRole === 'aluno' ? 'Progresso Semanal' : 'Status da Turma'}
            </span>
            <span className="text-[11px] font-black font-mono text-[#19B9B0]">82%</span>
          </div>
          <div className="w-full bg-[#EAF4FF] rounded-full h-2 overflow-hidden border border-[#C9DDF0]">
            <div className="bg-gradient-to-r from-[#19B9B0] to-[#139E96] h-full rounded-full w-[82%] shadow-2xs"></div>
          </div>
          <div className="text-[10px] text-[#18324A] font-bold">
            {currentRole === 'aluno' ? '4 de 5 missões concluídas' : '28 de 32 alunos ativos hoje'}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR (Static on screens lg+) */}
      <aside className="hidden lg:flex w-64 bg-white border-2 border-[#C9DDF0] rounded-3xl p-4 shrink-0 flex-col justify-between shadow-2xs min-h-[calc(100vh-120px)] sticky top-20">
        {sidebarContent}
      </aside>

      {/* MOBILE / TABLET EXPANDED DRAWER (Slide-in Drawer) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-in fade-in duration-200">
          {/* Backdrop Blur Layer */}
          <div 
            className="fixed inset-0 bg-[#18324A]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white border-r-2 border-[#C9DDF0] p-4 shadow-xl overflow-y-auto flex flex-col justify-between animate-in slide-in-from-left duration-300">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
