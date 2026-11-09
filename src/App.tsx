import React, { useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { firebaseAuth, firebaseClientConfigured, requestPasswordReset, signInWithCustomToken, signInWithEmailAndPassword, signOutUser } from './services/firebaseClient';
import { adminApi, studentsApi, trailsApi, missionsApi, cardsApi, achievementsApi, metricsApi, interventionsApi, rewardsApi, type TrailCatalogItem } from './services/api';
import { LoginScreen } from './components/LoginScreen';
import AdminConsole from './components/AdminConsole';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { TrilhasView } from './components/TrilhasView';
import { ProfessorDashboard } from './components/ProfessorDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { CardsAlbumView } from './components/CardsAlbumView';
import { CardDetailModal } from './components/CardDetailModal';
import { AchievementsModal } from './components/AchievementsModal';
import { MissionPlayerModal } from './components/MissionPlayerModal';
import { MissionPrintView } from './components/MissionPrintView';
import { LojaMoedasView } from './components/LojaMoedasView';
import { CoordenacaoDashboard } from './components/CoordenacaoDashboard';
import { RelatoriosView } from './components/RelatoriosView';
import { PainelSalaMissoes } from './components/PainelSalaMissoes';
import { InterventionModal } from './components/InterventionModal';
import { DiagnosticModal } from './components/DiagnosticModal';
import { BancoView } from './components/BancoView';
import type { UserRole, Student, Mission, CardItem, AchievementItem } from './types';

type Profile = Awaited<ReturnType<typeof adminApi.me>>;
const asStudent = (input: unknown): Student => {
  const row = (input && typeof input === 'object' ? input : {}) as Record<string, any>;
  const id = String(row.id ?? row.studentId ?? '');
  return {
    ...row, id, name: String(row.name ?? ''), avatar: String(row.avatar ?? ''), avatarUrl: row.avatarUrl,
    classroom: String(row.classroom ?? row.classroomName ?? ''), grade: String(row.grade ?? ''), teacherName: String(row.teacherName ?? ''), entryDate: String(row.entryDate ?? ''),
    status: row.status, statusAlertText: String(row.statusAlertText ?? ''),
    level: Number(row.level ?? 0), currentXp: Number(row.currentXp ?? 0), nextLevelXp: Number(row.nextLevelXp ?? 0), coins: typeof row.coins === 'number' ? row.coins : undefined, streakDays: Number(row.streakDays ?? 0),
    weekDaysActive: Array.isArray(row.weekDaysActive) ? row.weekDaysActive : [], trailProgress: row.trailProgress,
    abilities: Array.isArray(row.abilities) ? row.abilities : [], currentMission: row.currentMission,
    cards: Array.isArray(row.cards) ? row.cards : [], achievements: Array.isArray(row.achievements) ? row.achievements : [], interventions: Array.isArray(row.interventions) ? row.interventions : [],
    pedagogicalNotes: String(row.pedagogicalNotes ?? ''), adaptations: Array.isArray(row.adaptations) ? row.adaptations : [], diagnosticCompleted: Boolean(row.diagnosticCompleted), historyLog: Array.isArray(row.historyLog) ? row.historyLog : [],
  };
};

export default function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [trails, setTrails] = useState<TrailCatalogItem[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [achievements, setAchievements] = useState<AchievementItem[]>([]);
  const [metrics, setMetrics] = useState<Record<string, unknown> | null>(null);
  const [interventions, setInterventions] = useState<any[]>([]);
  const [rewards, setRewards] = useState<Record<string, any>[]>([]);
  const [adminData, setAdminData] = useState<Record<string, Array<Record<string, unknown>>>>({});
  const [adminSummary, setAdminSummary] = useState<Record<string, number>>();
  const [routePath, setRoutePath] = useState(() => window.location.pathname);
  const [activeTab, setActiveTab] = useState(() => window.location.pathname.startsWith('/banco') ? 'banco' : 'dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [tv, setTv] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [missionToPlay, setMissionToPlay] = useState<Mission | null>(null);
  const [missionToPrint, setMissionToPrint] = useState<Mission | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showIntervention, setShowIntervention] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [interventionStudentId, setInterventionStudentId] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>();

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname;
      setRoutePath(path);
      setActiveTab(path.startsWith('/banco') ? 'banco' : 'dashboard');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const clearSession = useCallback(() => {
    setProfile(null); setStudents([]); setSelectedStudent(null); setTrails([]); setMissions([]); setCards([]); setAchievements([]); setMetrics(null); setInterventions([]); setRewards([]); setAdminData({}); setAdminSummary(undefined); setActiveTab('dashboard');
  }, []);
  const loadAdmin = useCallback(async () => {
    const [summary, ...collections] = await Promise.all([
      adminApi.getOverview(), ...['users','schools','classrooms','students','trails','missions','abilities','cards','achievements','rewards','redemptions','coinTransactions','auditLogs'].map(c => adminApi.listRecords(c)),
    ]);
    setAdminSummary(summary); setAdminData(Object.fromEntries(['users','schools','classrooms','students','trails','missions','abilities','cards','achievements','rewards','redemptions','coinTransactions','auditLogs'].map((c,i) => [c, collections[i]])));
  }, []);
  const loadProfileData = useCallback(async (p: Profile) => {
    setLoading(true); setError(null);
    try {
      if (p.role === 'admin') { await loadAdmin(); }
      else if (p.role === 'aluno') {
        if (!p.studentId) throw new Error('Perfil de aluno sem studentId. Acesso bloqueado.');
        const raw = await studentsApi.get(p.studentId);
        if (!raw) throw new Error('O aluno associado à conta não foi encontrado.');
        const own = asStudent(raw); setStudents([own]); setSelectedStudent(own);
        const [trailRows, missionRows, cardRows, achievementRows, rewardRows] = await Promise.all([trailsApi.list(), missionsApi.list({ studentId: own.id }), cardsApi.getStudentCards(own.id), achievementsApi.getStudentAchievements(own.id), rewardsApi.list()]);
        setTrails(trailRows); setMissions(missionRows); setCards(cardRows); setAchievements(achievementRows); setRewards(rewardRows as Record<string, any>[]);
      } else {
        const authorized = [...new Set((p.classroomIds ?? []).filter(Boolean))];
        if (!authorized.length) throw new Error('Nenhuma turma autorizada está associada ao perfil; alunos não carregados.');
        const classroomId = selectedClass && authorized.includes(selectedClass) ? selectedClass : authorized.length === 1 ? authorized[0] : undefined;
        if (classroomId) {
          setStudents((await studentsApi.list({ schoolId: p.schoolId, classroomId })).map(asStudent));
          setMetrics(await metricsApi.getClassMetrics({ schoolId: p.schoolId, classroomId }) as unknown as Record<string, unknown>);
        } else {
          const batches = await Promise.all(authorized.map(classroomId => studentsApi.list({ schoolId: p.schoolId, classroomId })));
          const unique = new Map(batches.flat().map(s => [String((s as any).id ?? (s as any).studentId), s]));
          setStudents([...unique.values()].map(asStudent)); setMetrics(null);
        }
        const [trailRows, missionRows, intRows] = await Promise.all([trailsApi.list(), missionsApi.list(), interventionsApi.list()]);
        setTrails(trailRows); setMissions(missionRows); setInterventions(intRows);
      }
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); }
    finally { setLoading(false); }
  }, [loadAdmin, selectedClass]);

  useEffect(() => {
    if (!firebaseClientConfigured || !firebaseAuth) { setLoading(false); return; }
    return onAuthStateChanged(firebaseAuth, async (user: User | null) => {
      if (!user) { clearSession(); setLoading(false); return; }
      setLoading(true); setError(null);
      try {
        const p = await adminApi.me();
        if (!p || !['admin','professor','coordenacao','aluno'].includes(p.role) || !p.userId || !p.name) throw new Error('Perfil ativo inválido. Entre novamente ou contate a administração.');
        setProfile(p); await loadProfileData(p);
      } catch (e) { setError(e instanceof Error ? e.message : String(e)); setProfile(null); setLoading(false); }
    });
  }, [clearSession, loadProfileData]);

  const loginStaff = async (email: string, password: string) => { setLoading(true); setError(null); try { await signInWithEmailAndPassword(email, password); } catch (e) { setError(e instanceof Error ? e.message : 'Falha ao entrar.'); setLoading(false); throw e; } };
  const loginStudent = async (code: string, pin: string) => { setLoading(true); setError(null); try { const session = await adminApi.studentSession(code, pin); await signInWithCustomToken(session.token); } catch (e) { setError(e instanceof Error ? e.message : 'Falha ao entrar.'); setLoading(false); throw e; } };
  const logout = async () => { setLoading(true); try { await signOutUser(); clearSession(); setError(null); } catch (e) { setError(e instanceof Error ? e.message : 'Falha ao sair.'); } finally { setLoading(false); } };
  const refresh = async () => { if (profile) await loadProfileData(profile); };
  const adminAction = async (action: string, entity: string, payload: Record<string, unknown>) => {
    if (!['create','update','archive','delete'].includes(action)) throw new Error('Ação não suportada.');
    let result: unknown;
    if (action === 'create') result = await adminApi.createRecord(entity, payload);
    else {
      const id = String(payload.id ?? ''); if (!id) throw new Error('Identificador ausente para a alteração.');
      if (action === 'update') { const { id: _id, ...body } = payload; result = await adminApi.updateRecord(entity, id, body); }
      else { await adminApi.archiveRecord(entity, id); result = { archived: true, id }; }
    }
    await loadAdmin(); setNotice('Alteração confirmada pelo servidor.'); return result;
  };

  if (!profile) return <LoginScreen onStaffLogin={loginStaff} onStudentLogin={loginStudent} onPasswordReset={requestPasswordReset} loading={loading} error={error} firebaseConfigured={firebaseClientConfigured} />;
  if (loading) return <main className="min-h-screen grid place-items-center bg-slate-50"><p role="status">Carregando dados autorizados…</p></main>;
  if (profile.role === 'admin' && routePath.startsWith('/banco')) return <div className="min-h-screen bg-[#f4f7fc] p-4 sm:p-8"><div className="mx-auto mb-5 flex max-w-6xl justify-between"><span className="self-center text-sm font-bold text-slate-700">Banco demonstrativo · ADM Master</span><button onClick={()=>{window.history.pushState({}, '', '/');setRoutePath('/');}} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700">Voltar à administração</button></div><BancoView studentName={profile.name} nfcRoute={routePath.startsWith('/banco/nfc/')} onExitNfc={()=>{window.history.replaceState({}, '', '/banco');setRoutePath('/banco');}}/></div>;
  if (profile.role === 'admin') return <AdminConsole actor={{name:profile.name,email:profile.email,role:profile.role}} data={adminData} summary={adminSummary} loading={loading} error={error} onRefresh={refresh} onLogout={logout} onOpenBank={()=>{window.history.pushState({}, '', '/banco');setRoutePath('/banco');}} onOpenTv={()=>setNotice('Painel TV não aberto: selecione primeiro uma escola e turma válidas. Não exibimos alunos de várias escolas em conjunto.')} onAction={adminAction}/>;

  const role = profile.role as UserRole;
  const current = selectedStudent;
  const availableTabs = role === 'aluno' ? ['dashboard','trilhas','cards','conquistas','loja','banco','relatorios'] : role === 'professor' ? ['dashboard','alunos','missoes','trilhas','intervencoes','relatorios','reconhecimento','cards','banco'] : ['dashboard','alunos','relatorios','trilhas','reconhecimento','banco'];
  const navigateTab = (tab: string) => {
    if (tab === 'banco') {
      window.history.pushState({}, '', '/banco');
      setRoutePath('/banco');
      setActiveTab('banco');
    } else {
      if (routePath.startsWith('/banco')) {
        window.history.pushState({}, '', '/');
        setRoutePath('/');
      }
      setActiveTab(tab);
    }
  };
  const activeMission = missions.find(m => ['Disponível', 'Em andamento', 'em_andamento'].includes(String(m.status)));
  const openMission = (mission?: Mission) => { const realMission = mission ?? activeMission; if (!realMission || !current) { setNotice('Não há missão real disponível para este aluno.'); return; } setMissionToPlay(realMission); };
  if (tv) return <PainelSalaMissoes students={students} metrics={metrics as any} loading={loading} error={error} onClose={()=>setTv(false)} />;
  return <div className="app-shell min-h-screen bg-[radial-gradient(circle_at_center,#ffffff_0%,#e0e7ff_100%)] text-slate-800 flex flex-col font-sans">
    {notice && <p role="status" className="bg-emerald-100 p-2 text-center">{notice}</p>}
    <Header currentRole={role} userName={profile.name} userEmail={profile.email} selectedStudent={current ?? undefined} onOpenNotifications={()=>setNotice('Notificações indisponíveis: não há endpoint de notificações para esta conta.')} onLogout={()=>void logout()} isMobileMenuOpen={mobileMenu} setIsMobileMenuOpen={setMobileMenu}/>
    <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 gap-4">
      <Sidebar currentRole={role} activeTab={activeTab} onTabChange={tab=>{if(tab==='painel-tv' && role!=='aluno') setTv(true); else if(availableTabs.includes(tab)) navigateTab(tab);}} onOpenMission={()=>openMission()} onOpenCards={()=>navigateTab('cards')} selectedStudent={current ?? undefined} isMobileMenuOpen={mobileMenu} setIsMobileMenuOpen={setMobileMenu}/>
      <main className="flex-1 min-w-0 rounded-2xl bg-white/70 p-4">
        {error && <div role="alert" className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-800">{error}<button onClick={()=>void refresh()} className="ml-3 underline">Tentar novamente</button></div>}
        {role !== 'aluno' && (profile.classroomIds?.length ?? 0) > 1 && <label className="mb-4 block text-sm">Turma autorizada <select className="ml-2 rounded border p-2" value={selectedClass ?? ''} onChange={e=>setSelectedClass(e.target.value || undefined)}><option value="">Selecione uma turma</option>{profile.classroomIds.map(id=><option key={id} value={id}>{id}</option>)}</select></label>}
        {loading && <p role="status">Carregando…</p>}
        {role === 'aluno' && current && activeTab === 'dashboard' && (activeMission && cards.some(c=>c.unlocked) ? <StudentDashboard student={current} mission={activeMission} unlockedCard={cards.find(c=>c.unlocked)} onStartMission={()=>openMission(activeMission)} onViewCard={setSelectedCard} onViewAchievements={()=>setShowAchievements(true)} onViewTrails={()=>setActiveTab('trilhas')}/> : <section className="rounded-3xl bg-white p-6"><h2 className="text-2xl font-bold">Olá, {current.name}</h2><p className="mt-2">{activeMission ? `Missão disponível: ${activeMission.title}` : 'Nenhuma missão real disponível no momento.'}</p>{activeMission && <button onClick={()=>openMission(activeMission)} className="mt-4 rounded bg-indigo-700 px-4 py-2 text-white">Iniciar missão</button>}<button onClick={()=>setActiveTab('trilhas')} className="ml-2 mt-4 rounded border px-4 py-2">Ver trilhas</button></section>)}
        {role === 'aluno' && current && activeTab === 'trilhas' && <TrilhasView selectedStudent={current} trails={trails} missions={missions} loading={false} error={error} onRefresh={()=>void refresh()} onStartMission={node=>openMission(node as Mission | undefined)}/>}
        {role === 'aluno' && activeTab === 'cards' && <CardsAlbumView cards={cards} onSelectCard={setSelectedCard}/>}
        {role === 'aluno' && activeTab === 'conquistas' && <section className="rounded-2xl bg-white p-6"><h2 className="text-xl font-bold">Conquistas do aluno</h2>{achievements.length ? <button className="mt-3 rounded bg-amber-600 px-4 py-2 text-white" onClick={()=>setShowAchievements(true)}>Ver {achievements.length} registros</button> : <p className="mt-3">Nenhuma conquista retornada pela API.</p>}</section>}
        {role === 'aluno' && activeTab === 'loja' && current && <LojaMoedasView student={current} rewards={rewards.map(r=>({id:String(r.id??''),name:String(r.name??r.title??''),desc:String(r.description??r.desc??''),cost:Number(r.cost??0),category:['escola','experiencias','digitais','cultura'].includes(String(r.category))?r.category as any:'escola',availability:r.availability==='esgotado'||r.availability==='reservado'?r.availability:'disponivel',popular:typeof r.popular==='boolean'?r.popular:undefined,note:typeof r.note==='string'?r.note:undefined})).filter(r=>r.id)} loading={loading} error={error} onRedeem={async rewardId=>{const result=await rewardsApi.redeem(rewardId,current.id);await refresh();return result.remainingCoins;}}/>}
        {activeTab === 'banco' && <BancoView studentName={current?.name ?? profile.name} nfcRoute={routePath.startsWith('/banco/nfc/')} onExitNfc={()=>{window.history.replaceState({}, '', '/banco');setRoutePath('/banco');}}/>}
        {role !== 'aluno' && activeTab === 'dashboard' && (role === 'professor' && metrics ? <ProfessorDashboard students={students} metrics={metrics as any} onSelectStudent={setSelectedStudent} onNavigateToTab={tab=>{if(tab==='painel-tv') setTv(true); else setActiveTab(tab);}} onOpenNewInterventionModal={id=>{setInterventionStudentId(id??'');setShowIntervention(true);}}/> : role==='coordenacao' && metrics ? <CoordenacaoDashboard students={students} metrics={metrics as any}/> : <section className="rounded-2xl bg-white p-6"><h2 className="text-2xl font-bold">Visão da turma</h2>{metrics ? <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">{[['Alunos',metrics.totalStudents],['Evoluindo bem',metrics.evolvingWell],['Precisam de atenção',metrics.needsAttention],['Intervenções',metrics.needsIntervention],['Progresso médio',`${metrics.averageMissionProgressPercent}%`],['Missões concluídas',metrics.completedMissionsMonth]].map(([k,v])=><div className="rounded-xl bg-indigo-50 p-4" key={String(k)}><dt>{String(k)}</dt><dd className="text-2xl font-bold">{String(v ?? '—')}</dd></div>)}</dl> : <p className="mt-3">Selecione uma turma autorizada para consultar métricas.</p>}</section>)}
        {role !== 'aluno' && activeTab === 'alunos' && <section className="rounded-2xl bg-white p-6"><h2 className="text-xl font-bold">Alunos autorizados</h2><p className="text-sm">Cadastro de alunos é restrito à Administração Master.</p>{students.length ? students.map(s=><button key={s.id} className="block w-full border-b py-3 text-left" onClick={()=>{void studentsApi.get(s.id).then(row=>row&&setSelectedStudent(asStudent(row))).catch(e=>setError(String(e)));}}>{s.name} · {s.classroom}</button>) : <p>Nenhum aluno disponível no escopo atual.</p>}{current && <div className="mt-4 rounded bg-slate-50 p-4"><b>{current.name}</b><p>{current.grade} · {current.classroom}</p><p>{current.pedagogicalNotes||'Sem observações registradas.'}</p>{current.abilities?.length ? current.abilities.map(a=><p key={a.id}>{a.name}: {a.state}</p>) : <p>Sem dados de habilidades.</p>}<button type="button" onClick={()=>setShowDiagnostic(true)} className="mt-3 rounded bg-indigo-700 px-4 py-2 text-white">Aplicar diagnóstico</button></div>}</section>}
        {role === 'professor' && activeTab === 'missoes' && <section className="rounded-2xl bg-white p-6"><h2 className="text-xl font-bold">Catálogo real de missões</h2>{missions.length ? missions.map(m=><div key={m.id} className="flex justify-between border-b p-3">{m.title} · {m.status}<button className="text-indigo-700 underline" onClick={()=>setMissionToPrint(m)}>Imprimir</button></div>) : <p>Nenhuma missão retornada pela API.</p>}</section>}
        {role === 'professor' && activeTab === 'trilhas' && <section className="rounded-2xl bg-white p-6"><h2 className="text-xl font-bold">Trilhas curriculares</h2>{trails.length ? trails.map(t=><p className="border-b p-3" key={t.id}><b>{t.name}</b> · {t.subject} {t.description}</p>) : <p>Nenhuma trilha retornada pela API.</p>}</section>}
        {role === 'professor' && activeTab === 'intervencoes' && <section className="rounded-2xl bg-white p-6"><button className="rounded bg-violet-700 px-3 py-2 text-white" onClick={()=>setShowIntervention(true)}>Nova intervenção</button><h2 className="mt-4 text-xl font-bold">Intervenções</h2>{interventions.length ? interventions.map(i=><article className="border-b p-3" key={i.id}><b>{i.studentName} · {i.ability}</b><p>{i.title} · {i.strategy}</p></article>) : <p>Nenhuma intervenção retornada pela API.</p>}</section>}
        {role !== 'aluno' && activeTab === 'relatorios' && (metrics ? <RelatoriosView students={students} metrics={metrics as any}/> : <section className="rounded-2xl bg-white p-6"><h2 className="text-xl font-bold">Relatórios</h2><p className="mt-3">Selecione uma turma autorizada para ver métricas.</p></section>)}
        {role === 'professor' && activeTab === 'cards' && <CardsAlbumView cards={cards} onSelectCard={setSelectedCard}/>}
        {role !== 'aluno' && activeTab === 'reconhecimento' && <section className="rounded-2xl bg-white p-6"><h2 className="text-xl font-bold">Reconhecimento</h2><p>A API não oferece ação de registro de reconhecimento; nenhum dado local será criado.</p></section>}
      </main>
    </div>
    <CardDetailModal card={selectedCard} isOpen={!!selectedCard} onClose={()=>setSelectedCard(null)}/>
    <AchievementsModal achievements={achievements} isOpen={showAchievements} onClose={()=>setShowAchievements(false)}/>
    {missionToPlay && current && <MissionPlayerModal mission={missionToPlay} student={current} isOpen onClose={()=>setMissionToPlay(null)} onRecordAttempt={async(stepIndex,answer)=>{const result=await missionsApi.attempt(missionToPlay.id,{studentId:current.id,stepIndex,answer});return {isCorrect:result.isCorrect,feedback:result.feedback};}} onCompleteMission={async()=>{await missionsApi.complete(missionToPlay.id,{studentId:current.id});await refresh();setMissionToPlay(null);}}/>}
    {missionToPrint && <MissionPrintView mission={missionToPrint} student={current ?? undefined} isOpen onClose={()=>setMissionToPrint(null)}/>}
    {showIntervention && <InterventionModal isOpen students={students} preselectedStudentId={interventionStudentId} onClose={()=>setShowIntervention(false)} onSaveIntervention={async payload=>{await interventionsApi.create(payload);await refresh();setNotice('Intervenção registrada pelo servidor.');}}/>}
    {showDiagnostic && current && <DiagnosticModal student={current} isOpen onClose={()=>setShowDiagnostic(false)} onCompleteDiagnostic={async(studentId,results)=>{await studentsApi.completeDiagnostic(studentId,{abilityId:'diagnostico-inicial',answers:Object.fromEntries(Object.entries(results).map(([k,v])=>[k,String(v)]))});await refresh();setNotice('Diagnóstico salvo pelo servidor.');}}/>}
  </div>;
}
