import { LayoutGrid, Kanban } from 'lucide-react';

export default function ViewToggle({ view, setView }) {
  return (
    <div className="inline-flex bg-slate-200 p-1 rounded-lg">
      <button
        onClick={() => setView('list')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition ${
          view === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <LayoutGrid size={16} /> List
      </button>
      <button
        onClick={() => setView('kanban')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition ${
          view === 'kanban' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <Kanban size={16} /> Kanban
      </button>
    </div>
  );
}