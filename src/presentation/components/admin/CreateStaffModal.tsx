'use client';

import React, { useState } from 'react';

interface Shop {
  shopId: string;
  name: string;
}

interface CreateStaffModalProps {
  isOpen: boolean;
  shops: Shop[];
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateStaffModal: React.FC<CreateStaffModalProps> = ({ isOpen, shops, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    shopId: shops[0]?.shopId || '',
    role: 'Operator',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.shopId) {
      setError('Staff name and target location mappings are mandatory inputs.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.aesprt.com';
      
      // Compute a secure client-side execution ID hash sequence mapping
      const generatedStaffId = `STF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Upsert transaction payload block targeting the shop contextual scope
      const response = await fetch(`${baseUrl}/v1/laundry/shops/upsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shopId: formData.shopId, // Pass structural context identifier scope
          staff: [{
            staffId: generatedStaffId,
            name: formData.name.trim(),
            role: formData.role,
            is_active: true
          }]
        }),
      });

      if (!response.ok) {
        throw new Error('Server refused atomic operational database upsert execution bundle.');
      }

      setFormData({ name: '', shopId: shops[0]?.shopId || '', role: 'Operator' });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'System communication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
          <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between bg-slate-950/40">
            <h2 className="text-xl font-bold text-white">Appoint New Staff</h2>
            <button onClick={onClose} className="rounded-lg hover:bg-slate-800 p-2 text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 text-sm text-rose-400">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Staff Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                placeholder="Juan Dela Cruz"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Assign to Shop Location *</label>
              <select
                value={formData.shopId}
                onChange={(e) => setFormData(p => ({ ...p, shopId: e.target.value }))}
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors appearance-none"
              >
                {shops.map((shop) => (
                  <option key={shop.shopId} value={shop.shopId}>
                    {shop.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Role Assignment Designation</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData(p => ({ ...p, role: e.target.value }))}
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-white focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="Operator">Operator / Washer</option>
                <option value="Manager">Branch Supervisor</option>
                <option value="Rider">Logistics Delivery Personnel</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg bg-slate-800 px-4 py-2 font-medium text-slate-300 hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Processing...' : 'Appoint Staff'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};