import { useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core';
import { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import { KANBAN_STATUSES } from '../constants/status';

export default function KanbanBoard({ applications, onUpdateStatus, onEdit, onDelete }) {
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  // Group applications by status
  const grouped = useMemo(() => {
    const result = {};
    KANBAN_STATUSES.forEach((s) => { result[s] = []; });
    applications.forEach((app) => {
      if (result[app.status]) {
        result[app.status].push(app);
      }
    });
    return result;
  }, [applications]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const application = applications.find((a) => a.id === active.id);
    if (!application) return;

    const newStatus = over.id;
    if (application.status === newStatus) return;
    if (!KANBAN_STATUSES.includes(newStatus)) return;

    onUpdateStatus(application, newStatus);
  };

  const activeApplication = applications.find((a) => a.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {KANBAN_STATUSES.map((status) => (
          <KanbanColumn
            key={status}
            status={status}
            applications={grouped[status]}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      <DragOverlay>
        {activeApplication && (
          <div className="bg-white border border-blue-400 rounded-lg p-3 shadow-2xl rotate-3">
            <h4 className="font-semibold text-slate-900 text-sm">{activeApplication.company}</h4>
            <p className="text-xs text-slate-600">{activeApplication.role}</p>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}