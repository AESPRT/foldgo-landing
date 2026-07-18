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
    tagline: 'Perfect for local neighborhood laundry operations scaling up.',
    monthlyPrice: 1499,
    annuallyPricePerMonth: 1199,
    features: [
      'Up to 500 active orders processed monthly',
      'Automated SMS tracking & delivery notifications',
      'Basic revenue & real-time branch performance analytics',
      'Single device operator login access'
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
      'Whitelabel custom client-facing interface branding overrides',
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
    title: "Instant Kiosk intake",
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