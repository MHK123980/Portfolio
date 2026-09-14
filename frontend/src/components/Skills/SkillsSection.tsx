import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Box, ListFilter, Smartphone, Layout, Database, Wrench } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { skillsData, skillCategories } from '../../data/skills';
import { SkillsCanvas } from '../3d/SkillsCanvas';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | '3d'>('grid');

  const categoryIcons: Record<string, any> = {
    'Mobile Development': Smartphone,
    'Web Development': Layout,
    'Backend & Database': Database,
    'Tools & Platforms': Wrench,
  };

  const filteredSkills =
    activeCategory === 'All'
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// TECHNICAL PROFICIENCY"
          title="Technologies &amp;"
          highlight="Tooling Ecosystem"
          description="Disciplined expertise across native mobile engineering, modern web frontends, and resilient backend systems."
        />

        {/* View Switcher & Category Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-800/60">
          {/* Categories Tab Pill Bar */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 p-1 rounded-xl bg-dark-900/80 border border-slate-800">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === 'All'
                  ? 'bg-brand-cyan text-dark-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Tech
            </button>
            {skillCategories.map((cat) => {
              const Icon = categoryIcons[cat];
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-brand-cyan text-dark-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Grid vs 3D Constellation View Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-dark-900/80 border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-slate-700 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('3d')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === '3d'
                  ? 'bg-brand-cyan text-dark-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>3D Constellation</span>
            </button>
          </div>
        </div>

        {/* View Mode Rendering */}
        {viewMode === '3d' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <SkillsCanvas />
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredSkills.map((skill) => {
                const Icon = categoryIcons[skill.category] || Sparkles;
                return (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-xl glass-card border border-slate-800/80 hover:border-brand-cyan/40 hover:-translate-y-1 transition-all group shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 rounded-lg bg-dark-900 border border-slate-700/60 text-brand-cyan flex items-center justify-center group-hover:border-brand-cyan/50 group-hover:shadow-glow-cyan transition-all">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-900 text-slate-400 border border-slate-800">
                        {skill.tag || skill.category}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-white group-hover:text-brand-cyan transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{skill.category}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
