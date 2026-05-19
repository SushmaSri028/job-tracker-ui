import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { STATUSES } from '../constants/status';

const EMPTY = {
  company: '',
  role: '',
  location: '',
  jobUrl: '',
  notes: '',
  status: 'APPLIED',
  appliedDate: new Date().toISOString().slice(0, 10),
};

export default function ApplicationFormModal({ open, onClose, onSubmit, initialData, isLoading }) {
  const [form, setForm] = useState(EMPTY);
  const isEdit = Boolean(initialData);

  useEffect(() => {
    if (open) {
      setForm(initialData ? { ...EMPTY, ...initialData } : EMPTY);
    }
  }, [open, initialData]);

  if (!open) return null;

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            {isEdit ? 'Edit Application' : 'New Application'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Field label="Company *">
            <input
              required
              value={form.company}
              onChange={handleChange('company')}
              className="input"
              placeholder="Google"
            />
          </Field>

          <Field label="Role *">
            <input
              required
              value={form.role}
              onChange={handleChange('role')}
              className="input"
              placeholder="Software Engineer"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Status">
              <select value={form.status} onChange={handleChange('status')} className="input">
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            <Field label="Applied Date">
              <input
                type="date"
                value={form.appliedDate || ''}
                onChange={handleChange('appliedDate')}
                className="input"
              />
            </Field>
          </div>

          <Field label="Location">
            <input
              value={form.location || ''}
              onChange={handleChange('location')}
              className="input"
              placeholder="Mountain View, CA"
            />
          </Field>

          <Field label="Job URL">
            <input
              type="url"
              value={form.jobUrl || ''}
              onChange={handleChange('jobUrl')}
              className="input"
              placeholder="https://..."
            />
          </Field>

          <Field label="Notes">
            <textarea
              value={form.notes || ''}
              onChange={handleChange('notes')}
              className="input h-24 resize-none"
              placeholder="Referred by Jane, recruiter call next Tuesday..."
            />
          </Field>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg font-medium">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {children}
    </div>
  );
}