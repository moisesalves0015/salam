import React, { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Award, 
  Heart, 
  Users, 
  Zap,
  Printer,
  Download,
  CheckCircle2,
  Medal,
  Sparkles,
  Crown,
  Filter
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

// Mock recognitions based on student data
const generateRecognitions = (students: Student[]) => {
  const recs: { studentId: string; studentName: string; avatar: string; avatarUrl?: string; type: CertType; reason: string; ability: string; date: string; celebrated: boolean }[] = [];
  
  students.forEach(student => {
    if (student.status === 'evoluindo_bem') {
      recs.push({
        studentId: student.id,
        studentName: student.name,
        avatar: student.avatar,
        avatarUrl: student.avatarUrl,
        type: 'evolucao',
        reason: 'Demonstrou evolução consistente em múltiplas habilidades',
        ability: student.currentMission?.primaryAbility || 'Múltiplas habilidades',
        date: 'Esta semana',
        celebrated: false
      });
    }
    if (student.streakDays >= 5) {
      recs.push({
        studentId: student.id,
        studentName: student.name,
        avatar: student.avatar,
        avatarUrl: student.avatarUrl,
        type: 'persistencia',
        reason: `${student.streakDays} dias consecutivos de dedicação às missões`,
        ability: 'Persistência e comprometimento',
        date: 'Últimos 7 dias',
        celebrated: false
      });
    }
    if (student.level >= 10) {
      recs.push({
        studentId: student.id,
        studentName: student.name,
        avatar: student.avatar,
        avatarUrl: student.avatarUrl,
        type: 'dominio',
        reason: `Alcançou Nível ${student.level} demonstrando domínio de múltiplas habilidades`,
        ability: student.currentMission?.primaryAbility || 'Habilidades variadas',
        date: 'Esta semana',
        celebrated: false
      });
    }
  });

  return recs;
};

interface CertPreviewProps {
  studentName: string;
  avatarUrl?: string;
  avatar: string;
  type: CertType;
  reason: string;
  ability: string;
}

const CertPreview: React.FC<CertPreviewProps> = ({ studentName, avatarUrl, avatar, type, reason, ability }) => {
  const certConfig = CERT_TYPES.find(c => c.id === type) || CERT_TYPES[1];
  
  const gradients: Record<CertType, string> = {
    all: 'from-slate-500 to-slate-700',
    evolucao: 'from-blue-600 to-indigo-700',
    persistencia: 'from-red-500 to-pink-700',
    colaboracao: 'from-purple-600 to-violet-700',
    dominio: 'from-amber-500 to-orange-600',
    cultura: 'from-pink-500 to-rose-700',
  };

  return (
    <div className={`relative p-6 rounded-3xl bg-gradient-to-br ${gradients[type]} text-white overflow-hidden min-h-[180px]`}>
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/5 translate-y-6 -translate-x-6" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-[9px] font-black text-white/70 uppercase tracking-widest">SALA DE MISSÕES</div>
            <div className="text-[9px] text-white/60 font-medium">Certificado de Reconhecimento</div>
          </div>
          <certConfig.icon className="w-6 h-6 text-white/80" />
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 border-2 border-white/30 overflow-hidden shrink-0">
            {avatarUrl ? (
              <img src={avatarUrl} alt={studentName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xl">{avatar}</div>
            )}
          </div>
          <div>
            <div className="text-xs text-white/70 font-medium">Concedido a</div>
            <div className="text-base font-black text-white">{studentName}</div>
          </div>
        </div>

        <div className="text-[10px] font-black text-white/80 uppercase tracking-wide mb-1">
          {certConfig.label} • {ability}
        </div>
        <p className="text-xs text-white/70 font-medium leading-relaxed">{reason}</p>

        <div className="mt-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-white/60" />
          <div className="text-[9px] text-white/50 font-medium">Escola Municipal Monte das Águas • 2026</div>
        </div>
      </div>
    </div>
  );
};

export const ReconhecimentoView: React.FC<ReconhecimentoViewProps> = ({ students }) => {
  const [activeFilter, setActiveFilter] = useState<CertType>('all');
  const [celebrated, setCelebrated] = useState<Set<string>>(new Set());
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const allRecognitions = generateRecognitions(students);
  const filtered = activeFilter === 'all' ? allRecognitions : allRecognitions.filter(r => r.type === activeFilter);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const markCelebrated = (key: string) => {
    setCelebrated(prev => new Set([...prev, key]));
    showToast('Reconhecimento marcado como celebrado! 🎉');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 border border-purple-500/50 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-amber-600 uppercase tracking-widest mb-1">
            <Trophy className="w-4 h-4" />
            Sistema de Reconhecimento Presencial
          </div>
          <h2 className="text-2xl font-black text-slate-900">Reconhecimentos & Certificados</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl leading-relaxed font-medium">
            Identificar e celebrar conquistas presencialmente transforma a relação do estudante com o aprendizado. Aqui você vê quem está pronto para ser reconhecido e pode gerar os certificados.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Relatório de reconhecimentos exportado!')}
            className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2 hover:bg-slate-50 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4 text-blue-600" />
            Exportar
          </button>
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black flex items-center gap-2 cursor-pointer hover:opacity-90 transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Imprimir Certificados
          </button>
        </div>
      </div>

      {/* Why Recognition Matters */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
        <div className="flex items-start gap-3">
          <Heart className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-black text-amber-900 mb-1">Por que o reconhecimento presencial importa?</h3>
            <p className="text-xs text-amber-700 leading-relaxed font-medium">
              O reconhecimento presencial vai além das conquistas digitais. Quando o professor ou coordenador celebra uma conquista na frente da turma — ou entrega um certificado físico — isso reforça a identidade positiva do estudante, constrói autoestima e cria um senso de pertencimento real. A Sala de Missões mapeia quem está pronto para receber esse reconhecimento.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Reconhecimentos Pendentes', value: allRecognitions.length, icon: Medal, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
          { label: 'Já Celebrados', value: celebrated.size, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
          { label: 'Estudantes Destaque', value: new Set(allRecognitions.map(r => r.studentId)).size, icon: Star, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
          { label: 'Tipos de Conquista', value: 5, icon: Award, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-2xl ${stat.bg} border ${stat.border} flex items-center gap-3`}>
            <stat.icon className={`w-6 h-6 ${stat.color} shrink-0`} />
            <div>
              <div className={`text-xl font-black ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-600 font-medium leading-tight">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap gap-2">
        {CERT_TYPES.map(ct => (
          <button
            key={ct.id}
            onClick={() => setActiveFilter(ct.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 border-2 transition-all cursor-pointer ${
              activeFilter === ct.id ? `${ct.bg} ${ct.border} ${ct.color}` : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <ct.icon className="w-3.5 h-3.5" />
            {ct.label}
          </button>
        ))}
      </div>

      {/* Recognition Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">Nenhum reconhecimento nessa categoria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filtered.map((rec, i) => {
            const key = `${rec.studentId}-${rec.type}-${i}`;
            const isCelebrated = celebrated.has(key);
            const certType = CERT_TYPES.find(c => c.id === rec.type)!;
            const isSelected = selectedCert === key;

            return (
              <div key={key} className={`rounded-3xl border-2 overflow-hidden transition-all ${
                isCelebrated ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white hover:border-amber-300'
              }`}>
                {/* Student row */}
                <div className="flex items-center gap-4 p-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                    {rec.avatarUrl ? (
                      <img src={rec.avatarUrl} alt={rec.studentName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-2xl">{rec.avatar}</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-black text-slate-900">{rec.studentName}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-black border ${certType.bg} ${certType.border} ${certType.color}`}>
                        {certType.label}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">{rec.date}</span>
                    </div>
                  </div>
                  {isCelebrated && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                </div>

                {/* Recognition detail */}
                <div className="p-4 space-y-3">
                  <div>
                    <div className="text-[10px] font-black text-slate-500 uppercase mb-1">Conquista:</div>
                    <p className="text-xs text-slate-700 font-medium leading-snug">{rec.reason}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="text-xs text-slate-600 font-bold">{rec.ability}</span>
                  </div>

                  {/* Suggestions for recognition */}
                  {!isCelebrated && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-[10px] font-black text-slate-600 uppercase mb-1.5">Sugestões de Reconhecimento Presencial:</div>
                      <div className="space-y-1">
                        {certType.id === 'evolucao' && (
                          <>
                            <div className="text-[10px] text-slate-500">• Anunciar a conquista para a turma com aplausos</div>
                            <div className="text-[10px] text-slate-500">• Entregar certificado impresso na sala</div>
                            <div className="text-[10px] text-slate-500">• Registrar no mural da turma</div>
                          </>
                        )}
                        {certType.id === 'persistencia' && (
                          <>
                            <div className="text-[10px] text-slate-500">• Mencionar a história de superação como exemplo para a turma</div>
                            <div className="text-[10px] text-slate-500">• Entregar certificado com mensagem personalizada</div>
                          </>
                        )}
                        {certType.id === 'colaboracao' && (
                          <>
                            <div className="text-[10px] text-slate-500">• Reconhecer publicamente o apoio ao colega</div>
                            <div className="text-[10px] text-slate-500">• Oferecer papel de líder na próxima missão em grupo</div>
                          </>
                        )}
                        {certType.id === 'dominio' && (
                          <>
                            <div className="text-[10px] text-slate-500">• Convidar para apresentar para a turma como aprendeu</div>
                            <div className="text-[10px] text-slate-500">• Entregar certificado de domínio com destaque especial</div>
                          </>
                        )}
                        {certType.id === 'cultura' && (
                          <>
                            <div className="text-[10px] text-slate-500">• Destacar a produção cultural na mostra da escola</div>
                            <div className="text-[10px] text-slate-500">• Registrar no portfólio cultural da turma</div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Certificate Preview Toggle */}
                  {isSelected && (
                    <div className="mt-3">
                      <div className="text-[10px] font-black text-slate-500 uppercase mb-2">Prévia do Certificado:</div>
                      <CertPreview
                        studentName={rec.studentName}
                        avatarUrl={rec.avatarUrl}
                        avatar={rec.avatar}
                        type={rec.type}
                        reason={rec.reason}
                        ability={rec.ability}
                      />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setSelectedCert(isSelected ? null : key)}
                      className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-all border border-slate-200"
                    >
                      {isSelected ? 'Fechar Prévia' : '👁️ Ver Certificado'}
                    </button>
                    {!isCelebrated ? (
                      <button
                        onClick={() => markCelebrated(key)}
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-black cursor-pointer hover:opacity-90 transition-all shadow-sm"
                      >
                        ✅ Marcar como Celebrado
                      </button>
                    ) : (
                      <div className="flex-1 py-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-700 text-xs font-black text-center flex items-center justify-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Celebrado!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* All Students Overview */}
      <div className="bg-white p-5 rounded-3xl border-2 border-slate-100">
        <h3 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
          <Crown className="w-4 h-4 text-amber-500" />
          Todos os Estudantes — Destaque da Semana
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {students.map((student) => (
            <div key={student.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-white shadow-xs mx-auto mb-2">
                {student.avatarUrl ? (
                  <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-200 flex items-center justify-center">{student.avatar}</div>
                )}
              </div>
              <div className="text-xs font-black text-slate-900 truncate">{student.name.split(' ')[0]}</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-400" />
                <span className="text-[10px] text-amber-600 font-bold">{student.currentXp} XP</span>
              </div>
              <div className={`text-[9px] px-1.5 py-0.5 rounded-full font-black mt-1 ${
                student.status === 'evoluindo_bem' ? 'bg-emerald-100 text-emerald-700' :
                student.status === 'pronto_avancar' ? 'bg-blue-100 text-blue-700' :
                student.status === 'atencao' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {student.status === 'evoluindo_bem' ? '🌟 Evoluindo' :
                 student.status === 'pronto_avancar' ? '🚀 Pronto' :
                 student.status === 'atencao' ? '⚠️ Atenção' :
                 '🔴 Intervenção'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
