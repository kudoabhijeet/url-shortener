"use client";

import { useState } from "react";
import axios from "axios";
import {
  ArrowUpRight,
  Check,
  Copy,
  Link as LinkIcon,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BACKEND_URL, SHORT_DOMAIN } from "@/lib/config";
import { ThemeToggle } from "./theme-toggle";
import Footer from "./footer";

export function Hero() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    if (!longUrl.trim() || isLoading) return;

    setIsLoading(true);
    setError("");
    setShortUrl("");
    setIsCopied(false);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/create`, {
        url: longUrl.trim(),
      });
      const shortcode = response.data.data.shortcode;
      setShortUrl(`${SHORT_DOMAIN}/${shortcode}`);
    } catch (err) {
      console.error("Error shortening URL:", err);
      setError("Something went wrong. Please check your link and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(`https://${shortUrl}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-brand-600 px-4 py-12 dark:bg-ink-900">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 dark:opacity-40"
        style={{
          background:
            "radial-gradient(60rem 40rem at 50% -10%, rgba(255,255,255,0.18), transparent 60%), radial-gradient(40rem 30rem at 90% 110%, rgba(99,102,241,0.25), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Theme toggle, top-right */}
      <div className="absolute right-4 top-4 z-20">
        <ThemeToggle />
      </div>

      <main className="relative z-10 w-full max-w-lg animate-fade-in-up">
        <div className="mb-8 text-center">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
            <Sparkles size={13} />
            Fast, free &amp; simple
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Shorten links in seconds
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-pretty text-sm text-white/70 sm:text-base">
            Paste a long, messy URL and get a clean, shareable short link
            instantly.
          </p>
        </div>

        <div className="rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl shadow-black/20 ring-1 ring-black/5 backdrop-blur dark:border-white/10 dark:bg-ink-800/95 dark:ring-white/5 sm:p-8">
          <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-1.5">
              <Label
                className="text-sm font-medium text-slate-700 dark:text-slate-200"
                htmlFor="url"
              >
                Your long URL
              </Label>
              <div className="relative">
                <LinkIcon
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <Input
                  className="h-12 pl-10 text-base dark:bg-ink-900 dark:text-slate-100"
                  id="url"
                  placeholder="https://example.com/very-long-url"
                  type="url"
                  value={longUrl}
                  onChange={(e) => {
                    setLongUrl(e.target.value);
                    if (error) setError("");
                  }}
                  aria-invalid={!!error}
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="h-12 bg-brand-600 text-base text-white hover:bg-brand-700"
              disabled={isLoading || !longUrl.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Shortening…
                </>
              ) : (
                "Shorten link"
              )}
            </Button>

            {error && (
              <p
                role="alert"
                className="animate-fade-in-up text-center text-sm text-red-600 dark:text-red-400"
              >
                {error}
              </p>
            )}
          </form>

          {shortUrl && (
            <div className="mt-6 animate-fade-in-up border-t border-slate-100 pt-6 dark:border-white/10">
              <h2 className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Your short link
              </h2>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 pl-4 dark:border-white/10 dark:bg-ink-900">
                <a
                  href={`https://${shortUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center gap-1 truncate font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-200 dark:hover:text-white"
                >
                  {shortUrl}
                  <ArrowUpRight size={16} className="shrink-0 text-slate-400" />
                </a>
                <Button
                  type="button"
                  size="sm"
                  className="h-9 shrink-0 bg-brand-600 text-white hover:bg-brand-700"
                  onClick={handleCopy}
                  aria-label="Copy short link"
                >
                  {isCopied ? (
                    <>
                      <Check size={16} className="mr-1.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} className="mr-1.5" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <Footer />
        </div>
      </main>
    </div>
  );
}
