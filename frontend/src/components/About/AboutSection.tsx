import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Terminal, Code, Cpu, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { profileData } from '../../data/profile';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      title: 'Native Android Architecture',
      desc: 'Deep focus on Kotlin, Jetpack Compose, MVVM, Room SQLite, and Coroutines.',
      icon: Cpu,
    },
    {
      title: 'Modern Web Engineering',
      desc: 'Type-safe frontend development with React, TypeScript, and clean UI components.',
      icon: Code,
    },
    {
      title: 'Backend & Data Integrity',
      desc: 'REST APIs built with Node.js/Express, and PostgreSQL schemas with Row Level Security.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// ABOUT ME"
          title="Engineering Focused on"
          highlight="Quality & Reliability"
          description="A dedicated software developer building modern Android apps, web applications, and backend systems."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Interactive Terminal/Developer Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="glass-card rounded-2xl overflow-hidden border border-slate-700/60 shadow-xl">
              {/* Window Header */}
              <div className="bg-dark-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Terminal className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>developer_env.ts</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  ONLINE
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 space-y-2 bg-dark-950/80 overflow-x-auto">
                <div>
                  <span className="text-brand-violet">const</span>{' '}
                  <span className="text-brand-cyan">developer</span> = &#123;
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">name:</span>{' '}
                  <span className="text-emerald-300">&quot;{profileData.name}&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">role:</span>{' '}
                  <span className="text-emerald-300">&quot;{profileData.role}&quot;</span>,
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">specialization:</span> [
                  <span className="text-yellow-300">&quot;Android&quot;</span>,{' '}
                  <span className="text-yellow-300">&quot;Web Apps&quot;</span>,{' '}
                  <span className="text-yellow-300">&quot;Backend APIs&quot;</span>],
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">primaryLanguages:</span> [
                  <span className="text-yellow-300">&quot;Kotlin&quot;</span>,{' '}
                  <span className="text-yellow-300">&quot;TypeScript&quot;</span>,{' '}
                  <span className="text-yellow-300">&quot;SQL&quot;</span>],
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">database:</span> [
                  <span className="text-yellow-300">&quot;PostgreSQL&quot;</span>,{' '}
                  <span className="text-yellow-300">&quot;Supabase&quot;</span>],
                </div>
                <div className="pl-4">
                  <span className="text-slate-400">workStatus:</span>{' '}
                  <span className="text-emerald-400">&quot;Open to remote &amp; freelance&quot;</span>
                </div>
                <div>&#125;;</div>
                <div className="pt-2 text-slate-500">
                  <span className="text-brand-cyan">//</span> Ready to architect production systems
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio Narrative & Value Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4 text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
              {profileData.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Structured Highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-dark-900/60 border border-slate-800/80 hover:border-brand-cyan/30 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-normal">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Principles */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                <span>Clean MVVM &amp; Component Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                <span>Type Safety &amp; Reliable Validation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                <span>Direct &amp; Transparent Communication</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
