import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Github, Linkedin, Mail, Layers, Smartphone } from 'lucide-react';
import { HeroScene } from '../3d/HeroScene';
import { profileData } from '../../data/profile';

interface HeroSectionProps {
  onOpenHireModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenHireModal }) => {
  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      {/* 3D Canvas Background */}
      <HeroScene />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide bg-dark-900/80 border border-emerald-500/30 text-emerald-400 backdrop-blur-md mb-6 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>{profileData.availability}</span>
        </motion.div>

        {/* Primary Role & Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
        >
          <span className="block text-slate-100">{profileData.name}</span>
          <span className="text-gradient-cyan block mt-1 sm:mt-2 text-3xl sm:text-5xl md:text-6xl">
            {profileData.role}
          </span>
        </motion.h1>

        {/* Supporting Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          {profileData.supportingMessage}
        </motion.p>

        {/* Core Pillars Pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-slate-400"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-dark-900/70 border border-slate-800">
            <Smartphone className="w-3.5 h-3.5 text-brand-cyan" /> Native Android (Kotlin)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-dark-900/70 border border-slate-800">
            <Layers className="w-3.5 h-3.5 text-brand-blue" /> Modern Web (React &amp; TS)
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-dark-900/70 border border-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-brand-violet" /> REST APIs &amp; PostgreSQL
          </span>
        </motion.div>

        {/* Primary CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto sm:max-w-none"
        >
          <button
            onClick={onOpenHireModal}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 hover:opacity-95 shadow-lg shadow-brand-cyan/25 hover:shadow-brand-cyan/40 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Hire Me</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={scrollToProjects}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base bg-dark-900/80 hover:bg-dark-850 text-white border border-slate-700/80 hover:border-brand-cyan/50 backdrop-blur-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>View My Work</span>
          </button>
        </motion.div>

        {/* Social / Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 pt-6 border-t border-slate-800/60 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs sm:text-sm text-slate-400"
        >
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-brand-cyan transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-brand-cyan transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-1.5 hover:text-brand-cyan transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
