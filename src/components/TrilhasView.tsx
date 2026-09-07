import React, { useState } from 'react';
import { 
  GitBranch, 
  Lock, 
  Play, 
  BookOpen, 
  Calculator, 
  FlaskConical, 
  Check,
  Sparkles,
  Zap,
  MapPin,
  Flame,
  Award,
  Palette,
  Music,
  Landmark,
  Heart,
  Users,
  Printer,
  User,
  ChevronRight,
  Star,
  Globe,
  Filter,
  Info,
  Coins
} from 'lucide-react';
import { Student } from '../types';
import { GameButton, CoinBadge } from './game-ui/GameComponents';

interface TrilhasViewProps {
  onStartMission: (missionId?: string) => void;
  selectedStudent: Student;
}

type Discipline = 'mat' | 'por' | 'cie' | 'cul';
type ModalFilter = 'all' | 'individual' | 'dupla' | 'grupo' | 'impresso';

const DISCIPLINES = [
  {
    id: 'mat' as Discipline,
    label: 'Reino da Matemática',
    icon: Calculator,
    activeColor: 'bg-emerald-500 text-white border-emerald-500/50 shadow-sm scale-102',
    inactiveColor: 'bg-white/90 text-slate-700 hover:text-emerald-700 border-white/90 hover:bg-white shadow-2xs',
    dotColor: 'bg-emerald-500',
    badge: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    gradient: 'from-emerald-500 to-teal-600',
    bncc: 'EF05MA - Operações, geometria e resolução de problemas'
  },
  {
    id: 'por' as Discipline,
    label: 'Jornada da Língua',
    icon: BookOpen,
    activeColor: 'bg-blue-600 text-white border-blue-600/50 shadow-sm scale-102',
    inactiveColor: 'bg-white/90 text-slate-700 hover:text-blue-700 border-white/90 hover:bg-white shadow-2xs',
    dotColor: 'bg-blue-600',
    badge: 'text-blue-700 bg-blue-50 border-blue-200',
    gradient: 'from-blue-500 to-indigo-600',
    bncc: 'EF05LP - Leitura, produção textual e oralidade'
  },
  {
    id: 'cie' as Discipline,
    label: 'Ilha das Ciências',
    icon: FlaskConical,
    activeColor: 'bg-amber-500 text-slate-900 border-amber-500/50 shadow-sm scale-102',
    inactiveColor: 'bg-white/90 text-slate-700 hover:text-amber-700 border-white/90 hover:bg-white shadow-2xs',
    dotColor: 'bg-amber-500',
    badge: 'text-amber-700 bg-amber-50 border-amber-200',
    gradient: 'from-amber-500 to-orange-600',
    bncc: 'EF05CI - Vida, ambiente, matéria e energia'
  },
  {
    id: 'cul' as Discipline,
    label: 'Mundo da Cultura',
    icon: Palette,
    activeColor: 'bg-purple-600 text-white border-purple-600/50 shadow-sm scale-102',
    inactiveColor: 'bg-white/90 text-slate-700 hover:text-purple-700 border-white/90 hover:bg-white shadow-2xs',
    dotColor: 'bg-purple-600',
    badge: 'text-purple-700 bg-purple-50 border-purple-200',
    gradient: 'from-purple-500 to-pink-600',
    bncc: 'Arte, Literatura, Música, Cidadania e Diversidade Cultural'
  },
];

interface TrailNode {
  id: string;
  title: string;
  sub: string;
  status: 'concluido' | 'ativo' | 'bloqueado';
  xp: number;
  coins: number;
  modalidade: ModalFilter[];
  habilidades: string[];
  criterioAvanco: string;
  cultural?: string;
}

const MATH_NODES: TrailNode[] = [
  { id: 'mat-01', title: 'Vila dos Números', sub: 'Sistema decimal: unidades, dezenas e centenas', status: 'concluido', xp: 50, coins: 25, modalidade: ['individual', 'impresso'], habilidades: ['Compor e decompor números', 'Reconhecer valor posicional'], criterioAvanco: 'Compor e decompor corretamente números de até 3 ordens em 8 de 10 tentativas' },
  { id: 'mat-02', title: 'O Desafio da Adição', sub: 'Composição e cálculo com reagrupamento', status: 'concluido', xp: 60, coins: 30, modalidade: ['individual', 'dupla', 'impresso'], habilidades: ['Adição com reagrupamento', 'Cálculo mental'], criterioAvanco: 'Calcular adições com reagrupamento com autonomia' },
  { id: 'mat-03', title: 'O Mistério da Subtração', sub: 'Retirar, comparar e achar a diferença', status: 'concluido', xp: 60, coins: 30, modalidade: ['individual', 'dupla', 'impresso'], habilidades: ['Subtração com e sem reagrupamento', 'Ideia de diferença'], criterioAvanco: 'Resolver subtrações identificando a ideia adequada' },
  { id: 'mat-04', title: 'A Fábrica da Multiplicação', sub: 'Agrupamentos e parcelas iguais', status: 'concluido', xp: 70, coins: 35, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Multiplicação por agrupamento', 'Tabuada'], criterioAvanco: 'Multiplicar usando estratégias variadas com autonomia' },
  { id: 'mat-05', title: 'O Desafio da Divisão', sub: 'Grupos iguais e repartição (Missão Atual)', status: 'ativo', xp: 75, coins: 40, modalidade: ['individual', 'dupla', 'grupo', 'impresso'], habilidades: ['Divisão por agrupamento', 'Repartição equitativa', 'Relação divisão-multiplicação'], criterioAvanco: 'Resolver divisões compreendendo o processo de repartição' },
  { id: 'mat-06', title: 'Situações-Problema', sub: 'Aplicação das 4 operações no cotidiano', status: 'bloqueado', xp: 100, coins: 50, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Interpretação de problemas', 'Escolha da operação adequada', 'Resolução de problemas complexos'], criterioAvanco: 'Resolver problemas com múltiplas etapas identificando as operações corretas' },
];

const PORTUGUESE_NODES: TrailNode[] = [
  { id: 'por-01', title: 'Território das Palavras', sub: 'Relação fonema-grafema e ortografia', status: 'concluido', xp: 50, coins: 25, modalidade: ['individual', 'impresso'], habilidades: ['Sons e letras do português', 'Regras ortográficas básicas'], criterioAvanco: 'Aplicar regras ortográficas estudadas com consistência' },
  { id: 'por-02', title: 'Construção de Frases', sub: 'Sintaxe e pontuação básica', status: 'concluido', xp: 55, coins: 28, modalidade: ['individual', 'dupla', 'impresso'], habilidades: ['Estrutura de frases', 'Uso de pontuação'], criterioAvanco: 'Construir frases coerentes com pontuação adequada' },
  { id: 'por-03', title: 'Compreensão Textual', sub: 'Localizar informações explícitas', status: 'concluido', xp: 60, coins: 30, modalidade: ['individual', 'impresso'], habilidades: ['Localização de informações', 'Pistas textuais explícitas'], criterioAvanco: 'Localizar com precisão informações explícitas em textos variados' },
  { id: 'por-04', title: 'A Ideia Principal', sub: 'Inferências e mensagem central (Missão Atual)', status: 'ativo', xp: 70, coins: 35, modalidade: ['individual', 'dupla', 'impresso'], habilidades: ['Inferência textual', 'Identificar ideia central', 'Uso de conhecimento de mundo'], criterioAvanco: 'Realizar inferências apoiadas em evidências do texto com autonomia' },
  { id: 'por-05', title: 'Produção Textual', sub: 'Organização de parágrafos e coerência', status: 'bloqueado', xp: 80, coins: 40, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Produção de textos coerentes', 'Organização textual', 'Revisão e reescrita'], criterioAvanco: 'Produzir texto com início, meio e fim organizado e coerente' },
  { id: 'por-06', title: 'Desafio da Escrita Criativa', sub: 'Contos, crônicas e apresentações', status: 'bloqueado', xp: 100, coins: 50, modalidade: ['grupo', 'dupla', 'impresso'], habilidades: ['Criação literária', 'Narração', 'Expressão pessoal'], criterioAvanco: 'Criar um texto de gênero definido demonstrando autoria' },
];

const SCIENCE_NODES: TrailNode[] = [
  { id: 'cie-01', title: 'Ilha da Observação', sub: 'Seres vivos e seus ambientes', status: 'concluido', xp: 50, coins: 25, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Classificação de seres vivos', 'Observação científica'], criterioAvanco: 'Classificar seres vivos a partir das características observadas' },
  { id: 'cie-02', title: 'Ciclos da Água e Solo', sub: 'Transformações e ecossistemas (Missão Atual)', status: 'ativo', xp: 60, coins: 30, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Ciclo da água', 'Preservação ambiental', 'Ecossistemas'], criterioAvanco: 'Explicar o ciclo da água e sua importância para a vida' },
  { id: 'cie-03', title: 'Laboratório do Explorador', sub: 'Experimentos práticos e hipóteses', status: 'bloqueado', xp: 80, coins: 40, modalidade: ['grupo', 'impresso'], habilidades: ['Método científico', 'Formulação de hipóteses', 'Experimentação'], criterioAvanco: 'Planejar e executar experimento simples seguindo etapas científicas' },
];

const CULTURE_NODES: TrailNode[] = [
  { id: 'cul-01', title: 'Vozes do Brasil', sub: 'Literatura e diversidade cultural', status: 'ativo', xp: 55, coins: 30, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Apreciação literária', 'Identidade cultural', 'Leitura de textos literários'], criterioAvanco: 'Identificar elementos culturais em textos literários e relacionar com identidade', cultural: '🎭 Literatura, Diversidade e Memória Cultural' },
  { id: 'cul-02', title: 'Ritmos do Brasil', sub: 'Música, expressão e identidade regional', status: 'ativo', xp: 50, coins: 25, modalidade: ['individual', 'grupo'], habilidades: ['Apreciação musical', 'Diversidade regional', 'Expressão artística'], criterioAvanco: 'Reconhecer ritmos musicais brasileiros e suas origens culturais', cultural: '🎵 Música, Ritmo e Expressão Cultural' },
  { id: 'cul-03', title: 'Cidadãos do Mundo', sub: 'Direitos, responsabilidades e cidadania ativa', status: 'ativo', xp: 70, coins: 35, modalidade: ['individual', 'grupo', 'impresso'], habilidades: ['Cidadania crítica', 'Direitos e responsabilidades', 'Pensamento argumentativo'], criterioAvanco: 'Identificar direitos e responsabilidades cidadãs e propor ações concretas', cultural: '🌍 Cidadania, Ética e Participação Social' },
  { id: 'cul-04', title: 'Arte que Fala', sub: 'Artes visuais e patrimônio cultural', status: 'bloqueado', xp: 65, coins: 32, modalidade: ['grupo', 'impresso'], habilidades: ['Leitura de obras de arte', 'Patrimônio cultural', 'Expressão visual'], criterioAvanco: 'Analisar obras de arte identificando elementos visuais e contexto cultural', cultural: '🎨 Arte, Criação e Patrimônio' },
];

const TRAIL_DATA: Record<Discipline, TrailNode[]> = {
  mat: MATH_NODES,
  por: PORTUGUESE_NODES,
  cie: SCIENCE_NODES,
  cul: CULTURE_NODES,
};

const MODAL_FILTER_LABELS: Record<ModalFilter, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  all: { label: 'Todos', icon: Filter },
  individual: { label: 'Individual', icon: User },
  dupla: { label: 'Em Dupla', icon: Users },
  grupo: { label: 'Em Grupo', icon: Users },
  impresso: { label: 'Impresso', icon: Printer }
};

export const TrilhasView: React.FC<TrilhasViewProps> = ({
  onStartMission,
  selectedStudent
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline>('mat');
  const [activeModalFilter, setActiveModalFilter] = useState<ModalFilter>('all');
  const [showBncc, setShowBncc] = useState(false);
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  const currentDisc = DISCIPLINES.find(d => d.id === selectedDiscipline)!;
  const allNodes = TRAIL_DATA[selectedDiscipline];
  
  const filteredNodes = activeModalFilter === 'all' 
    ? allNodes 
    : allNodes.filter(n => n.modalidade.includes(activeModalFilter));

  const completedCount = allNodes.filter(n => n.status === 'concluido').length;
  const progressPercent = Math.round((completedCount / allNodes.length) * 100);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-5 sm:p-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="text-[10px] font-black text-[#123cc4] uppercase tracking-widest flex items-center gap-1.5 mb-1.5">
              <GitBranch className="w-3.5 h-3.5" />
              Percurso de Aprendizagem Adaptativo
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              Trilhas de Aprendizagem
            </h1>
            <p className="text-xs text-slate-500 font-bold leading-relaxed mt-1 max-w-xl">
              Cada trilha organiza o percurso por habilidades BNCC. Complete missões, domine habilidades e avance para novos desafios.
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <span className="text-xs text-slate-500 font-medium">Explorador:</span>
              <span className="text-sm font-black text-slate-900 ml-1">{selectedStudent?.name || 'Estudante'}</span>
            </div>
            <div className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 bg-gradient-to-r ${currentDisc.gradient} text-white shadow-sm`}>
              <currentDisc.icon className="w-3.5 h-3.5" />
              <span>{progressPercent}% da trilha concluída</span>
            </div>
          </div>
        </div>

        {/* Discipline Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
          {DISCIPLINES.map((disc) => (
            <button
              key={disc.id}
              onClick={() => { setSelectedDiscipline(disc.id); setActiveModalFilter('all'); setExpandedNode(null); }}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95 border ${
                selectedDiscipline === disc.id ? disc.activeColor : disc.inactiveColor
              }`}
            >
              <disc.icon className="w-4 h-4" />
              <span>{disc.label}</span>
              {disc.id === 'cul' && (
                <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[9px] font-black">NOVO</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Trail Map */}
      <div className="bg-white/85 backdrop-blur-xl border border-white/90 rounded-3xl p-5 sm:p-6 shadow-md">
        {/* Trail Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r ${currentDisc.gradient} text-white text-xs font-black mb-1`}>
              <currentDisc.icon className="w-3.5 h-3.5" />
              {currentDisc.label}
            </div>
            <p className="text-xs text-slate-500 font-medium">{currentDisc.bncc}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBncc(!showBncc)}
              className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
              title="Ver habilidades BNCC"
            >
              <Info className="w-4 h-4" />
            </button>
            <span className={`px-3 py-1 rounded-xl ${currentDisc.badge} text-xs font-black border`}>
              {completedCount}/{allNodes.length} concluídas
            </span>
          </div>
        </div>

        {/* Modal Filters */}
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="text-xs text-slate-500 font-bold flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" />
            Modalidade:
          </span>
          {(Object.keys(MODAL_FILTER_LABELS) as ModalFilter[]).map((filter) => {
            const { label, icon: Icon } = MODAL_FILTER_LABELS[filter];
            return (
              <button
                key={filter}
                onClick={() => setActiveModalFilter(filter)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer border shadow-2xs ${
                  activeModalFilter === filter
                    ? 'bg-[#123cc4]/10 text-[#00067a] border-[#123cc4]/25 hover:bg-[#123cc4]/15'
                    : 'bg-white/90 text-slate-700 border-slate-200/80 hover:bg-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                {label}
              </button>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="mb-5">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
            <span>Progresso da Trilha</span>
            <span className="font-black">{progressPercent}%</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className={`h-full bg-gradient-to-r ${currentDisc.gradient} rounded-full transition-all duration-700`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Nodes Grid / Timeline */}
        <div className="relative space-y-4 before:absolute before:left-[22px] sm:before:left-[24px] before:top-4 before:bottom-4 before:w-1.5 before:bg-gradient-to-b before:from-emerald-400 before:via-[#123cc4] before:to-slate-200 before:rounded-full">
          {filteredNodes.length === 0 ? (
            <div className="text-center py-10 text-slate-400">
              <Filter className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Nenhuma missão nessa modalidade</p>
              <p className="text-xs mt-1">Tente outro filtro de modalidade</p>
            </div>
          ) : filteredNodes.map((node) => {
            const isCompleted = node.status === 'concluido';
            const isActive = node.status === 'ativo';
            const isExpanded = expandedNode === node.id;

            return (
              <div key={node.id} className="relative flex items-start gap-3 sm:gap-4 pl-1 group">
                
                {/* Node Timeline Icon */}
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-lg shrink-0 z-10 transition-all ${
                  isCompleted
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-50'
                    : isActive
                      ? `bg-gradient-to-br ${currentDisc.gradient} text-white ring-4 ring-[#123cc4]/10 animate-pulse`
                      : 'bg-slate-200 text-slate-400 ring-4 ring-white'
                }`}>
                  {isCompleted ? <Check className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" /> : isActive ? <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white" /> : <Lock className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>

                {/* Node Card */}
                <div className={`flex-1 rounded-2xl border transition-all overflow-hidden ${
                  isActive
                    ? 'bg-white/95 backdrop-blur-xl border-slate-200/80 shadow-md ring-1 ring-[#123cc4]/10'
                    : isCompleted
                      ? 'bg-white/80 backdrop-blur-md border-slate-200 shadow-2xs hover:bg-white/90 hover:shadow-sm'
                      : 'bg-slate-50/80 backdrop-blur-sm border-slate-200 text-slate-500 shadow-2xs'
                }`}>
                  <div
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 ${!isActive && 'cursor-pointer'}`}
                    onClick={() => setExpandedNode(isExpanded ? null : node.id)}
                  >
                    <div className="flex-1">
                      {/* Tags row */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-2">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1 shadow-2xs border bg-[#123cc4]/10 text-[#00067a] border-[#123cc4]/20">
                          {isCompleted ? (
                            <><Check className="w-2.5 h-2.5" /> Dominada</>
                          ) : isActive ? (
                            <><Flame className="w-2.5 h-2.5 text-[#123cc4]" /> Missão Atual</>
                          ) : (
                            <><Lock className="w-2.5 h-2.5" /> Em breve</>
                          )}
                        </span>

                        {/* Modalidade badges */}
                        {node.modalidade.map((mod) => (
                          <span key={mod} className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1 shadow-2xs border bg-[#123cc4]/10 text-[#00067a] border-[#123cc4]/20">
                            {mod === 'individual' ? <User className="w-2.5 h-2.5" /> : mod === 'dupla' ? <Users className="w-2.5 h-2.5" /> : mod === 'grupo' ? <Users className="w-2.5 h-2.5" /> : <Printer className="w-2.5 h-2.5" />} {mod}
                          </span>
                        ))}

                        {/* Cultural badge */}
                        {node.cultural && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1 shadow-2xs border bg-[#123cc4]/10 text-[#00067a] border-[#123cc4]/20">
                            {node.cultural}
                          </span>
                        )}
                      </div>

                      <h3 className={`text-sm sm:text-base font-black leading-tight ${isActive ? 'text-slate-900' : isCompleted ? 'text-slate-900' : 'text-slate-500'}`}>
                        {node.title}
                      </h3>
                      <p className={`text-[10px] sm:text-xs font-bold mt-1 ${isActive ? 'text-slate-500' : 'text-slate-400'}`}>
                        {node.sub}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1.5 sm:gap-2">
                        {/* GlassXP Badge identical to TV */}
                        <span className="inline-flex items-center font-black rounded-full bg-[#123cc4]/10 backdrop-blur-md border border-[#123cc4]/25 text-[#00067a] shadow-2xs px-2.5 py-1 text-xs gap-1.5">
                          <Star className="w-3.5 h-3.5 fill-[#123cc4] text-[#0e2fb2] shrink-0" />
                          <span>+{node.xp} XP</span>
                        </span>
                        
                        {/* GlassCoin Badge identical to TV */}
                        <span className="inline-flex items-center font-black rounded-full bg-[#123cc4]/10 backdrop-blur-md border border-[#123cc4]/25 text-[#00067a] shadow-2xs px-2.5 py-1 text-xs gap-1.5">
                          <div className="relative inline-flex items-center justify-center shrink-0 select-none w-3.5 h-3.5">
                            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-xs">
                              <circle cx="12" cy="12" r="11" fill="url(#blueCoinOuterTrilha)" />
                              <circle cx="12" cy="12" r="9.5" fill="url(#blueCoinBodyTrilha)" />
                              <circle cx="12" cy="12" r="7.5" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.85" fill="none" />
                              <path d="M12 6.5L13.5 10.2H17.5L14.2 12.6L15.4 16.5L12 14.1L8.6 16.5L9.8 12.6L6.5 10.2H10.5L12 6.5Z" fill="#FFFFFF" fillOpacity="0.95" />
                              <defs>
                                <linearGradient id="blueCoinOuterTrilha" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#123cc4" />
                                  <stop offset="0.5" stopColor="#0e2fb2" />
                                  <stop offset="1" stopColor="#05148d" />
                                </linearGradient>
                                <linearGradient id="blueCoinBodyTrilha" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#123cc4" />
                                  <stop offset="0.4" stopColor="#09219f" />
                                  <stop offset="1" stopColor="#00067a" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>
                          <span>{node.coins}</span>
                          <span className="text-[9px] text-[#0e2fb2] font-bold uppercase tracking-wider">Moedas</span>
                        </span>
                      </div>
                      {isActive && (
                        <GameButton
                          variant="reward"
                          size="md"
                          onClick={(e) => { e.stopPropagation(); onStartMission(node.id); }}
                          icon={<Play className="w-3.5 h-3.5 fill-current" />}
                        >
                          Jogar
                        </GameButton>
                      )}
                      {!isActive && (
                        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-2">
                      <div>
                        <div className="text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500" />
                          Habilidades trabalhadas:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {node.habilidades.map((h, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-700 mb-1 flex items-center gap-1">
                          <Award className="w-3 h-3 text-purple-500" />
                          Critério de avanço:
                        </div>
                        <p className="text-xs text-slate-600 font-medium leading-snug">{node.criterioAvanco}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cultural Trail Highlight */}
      {selectedDiscipline === 'cul' && (
        <div className="p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 shadow-md">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-purple-900 mb-1">Trilha Cultural: Formação Humana Integral</h3>
              <p className="text-sm text-purple-700 leading-relaxed">
                O Mundo da Cultura vai além dos conteúdos escolares. Aqui, o estudante amplia seu repertório cultural, desenvolve pensamento crítico, conhece a diversidade do Brasil e se forma como sujeito participativo. Cada missão cultural é também uma jornada de autoconhecimento e pertencimento.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Literatura', 'Música', 'Arte', 'Teatro', 'Cidadania', 'Diversidade', 'Patrimônio'].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200 font-bold">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Print Activities Banner */}
      <div className="p-4 rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 shadow-md flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shrink-0">
          <Printer className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-black text-orange-900">Missões com versão impressa disponível</div>
          <div className="text-xs text-orange-700 font-medium">
            Missões marcadas com 🖨️ têm versão para impressão. Solicite ao professor — a atividade pode ser feita no papel e registrada depois.
          </div>
        </div>
      </div>
    </div>
  );
};
