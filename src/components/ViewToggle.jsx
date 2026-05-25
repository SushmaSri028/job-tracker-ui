import { LayoutGrid, Kanban } from 'lucide-react';

export default function ViewToggle({ view, setView }) {
  return (
    <div className="inline-flex bg-ink-100 dark:bg-ink-900 p-0.5 rounded-xl">
      <button
        onClick={() => setView('list')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          view === 'list'
            ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-ring'
            : 'text-ink-500 dark:text-ink-400'
        }`}
      >
        <LayoutGrid size={14} /> List
      </button>
      <button
        onClick={() => setView('kanban')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
          view === 'kanban'
            ? 'bg-white dark:bg-ink-800 text-ink-900 dark:text-white shadow-ring'
            : 'text-ink-500 dark:text-ink-400'
        }`}
      >
        <Kanban size={14} /> Kanban
      </button>
    </div>
  );
}