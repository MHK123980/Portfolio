import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CustomCursor } from '../components/common/CustomCursor';
import { ScrollProgress } from '../components/common/ScrollProgress';
import { BackToTop } from '../components/common/BackToTop';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { ProjectModalForm } from '../components/Contact/ProjectModalForm';

export const PublicLayout: React.FC = () => {
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Android App Development');

  const handleOpenHireModal = (serviceName?: string) => {
    if (serviceName) setSelectedService(serviceName);
    setIsHireModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col selection:bg-brand-cyan selection:text-dark-950 relative">
      <CustomCursor />
      <ScrollProgress />
      <BackToTop />

      <Navbar onOpenHireModal={() => handleOpenHireModal()} />

      <main className="flex-1 overflow-x-hidden">
        <Outlet context={{ onOpenHireModal: handleOpenHireModal }} />
      </main>

      <Footer />

      <ProjectModalForm
        isOpen={isHireModalOpen}
        onClose={() => setIsHireModalOpen(false)}
        preSelectedService={selectedService}
      />
    </div>
  );
};
