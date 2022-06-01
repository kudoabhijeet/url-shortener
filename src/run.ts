import app from "./app";
import { connect } from "./db/connect";

(async function start(){
    
    await connect()
    const PORT = 8081
    app.listen(PORT, ()=>{
        console.log(`Listening on https://localhost:${PORT}`)
    })    
})()