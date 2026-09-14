import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Github,
  Linkedin,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { profileData } from '../../data/profile';
import { submitContactForm } from '../../lib/api';
import { ContactFormData } from '../../types';

interface ContactSectionProps {
  onOpenProjectModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenProjectModal }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await submitContactForm(formData);
      if (res.success) {
        setIsSuccess(true);
      } else {
        if (res.errors) setErrors(res.errors);
        setServerError(res.message || 'Failed to submit message. Please try again.');
      }
    } catch {
      setServerError('An unexpected network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      honeypot: '',
    });
    setErrors({});
    setIsSuccess(false);
    setServerError(null);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// INITIATE DIALOGUE"
          title="Have a Project in Mind?"
          highlight="Let's Build It."
          description="Tell me what you're building and I'll help turn the idea into a working, high-performance product."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left Column: Direct Action & Coordinates */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Start a Project Card */}
            <div className="p-7 rounded-2xl glass-card border border-brand-cyan/30 shadow-glow-cyan relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-cyan uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Fast-Track Proposal</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Detailed Project Inquiry
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                Need a scoped estimate with budget, tech stack, and timeline recommendations?
                Use the dedicated project builder.
              </p>

              <button
                onClick={onOpenProjectModal}
                className="w-full py-3.5 px-5 rounded-xl font-bold text-sm bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 hover:opacity-95 shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-dark-900 border border-slate-800 flex items-center justify-center text-brand-cyan">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-slate-400 uppercase">Direct Email</h4>
                    <p className="text-sm font-semibold text-white">{profileData.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-dark-900 border border-slate-800 text-slate-300 hover:text-brand-cyan transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Availability Status:</span>
                <span className="text-emerald-400 font-mono font-medium">{profileData.availability}</span>
              </div>
            </div>

            {/* Professional Social Links */}
            <div className="p-6 rounded-2xl glass-card border border-slate-800">
              <h4 className="text-xs font-mono text-slate-400 uppercase mb-4">
                Professional Channels
              </h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={profileData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-dark-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>

                <a
                  href={profileData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-dark-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Network</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Direct Quick Contact Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <div className="p-7 sm:p-8 rounded-2xl glass-card border border-slate-800 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                Have a general query, technical question, or prospective opportunity? Drop a message here.
              </p>

              {isSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-brand-cyan/20 border border-brand-cyan text-brand-cyan mx-auto flex items-center justify-center shadow-glow-cyan">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Message Dispatched</h4>
                  <p className="text-sm text-slate-300 max-w-sm mx-auto">
                    Thank you for reaching out. Your message has been routed to my inbox and I will respond shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-dark-850 hover:bg-dark-800 text-white border border-slate-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {serverError && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  {/* Honeypot field */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot || ''}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* 2-Column: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                        Your Name <span className="text-brand-cyan">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sarah Connor"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl bg-dark-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-slate-800 focus:border-brand-cyan/70'
                        }`}
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                        Your Email <span className="text-brand-cyan">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. sarah@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl bg-dark-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-slate-800 focus:border-brand-cyan/70'
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Subject <span className="text-brand-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Android Architecture Advisory"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-dark-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
                        errors.subject
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-slate-800 focus:border-brand-cyan/70'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-400">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Message <span className="text-brand-cyan">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Your message, project scope, or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-dark-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-colors resize-none ${
                        errors.message
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-slate-800 focus:border-brand-cyan/70'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-dark-850 hover:bg-brand-cyan hover:text-dark-950 text-white border border-slate-700 hover:border-brand-cyan active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
