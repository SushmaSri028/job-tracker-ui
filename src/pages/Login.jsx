import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-accent-50 dark:from-ink-950 dark:via-ink-950 dark:to-ink-900 flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-ink-900 dark:bg-ink-950">
        {/* Decorative gradient orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent-700/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Job Tracker</span>
          </div>

          <div className="space-y-6 animate-slide-up">
            <h1 className="text-5xl font-bold tracking-tight leading-tight">
              Your job search,<br />
              <span className="text-accent-300">finally organized.</span>
            </h1>
            <p className="text-lg text-ink-300 leading-relaxed max-w-md">
              Track every application, every interview, every offer. Built for the modern job hunter.
            </p>
          </div>

          <div className="space-y-3 text-sm text-ink-400">
            <p>"I went from 3 chaotic spreadsheets to one beautiful dashboard."</p>
            <p className="text-ink-500">— Sushma, MS CS '26</p>
          </div>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="w-9 h-9 bg-ink-900 rounded-xl flex items-center justify-center">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-ink-900 dark:text-white">Job Tracker</span>
          </div>

          <div className="space-y-2 mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-ink-900 dark:text-white">
              Welcome back
            </h2>
            <p className="text-ink-500 dark:text-ink-400">
              Sign in to continue your job search.
            </p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-sm animate-scale-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? 'Signing in...' : (
                <>
                  Sign in <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-ink-500 dark:text-ink-400 mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-ink-900 dark:text-white hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
              Create one →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}