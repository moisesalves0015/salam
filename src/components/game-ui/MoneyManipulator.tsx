import React, { useState } from 'react';
import { Smartphone, Send, KeySquare, Delete, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
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
  { value: 100, type: 'bill', label: '100', colorClass: 'bg-sky-400 text-sky-900 border-sky-500' },
  { value: 50, type: 'bill', label: '50', colorClass: 'bg-orange-400 text-orange-950 border-orange-500' },
  { value: 20, type: 'bill', label: '20', colorClass: 'bg-yellow-400 text-yellow-900 border-yellow-500' },
  { value: 10, type: 'bill', label: '10', colorClass: 'bg-red-500 text-red-950 border-red-600' },
  { value: 5, type: 'bill', label: '5', colorClass: 'bg-purple-600 text-purple-100 border-purple-700' },
  { value: 2, type: 'bill', label: '2', colorClass: 'bg-blue-800 text-blue-100 border-blue-900' },
  { value: 1, type: 'coin', label: '1', colorClass: 'bg-gradient-to-br from-yellow-300 to-yellow-500 text-yellow-900 border-yellow-600 ring-2 ring-yellow-400' },
  { value: 0.5, type: 'coin', label: '0,50', colorClass: 'bg-slate-300 text-slate-800 border-slate-400 ring-2 ring-slate-300' },
  { value: 0.25, type: 'coin', label: '0,25', colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-300 ring-2 ring-yellow-200' },
  { value: 0.1, type: 'coin', label: '0,10', colorClass: 'bg-yellow-100 text-yellow-800 border-yellow-300 ring-2 ring-yellow-200' },
  { value: 0.05, type: 'coin', label: '0,05', colorClass: 'bg-orange-200 text-orange-800 border-orange-300 ring-2 ring-orange-200' },
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

  const handlePixDigit = (digit: string) => {
    if (pixInput.length < 8) {
      setPixInput(prev => prev + digit);
    }
  };

  const handlePixDelete = () => {
    setPixInput(prev => prev.slice(0, -1));
  };

  const handlePixSubmit = () => {
    const inputNumber = parseInt(pixInput) / 100;
    if (Math.abs(inputNumber - data.targetAmount) < 0.01) {
      setPixSuccess(true);
      triggerConfetti();
      if (onSuccess) onSuccess();
    } else {
      // wrong animation/shake could be added
      alert('Valor incorreto!');
    }
  };

  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatPixDisplay = (valStr: string) => {
    const num = parseInt(valStr || '0') / 100;
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
                {CURRENCIES.filter(c => c.type === 'bill').map((c) => (
                  <button
                    key={'add-'+c.label}
                    onClick={() => handleAddItem(c)}
                    className={`w-16 h-8 sm:w-20 sm:h-10 rounded-md border-2 font-black text-xs sm:text-sm flex items-center justify-center shadow-sm active:scale-95 transition-transform ${c.colorClass}`}
                  >
                    R$ {c.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {CURRENCIES.filter(c => c.type === 'coin').map((c) => (
                  <button
                    key={'add-'+c.label}
                    onClick={() => handleAddItem(c)}
                    className={`w-10 h-10 rounded-full font-black text-xs flex items-center justify-center shadow-sm active:scale-95 transition-transform ${c.colorClass}`}
                  >
                    {c.value < 1 ? (c.value * 100) : '1'}
                  </button>
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
                    <div key={idx} className={`w-14 h-7 sm:w-16 sm:h-8 rounded-md border font-black text-[10px] sm:text-xs flex items-center justify-center shadow-sm animate-scaleIn ${item.colorClass}`}>
                      {item.label}
                    </div>
                  ) : (
                    <div key={idx} className={`w-8 h-8 rounded-full font-black text-[10px] flex items-center justify-center shadow-sm animate-scaleIn ${item.colorClass}`}>
                      {item.value < 1 ? (item.value * 100) : '1'}
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
          <div className="flex justify-center py-2">
            <div className="w-[280px] bg-slate-900 rounded-3xl p-3 shadow-xl relative overflow-hidden border-4 border-slate-800">
              {/* Fake Phone Status Bar */}
              <div className="flex justify-between items-center text-slate-400 text-[10px] font-medium px-2 mb-4">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-2 bg-slate-400 rounded-sm" />
                </div>
              </div>
              
              {pixSuccess ? (
                 <div className="bg-emerald-500 rounded-2xl h-[320px] flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
                    <CheckCircle2 className="w-16 h-16 text-white mb-3" />
                    <h3 className="text-white font-fredoka font-bold text-xl mb-1">PIX Enviado!</h3>
                    <p className="text-emerald-100 text-sm">{formatMoney(data.targetAmount)}</p>
                    <p className="text-emerald-100 text-xs mt-4">Para: {data.pixKeyName || 'Loja'}</p>
                 </div>
              ) : (
                <div className="bg-white rounded-2xl h-[320px] flex flex-col overflow-hidden">
                  <div className="bg-emerald-500 p-3 text-center text-white flex items-center justify-center gap-2">
                    <KeySquare className="w-4 h-4" />
                    <span className="text-xs font-bold font-fredoka tracking-wider">ÁREA PIX</span>
                  </div>
                  
                  <div className="flex-1 p-4 flex flex-col">
                    <p className="text-[10px] text-slate-500 font-bold text-center mb-1 uppercase tracking-wider">Qual valor transferir?</p>
                    <div className="flex-1 flex items-center justify-center">
                      <p className={`text-3xl font-black font-fredoka ${pixInput.length > 0 ? 'text-slate-800' : 'text-slate-300'}`}>
                        {formatPixDisplay(pixInput)}
                      </p>
                    </div>
                    
                    {/* Keypad */}
                    <div className="grid grid-cols-3 gap-1.5 mt-auto">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                        <button
                          key={num}
                          onClick={() => handlePixDigit(num.toString())}
                          className="py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-700 font-fredoka font-bold text-lg transition-colors"
                        >
                          {num}
                        </button>
                      ))}
                      <div />
                      <button
                        onClick={() => handlePixDigit('0')}
                        className="py-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-700 font-fredoka font-bold text-lg transition-colors"
                      >
                        0
                      </button>
                      <button
                        onClick={handlePixDelete}
                        className="py-2.5 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-500 hover:text-red-500 flex items-center justify-center transition-colors"
                      >
                        <Delete className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <button
                      onClick={handlePixSubmit}
                      disabled={pixInput.length === 0}
                      className="mt-3 w-full py-2.5 bg-emerald-500 disabled:bg-emerald-200 text-white font-fredoka font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      Transferir <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
