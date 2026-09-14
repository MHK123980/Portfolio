import React from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  Layout,
  Globe,
  Layers,
  Server,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { ServiceItem } from '../../types';

interface ServiceCardProps {
  service: ServiceItem;
  onRequestService: (serviceTitle: string) => void;
}

const iconMap: Record<string, any> = {
  Smartphone,
  Layout,
  Globe,
  Layers,
  Server,
  Wrench,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onRequestService }) => {
  const Icon = iconMap[service.iconName] || Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800/80 hover:border-brand-cyan/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between shadow-lg group relative overflow-hidden"
    >
      {/* Top Subtle Gradient Accents */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div>
        {/* Card Header: Icon & Badge */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-dark-900 border border-slate-700/60 text-brand-cyan flex items-center justify-center group-hover:border-brand-cyan/60 group-hover:shadow-glow-cyan transition-all">
            <Icon className="w-6 h-6" />
          </div>

          {service.badge && (
            <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/25 text-brand-cyan font-medium">
              {service.badge}
            </span>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors mb-3">
          {service.title}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
          {service.shortDesc}
        </p>

        {/* Key Deliverables Bullet Points */}
        <div className="space-y-2.5 pt-4 border-t border-slate-800/80 mb-6">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
            Key Deliverables
          </span>
          {service.deliverables.slice(0, 4).map((del, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
              <span>{del}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Action */}
      <button
        onClick={() => onRequestService(service.title)}
        className="w-full mt-4 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-dark-900 hover:bg-brand-cyan hover:text-dark-950 text-white border border-slate-700/80 hover:border-brand-cyan active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn"
      >
        <span>Request This Service</span>
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};
