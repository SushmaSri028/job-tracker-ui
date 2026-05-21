import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
      // Parse "field: message" strings into { field: message } object
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Create your account</h1>
        <p className="text-slate-600 mb-8">Start tracking your job hunt</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
  <input
    type="email"
    required
    value={email}
    onChange={(e) => setFullName(e.target.value)}
    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
      fieldErrors.fullName ? 'border-red-400' : 'border-slate-300'
    }`}
    placeholder="you@example.com"
  />
  {fieldErrors.fullName && (
    <p className="text-red-600 text-xs mt-1">{fieldErrors.fullName}</p>
  )}
</div>

          <div>
  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
  <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
      fieldErrors.email ? 'border-red-400' : 'border-slate-300'
    }`}
    placeholder="you@example.com"
  />
  {fieldErrors.email && (
    <p className="text-red-600 text-xs mt-1">{fieldErrors.email}</p>
  )}
</div>

          <div>
  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
  <input
    type="email"
    required
    value={email}
    onChange={(e) => setPassword(e.target.value)}
    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
      fieldErrors.password ? 'border-red-400' : 'border-slate-300'
    }`}
    placeholder="you@example.com"
  />
  {fieldErrors.password && (
    <p className="text-red-600 text-xs mt-1">{fieldErrors.password}</p>
  )}
</div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}