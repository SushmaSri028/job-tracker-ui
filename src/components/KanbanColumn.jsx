import { useDroppable } from '@dnd-kit/core';
import KanbanCard from './KanbanCard';

const COLUMN_ACCENTS = {
  APPLIED:   'bg-accent-500',
  SCREENING: 'bg-purple-500',
  INTERVIEW: 'bg-amber-500',
  OFFER:     'bg-emerald-500',
};

export default function KanbanColumn({ status, applications, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const accent = COLUMN_ACCENTS[status] || 'bg-ink-400';

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl p-3 min-h-[400px] flex flex-col bg-ink-50/60 dark:bg-ink-950/40 border transition-all ${
        isOver
          ? 'border-accent-400 bg-accent-50 dark:bg-accent-900/20 shadow-glow'
          : 'border-ink-100 dark:border-ink-800'
      }`}
    >
      <div className="flex items-center justify-between mb-3 px-1.5">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${accent}`} />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-ink-700 dark:text-ink-300">
            {status}
          </span>
        </div>
        <span className="text-xs text-ink-400 dark:text-ink-500 font-medium tabular-nums">
          {applications.length}
        </span>
      </div>

      <div className="space-y-2 flex-1">
        {applications.map((app) => (
          <KanbanCard key={app.id} application={app} onEdit={onEdit} onDelete={onDelete} />
        ))}

        {applications.length === 0 && (
          <div className="text-center py-10 text-xs text-ink-400 dark:text-ink-500 border border-dashed border-ink-200 dark:border-ink-800 rounded-xl">
            Drop a card here
          </div>
        )}
      </div>
    </div>
  );
}