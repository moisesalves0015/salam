import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  Activity,
  Archive,
  BookOpen,
  Building2,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  Coins,
  Database,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Monitor,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Shield,
  ShoppingBag,
  Trash2,
  Users,
  X,
  AlertCircle,
  LoaderCircle,
  Boxes,
  ScrollText,
  Sparkles,
  Flag,
  Star,
  Trophy,
  Wallet,
} from 'lucide-react';
import { adminApi } from '../services/api';
import type { MigrationReport } from '../services/firebaseMigrationService';

export interface AdminConsoleProps {
  actor?: { name: string; email: string; role: string };
  data?: Record<string, Array<Record<string, unknown>>>;
  summary?: Record<string, number>;
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => Promise<void> | void;
  onLogout?: () => void;
  onBack?: () => void;
  onOpenTv?: () => void;
  onOpenBank?: () => void;
  onMigrationComplete?: () => void;
  onAction?: (action: string, entity: string, payload: Record<string, unknown>) => Promise<unknown>;
}

type Section = {
  id: string;
  label: string;
  entity: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
  readOnly?: boolean;
};

const SECTIONS: { group: string; items: Section[] }[] = [
  {
    group: 'GESTÃO',
    items: [
      { id: 'overview', label: 'Visão geral', entity: '', icon: LayoutDashboard, description: 'Indicadores e estado atual da plataforma' },
      { id: 'users', label: 'Usuários e acessos', entity: 'users', icon: Users, description: 'Contas, perfis e permissões' },
      { id: 'schools', label: 'Escolas', entity: 'schools', icon: Building2, description: 'Unidades escolares' },
      { id: 'classrooms', label: 'Turmas', entity: 'classrooms', icon: Building2, description: 'Organização das turmas e vínculos escolares' },
      { id: 'students', label: 'Alunos', entity: 'students', icon: GraduationCap, description: 'Cadastro e acompanhamento de alunos' },
    ],
  },
  {
    group: 'EXPERIÊNCIA',
    items: [
      { id: 'trails', label: 'Mundos / Trilhas', entity: 'trails', icon: BookOpen, description: 'Mundos de aprendizagem publicados' },
      { id: 'curriculumTracks', label: 'Trilhas Interativas', entity: 'curriculumTracks', icon: Sparkles, description: '15 trilhas interativas (Gari, Eraldo, Pix, etc.)' },
      { id: 'missions', label: 'Missões', entity: 'missions', icon: Flag, description: 'Conteúdo e configuração de missões' },
      { id: 'abilities', label: 'Habilidades', entity: 'abilities', icon: Sparkles, description: 'Habilidades e objetivos de aprendizagem' },
      { id: 'cards', label: 'Cards', entity: 'cards', icon: Star, description: 'Catálogo de cards da plataforma' },
      { id: 'achievements', label: 'Conquistas', entity: 'achievements', icon: Trophy, description: 'Catálogo de conquistas' },
      { id: 'store', label: 'Loja e recompensas', entity: 'rewards', icon: ShoppingBag, description: 'Itens disponíveis e recompensas' },
      { id: 'redemptions', label: 'Resgates', entity: 'redemptions', icon: Boxes, description: 'Solicitações e histórico de resgates', readOnly: true },
    ],
  },
  {
    group: 'CONTROLE & FIREBASE',
    items: [
      { id: 'migration', label: 'Migração Firebase', entity: 'migrationRuns', icon: Database, description: 'Sincronização idempotente de mockups com o Firestore' },
      { id: 'ledger', label: 'Ledger · XP e moedas', entity: 'coinTransactions', icon: Coins, description: 'Movimentações de moedas', readOnly: true },
      { id: 'audit', label: 'Auditoria', entity: 'auditLogs', icon: ScrollText, description: 'Registro de atividades administrativas', readOnly: true },
    ],
  },
];

const ALL_SECTIONS = SECTIONS.flatMap((group) => group.items);

const CREATE_FIELDS: Record<string, string[]> = {
  users: ['name', 'email', 'role', 'schoolId', 'classroomIds'],
  schools: ['name', 'code'],
  classrooms: ['name', 'grade', 'schoolId', 'teacherIds'],
  students: ['name', 'grade', 'schoolId', 'classroomId', 'pedagogicalNotes', 'adaptations'],
  abilities: ['name', 'subject', 'description', 'bnccCode'],
  trails: ['name', 'subject', 'description', 'order'],
  curriculumTracks: ['title', 'subjectId', 'description', 'objective', 'color'],
  missions: ['title', 'trailId', 'subject', 'primaryAbility', 'difficulty', 'objective', 'estimatedMinutes', 'xpReward', 'coinsReward'],
  cards: ['name', 'category', 'description', 'subject', 'rarity', 'icon'],
  achievements: ['title', 'description', 'category', 'icon', 'color', 'xpReward'],
  rewards: ['name', 'description', 'cost', 'category', 'icon', 'availability'],
};

const EDIT_FIELDS: Record<string, string[]> = {
  users: ['name', 'email', 'role', 'schoolId', 'classroomIds', 'active'],
  schools: ['name', 'code', 'active'],
  classrooms: ['name', 'grade', 'schoolId', 'teacherIds', 'studentIds', 'active'],
  students: ['name', 'avatar', 'classroomId', 'grade', 'pedagogicalNotes', 'adaptations', 'active'],
};

const JSON_FIELDS = new Set(['classroomIds', 'teacherIds', 'studentIds', 'adaptations', 'steps', 'unlocksCards', 'unlocksAchievements']);
const NUMBER_FIELDS = new Set(['order', 'estimatedMinutes', 'xpReward', 'coinsReward', 'cost']);

const pretty = (key: string) =>
  key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/^./, (c) => c.toUpperCase());

const display = (value: unknown): string => {
  if (value == null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const recordId = (record: Record<string, unknown>) => record.id ?? record.uid ?? record.key ?? '';

export function AdminConsole({
  actor: actorProp,
  data: dataProp,
  summary: summaryProp,
  loading: loadingProp,
  error: errorProp,
  onRefresh: onRefreshProp,
  onLogout: onLogoutProp,
  onBack,
  onOpenTv: onOpenTvProp,
  onOpenBank: onOpenBankProp,
  onMigrationComplete,
  onAction: onActionProp,
}: AdminConsoleProps) {
  const actor = actorProp ?? { name: 'Admin Master', email: 'admin@salademissoes.local', role: 'admin' };
  const [internalData, setInternalData] = useState<Record<string, Array<Record<string, unknown>>>>({});
  const [internalSummary, setInternalSummary] = useState<Record<string, number>>({});
  const [internalLoading, setInternalLoading] = useState(false);

  const loadInternalAdminData = useCallback(async () => {
    if (dataProp) return;
    setInternalLoading(true);
    try {
      const overview = await adminApi.getOverview();
      setInternalSummary(overview);
      const entities = ALL_SECTIONS.map((s) => s.entity).filter((e) => e !== 'overview' && e !== 'migration');
      const entries = await Promise.all(
        entities.map(async (entity) => {
          const rows = await adminApi.listRecords(entity);
          return [entity, rows] as const;
        }),
      );
      setInternalData(Object.fromEntries(entries));
    } catch {
      // fallback
    } finally {
      setInternalLoading(false);
    }
  }, [dataProp]);

  useEffect(() => {
    void loadInternalAdminData();
  }, [loadInternalAdminData]);

  const data = dataProp ?? internalData;
  const summary = summaryProp ?? internalSummary;
  const loading = loadingProp ?? internalLoading;
  const error = errorProp ?? null;
  const onRefresh = useCallback(async () => {
    if (onRefreshProp) await onRefreshProp();
    else await loadInternalAdminData();
    onMigrationComplete?.();
  }, [onRefreshProp, loadInternalAdminData, onMigrationComplete]);
  const onLogout = onLogoutProp ?? onBack ?? (() => {});
  const onOpenTv = onOpenTvProp ?? (() => {});
  const onOpenBank = onOpenBankProp ?? (() => {});
  const onAction =
    onActionProp ??
    (async (action: string, entity: string, payload: Record<string, unknown>) => {
      if (action === 'create') {
        const res = await adminApi.createRecord(entity, payload);
        await loadInternalAdminData();
        return res;
      }
      if (action === 'update') {
        const id = String(payload.id || '');
        const res = await adminApi.updateRecord(entity, id, payload);
        await loadInternalAdminData();
        return res;
      }
      if (action === 'archive') {
        await adminApi.archiveRecord(entity, String(payload.id || ''));
        await loadInternalAdminData();
        return {};
      }
      if (action === 'delete') {
        await adminApi.deleteRecord(entity, String(payload.id || ''));
        await loadInternalAdminData();
        return {};
      }
      return {};
    });
  const [active, setActive] = useState('overview');
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState<{ mode: 'create' | 'edit'; record?: Record<string, unknown> } | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ action: string; row: Record<string, unknown> } | null>(null);
  const [migrationReport, setMigrationReport] = useState<MigrationReport | null>(null);
  const [migrating, setMigrating] = useState(false);

  const section = ALL_SECTIONS.find((item) => item.id === active) ?? ALL_SECTIONS[0];
  const records = data[section.entity] ?? [];
  const fields = useMemo(() => {
    if (modal?.record)
      return (
        EDIT_FIELDS[section.entity] ??
        Object.keys(modal.record).filter(
          (key) => !['id', 'uid', 'key', 'createdAt', 'updatedAt', 'createdBy', 'updatedBy'].includes(key),
        )
      );
    return CREATE_FIELDS[section.entity] ?? [];
  }, [modal, section.entity]);

  const filtered = records.filter(
    (row) =>
      !query ||
      Object.values(row).some((value) =>
        display(value).toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      ),
  );

  const handleRunMigration = async (mode: 'idempotent-preserve' | 'idempotent-upsert' | 'dry-run') => {
    setMigrating(true);
    setActionError(null);
    try {
      const report = await adminApi.migrateMockups(mode);
      setMigrationReport(report);
      await onRefresh();
      setActionNotice(
        `Migração (${mode}) executada: ${report.totalIdentified} identificados, ${report.totalImported} importados, ${report.totalUpdated} atualizados, ${report.totalIgnored} preservados.`,
      );
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Falha na migração.');
    } finally {
      setMigrating(false);
    }
  };

  const startCreate = () => {
    setActionError(null);
    setActionNotice(null);
    setForm(
      Object.fromEntries(
        (CREATE_FIELDS[section.entity] ?? []).map((key) => [key, JSON_FIELDS.has(key) ? '[]' : '']),
      ),
    );
    setModal({ mode: 'create' });
  };

  const startEdit = (row: Record<string, unknown>) => {
    setActionError(null);
    setActionNotice(null);
    setForm(
      Object.fromEntries(
        Object.entries(row)
          .filter(([key]) => !['id', 'uid', 'key'].includes(key))
          .map(([key, value]) => [key, typeof value === 'string' ? value : display(value)]),
      ),
    );
    setModal({ mode: 'edit', record: row });
  };

  const runAction = async (action: string, payload: Record<string, unknown>) => {
    setPending(true);
    setActionError(null);
    try {
      const result = await onAction(action, section.entity, payload);
      const record = result && typeof result === 'object' ? (result as Record<string, any>) : {};
      const resetLink = record.passwordSetup?.resetLink;
      const loginCode = record.credentials?.loginCode;
      if (typeof resetLink === 'string')
        setActionNotice(`Conta criada. Link temporário para definir senha: ${resetLink}`);
      else if (typeof loginCode === 'string')
        setActionNotice(`Aluno criado. Código de acesso: ${loginCode}.`);
      else setActionNotice('Alteração salva e sincronizada com o Firebase.');
      setModal(null);
      setConfirm(null);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : String(caught || 'Não foi possível concluir a ação.');
      setActionError(message);
    } finally {
      setPending(false);
    }
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    const action = modal?.mode === 'edit' ? 'update' : 'create';
    const payload: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(form)) {
      if (value.trim() === '' && modal?.mode === 'create') continue;
      if (JSON_FIELDS.has(key)) {
        try {
          payload[key] = JSON.parse(value);
        } catch {
          setActionError(`${pretty(key)} deve estar no formato JSON válido (ex.: ["id"]).`);
          return;
        }
      } else if (NUMBER_FIELDS.has(key)) {
        const number = Number(value);
        if (!Number.isFinite(number)) {
          setActionError(`${pretty(key)} deve ser numérico.`);
          return;
        }
        payload[key] = number;
      } else if (key === 'active' || key === 'popular') {
        payload[key] = value === 'true';
      } else payload[key] = value;
    }
    if (modal?.mode === 'edit') payload.id = recordId(modal.record!);
    void runAction(action, payload);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800">
      <div className="flex min-h-screen">
        <aside className="hidden w-[258px] shrink-0 flex-col border-r border-slate-200/80 bg-white/90 px-4 py-5 lg:flex">
          <div className="mb-8 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#123cc4] to-[#00067a] text-white shadow-md shadow-blue-900/15">
              <Sparkles size={20} />
            </div>
            <div>
              <div className="font-[Outfit] text-[15px] font-bold leading-tight text-[#05148d]">
                Sala de Missões
              </div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">
                Administração
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-5 overflow-y-auto">
            {SECTIONS.map((group) => (
              <div key={group.group}>
                <div className="mb-2 px-3 text-[10px] font-bold tracking-[.15em] text-slate-400">
                  {group.group}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const selected = item.id === active;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActive(item.id);
                          setQuery('');
                          setActionError(null);
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition ${
                          selected
                            ? 'bg-[#123cc4]/[.08] text-[#05148d] ring-1 ring-[#123cc4]/10'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-[#05148d]'
                        }`}
                      >
                        <Icon size={17} className={selected ? 'text-[#123cc4]' : 'text-slate-400'} />
                        {item.label}
                        {selected && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#123cc4]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          <div className="mt-5 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#05148d]">
              <Shield size={15} /> Acesso protegido
            </div>
            <p className="mb-0 mt-1 text-[11px] leading-relaxed text-slate-500">
              Console administrativa conectada ao Firebase (salam-33122).
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex min-h-[72px] items-center justify-between gap-3 border-b border-slate-200/70 bg-white/85 px-4 backdrop-blur-xl sm:px-7">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#123cc4] text-white lg:hidden">
                <Sparkles size={18} />
              </div>
              <div className="relative">
                <select
                  aria-label="Seção administrativa"
                  value={active}
                  onChange={(e) => {
                    setActive(e.target.value);
                    setQuery('');
                  }}
                  className="max-w-[200px] appearance-none bg-transparent pr-6 font-[Outfit] text-sm font-bold text-[#05148d] outline-none sm:max-w-none lg:hidden"
                >
                  {ALL_SECTIONS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 text-slate-400 lg:hidden"
                  size={15}
                />
              </div>
              <div className="hidden lg:block">
                <div className="font-[Outfit] text-sm font-bold text-slate-800">Console administrativa</div>
                <div className="text-xs text-slate-500">Gestão central · Sala de Missões</div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onOpenBank}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 text-xs font-semibold text-[#123cc4] transition hover:border-blue-300 hover:bg-blue-100"
              >
                <Wallet size={15} />
                <span>Banco</span>
              </button>
              <button
                onClick={onOpenTv}
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-blue-200 hover:text-[#123cc4]"
              >
                <Monitor size={15} />
                <span className="hidden sm:inline">Painel TV</span>
              </button>
              <div className="hidden h-8 w-px bg-slate-200 sm:block" />
              <div className="hidden text-right sm:block">
                <div className="max-w-36 truncate text-xs font-bold text-slate-700">{actor.name}</div>
                <div className="max-w-36 truncate text-[10px] text-slate-500">{actor.email}</div>
              </div>
              <div
                title={`${actor.name} · ${actor.role}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-xs font-bold text-[#05148d] ring-1 ring-blue-100"
              >
                {actor.name
                  .trim()
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join('')
                  .toUpperCase()}
              </div>
              <button
                onClick={onLogout}
                aria-label="Sair"
                title="Sair"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut size={17} />
              </button>
            </div>
          </header>
          <div className="mx-auto max-w-[1440px] p-4 sm:p-7">
            {actionNotice && (
              <div
                role="status"
                className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900"
              >
                <Check size={18} className="mt-0.5 shrink-0" />
                <div className="min-w-0 whitespace-pre-wrap break-all">{actionNotice}</div>
                <button
                  onClick={() => setActionNotice(null)}
                  aria-label="Fechar confirmação"
                  className="ml-auto shrink-0 rounded p-1 hover:bg-emerald-100"
                >
                  <X size={15} />
                </button>
              </div>
            )}
            {error && (
              <div
                role="alert"
                className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold">Falha ao carregar os dados</div>
                  <div className="mt-0.5">{error}</div>
                </div>
                <button onClick={() => void onRefresh()} className="ml-auto shrink-0 text-xs font-bold underline">
                  Tentar novamente
                </button>
              </div>
            )}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.14em] text-[#123cc4]">
                  <span>ADMIN MASTER</span>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-400">{section.label}</span>
                </div>
                <h1 className="font-[Outfit] text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">
                  {section.label}
                </h1>
                <p className="mb-0 mt-1 text-sm text-slate-500">{section.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => void handleRunMigration('idempotent-preserve')}
                  disabled={migrating}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-xs font-bold text-emerald-800 shadow-sm hover:bg-emerald-100 disabled:opacity-60"
                >
                  <Database size={15} className={migrating ? 'animate-spin' : ''} />
                  <span>{migrating ? 'Migrando…' : 'Migrar Mockups p/ Firebase'}</span>
                </button>
                <button
                  onClick={() => void onRefresh()}
                  disabled={loading}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50 disabled:opacity-60"
                >
                  <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
                  <span className="hidden sm:inline">Atualizar</span>
                </button>
                {active !== 'overview' && active !== 'migration' && !section.readOnly && (
                  <button
                    onClick={startCreate}
                    className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#123cc4] px-4 text-xs font-bold text-white shadow-sm shadow-blue-900/15 transition hover:bg-[#05148d]"
                  >
                    <Plus size={16} />
                    Novo registro
                  </button>
                )}
              </div>
            </div>

            {active === 'migration' ? (
              <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="font-[Outfit] text-lg font-bold text-slate-900">
                      Motor de Migração Idempotente de Mockups → Firebase (salam-33122)
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Transfere todos os dados estáticos (alunos, turmas, 15 trilhas interativas incluindo Gari e Pix,
                      missões, cards, conquistas, loja e banco) preservando IDs e relacionamentos sem duplicar registros.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => void handleRunMigration('dry-run')}
                      disabled={migrating}
                      className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Validar (Dry-Run)
                    </button>
                    <button
                      onClick={() => void handleRunMigration('idempotent-preserve')}
                      disabled={migrating}
                      className="rounded-xl bg-[#123cc4] px-4 py-2 text-xs font-bold text-white hover:bg-[#05148d]"
                    >
                      Importar Novos (Idempotente)
                    </button>
                    <button
                      onClick={() => void handleRunMigration('idempotent-upsert')}
                      disabled={migrating}
                      className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
                    >
                      Sincronizar / Upsert Completo
                    </button>
                  </div>
                </div>

                {migrationReport && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                      <div className="rounded-xl bg-slate-50 p-3">
                        <div className="text-[11px] font-bold text-slate-500">Identificados</div>
                        <div className="text-2xl font-black text-slate-900">{migrationReport.totalIdentified}</div>
                      </div>
                      <div className="rounded-xl bg-emerald-50 p-3">
                        <div className="text-[11px] font-bold text-emerald-700">Importados</div>
                        <div className="text-2xl font-black text-emerald-800">{migrationReport.totalImported}</div>
                      </div>
                      <div className="rounded-xl bg-blue-50 p-3">
                        <div className="text-[11px] font-bold text-blue-700">Atualizados</div>
                        <div className="text-2xl font-black text-blue-800">{migrationReport.totalUpdated}</div>
                      </div>
                      <div className="rounded-xl bg-amber-50 p-3">
                        <div className="text-[11px] font-bold text-amber-700">Ignorados (Já existem)</div>
                        <div className="text-2xl font-black text-amber-800">{migrationReport.totalIgnored}</div>
                      </div>
                      <div className="rounded-xl bg-rose-50 p-3">
                        <div className="text-[11px] font-bold text-rose-700">Erros</div>
                        <div className="text-2xl font-black text-rose-800">{migrationReport.totalErrors}</div>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-[10px] font-bold uppercase text-slate-500">
                          <tr>
                            <th className="px-4 py-2.5">Coleção</th>
                            <th className="px-4 py-2.5">Identificados</th>
                            <th className="px-4 py-2.5">Importados</th>
                            <th className="px-4 py-2.5">Atualizados</th>
                            <th className="px-4 py-2.5">Ignorados</th>
                            <th className="px-4 py-2.5">Erros</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {migrationReport.entities.map((e) => (
                            <tr key={e.collection}>
                              <td className="px-4 py-2 font-bold text-slate-800">{e.collection}</td>
                              <td className="px-4 py-2">{e.identified}</td>
                              <td className="px-4 py-2 text-emerald-700 font-bold">{e.imported}</td>
                              <td className="px-4 py-2 text-blue-700 font-bold">{e.updated}</td>
                              <td className="px-4 py-2 text-slate-500">{e.ignored}</td>
                              <td className="px-4 py-2 text-rose-600 font-bold">{e.errors}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : active === 'overview' ? (
              <>
                <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                  {summary &&
                    Object.entries(summary).map(([key, value]) => (
                      <div
                        key={key}
                        className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-[0_3px_14px_rgba(15,23,42,.035)]"
                      >
                        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-[#123cc4]">
                          <Activity size={16} />
                        </div>
                        <div className="font-[Outfit] text-2xl font-bold tabular-nums text-slate-900">
                          {Number(value).toLocaleString('pt-BR')}
                        </div>
                        <div className="mt-1 text-xs font-medium text-slate-500">{pretty(key)}</div>
                      </div>
                    ))}
                </div>
                <div className="grid gap-4 xl:grid-cols-2">
                  {ALL_SECTIONS.slice(1).map((item) => {
                    const Icon = item.icon;
                    const count = data[item.entity]?.length ?? 0;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className="group flex items-center gap-4 rounded-xl border border-slate-200/80 bg-white p-4 text-left shadow-[0_3px_14px_rgba(15,23,42,.035)] transition hover:border-blue-200 hover:shadow-md"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#123cc4] group-hover:bg-[#123cc4] group-hover:text-white">
                          <Icon size={19} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold text-slate-800">{item.label}</div>
                          <div className="mt-1 text-xs text-slate-500">{item.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold tabular-nums text-slate-800">
                            {count.toLocaleString('pt-BR')}
                          </div>
                          <div className="text-[10px] text-slate-400">registros</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,.04)]">
                <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-slate-500">
                    <span className="font-bold text-slate-800">{filtered.length.toLocaleString('pt-BR')}</span>{' '}
                    registro(s){query ? ' encontrados' : ''}
                  </div>
                  <label className="relative block sm:w-72">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Buscar nos registros…"
                      className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50/70 pl-9 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />
                  </label>
                </div>
                {loading && records.length === 0 ? (
                  <div className="flex items-center justify-center gap-2 px-5 py-16 text-sm text-slate-500">
                    <LoaderCircle className="animate-spin" size={18} />
                    Carregando registros…
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="px-5 py-16 text-center">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                      {query ? <Search size={19} /> : <ClipboardList size={19} />}
                    </div>
                    <div className="text-sm font-bold text-slate-700">
                      {query ? 'Nenhum resultado para esta busca' : 'Nenhum registro disponível'}
                    </div>
                    <p className="mb-0 mt-1 text-xs text-slate-500">
                      {query ? 'Tente ajustar os termos da busca.' : 'Os dados desta área aparecerão aqui.'}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left text-xs">
                      <thead className="bg-slate-50/80 text-[10px] uppercase tracking-wider text-slate-500">
                        <tr>
                          {Object.keys(filtered[0])
                            .filter((key) => !['uid'].includes(key))
                            .slice(0, 7)
                            .map((key) => (
                              <th key={key} className="px-4 py-3 font-bold">
                                {pretty(key)}
                              </th>
                            ))}
                          <th className="px-4 py-3 text-right font-bold">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filtered.map((row, index) => (
                          <tr key={String(recordId(row) || index)} className="transition hover:bg-blue-50/30">
                            {Object.entries(row)
                              .filter(([key]) => key !== 'uid')
                              .slice(0, 7)
                              .map(([key, value]) => (
                                <td
                                  key={key}
                                  className="max-w-[280px] truncate px-4 py-3.5 text-slate-600"
                                  title={display(value)}
                                >
                                  {key.toLowerCase().includes('coin') || key.toLowerCase().includes('xp') ? (
                                    <span className="inline-flex items-center gap-1.5 font-semibold text-[#05148d]">
                                      {key.toLowerCase().includes('coin') ? (
                                        <CircleDollarSign size={13} className="text-amber-500" />
                                      ) : null}
                                      {display(value)}
                                    </span>
                                  ) : (
                                    display(value)
                                  )}
                                </td>
                              ))}
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-1">
                                <button
                                  onClick={() => startEdit(row)}
                                  title="Editar"
                                  aria-label="Editar registro"
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-blue-50 hover:text-[#123cc4]"
                                >
                                  <Pencil size={15} />
                                </button>
                                <button
                                  onClick={() => {
                                    setActionError(null);
                                    setConfirm({ action: 'archive', row });
                                  }}
                                  title="Arquivar"
                                  aria-label="Arquivar registro"
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-amber-50 hover:text-amber-700"
                                >
                                  <Archive size={15} />
                                </button>
                                <button
                                  onClick={() => {
                                    setActionError(null);
                                    setConfirm({ action: 'delete', row });
                                  }}
                                  title="Excluir"
                                  aria-label="Excluir registro"
                                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/40 px-4 py-3 text-[10px] text-slate-400">
                  <span>Dados sincronizados com Firebase (salam-33122)</span>
                  <span>{actor.role}</span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {(modal || confirm) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-[3px]"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !pending) {
              setModal(null);
              setConfirm(null);
              setActionError(null);
            }
          }}
        >
          {modal && (
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="admin-modal-title"
              className="my-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/70 bg-white shadow-2xl"
            >
              <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <h2 id="admin-modal-title" className="mb-1 font-[Outfit] text-lg font-bold text-slate-900">
                    {modal.mode === 'create' ? 'Novo registro' : 'Editar registro'}
                  </h2>
                  <p className="mb-0 text-xs text-slate-500">{section.label} · alterações enviadas ao Firebase</p>
                </div>
                <button
                  disabled={pending}
                  onClick={() => setModal(null)}
                  className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                >
                  <X size={17} />
                </button>
              </div>
              <form onSubmit={submitForm} className="space-y-4 p-5">
                {fields.map((key) => (
                  <label key={key} className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-slate-600">{pretty(key)}</span>
                    {String(form[key] ?? '').length > 100 || key.toLowerCase().includes('description') ? (
                      <textarea
                        value={form[key] ?? ''}
                        onChange={(e) => setForm((current) => ({ ...current, [key]: e.target.value }))}
                        rows={3}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                      />
                    ) : (
                      <input
                        value={form[key] ?? ''}
                        onChange={(e) => setForm((current) => ({ ...current, [key]: e.target.value }))}
                        className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
                      />
                    )}
                  </label>
                ))}
                {actionError && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700"
                  >
                    {actionError}
                  </div>
                )}
                <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => setModal(null)}
                    className="h-9 rounded-lg px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Cancelar
                  </button>
                  <button
                    disabled={pending}
                    type="submit"
                    className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#123cc4] px-4 text-xs font-bold text-white hover:bg-[#05148d] disabled:opacity-60"
                  >
                    {pending ? <LoaderCircle size={15} className="animate-spin" /> : <Check size={15} />}
                    {pending ? 'Enviando…' : 'Salvar'}
                  </button>
                </div>
              </form>
            </div>
          )}
          {confirm && (
            <div role="alertdialog" aria-modal="true" className="my-auto w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                {confirm.action === 'archive' ? <Archive size={19} /> : <Trash2 size={19} />}
              </div>
              <h2 className="mb-1 font-[Outfit] text-lg font-bold text-slate-900">
                {confirm.action === 'archive' ? 'Arquivar registro?' : 'Excluir registro?'}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-slate-500">
                Esta ação será persistida no Firebase. Confirme para continuar.
              </p>
              {actionError && (
                <div
                  role="alert"
                  className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs text-red-700"
                >
                  {actionError}
                </div>
              )}
              <div className="flex justify-end gap-2">
                <button
                  disabled={pending}
                  onClick={() => setConfirm(null)}
                  className="h-9 rounded-lg px-4 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  disabled={pending}
                  onClick={() => void runAction(confirm.action, { id: recordId(confirm.row), record: confirm.row })}
                  className={`inline-flex h-9 items-center gap-2 rounded-lg px-4 text-xs font-bold text-white disabled:opacity-60 ${
                    confirm.action === 'delete'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {pending && <LoaderCircle size={14} className="animate-spin" />}
                  {pending ? 'Processando…' : 'Confirmar'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminConsole;
