import app from "./app";
import { connection } from "./db/connect";

(async function start(){
    
    await connection()
    const PORT = 8081
    app.listen(PORT, ()=>{
        console.log(`Listening on https://localhost:${PORT}`)
    })    
})()