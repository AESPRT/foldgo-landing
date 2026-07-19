'use client';

import React, { useState } from 'react';
import { SideNavigation, SideNavProvider } from '@/presentation/components/admin/SideNavigation';
import { DashboardHeader } from '@/presentation/components/admin/DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SideNavProvider collapsed={collapsed}>
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
        {/* Background gradient effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent blur-3xl pointer-events-none z-0" />

        {/* Side Navigation */}
        <SideNavigation collapsed={collapsed} onCollapsedChange={setCollapsed} />

        {/* Header - hidden on mobile, shown on lg+ */}
        <DashboardHeader onLogout={onLogout} />

        {/* Main Content Area */}
        <main className={`transition-all duration-300 relative z-10 pt-20 pb-8 px-4 md:px-6 lg:pb-0 ${
          collapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Mobile Header - shown on mobile */}
        <div className="fixed top-0 left-0 right-0 h-16 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md z-20 lg:hidden flex items-center justify-between px-4">
          <h2 className="text-lg font-bold text-white">FoldGo Admin</h2>
          <button
            onClick={onLogout}
            className="rounded-lg bg-rose-600 px-3 py-1 text-xs font-semibold uppercase text-white shadow-lg shadow-rose-500/10 transition hover:bg-rose-500 active:scale-[0.98]"
          >
            Logout
          </button>
        </div>

        {/* Add padding for mobile header */}
        <div className="h-16 lg:hidden" />
      </div>
    </SideNavProvider>
  );
};
