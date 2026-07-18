export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annuallyPricePerMonth: number;
  features: string[];
  isPopular?: boolean;
}

export const SUBSCRIPTION_PLANS: PricingPlan[] = [
  {
    id: 'plan-basic',
    name: 'Standard Hub',
    tagline: 'Perfect for local neighborhood delivery matching.',
    monthlyPrice: 1499,
    annuallyPricePerMonth: 1199,
    features: [
      'Up to 500 orders processed / mo',
      'Standard automated SMS tracking notifications',
      'Basic revenue & performance analytics',
      'Single device operator login'
    ]
  },
  {
    id: 'plan-premium',
    name: 'Enterprise Loop',
    tagline: 'Built for high-volume multi-branch commercial hubs.',
    monthlyPrice: 3499,
    annuallyPricePerMonth: 2799,
    features: [
      'Unlimited order queuing loop optimization',
      'Whitelabel custom branding overrides',
      'Advanced driver dispatch & live routing matrices',
      'Unlimited operations manager seats',
      'Priority 24/7 technical fallback support'
    ],
    isPopular: true
  }
];