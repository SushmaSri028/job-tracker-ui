export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="space-y-2 flex-1">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
        </div>
        <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/3" />
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/4" />
      </div>
      <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded-lg" />
    </div>
  );
}