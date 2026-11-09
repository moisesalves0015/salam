import React from 'react';
import { Rocket, Bell, ChevronDown, Compass, Menu, X } from 'lucide-react';
import { UserRole, Student } from '../types';

interface HeaderProps {
  currentRole: UserRole;
  userName: string;
  userEmail?: string;
  selectedStudent?: Student;
  onOpenNotifications: () => void;
  onLogout: () => void;
  unreadCount?: number;
  classroomName?: string;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((part) => part[0]).join('').toLocaleUpperCase();
};

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  userName,
  userEmail,
  selectedStudent,
  onOpenNotifications,
  onLogout,
  unreadCount,
  classroomName,
  isMobileMenuOpen = false,
  setIsMobileMenuOpen,
}) => {
  const displayName = currentRole === 'aluno' ? (selectedStudent?.name || userName) : userName;
  const initials = getInitials(displayName);
  const roleLabel = currentRole === 'aluno' ? 'Aluno' : currentRole === 'coordenacao' ? 'Coordenação' : currentRole === 'admin' ? 'Administração' : 'Professor';

  return (
    <header className="sticky top-2 sm:top-4 z-40 mx-2 sm:mx-4 lg:mx-8 bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl px-3 sm:px-5 py-2.5 flex items-center justify-between gap-2 sm:gap-4 transition-all shadow-md safe-mt">
      <div className="flex items-center gap-2.5 sm:gap-4 lg:gap-6 shrink-0">
        {setIsMobileMenuOpen && (
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 sm:p-2 -ml-1 rounded-2xl bg-white/90 hover:bg-white text-slate-700 border border-slate-200/80 transition-all lg:hidden flex items-center justify-center cursor-pointer active:scale-95 shadow-2xs"
            aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={isMobileMenuOpen}
            title={isMobileMenuOpen ? 'Fechar menu lateral' : 'Abrir menu lateral'}
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />}
          </button>
        )}

        <div className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-tr from-[#123cc4] to-[#05148d] rounded-full flex items-center justify-center font-bold text-sm text-white shadow-xs shrink-0">
            {currentRole === 'aluno' ? <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-[#123cc4] uppercase">SALA DE</span>
            </div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-[#00067a] leading-tight">MISSÕES</h1>
          </div>
        </div>

        {classroomName && (
          <div className="hidden md:block bg-[#EAF4FF] text-[#1652A3] px-3.5 py-1.5 rounded-2xl border-2 border-[#C9DDF0] text-xs font-black" aria-label={`Turma: ${classroomName}`}>
            {classroomName}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onOpenNotifications}
          className="relative p-1.5 sm:p-2 rounded-2xl bg-white/90 hover:bg-white text-slate-700 border border-slate-200/80 transition-all cursor-pointer shadow-2xs active:scale-95"
          title="Notificações"
          aria-label={typeof unreadCount === 'number' && unreadCount > 0 ? `Notificações, ${unreadCount} não lidas` : 'Notificações'}
        >
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          {typeof unreadCount === 'number' && unreadCount > 0 && (
            <span aria-hidden="true" className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#E85D63] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2.5 bg-white/60 px-2 sm:px-3 py-1.5 rounded-3xl border border-white/90 shadow-2xs" title={userEmail || undefined}>
          <div aria-hidden="true" className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dbeafe] to-[#c7d2fe] flex items-center justify-center text-[#123cc4] font-black text-[10px] border-2 border-white ring-2 ring-[#123cc4] shadow-2xs">
            {initials || <span>{currentRole === 'aluno' ? <Compass className="w-4 h-4" /> : <Rocket className="w-4 h-4" />}</span>}
          </div>
          <div className="text-left hidden md:block max-w-40">
            <div className="text-xs font-black text-slate-900 leading-tight truncate">{displayName}</div>
            <div className="text-[10px] text-slate-500 font-bold leading-none mt-0.5 truncate">{userEmail || roleLabel}</div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5 hidden sm:block" aria-hidden="true" />
          <button
            type="button"
            onClick={onLogout}
            className="ml-1 rounded-xl px-2 py-1 text-[10px] sm:text-xs font-bold text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123cc4]"
            aria-label="Sair da conta"
            title="Sair"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};
