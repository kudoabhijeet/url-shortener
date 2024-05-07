import Router from 'express'
import { createClient } from 'redis'
import { createRandomCode, getShortCodeDetails } from '../controllers/shortCode.controller'
import checkCache from '../middleware/caching.middleware'
const route = Router()

const redis_client = createClient({ url: process.env.REDIS_URL })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

route.get('/:code', checkCache, async (req, res) => {
    const shortcode = req.params.code

    const presentShortCode = await getShortCodeDetails(shortcode)
    if (!presentShortCode) {
        return res.status(404).json({
            message: " Not Found"
        })
    }

    (await redis_client).SET(shortcode, presentShortCode.longUrl);

    return res.json({
        "longURL": presentShortCode.longUrl
    })
    // return res.redirect(presentShortCode.longUrl)

})

route.post('/create', async (req, res) => {
    const longurl = req.body.url

    const createdShortCode = await createRandomCode(longurl)

    return res.status(200).json({
        data: createdShortCode
    })
})


export default route