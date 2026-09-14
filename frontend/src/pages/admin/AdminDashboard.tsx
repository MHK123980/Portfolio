import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  Eye,
  FileEdit,
  MessageSquare,
  CheckCircle,
  Clock,
  TrendingUp,
  Loader2,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { adminGetStats } from '../../lib/api';
import { DashboardStats } from '../../types';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  subLabel?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, color, subLabel }) => (
  <div className={`p-5 rounded-2xl bg-dark-900 border border-slate-800 hover:border-slate-700 transition-all`}>
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-xs font-mono text-slate-500 mb-1">{label}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
        {subLabel && <p className="text-xs text-slate-500 mt-1">{subLabel}</p>}
      </div>
      <div className={`p-2.5 rounded-xl bg-dark-950 border border-slate-800`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
    </div>
  </div>
);

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard | Admin Panel';
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const res = await adminGetStats();
    if (res.success && res.data) {
      setStats(res.data);
    }
    setLoading(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Portfolio management overview</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStats}
            className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-cyan text-dark-950 font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>
      </div>

      {loading && !stats ? (
        <div className="flex items-center justify-center min-h-[200px] gap-3 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin text-brand-cyan" />
          <span>Loading dashboard...</span>
        </div>
      ) : stats ? (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="TOTAL PROJECTS"
              value={stats.totalProjects}
              icon={FolderKanban}
              color="text-brand-cyan"
            />
            <StatCard
              label="PUBLISHED"
              value={stats.publishedProjects}
              icon={Eye}
              color="text-emerald-400"
              subLabel="Live on portfolio"
            />
            <StatCard
              label="DRAFTS"
              value={stats.draftProjects}
              icon={FileEdit}
              color="text-yellow-400"
              subLabel="Not yet published"
            />
            <StatCard
              label="INQUIRIES"
              value={stats.totalRequests}
              icon={MessageSquare}
              color="text-purple-400"
            />
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatCard
              label="NEW REQUESTS"
              value={stats.newRequests}
              icon={TrendingUp}
              color="text-red-400"
              subLabel="Awaiting review"
            />
            <StatCard
              label="IN DISCUSSION"
              value={stats.inDiscussionRequests}
              icon={Clock}
              color="text-orange-400"
            />
            <StatCard
              label="COMPLETED"
              value={stats.completedRequests}
              icon={CheckCircle}
              color="text-emerald-400"
            />
          </div>

          {/* Availability Card */}
          <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <p className="text-xs text-slate-500 font-mono">CURRENT STATUS</p>
                <p className="text-sm font-semibold text-white mt-0.5">{stats.availability}</p>
              </div>
              <Link
                to="/admin/settings"
                className="ml-auto text-xs text-brand-cyan hover:underline"
              >
                Edit →
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-sm font-bold text-white font-mono mb-4">QUICK ACTIONS</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { to: '/admin/projects/new', label: 'Add New Project', icon: Plus, color: 'text-brand-cyan' },
                { to: '/admin/projects', label: 'Manage Projects', icon: FolderKanban, color: 'text-slate-300' },
                { to: '/admin/project-requests', label: 'View Inquiries', icon: MessageSquare, color: 'text-slate-300' },
                { to: '/admin/settings', label: 'Portfolio Settings', icon: RefreshCw, color: 'text-slate-300' },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="flex items-center gap-3 p-4 rounded-xl bg-dark-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/30 transition-all group"
                  >
                    <Icon className={`w-4 h-4 ${action.color} group-hover:text-brand-cyan transition-colors`} />
                    <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{action.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-slate-500 py-12">Failed to load dashboard data.</div>
      )}
    </div>
  );
};
