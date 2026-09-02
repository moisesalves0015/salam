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
  Award
} from 'lucide-react';
import { Student } from '../types';
import { GameButton, CoinBadge } from './game-ui/GameComponents';

interface TrilhasViewProps {
  onStartMission: (missionId?: string) => void;
  selectedStudent: Student;
}

export const TrilhasView: React.FC<TrilhasViewProps> = ({
  onStartMission,
  selectedStudent
}) => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<'mat' | 'por' | 'cie'>('mat');

  const mathTrailNodes = [
    { id: 'm1', title: 'Vila dos Números', sub: 'Conhecendo os números e ordem no sistema decimal', status: 'concluido', xp: 50, coins: 25 },
    { id: 'm2', title: 'O Desafio da Adição', sub: 'Composição e cálculo mental de parcelas', status: 'concluido', xp: 50, coins: 25 },
    { id: 'm3', title: 'O Mistério da Subtração', sub: 'Ideia de retirar, comparar e achar a diferença', status: 'concluido', xp: 50, coins: 25 },
    { id: 'm4', title: 'A Fábrica da Multiplicação', sub: 'Agrupamentos e adição de parcelas iguais', status: 'concluido', xp: 60, coins: 30 },
    { id: 'm5', title: 'O Desafio da Divisão', sub: 'Formação de grupos iguais e repartição (Missão Atual)', status: 'ativo', xp: 75, coins: 40 },
    { id: 'm6', title: 'Situações-Problema & Desafio Final', sub: 'Aplicação em novos cenários do cotidiano', status: 'bloqueado', xp: 100, coins: 50 },
  ];

  const portugueseTrailNodes = [
    { id: 'p1', title: 'Território das Palavras', sub: 'Relação entre fonemas e grafemas', status: 'concluido', xp: 50, coins: 25 },
    { id: 'p2', title: 'Construção de Frases', sub: 'Estruturação sintática e pontuação', status: 'concluido', xp: 50, coins: 25 },
    { id: 'p3', title: 'Compreensão Textual', sub: 'Localização de pistas explícitas no texto', status: 'concluido', xp: 60, coins: 30 },
    { id: 'p4', title: 'A Ideia Principal do Texto', sub: 'Inferências e mensagem central (Missão Atual)', status: 'ativo', xp: 70, coins: 35 },
    { id: 'p5', title: 'Produção Textual & Revisão', sub: 'Organização de parágrafos e coerência', status: 'bloqueado', xp: 80, coins: 40 },
    { id: 'p6', title: 'Desafio Final da Escrita', sub: 'Contos, crônicas e apresentações', status: 'bloqueado', xp: 100, coins: 50 },
  ];

  const scienceTrailNodes = [
    { id: 'c1', title: 'Ilha da Observação', sub: 'Elementos da natureza e seres vivos', status: 'concluido', xp: 50, coins: 25 },
    { id: 'c2', title: 'Ciclos da Água & Solo', sub: 'Transformações e ecossistemas (Missão Atual)', status: 'ativo', xp: 60, coins: 30 },
    { id: 'c3', title: 'Laboratório do Explorador', sub: 'Pequenas experiências práticas e hipóteses', status: 'bloqueado', xp: 80, coins: 40 },
  ];

  const currentNodes = selectedDiscipline === 'mat' 
    ? mathTrailNodes 
    : selectedDiscipline === 'por' 
      ? portugueseTrailNodes 
      : scienceTrailNodes;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border-2 border-[#C9DDF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#2676D9] uppercase tracking-wider">
            <GitBranch className="w-4 h-4 text-[#2676D9]" />
            <span>Percurso de Aprendizagem Adaptativo • Sala de Missões</span>
          </div>
          <h2 className="text-2xl font-black text-[#18324A] mt-1">Trilhas de Aprendizagem</h2>
          <p className="text-xs sm:text-sm text-[#60758A] mt-1 max-w-xl font-bold leading-relaxed">
            As trilhas organizam o avanço por competências da BNCC e desafios gamificados. Cada território desbloqueia saberes, cards e moedas.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDiscipline('mat')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer border-2 ${
              selectedDiscipline === 'mat'
                ? 'bg-[#43B96A] text-white border-[#248846] shadow-md shadow-[#43B96A]/25'
                : 'bg-white text-[#18324A] hover:text-[#43B96A] border-[#C9DDF0] hover:bg-[#EAF4FF]'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>Reino da Matemática</span>
          </button>
          <button
            onClick={() => setSelectedDiscipline('por')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer border-2 ${
              selectedDiscipline === 'por'
                ? 'bg-[#2676D9] text-white border-[#1652A3] shadow-md shadow-[#2676D9]/25'
                : 'bg-white text-[#18324A] hover:text-[#2676D9] border-[#C9DDF0] hover:bg-[#EAF4FF]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Jornada da Língua</span>
          </button>
          <button
            onClick={() => setSelectedDiscipline('cie')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer border-2 ${
              selectedDiscipline === 'cie'
                ? 'bg-[#F6B928] text-[#18324A] border-[#D68E08] shadow-md shadow-[#F6B928]/25'
                : 'bg-white text-[#18324A] hover:text-[#D68E08] border-[#C9DDF0] hover:bg-[#FEF8EA]'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>Ilha das Ciências</span>
          </button>
        </div>
      </div>

      {/* Trail Map Interactive Stepper */}
      <div className="bg-white p-6 lg:p-8 rounded-3xl border-2 border-[#C9DDF0] shadow-2xs relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#C9DDF0]">
          <div>
            <h3 className="text-lg font-black text-[#18324A] flex items-center gap-2">
              {selectedDiscipline === 'mat' ? (
                <>
                  <Calculator className="w-5 h-5 text-[#43B96A]" />
                  <span>Reino da Matemática</span>
                </>
              ) : selectedDiscipline === 'por' ? (
                <>
                  <BookOpen className="w-5 h-5 text-[#2676D9]" />
                  <span>Jornada da Língua Portuguesa</span>
                </>
              ) : (
                <>
                  <FlaskConical className="w-5 h-5 text-[#D68E08]" />
                  <span>Ilha das Ciências Naturais</span>
                </>
              )}
            </h3>
            <p className="text-xs text-[#60758A] mt-0.5 font-bold">
              Explorador: <strong className="text-[#18324A]">{selectedStudent?.name || 'Estudante'}</strong> • Nível {selectedStudent?.level || 1}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#60758A]">Progresso:</span>
            <span className="px-3 py-1 rounded-xl bg-[#EAF4FF] border-2 border-[#C9DDF0] text-[#1652A3] text-xs font-black">
              {Math.round((currentNodes.filter(n => n.status === 'concluido').length / currentNodes.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Trail Flow Nodes */}
        <div className="relative space-y-6 before:absolute before:left-7 before:top-4 before:bottom-4 before:w-1.5 before:bg-gradient-to-b before:from-[#43B96A] before:via-[#2676D9] before:to-[#C9DDF0] before:rounded-full">
          {currentNodes.map((node, index) => {
            const isCompleted = node.status === 'concluido';
            const isActive = node.status === 'ativo';

            return (
              <div key={node.id} className="relative flex items-start gap-5 pl-1.5 group">
                {/* Node Icon Circle */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm z-10 transition-all shadow-2xs shrink-0 border-2 ${
                  isCompleted
                    ? 'bg-[#43B96A] text-white border-[#248846] ring-4 ring-[#43B96A]/20'
                    : isActive
                      ? 'bg-[#2676D9] text-white border-[#1652A3] ring-4 ring-[#2676D9]/20 animate-pulse'
                      : 'bg-[#F6FAFF] text-[#60758A] border-[#C9DDF0] ring-4 ring-[#EAF4FF]'
                }`}>
                  {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : isActive ? <Play className="w-5 h-5 fill-white" /> : <Lock className="w-4 h-4" />}
                </div>

                {/* Node Content Card */}
                <div className={`flex-1 p-4 sm:p-5 rounded-3xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isActive
                    ? 'bg-[#FEF8EA] border-[#FCE09D] shadow-md'
                    : isCompleted
                      ? 'bg-white border-[#C9DDF0] text-[#18324A] shadow-2xs hover:border-[#2676D9]/50'
                      : 'bg-[#F6FAFF] border-[#C9DDF0] text-[#60758A]'
                }`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#60758A]">Etapa 0{index + 1}</span>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase border ${
                        isCompleted ? 'bg-[#EBF7EE] text-[#248846] border-[#A8E4BA]' :
                        isActive ? 'bg-[#F6B928] text-[#18324A] border-[#D68E08] animate-pulse' :
                        'bg-white text-[#60758A] border-[#C9DDF0]'
                      }`}>
                        {isCompleted ? 'Dominada' : isActive ? 'Missão Atual' : 'Em breve'}
                      </span>
                    </div>
                    <h4 className={`text-base font-black mt-1 ${isActive ? 'text-[#18324A]' : isCompleted ? 'text-[#18324A]' : 'text-[#60758A]'}`}>
                      {node.title}
                    </h4>
                    <p className="text-xs text-[#60758A] mt-0.5 font-bold leading-relaxed">{node.sub}</p>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                    <div className="text-right flex items-center gap-2">
                      <span className="text-xs font-black text-[#2676D9] bg-[#EAF4FF] px-2.5 py-1 rounded-xl border border-[#C9DDF0]">+{node.xp} XP</span>
                      <CoinBadge amount={node.coins} size="sm" />
                    </div>
                    {isActive && (
                      <GameButton
                        variant="reward"
                        size="md"
                        onClick={() => onStartMission()}
                        icon={<Play className="w-3.5 h-3.5 fill-current" />}
                      >
                        Jogar Missão
                      </GameButton>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
