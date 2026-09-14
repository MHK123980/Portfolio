import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlight,
  description,
  align = 'center',
}) => {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === 'center' ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'
      }`}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-xs font-mono tracking-wider uppercase bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
          {badge}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white"
      >
        {title}{' '}
        {highlight && (
          <span className="text-gradient-cyan">
            {highlight}
          </span>
        )}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};
