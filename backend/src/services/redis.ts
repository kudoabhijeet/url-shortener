import Redis from "ioredis";

// Single shared Redis client for the whole app.
// Upstash (prod) uses `rediss://` and needs TLS; local Redis uses plain `redis://`.
const url = process.env.REDIS_URL ?? "redis://localhost:6379";

const redis = new Redis(
  url,
  url.startsWith("rediss://") ? { tls: { rejectUnauthorized: false } } : {}
);

redis.on("error", (err) => console.error("❌ Redis Error:", err));

export default redis;
