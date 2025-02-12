import { Router } from "express";
import Redis from "ioredis";
import {
  createRandomCode,
  getShortCodeDetails,
} from "../controllers/shortCode.controller.js";
import checkCache from "../middleware/caching.middleware";

const route = Router();
const redis = new Redis(process.env.REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
});

redis.on("error", (err) => console.error("❌ Redis Error:", err));

/**
 * @route GET /:code
 * @desc Retrieve the long URL using the short code (with caching)
 */
route.get("/:code", checkCache, async (req, res) => {
  try {
    const shortcode = req.params.code;

    if (!shortcode) {
      return res.status(400).json({ message: "Short code is required" });
    }

    const presentShortCode = await getShortCodeDetails(shortcode);
    if (!presentShortCode) {
      return res.status(404).json({ message: "Not Found" });
    }

    console.log(`🔗 Retrieved URL from DB: ${presentShortCode.longUrl}`);

    await redis.set(shortcode, presentShortCode.longUrl, "EX", 3600);

    // return res.status(200).json({ longURL: presentShortCode.longUrl });
  } catch (error) {
    console.error("❌ Error in GET /:code:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route POST /create
 * @desc Create a short code for a long URL
 */
route.post("/create", async (req, res) => {
  try {
    const longurl = req.body.url;

    if (!longurl) {
      return res.status(400).json({ message: "URL is required" });
    }

    const createdShortCode = await createRandomCode(longurl);

    return res.status(200).json({ data: createdShortCode });
  } catch (error) {
    console.error("❌ Error in POST /create:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default route;
