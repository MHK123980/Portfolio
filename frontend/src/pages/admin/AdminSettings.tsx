import React, { useEffect, useState } from 'react';
import { Loader2, Save, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';
import { adminGetSettings, adminUpdateSettings } from '../../lib/api';
import { PortfolioSettings } from '../../types';

const AVAILABILITY_OPTIONS = [
  'Available for Projects',
  'Available for Full-Time',
  'Partially Available',
  'Currently Unavailable',
  'Available from Next Month',
];

export const AdminSettings: React.FC = () => {
  const [form, setForm] = useState<Partial<PortfolioSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    document.title = 'Settings | Admin Panel';
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const res = await adminGetSettings();
    if (res.success && res.data) {
      setForm(res.data);
    } else {
      setError('Failed to load settings.');
    }
    setLoading(false);
  };

  const set = (key: keyof PortfolioSettings, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError('');
    setSuccess('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.developerName?.trim() || !form.contactEmail?.trim()) {
      setError('Developer name and contact email are required.');
      return;
    }

    setSaving(true);
    setError('');

    const res = await adminUpdateSettings(form);
    if (res.success) {
      setSuccess('Settings saved successfully!');
      setTimeout(() => setSuccess(''), 4000);
    } else {
      setError(res.message || 'Failed to save settings.');
    }
    setSaving(false);
  };

  const inputCls = 'w-full px-4 py-3 rounded-xl bg-dark-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20 transition-all';
  const labelCls = 'block text-xs font-mono text-slate-400 mb-1.5';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] gap-3 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin text-brand-cyan" />
        <span>Loading settings...</span>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio Settings</h1>
          <p className="text-sm text-slate-500 mt-0.5">Control your public portfolio profile</p>
        </div>
        <button
          onClick={fetchSettings}
          className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-900/20 border border-red-800/40 text-red-400 text-sm mb-6">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-900/20 border border-emerald-800/40 text-emerald-400 text-sm mb-6">
          <CheckCircle className="w-4 h-4 flex-shrink-0" />
          {success}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile */}
        <section className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-5">
          <h2 className="text-sm font-bold text-white font-mono">PROFILE</h2>
          <div>
            <label className={labelCls}>DEVELOPER NAME *</label>
            <input
              className={inputCls}
              value={form.developerName || ''}
              onChange={(e) => set('developerName', e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className={labelCls}>CONTACT EMAIL *</label>
            <input
              type="email"
              className={inputCls}
              value={form.contactEmail || ''}
              onChange={(e) => set('contactEmail', e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className={labelCls}>BIO / TAGLINE</label>
            <textarea
              className={`${inputCls} h-24 resize-none`}
              value={form.bio || ''}
              onChange={(e) => set('bio', e.target.value)}
              placeholder="Short professional bio..."
            />
          </div>
        </section>

        {/* Availability */}
        <section className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-5">
          <h2 className="text-sm font-bold text-white font-mono">AVAILABILITY STATUS</h2>
          <div>
            <label className={labelCls}>CURRENT AVAILABILITY</label>
            <select
              className={inputCls}
              value={form.availability || ''}
              onChange={(e) => set('availability', e.target.value)}
            >
              {AVAILABILITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-950 border border-slate-800">
            <div className={`w-2 h-2 rounded-full ${
              form.availability?.toLowerCase().includes('unavailable') ? 'bg-red-400' : 'bg-emerald-400 animate-pulse'
            }`} />
            <span className="text-sm text-slate-300">{form.availability || 'Not set'}</span>
          </div>
        </section>

        {/* Social Links */}
        <section className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-5">
          <h2 className="text-sm font-bold text-white font-mono">SOCIAL LINKS</h2>
          <div>
            <label className={labelCls}>GITHUB URL</label>
            <input
              className={inputCls}
              value={form.githubUrl || ''}
              onChange={(e) => set('githubUrl', e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>
          <div>
            <label className={labelCls}>LINKEDIN URL</label>
            <input
              className={inputCls}
              value={form.linkedinUrl || ''}
              onChange={(e) => set('linkedinUrl', e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div>
            <label className={labelCls}>TWITTER / X URL (optional)</label>
            <input
              className={inputCls}
              value={form.twitterUrl || ''}
              onChange={(e) => set('twitterUrl', e.target.value)}
              placeholder="https://twitter.com/username"
            />
          </div>
        </section>

        {/* Save */}
        <div className="pb-8">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-cyan text-dark-950 font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};
