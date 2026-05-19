import { Pencil, Trash2, ExternalLink } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ApplicationCard({ application, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{application.company}</h3>
          <p className="text-slate-600">{application.role}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="text-sm text-slate-500 space-y-1 mb-4">
        {application.location && <p>📍 {application.location}</p>}
        {application.appliedDate && <p>📅 Applied {application.appliedDate}</p>}
        {application.jobUrl && (
          <a
            href={application.jobUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:underline"
          >
            View job <ExternalLink size={14} />
          </a>
        )}
      </div>

      {application.notes && (
        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg mb-3 whitespace-pre-wrap">
          {application.notes}
        </p>
      )}

      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
        <button
          onClick={() => onEdit(application)}
          className="text-slate-600 hover:text-blue-600 p-2 hover:bg-blue-50 rounded-lg transition"
          title="Edit"
        >
          <Pencil size={16} />
        </button>
        <button
          onClick={() => onDelete(application)}
          className="text-slate-600 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}