import React from 'react';
import { X, BookOpen, Printer, Shapes } from 'lucide-react';

export interface Resource {
  id: string;
  title: string;
  category: string;
  desc: string;
}

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources?: Resource[];
  isLoading?: boolean;
  error?: string;
}

export const ResourcesModal: React.FC<ResourcesModalProps> = ({
  isOpen,
  onClose,
  resources,
  isLoading = false,
  error
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        <div className="bg-cyan-50/80 px-6 py-4 border-b border-cyan-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-800 uppercase tracking-wider">Biblioteca Pedagógica</div>
              <h3 className="text-base font-black text-slate-900">Recursos e Materiais Concretos Recomendados</h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl bg-white border border-cyan-200 text-slate-500 hover:text-slate-900 cursor-pointer shadow-xs">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-3.5 flex-1">
          {isLoading ? (
            <p className="py-8 text-center text-sm text-slate-500">Carregando recursos...</p>
          ) : error ? (
            <p role="alert" className="py-8 text-center text-sm text-red-700">Não foi possível carregar os recursos. {error}</p>
          ) : !resources?.length ? (
            <p className="py-8 text-center text-sm text-slate-500">Nenhum recurso disponível no momento.</p>
          ) : resources.map((res) => (
            <div key={res.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                  <Shapes className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase text-purple-800">{res.category}</div>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">{res.title}</h4>
                  <p className="text-xs text-slate-600 mt-1">{res.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => window.print()}
                  className="p-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 cursor-pointer shadow-xs"
                  title="Imprimir"
                >
                  <Printer className="w-4 h-4 text-cyan-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer shadow-xs"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
