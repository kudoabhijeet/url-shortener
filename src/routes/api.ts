import Router from 'express'
import { createRandomCode, getShortCodeDetails } from '../controllers/shortCode.controller'
import * as redis from 'redis'
import checkCache from '../middleware/caching.middleware'
const route = Router()
const redis_client = redis.createClient(6379)

route.get('/:code', checkCache, async(req, res)=> {
    const shortcode = req.params.code

    const presentShortCode = await getShortCodeDetails(shortcode)
    if(!presentShortCode){
        return res.status(404).json({
            message: " Not Found"
        })
    }
    redis_client.setex(shortcode, 3600, JSON.stringify(presentShortCode));
    return res.json({
        "longURL" : presentShortCode.longUrl
    })
    // return res.redirect(presentShortCode.longUrl)
    
})

route.post('/create', async(req,res)=>{
    const longurl = req.body.url

    const createdShortCode = await createRandomCode(longurl)
    
    return res.status(200).json({
        data: createdShortCode
    })
})


export default route