const REFINED_COLORS = {
  APPLIED:   'bg-accent-50 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300',
  SCREENING: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  INTERVIEW: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  OFFER:     'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  ACCEPTED:  'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  REJECTED:  'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  GHOSTED:   'bg-ink-100 text-ink-600 dark:bg-ink-800 dark:text-ink-300',
  DECLINED:  'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
};

export default function StatusBadge({ status }) {
  const color = REFINED_COLORS[status] || 'bg-ink-100 text-ink-700';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium tracking-wide ${color}`}>
      {status}
    </span>
  );
}