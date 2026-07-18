'use client';

import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  if (formSubmitted) {
    return (
      <div className="p-6 bg-blue-900/20 border border-blue-500/30 text-center rounded-2xl">
        <p className="text-sm font-bold text-blue-400">Transmission Logged Successfully!</p>
        <p className="text-slate-400 text-xs mt-1">Our engineering dispatch team will reach out within 12 business hours.</p>
      </div>
    );
  }

  return (
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
  );
};