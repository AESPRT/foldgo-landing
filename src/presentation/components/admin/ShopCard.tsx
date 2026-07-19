'use client';

import React from 'react';

interface ShopCardProps {
  shopId: string;
  name: string;
  address: string;
  mobileNumber: string;
  ownerId: string;
  pin?: string;
}

export const ShopCard: React.FC<ShopCardProps> = ({
  shopId,
  name,
  address,
  mobileNumber,
  ownerId,
  pin,
}) => {
  return (
    <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-colors">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-sm text-slate-400 mt-1">ID: {shopId}</p>
          
          <div className="mt-4 space-y-2">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Address</p>
              <p className="text-sm text-slate-300">{address || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Contact</p>
              <p className="text-sm text-slate-300">{mobileNumber || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Owner</p>
              <p className="text-sm text-slate-300">{ownerId}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 md:gap-3">
          <button
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
            onClick={() => console.log(`Edit shop ${shopId}`)}
          >
            Edit
          </button>
          <button
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors"
            onClick={() => console.log(`View shop ${shopId}`)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};
