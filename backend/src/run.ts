import "dotenv/config";
import app from "./app";

(async function start() {
  const PORT = process.env.PORT ?? 3001;
  app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
  });
})();
