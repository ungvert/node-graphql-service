import { createServer } from "./server.js";
import "dotenv/config";

const port = Number(process.env.PORT) || 8000;

const server = await createServer();
server.listen(port);
console.log(`
  🚀  Server is running!
  🔉  Listening on port ${port}
  📭  Query at http://localhost:${port}/graphql
`);
