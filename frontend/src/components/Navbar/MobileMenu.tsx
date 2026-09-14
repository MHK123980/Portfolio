import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { id: string; label: string }[];
  activeSection: string;
  onOpenHireModal: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  activeSection,
  onOpenHireModal,
}) => {
  const handleNavClick = (id: string) => {
    onClose();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-dark-950/98 backdrop-blur-2xl flex flex-col justify-between p-6 md:hidden overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" />
              <span className="font-mono text-xs tracking-wider text-slate-400">
                NAVIGATION
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2.5 rounded-xl bg-dark-850 text-slate-300 hover:text-white border border-slate-800 active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links List */}
          <div className="flex flex-col space-y-3 py-6 my-auto">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * idx }}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-xl font-medium tracking-tight py-2.5 px-3 rounded-lg transition-all flex items-center justify-between ${
                    isActive
                      ? 'text-brand-cyan bg-brand-cyan/10 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />}
                </motion.button>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="pt-4 border-t border-slate-800/80">
            <button
              onClick={() => {
                onClose();
                onOpenHireModal();
              }}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-brand-cyan/20 active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Hire Me</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
