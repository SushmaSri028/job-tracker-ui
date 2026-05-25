import { NavLink, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  LayoutDashboard,
  BarChart3,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 z-30 bg-white/80 dark:bg-ink-950/80 backdrop-blur-xl border-r border-ink-100 dark:border-ink-900">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="w-9 h-9 bg-ink-900 dark:bg-white rounded-xl flex items-center justify-center">
          <Briefcase size={18} className="text-white dark:text-ink-900" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-base font-semibold tracking-tight text-ink-900 dark:text-white">
            Job Tracker
          </span>
          <span className="text-xs text-ink-500">Personal · Free</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/analytics" icon={BarChart3} label="Analytics" />
      </nav>

      {/* Bottom — theme + user */}
      <div className="px-3 py-4 space-y-2 border-t border-ink-100 dark:border-ink-900">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-ink-700 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-900 transition-colors"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
        </button>

        <div className="px-3 py-3 rounded-xl bg-ink-50 dark:bg-ink-900">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center text-white font-medium text-sm">
              {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink-900 dark:text-white truncate">
                {user?.fullName}
              </p>
              <p className="text-xs text-ink-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg text-xs text-ink-600 dark:text-ink-300 hover:bg-white dark:hover:bg-ink-800 hover:text-ink-900 dark:hover:text-white transition-colors"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
          isActive
            ? 'bg-ink-900 dark:bg-white text-white dark:text-ink-900 shadow-soft'
            : 'text-ink-600 dark:text-ink-300 hover:bg-ink-100 dark:hover:bg-ink-900 hover:text-ink-900 dark:hover:text-white'
        }`
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}