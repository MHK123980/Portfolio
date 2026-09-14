import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { experienceData } from '../../data/experience';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// PROFESSIONAL TIMELINE"
          title="Engineering Milestones &amp;"
          highlight="Development Journey"
          description="A transparent record of software projects, independent contract work, and focused technical development."
        />

        {/* Timeline Items */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-10">
          {experienceData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-10"
            >
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-dark-950 border-2 border-brand-cyan shadow-sm shadow-brand-cyan" />

              {/* Experience Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800/80 hover:border-brand-cyan/30 transition-all">
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {item.role}
                    </h3>
                    <span className="text-sm font-medium text-brand-cyan flex items-center gap-1.5 mt-0.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      {item.organization}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-400 bg-dark-900/80 px-2.5 py-1 rounded-full border border-slate-800">
                      <Calendar className="w-3 h-3 text-brand-blue" />
                      {item.period}
                    </span>
                    <span className="text-[11px] font-mono text-brand-indigo px-2.5 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/20">
                      {item.type}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-4">
                  {item.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2 mb-5">
                  {item.highlights.map((high, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                      <span>{high}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies used */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-dark-900 text-slate-400 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
