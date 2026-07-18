'use client';

import React from 'react';
import { BillingProvider } from '@/presentation/context/BillingContext';
import { LandingPageScreen } from '@/presentation/modules/landing/LandingPageScreen';

export default function Home() {
  return (
    <BillingProvider>
      <LandingPageScreen />
    </BillingProvider>
  );
}