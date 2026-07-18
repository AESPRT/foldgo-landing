export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annuallyPricePerMonth: number;
  features: string[];
  isPopular?: boolean;
}

export interface OperationalStep {
  number: string;
  title: string;
  description: string;
}

export const SUBSCRIPTION_PLANS: PricingPlan[] = [
  {
    id: 'plan-basic',
    name: 'Standard Hub',
    tagline: 'Perfect for local operators managing a single neighborhood branch.',
    monthlyPrice: 1499,
    annuallyPricePerMonth: 1199,
    features: [
      'Limited shop creation (Up to 1 shop only)',
      'Basic revenue & real-time branch performance analytics',
      'Single device operator login access',
      '❌ No online kiosk ordering included',
      '❌ No SMS tracking notifications'
    ]
  },
  {
    id: 'plan-premium',
    name: 'Enterprise Loop',
    tagline: 'Built for high-volume multi-branch commercial operations.',
    monthlyPrice: 3499,
    annuallyPricePerMonth: 2799,
    features: [
      'Unlimited shop creation across multiple locations',
      'Full online kiosk ordering integration included',
      'Automated SMS tracking & delivery loops',
      'Advanced driver dispatch & live routing metrics tracking',
      'Unlimited operations manager seats',
      'Priority 24/7 technical fallback support channels'
    ],
    isPopular: true
  }
];

export const OPERATIONAL_STEPS: OperationalStep[] = [
  {
    number: "01",
    title: "Instant Kiosk Intake",
    description: "Customers or counter staff queue jobs instantly. Clothes are weighed, tagged with smart identification tokens, and assigned distinct operational tracks."
  },
  {
    number: "02",
    title: "Algorithmic Sorting Loop",
    description: "The system dynamically clusters matching fabric parameters and cycle constraints together, minimizing utility overhead and water usage by up to 22%."
  },
  {
    number: "03",
    title: "Live Dispatch & Tracking",
    description: "Drivers receive optimized drop-off routes via the FoldGo native application. Delivery loops update in real time with absolute proof of delivery logs."
  }
];