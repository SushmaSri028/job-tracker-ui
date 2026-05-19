import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Job Tracker</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              Hi, <span className="font-medium text-slate-900">{user?.fullName}</span>
            </span>
            <button
              onClick={logout}
              className="text-sm text-slate-600 hover:text-slate-900 font-medium"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Welcome to your dashboard 👋
          </h2>
          <p className="text-slate-600 mb-2">
            You're logged in as <strong>{user?.email}</strong>
          </p>
          <p className="text-slate-500 text-sm">
            Day 10 we'll build the application list, filters, and Kanban board here.
          </p>
        </div>
      </main>
    </div>
  );
}