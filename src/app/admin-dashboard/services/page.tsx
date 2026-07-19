'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/context/AuthContext';
import { DashboardLayout } from '@/presentation/components/admin/DashboardLayout';
import { CreateServiceModal } from '@/presentation/components/admin/CreateServiceModal';

interface Shop {
  shopId: string;
  name: string;
}

interface Service {
  service_id: string;
  shop_id: string;
  name: string;
  price_per_unit: number;
  type: string;
}

export default function ServicesPage() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();

  const [shops, setShops] = useState<Shop[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

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

      // 1. Fetch shops matching this operator identity matrix
      const shopsResponse = await fetch(`${baseUrl}/v1/laundry/shops/sync?operatorId=${user.id}`);
      if (!shopsResponse.ok) throw new Error('Failed to load shop configurations.');

      const shopsData = await shopsResponse.json();
      const loadedShops: Shop[] = (shopsData.shops || []).map((s: any) => ({
        shopId: s.shop_id,
        name: s.name,
      }));
      setShops(loadedShops);

      // 2. Aggregate active laundry service options scoped per shop
      let aggregatedServices: Service[] = [];
      for (const shop of loadedShops) {
        const syncResponse = await fetch(`${baseUrl}/v1/laundry/shops/sync?shopId=${shop.shopId}`);
        if (syncResponse.ok) {
          const syncData = await syncResponse.json();
          const mappedServices = (syncData.services || []).map((srv: any) => ({
            service_id: srv.service_id,
            shop_id: srv.shop_id,
            name: srv.name,
            // Fall back cleanly to price_per_unit or price
            price_per_unit: parseFloat(srv.price_per_unit ?? srv.price) || 0,
            type: srv.type || srv.category || 'Wash/Dry/Fold',
          }));
          aggregatedServices = [...aggregatedServices, ...mappedServices];
        }
      }
      setServices(aggregatedServices);
    } catch (err) {
      console.error('Services structural catalog sync error:', err);
      setError(err instanceof Error ? err.message : 'Failed to synchronize active menu services.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Handle Deletion Pipeline
  const handleDelete = async (serviceId: string, shopId: string) => {
    if (!window.confirm('Are you absolutely sure you want to remove this laundry service mapping?')) return;

    setDeletingId(serviceId);
    setError('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.aesprt.com';
      
      // Targeting endpoint using standard DELETE routing or structural upsert omission if required
      const response = await fetch(`${baseUrl}/v1/laundry/services/${serviceId}?shopId=${shopId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Server rejected structural deletion transaction execution.');
      }

      // Optimistically clean local context arrays instantly to maintain hyper-responsive metrics
      setServices((prev) => prev.filter((s) => s.service_id !== serviceId));
    } catch (err) {
      console.error('Delete execution block error:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete custom database entity target.');
      // Fall back by refetching data state securely if request breaks down
      fetchData();
    } finally {
      setDeletingId(null);
    }
  };

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
              <h2 className="text-3xl font-bold text-white">Service Matrix</h2>
              <p className="mt-2 text-slate-400">Configure catalog options, specialized washing treatment types, and explicit pricing.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              disabled={shops.length === 0}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-blue-500/20"
            >
              + Add New Service
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-4">
            <p className="text-sm text-rose-400">{error}</p>
          </div>
        )}

        {/* Services List Context Container */}
        <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8">
          <h3 className="text-xl font-semibold text-white mb-6">Active Price Catalogs</h3>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : services.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-medium text-sm">
                    <th className="pb-4">Service Description</th>
                    <th className="pb-4">Location Target</th>
                    <th className="pb-4">Classification Group</th>
                    <th className="pb-4 text-right">Base Price</th>
                    <th className="pb-4 text-right pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-white">
                  {services.map((service) => (
                    <tr key={service.service_id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-4 font-medium">{service.name}</td>
                      <td className="py-4 text-slate-400">
                        {shops.find(s => s.shopId === service.shop_id)?.name || 'Unknown Store Context'}
                      </td>
                      <td className="py-4">
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300">
                          {service.type}
                        </span>
                      </td>
                      <td className="py-4 text-right font-semibold text-emerald-400">
                        ₱{service.price_per_unit.toFixed(2)}
                      </td>
                      <td className="py-4 text-right pr-4">
                        <button
                          onClick={() => handleDelete(service.service_id, service.shop_id)}
                          disabled={deletingId === service.service_id}
                          className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                          {deletingId === service.service_id ? 'Removing...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-lg bg-slate-800/20 p-8 text-center border border-dashed border-slate-800">
              <p className="text-slate-400">No custom laundry service categories provisioned.</p>
              {shops.length === 0 && <p className="text-xs text-amber-500 mt-2">⚠️ Bind an operational shop framework before mapping unique billing services.</p>}
            </div>
          )}
        </div>
      </div>

      <CreateServiceModal
        isOpen={showModal}
        shops={shops}
        onClose={() => setShowModal(false)}
        onSuccess={fetchData}
      />
    </DashboardLayout>
  );
}