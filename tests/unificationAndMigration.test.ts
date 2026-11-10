import { describe, it, expect } from 'vitest';
import {
  ALL_MOCKUP_COLLECTIONS,
  SCHOOL_MOCK,
  CLASSROOMS_MOCK,
  STUDENTS_MOCK,
  CLASS_METRICS_MOCK,
  replicaGetCollection,
  runMockupMigrationToFirestore,
} from '../src/services/firebaseMigrationService';
import {
  studentsApi,
  trailsApi,
  missionsApi,
  cardsApi,
  achievementsApi,
  interventionsApi,
  rewardsApi,
  metricsApi,
  bankApi,
  adminApi,
} from '../src/services/api';
import { allTracks } from '../src/data/curriculum';
import { trackFinanceira } from '../src/data/tracks/trackFinanceira';
import { trackGari } from '../src/data/tracks/trackGari';
import { INITIAL_STUDENTS, INITIAL_CARDS, INITIAL_ACHIEVEMENTS } from '../src/data/initialData';

describe('Unificação Completa & Migração Idempotente para Firebase (10 Testes Obrigatórios)', () => {
  it('Teste 1 — Página Inicial e Dados de Demonstração estruturados', async () => {
    expect(ALL_MOCKUP_COLLECTIONS.length).toBe(21);
    expect(SCHOOL_MOCK.length).toBe(1);
    expect(CLASSROOMS_MOCK.length).toBe(2);
    expect(STUDENTS_MOCK.length).toBe(INITIAL_STUDENTS.length);
    expect(CLASS_METRICS_MOCK.length).toBe(1);
    expect((CLASS_METRICS_MOCK[0].data as any).totalStudents).toBeGreaterThan(0);
  });

  it('Teste 2 — Trilhas de Aprendizagem (5 Mundos + 15 Trilhas Curriculares)', async () => {
    const trailsList = await trailsApi.list();
    const tracksList = await trailsApi.listCurriculumTracks();

    expect(trailsList.length).toBe(5);
    const trailIds = trailsList.map((t) => t.id);
    expect(trailIds).toEqual(
      expect.arrayContaining(['trail-mat', 'trail-por', 'trail-cie', 'trail-cul', 'trail-fin'])
    );

    expect(tracksList.length).toBe(allTracks.length);
    expect(tracksList.length).toBe(15);
    for (const track of tracksList) {
      expect(track.units.length).toBeGreaterThan(0);
    }
  });

  it('Teste 3 — Desafios, Missões e Atividades Interativas', async () => {
    const missionsList = await missionsApi.list();
    expect(missionsList.length).toBeGreaterThanOrEqual(20);

    // Verifica desafios interativos do Gari e Matemática
    expect(trackGari.units[0].steps.some((s) => Boolean(s.gariInteraction))).toBe(true);
    const divisaoMission = missionsList.find((m) => m.id === 'missao-02-grupos');
    expect(divisaoMission).toBeDefined();
    expect(divisaoMission!.steps.length).toBeGreaterThan(0);
  });

  it('Teste 4 — Celular Virtual de Passar Pix (PixSimulator) e Educação Financeira', async () => {
    const tracksList = await trailsApi.listCurriculumTracks();
    const finTracks = tracksList.filter((t) => t.subjectId === 'financeira');
    expect(finTracks.length).toBe(1);

    const finTrack = finTracks[0];
    expect(finTrack.id).toBe(trackFinanceira.id);
    expect(finTrack.units.length).toBe(trackFinanceira.units.length);

    // Unidade 1: Moedas, Cédulas e o Pix!
    const pixUnit = finTrack.units.find((u) => u.id === 't-fin-u1');
    expect(pixUnit).toBeDefined();

    const pixStep = pixUnit!.steps.find((s) => s.moneyExample?.allowPix === true);
    expect(pixStep).toBeDefined();
    expect(pixStep!.moneyExample!.targetAmount).toBe(45.5);
    expect(pixStep!.moneyExample!.pixKeyName).toBe('Cantina Escolar');

    // Testa também transação bancária/Pix persistida via bankApi
    const studentId = INITIAL_STUDENTS[0].id;
    const beforeWallet = await bankApi.getWallet(studentId);
    const initialBalance = beforeWallet.balance;

    const txRes = await bankApi.recordOperation({
      studentId,
      operation: 'pagar',
      recipient: 'Banca do Seu Zé (Pix)',
      amount: 15,
      note: 'Pagamento Pix Simulador - Banca do Seu Zé',
    });

    expect(txRes.balance).toBe(initialBalance - 15);
    expect(txRes.transaction.title).toContain('Banca do Seu Zé');
  });

  it('Teste 5 — Persistência e Idempotência da Migração (Zero Duplicações)', async () => {
    const expectedTotal = ALL_MOCKUP_COLLECTIONS.reduce((acc, g) => acc + g.items.length, 0);

    // Executa migração idempotente preservando dados existentes
    const report1 = await runMockupMigrationToFirestore({ mode: 'idempotent-preserve' });
    expect(report1.totalIdentified).toBe(expectedTotal);
    expect(report1.totalErrors).toBe(0);
    expect(report1.collectionsUsed.length).toBe(21);

    // Segunda execução consecutiva: deve ignorar todos os registros já existentes sem duplicar nada
    const report2 = await runMockupMigrationToFirestore({ mode: 'idempotent-preserve' });
    expect(report2.totalIdentified).toBe(expectedTotal);
    expect(report2.totalImported).toBe(0);
    expect(report2.totalIgnored).toBe(expectedTotal);
    expect(report2.totalErrors).toBe(0);
  });

  it('Teste 6 — Escrita Persistente (Alunos, Missões, Intervenções e Loja)', async () => {
    const targetStudentId = INITIAL_STUDENTS[0].id;
    const beforeStudent = await studentsApi.get(targetStudentId);
    expect(beforeStudent).not.toBeNull();
    const prevXp = beforeStudent!.currentXp;

    // 1. Concluir missão
    const completeRes = await missionsApi.complete('missao-02-grupos', {
      studentId: targetStudentId,
      xpEarned: 75,
      title: 'Divisão por agrupamento',
    });
    expect(completeRes.xpEarned).toBe(75);

    const afterStudent = await studentsApi.get(targetStudentId);
    expect(afterStudent!.currentXp).toBe(prevXp + 75);

    // 2. Criar intervenção docente
    const intvRes = await interventionsApi.create({
      studentId: targetStudentId,
      studentName: beforeStudent!.name,
      ability: 'Divisão por agrupamento',
      subject: 'Matemática',
      title: 'Intervenção com Material Dourado',
      strategy: 'Agrupamento concreto',
      interventionApplied: 'Uso de blocos base 10',
      nextStep: 'Avançar para problemas contextualizados',
      date: 'Hoje',
      time: '10:30',
      status: 'realizada',
    });
    expect(intvRes.id).toBeDefined();

    // 3. Resgatar recompensa na Loja de Moedas
    const redeemRes = await rewardsApi.redeem('borracha', targetStudentId);
    expect(typeof redeemRes.remainingCoins).toBe('number');
  });

  it('Teste 7 — Leitura Completa de todas as Entidades do Banco', async () => {
    const [students, cards, achievements, rewards, interventions, metrics] = await Promise.all([
      studentsApi.list(),
      cardsApi.getStudentCards(INITIAL_STUDENTS[0].id),
      achievementsApi.getStudentAchievements(INITIAL_STUDENTS[0].id),
      rewardsApi.list(),
      interventionsApi.list(),
      metricsApi.getClassMetrics(),
    ]);

    expect(students.length).toBeGreaterThanOrEqual(INITIAL_STUDENTS.length);
    expect(cards.length).toBeGreaterThanOrEqual(INITIAL_CARDS.length);
    expect(achievements.length).toBeGreaterThanOrEqual(INITIAL_ACHIEVEMENTS.length);
    expect(rewards.length).toBeGreaterThanOrEqual(15);
    expect(interventions.length).toBeGreaterThan(0);
    expect(metrics.totalStudents).toBeGreaterThanOrEqual(INITIAL_STUDENTS.length);
  });

  it('Teste 8 — Navegação e Disponibilidade de Componentes Unificados', async () => {
    // Verifica que todas as páginas locais e novas páginas do GitHub existem e exportam seus componentes
    const landingMod = await import('../src/components/LandingPage');
    const loginMod = await import('../src/components/LoginScreen');
    const profMod = await import('../src/components/ProfessorDashboard');
    const studentMod = await import('../src/components/StudentDashboard');
    const coordMod = await import('../src/components/CoordenacaoDashboard');
    const trilhasMod = await import('../src/components/TrilhasView');
    const lojaMod = await import('../src/components/LojaMoedasView');
    const bancoMod = await import('../src/components/BancoView');
    const adminMod = await import('../src/components/AdminConsole');
    const pixMod = await import('../src/components/game-ui/money/PixSimulator');
    const gariMod = await import('../src/components/gari-mission/GariInteraction');
    const runnerMod = await import('../src/components/game-ui/LessonRunner');

    expect(landingMod.LandingPage).toBeDefined();
    expect(loginMod.LoginScreen).toBeDefined();
    expect(profMod.ProfessorDashboard).toBeDefined();
    expect(studentMod.StudentDashboard).toBeDefined();
    expect(coordMod.CoordenacaoDashboard).toBeDefined();
    expect(trilhasMod.TrilhasView).toBeDefined();
    expect(lojaMod.LojaMoedasView).toBeDefined();
    expect(bancoMod.BancoView).toBeDefined();
    expect(adminMod.AdminConsole).toBeDefined();
    expect(pixMod.PixSimulator).toBeDefined();
    expect(gariMod.GariInteraction).toBeDefined();
    expect(runnerMod.LessonRunner).toBeDefined();
  });

  it('Teste 9 — Console Admin & Status de Migração sem Erros', async () => {
    const overview = await adminApi.getOverview();
    expect(overview.schools).toBe(1);
    expect(overview.trails).toBe(5);
    expect(overview.curriculumTracks).toBe(15);
    expect(overview.missions).toBeGreaterThanOrEqual(20);
    expect(overview.rewards).toBeGreaterThanOrEqual(15);
  });

  it('Teste 10 — Integridade Referencial dos Dados Migrados', () => {
    const students = replicaGetCollection('students');
    const trails = replicaGetCollection('trails');
    const cards = replicaGetCollection('cards');
    const achievements = replicaGetCollection('achievements');
    const studentAbilities = replicaGetCollection('studentAbilities');
    const missions = replicaGetCollection('missions');
    const studentCards = replicaGetCollection('studentCards');
    const studentAchievements = replicaGetCollection('studentAchievements');

    const studentIds = new Set(students.map((s) => s.id));
    const trailIds = new Set(trails.map((t) => t.id));
    const cardIds = new Set(cards.map((c) => c.id));
    const achievementIds = new Set(achievements.map((a) => a.id));

    for (const sa of studentAbilities) {
      expect(studentIds.has(sa.studentId)).toBe(true);
    }
    for (const mission of missions) {
      expect(trailIds.has(mission.trailId)).toBe(true);
    }
    for (const sc of studentCards) {
      expect(studentIds.has(sc.studentId)).toBe(true);
      expect(cardIds.has(sc.cardId)).toBe(true);
    }
    for (const sa of studentAchievements) {
      expect(studentIds.has(sa.studentId)).toBe(true);
      expect(achievementIds.has(sa.achievementId)).toBe(true);
    }
  });
});
