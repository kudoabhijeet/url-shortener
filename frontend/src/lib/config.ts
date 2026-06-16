/**
 * App configuration sourced from environment variables.
 * Values fall back to production defaults so the app still works without a .env file.
 */

// Base URL of the backend API, without a trailing slash.
export const BACKEND_URL = (
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "https://app.ku2.me"
).replace(/\/$/, "");

// Domain shown to users for the generated short link (no protocol).
export const SHORT_DOMAIN =
  process.env.NEXT_PUBLIC_SHORT_DOMAIN ?? "ku2.me";
