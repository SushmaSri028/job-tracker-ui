import { useMemo } from 'react';
import { TrendingUp, Target, Clock, Inbox } from 'lucide-react';
import { useApplications } from '../hooks/useApplications';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import StatusPieChart from '../components/charts/StatusPieChart';
import ApplicationsTimeline from '../components/charts/ApplicationsTimeline';
import TopCompaniesChart from '../components/charts/TopCompaniesChart';
import {
  getStatusBreakdown,
  getTopCompanies,
  getApplicationsOverTime,
  getResponseRate,
  getOfferRate,
  getAvgDaysApplied,
} from '../utils/analytics';

export default function Analytics() {
  const { data: applications = [], isLoading } = useApplications();

  const data = useMemo(() => ({
    status: getStatusBreakdown(applications),
    companies: getTopCompanies(applications),
    timeline: getApplicationsOverTime(applications),
    responseRate: getResponseRate(applications),
    offerRate: getOfferRate(applications),
    avgDays: getAvgDaysApplied(applications),
  }), [applications]);

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950">
      <Sidebar />
      <MobileTopBar />

      <main className="lg:ml-64 px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
              Analytics
            </h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
              Insights across {applications.length} application{applications.length === 1 ? '' : 's'}.
            </p>
          </div>

          {isLoading ? (
            <div className="card p-16 text-center text-ink-500">Loading...</div>
          ) : applications.length === 0 ? (
            <div className="card p-16 text-center">
              <p className="text-ink-500 dark:text-ink-400 mb-2">No data yet.</p>
              <p className="text-sm text-ink-400">Add applications to see your analytics.</p>
            </div>
          ) : (
            <>
              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <KpiCard icon={<Inbox size={18} />} label="Total" value={applications.length} accent="text-accent-600" />
                <KpiCard icon={<TrendingUp size={18} />} label="Response rate" value={`${data.responseRate}%`} accent="text-emerald-600" />
                <KpiCard icon={<Target size={18} />} label="Offer rate" value={`${data.offerRate}%`} accent="text-purple-600" />
                <KpiCard icon={<Clock size={18} />} label="Avg. days" value={data.avgDays} accent="text-amber-600" />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <ChartCard title="Status breakdown">
                  <StatusPieChart data={data.status} />
                </ChartCard>
                <ChartCard title="Top companies">
                  <TopCompaniesChart data={data.companies} />
                </ChartCard>
              </div>

              <ChartCard title="Applications per week (last 12 weeks)">
                <ApplicationsTimeline data={data.timeline} />
              </ChartCard>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function KpiCard({ icon, label, value, accent }) {
  return (
    <div className="card p-4">
      <div className={`flex items-center gap-2.5 mb-3 ${accent}`}>
        {icon}
        <span className="text-xs font-medium text-ink-500 dark:text-ink-400 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <p className="text-3xl font-bold tracking-tight text-ink-900 dark:text-white tabular-nums">
        {value}
      </p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="card p-6">
      <h3 className="text-sm font-semibold text-ink-900 dark:text-white mb-4">{title}</h3>
      {children}
    </div>
  );
}