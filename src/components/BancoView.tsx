import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  Banknote,
  Check,
  ChevronRight,
  CircleHelp,
  Copy,
  CreditCard,
  Eye,
  EyeOff,
  Link2,
  QrCode,
  ShieldCheck,
  Smartphone,
  Wallet,
  X,
} from 'lucide-react';

type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  direction: 'in' | 'out';
  date: string;
  category: string;
};
type Operation = 'pagar' | 'transferir';
type NfcIntent = { action: Operation; recipient: string; amount?: number };
type BankTab = 'inicio' | 'extrato' | 'receber';

const STARTING_BALANCE = 42;
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'demo-1', title: 'Missão concluída', subtitle: 'Recompensa de aprendizagem', amount: 12, direction: 'in', date: 'Hoje, 09:24', category: 'Recompensa' },
  { id: 'demo-2', title: 'Cantina da escola', subtitle: 'Lanche', amount: 8, direction: 'out', date: 'Ontem, 12:05', category: 'Pagamento' },
  { id: 'demo-3', title: 'De Bia S.', subtitle: 'Transferência entre colegas', amount: 5, direction: 'in', date: 'Ontem, 10:41', category: 'Recebido' },
  { id: 'demo-4', title: 'Papelaria da turma', subtitle: 'Material escolar', amount: 6, direction: 'out', date: 'Segunda, 14:10', category: 'Pagamento' },
];

function makeIntentUrl(action: Operation, recipient: string, amount?: number) {
  const params = new URLSearchParams({ para: recipient, modo: 'demo' });
  if (amount !== undefined) params.set('valor', String(amount));
  return `${window.location.origin}/banco/nfc/${action}?${params.toString()}`;
}

const ActionButton: React.FC<{ label: string; icon: React.ReactNode; onClick: () => void; primary?: boolean }> = ({ label, icon, onClick, primary = false }) => (
  <button type="button" onClick={onClick} className={`group flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-2xl border px-2 py-3 text-xs font-bold transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 ${primary ? 'border-[#123cc4] bg-[#123cc4] text-white shadow-sm hover:bg-[#0d2fa9]' : 'border-slate-200 bg-white text-slate-800 hover:border-blue-200'}`}>
    <span className={`grid h-9 w-9 place-items-center rounded-xl ${primary ? 'bg-white/15' : 'bg-blue-50 text-[#123cc4] group-hover:bg-blue-100'}`}>{icon}</span>{label}
  </button>
);

const TransactionRow: React.FC<{ item: Transaction }> = ({ item }) => {
  const incoming = item.direction === 'in';
  return <li className="flex min-w-0 items-center gap-2 border-b border-slate-100 py-3 last:border-0 last:pb-0 sm:gap-3 sm:py-4">
    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full sm:h-11 sm:w-11 ${incoming ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>{incoming ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}</span>
    <span className="min-w-0 flex-1"><span className="block truncate text-xs font-bold text-slate-900 sm:text-sm">{item.title}</span><span className="mt-0.5 block truncate text-[10px] text-slate-500 sm:text-xs">{item.subtitle} · {item.date}</span></span>
    <span className="shrink-0 text-right"><span className={`block whitespace-nowrap text-xs font-extrabold tabular-nums sm:text-sm ${incoming ? 'text-emerald-700' : 'text-slate-900'}`}>{incoming ? '+' : '−'}{item.amount} <span className="hidden xs:inline">moedas</span></span><span className="mt-0.5 block text-[9px] font-semibold text-slate-400 sm:text-[10px]">{item.category}</span></span>
  </li>;
};

const BankTabButton: React.FC<{ label: string; selected: boolean; onClick: () => void }> = ({ label, selected, onClick }) => (
  <button type="button" role="tab" aria-selected={selected} onClick={onClick} className={`min-h-11 border-b-2 px-4 text-sm font-bold transition ${selected ? 'border-[#123cc4] text-[#123cc4]' : 'border-transparent text-slate-500 hover:text-slate-900'}`}>{label}</button>
);

export const BancoView: React.FC<{ studentName: string; nfcRoute?: boolean; onExitNfc?: () => void }> = ({ studentName, nfcRoute = false, onExitNfc }) => {
  const [balance, setBalance] = useState(STARTING_BALANCE);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [hideBalance, setHideBalance] = useState(false);
  const [activeTab, setActiveTab] = useState<BankTab>('inicio');
  const [modal, setModal] = useState<Operation | null>(null);
  const [recipient, setRecipient] = useState('');
  const [amountText, setAmountText] = useState('');
  const [note, setNote] = useState('');
  const [linkKind, setLinkKind] = useState<Operation>('pagar');
  const [copyLabel, setCopyLabel] = useState('Copiar link');
  const [feedback, setFeedback] = useState('');

  const nfcIntent = useMemo<NfcIntent | null>(() => {
    if (!nfcRoute) return null;
    const action: Operation = window.location.pathname.endsWith('/transferir') ? 'transferir' : 'pagar';
    const params = new URLSearchParams(window.location.search);
    const linkRecipient = params.get('para')?.slice(0, 50) ?? '';
    const rawAmount = params.get('valor');
    const amount = rawAmount === null ? undefined : Number(rawAmount);
    const invalidAmount = rawAmount !== null && (!Number.isInteger(amount) || amount! < 1 || amount! > 500);
    if (params.get('modo') !== 'demo' || !linkRecipient || invalidAmount || (action === 'pagar' && amount === undefined)) return null;
    return { action, recipient: linkRecipient, amount };
  }, [nfcRoute]);

  useEffect(() => {
    if (!nfcRoute) return;
    setActiveTab('inicio');
    if (!nfcIntent) {
      setFeedback('Link incompleto. Confira o endereço e tente novamente.');
      return;
    }
    setRecipient(nfcIntent.recipient);
    setAmountText(nfcIntent.amount === undefined ? '' : String(nfcIntent.amount));
    setModal(nfcIntent.action);
  }, [nfcRoute, nfcIntent]);

  const closeNfc = () => { if (nfcRoute) onExitNfc?.(); };
  const openOperation = (action: Operation) => {
    setFeedback(''); setRecipient(''); setAmountText(''); setNote(''); setModal(action);
  };

  const submitOperation = () => {
    const amount = Number(amountText);
    if (!recipient.trim() || !Number.isInteger(amount) || amount < 1 || amount > balance) {
      setFeedback(`Confira o nome e o valor. Você pode usar de 1 a ${balance} moedas.`);
      return;
    }
    const isTransfer = modal === 'transferir';
    const transaction: Transaction = {
      id: `demo-${Date.now()}`,
      title: isTransfer ? `Transferência para ${recipient.trim()}` : `Pagamento para ${recipient.trim()}`,
      subtitle: note.trim() || (isTransfer ? 'Transferência entre colegas' : 'Pagamento'),
      amount,
      direction: 'out',
      date: 'Agora',
      category: isTransfer ? 'Transferência' : 'Pagamento',
    };
    setBalance(current => current - amount);
    setTransactions(current => [transaction, ...current]);
    setFeedback('Operação concluída.');
    setModal(null); setAmountText(''); setNote(''); closeNfc();
  };

  const createLink = async () => {
    const amount = Number(amountText);
    if (linkKind === 'pagar' && (!Number.isInteger(amount) || amount < 1 || amount > 500)) {
      setFeedback('Informe um valor inteiro entre 1 e 500 moedas.');
      return;
    }
    const url = makeIntentUrl(linkKind, studentName || 'Estudante', linkKind === 'pagar' ? amount : undefined);
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
      setCopyLabel('Link copiado');
      window.setTimeout(() => setCopyLabel('Copiar link'), 2200);
      setFeedback('Link copiado.');
    } catch {
      setFeedback(`Copie este endereço: ${url}`);
    }
  };

  return <main className="mx-auto w-full max-w-6xl space-y-5 pb-12 text-slate-900 sm:space-y-7">
    <header className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#123cc4] to-[#05148d] text-white shadow-md shadow-blue-900/15"><Wallet size={22} /></span>
        <div><p className="mb-0 text-[10px] font-black uppercase tracking-[.16em] text-[#123cc4]">Carteira escolar</p><h1 className="mb-0 font-[Outfit] text-2xl font-black tracking-tight sm:text-3xl">Banco de moedas</h1></div>
      </div>
    </header>

    <section className="grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
      <div className="relative overflow-hidden rounded-[24px] border border-blue-100 bg-gradient-to-br from-[#f0f6ff] via-white to-[#e8efff] p-4 text-slate-900 shadow-sm sm:rounded-[28px] sm:p-7">
        <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full border-[34px] border-blue-900/[.035]" />
        <div className="relative flex items-start justify-between gap-3"><div className="min-w-0"><p className="mb-1 text-xs font-semibold text-[#123cc4]">Carteira de aprendizagem</p><h2 className="mb-0 truncate font-[Outfit] text-lg font-extrabold sm:text-xl">Olá, {studentName || 'Estudante'}</h2></div><button type="button" onClick={() => setHideBalance(hidden => !hidden)} className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-blue-100 bg-white text-[#123cc4] transition hover:bg-blue-50" aria-label={hideBalance ? 'Mostrar saldo' : 'Ocultar saldo'}>{hideBalance ? <Eye size={18} /> : <EyeOff size={18} />}</button></div>
        <div className="relative mt-5 sm:mt-7"><p className="mb-1 text-xs font-semibold text-slate-500">Saldo disponível</p><p className="mb-0 flex flex-wrap items-baseline gap-x-2"><span className="font-[Outfit] text-4xl font-black tracking-tight tabular-nums text-[#05148d] sm:text-6xl">{hideBalance ? '••••' : balance}</span><span className="text-base font-bold text-slate-600 sm:text-lg">moedas</span></p></div>
        <div className="relative mt-4 flex items-center gap-2 text-[11px] font-semibold text-slate-600 sm:mt-6 sm:text-xs"><ShieldCheck size={15} className="shrink-0 text-[#123cc4]" /><span>Seu saldo disponível</span></div>
      </div>

      <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between"><div><h2 className="mb-0 font-[Outfit] text-lg font-bold">O que você quer fazer?</h2><p className="mb-0 mt-1 text-xs text-slate-500">Escolha uma ação da carteira</p></div><span className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Atalhos</span></div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <ActionButton label="Pagar" icon={<CreditCard size={19} />} primary onClick={() => openOperation('pagar')} />
          <ActionButton label="Transferir" icon={<ArrowLeftRight size={19} />} onClick={() => openOperation('transferir')} />
          <ActionButton label="Receber" icon={<ArrowDownLeft size={19} />} onClick={() => setActiveTab('receber')} />
        </div>
      </aside>
    </section>

    <div className="flex overflow-x-auto border-b border-slate-200" role="tablist" aria-label="Seções da carteira">
      <BankTabButton label="Visão geral" selected={activeTab === 'inicio'} onClick={() => setActiveTab('inicio')} />
      <BankTabButton label="Extrato" selected={activeTab === 'extrato'} onClick={() => setActiveTab('extrato')} />
      <BankTabButton label="Receber" selected={activeTab === 'receber'} onClick={() => setActiveTab('receber')} />
    </div>

    {feedback && <div role="status" className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-950"><span className="mt-0.5 text-[#123cc4]"><Check size={17} /></span><p className="mb-0 min-w-0 flex-1 break-all">{feedback}</p><button type="button" onClick={() => setFeedback('')} aria-label="Fechar aviso" className="rounded p-1 text-slate-500 hover:bg-blue-100"><X size={16} /></button></div>}

    {activeTab === 'inicio' && <section className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-1 flex items-center justify-between"><div><p className="mb-1 text-[10px] font-black uppercase tracking-[.14em] text-slate-400">Sua conta</p><h2 className="mb-0 font-[Outfit] text-xl font-bold">Movimentações recentes</h2></div><button type="button" onClick={() => setActiveTab('extrato')} className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-xs font-bold text-[#123cc4] hover:bg-blue-50">Ver extrato <ChevronRight size={15} /></button></div>
        <ul className="m-0 list-none p-0">{transactions.slice(0, 4).map(item => <TransactionRow key={item.id} item={item} />)}</ul>
      </div>
      <div className="overflow-hidden rounded-[24px] border border-blue-100 bg-white shadow-sm">
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-5 sm:p-6">
          <div className="flex items-start justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl border border-blue-100 bg-white text-[#123cc4]"><CreditCard size={19} /></span><span className="rounded-full border border-blue-100 bg-white px-2.5 py-1 text-[9px] font-black tracking-[.12em] text-[#123cc4]">CARTÃO</span></div>
          <p className="mb-1 mt-6 text-xs text-slate-500">Carteira de</p><p className="mb-5 truncate font-[Outfit] text-lg font-bold text-slate-900">{studentName || 'Estudante'}</p>
          <div className="flex flex-wrap items-end justify-between gap-2"><span className="font-mono text-sm tracking-[.12em] text-slate-500 sm:tracking-[.2em]">•••• &nbsp;•••• &nbsp;•••• &nbsp;0000</span><span className="text-[10px] font-bold text-indigo-700">NFC</span></div>
        </div>
        <div className="p-5"><p className="mb-3 text-xs leading-relaxed text-slate-600">Crie um link para abrir sua carteira por aproximação.</p><button type="button" onClick={() => setActiveTab('receber')} className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3 text-sm font-bold text-[#123cc4] transition hover:bg-blue-100"><Link2 size={16} />Criar link NFC<ArrowRight size={15} /></button></div>
      </div>
    </section>}

    {activeTab === 'extrato' && <section className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-2"><p className="mb-1 text-[10px] font-black uppercase tracking-[.14em] text-slate-400">Histórico da carteira</p><h2 className="mb-0 font-[Outfit] text-xl font-bold">Extrato</h2><p className="mb-0 mt-1 text-xs text-slate-500">Entradas e saídas da sua carteira.</p></div>
      {transactions.length ? <ul className="m-0 list-none p-0">{transactions.map(item => <TransactionRow key={item.id} item={item} />)}</ul> : <p className="py-10 text-center text-sm text-slate-500">Não há movimentações.</p>}
    </section>}

    {activeTab === 'receber' && <section className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-[#123cc4]"><QrCode size={21} /></span>
        <p className="mb-1 text-[10px] font-black uppercase tracking-[.14em] text-slate-400">Receber moedas</p><h2 className="mb-0 font-[Outfit] text-xl font-bold">Link para etiqueta NFC</h2><p className="mb-0 mt-2 max-w-xl text-sm leading-relaxed text-slate-600">Crie um link para abrir a tela de cobrança ou transferência ao aproximar o cartão de um celular.</p>
        <label className="mt-5 block text-xs font-bold text-slate-700">O que o link vai fazer?<select value={linkKind} onChange={event => setLinkKind(event.target.value as Operation)} className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none focus:border-[#123cc4] focus:ring-4 focus:ring-blue-500/10"><option value="pagar">Cobrar um valor fixo</option><option value="transferir">Transferir moedas (valor escolhido ao abrir)</option></select></label>
        {linkKind === 'pagar' && <label className="mt-4 block text-xs font-bold text-slate-700">Valor em moedas<input type="number" min="1" max="500" step="1" value={amountText} onChange={event => setAmountText(event.target.value)} placeholder="Ex.: 5" className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-base outline-none focus:border-[#123cc4] focus:ring-4 focus:ring-blue-500/10" /></label>}
        <button type="button" onClick={() => void createLink()} className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#123cc4] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0d2fa9] sm:w-auto"><Copy size={16} />{copyLabel}</button>
      </div>
      <aside className="rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 sm:p-6">
        <div className="flex items-center gap-2 font-[Outfit] font-bold text-[#05148d]"><Smartphone size={19} />Teste a aproximação</div>
        <ol className="mt-4 space-y-3 pl-5 text-sm leading-relaxed text-slate-700"><li>Copie o endereço gerado.</li><li>Grave o endereço em uma etiqueta NFC como link de site.</li><li>Aproxime um celular para abrir o link.</li></ol>
      </aside>
    </section>}

    {modal && <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="bank-operation-title" className="w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 bg-slate-50 px-5 py-5 sm:px-6"><div><span className="mb-2 grid h-10 w-10 place-items-center rounded-xl bg-blue-100 text-[#123cc4]">{modal === 'transferir' ? <ArrowLeftRight size={20} /> : <Banknote size={20} />}</span><h2 id="bank-operation-title" className="mb-0 font-[Outfit] text-xl font-bold text-slate-900">{nfcRoute ? 'Confira a operação' : modal === 'transferir' ? 'Transferir moedas' : 'Fazer um pagamento'}</h2><p className="mb-0 mt-1 text-sm text-slate-500">Confira o nome e o valor</p></div><button type="button" onClick={() => { setModal(null); closeNfc(); }} aria-label="Fechar" className="rounded-lg p-2 text-slate-500 hover:bg-slate-200"><X size={18} /></button></div>
        <div className="space-y-4 p-5 sm:p-6">
          <label className="block text-xs font-bold text-slate-700">{modal === 'transferir' ? 'Enviar para' : 'Pagar para'}<input autoFocus value={recipient} onChange={event => setRecipient(event.target.value)} readOnly={Boolean(nfcIntent)} placeholder="Nome do colega ou estabelecimento" className="mt-1.5 min-h-12 w-full rounded-xl border border-slate-300 px-3 text-base outline-none focus:border-[#123cc4] focus:ring-4 focus:ring-blue-500/10 read-only:bg-slate-50" /></label>
          <label className="block text-xs font-bold text-slate-700">Valor em moedas<input type="number" min="1" max={balance} step="1" value={amountText} onChange={event => setAmountText(event.target.value)} readOnly={nfcIntent?.amount !== undefined} placeholder="Digite um valor" className="mt-1.5 min-h-12 w-full rounded-xl border border-slate-300 px-3 text-lg font-bold outline-none focus:border-[#123cc4] focus:ring-4 focus:ring-blue-500/10 read-only:bg-slate-50" /></label>
          <label className="block text-xs font-bold text-slate-700">Recado (opcional)<input value={note} onChange={event => setNote(event.target.value)} placeholder="Ex.: lanche da cantina" className="mt-1.5 min-h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-[#123cc4] focus:ring-4 focus:ring-blue-500/10" /></label>
          {feedback && <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">{feedback}</p>}
          <button type="button" onClick={submitOperation} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#123cc4] px-4 text-sm font-extrabold text-white transition hover:bg-[#0d2fa9]"><Check size={17} />Confirmar</button>
        </div>
      </section>
    </div>}
  </main>;
};
