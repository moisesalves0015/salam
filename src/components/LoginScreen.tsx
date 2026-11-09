import React, { useState } from 'react';
import { GraduationCap, LoaderCircle, Rocket, Sparkles, Users } from 'lucide-react';

export interface LoginScreenProps {
  onStaffLogin(email: string, password: string): Promise<void>;
  onStudentLogin(studentId: string, pin: string): Promise<void>;
  onPasswordReset?(email: string): Promise<void>;
  loading: boolean;
  error?: string | null;
  firebaseConfigured: boolean;
}

type LoginTab = 'staff' | 'student';

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onStaffLogin,
  onStudentLogin,
  onPasswordReset,
  loading,
  error,
  firebaseConfigured,
}) => {
  const [tab, setTab] = useState<LoginTab>('staff');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [pin, setPin] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const [notice, setNotice] = useState('');
  const unavailable = !firebaseConfigured;
  const disabled = loading || unavailable;

  const switchTab = (nextTab: LoginTab) => {
    setTab(nextTab);
    setResetMode(false);
    setNotice('');
  };

  const handleStaffSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) return;
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

  const handleStudentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) return;
    setNotice('');
    await onStudentLogin(studentId.trim(), pin);
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
          <h1 id="login-title" className="text-xl font-black text-slate-800">Que bom ter você por aqui!</h1>
          <p className="mt-1 text-sm font-medium text-slate-600">Entre para continuar sua jornada de missões.</p>
        </header>

        <div className="rounded-3xl border border-white/80 bg-white/90 p-5 shadow-xl shadow-indigo-900/10 backdrop-blur sm:p-7">
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1" role="tablist" aria-label="Tipo de acesso">
            <button type="button" role="tab" id="staff-tab" aria-selected={tab === 'staff'} aria-controls="staff-panel" onClick={() => switchTab('staff')} className={`min-h-11 rounded-xl px-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123cc4] focus-visible:ring-offset-2 ${tab === 'staff' ? 'bg-white text-[#123cc4] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
              Equipe escolar
            </button>
            <button type="button" role="tab" id="student-tab" aria-selected={tab === 'student'} aria-controls="student-panel" onClick={() => switchTab('student')} className={`min-h-11 rounded-xl px-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123cc4] focus-visible:ring-offset-2 ${tab === 'student' ? 'bg-white text-[#123cc4] shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
              Aluno
            </button>
          </div>

          {!firebaseConfigured && (
            <p className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2.5 text-sm font-medium text-amber-900" role="status">
              O acesso está temporariamente indisponível porque a autenticação não está configurada. Tente novamente mais tarde.
            </p>
          )}
          {error && <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-800" role="alert">{error}</p>}
          {notice && <p className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800" role="status">{notice}</p>}
          {loading && <p className="mb-4 flex items-center gap-2 text-sm font-medium text-[#123cc4]" role="status"><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />Verificando seus dados…</p>}

          {tab === 'staff' ? (
            <section id="staff-panel" role="tabpanel" aria-labelledby="staff-tab">
              <form className="space-y-4" onSubmit={handleStaffSubmit}>
                <div>
                  <label htmlFor="staff-email" className="mb-1.5 block text-sm font-bold text-slate-700">E-mail</label>
                  <input id="staff-email" name="email" type="email" autoComplete="username" inputMode="email" required disabled={disabled} value={email} onChange={event => setEmail(event.target.value)} placeholder="voce@escola.edu.br" className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 focus-visible:border-[#123cc4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/15 disabled:cursor-not-allowed disabled:bg-slate-100" />
                </div>
                {!resetMode && <div>
                  <label htmlFor="staff-password" className="mb-1.5 block text-sm font-bold text-slate-700">Senha</label>
                  <input id="staff-password" name="password" type="password" autoComplete="current-password" required disabled={disabled} value={password} onChange={event => setPassword(event.target.value)} className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 focus-visible:border-[#123cc4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/15 disabled:cursor-not-allowed disabled:bg-slate-100" />
                </div>}
                <button type="submit" disabled={disabled || (resetMode && !onPasswordReset)} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#123cc4] to-[#05148d] px-4 font-black text-white shadow-lg shadow-blue-600/20 transition hover:from-[#0f32a6] hover:to-[#040e6b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-55">
                  {loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Sparkles className="h-4 w-4" aria-hidden="true" />}
                  {resetMode ? 'Enviar instruções' : 'Entrar na Sala de Missões'}
                </button>
              </form>
              {onPasswordReset && <button type="button" disabled={disabled} onClick={() => { setResetMode(!resetMode); setNotice(''); }} className="mt-4 w-full rounded-lg py-1 text-center text-sm font-bold text-[#123cc4] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#123cc4] disabled:cursor-not-allowed disabled:opacity-55">
                {resetMode ? 'Voltar ao login' : 'Esqueceu a senha?'}
              </button>}
              {resetMode && <p className="mt-2 text-center text-xs text-slate-500">Informe o e-mail da sua conta para solicitar a redefinição.</p>}
            </section>
          ) : (
            <section id="student-panel" role="tabpanel" aria-labelledby="student-tab">
              <form className="space-y-4" onSubmit={handleStudentSubmit}>
                <div>
                  <label htmlFor="student-id" className="mb-1.5 block text-sm font-bold text-slate-700">Identificação do aluno</label>
                  <input id="student-id" name="studentId" type="text" autoComplete="username" required disabled={disabled} value={studentId} onChange={event => setStudentId(event.target.value)} placeholder="Digite sua identificação" className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 focus-visible:border-[#123cc4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/15 disabled:cursor-not-allowed disabled:bg-slate-100" />
                </div>
                <div>
                  <label htmlFor="student-pin" className="mb-1.5 block text-sm font-bold text-slate-700">PIN ou código de acesso</label>
                  <input id="student-pin" name="pin" type="password" autoComplete="current-password" inputMode="numeric" required disabled={disabled} value={pin} onChange={event => setPin(event.target.value)} className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-900 focus-visible:border-[#123cc4] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/15 disabled:cursor-not-allowed disabled:bg-slate-100" />
                </div>
                <button type="submit" disabled={disabled} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#123cc4] to-[#05148d] px-4 font-black text-white shadow-lg shadow-blue-600/20 transition hover:from-[#0f32a6] hover:to-[#040e6b] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-55">
                  {loading ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <GraduationCap className="h-5 w-5" aria-hidden="true" />}
                  Entrar na Sala de Missões
                </button>
              </form>
            </section>
          )}
        </div>

        <footer className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-600">
          <Users className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>Ciep Metalúrgico Benedito Cerqueira • 4º e 5º Anos</span>
        </footer>
      </section>
    </main>
  );
};
