import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Pencil, Trash2 } from 'lucide-react';

export default function KanbanCard({ application, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: application.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white border border-slate-200 rounded-lg p-3 shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing touch-none"
    >
      <h4 className="font-semibold text-slate-900 text-sm">{application.company}</h4>
      <p className="text-xs text-slate-600 mb-2">{application.role}</p>
      {application.appliedDate && (
        <p className="text-xs text-slate-500">📅 {application.appliedDate}</p>
      )}

      <div className="flex justify-end gap-1 mt-2 pt-2 border-t border-slate-100">
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onEdit(application)}
          className="text-slate-500 hover:text-blue-600 p-1 hover:bg-blue-50 rounded transition"
          title="Edit"
        >
          <Pencil size={14} />
        </button>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onDelete(application)}
          className="text-slate-500 hover:text-red-600 p-1 hover:bg-red-50 rounded transition"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}