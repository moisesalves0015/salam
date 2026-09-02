import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  ChevronRight, 
  Flame, 
  X,
  User,
  Sparkles
} from 'lucide-react';
import { Student } from '../types';

interface AlunosViewProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onAddStudent: (newStudent: Partial<Student>) => void;
}

export const AlunosView: React.FC<AlunosViewProps> = ({
  students,
  onSelectStudent,
  onAddStudent
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Student Form State
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('5º ano');
  const [newStudentClassroom, setNewStudentClassroom] = useState('Turma 5º ano A');
  const [newStudentNotes, setNewStudentNotes] = useState('');
  const [newStudentAdaptation, setNewStudentAdaptation] = useState('');

  const filteredStudents = students.filter(s => {
    const matchesFilter = filterStatus === 'todos' || s.status === filterStatus;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.statusAlertText.toLowerCase().includes(search.toLowerCase()) ||
      s.currentMission.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    onAddStudent({
      name: newStudentName,
      grade: newStudentGrade,
      classroom: newStudentClassroom,
      pedagogicalNotes: newStudentNotes || 'Aguardando avaliação diagnóstica inicial.',
      adaptations: newStudentAdaptation ? [newStudentAdaptation] : ['Atividades regulares']
    });

    setIsAddModalOpen(false);
    setNewStudentName('');
    setNewStudentNotes('');
    setNewStudentAdaptation('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>Gestão Pedagógica de Turma</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Alunos Acompanhados ({students.length})</h2>
          <p className="text-xs text-slate-600 mt-1">
            Acompanhe o percurso de cada estudante, diagnóstico de habilidades e intervenções individualizadas.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center gap-2 self-start sm:self-auto transition-all cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>Cadastrar Aluno</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[
            { id: 'todos', label: `Todos (${students.length})` },
            { id: 'evoluindo_bem', label: 'Evoluindo bem (18)' },
            { id: 'atencao', label: 'Atenção (9)' },
            { id: 'intervencao', label: 'Intervenção (5)' },
            { id: 'pronto_avancar', label: 'Pronto p/ Avançar' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterStatus(f.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                filterStatus === f.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrar por nome ou habilidade..."
            className="w-full bg-white text-xs text-slate-900 placeholder-slate-400 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 transition-colors shadow-xs"
          />
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelectStudent(s)}
            className="bg-white p-5 rounded-3xl border border-slate-200 hover:border-indigo-300 cursor-pointer transition-all flex flex-col justify-between group shadow-xs hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {s.avatarUrl ? (
                    <img 
                      src={s.avatarUrl} 
                      alt={s.name} 
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-200 group-hover:scale-105 transition-transform" 
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700 group-hover:scale-105 transition-transform">
                      <User className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {s.name}
                    </h3>
                    <div className="text-xs text-slate-500">{s.grade} • {s.classroom}</div>
                  </div>
                </div>

                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  s.status === 'intervencao' 
                    ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                    : s.status === 'atencao'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : s.status === 'pronto_avancar'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                }`}>
                  {s.status === 'intervencao' ? 'Intervenção' : s.status === 'atencao' ? 'Atenção' : s.status === 'pronto_avancar' ? 'Avançar' : 'Evoluindo'}
                </span>
              </div>

              {/* Status Alert Note */}
              <div className="mt-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <div className="line-clamp-2">{s.statusAlertText}</div>
              </div>

              {/* Subject Trails Miniature Progress */}
              <div className="grid grid-cols-3 gap-2 text-center mt-3 text-xs bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                <div>
                  <div className="text-[10px] text-slate-500">Português</div>
                  <div className="font-bold text-cyan-700 mt-0.5">{s.trailProgress.portugues}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Matemática</div>
                  <div className="font-bold text-emerald-700 mt-0.5">{s.trailProgress.matematica}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500">Ciências</div>
                  <div className="font-bold text-amber-700 mt-0.5">{s.trailProgress.ciencias}%</div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-slate-500">
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-400" />
                <span className="font-bold text-slate-800">{s.streakDays}d</span>
                <span className="text-[10px] ml-2">Nv. {s.level}</span>
              </div>

              <span className="text-indigo-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Prontuário</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Adicionar Aluno */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-indigo-600" />
                <span>Cadastro de Aluno na Sala de Missões</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nome do Aluno</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="Ex: Gabriel Alves"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Ano Escolar</label>
                  <select
                    value={newStudentGrade}
                    onChange={(e) => setNewStudentGrade(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="4º ano">4º ano</option>
                    <option value="5º ano">5º ano</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Turma</label>
                  <input
                    type="text"
                    value={newStudentClassroom}
                    onChange={(e) => setNewStudentClassroom(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Informações Pedagógicas / Observações</label>
                <textarea
                  value={newStudentNotes}
                  onChange={(e) => setNewStudentNotes(e.target.value)}
                  placeholder="Ex: Dificuldade em divisão com algoritmos formais, bom raciocínio com imagens..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 h-20 resize-none focus:bg-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Necessidades de Adaptação (Inclusão)</label>
                <input
                  type="text"
                  value={newStudentAdaptation}
                  onChange={(e) => setNewStudentAdaptation(e.target.value)}
                  placeholder="Ex: Tempo adicional, materiais manipuláveis, leitura mediada"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-2xl text-[11px] text-indigo-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Após o cadastro, o perfil é criado com status <em>Aguardando Diagnóstico</em>.</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold cursor-pointer hover:bg-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer shadow-xs"
                >
                  Salvar Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
