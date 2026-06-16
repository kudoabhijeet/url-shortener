import redis from "../services/redis";

export default async function checkCache(req, res, next) {
  try {
    const shortcode = req.params.code;

    if (!shortcode) {
      return res.status(400).json({ error: "Short code is required" });
    }

    const cachedUrl = await redis.get(shortcode);

    if (cachedUrl) {
      console.log(`✅ Cache hit for: ${shortcode}, redirecting...`);
      return res.redirect(302, cachedUrl);
    } else {
      console.log(`❌ Cache miss for: ${shortcode}`);
      next();
    }
  } catch (error) {
    console.error("❌ Redis Cache Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
