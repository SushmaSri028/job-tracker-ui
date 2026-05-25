import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);
    try {
      await register(email, password, fullName);
      toast.success(`Welcome, ${fullName}!`);
      navigate('/dashboard');
    } catch (err) {
      const data = err.response?.data;
      if (data?.details && Array.isArray(data.details)) {
        const errors = {};
        data.details.forEach((detail) => {
          const [field, ...msgParts] = detail.split(':');
          errors[field.trim()] = msgParts.join(':').trim();
        });
        setFieldErrors(errors);
      } else {
        setError(data?.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ink-50 via-white to-accent-50 dark:from-ink-950 dark:via-ink-950 dark:to-ink-900 flex">
      {/* Left side - branding with features */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-ink-900 dark:bg-ink-950">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-accent-500/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-accent-700/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
              <Briefcase size={18} className="text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Job Tracker</span>
          </div>

          <div className="space-y-8 animate-slide-up">
            <h1 className="text-4xl font-bold tracking-tight leading-tight">
              Start tracking your<br />
              <span className="text-accent-300">job hunt today.</span>
            </h1>

            <div className="space-y-4">
              <Feature text="Drag-and-drop Kanban for every status" />
              <Feature text="Analytics on response & offer rates" />
              <Feature text="Export to CSV anytime" />
              <Feature text="Dark mode that actually looks good" />
            </div>
          </div>

          <p className="text-sm text-ink-400">
            Free forever. No credit card. No nonsense.
          </p>
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
              Create your account
            </h2>
            <p className="text-ink-500 dark:text-ink-400">
              60 seconds. Then you're in.
            </p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-sm animate-scale-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field
              label="Full name"
              value={fullName}
              setter={setFullName}
              error={fieldErrors.fullName}
              placeholder="Sushma Sri"
              type="text"
              autoComplete="name"
            />

            <Field
              label="Email"
              value={email}
              setter={setEmail}
              error={fieldErrors.email}
              placeholder="you@example.com"
              type="email"
              autoComplete="email"
            />

            <Field
              label="Password"
              value={password}
              setter={setPassword}
              error={fieldErrors.password}
              placeholder="At least 8 characters"
              type="password"
              autoComplete="new-password"
              minLength={8}
            />

            <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
              {loading ? 'Creating account...' : (
                <>
                  Create account <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-ink-500 dark:text-ink-400 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-ink-900 dark:text-white hover:text-accent-600 dark:hover:text-accent-400 transition-colors">
              Sign in →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2 size={20} className="text-accent-300 flex-shrink-0" />
      <span className="text-ink-200">{text}</span>
    </div>
  );
}

function Field({ label, value, setter, error, placeholder, type, autoComplete, minLength }) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink-700 dark:text-ink-300 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        required
        minLength={minLength}
        value={value}
        onChange={(e) => setter(e.target.value)}
        className={`input ${error ? '!border-red-400 !ring-red-400/30' : ''}`}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      {error && (
        <p className="text-red-600 dark:text-red-400 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}