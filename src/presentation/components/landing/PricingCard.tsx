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
  const displayPrice = cycle === 'ANNUAL' ? plan.annuallyPricePerMonth : plan.monthlyPrice;
  const currentPeriodLabel = cycle === 'ANNUAL' ? '/ month, billed yearly' : '/ month';

  const handleSubscriptionCheckout = async () => {
    setLoading(true);
    try {
      // Pull base URL from your .env.local configuration context
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.aesprt.com';
      
      const response = await fetch(`${baseUrl}/v1/payments/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: `USER-${Date.now()}`, 
          packageId: plan.id,
          type: "SAAS",
          cycle: cycle,
          cusEmail: "operator@foldgo.cloud", // Replace with auth/context values if running session tracking
          cusName: "Laundry Partner Hub",
          cusPhone: "09170000000"
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

  return (
    <div
      className={`p-8 bg-slate-900 border rounded-3xl flex flex-col justify-between transition duration-200 relative ${
        plan.isPopular 
          ? 'border-blue-500/80 shadow-xl shadow-blue-500/5 ring-1 ring-blue-500/30' 
          : 'border-slate-850 hover:border-slate-800'
      }`}
    >
      {plan.isPopular && (
        <span className="absolute -top-3 left-6 px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow">
          Recommended Setup
        </span>
      )}

      <div>
        <h3 className="text-xl font-bold text-white">{plan.name}</h3>
        <p className="text-xs text-slate-400 mt-2 min-h-[32px] leading-relaxed">{plan.tagline}</p>
        
        <div className="mt-6 flex items-baseline gap-1.5">
          <span className="text-4xl font-black text-white tracking-tight">
            ₱{displayPrice.toLocaleString()}
          </span>
          <span className="text-xs font-medium text-slate-400">{currentPeriodLabel}</span>
        </div>

        <ul className="mt-8 space-y-4 border-t border-slate-850 pt-6">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
              <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSubscriptionCheckout}
          disabled={loading}
          className={`w-full py-3.5 rounded-xl text-xs font-bold tracking-wide uppercase transition duration-150 active:scale-[0.98] disabled:opacity-50 ${
            plan.isPopular
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
              : 'bg-slate-800 hover:bg-slate-750 text-slate-200'
          }`}
        >
          {loading ? 'Connecting Gate...' : 'Deploy Operational Stack ➔'}
        </button>
      </div>
    </div>
  );
};