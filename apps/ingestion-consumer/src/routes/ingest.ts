import type { FastifyInstance } from "fastify";

import { ingestDatasetSchema } from "@agentic/shared";

import { runIngestionPipeline } from "../services/ingestion-pipeline.js";

export function registerIngestionRoutes(app: FastifyInstance) {
  app.post("/ingest", async (request, reply) => {
    const payload = ingestDatasetSchema.parse(request.body);

    const response = await runIngestionPipeline(payload);

    return reply.code(202).send(response);
  });
}
