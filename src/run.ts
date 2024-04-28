import app from "./app";

(async function start() {
    const PORT=process.env.PORT
    app.listen(PORT, () => {
        console.log(`Listening on https://localhost:${PORT}`)
    })
})()