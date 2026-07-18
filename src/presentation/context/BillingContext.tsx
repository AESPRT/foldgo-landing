'use client';

import React, { createContext, useContext, useState } from 'react';

type BillingCycle = 'MONTHLY' | 'ANNUAL';

interface BillingContextType {
  cycle: BillingCycle;
  setCycle: (cycle: BillingCycle) => void;
}

const BillingContext = createContext<BillingContextType | undefined>(undefined);

export const BillingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cycle, setCycle] = useState<BillingCycle>('ANNUAL'); // Default to high-value annual conversion

  return (
    <BillingContext.Provider value={{ cycle, setCycle }}>
      {children}
    </BillingContext.Provider>
  );
};

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context) throw new Error('useBilling must be run inside a BillingProvider');
  return context;
};