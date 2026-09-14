import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft, Filter, Loader2, ServerCrash } from 'lucide-react';
import { getPublicProjects } from '../lib/api';
import { Project } from '../types';

const CATEGORIES = ['All', 'Android', 'Web', 'Full-Stack'];

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    document.title = 'All Projects | MHK Portfolio';
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await getPublicProjects();
    if (res.success && res.data) {
      setProjects(res.data);
    } else {
      setError(res.message || 'Failed to load projects.');
    }
    setLoading(false);
  };

  const filtered =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Android': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Web': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Full-Stack': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-cyan transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          All{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">
            Projects
          </span>
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Production projects, open-source tools, and engineering case studies — all published and
          available for review.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-2 mb-10 flex-wrap">
        <Filter className="w-4 h-4 text-slate-500" />
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-brand-cyan text-dark-950 shadow-md shadow-brand-cyan/20'
                : 'bg-dark-900/80 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-xs text-slate-500 font-mono">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center min-h-[300px] gap-3 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin text-brand-cyan" />
          <span>Loading projects...</span>
        </div>
      )}

      {!loading && error && (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center">
          <ServerCrash className="w-12 h-12 text-slate-600" />
          <p className="text-slate-400">{error}</p>
          <button
            onClick={fetchProjects}
            className="px-4 py-2 rounded-xl bg-dark-900 border border-slate-800 text-slate-300 hover:text-white text-sm"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[300px] gap-4 text-center">
          <p className="text-slate-500 text-lg">No projects found in this category.</p>
        </div>
      )}

      {!loading && !error && (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group bg-dark-900/80 border border-slate-800 rounded-2xl overflow-hidden hover:border-brand-cyan/30 hover:shadow-lg hover:shadow-brand-cyan/5 transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-video bg-dark-950 relative overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700 text-4xl font-bold font-mono">
                      {project.title.charAt(0)}
                    </div>
                  )}
                  {project.featured && (
                    <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-mono font-semibold bg-brand-cyan text-dark-950 rounded-md">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded-md border ${getCategoryColor(project.category)}`}>
                      {project.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{project.status}</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.tagline || project.description}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 text-[10px] bg-dark-950 border border-slate-800 text-slate-400 rounded-md font-mono">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 text-[10px] text-slate-500 font-mono">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="flex-1 py-2 text-center text-xs font-semibold text-brand-cyan border border-brand-cyan/30 rounded-xl hover:bg-brand-cyan/10 transition-colors"
                    >
                      View Case Study
                    </Link>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-white border border-slate-800 rounded-xl hover:bg-slate-800/60 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-brand-cyan border border-slate-800 rounded-xl hover:bg-slate-800/60 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};
