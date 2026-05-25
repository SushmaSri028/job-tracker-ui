import { Link, useLocation } from 'react-router-dom';
import { Briefcase, LayoutDashboard, BarChart3, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function MobileTopBar() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="lg:hidden sticky top-0 z-30 bg-white/80 dark:bg-ink-950/80 backdrop-blur-xl border-b border-ink-100 dark:border-ink-900">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-ink-900 dark:bg-white rounded-lg flex items-center justify-center">
            <Briefcase size={14} className="text-white dark:text-ink-900" />
          </div>
          <span className="font-semibold text-ink-900 dark:text-white">Job Tracker</span>
        </div>

        <div className="flex items-center gap-1">
          <Link
            to="/dashboard"
            className={`p-2 rounded-lg ${
              location.pathname === '/dashboard'
                ? 'bg-ink-900 dark:bg-white text-white dark:text-ink-900'
                : 'text-ink-600 dark:text-ink-300'
            }`}
          >
            <LayoutDashboard size={16} />
          </Link>
          <Link
            to="/analytics"
            className={`p-2 rounded-lg ${
              location.pathname === '/analytics'
                ? 'bg-ink-900 dark:bg-white text-white dark:text-ink-900'
                : 'text-ink-600 dark:text-ink-300'
            }`}
          >
            <BarChart3 size={16} />
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-ink-600 dark:text-ink-300"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={logout}
            className="p-2 rounded-lg text-ink-600 dark:text-ink-300"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}