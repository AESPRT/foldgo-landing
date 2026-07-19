'use client';

import React from 'react';
import { useAuth } from '@/presentation/context/AuthContext';

export const WelcomeCard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="mt-8 rounded-2xl md:rounded-[2rem] border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-900/50 p-6 md:p-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.9)]">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Welcome back, {user?.email?.split('@')[0]}! 👋</h2>
          <p className="mt-2 text-sm md:text-base text-slate-400">Here's an overview of your laundry operations.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 pt-6 border-t border-slate-800">
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Active Machines</p>
            <p className="mt-2 text-xl md:text-2xl font-bold text-white">12</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Today Orders</p>
            <p className="mt-2 text-xl md:text-2xl font-bold text-white">24</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Staff Online</p>
            <p className="mt-2 text-xl md:text-2xl font-bold text-white">8</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Revenue</p>
            <p className="mt-2 text-xl md:text-2xl font-bold text-green-400">₱2,450</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800">
          <p className="text-xs md:text-sm text-slate-500">
            💡 Tip: Explore the navigation menu to manage your shop, machines, staff, and transactions.
          </p>
        </div>
      </div>
    </div>
  );
};
