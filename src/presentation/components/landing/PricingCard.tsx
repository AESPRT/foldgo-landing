'use client';

import React, { useState } from 'react';

interface SubscriptionPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annuallyPricePerMonth: number;
  features: string[];
  isPopular?: boolean;
}

interface PricingCardProps {
  plan: SubscriptionPlan;
  cycle: 'MONTHLY' | 'ANNUAL';
}

export const PricingCard: React.FC<PricingCardProps> = ({ plan, cycle }) => {
  const [loading, setLoading] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [customer, setCustomer] = useState({
    email: '',
    name: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    name: '',
    phone: '',
  });

  const displayPrice = cycle === 'ANNUAL' ? plan.annuallyPricePerMonth : plan.monthlyPrice;
  const currentPeriodLabel = cycle === 'ANNUAL' ? '/ month, billed yearly' : '/ month';

  const handleInputChange = (field: keyof typeof customer, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateCustomer = () => {
    const nextErrors = { email: '', name: '', phone: '' };

    if (!customer.email.trim()) {
      nextErrors.email = 'Email is required';
    }
    if (!customer.name.trim()) {
      nextErrors.name = 'Name is required';
    }
    if (!customer.phone.trim()) {
      nextErrors.phone = 'Phone number is required';
    }

    setErrors(nextErrors);
    return !nextErrors.email && !nextErrors.name && !nextErrors.phone;
  };

  const createCheckoutToken = () => {
    if (typeof window === 'undefined') return '';
    if ('crypto' in window && 'randomUUID' in window.crypto) {
      return window.crypto.randomUUID();
    }
    return Array.from({ length: 40 }, () => Math.floor(Math.random() * 36).toString(36)).join('');
  };

  const handleSubscriptionCheckout = async () => {
    if (!validateCustomer()) {
      setShowCustomerModal(true);
      return;
    }

    setLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.aesprt.com';
      const token = createCheckoutToken();
      document.cookie = `foldgo_payment_token=${token}; path=/; max-age=300; sameSite=lax; secure`;
      const successUrl = `${window.location.origin}/payment-success?token=${token}`;
      const cancelUrl = `${window.location.origin}/pricing`;
      const response = await fetch(`${baseUrl}/v1/payments/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: `USER-${Date.now()}`,
          packageId: plan.id,
          type: 'SAAS',
          cycle,
          cusEmail: customer.email.trim(),
          cusName: customer.name.trim(),
          cusPhone: customer.phone.trim(),
          sessionToken: token,
          successUrl,
          cancelUrl,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Network token acquisition rejected.');
      }

      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch (error: any) {
      console.error('Checkout failed:', error);
      alert(`Initialization Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerSave = () => {
    if (validateCustomer()) {
      setShowCustomerModal(false);
      handleSubscriptionCheckout();
    }
  };

  const handleOpenModal = () => setShowCustomerModal(true);
  const handleCloseModal = () => setShowCustomerModal(false);

  return (
    <div className={`relative overflow-hidden rounded-[2rem] border bg-slate-950/90 shadow-[0_35px_120px_-50px_rgba(15,23,42,0.9)] transition-all duration-300 ${
        plan.isPopular
          ? 'border-blue-500/30 shadow-blue-500/10'
          : 'border-slate-800 hover:border-slate-700'
      }`}>
      {plan.isPopular && (
        <div className="absolute -top-3 left-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-white shadow-lg shadow-blue-500/20">
          Recommended Setup
        </div>
      )}

      <div className="relative p-8 sm:p-10">
        <div className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-[62%]">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Subscription plan</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">{plan.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{plan.tagline}</p>
            </div>

            <div className="rounded-3xl bg-slate-900/80 px-4 py-3 text-xs uppercase tracking-[0.28em] text-slate-300 ring-1 ring-slate-800">
              {cycle === 'ANNUAL' ? 'ANNUAL' : 'MONTHLY'}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black tracking-tight text-white">₱{displayPrice.toLocaleString()}</span>
              <span className="pb-1 text-sm font-medium text-slate-400">{currentPeriodLabel}</span>
            </div>
            {plan.isPopular && (
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-300">
                Most requested
              </span>
            )}
          </div>

          <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-950/80 p-6">
            <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">What’s included</h4>
            <ul className="mt-5 space-y-3">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300 leading-6">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/10 text-blue-300">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-slate-800/90 bg-slate-950/80 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Customer profile</p>
                <p className="mt-2 text-sm text-slate-200">{customer.name || 'Add customer information before checkout'}</p>
              </div>
              <button
                type="button"
                onClick={handleOpenModal}
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-200 transition hover:border-blue-500 hover:text-white"
              >
                {customer.email || customer.name || customer.phone ? 'Update' : 'Add details'}
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              {customer.email && customer.phone
                ? `${customer.email} · ${customer.phone}`
                : 'Customer email and phone are required for checkout.'}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleSubscriptionCheckout}
            disabled={loading}
            className={`w-full rounded-[1.5rem] px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] transition duration-150 active:scale-[0.98] disabled:opacity-50 ${
              plan.isPopular
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-100'
            }`}
          >
            {loading ? 'Connecting Gate...' : 'Deploy Operational Stack ➔'}
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">Payments are processed securely via your configured gateway.</p>
        </div>
      </div>

      {showCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 px-4 py-8">
          <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950 shadow-2xl shadow-slate-950/70">
            <div className="flex flex-col gap-4 border-b border-slate-800 bg-slate-900/90 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-blue-400">Checkout profile</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Enter customer details</h2>
                <p className="mt-2 text-sm text-slate-400">This information will be used to generate your billing session and subscription record.</p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-3xl font-semibold leading-none text-slate-500 transition hover:text-slate-200"
              >
                ×
              </button>
            </div>

            <div className="px-8 py-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm text-slate-300">
                  <span className="font-semibold text-slate-200">Email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={customer.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="operator@foldgo.cloud"
                  />
                  {errors.email && <span className="text-xs text-rose-400">{errors.email}</span>}
                </label>

                <label className="grid gap-2 text-sm text-slate-300">
                  <span className="font-semibold text-slate-200">Name</span>
                  <input
                    type="text"
                    autoComplete="name"
                    value={customer.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Laundry Partner Hub"
                  />
                  {errors.name && <span className="text-xs text-rose-400">{errors.name}</span>}
                </label>
              </div>

              <label className="grid gap-2 text-sm text-slate-300 mt-5">
                <span className="font-semibold text-slate-200">Phone</span>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={customer.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="0917 000 0000"
                />
                {errors.phone && <span className="text-xs text-rose-400">{errors.phone}</span>}
              </label>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCustomerSave}
                  className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 sm:w-auto"
                >
                  Save & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};