import React from 'react';
import {
  Trophy,
  Star,
  Award,
  Heart,
  Users,
  Zap,
  Medal,
  Sparkles,
  Crown,
  Filter,
} from 'lucide-react';
import { Student } from '../types';

interface ReconhecimentoViewProps {
  students: Student[];
}

type CertType = 'evolucao' | 'persistencia' | 'colaboracao' | 'dominio' | 'cultura' | 'all';

const CERT_TYPES: { id: CertType; label: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string; border: string; desc: string }[] = [
  { id: 'all', label: 'Todos', icon: Filter, color: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-200', desc: '' },
  { id: 'evolucao', label: 'Evolução', icon: Zap, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', desc: 'Estudante demonstrou salto significativo de aprendizagem' },
  { id: 'persistencia', label: 'Persistência', icon: Heart, color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', desc: 'Estudante não desistiu diante das dificuldades' },
  { id: 'colaboracao', label: 'Colaboração', icon: Users, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', desc: 'Estudante apoiou o crescimento dos colegas' },
  { id: 'dominio', label: 'Domínio', icon: Star, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', desc: 'Estudante dominou habilidade com autonomia e transferência' },
  { id: 'cultura', label: 'Cultura', icon: Crown, color: 'text-pink-700', bg: 'bg-pink-50', border: 'border-pink-200', desc: 'Estudante se destacou na Trilha Cultural' },
];

export const ReconhecimentoView: React.FC<ReconhecimentoViewProps> = (_props) => (
  <div className="space-y-6 pb-12 animate-in fade-in duration-300">
    <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
      <div>
        <div className="flex items-center gap-2 text-xs font-black text-amber-600 uppercase tracking-widest mb-1">
          <Trophy className="w-4 h-4" />
          Sistema de Reconhecimento Presencial
        </div>
        <h2 className="text-2xl font-black text-slate-900">Reconhecimentos &amp; Certificados</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed font-medium">
          Identificar e celebrar conquistas presencialmente transforma a relação do estudante com o aprendizado.
        </p>
      </div>
    </div>

    <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
      <div className="flex items-start gap-3">
        <Heart className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-black text-amber-900 mb-1">Por que o reconhecimento presencial importa?</h3>
          <p className="text-xs text-amber-700 leading-relaxed font-medium">
            O reconhecimento presencial vai além das conquistas digitais. Quando o professor ou coordenador celebra uma conquista na frente da turma — ou entrega um certificado físico — isso reforça a identidade positiva do estudante, constrói autoestima e cria um senso de pertencimento real.
          </p>
        </div>
      </div>
    </div>

    <div className="flex flex-wrap gap-2" aria-label="Catálogo de tipos de reconhecimento">
      {CERT_TYPES.map((ct) => (
        <div
          key={ct.id}
          title={ct.desc || undefined}
          className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 border-2 ${ct.bg} ${ct.border} ${ct.color}`}
        >
          <ct.icon className="w-3.5 h-3.5" />
          {ct.label}
        </div>
      ))}
    </div>

    <div className="text-center py-12 px-4 rounded-3xl border-2 border-dashed border-slate-200 bg-white">
      <div className="flex justify-center gap-2 mb-3 text-slate-300">
        <Medal className="w-8 h-8" />
        <Award className="w-8 h-8" />
        <Sparkles className="w-8 h-8" />
      </div>
      <p className="text-sm font-bold text-slate-600">Não há reconhecimentos persistidos disponíveis.</p>
      <p className="text-xs text-slate-400 mt-1">Nenhum registro de reconhecimento pode ser exibido nesta tela no momento.</p>
    </div>
  </div>
);
