import React, { useEffect, useRef, useState } from 'react';
import { DragAndDropMatch } from '../../types';
import {
  DndContext, useDraggable, useDroppable, DragEndEvent, DragStartEvent,
  PointerSensor, KeyboardSensor, useSensor, useSensors,
} from '@dnd-kit/core';
import { CheckCircle2, GripVertical, Hand, Lightbulb, PartyPopper, Inbox } from 'lucide-react';
import confetti from 'canvas-confetti';
import { prefersReducedMotion } from '../../theme/lessonTheme';

type Item = DragAndDropMatch['items'][number];
type Category = DragAndDropMatch['categories'][number];

/** Cores distintas por categoria (borda, fundo, título e peça encaixada). */
const CATEGORY_TONES = [
  { idle: 'border-sky-400/60 bg-[#0f2340]', over: 'border-sky-300 bg-[#15325a] shadow-[0_0_24px_rgba(56,189,248,0.45)]', title: 'bg-sky-500 text-white', chip: 'bg-sky-400 text-sky-950 border-sky-200' },
  { idle: 'border-violet-400/60 bg-[#23174a]', over: 'border-violet-300 bg-[#2f2063] shadow-[0_0_24px_rgba(167,139,250,0.45)]', title: 'bg-violet-500 text-white', chip: 'bg-violet-400 text-violet-950 border-violet-200' },
  { idle: 'border-amber-400/60 bg-[#2a2010]', over: 'border-amber-300 bg-[#3a2c12] shadow-[0_0_24px_rgba(251,191,36,0.45)]', title: 'bg-amber-500 text-amber-950', chip: 'bg-amber-300 text-amber-950 border-amber-100' },
  { idle: 'border-teal-400/60 bg-[#0f2a33]', over: 'border-teal-300 bg-[#143a46] shadow-[0_0_24px_rgba(45,212,191,0.45)]', title: 'bg-teal-500 text-white', chip: 'bg-teal-300 text-teal-950 border-teal-100' },
];

const DraggableItem = ({ item }: { item: Item }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: item.id });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0) ${isDragging ? 'scale(1.06) rotate(-2deg)' : ''}` : undefined,
    zIndex: isDragging ? 50 : 1,
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      aria-label={`Peça ${item.content}. Arraste até a categoria correta.`}
      className={`trail-focus relative select-none min-h-[48px] pl-2 pr-4 py-2.5 rounded-xl font-black text-base flex items-center gap-1.5 cursor-grab active:cursor-grabbing transition-shadow border-2 border-b-4 ${
        isDragging
          ? 'bg-white text-slate-900 border-sky-400 shadow-2xl shadow-sky-500/40 ring-4 ring-sky-300/50'
          : 'bg-gradient-to-b from-white to-slate-200 text-slate-900 border-slate-300 border-b-slate-400 shadow-lg shadow-black/40 hover:border-sky-300'
      }`}
    >
      <GripVertical className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
      {item.content}
    </div>
  );
};

const DroppableCategory = ({ category, matchedItems, toneIndex, isDragging }: {
  category: Category; matchedItems: Item[]; toneIndex: number; isDragging: boolean;
}) => {
  const { isOver, setNodeRef } = useDroppable({ id: category.id });
  const tone = CATEGORY_TONES[toneIndex % CATEGORY_TONES.length];

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl border-2 min-h-[132px] flex flex-col overflow-hidden transition-all duration-150 ${
        isOver ? tone.over : `${tone.idle} ${isDragging ? 'border-dashed' : ''}`
      }`}
    >
      <h4 className={`px-3 py-2 text-xs sm:text-sm font-black text-center uppercase tracking-widest ${tone.title}`}>
        {category.title}
      </h4>
      <div className="flex-1 p-3 flex flex-wrap gap-2 content-start justify-center">
        {matchedItems.length === 0 && (
          <span className={`self-center flex items-center gap-1.5 text-xs font-bold ${isOver ? 'text-white' : 'text-slate-400'}`}>
            <Inbox className="w-4 h-4" aria-hidden="true" /> {isOver ? 'Solte aqui!' : 'Arraste as peças para cá'}
          </span>
        )}
        {matchedItems.map(item => (
          <div key={item.id} className={`px-3 py-1.5 rounded-lg font-black text-sm border-2 shadow flex items-center gap-1 lesson-pop ${tone.chip}`}>
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export const DragDropGame = ({ data, onComplete }: { data: DragAndDropMatch; onComplete?: () => void }) => {
  const [matched, setMatched] = useState<Record<string, string>>({}); // itemId -> categoryId
  const [activeId, setActiveId] = useState<string | null>(null);
  const [miss, setMiss] = useState<{ item: string; category: string } | null>(null);
  const completedRef = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  );

  const total = data.items.length;
  const matchedCount = Object.keys(matched).length;
  const isDone = matchedCount === total;

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!isDone || completedRef.current) return;
    if (!prefersReducedMotion()) {
      try { confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } }); } catch { /* ignore */ }
    }
    const t = setTimeout(() => {
      completedRef.current = true;
      onCompleteRef.current?.();
    }, 600);
    return () => clearTimeout(t);
  }, [isDone]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setMiss(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || !active) return;
    const itemId = active.id as string;
    const categoryId = over.id as string;
    if (data.correctMapping[itemId] === categoryId) {
      setMatched(prev => ({ ...prev, [itemId]: categoryId }));
      setMiss(null);
    } else {
      const item = data.items.find(i => i.id === itemId)?.content ?? '';
      const category = data.categories.find(c => c.id === categoryId)?.title ?? '';
      setMiss({ item, category });
    }
  };

  const unmatchedItems = data.items.filter(item => !matched[item.id]);

  return (
    <div className="rounded-2xl border-2 border-fuchsia-500/60 bg-[#0e1733] overflow-hidden shadow-xl shadow-black/40">
      <div className="h-1.5 bg-gradient-to-r from-fuchsia-300 via-fuchsia-500 to-violet-500" aria-hidden="true" />
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-fuchsia-400 to-purple-700 border border-white/30 flex items-center justify-center shadow-lg">
              <Hand className="w-5 h-5 text-white" aria-hidden="true" />
            </span>
            <h3 className="text-base sm:text-lg font-black text-white leading-tight">{data.title}</h3>
          </div>
          <span className="shrink-0 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-600 text-xs font-black text-slate-100" aria-live="polite">
            {matchedCount}/{total}
          </span>
        </div>

        <p className="mb-4 rounded-xl border border-fuchsia-400/50 bg-fuchsia-500/15 px-3 py-2 text-sm font-semibold text-fuchsia-50">
          {data.instruction}
        </p>

        <div className="h-2 rounded-full bg-slate-900 border border-slate-700 overflow-hidden mb-4" aria-hidden="true">
          <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-400 transition-[width] duration-500" style={{ width: `${(matchedCount / total) * 100}%` }} />
        </div>

        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragCancel={() => setActiveId(null)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {data.categories.map((cat, i) => (
              <DroppableCategory
                key={cat.id}
                category={cat}
                toneIndex={i}
                isDragging={activeId !== null}
                matchedItems={data.items.filter(item => matched[item.id] === cat.id)}
              />
            ))}
          </div>

          {miss && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl bg-[#2a1f0c] border-2 border-amber-400/70 px-3 py-2.5 lesson-card-in" role="status" aria-live="polite">
              <Lightbulb className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-amber-50">
                <strong className="text-amber-200">Quase!</strong> “{miss.item}” não combina com “{miss.category}”. Observe de novo e tente outra categoria.
              </p>
            </div>
          )}

          {unmatchedItems.length > 0 ? (
            <div className="rounded-xl bg-[#0a1230] border-2 border-dashed border-slate-600 p-3 sm:p-4">
              <span className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 text-center">Peças para encaixar</span>
              <div className="flex flex-wrap gap-2.5 justify-center">
                {unmatchedItems.map(item => <DraggableItem key={item.id} item={item} />)}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#0d2a22] border-2 border-emerald-400/80 text-emerald-50 flex items-center justify-center gap-3 lesson-card-in" role="status">
              <span className="w-10 h-10 rounded-xl bg-emerald-400 text-emerald-950 flex items-center justify-center lesson-pop">
                <PartyPopper className="w-5 h-5" aria-hidden="true" />
              </span>
              <strong className="text-base sm:text-lg">{data.successMessage}</strong>
            </div>
          )}
        </DndContext>
      </div>
    </div>
  );
};
