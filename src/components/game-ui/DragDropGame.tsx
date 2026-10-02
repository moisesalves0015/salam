import React, { useState } from 'react';
import { DragAndDropMatch } from '../../types';
import { DndContext, useDraggable, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DraggableItemProps {
  item: any;
  isMatched: boolean;
}

const DraggableItem = ({ item, isMatched }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    disabled: isMatched
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 50 : 1
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`p-3 bg-white text-slate-900 rounded-lg shadow cursor-grab active:cursor-grabbing font-bold text-center border-2 border-slate-200 transition-opacity ${isMatched ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:border-indigo-500'}`}
    >
      {item.content}
    </div>
  );
};

const DroppableCategory = ({ category, matchedItems }: { category: any; matchedItems: any[] }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: category.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-xl border-4 min-h-[120px] flex flex-col gap-2 transition-colors ${
        isOver ? 'border-indigo-500 bg-indigo-500/20' : 'border-slate-600 bg-slate-800'
      }`}
    >
      <h3 className="text-sm font-black text-center text-white/80 uppercase tracking-widest">{category.title}</h3>
      <div className="flex-1 flex flex-wrap gap-2 content-start justify-center">
        {matchedItems.map(item => (
          <div key={item.id} className="p-2 bg-indigo-500 text-white rounded-lg font-bold text-sm shadow animate-in zoom-in duration-300">
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export const DragDropGame = ({ data, onComplete }: { data: DragAndDropMatch; onComplete?: () => void }) => {
  const [matched, setMatched] = useState<Record<string, string>>({}); // itemId -> categoryId
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active) {
      const itemId = active.id as string;
      const categoryId = over.id as string;
      
      // Verifica se o mapeamento correto foi feito
      if (data.correctMapping[itemId] === categoryId) {
        setMatched(prev => {
          const next = { ...prev, [itemId]: categoryId };
          if (Object.keys(next).length === data.items.length) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            if (onComplete) {
              setTimeout(onComplete, 2000);
            }
          }
          return next;
        });
      }
    }
  };

  const unmatchedItems = data.items.filter(item => !matched[item.id]);

  return (
    <div className="bg-slate-900/50 p-6 rounded-3xl border border-white/10 my-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-black text-white">{data.title}</h3>
        <p className="text-indigo-200 mt-2">{data.instruction}</p>
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {data.categories.map(cat => (
            <DroppableCategory 
              key={cat.id} 
              category={cat} 
              matchedItems={data.items.filter(item => matched[item.id] === cat.id)}
            />
          ))}
        </div>
        
        {unmatchedItems.length > 0 ? (
          <div className="bg-slate-800 p-4 rounded-xl flex flex-wrap gap-3 justify-center border border-white/5">
            {unmatchedItems.map(item => (
              <DraggableItem key={item.id} item={item} isMatched={false} />
            ))}
          </div>
        ) : (
          <div className="p-4 bg-green-500/20 text-green-300 rounded-xl flex items-center justify-center gap-2 border border-green-500/50 animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle className="w-6 h-6" />
            <strong className="text-lg">{data.successMessage}</strong>
          </div>
        )}
      </DndContext>
    </div>
  );
};
