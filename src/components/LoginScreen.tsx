import React, { useState } from 'react';
import { GraduationCap, Search, Sparkles } from 'lucide-react';
import type { Student } from '../types';

export interface LoginScreenProps {
  students: Student[];
  onDemoStudentLogin(student: Student): void;
  loading: boolean;
  error?: string | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ students, onDemoStudentLogin, loading, error }) => {
  const [query, setQuery] = useState('');
  const filteredStudents = students.filter(student => `${student.name} ${student.classroom}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()));

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,#e8f1ff_0%,#f8faff_44%,#f1f5ff_100%)] px-4 py-8 sm:px-6">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-36 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-indigo-300/20 blur-3xl" />

      <section className="relative z-10 w-full max-w-3xl" aria-labelledby="login-title">
        <header className="mb-5 text-center sm:mb-8">
          <div className="mb-4 inline-flex items-center gap-3 rounded-2xl border border-white/80 bg-white/75 px-4 py-3 shadow-sm backdrop-blur">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#123cc4] to-[#05148d] text-white shadow-md shadow-blue-900/20"><Sparkles size={22} aria-hidden="true" /></span>
            <span className="text-left"><span className="block text-[11px] font-black uppercase tracking-[.18em] text-[#123cc4]">SALA DE</span><span className="block font-[Outfit] text-xl font-black leading-none tracking-tight text-[#05148d]">MISSÕES</span></span>
          </div>
          <h1 id="login-title" className="font-[Outfit] text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">Quem vai entrar hoje?</h1>
          <p className="mx-auto mb-0 mt-2 max-w-md text-sm leading-relaxed text-slate-600">Escolha seu cartão para começar sua jornada.</p>
        </header>

        <div className="rounded-[24px] border border-white/90 bg-white/85 p-3 shadow-xl shadow-blue-950/[.06] backdrop-blur sm:rounded-[28px] sm:p-7">
          <div className="mb-4 flex flex-col gap-2 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="mb-0 font-[Outfit] text-lg font-bold text-slate-900">Alunos</h2><p className="mb-0 mt-0.5 text-xs text-slate-500">Toque no seu nome para entrar</p></div>
            <label className="relative block w-full sm:max-w-xs"><span className="sr-only">Buscar aluno</span><Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar aluno..." className="min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-[#123cc4] focus:bg-white focus:ring-4 focus:ring-blue-500/10" /></label>
          </div>

          {error && <p role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{error}</p>}

          {filteredStudents.length > 0 ? <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {filteredStudents.map((student, index) => <button key={student.id} type="button" disabled={loading} onClick={() => onDemoStudentLogin(student)} aria-label={`Entrar como ${student.name}`} className="group flex aspect-square min-w-0 flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-2 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/[.08] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:cursor-wait disabled:opacity-60 sm:gap-2 sm:rounded-3xl sm:p-3">
              <span className={`relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br ${index % 2 === 0 ? 'from-blue-50 to-indigo-100' : 'from-violet-50 to-blue-100'} text-xl sm:h-16 sm:w-16 sm:text-3xl`}>
                {student.avatar || <GraduationCap className="h-7 w-7 text-[#123cc4]" aria-hidden="true" />}
                {student.avatarUrl && <img src={student.avatarUrl} alt="" loading="lazy" onError={event => { event.currentTarget.style.display = 'none'; }} className="absolute inset-0 h-full w-full object-cover" />}
              </span>
              <span className="w-full min-w-0"><span className="block truncate font-[Outfit] text-xs font-bold text-slate-900 sm:text-sm">{student.name}</span><span className="mt-0.5 hidden truncate text-[11px] font-medium text-slate-500 sm:block">{student.classroom}</span></span>
              <span className="mt-0.5 rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-black text-[#123cc4] transition group-hover:bg-[#123cc4] group-hover:text-white sm:text-[10px]">Entrar</span>
            </button>)}
          </div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center"><GraduationCap className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" /><p className="mb-0 mt-2 text-sm font-semibold text-slate-600">Nenhum aluno encontrado.</p></div>}

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-xs leading-relaxed text-amber-950"><span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-200 font-black">i</span><p className="mb-0"><strong>Modo demonstração.</strong> A entrada é local e não usa Firebase; não carrega nem grava dados reais.</p></div>
        </div>

        <footer className="mt-5 text-center text-xs font-medium text-slate-500">Ciep Metalúrgico Benedito Cerqueira · 4º e 5º anos</footer>
      </section>
    </main>
  );
};
