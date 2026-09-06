import React, { useState } from 'react';
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
  X, 
  ChevronDown
} from 'lucide-react';
import { UserRole, Student } from '../types';

interface SidebarProps {
  currentRole: UserRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenMission?: () => void;
  onOpenCards?: () => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
  selectedStudent?: Student;
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
  activeTab,
  onTabChange,
  onOpenMission,
  onOpenCards,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen,
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('Turma 5º ano A');
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState<boolean>(false);

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
    { id: 'alunos', label: 'Alunos & Prontuários', icon: Users },
    { id: 'missoes', label: 'Missões & BNCC', icon: Flag },
    { id: 'trilhas', label: 'Trilhas de Aprendizagem', icon: GitBranch },
    { id: 'intervencoes', label: 'Intervenções Docentes', icon: Calendar },
    { id: 'relatorios', label: 'Relatórios & Memória', icon: BarChart3 },
    { id: 'reconhecimento', label: 'Reconhecimento & Cert.', icon: Trophy, badge: 'Novo', badgeColor: 'bg-purple-100 text-purple-700 border border-purple-200' },
    { id: 'cards', label: 'Álbum de Cards', icon: Star },
  ];

  const alunoNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Minha Jornada', icon: Compass },
    { id: 'proxima-missao', label: 'Próxima Missão', icon: Rocket, action: onOpenMission },
    { id: 'trilhas', label: 'Minhas Trilhas', icon: Map },
    { id: 'cards', label: 'Meus Cards', icon: Star, action: onOpenCards },
    { id: 'conquistas', label: 'Conquistas & Selos', icon: Trophy },
    { id: 'loja', label: 'Loja de Moedas', icon: Activity, badge: 'Novo', badgeColor: 'bg-amber-100 text-amber-700 border border-amber-200' },
    { id: 'relatorios', label: 'Minha Evolução', icon: BarChart3 },
  ];

  const coordenacaoNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Visão Institucional', icon: Building2 },
    { id: 'alunos', label: 'Turmas & Alunos', icon: Users },
    { id: 'relatorios', label: 'Relatórios & Memória', icon: FileSpreadsheet },
    { id: 'trilhas', label: 'Matriz Curricular', icon: GitBranch },
    { id: 'reconhecimento', label: 'Reconhecimentos', icon: Trophy, badge: 'Novo', badgeColor: 'bg-amber-100 text-amber-700 border border-amber-200' },
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

        {/* SELETOR DE TURMA DENTRO DO MENU LATERAL */}
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

        {/* NAVEGAÇÃO PRINCIPAL / ITENS DE ROTA */}
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

      {/* Mini Motivational / Status Footer Card */}
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
