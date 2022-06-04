import { getShortCodeRepository, ShortCode } from "../db/shortcode.entity";
import { v4  as uuid } from 'uuid'
import { nanoid } from 'nanoid'

let tries = 0
export async function createRandomCode(longurl : string) : Promise<ShortCode> {
    const randomCode = nanoid(5) 
    const newCode = new ShortCode()
    
    if(await getShortCodeDetails(randomCode)){
        if(tries < 5){
            tries++;
            return await createRandomCode(longurl)
        }
        throw new Error("too many tries")
    }

    newCode.id = uuid()
    newCode.shortcode = randomCode
    newCode.longUrl = longurl
    const saveCode = await getShortCodeRepository().save(newCode)
    
    return saveCode
   
}

export async function getShortCodeDetails(shortcode : string) : Promise<ShortCode | undefined> {
    const presentEntity = await getShortCodeRepository().findOne(shortcode)
    return presentEntity
}

