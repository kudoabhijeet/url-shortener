import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
});

redis.on("error", (err) => console.error("❌ Redis Error:", err));

export default async function checkCache(req, res, next) {
  try {
    const shortcode = req.params.code;

    if (!shortcode) {
      return res.status(400).json({ error: "Short code is required" });
    }

    const cachedUrl = await redis.get(shortcode);

    if (cachedUrl) {
      console.log(`✅ Cache hit for: ${shortcode}, redirecting...`);
      return res.redirect(301, cachedUrl);
      // return res.status(200).json({ longURL: cachedUrl });
    } else {
      console.log(`❌ Cache miss for: ${shortcode}`);
      next();
    }
  } catch (error) {
    console.error("❌ Redis Cache Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
