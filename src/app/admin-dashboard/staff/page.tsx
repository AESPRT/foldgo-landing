'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/context/AuthContext';
import { DashboardLayout } from '@/presentation/components/admin/DashboardLayout';
import { CreateStaffModal } from '@/presentation/components/admin/CreateStaffModal';

interface Shop {
  shopId: string;
  name: string;
}

interface Staff {
  staffId: string;
  shopId: string;
  name: string;
  role: string;
  isActive: boolean;
}

export default function StaffPage() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  
  const [shops, setShops] = useState<Shop[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin-dashboard/login');
    }
  }, [isAuthenticated, router]);

  // Fetch all prerequisites (Shops + Staff via synchronization layer aggregate blocks)
  const fetchData = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.aesprt.com';
      
      // 1. Fetch all shops matching the operator identity profile
      const shopsResponse = await fetch(`${baseUrl}/v1/laundry/shops/sync?operatorId=${user.id}`);
      if (!shopsResponse.ok) throw new Error('Failed to load owned shop contexts');
      
      const shopsData = await shopsResponse.json();
      const loadedShops: Shop[] = (shopsData.shops || []).map((s: any) => ({
        shopId: s.shop_id,
        name: s.name,
      }));
      setShops(loadedShops);

      // 2. Aggregate staff listings across all fetched shops
      let aggregatedStaff: Staff[] = [];
      for (const shop of loadedShops) {
        const syncResponse = await fetch(`${baseUrl}/v1/laundry/shops/sync?shopId=${shop.shopId}`);
        if (syncResponse.ok) {
          const syncData = await syncResponse.json();
          const mappedStaff = (syncData.staff || []).map((st: any) => ({
            staffId: st.staff_id,
            shopId: st.shop_id,
            name: st.name,
            role: st.role || 'Operator',
            isActive: st.is_active ?? true,
          }));
          aggregatedStaff = [...aggregatedStaff, ...mappedStaff];
        }
      }
      setStaffList(aggregatedStaff);
    } catch (err) {
      console.error('Staff page collection failure:', err);
      setError(err instanceof Error ? err.message : 'System failed to gather management metrics');
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
        {/* Header Block */}
        <div className="mt-8 rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">Staff Management</h2>
              <p className="mt-2 text-slate-400">Manage your operational team members, assignments, and roles across locations.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              disabled={shops.length === 0}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-500/20"
            >
              + Add Staff Member
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-4">
            <p className="text-sm text-rose-400">{error}</p>
          </div>
        )}

        {/* Staff Table/List Container */}
        <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8">
          <h3 className="text-xl font-semibold text-white mb-6">Active Personnel</h3>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : staffList.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-medium text-sm">
                    <th className="pb-4">Name</th>
                    <th className="pb-4">Assigned Location</th>
                    <th className="pb-4">Role Designation</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-white">
                  {staffList.map((staff) => (
                    <tr key={staff.staffId} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 font-medium">{staff.name}</td>
                      <td className="py-4 text-slate-400">
                        {shops.find(s => s.shopId === staff.shopId)?.name || 'Unknown Store Matrix'}
                      </td>
                      <td className="py-4">
                        <span className="rounded bg-slate-800 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
                          {staff.role}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${staff.isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${staff.isActive ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                          {staff.isActive ? 'On Duty' : 'Suspended'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg bg-slate-800/20 p-8 text-center border border-dashed border-slate-800">
              <p className="text-slate-400">No active staff structures populated.</p>
              {shops.length === 0 && <p className="text-xs text-amber-500 mt-2">⚠️ Provision a Shop location framework before appointing operational team members.</p>}
            </div>
          )}
        </div>
      </div>

      <CreateStaffModal
        isOpen={showModal}
        shops={shops}
        onClose={() => setShowModal(false)}
        onSuccess={fetchData}
      />
    </DashboardLayout>
  );
}