import React, { useState, useEffect, useCallback } from 'react';
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
import { LessonRunner } from './components/game-ui/LessonRunner';
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
import { IntervencoesView } from './components/IntervencoesView';
import { DiagnosticoView } from './components/DiagnosticoView';
import { DevAssistant } from './components/DevAssistant';
import { BancoView } from './components/BancoView';
import { AdminConsole } from './components/AdminConsole';
import {
  INITIAL_STUDENTS,
  INITIAL_CARDS,
  INITIAL_ACHIEVEMENTS,
  INITIAL_MISSION_DIVISAO,
  INITIAL_CLASS_METRICS,
} from './data/initialData';
import { allTracks } from './data/curriculum';
import {
  studentsApi,
  cardsApi,
  achievementsApi,
  metricsApi,
  trailsApi,
  missionsApi,
  interventionsApi,
} from './services/api';
import { UserRole, Student, CardItem, InterventionRecord, Track } from './types';
import confetti from 'canvas-confetti';

// App-level navigation states
type AppScreen = 'landing' | 'login' | 'app';

const SESSION_STORAGE_KEY = 'salam_active_session_v1';

function loadSavedSession(): {
  screen: AppScreen;
  role: UserRole;
  tab: string;
  studentId: string;
} | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function App() {
  const savedSession = loadSavedSession();
  const isInitialBankRoute =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/banco');

  // Screen / Navigation
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(
    isInitialBankRoute ? 'app' : savedSession?.screen || 'landing'
  );
  const [loginDefaultRole, setLoginDefaultRole] = useState<
    'aluno' | 'professor' | 'coordenacao' | undefined
  >('aluno');

  // Global States (initialized with mockups for instant render, immediately hydrated from Firebase)
  const [currentRole, setCurrentRole] = useState<UserRole>(
    savedSession?.role || 'professor'
  );
  const [activeTab, setActiveTab] = useState<string>(
    isInitialBankRoute ? 'banco' : savedSession?.tab || 'dashboard'
  );
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student>(() => {
    if (savedSession?.studentId) {
      const found = INITIAL_STUDENTS.find((s) => s.id === savedSession.studentId);
      if (found) return found;
    }
    return INITIAL_STUDENTS[0];
  });
  const [cards, setCards] = useState<CardItem[]>(INITIAL_CARDS);
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
  const [metrics, setMetrics] = useState(INITIAL_CLASS_METRICS);
  const [curriculumTracks, setCurriculumTracks] = useState<Track[]>(allTracks);
  const [isTvModeOpen, setIsTvModeOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false
  );

  // Persist navigation session across page reloads
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(
          SESSION_STORAGE_KEY,
          JSON.stringify({
            screen: currentScreen,
            role: currentRole,
            tab: activeTab,
            studentId: selectedStudent?.id || INITIAL_STUDENTS[0].id,
          })
        );
      }
    } catch {
      // Ignore storage errors
    }
  }, [currentScreen, currentRole, activeTab, selectedStudent?.id]);

  // Hydrate all data from Firebase / persistent replica
  const hydrateFromFirebase = useCallback(async () => {
    try {
      const targetStudentId = selectedStudent?.id || INITIAL_STUDENTS[0].id;
      const [studentsList, cardsList, achievementsList, metricsObj, tracksList] =
        await Promise.all([
          studentsApi.list(),
          cardsApi.getStudentCards(targetStudentId),
          achievementsApi.getStudentAchievements(targetStudentId),
          metricsApi.getClassMetrics(),
          trailsApi.listCurriculumTracks(),
        ]);

      if (studentsList && studentsList.length > 0) {
        setStudents(studentsList);
        setSelectedStudent((prev) => {
          const updated = studentsList.find((s: Student) => s.id === prev?.id);
          return updated || studentsList[0];
        });
      }
      if (cardsList && cardsList.length > 0) {
        setCards(cardsList);
      }
      if (achievementsList && achievementsList.length > 0) {
        setAchievements(achievementsList);
      }
      if (metricsObj) {
        setMetrics(metricsObj);
      }
      if (tracksList && tracksList.length > 0) {
        setCurriculumTracks(tracksList);
      }
    } catch (err) {
      console.warn('[App] Usando réplica persistente local:', err);
    }
  }, [selectedStudent?.id]);

  useEffect(() => {
    hydrateFromFirebase();
  }, [hydrateFromFirebase]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

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
  const handleEnterAsAdmin = () => {
    setCurrentRole('admin');
    setActiveTab('admin');
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
  const [activeMissionData, setActiveMissionData] = useState<any>(null);
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

  const handleStartMission = (missionNode?: any) => {
    if (missionNode && missionNode.unitData) {
      setActiveMissionData(missionNode.unitData);
    } else {
      setActiveMissionData(null);
    }
    setIsMissionPlayerOpen(true);
  };

  const handleOpenCard = (card: CardItem) => {
    setSelectedCard(card);
    setIsCardDetailOpen(true);
  };

  const handleCompleteMission = async (xpEarned: number, updatedAbility: string) => {
    setIsMissionPlayerOpen(false);

    // Update active student data optimistically + persist in Firebase
    const missionId = activeMissionData?.id || INITIAL_MISSION_DIVISAO.id;
    let updatedStudentRef: Student | null = null;

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === selectedStudent.id) {
          const updatedXP = s.currentXp + xpEarned;
          const updatedCoins = (s.coins || 0) + 30;
          const updatedAbilities = s.abilities.map((ab) => {
            if (ab.id === 'mat-divisao' || ab.name === updatedAbility) {
              return {
                ...ab,
                score: Math.min(100, ab.score + 15),
                attempts: ab.attempts + 1,
                autonomy: Math.min(100, ab.autonomy + 12),
                state: 'consolidando' as const,
              };
            }
            return ab;
          });

          const updatedStudent: Student = {
            ...s,
            currentXp: updatedXP,
            coins: updatedCoins,
            streakDays: s.streakDays + 1,
            status: 'evoluindo_bem',
            statusAlertText:
              'Compreendeu divisão com materiais visuais. Avançando para problemas contextualizados.',
            abilities: updatedAbilities,
            trailProgress: {
              ...s.trailProgress,
              matematica: Math.min(100, s.trailProgress.matematica + 10),
            },
          };
          updatedStudentRef = updatedStudent;
          setSelectedStudent(updatedStudent);
          return updatedStudent;
        }
        return s;
      })
    );

    // Unlock Card "Guardião da Divisão"
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === 'card-guardiao-divisao') {
          return {
            ...c,
            unlocked: true,
            unlockedAt: 'Hoje',
          };
        }
        return c;
      })
    );

    // Unlock achievement if not unlocked
    setAchievements((prev) =>
      prev.map((a) => {
        if (a.id === 'ach-explorador-destemido') {
          return { ...a, unlocked: true, unlockedAt: 'Hoje' };
        }
        return a;
      })
    );

    // Persist mission completion to Firebase + replica
    try {
      await missionsApi.complete(missionId, {
        studentId: selectedStudent.id,
        xpEarned,
        title: updatedAbility,
      });
      if (updatedStudentRef) {
        await studentsApi.update(selectedStudent.id, updatedStudentRef);
      }
    } catch (err) {
      console.warn('[App] Erro ao persistir conclusão de missão:', err);
    }
  };

  const handleConfirmMastery = async (studentId: string, abilityId: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const updatedAbilities = s.abilities.map((ab) => {
            if (ab.id === abilityId) {
              return {
                ...ab,
                score: 95,
                state: 'dominada' as const,
                evidence: {
                  ...ab.evidence,
                  precision: 'dominada' as const,
                  autonomy: 'dominada' as const,
                  consistency: 'dominada' as const,
                },
              };
            }
            return ab;
          });
          const updatedStudent = {
            ...s,
            abilities: updatedAbilities,
            status: 'pronto_avancar' as const,
            statusAlertText:
              'Domínio confirmado pelo professor com base nas evidências pedagógicas.',
          };
          if (selectedStudent.id === studentId) setSelectedStudent(updatedStudent);
          return updatedStudent;
        }
        return s;
      })
    );

    try {
      await studentsApi.confirmMastery(studentId, abilityId);
    } catch (err) {
      console.warn('[App] Erro ao persistir domínio:', err);
    }

    try {
      confetti({ particleCount: 50, spread: 60 });
    } catch {
      // Ignore confetti errors in headless environments
    }
  };

  const handleSaveIntervention = async (newIntervention: InterventionRecord) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === newIntervention.studentId) {
          const updatedStudent = {
            ...s,
            interventions: [newIntervention, ...s.interventions],
          };
          if (selectedStudent.id === s.id) setSelectedStudent(updatedStudent);
          return updatedStudent;
        }
        return s;
      })
    );

    try {
      await interventionsApi.create({
        studentId: newIntervention.studentId,
        studentName: newIntervention.studentName,
        ability: newIntervention.ability,
        subject: newIntervention.subject,
        title: newIntervention.title,
        strategy: newIntervention.strategy,
        initialAttemptError: newIntervention.initialAttemptError,
        interventionApplied: newIntervention.interventionApplied,
        newAttemptResult: newIntervention.newAttemptResult,
        nextStep: newIntervention.nextStep,
        date: newIntervention.date,
        time: newIntervention.time,
        status: newIntervention.status || 'realizada',
      });
    } catch (err) {
      console.warn('[App] Erro ao persistir intervenção:', err);
    }
  };

  const handleCompleteDiagnostic = async (studentId: string, answers: any) => {
    setIsDiagnosticModalOpen(false);
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === studentId) {
          const updatedStudent: Student = {
            ...s,
            diagnosticCompleted: true,
            status: 'evoluindo_bem',
            statusAlertText:
              'Diagnóstico concluído: trilha adaptada para reforçar operações com materiais manipuláveis.',
          };
          if (selectedStudent.id === s.id) setSelectedStudent(updatedStudent);
          return updatedStudent;
        }
        return s;
      })
    );

    try {
      await studentsApi.completeDiagnostic(studentId, {
        abilityId: selectedStudent?.abilities?.[0]?.id || 'mat-divisao',
        answers: answers || {},
      });
    } catch (err) {
      console.warn('[App] Erro ao persistir diagnóstico:', err);
    }
  };

  const handleAddStudent = async (newStudentData: Partial<Student>) => {
    try {
      const created = await studentsApi.create({
        name: newStudentData.name || 'Novo Aluno',
        grade: newStudentData.grade || '5º ano',
        classroom: newStudentData.classroom || 'Turma 5º ano A',
        pedagogicalNotes: newStudentData.pedagogicalNotes || 'Novo aluno cadastrado.',
        adaptations: newStudentData.adaptations || ['Atividades regulares'],
      });
      if (created) {
        setStudents((prev) => [created, ...prev]);
        setSelectedStudent(created);
        return;
      }
    } catch (err) {
      console.warn('[App] Fallback local ao criar aluno:', err);
    }

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
      coins: 100,
      streakDays: 0,
      weekDaysActive: [
        { day: 'S', active: true },
        { day: 'T', active: false },
        { day: 'Q', active: false },
        { day: 'Q', active: false },
        { day: 'S', active: false },
        { day: 'S', active: false },
        { day: 'D', active: false },
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
      interventions: [],
    };

    setStudents((prev) => [newStudent, ...prev]);
    setSelectedStudent(newStudent);
  };

  const handleUpdateStudentCoins = (newBalance: number) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === selectedStudent.id ? { ...s, coins: newBalance } : s))
    );
    setSelectedStudent((prev) => ({ ...prev, coins: newBalance }));
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
        onLoginAsAdmin={handleEnterAsAdmin}
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
    <div className="app-shell min-h-screen bg-[radial-gradient(circle_at_center,#ffffff_0%,#e0e7ff_100%)] text-slate-800 flex flex-col font-sans selection:bg-[#123cc4] selection:text-white relative">
      {isOffline && (
        <div className="bg-amber-500 text-white text-xs font-bold text-center py-2 px-4 safe-pt z-[9999] shadow-md flex items-center justify-center gap-2">
          <span>⚠️</span> Você está offline. Reconecte para salvar seu progresso.
        </div>
      )}

      {/* Dev Assistant (Floating Developer Tools) */}
      <DevAssistant
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        onOpenTvMode={() => setIsTvModeOpen(true)}
        onOpenBank={() => setActiveTab('banco')}
        onOpenAdmin={() => setActiveTab('admin')}
        students={students}
        selectedStudent={selectedStudent}
        setSelectedStudent={setSelectedStudent}
      />

      {/* Global Application Header */}
      <div className="app-header">
        <Header
          currentRole={currentRole}
          selectedStudent={selectedStudent}
          onOpenNotifications={() => setIsNotificationsModalOpen(true)}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          onLogout={() => setCurrentScreen('landing')}
        />
      </div>

      {/* Main Layout Area with Sidebar & Dynamic View */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 gap-4 sm:gap-6">
        {/* Navigation Sidebar (Desktop + Mobile Drawer) */}
        <div className="app-sidebar">
          <Sidebar
            currentRole={currentRole}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onOpenMission={() => setIsMissionPlayerOpen(true)}
            onOpenCards={() => setActiveTab('cards')}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />
        </div>

        {/* Central Dynamic View Area */}
        <main className="flex-1 min-w-0">
          {/* ADMIN CONSOLE & FIREBASE MIGRATION VIEW */}
          {(activeTab === 'admin' || (currentRole === 'admin' && activeTab === 'dashboard')) && (
            <AdminConsole
              onBack={() => {
                setCurrentRole('professor');
                setActiveTab('dashboard');
              }}
              onMigrationComplete={() => {
                hydrateFromFirebase();
              }}
            />
          )}

          {/* BANCO DE MOEDAS / NFC VIEW */}
          {activeTab === 'banco' && (
            <BancoView
              studentId={selectedStudent.id}
              studentName={selectedStudent.name}
              initialBalance={selectedStudent.coins ?? 320}
              onBalanceChange={handleUpdateStudentCoins}
              onExitNfc={() => setActiveTab('dashboard')}
            />
          )}

          {/* TEACHER DASHBOARD VIEW */}
          {currentRole === 'professor' && activeTab === 'dashboard' && (
            <ProfessorDashboard
              students={students}
              metrics={metrics}
              onSelectStudent={handleSelectStudent}
              onNavigateToTab={setActiveTab}
              onOpenNewInterventionModal={(studentId) => {
                const std = students.find((s) => s.id === studentId);
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
              unlockedCard={cards.find((c) => c.unlocked) || cards[0]}
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
              curriculumTracks={curriculumTracks}
            />
          )}

          {/* CARDS ALBUM VIEW */}
          {activeTab === 'cards' && (
            <CardsAlbumView cards={cards} onSelectCard={handleOpenCard} />
          )}

          {/* CONQUISTAS TAB SHORTCUT */}
          {activeTab === 'conquistas' && (
            <ReconhecimentoView students={students} />
          )}

          {/* RELATÓRIOS & MEMÓRIA PEDAGÓGICA VIEW */}
          {activeTab === 'relatorios' && (
            <RelatoriosView students={students} metrics={metrics} />
          )}

          {/* INTERVENÇÕES VIEW */}
          {activeTab === 'intervencoes' && (
            <IntervencoesView
              students={students}
              onOpenNewIntervention={() => setIsInterventionModalOpen(true)}
            />
          )}

          {/* DIAGNOSTICO VIEW */}
          {activeTab === 'diagnostico' && (
            <DiagnosticoView
              selectedStudent={selectedStudent}
              onOpenDiagnostic={() => setIsDiagnosticModalOpen(true)}
            />
          )}

          {/* RECONHECIMENTO VIEW */}
          {activeTab === 'reconhecimento' && (
            <ReconhecimentoView students={students} />
          )}

          {/* LOJA DE MOEDAS VIEW (Aluno) */}
          {activeTab === 'loja' && (
            <LojaMoedasView
              student={selectedStudent}
              onUpdateCoins={handleUpdateStudentCoins}
            />
          )}
        </main>
      </div>

      {/* MODALS */}
      {/* 1. Interactive 5-Step Mission Player Modal / LessonRunner */}
      {isMissionPlayerOpen && activeMissionData ? (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-fadeIn">
          <LessonRunner
            unit={activeMissionData}
            userStats={{
              xp: selectedStudent.currentXp,
              level: selectedStudent.level,
              streakDays: selectedStudent.streakDays,
              hearts: 5,
              maxHearts: 5,
              completedUnits: [],
              completedTracks: [],
              masteredSkills: [],
              mistakeHistory: [],
              earnedBadges: [],
            }}
            onFinishLesson={(unitId, earnedXp) => {
              handleCompleteMission(earnedXp, activeMissionData.title);
            }}
            onClose={() => setIsMissionPlayerOpen(false)}
            onRecordMistake={() => {}}
          />
        </div>
      ) : (
        <MissionPlayerModal
          mission={INITIAL_MISSION_DIVISAO}
          student={selectedStudent}
          isOpen={isMissionPlayerOpen}
          onClose={() => setIsMissionPlayerOpen(false)}
          onCompleteMission={handleCompleteMission}
        />
      )}

      {/* 2. Prontuário Pedagógico Evolutivo Modal */}
      <StudentProfileModal
        student={selectedStudent}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        onConfirmMastery={handleConfirmMastery}
        onCreateIntervention={(studentId) => {
          const std = students.find((s) => s.id === studentId);
          if (std) setSelectedStudent(std);
          setIsProfileModalOpen(false);
          setIsInterventionModalOpen(true);
        }}
        onStartDiagnostic={(studentId) => {
          const std = students.find((s) => s.id === studentId);
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
