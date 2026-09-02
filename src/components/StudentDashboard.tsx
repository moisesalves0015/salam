import React from 'react';
import { 
  Flame, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Calculator, 
  FlaskConical, 
  Check, 
  Compass, 
  Trophy, 
  Star, 
  Rocket, 
  Binoculars, 
  Footprints, 
  FileText, 
  Mountain, 
  Zap,
  ChevronRight
} from 'lucide-react';
import { Student, Mission, CardItem } from '../types';

interface StudentDashboardProps {
  student: Student;
  mission: Mission;
  unlockedCard?: CardItem;
  onStartMission: () => void;
  onViewCard: (card: CardItem) => void;
  onViewAchievements: () => void;
  onViewTrails: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  mission,
  unlockedCard,
  onStartMission,
  onViewCard,
  onViewAchievements,
  onViewTrails,
}) => {
  const currentCard: CardItem = unlockedCard || {
    id: 'card-guardiao-divisao',
    name: 'Guardião da Divisão',
    description: 'Conquistado ao demonstrar que dividir é distribuir em partes iguais sem sobras.',
    rarity: 'epico',
    subject: 'Matemática',
    icon: '÷',
    unlocked: true,
    unlockedAt: 'Hoje',
    lore: 'A chave para repartir com sabedoria em qualquer reino.'
  };

  const xpPercent = student ? Math.round((student.currentXp / (student.nextLevelXp || 1000)) * 100) : 75;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* TOP ROW: STUDENT XP PROFILE HERO + 3 CIRCULAR SUBJECT GAUGES             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Hero: Student Profile, Level & XP Tracker (col 5) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-50/90 via-purple-50/70 to-pink-50/60 p-5 sm:p-6 rounded-3xl border-2 border-indigo-200/80 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
          
          <div>
            {/* Header: Avatar, Name & Level */}
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <img 
                  src={student.avatarUrl || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'} 
                  alt={student.name} 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400 shadow-md shadow-indigo-500/20"
                />
                <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black border border-white shadow-xs">
                  NV {student.level}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Olá, {student.name}!
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold">
                    {student.classroom}
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-semibold mt-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Explorador de Alto Nível • Sala de Missões</span>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mt-5 space-y-1.5 relative z-10">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  Progresso de Experiência
                </span>
                <span className="font-mono font-bold text-purple-700">{xpPercent}%</span>
              </div>
              
              <div className="h-3.5 w-full bg-white rounded-full p-0.5 overflow-hidden border border-purple-200 shadow-inner">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 transition-all duration-1000 shadow-xs"
                  style={{ width: `${Math.min(100, Math.max(5, xpPercent))}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] pt-0.5">
                <span className="font-mono font-black text-slate-900">{student.currentXp.toLocaleString('pt-BR')} XP</span>
                <span className="text-slate-500 font-medium">Próximo nível: <b className="text-slate-800 font-mono">{student.nextLevelXp.toLocaleString('pt-BR')} XP</b></span>
              </div>
            </div>
          </div>

          {/* Daily Streak Indicator */}
          <div className="relative z-10 pt-4 mt-4 border-t border-indigo-200/60 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-orange-100 border border-orange-300 flex items-center justify-center text-orange-600 shadow-xs">
                <Flame className="w-5 h-5 fill-orange-400 text-orange-500 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">Sequência: {student.streakDays} dias seguidos</div>
                <div className="text-[10px] text-slate-500">Continue firme na missão diária!</div>
              </div>
            </div>

            {/* Week Days Badges */}
            <div className="flex items-center gap-1.5">
              {student.weekDaysActive.map((d, i) => (
                <div 
                  key={i}
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black border transition-all ${
                    d.active
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-800 shadow-xs'
                      : d.isToday
                        ? 'bg-purple-100 border-purple-300 text-purple-800'
                        : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  {d.active ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : d.day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 3 Subject Rings: Português, Matemática, Ciências (col 7) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Português: 80% */}
          <div 
            onClick={onViewTrails}
            className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-cyan-400 cursor-pointer transition-all flex flex-col items-center justify-between text-center group shadow-sm hover:scale-[1.01]"
          >
            <div className="flex items-center gap-2.5 self-start text-xs font-bold text-slate-700">
              <div className="w-8 h-8 rounded-xl bg-cyan-100 border border-cyan-300 text-cyan-700 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-slate-900">Português</div>
                <div className="text-[10px] text-slate-500">Trilha da Leitura</div>
              </div>
            </div>

            {/* Cyan Donut Gauge */}
            <div className="relative w-24 h-24 my-3 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-500 stroke-current transition-all duration-1000"
                  strokeDasharray="80, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-slate-900 font-mono leading-none">80%</span>
                <span className="text-[8px] font-bold text-cyan-700 uppercase tracking-wider mt-0.5">Ótimo</span>
              </div>
            </div>

            <div className="text-xs text-slate-700">
              <div className="font-bold text-cyan-700">Muito bem!</div>
              <div className="text-slate-500 text-[11px] leading-tight mt-0.5">Fluência e interpretação em alta.</div>
            </div>
          </div>

          {/* Matemática: 60% */}
          <div 
            onClick={onViewTrails}
            className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-emerald-400 cursor-pointer transition-all flex flex-col items-center justify-between text-center group shadow-sm hover:scale-[1.01]"
          >
            <div className="flex items-center gap-2.5 self-start text-xs font-bold text-slate-700">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center">
                <Calculator className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-slate-900">Matemática</div>
                <div className="text-[10px] text-slate-500">Trilha dos Números</div>
              </div>
            </div>

            {/* Green Donut Gauge */}
            <div className="relative w-24 h-24 my-3 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500 stroke-current transition-all duration-1000"
                  strokeDasharray="60, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-slate-900 font-mono leading-none">60%</span>
                <span className="text-[8px] font-bold text-emerald-700 uppercase tracking-wider mt-0.5">Ativo</span>
              </div>
            </div>

            <div className="text-xs text-slate-700">
              <div className="font-bold text-emerald-700">No caminho certo!</div>
              <div className="text-slate-500 text-[11px] leading-tight mt-0.5">Desafio de agrupamento em foco.</div>
            </div>
          </div>

          {/* Ciências: 40% */}
          <div 
            onClick={onViewTrails}
            className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-amber-400 cursor-pointer transition-all flex flex-col items-center justify-between text-center group shadow-sm hover:scale-[1.01]"
          >
            <div className="flex items-center gap-2.5 self-start text-xs font-bold text-slate-700">
              <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center">
                <FlaskConical className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black text-slate-900">Ciências</div>
                <div className="text-[10px] text-slate-500">Trilha da Natureza</div>
              </div>
            </div>

            {/* Amber Donut Gauge */}
            <div className="relative w-24 h-24 my-3 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100 stroke-current"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-amber-500 stroke-current transition-all duration-1000"
                  strokeDasharray="40, 100"
                  strokeLinecap="round"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-slate-900 font-mono leading-none">40%</span>
                <span className="text-[8px] font-bold text-amber-700 uppercase tracking-wider mt-0.5">Explorando</span>
              </div>
            </div>

            <div className="text-xs text-slate-700">
              <div className="font-bold text-amber-700">Novas Descobertas!</div>
              <div className="text-slate-500 text-[11px] leading-tight mt-0.5">Experimentos e ecossistemas.</div>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MIDDLE ROW: PRÓXIMA MISSÃO HERO CARD + JORNADA DE APRENDIZADO             */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Próxima missão Card (col 5) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-purple-50 via-pink-50/70 to-amber-50/60 p-6 rounded-3xl border-2 border-purple-200/80 shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

          {/* Division Badge Top Right */}
          <div className="absolute top-5 right-5 w-12 h-14 bg-gradient-to-b from-purple-600 to-indigo-700 rounded-2xl flex flex-col items-center justify-center shadow-md border border-purple-300">
            <span className="text-white text-xl font-black font-mono leading-none">÷</span>
            <span className="text-[8px] text-purple-100 uppercase font-black tracking-widest mt-0.5">MAT</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider">
                Próxima Missão
              </span>
              <span className="text-xs text-slate-500 font-bold font-mono">+{mission.xpReward} XP</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
              {mission.title}
            </h3>

            <div className="mt-4 p-3.5 rounded-2xl bg-white/90 border border-purple-200 shadow-xs">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Objetivo Pedagógico</div>
              <p className="text-xs text-slate-800 mt-1 leading-relaxed font-medium">
                {mission.objective}
              </p>
            </div>
          </div>

          {/* Gamified Artwork Spotlight */}
          <div className="my-4 p-4 rounded-2xl bg-white border border-purple-100 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Trilha dos Números</div>
                <div className="text-[10px] text-slate-500">15 minutos estimados • Média</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs bg-amber-100 px-2.5 py-1 rounded-xl border border-amber-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>Card Épico</span>
            </div>
          </div>

          <button
            onClick={onStartMission}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-sm shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 group transition-all cursor-pointer hover:scale-[1.02]"
          >
            <span>Iniciar Missão Agora</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Sua jornada de aprendizado - Stepper 4 Passos (col 7) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-base font-black text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-purple-600" />
                <span>Sua Jornada de Aprendizado</span>
              </div>
              <span className="text-xs text-purple-800 font-bold px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200">
                Etapas Construtivas
              </span>
            </div>

            {/* Stepper with 4 phases */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-2">
              
              {/* Step 1: Explorar */}
              <div className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-200">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2 shadow-xs border border-indigo-200">
                  <Binoculars className="w-6 h-6" />
                </div>
                <div className="text-xs font-black text-indigo-900">1. Explorar</div>
                <div className="text-[10px] text-slate-600 mt-0.5">Entenda o desafio com pistas visuais</div>
              </div>

              {/* Step 2: Tentar */}
              <div className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 shadow-xs border border-emerald-200">
                  <Footprints className="w-6 h-6" />
                </div>
                <div className="text-xs font-black text-emerald-900">2. Tentar</div>
                <div className="text-[10px] text-slate-600 mt-0.5">Experimente e forme agrupamentos</div>
              </div>

              {/* Step 3: Revisar */}
              <div className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2 shadow-xs border border-amber-200">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="text-xs font-black text-amber-900">3. Revisar</div>
                <div className="text-[10px] text-slate-600 mt-0.5">Analise pistas e consolide a lógica</div>
              </div>

              {/* Step 4: Desafiar */}
              <div className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-purple-50/50 border border-purple-200">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2 shadow-xs border border-purple-200">
                  <Mountain className="w-6 h-6" />
                </div>
                <div className="text-xs font-black text-purple-900">4. Desafiar</div>
                <div className="text-[10px] text-slate-600 mt-0.5">Transfira para situações da vida real</div>
              </div>

            </div>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2">
            <span className="flex items-center gap-1.5 text-purple-700 font-semibold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Cada etapa constrói sua memória pedagógica de longo prazo
            </span>
            <button 
              onClick={onStartMission}
              className="text-xs text-purple-600 hover:text-purple-800 font-black cursor-pointer flex items-center gap-1"
            >
              <span>Começar etapa a etapa</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* BOTTOM ROW: UNLOCKED CARD + ACHIEVEMENTS + EXPLORER REFLECTION            */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Novo card desbloqueado (Guardião da Divisão) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 flex items-center gap-4 justify-between shadow-sm">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Visual Card Shield Preview */}
            <div className="w-16 h-22 rounded-2xl bg-gradient-to-b from-purple-100 to-indigo-50 p-1.5 border-2 border-purple-300 shadow-sm flex flex-col items-center justify-center shrink-0">
              <div className="w-8 h-8 rounded-xl bg-purple-600 border border-purple-400 flex items-center justify-center text-white text-base font-black font-mono shadow-xs">
                ÷
              </div>
              <span className="text-[8px] font-black text-purple-800 mt-1 uppercase tracking-wider">Épico</span>
            </div>

            <div className="min-w-0">
              <div className="text-xs font-black text-amber-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Novo card desbloqueado!</span>
              </div>
              <h4 className="text-sm font-black text-slate-900 truncate mt-0.5">{currentCard.name}</h4>
              <p className="text-xs text-slate-600 line-clamp-2 mt-0.5 font-medium">
                {currentCard.description}
              </p>
              <button
                onClick={() => onViewCard(currentCard)}
                className="text-xs text-purple-600 hover:text-purple-800 font-bold mt-2 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Ver álbum de cards</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Conquistas (12 desbloqueadas) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 flex flex-col justify-between shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-emerald-700 font-bold">Conquistas</div>
              <div className="text-xl font-black text-slate-900 mt-0.5">12 Desbloqueadas</div>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Cada conquista celebra sua persistência e crescimento!
              </p>
            </div>

            {/* Badges Cluster */}
            <div className="flex items-center -space-x-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center text-sm shadow-xs">
                <Trophy className="w-4 h-4" />
              </div>
              <div className="w-9 h-9 rounded-xl bg-purple-100 border border-purple-300 text-purple-700 flex items-center justify-center text-sm shadow-xs">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center text-sm shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-black text-slate-500 ml-3 font-mono">+8</span>
            </div>
          </div>

          <button
            onClick={onViewAchievements}
            className="w-full mt-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-emerald-800 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Abrir Mural de Conquistas</span>
          </button>
        </div>

        {/* Card 3: Reflexão do explorador */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 flex items-start gap-3.5 justify-between shadow-sm">
          <div className="min-w-0">
            <div className="text-xs font-bold text-cyan-700">Reflexão do Explorador</div>
            <h4 className="text-sm font-black text-slate-900 mt-0.5">
              Você evoluiu após a revisão!
            </h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
              Revisar faz parte da jornada. O erro é uma pista valiosa para aprender e construir novos caminhos!
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-cyan-100 border border-cyan-300 text-cyan-700 flex items-center justify-center shrink-0 shadow-xs">
            <Compass className="w-6 h-6" />
          </div>
        </div>

      </div>

    </div>
  );
};
