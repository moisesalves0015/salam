import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowUpRight,
  Banknote,
  ChevronRight,
  CircleHelp,
  CreditCard,
  Eye,
  EyeOff,
  Link2,
  QrCode,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wallet,
  X,
} from 'lucide-react';

type Tx = {
  id: string;
  title: string;
  detail: string;
  amount: number;
  direction: 'in' | 'out';
  time: string;
  kind: string;
};
type Operation = 'pagar' | 'transferir';
type NfcIntent = { action: Operation; recipient: string; amount?: number };

const INITIAL_TX: Tx[] = [
  { id: 'demo-1', title: 'Missão concluída', detail: 'Recompensa de aprendizagem', amount: 12, direction: 'in', time: 'Hoje · 09:24', kind: 'Conquista' },
  { id: 'demo-2', title: 'Cantina da escola', detail: 'Lanche simulado', amount: 8, direction: 'out', time: 'Ontem · 12:05', kind: 'Pagamento' },
  { id: 'demo-3', title: 'Transferência recebida', detail: 'De Bia S.', amount: 5, direction: 'in', time: 'Ontem · 10:41', kind: 'Entre colegas' },
  { id: 'demo-4', title: 'Papelaria da turma', detail: 'Material escolar simulado', amount: 6, direction: 'out', time: 'Segunda · 14:10', kind: 'Pagamento' },
];

function makeIntentUrl(action: Operation, recipient: string, amount?: number) {
  const params = new URLSearchParams({ para: recipient, modo: 'demo' });
  if (amount !== undefined) params.set('valor', String(amount));
  return `${window.location.origin}/banco/nfc/${action}?${params.toString()}`;
}

export const BancoView: React.FC<{
  studentName: string;
  nfcRoute?: boolean;
  onExitNfc?: () => void;
}> = ({ studentName, nfcRoute = false, onExitNfc }) => {
  const [balance, setBalance] = useState(42);
  const [transactions, setTransactions] = useState<Tx[]>(INITIAL_TX);
  const [hideBalance, setHideBalance] = useState(false);
  const [activeTab, setActiveTab] = useState<'inicio' | 'extrato' | 'receber'>('inicio');
  const [modal, setModal] = useState<Operation | null>(null);
  const [recipient, setRecipient] = useState('');
  const [amountText, setAmountText] = useState('');
  const [note, setNote] = useState('');
  const [linkKind, setLinkKind] = useState<Operation>('pagar');
  const [copyLabel, setCopyLabel] = useState('Copiar link NFC');
  const [feedback, setFeedback] = useState('');

  const nfcIntent = useMemo<NfcIntent | null>(() => {
    if (!nfcRoute) return null;
    const action: Operation = window.location.pathname.endsWith('/transferir') ? 'transferir' : 'pagar';
    const params = new URLSearchParams(window.location.search);
    const recipientFromLink = params.get('para')?.slice(0, 50) ?? '';
    const rawAmount = params.get('valor');
    const amount = rawAmount === null ? undefined : Number(rawAmount);
    const invalidAmount = rawAmount !== null && (!Number.isInteger(amount) || amount! <= 0 || amount! > 500);
    if (params.get('modo') !== 'demo' || !recipientFromLink || invalidAmount || (action === 'pagar' && amount === undefined)) return null;
    return { action, recipient: recipientFromLink, amount };
  }, [nfcRoute]);

  useEffect(() => {
    if (!nfcRoute) return;
    setActiveTab('inicio');
    if (!nfcIntent) {
      setFeedback('Este link NFC é apenas demonstrativo ou está incompleto. Nenhum pagamento foi iniciado.');
      return;
    }
    setRecipient(nfcIntent.recipient);
    setAmountText(nfcIntent.amount === undefined ? '' : String(nfcIntent.amount));
    setModal(nfcIntent.action);
  }, [nfcRoute, nfcIntent]);

  const exitNfc = () => {
    if (nfcRoute) onExitNfc?.();
  };

  const submit = () => {
    const amount = Number(amountText);
    if (!recipient.trim() || !Number.isInteger(amount) || amount <= 0 || amount > balance) {
      setFeedback('Confira o nome e o valor. Use moedas inteiras, até o saldo demonstrativo.');
      return;
    }
    const isTransfer = modal === 'transferir';
    const tx: Tx = {
      id: `demo-${Date.now()}`,
      title: isTransfer ? `Transferência para ${recipient}` : `Pagamento para ${recipient}`,
      detail: note.trim() || (isTransfer ? 'Transferência simulada entre colegas' : 'Pagamento simulado'),
      amount,
      direction: 'out',
      time: 'Agora',
      kind: isTransfer ? 'Entre colegas' : 'Pix / NFC (demo)',
    };
    setBalance(current => current - amount);
    setTransactions(current => [tx, ...current]);
    setFeedback(`${isTransfer ? 'Transferência' : 'Pagamento'} de ${amount} moedas simulada. Nenhum valor real foi movimentado.`);
    setModal(null);
    setAmountText('');
    setNote('');
    exitNfc();
  };

  const openOperation = (action: Operation) => {
    setFeedback('');
    setRecipient('');
    setAmountText('');
    setNote('');
    setModal(action);
  };

  const createLink = async () => {
    const amount = Number(amountText);
    if (linkKind === 'pagar' && (!Number.isInteger(amount) || amount <= 0 || amount > 500)) {
      setFeedback('Informe um valor inteiro entre 1 e 500 moedas para gerar o link demonstrativo.');
      return;
    }
    const url = makeIntentUrl(linkKind, studentName || 'Estudante', linkKind === 'pagar' ? amount : undefined);
    if (!navigator.clipboard?.writeText) {
      setFeedback(`Copie este link demonstrativo: ${url}`);
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopyLabel('Link copiado');
      window.setTimeout(() => setCopyLabel('Copiar link NFC'), 2200);
      setFeedback(`Link de ${linkKind === 'pagar' ? 'cobrança' : 'transferência'} copiado. Este endereço é somente para a demonstração.`);
    } catch {
      setFeedback(`Copie este link demonstrativo: ${url}`);
    }
  };

  return <div className="mx-auto w-full max-w-6xl space-y-6 pb-12 text-slate-800">
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[10px] font-black uppercase tracking-[.16em] text-indigo-800"><Sparkles size={14}/> Banco da Sala</div>
        <h1 className="font-[Outfit] text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Seu banco de moedas</h1>
        <p className="mt-2 text-sm text-slate-500">Uma carteira de brincadeira para aprender a cuidar, compartilhar e planejar.</p>
      </div>
      <div className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-extrabold text-amber-900"><CircleHelp size={16}/> Simulação — sem dinheiro real</div>
    </header>

    <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#123cc4] via-[#0e2fb2] to-[#00067a] p-6 text-white shadow-xl shadow-blue-950/15 sm:p-8">
      <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border-[36px] border-white/5"/><div className="pointer-events-none absolute bottom-[-120px] right-36 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl"/>
      <div className="relative flex flex-wrap items-start justify-between gap-5">
        <div><p className="text-xs font-bold uppercase tracking-[.18em] text-blue-100/80">Carteira demonstrativa de</p><h2 className="mt-1 text-2xl font-black">{studentName || 'Estudante'}</h2></div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/10"><Wallet size={24}/></div>
      </div>
      <div className="relative mt-7 flex items-end gap-3"><div><p className="text-xs font-semibold text-blue-100/80">Saldo disponível</p><div className="mt-1 flex items-center gap-3"><span className="text-4xl font-black tracking-tight tabular-nums sm:text-5xl">{hideBalance ? '••••' : `${balance.toLocaleString('pt-BR')} moedas`}</span><button type="button" onClick={()=>setHideBalance(v=>!v)} aria-label={hideBalance?'Mostrar saldo':'Ocultar saldo'} className="rounded-lg p-2 text-blue-100 hover:bg-white/10">{hideBalance?<Eye size={18}/>:<EyeOff size={18}/>}</button></div></div></div>
      <div className="relative mt-7 flex flex-wrap gap-2">
        <button onClick={()=>openOperation('transferir')} className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-black text-[#071c82] transition hover:-translate-y-0.5 hover:bg-blue-50"><ArrowLeftRight size={17}/> Transferir</button>
        <button onClick={()=>openOperation('pagar')} className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/20"><CreditCard size={17}/> Pix / pagar (demo)</button>
        <button onClick={()=>setActiveTab('receber')} className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/20"><ArrowDownLeft size={17}/> Receber moedas</button>
      </div>
    </section>

    <div className="flex gap-2 border-b border-slate-200">
      <Tab label="Visão geral" active={activeTab==='inicio'} onClick={()=>setActiveTab('inicio')}/><Tab label="Extrato" active={activeTab==='extrato'} onClick={()=>setActiveTab('extrato')}/><Tab label="Link NFC" active={activeTab==='receber'} onClick={()=>setActiveTab('receber')}/>
    </div>

    {feedback && <div role="status" className="flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm font-semibold text-blue-900"><ShieldCheck size={18} className="mt-0.5 shrink-0"/><span className="break-all">{feedback}</span><button onClick={()=>setFeedback('')} className="ml-auto" aria-label="Fechar aviso"><X size={16}/></button></div>}

    {activeTab==='inicio' && <div className="grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><div><h3 className="text-lg font-black text-slate-900">Atividade recente</h3><p className="text-xs text-slate-500">Movimentações fictícias desta demonstração</p></div><button onClick={()=>setActiveTab('extrato')} className="inline-flex items-center gap-1 text-xs font-bold text-[#123cc4]">Ver extrato <ChevronRight size={15}/></button></div><TxList transactions={transactions.slice(0,4)}/></section>
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h3 className="text-lg font-black text-slate-900">Aprenda sobre dinheiro</h3><p className="mt-1 text-xs text-slate-500">Dicas para praticar com moedas virtuais.</p><div className="mt-4 space-y-3">{[['Guarde um pouco','Pensar antes de gastar ajuda a alcançar objetivos.'],['Confira o valor','Antes de pagar, confira para quem e quanto está enviando.'],['Peça ajuda','Na vida real, pagamentos devem ser acompanhados por um adulto responsável.']].map(([title,body])=><div key={title} className="rounded-xl bg-slate-50 p-3"><strong className="text-sm text-slate-800">{title}</strong><p className="mb-0 mt-1 text-xs leading-relaxed text-slate-500">{body}</p></div>)}</div></section>
    </div>}

    {activeTab==='extrato' && <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-4"><h3 className="text-lg font-black text-slate-900">Extrato de demonstração</h3><p className="text-xs text-slate-500">Entradas e saídas simuladas na tela atual.</p></div><TxList transactions={transactions}/></section>}

    {activeTab==='receber' && <section className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_.8fr]">
      <div>
        <div className="mb-2 grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-[#123cc4]"><QrCode size={22}/></div>
        <h3 className="text-xl font-black text-slate-900">Criar link para etiqueta NFC</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">Gere um link de cobrança com valor fixo ou um link de transferência para você, onde quem aproximar escolhe o valor.</p>
        <label className="mt-5 block max-w-xs text-xs font-bold text-slate-700">Ação do link<select value={linkKind} onChange={e=>setLinkKind(e.target.value as Operation)} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#123cc4]"><option value="pagar">Cobrar um valor fixo</option><option value="transferir">Receber transferência (pagador escolhe valor)</option></select></label>
        {linkKind==='pagar' && <label className="mt-4 block max-w-xs text-xs font-bold text-slate-700">Valor em moedas<input type="number" min="1" max="500" step="1" value={amountText} onChange={e=>setAmountText(e.target.value)} placeholder="Ex.: 5" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-3 text-base outline-none focus:border-[#123cc4] focus:ring-2 focus:ring-blue-100"/></label>}
        <button onClick={()=>void createLink()} className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#123cc4] px-4 py-3 text-sm font-bold text-white hover:bg-[#0e2fb2]"><Link2 size={17}/>{copyLabel}</button>
      </div>
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-5"><div className="flex items-center gap-2 font-bold text-[#05148d]"><Smartphone size={19}/> Como funciona na demonstração</div><ol className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700"><li><b>1.</b> Copie o link e associe-o a uma etiqueta NFC.</li><li><b>2.</b> A aproximação abre `/banco/nfc/pagar` ou `/banco/nfc/transferir`.</li><li><b>3.</b> A pessoa confere o destinatário e o valor antes de confirmar.</li></ol><p className="mb-0 mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-900">Este link é um exemplo de interface. Para uso real, ele deverá carregar uma intenção validada no servidor, sem confiar em nome/valor enviado pela URL.</p></div>
    </section>}

    {modal && <div className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm"><section role="dialog" aria-modal="true" aria-labelledby="bank-operation-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
      <div className="flex items-start justify-between gap-3"><div><div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#123cc4]">{modal==='transferir'?<ArrowLeftRight/>:<Banknote/>}</div><h3 id="bank-operation-title" className="text-xl font-black text-slate-900">{nfcRoute?'Confira antes de continuar':modal==='transferir'?'Transferir moedas':'Pix / pagamento simulado'}</h3><p className="mt-1 text-sm text-slate-500">Operação somente demonstrativa.</p></div><button onClick={()=>{setModal(null);exitNfc();}} aria-label="Fechar" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={18}/></button></div>
      <label className="mt-5 block text-xs font-bold text-slate-700">{modal==='transferir'?'Enviar para':'Pagar para'}<input autoFocus value={recipient} onChange={e=>setRecipient(e.target.value)} readOnly={Boolean(nfcIntent)} placeholder="Nome do colega ou estabelecimento" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#123cc4] read-only:bg-slate-50"/></label>
      <label className="mt-4 block text-xs font-bold text-slate-700">Valor em moedas<input type="number" min="1" step="1" value={amountText} onChange={e=>setAmountText(e.target.value)} readOnly={nfcIntent?.amount !== undefined} className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-3 text-lg font-bold outline-none focus:border-[#123cc4] read-only:bg-slate-50"/></label>
      <label className="mt-4 block text-xs font-bold text-slate-700">Mensagem (opcional)<input value={note} onChange={e=>setNote(e.target.value)} placeholder="O que está pagando?" className="mt-1.5 w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none focus:border-[#123cc4]"/></label>
      <div className="mt-4 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">Você está na demonstração: não use como pagamento real nem informe dados bancários ou senha.</div>
      <div className="mt-5 flex gap-2"><button onClick={()=>{setModal(null);exitNfc();}} className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700">Cancelar</button><button onClick={submit} className="flex-1 rounded-xl bg-[#123cc4] px-4 py-3 text-sm font-bold text-white hover:bg-[#0e2fb2]">Confirmar simulação</button></div>
    </section></div>}
  </div>;
};

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={`border-b-2 px-4 py-3 text-sm font-bold ${active ? 'border-[#123cc4] text-[#123cc4]' : 'border-transparent text-slate-500'}`}>{label}</button>;
}

function TxList({ transactions }: { transactions: Tx[] }) {
  if (!transactions.length) return <p className="py-8 text-center text-sm text-slate-500">Nenhuma movimentação nesta demonstração.</p>;
  return <div className="divide-y divide-slate-100">{transactions.map(tx => <div key={tx.id} className="flex items-center gap-3 py-3"><div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tx.direction==='in'?'bg-emerald-50 text-emerald-700':'bg-slate-100 text-slate-600'}`}>{tx.direction==='in'?<ArrowDownLeft size={18}/>:<ArrowUpRight size={18}/>}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-slate-900">{tx.title}</p><p className="truncate text-xs text-slate-500">{tx.detail} · {tx.time}</p></div><div className="text-right"><p className={`text-sm font-black tabular-nums ${tx.direction==='in'?'text-emerald-700':'text-slate-800'}`}>{tx.direction==='in'?'+':'−'}{tx.amount} moedas</p><span className="text-[10px] font-semibold text-slate-400">{tx.kind} · demo</span></div></div>)}</div>;
}
