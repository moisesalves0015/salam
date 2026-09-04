import React, { useState, useEffect } from 'react';
import {
  Rocket,
  Star,
  BookOpen,
  Calculator,
  FlaskConical,
  Users,
  Trophy,
  Zap,
  Heart,
  Globe,
  Monitor,
  Printer,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Map,
  Target,
  GraduationCap,
  HeartHandshake,
  Palette,
  Music,
  Theater,
  Landmark,
  Brain,
  ChevronDown,
  Play,
  Award,
  Coins,
  Shield
} from 'lucide-react';

interface LandingPageProps {
  onEnterAsStudent: () => void;
  onEnterAsProfessor: () => void;
  onEnterAsCoordenacao: () => void;
}

const STATS = [
  { value: '4 Trilhas', label: 'de Aprendizagem', icon: Map, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { value: '60+', label: 'Missões Disponíveis', icon: Rocket, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
  { value: 'XP', label: 'Sistema de Progressão', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  { value: '100%', label: 'Pedagogia BNCC', icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
];

const TRAILS = [
  {
    icon: Calculator,
    name: 'Reino da Matemática',
    desc: 'Números, operações, geometria, raciocínio lógico e resolução de problemas.',
    color: 'from-emerald-500 to-teal-600',
    badge: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    missions: '18 Missões'
  },
  {
    icon: BookOpen,
    name: 'Jornada da Língua',
    desc: 'Leitura, interpretação, escrita criativa, oralidade e gramática contextualizada.',
    color: 'from-blue-500 to-indigo-600',
    badge: 'text-blue-700 bg-blue-50 border-blue-200',
    missions: '18 Missões'
  },
  {
    icon: FlaskConical,
    name: 'Ilha das Ciências',
    desc: 'Natureza, ecossistemas, experimentos, hipóteses e pensamento científico.',
    color: 'from-amber-500 to-orange-600',
    badge: 'text-amber-700 bg-amber-50 border-amber-200',
    missions: '12 Missões'
  },
  {
    icon: Palette,
    name: 'Mundo da Cultura',
    desc: 'Arte, literatura, música, teatro, história, diversidade e cidadania ativa.',
    color: 'from-purple-500 to-pink-600',
    badge: 'text-purple-700 bg-purple-50 border-purple-200',
    missions: '12 Missões'
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: Brain,
    title: 'Diagnóstico',
    desc: 'O estudante realiza um mapeamento inicial que identifica com precisão em qual etapa do aprendizado se encontra.',
    color: 'bg-purple-600',
    border: 'border-purple-200',
    bg: 'bg-purple-50'
  },
  {
    step: '02',
    icon: Map,
    title: 'Trilha Adaptada',
    desc: 'Com base no diagnóstico, é definido um percurso personalizado com missões, habilidades e objetivos claros.',
    color: 'bg-blue-600',
    border: 'border-blue-200',
    bg: 'bg-blue-50'
  },
  {
    step: '03',
    icon: Rocket,
    title: 'Missões',
    desc: 'Missões individuais, em dupla e em grupo — digitais e impressas — trabalhando conteúdo com contexto e significado.',
    color: 'bg-emerald-600',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50'
  },
  {
    step: '04',
    icon: Target,
    title: 'Tentativa & Revisão',
    desc: 'Errar faz parte. O sistema registra cada tentativa, oferece feedback específico e propõe revisão antes de avançar.',
    color: 'bg-orange-600',
    border: 'border-orange-200',
    bg: 'bg-orange-50'
  },
  {
    step: '05',
    icon: CheckCircle2,
    title: 'Domínio',
    desc: 'Após praticar, revisar e demonstrar a habilidade com autonomia, o professor confirma o domínio e o aluno avança.',
    color: 'bg-teal-600',
    border: 'border-teal-200',
    bg: 'bg-teal-50'
  },
  {
    step: '06',
    icon: Trophy,
    title: 'Conquista',
    desc: 'Cada avanço gera XP, moedas, cards colecionáveis e conquistas. O reconhecimento também acontece presencialmente na escola.',
    color: 'bg-amber-600',
    border: 'border-amber-200',
    bg: 'bg-amber-50'
  },
];

const GAMIFICATION_ITEMS = [
  {
    icon: Star,
    title: 'XP & Níveis',
    desc: 'Cada missão concluída gera pontos de experiência. Ao acumular XP, o estudante sobe de nível e desbloqueia novas missões.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200'
  },
  {
    icon: Coins,
    title: 'Moedas',
    desc: 'Moedas conquistadas ao completar missões podem ser trocadas por recompensas reais de baixo custo disponibilizadas pela escola.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  {
    icon: Trophy,
    title: 'Conquistas',
    desc: 'Medalhas por evolução, persistência, colaboração e domínio — valorizando muito mais que apenas acertar.',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  {
    icon: Shield,
    title: 'Cards Colecionáveis',
    desc: 'Cada habilidade dominada desbloqueia um card especial. Colecionar cards é parte da jornada de cada explorador.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200'
  },
];

const MISSION_TYPES = [
  {
    icon: Users,
    title: 'Individual',
    desc: 'O estudante explora, pratica e resolve missões em seu próprio ritmo, respeitando seu percurso de aprendizagem.',
    color: 'text-blue-600',
    bg: 'from-blue-50 to-blue-100/50',
    border: 'border-blue-200'
  },
  {
    icon: HeartHandshake,
    title: 'Em Dupla',
    desc: 'Dois exploradores colaboram numa missão, alternando papéis e chegando juntos a uma conclusão consensual.',
    color: 'text-emerald-600',
    bg: 'from-emerald-50 to-emerald-100/50',
    border: 'border-emerald-200'
  },
  {
    icon: Users,
    title: 'Em Grupo',
    desc: 'Equipes de 3 a 5 estudantes trabalham juntos em projetos e desafios que exigem divisão de tarefas e cooperação.',
    color: 'text-purple-600',
    bg: 'from-purple-50 to-purple-100/50',
    border: 'border-purple-200'
  },
  {
    icon: Printer,
    title: 'Atividades Impressas',
    desc: 'Toda missão possui uma versão para impressão, garantindo que nenhum estudante fique de fora por falta de acesso digital.',
    color: 'text-orange-600',
    bg: 'from-orange-50 to-orange-100/50',
    border: 'border-orange-200'
  },
];

const ROLES = [
  {
    icon: GraduationCap,
    role: 'Estudante',
    desc: 'Acompanhe sua jornada, missões, XP, moedas, conquistas e trilhas.',
    color: 'from-blue-600 to-indigo-600',
    action: 'onEnterAsStudent',
    label: 'Entrar como Aluno',
    badge: '4º e 5º Ano'
  },
  {
    icon: BookOpen,
    role: 'Professor(a)',
    desc: 'Monitore o progresso da turma, intervenha com precisão e acompanhe cada habilidade.',
    color: 'from-purple-600 to-pink-600',
    action: 'onEnterAsProfessor',
    label: 'Acessar como Professor',
    badge: 'Área Docente'
  },
  {
    icon: Globe,
    role: 'Coordenação',
    desc: 'Visualize o panorama geral do projeto, turmas, indicadores e reconhecimentos.',
    color: 'from-emerald-600 to-teal-600',
    action: 'onEnterAsCoordenacao',
    label: 'Acessar como Coordenação',
    badge: 'Gestão Pedagógica'
  },
];

const CULTURE_ITEMS = [
  { icon: BookOpen, label: 'Literatura' },
  { icon: Music, label: 'Música' },
  { icon: Theater, label: 'Teatro' },
  { icon: Palette, label: 'Artes' },
  { icon: Landmark, label: 'História' },
  { icon: Globe, label: 'Diversidade' },
  { icon: Heart, label: 'Cidadania' },
  { icon: Brain, label: 'Pensamento Crítico' },
];

// Animated floating particles
const FloatingOrb: React.FC<{ className: string }> = ({ className }) => (
  <div className={`absolute rounded-full pointer-events-none blur-3xl opacity-30 ${className}`} />
);

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterAsStudent,
  onEnterAsProfessor,
  onEnterAsCoordenacao,
}) => {
  const [activeSection, setActiveSection] = useState(0);

  // Auto-cycle hero stats
  useEffect(() => {
    const t = setInterval(() => setActiveSection(s => (s + 1) % STATS.length), 3200);
    return () => clearInterval(t);
  }, []);

  const handleRoleAction = (action: string) => {
    if (action === 'onEnterAsStudent') onEnterAsStudent();
    else if (action === 'onEnterAsProfessor') onEnterAsProfessor();
    else if (action === 'onEnterAsCoordenacao') onEnterAsCoordenacao();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans overflow-x-hidden">

      {/* ========== NAV ========== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-black tracking-wider text-white">SALA DE MISSÕES</span>
              <span className="block text-[9px] text-blue-400 font-bold tracking-widest uppercase -mt-0.5">Ecossistema Pedagógico</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#como-funciona" className="hidden sm:block text-xs text-slate-400 hover:text-white transition-colors font-medium">Como funciona</a>
            <a href="#trilhas" className="hidden sm:block text-xs text-slate-400 hover:text-white transition-colors font-medium">Trilhas</a>
            <button
              onClick={onEnterAsStudent}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
            >
              Entrar
            </button>
          </div>
        </div>
      </nav>

      {/* ========== HERO ========== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 overflow-hidden">
        {/* Background orbs */}
        <FloatingOrb className="w-[600px] h-[600px] bg-blue-600 -top-40 -left-40" />
        <FloatingOrb className="w-[500px] h-[500px] bg-purple-600 -bottom-20 -right-20" />
        <FloatingOrb className="w-[300px] h-[300px] bg-emerald-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold mb-8 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ecossistema Pedagógico para 4º e 5º Ano do Ensino Fundamental</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6">
            <span className="text-white">A Escola que</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              transforma vidas
            </span>
            <br />
            <span className="text-white">em jornadas.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
            A <strong className="text-white">Sala de Missões</strong> é um ecossistema pedagógico gamificado que transforma o processo de nivelamento das aprendizagens em uma jornada de descoberta, colaboração e conquista — dentro e fora da escola pública.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onEnterAsStudent}
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              Iniciar Minha Jornada
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onEnterAsProfessor}
              className="px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-sm transition-all hover:scale-105 cursor-pointer backdrop-blur-sm"
            >
              Área do Professor
            </button>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${
                  i === activeSection
                    ? 'bg-white/10 border-white/20 scale-105'
                    : 'bg-white/5 border-white/5'
                }`}
              >
                <div className={`text-2xl font-black ${i === activeSection ? 'text-white' : 'text-slate-300'}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-slate-500 font-medium">Conheça o projeto</span>
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </div>
      </section>

      {/* ========== O PROBLEMA ========== */}
      <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
        <FloatingOrb className="w-[400px] h-[400px] bg-red-700 -right-40 top-10" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-bold mb-4">
              <Target className="w-3.5 h-3.5" />
              O Desafio
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Por que a Sala de Missões existe?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Nas escolas públicas brasileiras, estudantes chegam ao 4º e 5º ano com defasagens de aprendizagem significativas — mas cada um está em um ponto diferente. As abordagens coletivas não conseguem atender a essa diversidade de percursos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '📉',
                title: 'Defasagem de Aprendizagem',
                desc: 'Estudantes do mesmo ano apresentam níveis de conhecimento muito diferentes, tornando difícil o ensino coletivo padrão.'
              },
              {
                icon: '🏫',
                title: 'Recursos Limitados',
                desc: 'A escola pública precisa de soluções de baixo custo, que funcionem com ou sem internet, e que o professor consiga gerenciar.'
              },
              {
                icon: '💡',
                title: 'Falta de Engajamento',
                desc: 'Atividades descontextualizadas e sem significado desmotivam os estudantes. A aprendizagem precisa ser uma aventura.'
              }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-red-500/30 transition-all">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-base font-black text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COMO FUNCIONA ========== */}
      <section id="como-funciona" className="py-24 px-4 bg-slate-950 relative overflow-hidden">
        <FloatingOrb className="w-[500px] h-[500px] bg-blue-700 -left-40 top-0" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold mb-4">
              <Map className="w-3.5 h-3.5" />
              A Jornada
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Como funciona a jornada do estudante</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Cada estudante percorre um caminho único — do diagnóstico à autonomia — com missões, revisões e conquistas que fazem sentido pedagógico real.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className={`relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group`}>
                <div className={`absolute top-4 right-4 text-6xl font-black opacity-5 text-white`}>{item.step}</div>
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-base font-black text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Flow Arrow */}
          <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/20 text-center">
            <p className="text-sm font-black text-slate-300 tracking-wide">
              ENTRAR → DIAGNOSTICAR → TRILHA → MISSÃO → TENTAR → ERRAR → REVISAR → DOMINAR → CONQUISTAR → AVANÇAR → AUTONOMIA
            </p>
          </div>
        </div>
      </section>

      {/* ========== TRILHAS ========== */}
      <section id="trilhas" className="py-24 px-4 bg-slate-900 relative overflow-hidden">
        <FloatingOrb className="w-[400px] h-[400px] bg-emerald-700 -right-20 top-20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold mb-4">
              <Rocket className="w-3.5 h-3.5" />
              Trilhas de Aprendizagem
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">4 Trilhas de Exploração</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Cada trilha organiza o percurso pedagógico em missões sequenciais, do nível mais fundamental até a transferência e aplicação criativa do conhecimento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TRAILS.map((trail, i) => (
              <div
                key={i}
                className="group relative p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${trail.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${trail.color} flex items-center justify-center mb-5 shadow-lg`}>
                    <trail.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-black text-white">{trail.name}</h3>
                    <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${trail.badge}`}>
                      {trail.missions}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{trail.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TIPOS DE MISSÃO ========== */}
      <section className="py-24 px-4 bg-slate-950 relative overflow-hidden">
        <FloatingOrb className="w-[400px] h-[400px] bg-purple-700 -left-20 bottom-0" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold mb-4">
              <Zap className="w-3.5 h-3.5" />
              Missões
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Missões para todos os momentos</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              As missões são o coração da Sala de Missões. Cada uma representa um objetivo pedagógico real — e pode acontecer de diferentes formas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MISSION_TYPES.map((type, i) => (
              <div
                key={i}
                className={`p-6 rounded-3xl bg-gradient-to-br ${type.bg} border ${type.border} hover:scale-[1.02] transition-all`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm`}>
                  <type.icon className={`w-6 h-6 ${type.color}`} />
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-2">{type.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>

          {/* Printed activities highlight */}
          <div className="mt-8 p-6 rounded-3xl bg-orange-50 border border-orange-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center shrink-0">
                <Printer className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-base font-black text-orange-900 mb-1">Sem internet? Sem problema.</h3>
                <p className="text-sm text-orange-700 leading-relaxed">
                  Toda missão possui uma versão para impressão. O estudante realiza a atividade no papel e o professor registra os resultados no sistema depois. A Sala de Missões foi pensada para a realidade da escola pública brasileira.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== GAMIFICAÇÃO ========== */}
      <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
        <FloatingOrb className="w-[400px] h-[400px] bg-amber-700 -right-20 top-20" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold mb-4">
              <Star className="w-3.5 h-3.5" />
              Gamificação Pedagógica
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Recompensas que incentivam a aprendizagem</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A gamificação existe para incentivar — não substituir — a aprendizagem. Valorizamos evolução, persistência, colaboração e domínio, não apenas quem acerta mais.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GAMIFICATION_ITEMS.map((item, i) => (
              <div key={i} className={`p-6 rounded-3xl ${item.bg} border ${item.border} hover:scale-[1.02] transition-all`}>
                <div className={`w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-sm`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CULTURA ========== */}
      <section className="py-24 px-4 bg-slate-950 relative overflow-hidden">
        <FloatingOrb className="w-[500px] h-[500px] bg-pink-700 -left-40 bottom-0" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold mb-6">
                <Palette className="w-3.5 h-3.5" />
                Cultura & Cidadania
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Mais do que conteúdo:<br />
                <span className="text-pink-400">formação de sujeitos</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                A Trilha Cultural não é uma seção secundária. Ela é componente essencial do ecossistema. Através de missões de literatura, música, teatro, artes e cidadania, o estudante não apenas recupera conteúdos — mas amplia seu repertório cultural e se forma como sujeito crítico e participativo.
              </p>
              <p className="text-slate-400 leading-relaxed">
                O objetivo é que cada criança conheça a diversidade do Brasil, desenvolva pensamento crítico, argumente com base em evidências e reconheça o valor do patrimônio cultural coletivo.
              </p>
            </div>

            <div className="flex-1 grid grid-cols-4 gap-3">
              {CULTURE_ITEMS.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all text-center">
                  <item.icon className="w-6 h-6 text-pink-400" />
                  <span className="text-xs text-slate-400 font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== PARA QUEM ========== */}
      <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Para toda a comunidade escolar</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A Sala de Missões conecta estudante, professor e coordenação em um único ecossistema pedagógico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROLES.map((role, i) => (
              <div key={i} className="flex flex-col p-7 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <role.icon className="w-7 h-7 text-white" />
                </div>
                <span className={`text-xs font-black mb-2 px-2.5 py-1 rounded-full border self-start`}
                  style={{ color: 'rgb(148,163,184)', backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  {role.badge}
                </span>
                <h3 className="text-lg font-black text-white mb-2">{role.role}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">{role.desc}</p>
                <button
                  onClick={() => handleRoleAction(role.action)}
                  className={`w-full py-3 rounded-2xl bg-gradient-to-r ${role.color} text-white text-sm font-black transition-all hover:opacity-90 hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2`}
                >
                  {role.label}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TV DA SALA ========== */}
      <section className="py-24 px-4 bg-slate-950 relative overflow-hidden">
        <FloatingOrb className="w-[400px] h-[400px] bg-cyan-700 -right-20 top-20" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-shrink-0 w-full lg:w-auto">
              <div className="w-full lg:w-80 h-48 lg:h-56 rounded-3xl bg-slate-800 border-4 border-slate-700 flex flex-col items-center justify-center gap-4 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40" />
                <Monitor className="w-16 h-16 text-blue-400 relative z-10" />
                <div className="text-center relative z-10">
                  <div className="text-xs text-blue-300 font-black uppercase tracking-widest">TV DA SALA</div>
                  <div className="text-lg font-black text-white">Painel ao Vivo</div>
                </div>
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[9px] text-red-300 font-bold">AO VIVO</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold mb-6">
                <Monitor className="w-3.5 h-3.5" />
                Painel TV da Sala
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                A TV da sala como<br />
                <span className="text-cyan-400">central motivacional</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                O Painel TV da Sala de Missões é projetado na TV da sala de aula e funciona automaticamente — sem interação do professor. Ele exibe de forma visual e envolvente: missões em andamento, duplas trabalhando, desafios coletivos, conquistas desbloqueadas e metas da turma.
              </p>
              <p className="text-slate-400 leading-relaxed">
                A interface é pensada para crianças: rápida, colorida, gamificada — e nunca expõe dificuldades individuais ou constrange nenhum estudante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== ESCOLA PÚBLICA ========== */}
      <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-bold mb-4">
              <Heart className="w-3.5 h-3.5" />
              Compromisso Social
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Feito para a realidade da escola pública</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A Sala de Missões foi projetada respeitando as condições reais das escolas públicas brasileiras.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '📄', title: 'Atividades Impressas', desc: 'Toda missão tem versão para impressão. Funciona sem internet e sem computador por aluno.' },
              { icon: '💰', title: 'Baixo Custo', desc: 'Recompensas simples de baixo custo que a escola pode oferecer sem grandes investimentos.' },
              { icon: '♿', title: 'Inclusão', desc: 'Adaptações pedagógicas registradas no perfil de cada estudante, respeitando necessidades específicas.' },
              { icon: '📶', title: 'Offline Friendly', desc: 'Funciona na TV da sala, no computador do professor e pode ser impresso sem depender de internet contínua.' },
              { icon: '🎒', title: 'Contexto Familiar', desc: 'Pensado para os contextos familiares reais — sem exigir participação digital dos responsáveis.' },
              { icon: '🌱', title: 'Sustentável', desc: 'Soluções sustentáveis que a escola possa manter no longo prazo sem dependência de financiamento externo.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-green-500/20 transition-all">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-sm font-black text-white mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="py-24 px-4 bg-slate-950 relative overflow-hidden">
        <FloatingOrb className="w-[600px] h-[600px] bg-blue-700 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Pronto para começar?
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
            Cada criança tem<br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              uma história para contar.
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            A Sala de Missões transforma esse processo em uma jornada de descoberta, cooperação e conquista — onde cada estudante sabe onde está, para onde vai e o que já conquistou.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onEnterAsStudent}
              className="group px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-base shadow-2xl shadow-blue-600/30 transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Iniciar Jornada
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onEnterAsProfessor}
              className="px-10 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-base transition-all hover:scale-105 cursor-pointer backdrop-blur-sm"
            >
              Área Docente
            </button>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-8 px-4 border-t border-white/5 bg-slate-950">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center">
              <Rocket className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-black text-white">SALA DE MISSÕES</span>
          </div>
          <p className="text-xs text-slate-500 text-center">
            Ecossistema Pedagógico Gamificado • Escola Municipal Monte das Águas • 4º e 5º Anos
          </p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Heart className="w-3.5 h-3.5 text-red-400" />
            <span>Feito para a escola pública brasileira</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
