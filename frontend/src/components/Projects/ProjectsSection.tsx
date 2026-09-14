import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { projectsData } from '../../data/projects';
import { ProjectItem } from '../../types';

interface ProjectsSectionProps {
  onSelectForInquiry: (serviceName: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectForInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Android', 'Web', 'Full-Stack'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// FEATURED WORKS & CASE STUDIES"
          title="Engineered Products &amp;"
          highlight="Software Projects"
          description="Explore production projects showcasing native mobile engineering, relational database architectures, and responsive web platforms."
        />

        {/* Filter Category Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          {categories.map((cat) => (
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
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpenModal={(proj) => setActiveModalProject(proj)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All CTA */}
        <div className="flex justify-center mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10 font-semibold text-sm transition-all group"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onSelectForInquiry={onSelectForInquiry}
      />
    </section>
  );
};
