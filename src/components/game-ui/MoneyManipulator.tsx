import React, { useState } from 'react';
import { Smartphone, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MoneyNote } from './money/MoneyNote';
import { MoneyCoin } from './money/MoneyCoin';
import { PixSimulator } from './money/PixSimulator';
import { MoneyChallengeData } from '../../types';

interface MoneyManipulatorProps {
  data: MoneyChallengeData;
  onSuccess?: () => void;
}

interface CurrencyItem {
  value: number;
  type: 'bill' | 'coin';
  label: string;
  colorClass: string;
}

const CURRENCIES: CurrencyItem[] = [
  { value: 100, type: 'bill' },
  { value: 50, type: 'bill' },
  { value: 20, type: 'bill' },
  { value: 10, type: 'bill' },
  { value: 5, type: 'bill' },
  { value: 2, type: 'bill' },
  { value: 1, type: 'coin' },
  { value: 0.5, type: 'coin' },
  { value: 0.25, type: 'coin' },
  { value: 0.1, type: 'coin' },
  { value: 0.05, type: 'coin' },
];

export const MoneyManipulator: React.FC<MoneyManipulatorProps> = ({ data, onSuccess }) => {
  const [tableItems, setTableItems] = useState<CurrencyItem[]>([]);
  const [mode, setMode] = useState<'money' | 'pix'>('money');
  
  // Pix state
  const [pixInput, setPixInput] = useState('');
  const [pixSuccess, setPixSuccess] = useState(false);

  const currentTableTotal = tableItems.reduce((acc, curr) => acc + curr.value, 0);
  const isCorrect = Math.abs(currentTableTotal - data.targetAmount) < 0.01;

  const handleAddItem = (item: CurrencyItem) => {
    setTableItems([...tableItems, item]);
    
    // Check if new total is correct
    const newTotal = currentTableTotal + item.value;
    if (Math.abs(newTotal - data.targetAmount) < 0.01) {
      triggerConfetti();
      if (onSuccess) onSuccess();
    }
  };

  const handleClearTable = () => {
    setTableItems([]);
  };

  const triggerConfetti = () => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  const handleMistake = () => {
    // Optionally record mistake if passed as prop
  };

  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };



  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
      {/* Header Tabs */}
      <div className="flex border-b border-slate-200 bg-white">
        <button
          onClick={() => setMode('money')}
          className={`flex-1 py-3 text-sm font-bold font-fredoka flex items-center justify-center gap-2 transition-colors ${mode === 'money' ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
        >
          <div className="w-4 h-4 bg-emerald-500 rounded-sm" /> Dinheiro em Espécie
        </button>
        {data.allowPix && (
          <button
            onClick={() => setMode('pix')}
            className={`flex-1 py-3 text-sm font-bold font-fredoka flex items-center justify-center gap-2 transition-colors ${mode === 'pix' ? 'text-emerald-600 border-b-2 border-emerald-500 bg-emerald-50/50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            <Smartphone className="w-4 h-4" /> Transferência PIX
          </button>
        )}
      </div>

      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Description / Goal */}
        <div className="mb-4 text-center">
          <p className="text-sm font-medium text-slate-700">{data.description}</p>
          <p className="text-xl font-fredoka font-bold text-slate-900 mt-1">
            Valor a Pagar: <span className="text-emerald-600">{formatMoney(data.targetAmount)}</span>
          </p>
        </div>

        {mode === 'money' && (
          <div className="flex flex-col gap-4">
            {/* Wallet (Buttons to add) */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">Carteira</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-3">
                {CURRENCIES.filter(c => c.type === 'bill').map((c, idx) => (
                  <MoneyNote key={'bill-'+idx} value={c.value} onClick={() => handleAddItem(c)} />
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {CURRENCIES.filter(c => c.type === 'coin').map((c, idx) => (
                  <MoneyCoin key={'coin-'+idx} value={c.value} onClick={() => handleAddItem(c)} />
                ))}
              </div>
            </div>

            {/* Table / Result */}
            <div className={`p-4 rounded-xl min-h-[120px] flex flex-col border-2 transition-colors ${isCorrect ? 'bg-emerald-50 border-emerald-400' : 'bg-slate-100 border-slate-200'}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Na Mesa</p>
                <div className="flex gap-2">
                   {tableItems.length > 0 && (
                     <button onClick={handleClearTable} className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 font-medium transition-colors">
                       <RotateCcw className="w-3.5 h-3.5" /> Limpar
                     </button>
                   )}
                   <span className={`font-fredoka font-bold ${isCorrect ? 'text-emerald-600' : 'text-slate-700'}`}>
                     Total: {formatMoney(currentTableTotal)}
                   </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 items-center justify-center flex-1">
                {tableItems.map((item, idx) => (
                  item.type === 'bill' ? (
                    <div key={'table-'+idx} className="animate-in zoom-in duration-200">
                      <MoneyNote value={item.value} disabled />
                    </div>
                  ) : (
                    <div key={'table-'+idx} className="animate-in zoom-in duration-200">
                      <MoneyCoin value={item.value} disabled />
                    </div>
                  )
                ))}
                
                {tableItems.length === 0 && (
                  <p className="text-sm text-slate-400 italic">Clique nas notas da carteira para colocá-las aqui</p>
                )}
              </div>
              
              {isCorrect && (
                <div className="mt-3 text-center text-sm font-bold text-emerald-600 bg-emerald-100 py-1.5 rounded-lg animate-bounce">
                  ✨ Pagamento exato! Muito bem! ✨
                </div>
              )}
            </div>
          </div>
        )}

        {mode === 'pix' && (
          <div className="flex justify-center py-2 relative">
            <PixSimulator 
              targetAmount={data.targetAmount} 
              receiverName={data.pixKeyName || 'Loja de Itens'} 
              onSuccess={() => {
                setPixSuccess(true);
                if (onSuccess) onSuccess();
              }}
              onMistake={handleMistake}
            />
          </div>
        )}
      </div>
    </div>
  );
};
