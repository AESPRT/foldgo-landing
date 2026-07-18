import React from 'react';

interface OperationalStep {
  number: string;
  title: string;
  description: string;
}

interface FeatureBlockProps {
  step: OperationalStep;
}

export const FeatureBlock: React.FC<FeatureBlockProps> = ({ step }) => {
  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900/80 p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-1 hover:border-blue-500/30">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-80" />
      <div className="relative flex h-full flex-col justify-between gap-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-blue-300">
          Step {step.number}
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">{step.title}</h3>
          <p className="text-sm leading-7 text-slate-400">{step.description}</p>
        </div>
      </div>
    </div>
  );
};