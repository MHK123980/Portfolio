import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HeroSection } from '../components/Hero/HeroSection';
import { AboutSection } from '../components/About/AboutSection';
import { SkillsSection } from '../components/Skills/SkillsSection';
import { ServicesSection } from '../components/Services/ServicesSection';
import { ProjectsSection } from '../components/Projects/ProjectsSection';
import { ExperienceSection } from '../components/Experience/ExperienceSection';
import { WhyWorkWithMe } from '../components/Value/WhyWorkWithMe';
import { ProcessSection } from '../components/Process/ProcessSection';
import { ContactSection } from '../components/Contact/ContactSection';

interface OutletContext {
  onOpenHireModal: (serviceName?: string) => void;
}

export const HomePage: React.FC = () => {
  const { onOpenHireModal } = useOutletContext<OutletContext>();

  useEffect(() => {
    document.title = 'Mohammad Hussain Khatri | Android & Full-Stack Developer';
  }, []);

  return (
    <>
      <HeroSection onOpenHireModal={() => onOpenHireModal()} />
      <AboutSection />
      <SkillsSection />
      <ServicesSection onSelectServiceForInquiry={(srv) => onOpenHireModal(srv)} />
      <ProjectsSection onSelectForInquiry={(srv) => onOpenHireModal(srv)} />
      <ExperienceSection />
      <WhyWorkWithMe />
      <ProcessSection />
      <ContactSection onOpenProjectModal={() => onOpenHireModal()} />
    </>
  );
};
