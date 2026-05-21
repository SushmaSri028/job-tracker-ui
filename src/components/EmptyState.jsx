import { Inbox } from 'lucide-react';

export default function EmptyState({ title, description, action }) {
  return (
    <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">
        <Inbox size={28} />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
        {title}
      </h3>
      <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action}
    </div>
  );
}