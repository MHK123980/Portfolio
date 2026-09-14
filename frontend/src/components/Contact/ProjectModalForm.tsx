import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Send, Loader2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProjectRequestFormData } from '../../types';
import { submitProjectRequest } from '../../lib/api';

interface ProjectModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: string;
}

const serviceOptions = [
  'Android App Development',
  'Web Application Development',
  'Website Development',
  'Full-Stack Development',
  'Backend / API Development',
  'Bug Fixing / Improvements',
  'Other',
];

const budgetOptions = [
  'Under $250',
  '$250 - $500',
  '$500 - $1,000',
  '$1,000 - $2,500',
  '$2,500 - $5,000',
  '$5,000+',
  'Not Sure Yet',
];

const timelineOptions = [
  'ASAP',
  '1-2 Weeks',
  '2-4 Weeks',
  '1-2 Months',
  '2+ Months',
  'Not Sure Yet',
];

export const ProjectModalForm: React.FC<ProjectModalFormProps> = ({
  isOpen,
  onClose,
  preSelectedService,
}) => {
  const [formData, setFormData] = useState<ProjectRequestFormData>({
    fullName: '',
    email: '',
    company: '',
    service: preSelectedService || 'Android App Development',
    projectTitle: '',
    projectDescription: '',
    budgetRange: '$1,000 - $2,500',
    expectedTimeline: '2-4 Weeks',
    referenceUrl: '',
    additionalRequirements: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Update service if preSelectedService changes
  useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => ({ ...prev, service: preSelectedService }));
    }
  }, [preSelectedService]);

  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (minimum 2 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.projectTitle.trim() || formData.projectTitle.trim().length < 3) {
      errs.projectTitle = 'Please enter a brief project title (minimum 3 characters)';
    }

    if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 15) {
      errs.projectDescription = 'Please describe your project in at least 15 characters';
    }

    if (formData.referenceUrl && formData.referenceUrl.trim() !== '') {
      try {
        new URL(formData.referenceUrl);
      } catch {
        errs.referenceUrl = 'Please enter a valid URL (including http:// or https://)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitProjectRequest(formData);

      if (response.success) {
        setIsSuccess(true);
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 75,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore if canvas-confetti is unsupported
        }
      } else {
        if (response.errors) {
          setErrors(response.errors);
        }
        setServerError(response.message || 'Failed to submit request. Please try again.');
      }
    } catch {
      setServerError('An unexpected network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      company: '',
      service: preSelectedService || 'Android App Development',
      projectTitle: '',
      projectDescription: '',
      budgetRange: '$1,000 - $2,500',
      expectedTimeline: '2-4 Weeks',
      referenceUrl: '',
      additionalRequirements: '',
      honeypot: '',
    });
    setErrors({});
    setIsSuccess(false);
    setServerError(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl max-h-[92vh] bg-dark-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-y-auto z-10 flex flex-col"
        >
          {/* Header */}
          <div className="sticky top-0 z-20 px-6 py-4 bg-dark-900/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" />
              <h3 className="text-base sm:text-lg font-bold text-white">
                Start a Project Request
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close project modal"
              className="p-2 rounded-lg bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white border border-slate-700/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content / Success State */}
          <div className="p-6 sm:p-8">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-brand-cyan/20 border border-brand-cyan text-brand-cyan mx-auto flex items-center justify-center shadow-glow-cyan">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h4 className="text-2xl font-bold text-white">
                  Project Request Received
                </h4>

                <div className="text-slate-300 max-w-md mx-auto space-y-2 text-sm sm:text-base leading-relaxed">
                  <p>Thanks for reaching out!</p>
                  <p>
                    Your project details have been submitted successfully. I will review the
                    requirements and get back to you within 24–48 hours with next steps.
                  </p>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={resetForm}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-dark-850 hover:bg-dark-800 text-white border border-slate-700 transition-colors"
                  >
                    Submit Another Request
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-brand-cyan text-dark-950 hover:bg-brand-cyan/90 transition-colors font-bold"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {serverError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Honeypot field - hidden from genuine users */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot || ''}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* 2-Column: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Full Name <span className="text-brand-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-dark-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-slate-800 focus:border-brand-cyan/70'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Email Address <span className="text-brand-cyan">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-dark-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-slate-800 focus:border-brand-cyan/70'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* 2-Column: Company & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Company / Organization <span className="text-slate-500 text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={formData.company || ''}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan/70 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Service Category <span className="text-brand-cyan">*</span>
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-cyan/70 transition-colors"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-dark-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Title */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Project Title <span className="text-brand-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Android Delivery App with Realtime Tracking"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-dark-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
                      errors.projectTitle
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-slate-800 focus:border-brand-cyan/70'
                    }`}
                  />
                  {errors.projectTitle && (
                    <p className="mt-1 text-xs text-red-400">{errors.projectTitle}</p>
                  )}
                </div>

                {/* Project Description */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Project Description <span className="text-brand-cyan">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your project vision, target users, required features, and any technical constraints..."
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-dark-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-colors resize-none ${
                      errors.projectDescription
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-slate-800 focus:border-brand-cyan/70'
                    }`}
                  />
                  {errors.projectDescription && (
                    <p className="mt-1 text-xs text-red-400">{errors.projectDescription}</p>
                  )}
                </div>

                {/* 2-Column: Budget Range & Expected Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Estimated Budget Range (USD)
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-cyan/70 transition-colors"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-dark-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Expected Timeline
                    </label>
                    <select
                      value={formData.expectedTimeline}
                      onChange={(e) => setFormData({ ...formData, expectedTimeline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-brand-cyan/70 transition-colors"
                    >
                      {timelineOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-dark-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reference URL (Optional) */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Reference / Existing Website URL <span className="text-slate-500 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    value={formData.referenceUrl || ''}
                    onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-dark-950 border text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
                      errors.referenceUrl
                        ? 'border-red-500/80 focus:border-red-500'
                        : 'border-slate-800 focus:border-brand-cyan/70'
                    }`}
                  />
                  {errors.referenceUrl && (
                    <p className="mt-1 text-xs text-red-400">{errors.referenceUrl}</p>
                  )}
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 hover:opacity-95 shadow-lg shadow-brand-cyan/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Request</span>
                      </>
                    )}
                  </button>
                  <p className="mt-2 text-center text-[11px] font-mono text-slate-500">
                    No immediate commitment required. You will receive a direct reply with project evaluation.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
