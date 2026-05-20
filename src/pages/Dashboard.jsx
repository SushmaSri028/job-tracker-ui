import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Plus, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  useApplications,
  useCreateApplication,
  useUpdateApplication,
  useDeleteApplication,
} from '../hooks/useApplications';
import ApplicationCard from '../components/ApplicationCard';
import ApplicationFormModal from '../components/ApplicationFormModal';
import ApplicationFilters from '../components/ApplicationFilters';
import KanbanBoard from '../components/KanbanBoard';
import ViewToggle from '../components/ViewToggle';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { data: applications = [], isLoading, error } = useApplications();
  const createMutation = useCreateApplication();
  const updateMutation = useUpdateApplication();
  const deleteMutation = useDeleteApplication();

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [view, setView] = useState('list');

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
      interviews: applications.filter((a) => a.status === 'INTERVIEW').length,
      offers: applications.filter((a) => ['OFFER', 'ACCEPTED'].includes(a.status)).length,
      active: applications.filter(
        (a) => !['REJECTED', 'GHOSTED', 'DECLINED'].includes(a.status)
      ).length,
    }),
    [applications]
  );

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (app) => {
    setEditing(app);
    setModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    if (editing) {
      await updateMutation.mutateAsync({ id: editing.id, data: formData });
    } else {
      await createMutation.mutateAsync(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (app) => {
    if (confirm(`Delete application for ${app.company}?`)) {
      deleteMutation.mutate(app.id);
    }
  };

  const handleStatusUpdate = async (application, newStatus) => {
    await updateMutation.mutateAsync({
      id: application.id,
      data: {
        company: application.company,
        role: application.role,
        location: application.location,
        jobUrl: application.jobUrl,
        notes: application.notes,
        appliedDate: application.appliedDate,
        status: newStatus,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-slate-900">Job Tracker</h1>
            <div className="flex items-center gap-1">
              <Link
                to="/dashboard"
                className="px-3 py-1.5 rounded-md text-sm font-medium bg-slate-100 text-slate-900"
              >
                Dashboard
              </Link>
              <Link
                to="/analytics"
                className="px-3 py-1.5 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-100"
              >
                Analytics
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              Hi,{' '}
              <span className="font-medium text-slate-900">{user?.fullName}</span>
            </span>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900"
            >
              <LogOut size={16} /> Log out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total" value={stats.total} color="bg-blue-500" />
          <StatCard label="Active" value={stats.active} color="bg-purple-500" />
          <StatCard label="Interviews" value={stats.interviews} color="bg-yellow-500" />
          <StatCard label="Offers" value={stats.offers} color="bg-emerald-500" />
        </div>

        {/* Header + ViewToggle + Add button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Applications</h2>
          <div className="flex items-center gap-3">
            <ViewToggle view={view} setView={setView} />
            <button
              onClick={openCreate}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              <Plus size={18} /> New Application
            </button>
          </div>
        </div>

        {view === 'list' && (
          <ApplicationFilters
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        )}

        {isLoading && (
          <p className="text-center text-slate-500 py-12">Loading...</p>
        )}
        {error && (
          <p className="text-center text-red-600 py-12">
            Failed to load applications.
          </p>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-500 text-lg">
              {applications.length === 0
                ? "No applications yet. Click 'New Application' to add your first!"
                : 'No applications match your filters.'}
            </p>
          </div>
        )}

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

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-12 rounded-full ${color}`} />
        <div>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-sm text-slate-600">{label}</p>
        </div>
      </div>
    </div>
  );
}