import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#1D3461]">
      <div className="mx-4 grid w-full max-w-md gap-6 rounded-3xl bg-white p-6 shadow-lg sm:p-8 text-center">
        <h1 className="text-3xl font-bold">404 — Link Not Found</h1>
        <p className="text-gray-500 text-sm">
          The short link you are looking for does not exist or has expired.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-[#1D3461] px-4 py-2 text-white text-sm font-medium hover:bg-[#162a4d] transition-colors"
        >
          ← Go back home
        </Link>
      </div>
    </div>
  );
}
