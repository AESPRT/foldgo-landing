'use client';

import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Name, email, and message are required.');
      return;
    }

    setFormStatus('sending');
    setFormError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || 'Unable to send message.');
      }

      setFormStatus('success');
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      setFormStatus('error');
      setFormError(error?.message || 'Unexpected error sending your message.');
    }
  };

  if (formSubmitted && formStatus === 'success') {
    return (
      <div className="rounded-[2rem] border border-blue-500/20 bg-slate-950/80 p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.8)]">
        <p className="text-sm font-bold text-blue-400">Transmission Logged Successfully!</p>
        <p className="mt-2 text-slate-400 text-sm leading-relaxed">Your message has been sent to adriel.dev.123@gmail.com.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleContactSubmit}
      className="grid gap-6 rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.9)]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-300">
          <span className="font-semibold text-slate-200 uppercase tracking-[0.24em]">Operator Name</span>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="Juan Dela Cruz"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-300">
          <span className="font-semibold text-slate-200 uppercase tracking-[0.24em]">Secure Work Email</span>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            placeholder="juan@laundryhub.ph"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-slate-300">
        <span className="font-semibold text-slate-200 uppercase tracking-[0.24em]">Operational Requirements / Message</span>
        <textarea
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-4 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
          placeholder="Tell us about your setup..."
        />
      </label>

      {formError && <p className="text-sm text-rose-400">{formError}</p>}

      <button
        type="submit"
        disabled={formStatus === 'sending'}
        className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {formStatus === 'sending' ? 'Sending Inquiry...' : 'Dispatch System Inquiry'}
      </button>
    </form>
  );
};