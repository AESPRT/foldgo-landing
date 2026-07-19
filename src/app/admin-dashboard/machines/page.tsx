'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/context/AuthContext';
import { DashboardLayout } from '@/presentation/components/admin/DashboardLayout';
import { CreateMachineModal } from '@/presentation/components/admin/CreateMachineModal';

interface Shop {
  shopId: string;
  name: string;
}

interface Machine {
  machineId: string;
  shopId: string;
  name: string;
  type: 'WASHER' | 'DRYER';
  status: 'READY' | 'RUNNING' | 'OUT_OF_ORDER';
}

export default function MachinesPage() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();

  const [shops, setShops] = useState<Shop[]>([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin-dashboard/login');
    }
  }, [isAuthenticated, router]);

  const fetchData = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.aesprt.com';

      // 1. Fetch structural operator shop layers
      const shopsResponse = await fetch(`${baseUrl}/v1/laundry/shops/sync?operatorId=${user.id}`);
      if (!shopsResponse.ok) throw new Error('Failed to load shop configuration parameters.');

      const shopsData = await shopsResponse.json();
      const loadedShops: Shop[] = (shopsData.shops || []).map((s: any) => ({
        shopId: s.shop_id,
        name: s.name,
      }));
      setShops(loadedShops);

      // 2. Aggregate active equipment units per shop location context
      let aggregatedMachines: Machine[] = [];
      for (const shop of loadedShops) {
        const syncResponse = await fetch(`${baseUrl}/v1/laundry/shops/sync?shopId=${shop.shopId}`);
        if (syncResponse.ok) {
          const syncData = await syncResponse.json();
          const mappedMachines = (syncData.machines || []).map((m: any) => ({
            machineId: m.machine_id,
            shopId: m.shop_id,
            name: m.name,
            type: m.type || 'WASHER',
            status: m.status || 'READY',
          }));
          aggregatedMachines = [...aggregatedMachines, ...mappedMachines];
        }
      }
      setMachines(aggregatedMachines);
    } catch (err) {
      console.error('Machines catalog fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to synchronize hardware registers.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const handleLogout = () => {
    logout();
    router.push('/admin-dashboard/login');
  };

  if (!isAuthenticated) return null;

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="space-y-6">
        {/* Header Hero Area */}
        <div className="mt-8 rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">Equipment Registry</h2>
              <p className="mt-2 text-slate-400">Monitor structural performance states, washing units, and dryer telemetry across nodes.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              disabled={shops.length === 0}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-500/20"
            >
              + Provision Machine
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-4">
            <p className="text-sm text-rose-400">{error}</p>
          </div>
        )}

        {/* Dynamic List Section */}
        <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8">
          <h3 className="text-xl font-semibold text-white mb-6">Active Hardware Fleet</h3>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : machines.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-medium text-sm">
                    <th className="pb-4">Machine Name</th>
                    <th className="pb-4">Location Instance</th>
                    <th className="pb-4">Classification</th>
                    <th className="pb-4">System State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-white">
                  {machines.map((machine) => (
                    <tr key={machine.machineId} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 font-medium flex items-center gap-2">
                        <span className="p-2 rounded bg-slate-800 text-slate-400">
                          {machine.type === 'WASHER' ? '🧼' : '🔥'}
                        </span>
                        {machine.name}
                      </td>
                      <td className="py-4 text-slate-400">
                        {shops.find(s => s.shopId === machine.shopId)?.name || 'Unknown Store Matrix'}
                      </td>
                      <td className="py-4">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300">
                          {machine.type}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full ${
                          machine.status === 'READY' ? 'bg-emerald-500/10 text-emerald-400' :
                          machine.status === 'RUNNING' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                        }`}>
                          {machine.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg bg-slate-800/20 p-8 text-center border border-dashed border-slate-800">
              <p className="text-slate-400">No active operational hardware detected.</p>
              {shops.length === 0 && <p className="text-xs text-amber-500 mt-2">⚠️ Assign an operational shop location framework before binding physical machine models.</p>}
            </div>
          )}
        </div>
      </div>

      <CreateMachineModal
        isOpen={showModal}
        shops={shops}
        onClose={() => setShowModal(false)}
        onSuccess={fetchData}
      />
    </DashboardLayout>
  );
}