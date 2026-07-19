'use client';

import React from 'react';
import { useAuth } from '@/presentation/context/AuthContext';
import { useSideNav } from './SideNavigation';

interface DashboardHeaderProps {
  onLogout: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onLogout }) => {
  const { user } = useAuth();
  const { collapsed } = useSideNav();

  return (
    <header className={`fixed top-0 right-0 h-20 bg-slate-900/95 border-b border-slate-800 backdrop-blur-md z-20 transition-all duration-300 ${
      collapsed ? 'left-20' : 'left-64'
    } hidden lg:flex items-center justify-between px-6 md:px-8`}>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {user?.email?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
          <p className="text-xs text-slate-400">Administrator</p>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="rounded-2xl bg-rose-600 px-4 md:px-5 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-lg shadow-rose-500/10 transition hover:bg-rose-500 active:scale-[0.98] whitespace-nowrap"
      >
        Logout
      </button>
    </header>
  );
};
