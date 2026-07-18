// app/download/apk/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SecuredApkDownloadPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // 1. Operational Security Check 
    // Replace this placeholder logic with your actual Auth State or Session Context validation
    const token = localStorage.getItem('auth_token');
    const userRole = localStorage.getItem('user_role'); // e.g., "ADMIN" or "OPERATOR"

    if (!token || userRole !== 'ADMIN') {
      setIsAuthorized(false);
      // Boot unauthorized requests back to the safety of the login/root path after 2 seconds
      const timeout = setTimeout(() => {
        router.push('/');
      }, 2500);
      return () => clearTimeout(timeout);
    }

    setIsAuthorized(true);
    // 2. Safe Execution Context: Stream the APK directly now that credentials match
    window.location.href = '/downloads/fold-go.apk';
  }, [router]);

  // Terminal state: Evaluating administrative session tokens
  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-mono tracking-wider uppercase text-slate-400">Verifying Administrative Context...</p>
      </div>
    );
  }

  // Terminal state: Explicit failure / restriction triggered
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans">
        <div className="max-w-md p-8 bg-slate-900/50 border border-red-500/20 text-center rounded-2xl shadow-xl">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-lg font-black tracking-tight text-white uppercase">Access Restrictions Enforced</h1>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            The target package distribution contains core proprietary binary layers. Independent client downloads must be requested internally inside the active Admin Dashboard console session.
          </p>
          <div className="mt-6 text-[11px] font-mono text-slate-500 bg-slate-950/60 py-2 rounded-lg">
            Redirecting to secure landing zone...
          </div>
        </div>
      </div>
    );
  }

  // Terminal state: Success layout rendering the file stream trigger
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-100 font-sans">
      <div className="max-w-md text-center px-6">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <h1 className="text-xl font-bold tracking-tight text-emerald-400">Authorization Validated</h1>
        <p className="text-sm text-slate-400 mt-2">
          Streaming package artifact securely. If the system client download does not begin transferring instantly,{' '}
          <a href="/downloads/fold-go.apk" className="text-blue-400 hover:underline font-semibold">
            click here to re-fire manual download link
          </a>.
        </p>
      </div>
    </div>
  );
}