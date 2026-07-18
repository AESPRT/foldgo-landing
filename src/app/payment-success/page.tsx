export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

interface PaymentSuccessProps {
  searchParams: Promise<{ referenceNumber?: string; sessionToken?: string }>;
}

const PaymentSuccessPage = async ({ searchParams }: PaymentSuccessProps) => {
  const { referenceNumber, sessionToken } = await searchParams;
  const cookieStore = await cookies();
  const storedToken = cookieStore.get('foldgo_payment_token')?.value;

  if (!referenceNumber || !sessionToken || sessionToken !== storedToken) {
    notFound();
  }

  cookieStore.delete('foldgo_payment_token');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-16">
      <main className="w-full max-w-3xl rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 shadow-[0_35px_120px_-50px_rgba(15,23,42,0.9)]">
        <div className="mb-8 inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
          Payment Success
        </div>

        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          Your subscription is active.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400">
          Thank you for completing your payment. Your FoldGo operational stack has been successfully provisioned and the billing reference has been recorded.
        </p>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
          <p className="text-xs uppercase tracking-[0.33em] text-slate-500">Transaction reference</p>
          <p className="mt-3 text-lg font-semibold text-white">{referenceNumber}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/#pricing"
            className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            View more plans
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center rounded-3xl border border-slate-800 bg-slate-900 px-6 py-4 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-white"
          >
            Contact support
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PaymentSuccessPage;
