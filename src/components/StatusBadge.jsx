import { STATUS_COLORS } from '../constants/status';

export default function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || 'bg-slate-100 text-slate-700';
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {status}
    </span>
  );
}