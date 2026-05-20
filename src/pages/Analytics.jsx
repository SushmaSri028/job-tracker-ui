import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LogOut, TrendingUp, Target, Clock, Inbox } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApplications } from '../hooks/useApplications';
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
import ThemeToggle from '../components/ThemeToggle';

export default function Analytics() {
  const { user, logout } = useAuth();
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
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-slate-900">Job Tracker</h1>
            <div className="flex items-center gap-1">
              <Link
                to="/dashboard"
                className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Dashboard
              </Link>
              <Link
                to="/analytics"
                className="px-3 py-1.5 rounded-md text-sm font-medium bg-slate-100 text-slate-900"
              >
                Analytics
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
  <ThemeToggle />
  <span className="text-sm text-slate-600 dark:text-slate-300">
    Hi,{' '}
    <span className="font-medium text-slate-900 dark:text-slate-100">{user?.fullName}</span>
  </span>
  <button
    onClick={logout}
    className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
  >
    <LogOut size={16} /> Log out
  </button>
</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 mb-3"
          >
            <ArrowLeft size={14} /> Back to dashboard
          </Link>
          <h2 className="text-3xl font-bold text-slate-900">Analytics</h2>
          <p className="text-slate-600 mt-1">
            Insights from {applications.length} application{applications.length === 1 ? '' : 's'}
          </p>
        </div>

        {isLoading ? (
          <p className="text-center text-slate-500 py-12">Loading...</p>
        ) : applications.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
            <p className="text-slate-500 text-lg mb-2">No data yet.</p>
            <p className="text-slate-400 text-sm">
              Add a few applications first to see analytics.
            </p>
          </div>
        ) : (
          <>
            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <KpiCard
                icon={<Inbox size={20} />}
                label="Total applications"
                value={applications.length}
                color="bg-blue-50 text-blue-700"
              />
              <KpiCard
                icon={<TrendingUp size={20} />}
                label="Response rate"
                value={`${data.responseRate}%`}
                color="bg-emerald-50 text-emerald-700"
              />
              <KpiCard
                icon={<Target size={20} />}
                label="Offer rate"
                value={`${data.offerRate}%`}
                color="bg-purple-50 text-purple-700"
              />
              <KpiCard
                icon={<Clock size={20} />}
                label="Avg. days since applied"
                value={data.avgDays}
                color="bg-yellow-50 text-yellow-700"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
      </main>
    </div>
  );
}

function KpiCard({ icon, label, value, color }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${color} mb-3`}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm text-slate-600 mt-1">{label}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="text-base font-semibold text-slate-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}