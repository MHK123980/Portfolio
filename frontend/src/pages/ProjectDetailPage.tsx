import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Tag,
  Calendar,
  Globe,
  Loader2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { getProjectBySlug } from '../lib/api';
import { Project } from '../types';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) fetchProject(slug);
  }, [slug]);

  const fetchProject = async (s: string) => {
    setLoading(true);
    setError('');
    const res = await getProjectBySlug(s);
    if (res.success && res.data) {
      setProject(res.data);
      document.title = `${res.data.title} | MHK Portfolio`;
    } else {
      setError(res.message || 'Project not found.');
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3 text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin text-brand-cyan" />
        <span>Loading project...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <AlertTriangle className="w-12 h-12 text-yellow-500/70" />
        <h1 className="text-2xl font-bold text-white">Project Not Found</h1>
        <p className="text-slate-400 max-w-md">{error || 'This project does not exist or has been removed.'}</p>
        <Link
          to="/projects"
          className="mt-2 px-6 py-2.5 rounded-xl bg-brand-cyan text-dark-950 font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Back to All Projects
        </Link>
      </div>
    );
  }

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Android': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Web': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Full-Stack': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Hero Banner */}
      <div className="relative mb-12 overflow-hidden">
        {project.image && (
          <div className="absolute inset-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover opacity-10 scale-105 blur-sm"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/60 via-dark-950/80 to-dark-950" />
          </div>
        )}
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-cyan transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg border ${getCategoryColor(project.category)}`}>
              {project.category}
            </span>
            <span className="px-3 py-1 text-xs font-mono text-slate-500 bg-dark-900 border border-slate-800 rounded-lg">
              {project.status}
            </span>
            {project.featured && (
              <span className="px-3 py-1 text-xs font-mono font-semibold bg-brand-cyan text-dark-950 rounded-lg">
                FEATURED
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">{project.tagline}</p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-cyan text-dark-950 font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 font-semibold text-sm transition-all"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            )}
            <Link
              to="/hire-me"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10 font-semibold text-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Hire Me for Similar
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left: Main Case Study */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-brand-cyan" />
                Project Overview
              </h2>
              <p className="text-slate-300 leading-relaxed">{project.overview}</p>
            </motion.section>

            {/* Problem */}
            {project.problem && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">The Problem</h2>
                <div className="p-5 rounded-xl bg-red-900/10 border border-red-900/20">
                  <p className="text-slate-300 leading-relaxed">{project.problem}</p>
                </div>
              </motion.section>
            )}

            {/* Solution */}
            {project.solution && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">The Solution</h2>
                <div className="p-5 rounded-xl bg-emerald-900/10 border border-emerald-900/20">
                  <p className="text-slate-300 leading-relaxed">{project.solution}</p>
                </div>
              </motion.section>
            )}

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-brand-cyan" />
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-5 h-5 flex-shrink-0 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-[10px] font-bold flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-slate-300 text-sm leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>
            )}

            {/* Challenges */}
            {project.challenges && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">Challenges & Learnings</h2>
                <p className="text-slate-300 leading-relaxed">{project.challenges}</p>
              </motion.section>
            )}

            {/* Outcome */}
            {project.outcome && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">Outcome & Impact</h2>
                <div className="p-5 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20">
                  <p className="text-slate-300 leading-relaxed">{project.outcome}</p>
                </div>
              </motion.section>
            )}

            {/* Gallery */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="text-xl font-bold text-white mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.galleryImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      className="w-full rounded-xl border border-slate-800 object-cover"
                    />
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* Right: Sidebar Details */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="p-5 rounded-xl bg-dark-900 border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 text-brand-cyan" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs bg-dark-950 border border-slate-800 text-slate-300 rounded-lg font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="p-5 rounded-xl bg-dark-900 border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3">Project Info</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-slate-500 text-xs font-mono mb-1">CATEGORY</dt>
                  <dd className="text-slate-200">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-slate-500 text-xs font-mono mb-1">STATUS</dt>
                  <dd className="text-slate-200">{project.status}</dd>
                </div>
                {project.roleContribution && (
                  <div>
                    <dt className="text-slate-500 text-xs font-mono mb-1">MY ROLE</dt>
                    <dd className="text-slate-200 leading-relaxed">{project.roleContribution}</dd>
                  </div>
                )}
                {project.publishedAt && (
                  <div>
                    <dt className="text-slate-500 text-xs font-mono mb-1">PUBLISHED</dt>
                    <dd className="text-slate-200 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {new Date(project.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {/* CTA card */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-brand-cyan/10 to-brand-blue/10 border border-brand-cyan/20">
              <h3 className="text-sm font-bold text-white mb-2">Interested in similar work?</h3>
              <p className="text-xs text-slate-400 mb-4">Let's discuss your project and how I can help.</p>
              <Link
                to="/hire-me"
                className="block w-full py-2.5 text-center text-sm font-semibold text-dark-950 bg-brand-cyan rounded-xl hover:opacity-90 transition-opacity"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
