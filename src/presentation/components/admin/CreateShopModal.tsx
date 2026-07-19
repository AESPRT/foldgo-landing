'use client';

import React, { useState } from 'react';
import { useAuth } from '@/presentation/context/AuthContext';

interface CreateShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateShopModal: React.FC<CreateShopModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobileNumber: '',
    pin: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Shop name is required');
      return false;
    }
    if (!formData.pin.trim()) {
      setError('PIN is required');
      return false;
    }
    if (formData.pin.length < 4) {
      setError('PIN must be at least 4 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.aesprt.com';
      const response = await fetch(`${baseUrl}/v1/laundry/shops`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          ownerId: user?.id || 'ADMIN', // Use operator reference
          address: formData.address || undefined,
          mobileNumber: formData.mobileNumber || undefined,
          pin: formData.pin,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create shop');
      }

      const data = await response.json();
      console.log('Shop created:', data);

      // Reset form
      setFormData({ name: '', address: '', mobileNumber: '', pin: '' });
      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error creating shop:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
          {/* Header */}
          <div className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Create New Shop</h2>
            <button
              onClick={onClose}
              className="rounded-lg hover:bg-slate-800 p-2 transition-colors text-slate-400 hover:text-slate-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-3">
                <p className="text-sm text-rose-400">{error}</p>
              </div>
            )}

            {/* Shop Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Shop Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter shop name"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter shop address"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                placeholder="09171234567"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* PIN */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                PIN (4+ characters) *
              </label>
              <input
                type="password"
                value={formData.pin}
                onChange={(e) => handleInputChange('pin', e.target.value)}
                placeholder="Enter shop PIN"
                className="w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-2 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Buttons */}
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
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creating...' : 'Create Shop'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
