import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { adminLogin } from '../../lib/api';
import { saveToken, isAuthenticated } from '../../lib/auth';

export const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Admin Login | MHK Portfolio';
    if (isAuthenticated()) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);
    setError('');

    const res = await adminLogin(cleanEmail, cleanPassword);
    const token = res.data?.token || (res as any).token;

    if (res.success && token) {
      saveToken(token);
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError(res.message || 'Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-dark-900 border border-brand-cyan/30 text-brand-cyan mb-4 shadow-lg shadow-brand-cyan/10">
            <Terminal className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-white">Portfolio Admin</h1>
          <p className="text-sm text-slate-500 mt-1 font-mono">Restricted Area</p>
        </div>

        {/* Card */}
        <div className="bg-dark-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-900/20 border border-red-800/40 text-red-400 text-sm mb-6">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portfolio.manage"
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1.5">PASSWORD</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-dark-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-cyan text-dark-950 font-bold text-sm hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-800 text-center space-y-1.5">
            <p className="text-xs text-slate-500">
              Sign in with your admin ID:
            </p>
            <p className="text-xs font-mono text-brand-cyan bg-dark-950 py-1.5 px-3 rounded-lg border border-slate-800 inline-block">
              mhk@portfolio.manage
            </p>
          </div>
        </div>

        <p className="text-center mt-6">
          <a href="/" className="text-xs text-slate-500 hover:text-brand-cyan transition-colors">
            ← Back to Portfolio
          </a>
        </p>
      </div>
    </div>
  );
};
