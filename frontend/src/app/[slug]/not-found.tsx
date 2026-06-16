import Link from "next/link";
import { ArrowLeft, LinkIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-brand-600 px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60rem 40rem at 50% -10%, rgba(255,255,255,0.18), transparent 60%)",
        }}
      />
      <main className="relative z-10 w-full max-w-md animate-fade-in-up rounded-3xl border border-white/60 bg-white/95 p-8 text-center shadow-2xl shadow-black/20 ring-1 ring-black/5 backdrop-blur">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <LinkIcon size={26} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Link not found
        </h1>
        <p className="mx-auto mt-2 max-w-xs text-sm text-slate-500">
          The short link you&apos;re looking for doesn&apos;t exist or has
          expired.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-2xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
        >
          <ArrowLeft size={16} />
          Go back home
        </Link>
      </main>
    </div>
  );
}
