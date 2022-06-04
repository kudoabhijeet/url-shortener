import * as redis from 'redis'

const redis_client = redis.createClient(6379)

export default async function checkCache(req, res, next){
    const code = req.params.code
    redis_client.get(code, (err, data) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        //if no match found
        if (data != null) {
          res.send(data);
        } else {
          //proceed to next middleware function
          next();
        }
      });
}
