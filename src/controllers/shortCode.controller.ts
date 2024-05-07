// import { getShortCodeRepository, ShortCode } from "../db/shortcode.entity";
import  {PrismaClient} from "@prisma/client"
import { nanoid } from 'nanoid'

const prisma = new PrismaClient()

let tries = 0
export async function createRandomCode(longurl : string) {
    const randomCode = nanoid(5) 
    if(await getShortCodeDetails(randomCode)){
        if(tries < 5){
            tries++;
            return await createRandomCode(longurl)
        }
        throw new Error("too many tries")
    }

    // const saveCode = await getShortCodeRepository().save(newCode)
    const saveCode = await prisma.urls.create({
        data: {
            shortcode: randomCode,
            longUrl: longurl,
        },
    })  
    return saveCode
}

export async function getShortCodeDetails(short : string) {
    const presentEntity = await prisma.urls.findFirst({ where: { shortcode: short}})
    return presentEntity
}

