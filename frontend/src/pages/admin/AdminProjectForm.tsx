import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Plus, X, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { adminCreateProject, adminUpdateProject, adminGetProjectById } from '../../lib/api';
import { Project } from '../../types';

const CATEGORIES = ['Android', 'Web', 'Full-Stack'];
const STATUSES = ['Production', 'Active Development', 'Completed', 'Case Study'];

const EMPTY_FORM: Partial<Project> & { adminNotes: string } = {
  title: '',
  tagline: '',
  description: '',
  overview: '',
  problem: '',
  solution: '',
  category: 'Android',
  status: 'Completed',
  technologies: [],
  keyFeatures: [],
  challenges: '',
  outcome: '',
  roleContribution: '',
  githubUrl: '',
  liveDemoUrl: '',
  image: '',
  galleryImages: [],
  featured: false,
  published: false,
  adminNotes: '',
};

export const AdminProjectForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditing);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Tag input state
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [galleryInput, setGalleryInput] = useState('');

  useEffect(() => {
    document.title = isEditing ? 'Edit Project | Admin' : 'New Project | Admin';
    if (isEditing && id) fetchProject(id);
  }, [id]);

  const fetchProject = async (projectId: string) => {
    setFetching(true);
    const res = await adminGetProjectById(projectId);
    if (res.success && res.data) {
      const p = res.data;
      setForm({
        ...EMPTY_FORM,
        ...p,
        tagline: p.tagline || (p as any).shortDescription || '',
        overview: p.overview || (p as any).fullDescription || '',
        image: p.image || (p as any).thumbnail || '',
        galleryImages: p.galleryImages || (p as any).gallery || [],
        adminNotes: (p as any).adminNotes || '',
      });
    } else {
      setError('Failed to load project.');
    }
    setFetching(false);
  };

  const set = (key: keyof typeof form, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addTag = (key: 'technologies' | 'keyFeatures' | 'galleryImages', val: string, clear: () => void) => {
    const trimmed = val.trim();
    if (!trimmed) return;
    const current = (form[key] as string[]) || [];
    if (!current.includes(trimmed)) {
      set(key, [...current, trimmed]);
    }
    clear();
  };

  const removeTag = (key: 'technologies' | 'keyFeatures' | 'galleryImages', val: string) => {
    const current = (form[key] as string[]) || [];
    set(key, current.filter((t) => t !== val));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title?.trim()) {
      setError('Project title is required.');
      return;
    }

    setLoading(true);
    setError('');

    const shortDesc = form.tagline?.trim() || form.description?.trim() || form.title?.trim() || '';
    const fullDesc = form.overview?.trim() || form.description?.trim() || shortDesc;
    const thumbnail = form.image?.trim() || '/images/projects/xora-preview.svg';
    const gallery = form.galleryImages && form.galleryImages.length > 0 ? form.galleryImages : [thumbnail];

    const payload: any = {
      ...form,
      title: form.title?.trim(),
      tagline: shortDesc,
      shortDescription: shortDesc,
      description: form.description?.trim() || shortDesc,
      overview: fullDesc,
      fullDescription: fullDesc,
      thumbnail,
      image: thumbnail,
      gallery,
      galleryImages: gallery,
      technologies: form.technologies && form.technologies.length > 0 ? form.technologies : ['Software Development'],
      category: form.category || 'Android',
      status: form.status || 'Completed',
    };

    const res = isEditing
      ? await adminUpdateProject(id!, payload)
      : await adminCreateProject(payload);

    if (res.success && res.data) {
      setSuccess(isEditing ? 'Project updated successfully!' : 'Project created!');
      setTimeout(() => navigate('/admin/projects'), 1500);
    } else {
      const detailedErrors = res.errors
        ? Object.entries(res.errors)
            .map(([field, msg]) => `${field}: ${msg}`)
            .join(' | ')
        : '';
      setError(detailedErrors ? `${res.message} (${detailedErrors})` : res.message || 'Failed to save project.');
    }
    setLoading(false);
  };

  const inputCls = 'w-full px-4 py-3 rounded-xl bg-dark-950 border border-slate-800 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-brand-cyan/50 focus:ring-1 focus:ring-brand-cyan/20 transition-all';
  const labelCls = 'block text-xs font-mono text-slate-400 mb-1.5';

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px] gap-3 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin text-brand-cyan" />
        <span>Loading project...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/projects" className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">{isEditing ? 'Edit Project' : 'New Project'}</h1>
          <p className="text-sm text-slate-500 mt-0.5">{isEditing ? `Editing project ID: ${id}` : 'Add a new project to your portfolio'}</p>
        </div>
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

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Core Info */}
        <section className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-5">
          <h2 className="text-sm font-bold text-white font-mono">CORE INFORMATION</h2>
          <div>
            <label className={labelCls}>TITLE *</label>
            <input
              className={inputCls}
              value={form.title || ''}
              onChange={(e) => set('title', e.target.value)}
              placeholder="e.g. XORA — Multi-Vendor Marketplace"
            />
          </div>
          <div>
            <label className={labelCls}>TAGLINE *</label>
            <input
              className={inputCls}
              value={form.tagline || ''}
              onChange={(e) => set('tagline', e.target.value)}
              placeholder="Short compelling description"
            />
          </div>
          <div>
            <label className={labelCls}>DESCRIPTION</label>
            <textarea
              className={`${inputCls} h-20 resize-none`}
              value={form.description || ''}
              onChange={(e) => set('description', e.target.value)}
              placeholder="Brief project summary..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>CATEGORY</label>
              <select
                className={inputCls}
                value={form.category || 'Android'}
                onChange={(e) => set('category', e.target.value)}
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>STATUS</label>
              <select
                className={inputCls}
                value={form.status || 'Completed'}
                onChange={(e) => set('status', e.target.value)}
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.featured}
                onChange={(e) => set('featured', e.target.checked)}
                className="w-4 h-4 accent-brand-cyan"
              />
              <span className="text-sm text-slate-300">Featured project</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.published}
                onChange={(e) => set('published', e.target.checked)}
                className="w-4 h-4 accent-brand-cyan"
              />
              <span className="text-sm text-slate-300">Publish immediately</span>
            </label>
          </div>
        </section>

        {/* Case Study */}
        <section className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-5">
          <h2 className="text-sm font-bold text-white font-mono">CASE STUDY CONTENT</h2>
          <div>
            <label className={labelCls}>OVERVIEW *</label>
            <textarea
              className={`${inputCls} h-28 resize-none`}
              value={form.overview || ''}
              onChange={(e) => set('overview', e.target.value)}
              placeholder="Detailed project overview..."
            />
          </div>
          <div>
            <label className={labelCls}>THE PROBLEM</label>
            <textarea
              className={`${inputCls} h-24 resize-none`}
              value={form.problem || ''}
              onChange={(e) => set('problem', e.target.value)}
              placeholder="What problem did this project solve?"
            />
          </div>
          <div>
            <label className={labelCls}>THE SOLUTION</label>
            <textarea
              className={`${inputCls} h-24 resize-none`}
              value={form.solution || ''}
              onChange={(e) => set('solution', e.target.value)}
              placeholder="How did you approach and solve it?"
            />
          </div>
          <div>
            <label className={labelCls}>CHALLENGES & LEARNINGS</label>
            <textarea
              className={`${inputCls} h-24 resize-none`}
              value={form.challenges || ''}
              onChange={(e) => set('challenges', e.target.value)}
              placeholder="Technical or design challenges encountered..."
            />
          </div>
          <div>
            <label className={labelCls}>OUTCOME & IMPACT</label>
            <textarea
              className={`${inputCls} h-24 resize-none`}
              value={form.outcome || ''}
              onChange={(e) => set('outcome', e.target.value)}
              placeholder="Results, metrics, or business impact..."
            />
          </div>
          <div>
            <label className={labelCls}>YOUR ROLE / CONTRIBUTION</label>
            <input
              className={inputCls}
              value={form.roleContribution || ''}
              onChange={(e) => set('roleContribution', e.target.value)}
              placeholder="e.g. Lead Developer, Backend Engineer"
            />
          </div>
        </section>

        {/* Tech Stack */}
        <section className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white font-mono">TECH STACK</h2>
          <div className="flex gap-2">
            <input
              className={`${inputCls} flex-1`}
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag('technologies', techInput, () => setTechInput('')); } }}
              placeholder="Type technology and press Enter"
            />
            <button
              type="button"
              onClick={() => addTag('technologies', techInput, () => setTechInput(''))}
              className="px-3 py-2 rounded-xl bg-dark-950 border border-slate-800 text-slate-400 hover:text-brand-cyan transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(form.technologies || []).map((tech) => (
              <span key={tech} className="flex items-center gap-1.5 px-2.5 py-1 text-xs bg-dark-950 border border-slate-800 text-slate-300 rounded-lg font-mono">
                {tech}
                <button type="button" onClick={() => removeTag('technologies', tech)} className="text-slate-600 hover:text-red-400 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white font-mono">KEY FEATURES</h2>
          <div className="flex gap-2">
            <input
              className={`${inputCls} flex-1`}
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag('keyFeatures', featureInput, () => setFeatureInput('')); } }}
              placeholder="Type feature and press Enter"
            />
            <button
              type="button"
              onClick={() => addTag('keyFeatures', featureInput, () => setFeatureInput(''))}
              className="px-3 py-2 rounded-xl bg-dark-950 border border-slate-800 text-slate-400 hover:text-brand-cyan transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <ul className="space-y-2">
            {(form.keyFeatures || []).map((feat, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                <span className="w-5 h-5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <span className="flex-1">{feat}</span>
                <button type="button" onClick={() => removeTag('keyFeatures', feat)} className="text-slate-600 hover:text-red-400 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Media */}
        <section className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-5">
          <h2 className="text-sm font-bold text-white font-mono">MEDIA & LINKS</h2>
          <div>
            <label className={labelCls}>COVER IMAGE URL</label>
            <input
              className={inputCls}
              value={form.image || ''}
              onChange={(e) => set('image', e.target.value)}
              placeholder="https://..."
            />
          </div>
          <div>
            <label className={labelCls}>GALLERY IMAGES (add URLs)</label>
            <div className="flex gap-2 mb-2">
              <input
                className={`${inputCls} flex-1`}
                value={galleryInput}
                onChange={(e) => setGalleryInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag('galleryImages', galleryInput, () => setGalleryInput('')); } }}
                placeholder="https://..."
              />
              <button
                type="button"
                onClick={() => addTag('galleryImages', galleryInput, () => setGalleryInput(''))}
                className="px-3 py-2 rounded-xl bg-dark-950 border border-slate-800 text-slate-400 hover:text-brand-cyan transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {(form.galleryImages || []).map((img, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="flex-1 truncate font-mono">{img}</span>
                  <button type="button" onClick={() => removeTag('galleryImages', img)} className="text-slate-600 hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>GITHUB URL</label>
              <input
                className={inputCls}
                value={form.githubUrl || ''}
                onChange={(e) => set('githubUrl', e.target.value)}
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className={labelCls}>LIVE DEMO URL</label>
              <input
                className={inputCls}
                value={form.liveDemoUrl || ''}
                onChange={(e) => set('liveDemoUrl', e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        </section>

        {/* Admin Notes */}
        <section className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
          <div>
            <h2 className="text-sm font-bold text-white font-mono">PRIVATE ADMIN NOTES</h2>
            <p className="text-xs text-slate-500 mt-0.5">These notes are NEVER visible publicly.</p>
          </div>
          <textarea
            className={`${inputCls} h-24 resize-none`}
            value={form.adminNotes || ''}
            onChange={(e) => set('adminNotes', e.target.value)}
            placeholder="Internal notes about this project..."
          />
        </section>

        {/* Submit */}
        <div className="flex items-center gap-4 pb-8">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-cyan text-dark-950 font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Project'}
          </button>
          <Link
            to="/admin/projects"
            className="px-6 py-3 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-sm font-semibold transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
