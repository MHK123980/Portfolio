import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Cpu,
  Code2,
  Boxes,
  Database,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { valuePropositionsData } from '../../data/whyWorkWithMe';

const iconMap: Record<string, any> = {
  MessageSquare,
  Cpu,
  Code2,
  Boxes,
  Database,
  ShieldCheck,
};

export const WhyWorkWithMe: React.FC = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// CLIENT VALUE"
          title="Why Work With Me on"
          highlight="Your Next Product"
          description="Direct engineering collaboration focused on maintainable architectures, transparent communication, and production-grade delivery."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valuePropositionsData.map((val, idx) => {
            const Icon = iconMap[val.iconName] || Sparkles;
            return (
              <motion.div
                key={val.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 sm:p-7 rounded-2xl glass-card border border-slate-800/80 hover:border-brand-cyan/40 hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-dark-900 border border-slate-700/60 text-brand-cyan flex items-center justify-center mb-5 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{val.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {val.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
