import React from 'react';
import { Terminal, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { profileData } from '../../data/profile';
import { servicesData } from '../../data/services';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Process', id: 'process' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-dark-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-dark-900 border border-slate-800 text-brand-cyan flex items-center justify-center">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                {profileData.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
              {profileData.role} specialized in native Android engineering, modern web applications,
              and high-performance REST backend services.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-dark-900 border border-slate-800 hover:text-brand-cyan hover:border-slate-700 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-dark-900 border border-slate-800 hover:text-brand-cyan hover:border-slate-700 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${profileData.email}`}
                className="p-2 rounded-lg bg-dark-900 border border-slate-800 hover:text-brand-cyan hover:border-slate-700 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-brand-cyan transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Col */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Specialized Services
            </h4>
            <ul className="space-y-2 text-xs">
              {servicesData.slice(0, 5).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="hover:text-brand-cyan transition-colors text-left line-clamp-1"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Status / Quick Return */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono uppercase text-white font-semibold tracking-wider">
              Status
            </h4>
            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 space-y-1 text-xs">
              <span className="text-[11px] text-slate-400 block">Current Availability:</span>
              <span className="text-emerald-400 font-mono font-medium block">
                {profileData.availability}
              </span>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-cyan transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>&copy; {currentYear} {profileData.name}. All rights reserved.</p>
          <p>Built with React, TypeScript, Three.js &amp; Node.js Express</p>
        </div>
      </div>
    </footer>
  );
};
