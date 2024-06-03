#!/usr/bin/env bash
# docker compose up -d 

echo '🟡 - Waiting for database to be ready...'

./scripts/wait-for-it.sh "Vercel PostgreSQL" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
npm run build
npm start