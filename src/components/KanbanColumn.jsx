import { useDroppable } from '@dnd-kit/core';
import KanbanCard from './KanbanCard';
import { STATUS_COLORS } from '../constants/status';

export default function KanbanColumn({ status, applications, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({ id: status });

  const headerColor = STATUS_COLORS[status] || 'bg-slate-100 text-slate-700';

  return (
    <div
      ref={setNodeRef}
      className={`bg-slate-100 rounded-xl p-3 min-h-[400px] flex flex-col transition ${
        isOver ? 'ring-2 ring-blue-400 bg-blue-50' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3 px-1">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${headerColor}`}>
          {status}
        </span>
        <span className="text-xs text-slate-500 font-medium">{applications.length}</span>
      </div>

      <div className="space-y-2 flex-1">
        {applications.map((app) => (
          <KanbanCard
            key={app.id}
            application={app}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}

        {applications.length === 0 && (
          <div className="text-center py-8 text-xs text-slate-400 border-2 border-dashed border-slate-200 rounded-lg">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
}