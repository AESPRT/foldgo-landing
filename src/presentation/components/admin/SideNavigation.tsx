'use client';

import React, { useState, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface SideNavContextType {
  collapsed: boolean;
}

export const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

export const useSideNav = () => {
  const context = useContext(SideNavContext);
  if (!context) throw new Error('useSideNav must be used inside SideNavProvider');
  return context;
};

export const SideNavProvider: React.FC<{ children: React.ReactNode; collapsed: boolean }> = ({
  children,
  collapsed,
}) => {
  return <SideNavContext.Provider value={{ collapsed }}>{children}</SideNavContext.Provider>;
};

const navigationItems: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    href: '/admin-dashboard/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v7a1 1 0 001 1h12a1 1 0 001-1V9m-9 4l4 2m-8-4l4 2" />
      </svg>
    ),
  },
  {
    id: 'shop',
    label: 'Shop',
    href: '/admin-dashboard/shop',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    id: 'services',
    label: 'Services',
    href: '/admin-dashboard/services',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: 'machines',
    label: 'Machines',
    href: '/admin-dashboard/machines',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 5a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2m0 0V3m0 2v2m0 0H9m6 0h3m-3 6h3m-9 0h3m-3 6h3m-9 0h3" />
      </svg>
    ),
  },
  {
    id: 'staff',
    label: 'Staff',
    href: '/admin-dashboard/staff',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM9 20H4v-2a6 6 0 0112 0v2H9z" />
      </svg>
    ),
  },
  {
    id: 'transactions',
    label: 'Transactions',
    href: '/admin-dashboard/transactions',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/admin-dashboard/settings',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

interface SideNavigationProps {
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export const SideNavigation: React.FC<SideNavigationProps> = ({ collapsed, onCollapsedChange }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCollapse = () => {
    const newCollapsed = !collapsed;
    onCollapsedChange(newCollapsed);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-6 right-6 lg:hidden z-40 p-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg"
        title="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <nav
        className={`fixed left-0 top-0 h-screen bg-slate-900/95 border-r border-slate-800 backdrop-blur-md transition-all duration-300 z-30 ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-6 border-b border-slate-800">
          {!collapsed && <h2 className="text-lg font-bold text-white">FoldGo</h2>}
          <button
            onClick={handleCollapse}
            className="hidden lg:block p-2 hover:bg-slate-800 rounded-lg transition text-slate-400 hover:text-white"
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
            </svg>
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition text-slate-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col gap-2 px-3 py-6">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* Settings Section */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-900/50 px-3 py-4">
          <Link
            href="/admin-dashboard/settings"
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition"
            title={collapsed ? 'Settings' : undefined}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {!collapsed && <span className="text-sm font-medium">Settings</span>}
          </Link>
        </div>
      </nav>
    </>
  );
};
