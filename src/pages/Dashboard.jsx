import { useState, useMemo } from 'react';
import { Plus, Download, Inbox, TrendingUp, MessageSquare, Award } from 'lucide-react';
import {
  useApplications,
  useCreateApplication,
  useUpdateApplication,
  useDeleteApplication,
} from '../hooks/useApplications';
import Sidebar from '../components/Sidebar';
import MobileTopBar from '../components/MobileTopBar';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationFormModal from '../components/ApplicationFormModal';
import ApplicationFilters from '../components/ApplicationFilters';
import KanbanBoard from '../components/KanbanBoard';
import ViewToggle from '../components/ViewToggle';
import StaleAlert from '../components/StaleAlert';
import { exportApplicationsToCSV } from '../utils/csvExport';
import { getStaleApplications } from '../utils/analytics';

export default function Dashboard() {
  const { data: applications = [], isLoading, error } = useApplications();
  const createMutation = useCreateApplication();
  const updateMutation = useUpdateApplication();
  const deleteMutation = useDeleteApplication();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [view, setView] = useState('list');
  const [staleAlertDismissed, setStaleAlertDismissed] = useState(false);

  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        !search ||
        app.company?.toLowerCase().includes(search.toLowerCase()) ||
        app.role?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const stats = useMemo(
    () => ({
      total: applications.length,
      active: applications.filter((a) => !['REJECTED', 'GHOSTED', 'DECLINED'].includes(a.status)).length,
      interviews: applications.filter((a) => a.status === 'INTERVIEW').length,
      offers: applications.filter((a) => ['OFFER', 'ACCEPTED'].includes(a.status)).length,
    }),
    [applications]
  );

  const staleApplications = useMemo(() => getStaleApplications(applications), [applications]);

  const openCreate = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (app) => { setEditing(app); setModalOpen(true); };

  const handleSubmit = async (formData) => {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (app) => {
    if (confirm(`Delete application for ${app.company}?`)) {
      deleteMutation.mutate(app.id);
    }
  };

  const handleStatusUpdate = async (application, newStatus) => {
    await updateMutation.mutateAsync({
      id: application.id,
      data: { ...application, status: newStatus, user: undefined },
    });
  };

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950">
      <Sidebar />
      <MobileTopBar />

      <main className="lg:ml-64 px-4 sm:px-6 lg:px-10 py-6 lg:py-10">
        <div className="max-w-6xl mx-auto animate-fade-in">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
              Track every application across the pipeline.
            </p>
          </div>

          {/* Stale alert */}
          {!staleAlertDismissed && (
            <StaleAlert
              staleApplications={staleApplications}
              onDismiss={() => setStaleAlertDismissed(true)}
            />
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            <StatCard icon={<Inbox size={18} />} label="Total" value={stats.total} accent="bg-accent-500" />
            <StatCard icon={<TrendingUp size={18} />} label="Active" value={stats.active} accent="bg-purple-500" />
            <StatCard icon={<MessageSquare size={18} />} label="Interviews" value={stats.interviews} accent="bg-amber-500" />
            <StatCard icon={<Award size={18} />} label="Offers" value={stats.offers} accent="bg-emerald-500" />
          </div>

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <h2 className="text-xl font-semibold tracking-tight text-ink-900 dark:text-white">
              Applications
            </h2>
            <div className="flex items-center gap-2">
              <ViewToggle view={view} setView={setView} />
              <button
                onClick={() => exportApplicationsToCSV(applications)}
                className="btn-secondary"
                title="Export to CSV"
              >
                <Download size={16} /> Export
              </button>
              <button onClick={openCreate} className="btn-primary">
                <Plus size={16} /> New
              </button>
            </div>
          </div>

          {/* Filters in list view */}
          {view === 'list' && (
            <div className="mb-5">
              <ApplicationFilters
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            </div>
          )}

          {/* States */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="card p-5 h-44 animate-pulse">
                  <div className="h-4 bg-ink-100 dark:bg-ink-800 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-ink-100 dark:bg-ink-800 rounded w-2/3 mb-4" />
                  <div className="h-12 bg-ink-50 dark:bg-ink-900 rounded" />
                </div>
              ))}
            </div>
          )}

          {error && (
            <div className="card p-12 text-center">
              <p className="text-red-600 dark:text-red-400">Failed to load applications.</p>
            </div>
          )}

          {!isLoading && filtered.length === 0 && (
            <div className="card p-16 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-ink-100 dark:bg-ink-800 rounded-2xl flex items-center justify-center">
                <Inbox className="text-ink-400" size={20} />
              </div>
              <h3 className="text-base font-medium text-ink-900 dark:text-white mb-1">
                {applications.length === 0 ? 'No applications yet' : 'Nothing matches'}
              </h3>
              <p className="text-sm text-ink-500 dark:text-ink-400 mb-5">
                {applications.length === 0
                  ? 'Add your first job application to get started.'
                  : 'Try adjusting your search or filter.'}
              </p>
              {applications.length === 0 && (
                <button onClick={openCreate} className="btn-primary">
                  <Plus size={16} /> Add your first
                </button>
              )}
            </div>
          )}

          {/* Body */}
          {!isLoading && filtered.length > 0 && (
            <>
              {view === 'list' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((app) => (
                    <ApplicationCard
                      key={app.id}
                      application={app}
                      onEdit={openEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <KanbanBoard
                  applications={filtered}
                  onUpdateStatus={handleStatusUpdate}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              )}
            </>
          )}
        </div>
      </main>

      <ApplicationFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editing}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}

function StatCard({ icon, label, value, accent }) {
  return (
    <div className="card p-4 hover:shadow-soft transition-shadow">
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-7 h-7 rounded-lg ${accent} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center text-white`}>
          <div className={`absolute w-7 h-7 rounded-lg ${accent} opacity-15`}></div>
          <div className="relative">{icon}</div>
        </div>
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