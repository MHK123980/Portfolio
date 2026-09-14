import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, Sparkles } from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenModal: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onClick={() => onOpenModal(project)}
      className="cursor-pointer glass-card rounded-2xl overflow-hidden border border-slate-800/80 hover:border-brand-cyan/40 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between shadow-lg group relative"
    >
      {/* Featured Ribbon */}
      {project.featured && (
        <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-cyan text-dark-950 shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>FEATURED SHOWCASE</span>
        </div>
      )}

      {/* Image / Mockup Preview */}
      <div className="relative aspect-[16/10] overflow-hidden bg-dark-950/80 border-b border-slate-800/80">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-80" />

        <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
          <span className="p-2 rounded-lg bg-dark-900/90 text-slate-300 group-hover:text-brand-cyan group-hover:bg-brand-cyan/10 transition-colors border border-slate-700/60 shadow-sm">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Status */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span className="text-xs font-mono font-semibold text-brand-cyan">
              {project.category}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {project.status}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors line-clamp-1 mb-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed font-normal mb-5">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills & Links */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-dark-900 text-slate-400 border border-slate-800"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-dark-900 text-slate-400 border border-slate-800">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-brand-cyan group-hover:underline">
              Inspect Case Study &rarr;
            </span>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="p-1.5 hover:text-white transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </span>
              )}
              {project.liveDemoUrl && (
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.liveDemoUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="p-1.5 hover:text-white transition-colors"
                  title="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
