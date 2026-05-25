import { Pencil, Trash2, ExternalLink, MapPin, Calendar } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ApplicationCard({ application, onEdit, onDelete }) {
  return (
    <div className="group relative bg-white dark:bg-ink-900 rounded-2xl p-5 border border-ink-100 dark:border-ink-800 shadow-ring hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-ink-900 dark:text-white truncate">
            {application.company}
          </h3>
          <p className="text-sm text-ink-500 dark:text-ink-400 truncate">
            {application.role}
          </p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <div className="space-y-1.5 mb-4 text-xs text-ink-500 dark:text-ink-400">
        {application.location && (
          <div className="flex items-center gap-1.5">
            <MapPin size={12} />
            <span className="truncate">{application.location}</span>
          </div>
        )}
        {application.appliedDate && (
          <div className="flex items-center gap-1.5">
            <Calendar size={12} />
            <span>Applied {formatDate(application.appliedDate)}</span>
          </div>
        )}
        {application.jobUrl && (
          <a
            href={application.jobUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-accent-600 dark:text-accent-400 hover:underline"
          >
            <ExternalLink size={12} /> View posting
          </a>
        )}
      </div>

      {application.notes && (
        <p className="text-xs text-ink-600 dark:text-ink-300 bg-ink-50 dark:bg-ink-950/60 p-3 rounded-xl mb-3 line-clamp-3 whitespace-pre-wrap">
          {application.notes}
        </p>
      )}

      <div className="flex justify-end gap-1 pt-2 border-t border-ink-100 dark:border-ink-800 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(application)}
          className="p-1.5 rounded-lg text-ink-500 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/30 transition-colors"
          title="Edit"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(application)}
          className="p-1.5 rounded-lg text-ink-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}