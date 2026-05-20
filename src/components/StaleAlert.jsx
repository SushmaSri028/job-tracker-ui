import { AlertTriangle } from 'lucide-react';

export default function StaleAlert({ staleApplications, onDismiss }) {
  if (staleApplications.length === 0) return null;

  return (
    <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex items-start gap-3">
      <AlertTriangle className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
      <div className="flex-1">
        <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 text-sm">
          {staleApplications.length === 1
            ? '1 application is stuck'
            : `${staleApplications.length} applications are stuck`}
        </h3>
        <p className="text-yellow-800 dark:text-yellow-200 text-sm mt-0.5">
          {staleApplications.slice(0, 3).map((a) => a.company).join(', ')}
          {staleApplications.length > 3 ? ` and ${staleApplications.length - 3} more` : ''} —
          no updates in 14+ days. Time to follow up?
        </p>
      </div>
      <button
        onClick={onDismiss}
        className="text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 text-sm font-medium"
      >
        Dismiss
      </button>
    </div>
  );
}