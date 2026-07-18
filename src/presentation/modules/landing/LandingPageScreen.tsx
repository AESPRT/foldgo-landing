'use client';

import React from 'react';
import { useBilling } from '../../context/BillingContext';
import { SUBSCRIPTION_PLANS, OPERATIONAL_STEPS } from '@domain/entities/Subscription';
import { FoldGoLogo } from '@presentation/components/ui/FoldGoLogo';
import { PricingCard } from '@presentation/components/landing/PricingCard';
import { FeatureBlock } from '@presentation/components/landing/FeatureBlock';
import { ContactForm } from '@presentation/components/landing/ContactForm';

export const LandingPageScreen: React.FC = () => {
  const { cycle, setCycle } = useBilling();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white overflow-x-hidden scroll-smooth">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent blur-3xl pointer-events-none z-0" />

      <nav className="relative z-20 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6 border-b border-slate-900/60 backdrop-blur-md">
        <FoldGoLogo iconSize={44} className="text-onSurfaceCustom" />
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
          <a href="#process" className="hover:text-white transition">The Process</a>
          <a href="#vision" className="hover:text-white transition">Our Vision</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#contact" className="hover:text-white transition">Contact Us</a>
        </div>
      </nav>

      <header className="relative z-10 mx-auto grid max-w-6xl gap-10 px-6 pt-24 pb-20 lg:grid-cols-[0.9fr_0.8fr] lg:items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-blue-400">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            Version 2.4 Production Stable
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-6xl lg:max-w-xl">
              The ultimate logistics infrastructure for modern laundry business ops.
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-400 sm:text-xl lg:mx-0 lg:max-w-lg">
              Automate custom sorting cycles, driver tracking, and instant local order points with the blazing-fast FoldGo standalone platform ecosystem.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="#pricing"
              className="group inline-flex items-center justify-center rounded-3xl bg-blue-600 px-8 py-4 text-sm font-extrabold text-white transition duration-150 shadow-lg shadow-blue-600/20 hover:bg-blue-500 active:scale-[0.98]"
            >
              Review Subscription Models
              <span className="ml-2 transition-transform group-hover:translate-x-0.5">➔</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-3xl border border-slate-800 bg-slate-900 px-7 py-4 text-sm font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
            >
              Contact Infrastructure Desk
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8 shadow-[0_35px_120px_-55px_rgba(15,23,42,0.9)]">
          <div className="absolute inset-x-0 top-0 h-[120px] bg-gradient-to-b from-blue-600/15 to-transparent" />
          <div className="relative space-y-6">
            <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Gateway-ready platform</p>
              <p className="mt-4 text-lg font-semibold text-white">Scale without rearchitecting your operations.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">99.9%</p>
                <p className="mt-3 text-base font-semibold text-white">Uptime</p>
              </div>
              <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Local-first</p>
                <p className="mt-3 text-base font-semibold text-white">Route automation</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="process" className="relative z-10 mx-auto max-w-6xl px-6 py-24 border-t border-slate-900">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Engineered Operational Flow</h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Standard laundry management software drops requests into generic lists. FoldGo approaches operations as a highly refined logistics pipeline.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {OPERATIONAL_STEPS.map((step) => (
            <FeatureBlock key={step.number} step={step} />
          ))}
        </div>
      </section>

      <section id="vision" className="relative z-10 mx-auto max-w-6xl px-6 py-24 rounded-[2rem] border border-slate-900 bg-gradient-to-r from-slate-900 to-slate-900/40 mb-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.32em] text-blue-500">Our Strategic Blueprint</span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white">Architecting Local Commerce Infrastructure</h2>
            <p className="mt-6 text-sm leading-7 text-slate-400">
              We believe that local business models deserve high-grade technology stack optimization. FoldGo aims to completely bridge the gap between heavy industrial performance capabilities and localized neighborhood shop networks.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-blue-400">Our Mission</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                To equip independent laundry service providers with enterprise-level automated tracking tools, route loops, and digital visibility channels that drive consistent recurring margins.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-950/90 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-purple-400">Our Vision</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                To serve as the standardized backbone infrastructure fueling on-demand neighborhood retail operations internationally across the emerging digital landscape.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">Flexible Operations Licensing</h2>
          <p className="mt-2 text-sm text-slate-400">Scale seamlessly as your branch transaction volume climbs.</p>

          <div className="inline-flex rounded-3xl border border-slate-800 bg-slate-900 p-1 mt-8 shadow-[0_15px_40px_-20px_rgba(15,23,42,0.9)]">
            <button
              onClick={() => setCycle('MONTHLY')}
              className={`rounded-2xl px-4 py-2 text-xs font-bold transition ${
                cycle === 'MONTHLY' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setCycle('ANNUAL')}
              className={`rounded-2xl px-4 py-2 text-xs font-bold transition ${
                cycle === 'ANNUAL' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Annually
              <span className="ml-2 inline-flex rounded-full bg-emerald-500/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">
                Save ~20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto items-stretch">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} cycle={cycle} />
          ))}
        </div>
      </section>

      <section id="contact" className="relative z-10 mx-auto max-w-3xl px-6 py-24 border-t border-slate-900">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white">Let’s Optimize Your Logistics</h2>
          <p className="mt-2 text-sm text-slate-400">Have infrastructure questions? Drop our technical architecture desk a line.</p>
        </div>
        <ContactForm />
      </section>

      <footer className="border-t border-slate-900 py-8 bg-slate-950 text-center text-xs text-slate-600 font-mono">
        © 2026 FoldGo Logistics Network. All architectural rights reserved.
      </footer>
    </div>
  );
};