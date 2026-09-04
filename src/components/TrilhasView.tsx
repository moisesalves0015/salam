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
  Info
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
    activeColor: 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/25',
    inactiveColor: 'bg-white text-slate-700 hover:text-emerald-700 border-slate-200 hover:bg-emerald-50',
    dotColor: 'bg-emerald-500',
    badge: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    gradient: 'from-emerald-500 to-teal-600',
    bncc: 'EF05MA - Operações, geometria e resolução de problemas'
  },
  {
    id: 'por' as Discipline,
    label: 'Jornada da Língua',
    icon: BookOpen,
    activeColor: 'bg-blue-600 text-white border-blue-700 shadow-blue-600/25',
    inactiveColor: 'bg-white text-slate-700 hover:text-blue-700 border-slate-200 hover:bg-blue-50',
    dotColor: 'bg-blue-600',
    badge: 'text-blue-700 bg-blue-50 border-blue-200',
    gradient: 'from-blue-500 to-indigo-600',
    bncc: 'EF05LP - Leitura, produção textual e oralidade'
  },
  {
    id: 'cie' as Discipline,
    label: 'Ilha das Ciências',
    icon: FlaskConical,
    activeColor: 'bg-amber-500 text-slate-900 border-amber-600 shadow-amber-500/25',
    inactiveColor: 'bg-white text-slate-700 hover:text-amber-700 border-slate-200 hover:bg-amber-50',
    dotColor: 'bg-amber-500',
    badge: 'text-amber-700 bg-amber-50 border-amber-200',
    gradient: 'from-amber-500 to-orange-600',
    bncc: 'EF05CI - Vida, ambiente, matéria e energia'
  },
  {
    id: 'cul' as Discipline,
    label: 'Mundo da Cultura',
    icon: Palette,
    activeColor: 'bg-purple-600 text-white border-purple-700 shadow-purple-600/25',
    inactiveColor: 'bg-white text-slate-700 hover:text-purple-700 border-slate-200 hover:bg-purple-50',
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
      <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-100 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-wider mb-1">
              <GitBranch className="w-4 h-4" />
              <span>Percurso de Aprendizagem Adaptativo</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">Trilhas de Aprendizagem</h2>
            <p className="text-xs text-slate-500 mt-1 font-medium max-w-xl leading-relaxed">
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
              className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer border-2 shadow-sm ${
                selectedDiscipline === disc.id ? disc.activeColor : disc.inactiveColor
              }`}
            >
              <disc.icon className="w-3.5 h-3.5" />
              <span>{disc.label}</span>
              {disc.id === 'cul' && (
                <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[9px] font-black">NOVO</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Trail Map */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border-2 border-slate-100 shadow-xs">
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
                className={`px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer border ${
                  activeModalFilter === filter
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
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

        {/* Nodes */}
        <div className="relative space-y-5 before:absolute before:left-[22px] before:top-4 before:bottom-4 before:w-1.5 before:bg-gradient-to-b before:from-emerald-400 before:via-blue-400 before:to-slate-200 before:rounded-full">
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
              <div key={node.id} className="relative flex items-start gap-4 pl-1 group">
                {/* Node Icon */}
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm z-10 transition-all shadow-sm shrink-0 border-2 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white border-emerald-600 ring-4 ring-emerald-100'
                    : isActive
                      ? `bg-gradient-to-br ${currentDisc.gradient} text-white border-transparent ring-4 ring-blue-100 animate-pulse`
                      : 'bg-slate-100 text-slate-400 border-slate-200 ring-4 ring-slate-50'
                }`}>
                  {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : isActive ? <Play className="w-4 h-4 fill-white" /> : <Lock className="w-4 h-4" />}
                </div>

                {/* Node Card */}
                <div className={`flex-1 rounded-3xl border-2 transition-all overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-300 shadow-md'
                    : isCompleted
                      ? 'bg-white border-slate-200 hover:border-emerald-300 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}>
                  <div
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 ${!isActive && 'cursor-pointer'}`}
                    onClick={() => setExpandedNode(isExpanded ? null : node.id)}
                  >
                    <div className="flex-1">
                      {/* Tags row */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase border ${
                          isCompleted ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          isActive ? 'bg-amber-100 text-amber-900 border-amber-300 animate-pulse' :
                          'bg-white text-slate-500 border-slate-200'
                        }`}>
                          {isCompleted ? '✅ Dominada' : isActive ? '⚡ Missão Atual' : '🔒 Em breve'}
                        </span>

                        {/* Modalidade badges */}
                        {node.modalidade.map((mod) => (
                          <span key={mod} className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold border ${
                            mod === 'impresso' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                            mod === 'dupla' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                            mod === 'grupo' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                            'bg-sky-50 text-sky-700 border-sky-200'
                          }`}>
                            {mod === 'individual' ? '👤' : mod === 'dupla' ? '👥' : mod === 'grupo' ? '👨‍👩‍👧‍👦' : '🖨️'} {mod}
                          </span>
                        ))}

                        {/* Cultural badge */}
                        {node.cultural && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold border bg-pink-50 text-pink-700 border-pink-200">
                            {node.cultural}
                          </span>
                        )}
                      </div>

                      <h4 className={`text-sm font-black mt-1 ${isActive ? 'text-slate-900' : isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                        {node.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium leading-snug">{node.sub}</p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-xl border border-blue-100">+{node.xp} XP</span>
                        <CoinBadge amount={node.coins} size="sm" />
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
        <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
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
      <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 flex items-center gap-3">
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
