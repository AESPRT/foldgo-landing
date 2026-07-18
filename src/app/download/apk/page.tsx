'use client';

import { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// 1. The core content wrapper that uses the search parameters
function DownloadPageContent() {
  const searchParams = useSearchParams();
  const referenceNumber = useMemo(() => searchParams.get('referenceNumber'), [searchParams]);
  const hasReference = Boolean(referenceNumber);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12 text-slate-100">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-[0_35px_120px_-50px_rgba(15,23,42,0.9)]">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">APK access</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-white">FoldGo APK Download</h1>
          <p className="mt-4 text-sm leading-7 text-slate-400">
            Your download becomes available once a valid <span className="font-semibold text-white">referenceNumber</span> is present in the URL.
          </p>
        </div>

        {hasReference ? (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
              <p className="text-xs uppercase tracking-[0.33em] text-slate-500">Transaction reference</p>
              <p className="mt-3 text-lg font-semibold text-white break-words">{referenceNumber}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="/downloads/fold-go.apk"
                className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-500"
                download
              >
                Download APK
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-3xl border border-slate-800 bg-slate-900 px-6 py-4 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white"
              >
                Back to homepage
              </a>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-6 text-center">
            <p className="text-sm font-semibold text-rose-300">Download unavailable.</p>
            <p className="mt-2 text-xs leading-6 text-slate-400">
              Add <span className="font-semibold text-white">?referenceNumber=TXN-SUB-...</span> to the URL to unlock the APK download button.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// 2. Main page export wrapping the content in Suspense to clear prerender errors
export default function SecuredApkDownloadPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-sm">
          Loading portal setup...
        </div>
      }
    >
      <DownloadPageContent />
    </Suspense>
  );
}