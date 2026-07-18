'use client';

import React, { useState } from 'react';
import { useBilling } from '../../context/BillingContext';
import { SUBSCRIPTION_PLANS, OPERATIONAL_STEPS } from '@domain/entities/Subscription';
import { FoldGoLogo } from '@presentation/components/ui/FoldGoLogo';

export const LandingPageScreen: React.FC = () => {
  const { cycle, setCycle } = useBilling();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleApkDownload = () => {
    window.location.href = '/downloads/foldgo-latest.apk';
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden scroll-smooth">
      
      {/* BACKGROUND GLOW MATRIX */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent blur-3xl pointer-events-none z-0" />

      {/* HEADER NAVIGATION */}
      <nav className="relative z-20 max-w-6xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-900/60 backdrop-blur-md">
        <FoldGoLogo iconSize={44} className="text-onSurfaceCustom" />
        <div className="hidden sm:flex items-center gap-8 text-sm font-semibold text-slate-400">
          <a href="#process" className="hover:text-white transition">The Process</a>
          <a href="#vision" className="hover:text-white transition">Our Vision</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#contact" className="hover:text-white transition">Contact Us</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-blue-400 tracking-wide mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Version 2.4 Production Stable
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none max-w-3xl">
          The ultimate logistics infrastructure for modern laundry business ops.
        </h1>
        
        <p className="text-slate-400 text-base sm:text-xl max-w-xl mt-6 leading-relaxed">
          Automate custom sorting cycles, driver tracking, and instant local order points with the blazing-fast FoldGo standalone platform ecosystem.
        </p>

        {/* HIGH-CONVERSION APK CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleApkDownload}
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-2xl transition duration-150 shadow-lg shadow-blue-600/20 active:scale-[0.98] overflow-hidden flex items-center gap-3"
          >
            <svg className="w-5 h-5 fill-current transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24">
              <path d="M17.59 13 12 18.59 6.41 13H10V3h4v10h3.59M19 19H5v2h14v-2Z"/>
            </svg>
            Download Driver APK
          </button>
          
          <a 
            href="#pricing" 
            className="px-6 py-4 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold rounded-2xl transition border border-slate-800"
          >
            Explore Corporate Licensing
          </a>
        </div>
      </header>

      {/* THE PROCESS SECTION */}
      <section id="process" className="relative z-10 max-w-6xl mx-auto px-6 py-24 border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Engineered Operational Flow</h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Standard laundry management software drops requests into generic lists. FoldGo approaches operations as a highly refined logistics pipeline.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {OPERATIONAL_STEPS.map((step) => (
            <div key={step.number} className="p-8 bg-slate-900/40 border border-slate-900 rounded-2xl relative overflow-hidden group hover:border-slate-800 transition">
              <div className="text-5xl font-mono font-black text-slate-800 absolute top-4 right-4 group-hover:text-blue-500/10 transition">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-white mt-4">{step.title}</h3>
              <p className="text-slate-400 text-xs mt-3 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section id="vision" className="relative z-10 max-w-5xl mx-auto px-6 py-24 bg-gradient-to-r from-slate-900 to-slate-900/40 border border-slate-900 rounded-3xl mb-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Our Strategic Blueprint</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight mt-2">Architecting Local Commerce Infrastructure</h2>
            <p className="text-slate-400 text-sm mt-4 leading-relaxed">
              We believe that local business models deserve high-grade technology stack optimization. FoldGo aims to completely bridge the gap between heavy industrial performance capabilities and localized neighborhood shop networks.
            </p>
          </div>
          <div className="space-y-6">
            <div className="p-6 bg-slate-950 rounded-xl border border-slate-850">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider text-blue-400">Our Mission</h3>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                To equip independent laundry service providers with enterprise-level automated tracking tools, route loops, and digital visibility channels that drive consistent recurring margins.
              </p>
            </div>
            <div className="p-6 bg-slate-950 rounded-xl border border-slate-850">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider text-purple-400">Our Vision</h3>
              <p className="text-slate-300 text-xs mt-2 leading-relaxed">
                To serve as the standardized backbone infrastructure fueling on-demand neighborhood retail operations internationally across the emerging digital landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION CONTROL CENTER */}
      <section id="pricing" className="relative z-10 max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Flexible Operations Licensing</h2>
          <p className="text-slate-400 text-sm mt-2">Scale seamlessly as your branch transaction volume climbs.</p>
          
          <div className="inline-flex bg-slate-900 border border-slate-800 p-1 rounded-xl mt-8">
            <button
              onClick={() => setCycle('MONTHLY')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                cycle === 'MONTHLY' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setCycle('ANNUAL')}
              className={`relative px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                cycle === 'ANNUAL' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Annually
              <span className="bg-emerald-500/20 text-emerald-400 font-mono text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wide">
                Save ~20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const displayPrice = cycle === 'ANNUAL' ? plan.annuallyPricePerMonth : plan.monthlyPrice;
            const currentPeriodLabel = cycle === 'ANNUAL' ? '/ month, billed yearly' : '/ month';

            return (
              <div
                key={plan.id}
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
                    className={`w-full py-3.5 rounded-xl text-xs font-bold tracking-wide uppercase transition duration-150 active:scale-[0.98] ${
                      plan.isPopular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
                        : 'bg-slate-800 hover:bg-slate-750 text-slate-200'
                    }`}
                  >
                    Deploy Operational Stack ➔
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACT US SECTION */}
      <section id="contact" className="relative z-10 max-w-xl mx-auto px-6 py-24 border-t border-slate-900">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Let's Optimize Your Logistics</h2>
          <p className="text-slate-400 text-xs mt-2">Have infrastructure questions? Drop our technical architecture desk a line.</p>
        </div>

        {formSubmitted ? (
          <div className="p-6 bg-blue-900/20 border border-blue-500/30 text-center rounded-2xl">
            <p className="text-sm font-bold text-blue-400">Transmission Logged Successfully!</p>
            <p className="text-slate-400 text-xs mt-1">Our engineering dispatch team will reach out within 12 business hours.</p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Operator Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                placeholder="Juan Dela Cruz"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Secure Work Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                placeholder="juan@laundryhub.ph"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Operational Requirements / Message</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-900 border border-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition resize-none"
                placeholder="Tell us about your setup..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold rounded-xl text-xs uppercase tracking-wider transition active:scale-[0.99]"
            >
              Dispatch System Inquiry
            </button>
          </form>
        )}
      </section>

      {/* FOOTER METADATA METRICS */}
      <footer className="border-t border-slate-900 py-8 bg-slate-950 text-center text-xs text-slate-600 font-mono">
        © 2026 FoldGo Logistics Network. All architectural rights reserved.
      </footer>

    </div>
  );
};