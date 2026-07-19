'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/presentation/context/AuthContext';
import { DashboardLayout } from '@/presentation/components/admin/DashboardLayout';
import { ShopCard } from '@/presentation/components/admin/ShopCard';
import { CreateShopModal } from '@/presentation/components/admin/CreateShopModal';

interface Shop {
  shopId: string;
  name: string;
  address: string;
  mobileNumber: string;
  ownerId: string;
  pin?: string;
}

export default function ShopPage() {
  const router = useRouter();
  const { isAuthenticated, logout, user } = useAuth();
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin-dashboard/login');
    }
  }, [isAuthenticated, router]);

  // Fetch shops
  const fetchShops = React.useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.aesprt.com';
      // Using referenceNumber as ownerId to fetch shops
      const response = await fetch(`${baseUrl}/v1/laundry/shops/sync?operatorId=${user.id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch shops');
      }

      const data = await response.json();
      
      // Safely map the returned array from snake_case to camelCase
      const shopsList = (data.shops || []).map((dbShop: any) => ({
        shopId: dbShop.shop_id,
        name: dbShop.name,
        address: dbShop.address || '',
        mobileNumber: dbShop.mobile_number || '',
        ownerId: dbShop.owner_id,
        pin: dbShop.pin
      }));

      setShops(shopsList);
    } catch (err) {
      console.error('Error fetching shops:', err);
      setError(err instanceof Error ? err.message : 'Failed to load shops');
      setShops([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchShops();
    }
  }, [isAuthenticated, fetchShops]);

  const handleLogout = () => {
    logout();
    router.push('/admin-dashboard/login');
  };

  const handleShopCreated = () => {
    // Refresh shops list after creation
    fetchShops();
  };

  if (!isAuthenticated) return null;

  return (
    <DashboardLayout onLogout={handleLogout}>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="mt-8 rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">Shop Management</h2>
              <p className="mt-2 text-slate-400">Manage your laundry shop details, location, and business information.</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
            >
              + Create Shop
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-4">
            <p className="text-sm text-rose-400">{error}</p>
          </div>
        )}

        {/* Shops List Section */}
        <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Your Shops</h3>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/10 mb-4">
                  <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <p className="text-slate-400">Loading shops...</p>
              </div>
            </div>
          ) : shops.length > 0 ? (
            <div className="space-y-3">
              {shops.map((shop) => (
                <ShopCard
                  key={shop.shopId}
                  shopId={shop.shopId}
                  name={shop.name}
                  address={shop.address}
                  mobileNumber={shop.mobileNumber}
                  ownerId={shop.ownerId}
                  pin={shop.pin}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-slate-800/50 p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-slate-300 font-medium">No shops yet</p>
              <p className="text-slate-500 text-sm mt-1">Create your first shop to get started</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Shop Modal */}
      <CreateShopModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleShopCreated}
      />
    </DashboardLayout>
  );
}
