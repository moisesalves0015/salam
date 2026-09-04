import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ProfessorDashboard } from './components/ProfessorDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { AlunosView } from './components/AlunosView';
import { TrilhasView } from './components/TrilhasView';
import { CardsAlbumView } from './components/CardsAlbumView';
import { RelatoriosView } from './components/RelatoriosView';
import { CoordenacaoDashboard } from './components/CoordenacaoDashboard';
import { PainelSalaMissoes } from './components/PainelSalaMissoes';
import { MissionPlayerModal } from './components/MissionPlayerModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { CardDetailModal } from './components/CardDetailModal';
import { InterventionModal } from './components/InterventionModal';
import { DiagnosticModal } from './components/DiagnosticModal';
import { ResourcesModal } from './components/ResourcesModal';
import { AchievementsModal } from './components/AchievementsModal';
import { NotificationsModal } from './components/NotificationsModal';
import { LandingPage } from './components/LandingPage';
import { LoginScreen } from './components/LoginScreen';
import { ReconhecimentoView } from './components/ReconhecimentoView';
import { LojaMoedasView } from './components/LojaMoedasView';
import { MissionPrintView } from './components/MissionPrintView';
import { 
  INITIAL_STUDENTS, 
  INITIAL_CARDS, 
  INITIAL_ACHIEVEMENTS, 
  INITIAL_MISSION_DIVISAO, 
  INITIAL_CLASS_METRICS 
} from './data/initialData';
import { UserRole, Student, CardItem, InterventionRecord } from './types';
import confetti from 'canvas-confetti';

// App-level navigation states
type AppScreen = 'landing' | 'login' | 'app';

export default function App() {
  // Screen / Navigation
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [loginDefaultRole, setLoginDefaultRole] = useState<'aluno' | 'professor' | 'coordenacao' | undefined>(undefined);

  // Global States
  const [currentRole, setCurrentRole] = useState<UserRole>('professor');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student>(INITIAL_STUDENTS[0]);
  const [cards, setCards] = useState<CardItem[]>(INITIAL_CARDS);
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
  const [metrics, setMetrics] = useState(INITIAL_CLASS_METRICS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isTvModeOpen, setIsTvModeOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Landing / Login Handlers
  const handleEnterAsStudent = () => {
    setLoginDefaultRole('aluno');
    setCurrentScreen('login');
  };
  const handleEnterAsProfessor = () => {
    setCurrentRole('professor');
    setActiveTab('dashboard');
    setCurrentScreen('app');
  };
  const handleEnterAsCoordenacao = () => {
    setCurrentRole('coordenacao');
    setActiveTab('dashboard');
    setCurrentScreen('app');
  };
  const handleLoginStudent = (student: Student) => {
    setSelectedStudent(student);
    setCurrentRole('aluno');
    setActiveTab('dashboard');
    setCurrentScreen('app');
  };

  // Modal States
  const [isMissionPlayerOpen, setIsMissionPlayerOpen] = useState(false);
  const [isMissionPrintOpen, setIsMissionPrintOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isCardDetailOpen, setIsCardDetailOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState(false);
  const [isDiagnosticModalOpen, setIsDiagnosticModalOpen] = useState(false);
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState(false);
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);


  // Handlers
  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsProfileModalOpen(true);
  };

  const handleStartMission = (missionId?: string) => {
    setIsMissionPlayerOpen(true);
  };

  const handleOpenCard = (card: CardItem) => {
    setSelectedCard(card);
    setIsCardDetailOpen(true);
  };

  const handleCompleteMission = (xpEarned: number, updatedAbility: string) => {
    setIsMissionPlayerOpen(false);

    // Update active student data
    setStudents(prev => prev.map(s => {
      if (s.id === selectedStudent.id) {
        const updatedXP = s.currentXp + xpEarned;
        const updatedAbilities = s.abilities.map(ab => {
          if (ab.id === 'mat-divisao') {
            return {
              ...ab,
              score: Math.min(100, ab.score + 15),
              attempts: ab.attempts + 1,
              autonomy: Math.min(100, ab.autonomy + 12),
              state: 'consolidando' as const
            };
          }
          return ab;
        });

        const updatedStudent: Student = {
          ...s,
          currentXp: updatedXP,
          streakDays: s.streakDays + 1,
          status: 'evoluindo_bem',
          statusAlertText: 'Compreendeu divisão com materiais visuais. Avançando para problemas contextualizados.',
          abilities: updatedAbilities,
          trailProgress: {
            ...s.trailProgress,
            matematica: Math.min(100, s.trailProgress.matematica + 10)
          }
        };
        setSelectedStudent(updatedStudent);
        return updatedStudent;
      }
      return s;
    }));

    // Unlock Card "Guardião da Divisão"
    setCards(prev => prev.map(c => {
      if (c.id === 'card-guardiao-divisao') {
        return {
          ...c,
          unlocked: true,
          unlockedAt: 'Hoje'
        };
      }
      return c;
    }));

    // Unlock achievement if not unlocked
    setAchievements(prev => prev.map(a => {
      if (a.id === 'ach-explorador-destemido') {
        return { ...a, unlocked: true, unlockedAt: 'Hoje' };
      }
      return a;
    }));
  };

  const handleConfirmMastery = (studentId: string, abilityId: string) => {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updatedAbilities = s.abilities.map(ab => {
          if (ab.id === abilityId) {
            return {
              ...ab,
              score: 95,
              state: 'dominada' as const,
              evidence: {
                ...ab.evidence,
                precision: 'dominada' as const,
                autonomy: 'dominada' as const,
                consistency: 'dominada' as const
              }
            };
          }
          return ab;
        });
        const updatedStudent = {
          ...s,
          abilities: updatedAbilities,
          status: 'pronto_avancar' as const,
          statusAlertText: 'Domínio confirmado pelo professor com base nas evidências pedagógicas.'
        };
        if (selectedStudent.id === studentId) setSelectedStudent(updatedStudent);
        return updatedStudent;
      }
      return s;
    }));

    confetti({ particleCount: 50, spread: 60 });
  };

  const handleSaveIntervention = (newIntervention: InterventionRecord) => {
    setStudents(prev => prev.map(s => {
      if (s.id === newIntervention.studentId) {
        const updatedStudent = {
          ...s,
          interventions: [newIntervention, ...s.interventions]
        };
        if (selectedStudent.id === s.id) setSelectedStudent(updatedStudent);
        return updatedStudent;
      }
      return s;
    }));
  };

  const handleCompleteDiagnostic = (studentId: string, answers: any) => {
    setIsDiagnosticModalOpen(false);
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        const updatedStudent: Student = {
          ...s,
          status: 'evoluindo_bem',
          statusAlertText: 'Diagnóstico concluído: trilha adaptada para reforçar operações com materiais manipuláveis.'
        };
        if (selectedStudent.id === s.id) setSelectedStudent(updatedStudent);
        return updatedStudent;
      }
      return s;
    }));
  };

  const handleAddStudent = (newStudentData: Partial<Student>) => {
    const newStudent: Student = {
      id: `aluno-${Date.now()}`,
      name: newStudentData.name || 'Novo Aluno',
      grade: newStudentData.grade || '5º ano',
      classroom: newStudentData.classroom || 'Turma 5º ano A',
      teacherName: 'Prof. Marcelo Fernandes',
      entryDate: 'Hoje',
      status: 'atencao',
      statusAlertText: 'Aguardando avaliação diagnóstica inicial.',
      avatar: '🌟',
      level: 1,
      currentXp: 0,
      nextLevelXp: 500,
      streakDays: 0,
      weekDaysActive: [
        { day: 'S', active: true },
        { day: 'T', active: false },
        { day: 'Q', active: false },
        { day: 'Q', active: false },
        { day: 'S', active: false },
        { day: 'S', active: false },
        { day: 'D', active: false }
      ],
      cards: [],
      achievements: [],
      diagnosticCompleted: false,
      historyLog: [],
      trailProgress: { portugues: 10, matematica: 10, ciencias: 10 },
      currentMission: INITIAL_MISSION_DIVISAO,
      abilities: INITIAL_STUDENTS[0].abilities,
      pedagogicalNotes: newStudentData.pedagogicalNotes || 'Novo aluno cadastrado.',
      adaptations: newStudentData.adaptations || ['Atividades regulares'],
      interventions: []
    };

    setStudents(prev => [newStudent, ...prev]);
    setSelectedStudent(newStudent);
  };

  // Landing Page
  if (currentScreen === 'landing') {
    return (
      <LandingPage
        onEnterAsStudent={handleEnterAsStudent}
        onEnterAsProfessor={handleEnterAsProfessor}
        onEnterAsCoordenacao={handleEnterAsCoordenacao}
      />
    );
  }

  // Login / Profile Selection Screen
  if (currentScreen === 'login') {
    return (
      <LoginScreen
        students={students}
        onLoginAsStudent={handleLoginStudent}
        onLoginAsProfessor={handleEnterAsProfessor}
        onLoginAsCoordenacao={handleEnterAsCoordenacao}
        onBack={() => setCurrentScreen('landing')}
        defaultRole={loginDefaultRole}
      />
    );
  }

  // If TV Mode is active, render full-screen Presentation Panel without admin menus
  if (isTvModeOpen || activeTab === 'painel-tv') {
    return (
      <PainelSalaMissoes
        students={students}
        cards={cards}
        achievements={achievements}
        metrics={metrics}
        onClose={() => {
          setIsTvModeOpen(false);
          if (activeTab === 'painel-tv') {
            setActiveTab('dashboard');
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Global Application Header */}
      <Header
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
        students={students}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenNotifications={() => setIsNotificationsModalOpen(true)}
        onOpenTvMode={() => setIsTvModeOpen(true)}
        onSelectStudentDrawer={handleSelectStudent}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Layout Area with Sidebar & Dynamic View */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 gap-4 sm:gap-6">
        {/* Navigation Sidebar (Desktop + Mobile Drawer) */}
        <Sidebar
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenMission={() => setIsMissionPlayerOpen(true)}
          onOpenNewIntervention={() => setIsInterventionModalOpen(true)}
          onOpenCards={() => setActiveTab('cards')}
          onOpenTvMode={() => setIsTvModeOpen(true)}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          students={students}
        />

        {/* Central Dynamic View Area */}
        <main className="flex-1 min-w-0">
          {/* TEACHER DASHBOARD VIEW */}
          {currentRole === 'professor' && activeTab === 'dashboard' && (
            <ProfessorDashboard
              students={students}
              metrics={metrics}
              onSelectStudent={handleSelectStudent}
              onNavigateToTab={setActiveTab}
              onOpenNewInterventionModal={(studentId) => {
                const std = students.find(s => s.id === studentId);
                if (std) setSelectedStudent(std);
                setIsInterventionModalOpen(true);
              }}
              onOpenResourceModal={() => setIsResourcesModalOpen(true)}
            />
          )}

          {/* STUDENT DASHBOARD VIEW */}
          {currentRole === 'aluno' && activeTab === 'dashboard' && (
            <StudentDashboard
              student={selectedStudent || students[0]}
              mission={selectedStudent?.currentMission || students[0]?.currentMission}
              unlockedCard={cards.find(c => c.unlocked) || cards[0]}
              onStartMission={handleStartMission}
              onViewCard={handleOpenCard}
              onViewAchievements={() => setIsAchievementsModalOpen(true)}
              onViewTrails={() => setActiveTab('trilhas')}
            />
          )}

          {/* COORDINATION VIEW (Shows Class Metrics & Reports) */}
          {currentRole === 'coordenacao' && activeTab === 'dashboard' && (
            <CoordenacaoDashboard
              students={students}
              metrics={metrics}
              onNavigateToTab={setActiveTab}
            />
          )}

          {/* ALUNOS VIEW */}
          {activeTab === 'alunos' && (
            <AlunosView
              students={students}
              onSelectStudent={handleSelectStudent}
              onAddStudent={handleAddStudent}
            />
          )}

          {/* TRILHAS VIEW */}
          {(activeTab === 'trilhas' || activeTab === 'missoes') && (
            <TrilhasView
              onStartMission={handleStartMission}
              selectedStudent={selectedStudent}
            />
          )}

          {/* CARDS ALBUM VIEW */}
          {activeTab === 'cards' && (
            <CardsAlbumView
              cards={cards}
              onSelectCard={handleOpenCard}
            />
          )}

          {/* RELATÓRIOS & MEMÓRIA PEDAGÓGICA VIEW */}
          {activeTab === 'relatorios' && (
            <RelatoriosView
              students={students}
              metrics={metrics}
            />
          )}

          {/* INTERVENÇÕES VIEW */}
          {activeTab === 'intervencoes' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-xs gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Central de Intervenções Docentes</h2>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    Planejamento de mediação com material manipulável e leitura orientada.
                  </p>
                </div>
                <button
                  onClick={() => setIsInterventionModalOpen(true)}
                  className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-purple-600/20 transition-all cursor-pointer hover:scale-[1.02] self-start sm:self-auto"
                >
                  + Nova Intervenção
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.flatMap(s => s.interventions).map((int) => (
                  <div key={int.id} className="p-5 rounded-3xl bg-white border border-slate-200 hover:border-purple-300 transition-all space-y-3 shadow-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{int.studentName} — {int.ability}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{int.date} às {int.time}</div>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-300 font-bold">
                        {int.subject}
                      </span>
                    </div>
                    <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <strong className="text-purple-700">Estratégia:</strong> {int.strategy}
                    </div>
                    <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <strong className="text-emerald-700">Ação:</strong> {int.interventionApplied}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DIAGNOSTICO VIEW */}
          {activeTab === 'diagnostico' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <h2 className="text-2xl font-black text-slate-900">Diagnóstico Inicial de Habilidades</h2>
                <p className="text-xs text-slate-600 mt-1 max-w-xl font-medium">
                  O diagnóstico da Sala de Missões mapeia com precisão em qual etapa do raciocínio cada estudante se encontra antes do início das trilhas.
                </p>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setIsDiagnosticModalOpen(true)}
                    className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all cursor-pointer hover:scale-[1.02]"
                  >
                    Iniciar Diagnóstico com {selectedStudent?.name || 'Estudante'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RECONHECIMENTO VIEW */}
          {activeTab === 'reconhecimento' && (
            <ReconhecimentoView students={students} />
          )}

          {/* LOJA DE MOEDAS VIEW (Aluno) */}
          {activeTab === 'loja' && (
            <LojaMoedasView student={selectedStudent} />
          )}

        </main>
      </div>

      {/* MODALS */}
      {/* 1. Interactive 5-Step Mission Player Modal */}
      <MissionPlayerModal
        mission={INITIAL_MISSION_DIVISAO}
        student={selectedStudent}
        isOpen={isMissionPlayerOpen}
        onClose={() => setIsMissionPlayerOpen(false)}
        onCompleteMission={handleCompleteMission}
      />

      {/* 2. Prontuário Pedagógico Evolutivo Modal */}
      <StudentProfileModal
        student={selectedStudent}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onConfirmMastery={handleConfirmMastery}
        onCreateIntervention={(studentId) => {
          const std = students.find(s => s.id === studentId);
          if (std) setSelectedStudent(std);
          setIsProfileModalOpen(false);
          setIsInterventionModalOpen(true);
        }}
        onStartDiagnostic={(studentId) => {
          const std = students.find(s => s.id === studentId);
          if (std) setSelectedStudent(std);
          setIsProfileModalOpen(false);
          setIsDiagnosticModalOpen(true);
        }}
      />

      {/* 3. Card Detail Modal */}
      <CardDetailModal
        card={selectedCard}
        isOpen={isCardDetailOpen}
        onClose={() => setIsCardDetailOpen(false)}
      />

      {/* 4. New Intervention Modal */}
      <InterventionModal
        isOpen={isInterventionModalOpen}
        onClose={() => setIsInterventionModalOpen(false)}
        students={students}
        preselectedStudentId={selectedStudent.id}
        onSaveIntervention={handleSaveIntervention}
      />

      {/* 5. Diagnostic Assessment Modal */}
      <DiagnosticModal
        student={selectedStudent}
        isOpen={isDiagnosticModalOpen}
        onClose={() => setIsDiagnosticModalOpen(false)}
        onCompleteDiagnostic={handleCompleteDiagnostic}
      />

      {/* 6. Resources & Concrete Materials Modal */}
      <ResourcesModal
        isOpen={isResourcesModalOpen}
        onClose={() => setIsResourcesModalOpen(false)}
      />

      {/* 7. Achievements Modal */}
      <AchievementsModal
        achievements={achievements}
        isOpen={isAchievementsModalOpen}
        onClose={() => setIsAchievementsModalOpen(false)}
      />

      {/* 8. Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
        onSelectStudent={handleSelectStudent}
        students={students}
      />

      {/* 9. Mission Print View Modal */}
      <MissionPrintView
        mission={INITIAL_MISSION_DIVISAO}
        student={selectedStudent}
        isOpen={isMissionPrintOpen}
        onClose={() => setIsMissionPrintOpen(false)}
      />
    </div>
  );
}
