import React, { useState } from 'react';
import { Smartphone, CheckCircle2, Send, Delete, Building, ArrowLeft, KeySquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PixSimulatorProps {
  targetAmount: number;
  receiverName?: string;
  onSuccess?: () => void;
  onMistake?: () => void;
}

type PixState = 'home' | 'input' | 'review' | 'success';

export const PixSimulator: React.FC<PixSimulatorProps> = ({ 
  targetAmount, 
  receiverName = 'Loja de Itens', 
  onSuccess,
  onMistake
}) => {
  const [currentState, setCurrentState] = useState<PixState>('home');
  const [pixInput, setPixInput] = useState('');

  const formatMoney = (val: number) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  
  const formatPixDisplay = (valStr: string) => {
    const num = parseInt(valStr || '0') / 100;
    return formatMoney(num);
  };

  const handlePixDigit = (digit: string) => {
    if (pixInput.length < 8) setPixInput(prev => prev + digit);
  };

  const handlePixDelete = () => setPixInput(prev => prev.slice(0, -1));

  const handleContinueToReview = () => {
    if (pixInput.length > 0) setCurrentState('review');
  };

  const handleConfirm = () => {
    const inputNumber = parseInt(pixInput) / 100;
    if (Math.abs(inputNumber - targetAmount) < 0.01) {
      setCurrentState('success');
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      if (onSuccess) onSuccess();
    } else {
      if (onMistake) onMistake();
      alert(`Valor incorreto! O total a pagar é ${formatMoney(targetAmount)}.`);
    }
  };

  return (
    <div className="flex justify-center w-full py-2">
      <div className="w-[300px] h-[480px] bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl relative overflow-hidden border-8 border-slate-800 flex flex-col">
        {/* Fake Phone Status Bar */}
        <div className="flex justify-between items-center text-slate-400 text-[10px] font-medium px-4 mb-2 shrink-0">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-2 bg-slate-400 rounded-sm" />
          </div>
        </div>

        {/* Screen Container */}
        <div className="flex-1 bg-slate-50 rounded-3xl overflow-hidden flex flex-col relative">
          
          {currentState === 'home' && (
            <div className="flex-1 flex flex-col">
              <div className="bg-emerald-600 p-6 pb-8 rounded-b-3xl shadow-sm text-white relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Building className="w-5 h-5 text-white" />
                </div>
                <p className="text-emerald-100 text-sm">Olá, Aluno!</p>
                <h3 className="font-bold text-xl mb-1">Área Pix</h3>
              </div>
              
              <div className="p-4 -mt-4 relative z-10 flex-1">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-4">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">A pagar para</p>
                  <p className="font-bold text-slate-800 text-lg">{receiverName}</p>
                  <p className="font-black text-2xl text-emerald-600 mt-2">{formatMoney(targetAmount)}</p>
                </div>

                <button
                  onClick={() => setCurrentState('input')}
                  className="w-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 p-4 rounded-2xl flex items-center gap-3 transition-colors active:scale-95 shadow-sm"
                >
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <KeySquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold">Fazer um Pix</p>
                    <p className="text-xs text-emerald-600/80">Pagar agora</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {currentState === 'input' && (
            <div className="flex-1 flex flex-col">
              <div className="p-4 flex items-center gap-3 border-b border-slate-200">
                <button onClick={() => setCurrentState('home')} className="p-2 hover:bg-slate-100 rounded-full active:scale-95 text-slate-600">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <p className="font-bold text-slate-800">Qual valor?</p>
              </div>
              
              <div className="flex-1 flex flex-col p-4">
                <div className="flex-1 flex items-center justify-center">
                  <p className={`text-4xl font-black font-fredoka ${pixInput.length > 0 ? 'text-slate-800' : 'text-slate-300'}`}>
                    {formatPixDisplay(pixInput)}
                  </p>
                </div>
                
                {/* Keypad */}
                <div className="grid grid-cols-3 gap-2 mt-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button
                      key={num}
                      onClick={() => handlePixDigit(num.toString())}
                      className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold text-xl transition-colors"
                    >
                      {num}
                    </button>
                  ))}
                  <div />
                  <button
                    onClick={() => handlePixDigit('0')}
                    className="py-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-bold text-xl transition-colors"
                  >
                    0
                  </button>
                  <button
                    onClick={handlePixDelete}
                    className="py-3 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 flex items-center justify-center transition-colors"
                  >
                    <Delete className="w-6 h-6" />
                  </button>
                </div>
                
                <button
                  onClick={handleContinueToReview}
                  disabled={pixInput.length === 0}
                  className="mt-4 w-full py-3.5 bg-emerald-500 disabled:bg-emerald-200 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all"
                >
                  Continuar <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {currentState === 'review' && (
            <div className="flex-1 flex flex-col">
              <div className="p-4 flex items-center gap-3 border-b border-slate-200">
                <button onClick={() => setCurrentState('input')} className="p-2 hover:bg-slate-100 rounded-full active:scale-95 text-slate-600">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <p className="font-bold text-slate-800">Revisão</p>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <p className="text-sm text-slate-500 text-center mb-1">Valor a transferir</p>
                <p className="text-3xl font-black text-slate-800 text-center mb-6">{formatPixDisplay(pixInput)}</p>

                <div className="bg-slate-100 rounded-2xl p-4 mb-4">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">Para</p>
                  <p className="font-bold text-slate-800">{receiverName}</p>
                  <p className="text-xs text-slate-500">Chave: CNPJ simulado</p>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-xl mb-4 text-center">
                  <strong>Atenção:</strong> Isso é apenas uma simulação educativa! Nenhum valor real será cobrado.
                </div>

                <div className="mt-auto">
                  <button
                    onClick={handleConfirm}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-md active:scale-95 transition-all"
                  >
                    Confirmar Pix Simulado
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentState === 'success' && (
            <div className="flex-1 bg-emerald-500 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              </div>
              <h3 className="text-white font-black text-2xl mb-2">PIX Enviado!</h3>
              <p className="text-emerald-100 text-lg mb-6">{formatPixDisplay(pixInput)}</p>
              
              <div className="bg-emerald-600/50 p-4 rounded-xl w-full border border-emerald-400/30">
                <p className="text-emerald-100 text-sm mb-1">Recebedor:</p>
                <p className="text-white font-bold">{receiverName}</p>
                <p className="text-emerald-200 text-xs mt-3">Comprovante Fictício - Sala de Missões</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
