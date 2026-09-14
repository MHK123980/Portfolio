import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Layers, Sparkles } from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSelectForInquiry: (serviceName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectForInquiry,
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-950/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-dark-900 border border-slate-700/70 rounded-2xl shadow-2xl overflow-y-auto z-10 flex flex-col"
        >
          {/* Sticky Modal Top Bar */}
          <div className="sticky top-0 z-20 px-6 py-4 bg-dark-900/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-semibold">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                // {project.status}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close project modal"
              className="p-2 rounded-lg bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white border border-slate-700/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body Content */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Title & Tagline */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-normal">
                {project.tagline}
              </p>
            </div>

            {/* Featured Image / Diagram Preview */}
            <div className="rounded-xl overflow-hidden border border-slate-800 bg-dark-950/60 aspect-[16/9] sm:aspect-[21/9] flex items-center justify-center">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Links / Action bar */}
            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-dark-850 hover:bg-dark-800 text-slate-200 border border-slate-700 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}

              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan border border-brand-cyan/40 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}

              <button
                onClick={() => {
                  onClose();
                  onSelectForInquiry(
                    project.category === 'Android'
                      ? 'Android App Development'
                      : 'Full-Stack Development'
                  );
                }}
                className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 hover:opacity-95 shadow-md shadow-brand-cyan/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Build Something Similar</span>
              </button>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Technologies &amp; Architecture</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-md text-xs font-mono bg-dark-950 border border-slate-800 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white">Project Overview</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Problem & Solution (if available) */}
            {(project.problem || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {project.problem && (
                  <div className="p-5 rounded-xl bg-dark-950/80 border border-slate-800">
                    <div className="flex items-center gap-2 text-yellow-400 text-sm font-semibold mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>The Problem &amp; Friction</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div className="p-5 rounded-xl bg-dark-950/80 border border-slate-800">
                    <div className="flex items-center gap-2 text-brand-cyan text-sm font-semibold mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>The Engineered Solution</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-white mb-3">Key Features Implemented</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-dark-950/60 border border-slate-800/80 flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Role & Engineering Contribution */}
            {project.roleContribution && (
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white">My Contribution &amp; Role</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.roleContribution}
                </p>
              </div>
            )}

            {/* Technical Challenges & Outcome */}
            {(project.challenges || project.outcome) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                {project.challenges && (
                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">
                      Key Technical Challenges
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.challenges}
                    </p>
                  </div>
                )}

                {project.outcome && (
                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">Outcome</h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Gallery Images (if available) */}
            {project.galleryImages && project.galleryImages.length > 1 && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Architecture &amp; Flow Diagram
                </h3>
                <div className="rounded-xl overflow-hidden border border-slate-800 bg-dark-950/60 p-2">
                  <img
                    src={project.galleryImages[1]}
                    alt={`${project.title} diagram`}
                    className="w-full h-auto object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
