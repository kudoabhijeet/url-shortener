This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Environment variables

Config is read in [src/lib/config.ts](src/lib/config.ts) from two public vars:

| Variable                  | Purpose                                          |
| ------------------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the backend API (create + resolve).  |
| `NEXT_PUBLIC_SHORT_DOMAIN`| Domain shown in generated short links (no proto).|

- Local dev values live in `.env.development` and point at the local backend
  (`http://localhost:3001`). Start the backend first (see `../backend/README.md`).
- `.env.example` documents the production values.
- For per-machine overrides, create `.env.local` (git-ignored).

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The frontend auto-deploys to Vercel on every push to `main` (Vercel's GitHub
integration handles this — no workflow needed in this repo).

One-time setup in the Vercel project:

1. **Root Directory** must be set to `frontend` (this app lives in a subdirectory).
2. Set the **Production** environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_BACKEND_URL=https://app.ku2.me`
   - `NEXT_PUBLIC_SHORT_DOMAIN=ku2.me`

These are not committed (only `.env.example` / `.env.development` are) so they must
be configured in Vercel for production builds.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
