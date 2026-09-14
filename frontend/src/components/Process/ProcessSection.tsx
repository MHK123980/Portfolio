import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { processStepsData } from '../../data/process';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// METHODOLOGY"
          title="From Concept to Delivery:"
          highlight="A Disciplined Process"
          description="A structured 7-stage engineering methodology ensuring predictability, code quality, and on-time project completion."
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {processStepsData.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="p-6 rounded-2xl glass-card border border-slate-800/80 hover:border-brand-cyan/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-brand-cyan">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    PHASE {idx + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal mb-5">
                  {step.summary}
                </p>
              </div>

              {/* Detail check list */}
              <div className="space-y-2 pt-4 border-t border-slate-800/80">
                {step.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
