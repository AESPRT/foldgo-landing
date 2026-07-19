'use client';

import React, { useState } from 'react';
import { useAuth } from '@/presentation/context/AuthContext';

export const LoginForm: React.FC = () => {
  const { login, loading, error: authError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validate input
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      setError(authError || 'Login failed. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8 shadow-[0_25px_80px_-40px_rgba(15,23,42,0.9)]"
    >
      <h1 className="mb-8 text-center text-2xl font-bold text-white">Admin Login</h1>

      <div className="grid gap-6">
        {/* Email Field */}
        <label className="grid gap-2 text-sm text-slate-300">
          <span className="font-semibold text-slate-200 uppercase tracking-[0.24em]">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="admin@foldgo.com"
          />
        </label>

        {/* Password Field with Eye Icon */}
        <label className="grid gap-2 text-sm text-slate-300">
          <span className="font-semibold text-slate-200 uppercase tracking-[0.24em]">Password</span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 pr-12 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
        </label>

        {/* Error Message */}
        {error && <p className="text-sm text-rose-400">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-blue-600 px-5 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>

      {/* Demo Credentials Hint */}
      <p className="mt-6 text-center text-xs text-slate-500">
        Demo: Use <span className="font-mono text-slate-400">admin@foldgo.com</span> / <span className="font-mono text-slate-400">password123</span>
      </p>
    </form>
  );
};
