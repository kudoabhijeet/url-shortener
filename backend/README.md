# URL Shortener
[![Node.JS CI Status](https://github.com/kudoabhijeet/url-shortener/actions/workflows/node.js.yml/badge.svg)](https://github.com/kudoabhijeet/url-shortener/actions/workflows/node.js.yml)


A short url application is used to created short links, aliases against a long url. 
They are generally used to share long urls over text messages and tweets. 

## Features 
1. User should be able to create short links, by supplying a long-url.
2. Whenever a user clicks on a short link, it should redirect to the corresponding long-url.
3. User should be able to create customized short links, with max length of 6 characters.

## System Design (Requirements)

1. Service should be always available.
2. Short to Long URL should be fast. 
3. Service should be scalable.

## System Design (Approach)

1. Use of load balancers to reduce SPOF.
2. Use of cache system to reduce database calls.

## Local development

Runs fully offline using a local Postgres + Redis via Docker. The app itself runs
through `npm`, not in a container.

```bash
cp .env.example .env        # defaults already match the docker-compose stack
docker compose up -d        # Postgres on :5432, Redis on :6379
npm install
npm run db:migrate          # apply Prisma migrations to the local DB
npm run start:dev           # API on http://localhost:3001
```

Env is loaded via `dotenv` (see [src/run.ts](src/run.ts)); Prisma also reads `.env`
for `DATABASE_URL` / `DIRECT_URL`. The shared Redis client in
[src/services/redis.ts](src/services/redis.ts) enables TLS only for `rediss://`
URLs, so plain local Redis works without extra config.

### Database migrations

- `npm run db:migrate` — `prisma migrate dev` (local; can create/reset).
- `npm run db:deploy` — `prisma migrate deploy` (production/CI; apply-only, no resets).

Migration files under `src/prisma/migrations/` are committed so `migrate deploy`
can replay them on the server.

## Deployment

The backend runs on a DigitalOcean VM behind nginx, managed by **pm2** (process name
`backend`). Pushing backend changes to `main` triggers
[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml), which SSHes in and
runs `git pull → npm ci → prisma generate → prisma migrate deploy → npm run build →
pm2 restart backend`. Production env (`DATABASE_URL`, `REDIS_URL`, etc.) lives in the
server's `~/url-shortener/backend/.env`, pointing at Supabase + Upstash.

> **Note:** `Dockerfile` and `docker-compose.yml` are for **local dev only**. The
> Dockerfile is currently not part of any deployment path and is unused.




