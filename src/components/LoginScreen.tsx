import React, { useState } from 'react';
import { GraduationCap, LoaderCircle, Rocket, Search, Sparkles, Users } from 'lucide-react';
import type { Student } from '../types';

export interface LoginScreenProps {
  students: Student[];
  onDemoStudentLogin(student: Student): void;
  onStaffLogin(email: string, password: string): Promise<void>;
  onPasswordReset?(email: string): Promise<void>;
  loading: boolean;
  error?: string | null;
  firebaseConfigured: boolean;
}

type LoginTab = 'staff' | 'student';

export const LoginScreen: React.FC<LoginScreenProps> = ({
  students,
  onDemoStudentLogin,
  onStaffLogin,
  onPasswordReset,
  loading,
  error,
  firebaseConfigured,
}) => {
  const [tab, setTab] = useState<LoginTab>('staff');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentQuery, setStudentQuery] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const [notice, setNotice] = useState('');
  const staffDisabled = loading || !firebaseConfigured;
  const visibleStudents = students.filter(student => `${student.name} ${student.classroom}`.toLocaleLowerCase().includes(studentQuery.toLocaleLowerCase()));

  const switchTab = (nextTab: LoginTab) => {
    setTab(nextTab);
    setResetMode(false);
    setNotice('');
  };

  const handleStaffSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (staffDisabled) return;
    setNotice('');
    if (resetMode) {
      if (!onPasswordReset) return;
      await onPasswordReset(email.trim());
      setNotice('Se a solicitação for válida, você receberá instruções para redefinir sua senha.');
      setResetMode(false);
      return;
    }
    await onStaffLogin(email.trim(), password);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,#ffffff_0%,#e0e7ff_100%)] p-4 sm:p-6">
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-40 h-[400px] w-[400px] rounded-full bg-blue-400/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -right-20 h-[300px] w-[300px] rounded-full bg-indigo-400/20 blur-3xl" />

      <section className="relative z-10 w-full max-w-md" aria-labelledby="login-title">
        <header className="mb-7 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#123cc4] to-[#05148d] shadow-lg shadow-blue-600/30">
              <Rocket className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <div className="text-left">
              <div className="text-lg font-black tracking-wide text-[#00067a]">SALA DE MISSÕES</div>
              <div className="text-xs font-bold text-[#123cc4]">Portal de entrada</div>
            </div>
          </div>
          <h1 id="login-title" className="text-xl font-black text-slate-800">Quem vai embarcar nessa aventura?</h1>
        </header>

        <div className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-xl shadow-indigo-900/10 backdrop-blur sm:p-7">
          <div className="mb-6 space-y-3" role="tablist" aria-label="Tipo de acesso">
            <button type="button" role="tab" id="staff-tab" aria-selected={tab === 'staff'} aria-controls="staff-panel" onClick={() => switchTab('staff')} className={`group flex min-h-[72px] w-full items-center gap-4 rounded-3xl border p-4 text-left shadow-sm transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 ${tab === 'staff' ? 'border-[#123cc4] bg-[#EAF4FF] shadow-md' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'}`}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#123cc4] to-[#05148d] text-white shadow-lg shadow-blue-600/20"><Users className="h-6 w-6" aria-hidden="true" /></span>
              <span className="min-w-0 flex-1"><span className="block text-base font-black text-slate-800">Equipe escolar</span><span className="mt-0.5 block text-xs font-medium text-slate-500">Professores e coordenação</span></span>
              <span className="rounded-full border border-[#C9DDF0] bg-white px-2 py-0.5 text-[10px] font-bold text-[#123cc4]">Acesso seguro</span>
            </button>
            <button type="button" role="tab" id="student-tab" aria-selected={tab === 'student'} aria-controls="student-panel" onClick={() => switchTab('student')} className={`group flex min-h-[72px] w-full items-center gap-4 rounded-3xl border p-4 text-left shadow-sm transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 ${tab === 'student' ? 'border-[#123cc4] bg-[#EAF4FF] shadow-md' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'}`}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-700 text-white shadow-lg shadow-indigo-600/20"><GraduationCap className="h-6 w-6" aria-hidden="true" /></span>
              <span className="min-w-0 flex-1"><span className="block text-base font-black text-slate-800">Aluno</span><span className="mt-0.5 block text-xs font-medium text-slate-500">Clique no seu nome para entrar</span></span>
              <span className="rounded-full border border-[#C9DDF0] bg-white px-2 py-0.5 text-[10px] font-bold text-[#123cc4]">Missões</span>
            </button>
          </div>

          {error && <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-800" role="alert">{error}</p>}
          {notice && <p className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800" role="status">{notice}</p>}
          {loading && <p className="mb-4 flex items-center gap-2 text-sm font-medium text-[#123cc4]" role="status"><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />Verificando seus dados…</p>}

          {tab === 'staff' ? (
            <section id="staff-panel" role="tabpanel" aria-labelledby="staff-tab">
              {!firebaseConfigured && <p className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2.5 text-sm font-medium text-amber-900" role="status">O login da equipe escolar exige Firebase Authentication configurado.</p>}
              <form className="space-y-4" onSubmit={handleStaffSubmit}>
                <div>
                  <label htmlFor="staff-email" className="mb-1.5 block text-sm font-bold text-slate-700">E-mail</label>
                  <input id="staff-email" name="email" type="email" autoComplete="username" inputMode="email" required disabled={staffDisabled} value={email} onChange={event => setEmail(event.target.value)} placeholder="voce@escola.edu.br" className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 focus-visible:border-[#123cc4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/15 disabled:cursor-not-allowed disabled:bg-slate-100" />
                </div>
                {!resetMode && <div>
                  <label htmlFor="staff-password" className="mb-1.5 block text-sm font-bold text-slate-700">Senha</label>
                  <input id="staff-password" name="password" type="password" autoComplete="current-password" required disabled={staffDisabled} value={password} onChange={event => setPassword(event.target.value)} className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 focus-visible:border-[#123cc4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/15 disabled:cursor-not-allowed disabled:bg-slate-100" />
                </div>}
                <button type="submit" disabled={staffDisabled || (resetMode && !onPasswordReset)} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#123cc4] to-[#05148d] px-4 font-black text-white shadow-lg shadow-blue-600/20 transition hover:from-[#0f32a6] hover:to-[#040e6b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-55">
                  {loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
                  {resetMode ? 'Enviar instruções' : 'Entrar na Sala de Missões'}
                </button>
              </form>
              {onPasswordReset && <button type="button" disabled={staffDisabled} onClick={() => { setResetMode(!resetMode); setNotice(''); }} className="mt-4 w-full rounded-lg py-1 text-center text-sm font-bold text-[#123cc4] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123cc4] disabled:cursor-not-allowed disabled:opacity-55">
                {resetMode ? 'Voltar ao login' : 'Esqueceu a senha?'}
              </button>}
              {resetMode && <p className="mt-2 text-center text-xs text-slate-500">Informe o e-mail da sua conta para solicitar a redefinição.</p>}
            </section>
          ) : (
            <section id="student-panel" role="tabpanel" aria-labelledby="student-tab">
              <p className="mb-3 text-sm font-medium text-slate-600">Escolha seu nome para entrar na demonstração. Não precisa de PIN.</p>
              <label className="relative mb-4 block"><span className="sr-only">Pesquisar aluno</span><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" /><input type="search" value={studentQuery} onChange={event => setStudentQuery(event.target.value)} placeholder="Pesquisar seu nome..." className="min-h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-4 text-base text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-[#123cc4] focus:outline-none focus:ring-4 focus:ring-blue-500/10" /></label>
              <div className="grid max-h-[45vh] grid-cols-2 gap-3 overflow-y-auto p-1 sm:grid-cols-3">
                {visibleStudents.map(student => <button key={student.id} type="button" disabled={loading} onClick={() => onDemoStudentLogin(student)} className="group flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-[#123cc4] hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:opacity-60">
                  <span className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-full border-2 border-blue-100 bg-blue-50 text-2xl group-hover:border-[#123cc4]">{student.avatar || <GraduationCap className="h-7 w-7 text-[#123cc4]" />}{student.avatarUrl && <img src={student.avatarUrl} alt="" loading="lazy" onError={event => { event.currentTarget.style.display = 'none'; }} className="absolute inset-0 h-full w-full object-cover" />}</span>
                  <span className="min-w-0 w-full"><span className="block truncate text-sm font-black text-slate-800">{student.name}</span><span className="block truncate text-[10px] font-bold text-slate-500">{student.classroom}</span></span>
                  <span className="rounded-full bg-[#EAF4FF] px-3 py-1 text-[10px] font-black text-[#123cc4]">Entrar</span>
                </button>)}
              </div>
              {visibleStudents.length === 0 && <p className="py-6 text-center text-sm text-slate-500">Nenhum aluno encontrado.</p>}
              <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">Modo demonstração: esta entrada não usa Firebase e não acessa nem grava dados reais.</p>
            </section>
          )}
        </div>

        <footer className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-600">
          <Users className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Ciep Metalúrgico Benedito Cerqueira • 4º e 5º Anos • Escola Pública</span>
        </footer>
      </section>
    </main>
  );
};
