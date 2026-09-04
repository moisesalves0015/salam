import React, { useState } from 'react';
import { X, Camera, CheckCircle2, ArrowRight, BookOpen, Star, Sparkles, AlertCircle } from 'lucide-react';
import { Student, Subject } from '../types';

interface EvidenciaModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: EvidenciaData) => void;
}

export interface EvidenciaData {
  studentId: string;
  missionId: string;
  missionTitle: string;
  ability: string;
  subject: Subject;
  result: 'dominada' | 'revisar' | 'intervencao';
  notes: string;
  nextStep: string;
  photoBase64?: string;
}

const ABILITIES_BY_SUBJECT: Record<Subject, string[]> = {
  'Matemática': [
    'Sistema de Numeração Decimal',
    'Adição com reagrupamento',
    'Subtração com reagrupamento',
    'Multiplicação por agrupamento',
    'Divisão por agrupamento',
    'Resolução de problemas'
  ],
  'Língua Portuguesa': [
    'Relação fonema-grafema',
    'Compreensão textual',
    'Inferência e ideia central',
    'Produção textual',
    'Oralidade e argumentação',
    'Pontuação e sintaxe'
  ],
  'Ciências': [
    'Observação e classificação',
    'Ciclos naturais',
    'Experimentação científica',
    'Ecossistemas e biodiversidade',
    'Matéria e energia'
  ]
};

export const EvidenciaModal: React.FC<EvidenciaModalProps> = ({
  student,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Matemática');
  const [selectedAbility, setSelectedAbility] = useState('');
  const [missionTitle, setMissionTitle] = useState('');
  const [result, setResult] = useState<'dominada' | 'revisar' | 'intervencao' | null>(null);
  const [notes, setNotes] = useState('');
  const [nextStep, setNextStep] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  if (!isOpen || !student) return null;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = () => {
    if (!selectedAbility || !result) return;
    onConfirm({
      studentId: student.id,
      missionId: `manual-${Date.now()}`,
      missionTitle: missionTitle || 'Atividade Impressa',
      ability: selectedAbility,
      subject: selectedSubject,
      result,
      notes,
      nextStep,
      photoBase64: photoPreview || undefined
    });
    onClose();
  };

  const canAdvanceStep1 = selectedAbility && missionTitle;
  const canAdvanceStep2 = result !== null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-purple-100 uppercase tracking-wide">Registrar Evidência</div>
              <h3 className="text-base font-black text-white">Atividade Impressa de {student.name}</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white/20 text-white hover:bg-white/30 cursor-pointer transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex border-b border-slate-100">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 py-2 text-center text-xs font-black border-b-2 transition-all ${
              step === s ? 'text-purple-700 border-purple-600' :
              (s as number) < step ? 'text-emerald-600 border-emerald-500' :
              'text-slate-400 border-transparent'
            }`}>
              {s < step ? '✅' : s === 1 ? '📋 Atividade' : s === 2 ? '🎯 Resultado' : '📝 Próximos Passos'}
            </div>
          ))}
        </div>

        <div className="p-6 space-y-4">
          {/* STEP 1: Activity Info */}
          {step === 1 && (
            <>
              <div>
                <label className="block text-xs font-black text-slate-700 mb-2">Nome da Atividade / Missão</label>
                <input
                  type="text"
                  placeholder="Ex: Missão de Divisão — Grupos Iguais"
                  value={missionTitle}
                  onChange={e => setMissionTitle(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:outline-none focus:border-purple-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-2">Disciplina</label>
                <div className="flex gap-2">
                  {(['Matemática', 'Língua Portuguesa', 'Ciências'] as Subject[]).map((subj) => (
                    <button
                      key={subj}
                      onClick={() => { setSelectedSubject(subj); setSelectedAbility(''); }}
                      className={`flex-1 py-2 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
                        selectedSubject === subj
                          ? 'bg-purple-600 text-white border-purple-700'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-purple-300'
                      }`}
                    >
                      {subj === 'Matemática' ? '🔢' : subj === 'Língua Portuguesa' ? '📖' : '🔬'} {subj.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-2">Habilidade trabalhada</label>
                <div className="grid grid-cols-1 gap-2">
                  {ABILITIES_BY_SUBJECT[selectedSubject].map((ability) => (
                    <button
                      key={ability}
                      onClick={() => setSelectedAbility(ability)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl border-2 text-xs font-medium transition-all cursor-pointer flex items-center gap-2 ${
                        selectedAbility === ability
                          ? 'border-purple-500 bg-purple-50 text-purple-900 font-black'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-purple-300'
                      }`}
                    >
                      <Star className={`w-3 h-3 shrink-0 ${selectedAbility === ability ? 'text-purple-600' : 'text-slate-400'}`} />
                      {ability}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-black text-slate-700 mb-2">
                  Foto da Atividade (opcional)
                </label>
                <div className="relative">
                  {photoPreview ? (
                    <div className="relative">
                      <img src={photoPreview} alt="Evidência" className="w-full h-32 object-cover rounded-xl border-2 border-purple-300" />
                      <button
                        onClick={() => setPhotoPreview(null)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 hover:border-purple-400 hover:text-purple-500 cursor-pointer transition-all">
                      <Camera className="w-6 h-6 mb-1" />
                      <span className="text-xs font-medium">Tirar foto ou carregar imagem</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                    </label>
                  )}
                </div>
              </div>
            </>
          )}

          {/* STEP 2: Result */}
          {step === 2 && (
            <>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Atividade:</div>
                <div className="text-sm font-black text-slate-900">{missionTitle}</div>
                <div className="text-xs text-purple-700 font-bold mt-0.5">{selectedAbility}</div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-3">Resultado observado</label>
                <div className="space-y-2">
                  {[
                    {
                      id: 'dominada' as const,
                      label: '✅ Habilidade Dominada',
                      desc: 'O estudante demonstrou autonomia e precisão na atividade.',
                      color: 'border-emerald-400 bg-emerald-50 text-emerald-900'
                    },
                    {
                      id: 'revisar' as const,
                      label: '⚠️ Precisa Revisar',
                      desc: 'O estudante demonstrou compreensão parcial — precisa de mais prática.',
                      color: 'border-amber-400 bg-amber-50 text-amber-900'
                    },
                    {
                      id: 'intervencao' as const,
                      label: '🔴 Necessita Intervenção',
                      desc: 'O estudante apresentou dificuldade significativa — intervenção pedagógica necessária.',
                      color: 'border-red-400 bg-red-50 text-red-900'
                    }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setResult(opt.id)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        result === opt.id ? opt.color : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-sm font-black">{opt.label}</div>
                      <div className="text-xs font-medium mt-0.5 opacity-80">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-2">Observações pedagógicas (opcional)</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Ex: Conseguiu resolver as divisões exatas mas teve dificuldade quando havia resto..."
                  rows={3}
                  className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:outline-none focus:border-purple-400 resize-none transition-all"
                />
              </div>
            </>
          )}

          {/* STEP 3: Next Steps */}
          {step === 3 && (
            <>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                {result === 'dominada' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                ) : result === 'revisar' ? (
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
                )}
                <div>
                  <div className="text-sm font-black text-slate-900">
                    {result === 'dominada' ? 'Habilidade Dominada!' :
                     result === 'revisar' ? 'Precisa de Revisão' :
                     'Intervenção Necessária'}
                  </div>
                  <div className="text-xs text-slate-500">{student.name} • {selectedAbility}</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-2">Próximo passo pedagógico</label>
                <div className="grid grid-cols-1 gap-2 mb-3">
                  {(result === 'dominada' ? [
                    'Avançar para a próxima missão da trilha',
                    'Propor missão desafio extra',
                    'Convidar para ser tutor de colega'
                  ] : result === 'revisar' ? [
                    'Revisitar o conteúdo com nova abordagem',
                    'Propor atividade com manipulativo concreto',
                    'Agendar sessão de revisão em dupla'
                  ] : [
                    'Agendar intervenção individual urgente',
                    'Adaptar a missão com menor nível de abstração',
                    'Registrar intervenção no sistema e acionar coordenação'
                  ]).map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setNextStep(suggestion)}
                      className={`w-full text-left p-3 rounded-xl border-2 text-xs font-medium transition-all cursor-pointer ${
                        nextStep === suggestion
                          ? 'border-purple-500 bg-purple-50 text-purple-900 font-black'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-purple-200'
                      }`}
                    >
                      <ArrowRight className="w-3 h-3 inline mr-1" />
                      {suggestion}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Ou escreva um próximo passo personalizado..."
                  value={nextStep}
                  onChange={e => setNextStep(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm text-slate-700 focus:outline-none focus:border-purple-400 transition-all"
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-between items-center">
          <button
            onClick={() => step > 1 ? setStep((step - 1) as 1 | 2 | 3) : onClose()}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-black cursor-pointer hover:bg-slate-100 transition-all"
          >
            {step === 1 ? 'Cancelar' : '← Voltar'}
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep((step + 1) as 2 | 3)}
              disabled={step === 1 ? !canAdvanceStep1 : !canAdvanceStep2}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              Continuar
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="px-5 py-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer hover:opacity-90 transition-all shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Confirmar Evidência
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
