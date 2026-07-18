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
    <div className="p-8 bg-slate-900/40 border border-slate-900 rounded-2xl relative overflow-hidden group hover:border-slate-800 transition">
      <div className="text-5xl font-mono font-black text-slate-800 absolute top-4 right-4 group-hover:text-blue-500/10 transition">
        {step.number}
      </div>
      <h3 className="text-lg font-bold text-white mt-4">{step.title}</h3>
      <p className="text-slate-400 text-xs mt-3 leading-relaxed">{step.description}</p>
    </div>
  );
};