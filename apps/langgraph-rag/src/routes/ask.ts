import type { FastifyInstance } from "fastify";

import type { AskRequest } from "@agentic/shared";

export function registerAskRoute(app: FastifyInstance) {
  app.post<{ Body: AskRequest }>("/ask", async (request) => {
    return {
      mode: "langgraph",
      question: request.body.question,
      namespace: request.body.namespace,
      nextStep: "Implement retrieval, weather tool routing, evaluation, and retry graph."
    };
  });
}
