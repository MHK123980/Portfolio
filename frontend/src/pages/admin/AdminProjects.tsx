import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { adminGetProjects, adminDeleteProject, adminPublishProject, adminUnpublishProject } from '../../lib/api';
import { Project } from '../../types';

export const AdminProjects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    document.title = 'Projects | Admin Panel';
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await adminGetProjects();
    if (res.success && res.data) setProjects(res.data);
    setLoading(false);
  };

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleTogglePublish = async (project: Project) => {
    setActionId(project.id);
    const fn = project.published ? adminUnpublishProject : adminPublishProject;
    const res = await fn(project.id);
    if (res.success && res.data) {
      setProjects((prev) => prev.map((p) => (p.id === project.id ? res.data! : p)));
      showToast(project.published ? 'Project unpublished.' : 'Project published!', 'success');
    } else {
      showToast(res.message || 'Action failed.', 'error');
    }
    setActionId(null);
  };

  const handleDelete = async (project: Project) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    setActionId(project.id);
    const res = await adminDeleteProject(project.id);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== project.id));
      showToast('Project deleted.', 'success');
    } else {
      showToast(res.message || 'Delete failed.', 'error');
    }
    setActionId(null);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Android': return 'text-emerald-400 bg-emerald-900/20 border-emerald-800/40';
      case 'Web': return 'text-blue-400 bg-blue-900/20 border-blue-800/40';
      case 'Full-Stack': return 'text-purple-400 bg-purple-900/20 border-purple-800/40';
      default: return 'text-slate-400 bg-slate-800/40 border-slate-700';
    }
  };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-medium border ${
            toast.type === 'success'
              ? 'bg-dark-900 border-emerald-800/60 text-emerald-400'
              : 'bg-dark-900 border-red-800/60 text-red-400'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {projects.length} total · {projects.filter((p) => p.published).length} published
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchProjects}
            className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-cyan text-dark-950 font-semibold text-sm hover:opacity-90"
          >
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[300px] gap-3 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin text-brand-cyan" />
          <span>Loading projects...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center">
          <p className="text-slate-500">No projects yet.</p>
          <Link
            to="/admin/projects/new"
            className="px-4 py-2 rounded-xl bg-brand-cyan text-dark-950 font-semibold text-sm"
          >
            Add Your First Project
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-dark-900 border border-slate-800 hover:border-slate-700 transition-all group"
            >
              {/* Thumbnail */}
              <div className="w-16 h-12 rounded-xl bg-dark-950 border border-slate-800 flex-shrink-0 overflow-hidden">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 text-lg font-bold font-mono">
                    {project.title.charAt(0)}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="text-sm font-bold text-white truncate">{project.title}</h3>
                  {project.featured && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-semibold bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 rounded flex-shrink-0">
                      FEATURED
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded-md border ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{project.status}</span>
                  <span
                    className={`text-[10px] font-semibold font-mono ${
                      project.published ? 'text-emerald-400' : 'text-yellow-500'
                    }`}
                  >
                    {project.published ? '● LIVE' : '○ DRAFT'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Publish toggle */}
                <button
                  onClick={() => handleTogglePublish(project)}
                  disabled={actionId === project.id}
                  title={project.published ? 'Unpublish' : 'Publish'}
                  className={`p-2 rounded-xl border transition-all ${
                    project.published
                      ? 'border-emerald-800/40 text-emerald-400 hover:bg-red-900/20 hover:text-red-400 hover:border-red-800/40'
                      : 'border-slate-800 text-slate-500 hover:bg-emerald-900/20 hover:text-emerald-400 hover:border-emerald-800/40'
                  }`}
                >
                  {actionId === project.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : project.published ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>

                {/* Edit */}
                <Link
                  to={`/admin/projects/${project.id}/edit`}
                  className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-brand-cyan hover:border-brand-cyan/30 hover:bg-brand-cyan/5 transition-all"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </Link>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(project)}
                  disabled={actionId === project.id}
                  title="Delete"
                  className="p-2 rounded-xl border border-slate-800 text-slate-500 hover:text-red-400 hover:border-red-800/40 hover:bg-red-900/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
