'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/context/AuthContext';
import { DashboardLayout } from '@/presentation/components/admin/DashboardLayout';

export default function MachinesPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin-dashboard/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/admin-dashboard/login');
  };

  if (!isAuthenticated) return null;

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8">
        <h2 className="text-3xl font-bold text-white mb-4">Machines</h2>
        <p className="text-slate-400">Monitor and manage washing machines, dryers, and equipment status.</p>
      </div>
    </DashboardLayout>
  );
}
