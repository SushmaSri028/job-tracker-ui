import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Match the StatusBadge colors (tailwind palette equivalents)
const COLORS = {
  APPLIED: '#3b82f6',    // blue-500
  SCREENING: '#a855f7',  // purple-500
  INTERVIEW: '#eab308',  // yellow-500
  OFFER: '#10b981',      // emerald-500
  ACCEPTED: '#22c55e',   // green-500
  REJECTED: '#ef4444',   // red-500
  GHOSTED: '#94a3b8',    // slate-400
  DECLINED: '#f97316',   // orange-500
};

export default function StatusPieChart({ data }) {
  if (data.length === 0) {
    return <EmptyChart message="No data yet" />;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={90}
          paddingAngle={2}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name] || '#cbd5e1'} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          wrapperStyle={{ fontSize: '12px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

function EmptyChart({ message }) {
  return (
    <div className="h-[280px] flex items-center justify-center text-slate-400 text-sm">
      {message}
    </div>
  );
}