import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Terminal,
  ChevronRight,
} from 'lucide-react';
import { isAuthenticated, clearToken } from '../lib/auth';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const adminNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { label: 'Inquiries', path: '/admin/project-requests', icon: MessageSquare },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    clearToken();
    navigate('/admin/login', { replace: true });
  };

  if (!isAuthenticated()) return null;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Portfolio Admin</p>
            <p className="text-[11px] font-mono text-slate-500">Management Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {adminNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{item.label}</span>
              {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all"
        >
          <span className="text-xs">↗</span>
          <span>View Portfolio</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 flex-shrink-0 bg-dark-900 border-r border-slate-800 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-dark-900 border-r border-slate-800 flex flex-col transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
        <SidebarContent />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-64 min-h-screen">
        {/* Mobile topbar */}
        <header className="lg:hidden sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-dark-900/90 backdrop-blur-md border-b border-slate-800">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-dark-950 border border-slate-800 text-slate-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-brand-cyan">
            <Terminal className="w-4 h-4" />
            <span className="text-sm font-bold text-white">Admin Panel</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
