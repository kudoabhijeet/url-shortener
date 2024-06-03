import { createClient } from 'redis'

const redis_client = createClient({ url: process.env.REDIS_URL, pingInterval: 3000 })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();


export default async function checkCache(req, res, next) {
    const code = req.params.code;
    const data = (await redis_client).GET(code).catch((err) => res.status(500).send(err))

    if (data) {
        res.status(200).send(data);
    } else {
        next(); // If there's no data, proceed to the next middleware
    }
}