import Fastify from "fastify";

import { loadEnv, readEnv } from "@agentic/shared";

import { registerAskRoute } from "./routes/ask.js";

loadEnv();

const app = Fastify({ logger: true });
const env = readEnv();

app.get("/health", async () => ({ ok: true, app: "langchain-rag" }));
registerAskRoute(app);

const port = Number(process.env.PORT ?? 4002);

app.listen({ port, host: "0.0.0.0" }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});
