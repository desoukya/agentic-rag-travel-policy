import Fastify from "fastify";

import { loadEnv } from "@agentic/shared";

import { registerIngestionRoutes } from "./routes/ingest.js";

loadEnv();

const app = Fastify({ logger: true });

app.get("/health", async () => ({ ok: true }));
registerIngestionRoutes(app);

const port = Number(process.env.PORT ?? 4001);

app.listen({ port, host: "0.0.0.0" }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});
