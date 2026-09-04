import React, { useState } from 'react';
import {
  Rocket,
  Star,
  GraduationCap,
  BookOpen,
  Globe,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Users,
  Zap
} from 'lucide-react';
import { Student } from '../types';

interface LoginScreenProps {
  students: Student[];
  onLoginAsStudent: (student: Student) => void;
  onLoginAsProfessor: () => void;
  onLoginAsCoordenacao: () => void;
  onBack: () => void;
  defaultRole?: 'aluno' | 'professor' | 'coordenacao';
}

const ROLE_OPTIONS = [
  {
    id: 'aluno' as const,
    label: 'Sou Aluno(a)',
    desc: 'Acesse sua jornada de missões',
    icon: GraduationCap,
    color: 'from-blue-600 to-indigo-600',
    border: 'border-blue-400/30',
    glow: 'shadow-blue-600/20',
    badge: '4º e 5º Ano'
  },
  {
    id: 'professor' as const,
    label: 'Sou Professor(a)',
    desc: 'Acompanhe o progresso da turma',
    icon: BookOpen,
    color: 'from-purple-600 to-pink-600',
    border: 'border-purple-400/30',
    glow: 'shadow-purple-600/20',
    badge: 'Área Docente'
  },
  {
    id: 'coordenacao' as const,
    label: 'Coordenação',
    desc: 'Visão geral do projeto',
    icon: Globe,
    color: 'from-emerald-600 to-teal-600',
    border: 'border-emerald-400/30',
    glow: 'shadow-emerald-600/20',
    badge: 'Gestão Pedagógica'
  },
];

export const LoginScreen: React.FC<LoginScreenProps> = ({
  students,
  onLoginAsStudent,
  onLoginAsProfessor,
  onLoginAsCoordenacao,
  onBack,
  defaultRole
}) => {
  const [selectedRole, setSelectedRole] = useState<'aluno' | 'professor' | 'coordenacao' | null>(defaultRole || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [pinDigits, setPinDigits] = useState<string[]>(['', '', '', '']);
  const [pinError, setPinError] = useState(false);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.classroom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleSelect = (role: 'aluno' | 'professor' | 'coordenacao') => {
    setSelectedRole(role);
    if (role === 'professor') {
      setTimeout(onLoginAsProfessor, 200);
    } else if (role === 'coordenacao') {
      setTimeout(onLoginAsCoordenacao, 200);
    }
  };

  const handleStudentSelect = (student: Student) => {
    setSelectedStudent(student);
    setPinDigits(['', '', '', '']);
    setPinError(false);
  };

  const handlePinInput = (digit: string, index: number) => {
    const newDigits = [...pinDigits];
    newDigits[index] = digit;
    setPinDigits(newDigits);
    setPinError(false);

    // Auto-focus next input
    if (digit && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }

    // Auto-login when all 4 digits entered (PIN is always correct in demo mode)
    if (newDigits.every(d => d !== '') && index === 3 && selectedStudent) {
      setTimeout(() => {
        onLoginAsStudent(selectedStudent);
      }, 400);
    }
  };

  const handlePinKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      if (prevInput) (prevInput as HTMLInputElement).focus();
    }
  };

  const handleDirectLogin = () => {
    if (selectedStudent) {
      onLoginAsStudent(selectedStudent);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute w-[400px] h-[400px] bg-blue-700/20 rounded-full blur-3xl -top-40 -left-20 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] bg-purple-700/20 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-white text-xs font-medium mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar
          </button>

          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-lg font-black text-white tracking-wide">SALA DE MISSÕES</div>
              <div className="text-xs text-blue-400 font-bold">Portal de Entrada</div>
            </div>
          </div>
          <p className="text-slate-400 text-sm">Quem vai embarcar nessa aventura?</p>
        </div>

        {/* Role Selection */}
        {!selectedRole && (
          <div className="space-y-3">
            {ROLE_OPTIONS.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-3xl bg-white/5 border ${role.border} hover:bg-white/10 transition-all group cursor-pointer text-left`}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg ${role.glow} shrink-0 group-hover:scale-110 transition-transform`}>
                  <role.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-base font-black text-white">{role.label}</span>
                    <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      {role.badge}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{role.desc}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))}
          </div>
        )}

        {/* Student Selection */}
        {selectedRole === 'aluno' && !selectedStudent && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => setSelectedRole(null)}
                className="text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h3 className="text-base font-black text-white">Quem é você?</h3>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Pesquisar seu nome..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                autoFocus
              />
            </div>

            {/* Student List */}
            <div className="space-y-2 max-h-72 overflow-y-auto no-scrollbar">
              {filteredStudents.map((student) => (
                <button
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all cursor-pointer text-left group"
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 shrink-0 bg-slate-700 flex items-center justify-center">
                    {student.avatarUrl ? (
                      <img src={student.avatarUrl} alt={student.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg">{student.avatar}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-black text-white truncate">{student.name}</div>
                    <div className="text-xs text-slate-400">{student.classroom} • Nível {student.level}</div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-amber-400 font-bold">{student.currentXp} XP</span>
                  </div>
                </button>
              ))}
              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-slate-500 text-sm">
                  Nenhum aluno encontrado
                </div>
              )}
            </div>
          </div>
        )}

        {/* PIN Entry / Direct Login */}
        {selectedRole === 'aluno' && selectedStudent && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-500 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h3 className="text-base font-black text-white">Confirmar identidade</h3>
            </div>

            {/* Selected Student Card */}
            <div className="flex items-center gap-4 p-5 rounded-3xl bg-gradient-to-br from-blue-900/50 to-indigo-900/50 border border-blue-500/30">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-blue-400/50 shrink-0">
                {selectedStudent.avatarUrl ? (
                  <img src={selectedStudent.avatarUrl} alt={selectedStudent.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-700 flex items-center justify-center text-2xl">
                    {selectedStudent.avatar}
                  </div>
                )}
              </div>
              <div>
                <div className="text-lg font-black text-white">{selectedStudent.name}</div>
                <div className="text-xs text-blue-300 font-medium">{selectedStudent.classroom}</div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-amber-400 font-bold">{selectedStudent.currentXp} XP</span>
                  </div>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-blue-300 font-bold">Nível {selectedStudent.level}</span>
                </div>
              </div>
            </div>

            {/* Simple PIN or Direct Access */}
            <div className="text-center">
              <p className="text-slate-400 text-xs mb-4">Digite seu PIN de 4 dígitos ou entre diretamente</p>

              <div className="flex gap-3 justify-center mb-6">
                {[0, 1, 2, 3].map((i) => (
                  <input
                    key={i}
                    id={`pin-${i}`}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={pinDigits[i]}
                    onChange={e => handlePinInput(e.target.value.replace(/\D/, ''), i)}
                    onKeyDown={e => handlePinKeyDown(e, i)}
                    className={`w-14 h-14 text-center text-xl font-black rounded-2xl border bg-white/5 text-white focus:outline-none transition-all ${
                      pinError
                        ? 'border-red-500 bg-red-900/20'
                        : pinDigits[i]
                          ? 'border-blue-500 bg-blue-900/20'
                          : 'border-white/10 focus:border-blue-500/50'
                    }`}
                  />
                ))}
              </div>

              {pinError && (
                <p className="text-xs text-red-400 mb-4">PIN incorreto. Tente novamente.</p>
              )}

              <button
                onClick={handleDirectLogin}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-sm transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <Sparkles className="w-4 h-4" />
                Entrar na Sala de Missões!
                <Zap className="w-4 h-4" />
              </button>

              <p className="text-xs text-slate-600 mt-3">
                Modo demonstração — qualquer PIN funciona
              </p>
            </div>
          </div>
        )}

        {/* Decorative bottom text */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
            <Users className="w-3.5 h-3.5" />
            <span>EM Monte das Águas • 4º e 5º Anos • Escola Pública</span>
          </div>
        </div>
      </div>
    </div>
  );
};
