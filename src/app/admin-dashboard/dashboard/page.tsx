'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/context/AuthContext';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin-dashboard/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/admin-dashboard/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Background gradient effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent blur-3xl pointer-events-none z-0" />

      {/* Header */}
      <nav className="relative z-20 border-b border-slate-900/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded-2xl bg-rose-600 px-5 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-lg shadow-rose-500/10 transition hover:bg-rose-500 active:scale-[0.98]"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.9)]">
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-white">Welcome to the Admin Dashboard</h2>
            <p className="text-slate-400">
              Logged in as: <span className="font-semibold text-blue-400">{user?.email}</span>
            </p>
            <div className="mt-8 pt-8 border-t border-slate-800">
              <p className="text-sm text-slate-500">Dashboard features coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
