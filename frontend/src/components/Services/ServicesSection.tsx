import React from 'react';
import { SectionHeading } from '../common/SectionHeading';
import { ServiceCard } from './ServiceCard';
import { servicesData } from '../../data/services';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForInquiry,
}) => {
  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="// SERVICES & CAPABILITIES"
          title="Engineered Solutions for"
          highlight="Your Software Needs"
          description="From concept to deployment, I build robust mobile apps, modern web platforms, and secure API architectures tailored to your goals."
        />

        {/* Responsive Grid of 6 Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onRequestService={onSelectServiceForInquiry}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
