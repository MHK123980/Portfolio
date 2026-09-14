import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Sparkles, Terminal } from 'lucide-react';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { MobileMenu } from './MobileMenu';
import { profileData } from '../../data/profile';

interface NavbarProps {
  onOpenHireModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHireModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'process', label: 'Process' },
    { id: 'contact', label: 'Contact' },
  ];

  const activeSection = useScrollSpy(
    navItems.map((item) => item.id),
    100
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-950/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-md'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <Link
              to="/"
              className="flex items-center gap-2 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-dark-900 border border-slate-700/60 flex items-center justify-center text-brand-cyan group-hover:border-brand-cyan/60 group-hover:shadow-glow-cyan transition-all">
                <Terminal className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-brand-cyan transition-colors">
                  {profileData.name}
                </span>
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                  Android &amp; Full-Stack Dev
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-dark-900/60 border border-slate-800/60 backdrop-blur-md">
              {isHome ? (
                navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`px-3 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all duration-200 relative ${
                        isActive
                          ? 'text-brand-cyan font-semibold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-cyan rounded-full" />
                      )}
                    </button>
                  );
                })
              ) : (
                <>
                  <Link to="/" className="px-3 py-1.5 text-xs xl:text-sm font-medium rounded-full text-slate-400 hover:text-white hover:bg-slate-800/40 transition-all">Home</Link>
                  <Link to="/projects" className={`px-3 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all relative ${location.pathname.startsWith('/projects') ? 'text-brand-cyan font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'}`}>
                    Projects
                    {location.pathname.startsWith('/projects') && <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-cyan rounded-full" />}
                  </Link>
                  <Link to="/hire-me" className={`px-3 py-1.5 text-xs xl:text-sm font-medium rounded-full transition-all relative ${location.pathname === '/hire-me' ? 'text-brand-cyan font-semibold' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'}`}>
                    Hire Me
                    {location.pathname === '/hire-me' && <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-brand-cyan rounded-full" />}
                  </Link>
                </>
              )}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              {/* Desktop Hire Me CTA */}
              <button
                onClick={onOpenHireModal}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-brand-cyan to-brand-blue text-dark-950 hover:opacity-95 shadow-md shadow-brand-cyan/20 hover:shadow-brand-cyan/40 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hire Me</span>
              </button>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                className="lg:hidden p-2 rounded-xl bg-dark-900/80 border border-slate-800 text-slate-300 hover:text-white active:scale-95 transition-all"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
        onOpenHireModal={onOpenHireModal}
      />
    </>
  );
};
