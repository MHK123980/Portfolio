import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Clock,
  DollarSign,
  MessageSquare,
  Shield,
} from 'lucide-react';
import { ProjectModalForm } from '../components/Contact/ProjectModalForm';
import { servicesData } from '../data/services';

const WHY_ITEMS = [
  { icon: CheckCircle2, title: 'Quality Guaranteed', desc: 'Production-ready code with clean architecture and proper documentation.' },
  { icon: Clock, title: 'On-Time Delivery', desc: 'Clear milestones and consistent communication throughout the project.' },
  { icon: Shield, title: 'Full Transparency', desc: 'Regular progress updates, open source code, and no hidden surprises.' },
  { icon: MessageSquare, title: 'Clear Communication', desc: 'Responsive, professional communication in English across time zones.' },
];

export const HireMePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Android App Development');

  useEffect(() => {
    document.title = 'Hire Me | MHK Portfolio';
  }, []);

  const handleSelectService = (service: string) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-24">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-brand-cyan transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        <div className="max-w-3xl">
          <span className="px-3 py-1 text-xs font-mono text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 rounded-lg mb-4 inline-block">
            // AVAILABLE FOR PROJECTS
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Let's Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">
              Exceptional
            </span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            I'm available for freelance projects, remote work, and long-term collaborations. Whether
            you need a native Android app, full-stack web system, or reliable backend API — let's
            talk about your vision.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Services */}
          <div className="lg:col-span-3 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Services I Offer</h2>
              <div className="space-y-4">
                {servicesData.map((srv, idx) => (
                  <motion.div
                    key={srv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className="group p-5 rounded-2xl bg-dark-900/80 border border-slate-800 hover:border-brand-cyan/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors">
                            {srv.title}
                          </h3>
                          {srv.badge && (
                            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 rounded-md">
                              {srv.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{srv.shortDesc}</p>
                        {srv.deliverables && srv.deliverables.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {srv.deliverables.slice(0, 3).map((d) => (
                              <span
                                key={d}
                                className="px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-dark-950 border border-slate-800 rounded-md"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleSelectService(srv.title)}
                        className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold text-brand-cyan border border-brand-cyan/30 rounded-xl hover:bg-brand-cyan/10 transition-colors"
                      >
                        Request
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Why work with me */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Why Work With Me</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {WHY_ITEMS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.08 }}
                      className="p-4 rounded-xl bg-dark-900/80 border border-slate-800"
                    >
                      <Icon className="w-5 h-5 text-brand-cyan mb-2" />
                      <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: CTA Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="sticky top-28">
              {/* Main CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-brand-cyan/10 to-brand-blue/10 border border-brand-cyan/20 space-y-5"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400">Available for Projects</span>
                </div>
                <h3 className="text-xl font-bold text-white">Start Your Project</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Submit a project request and I'll review it within 24 hours. No commitment required for the initial consultation.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <DollarSign className="w-4 h-4 text-slate-500" />
                    <span>Flexible budget options</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span>Quick turnaround</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Shield className="w-4 h-4 text-slate-500" />
                    <span>NDA available on request</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3 rounded-xl bg-brand-cyan text-dark-950 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <Sparkles className="w-4 h-4" />
                  Submit Project Request
                </button>
              </motion.div>

              {/* Or browse projects */}
              <div className="mt-4 p-4 rounded-xl bg-dark-900 border border-slate-800 text-center">
                <p className="text-xs text-slate-500 mb-3">Want to see my work first?</p>
                <Link
                  to="/projects"
                  className="text-sm font-semibold text-brand-cyan hover:underline"
                >
                  Browse All Projects →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProjectModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preSelectedService={selectedService}
      />
    </div>
  );
};
