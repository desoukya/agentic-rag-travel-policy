import type { FastifyInstance } from "fastify";

import type { AskRequest } from "@agentic/shared";

export function registerAskRoute(app: FastifyInstance) {
  app.post<{ Body: AskRequest }>("/ask", async (request) => {
    return {
      mode: "langchain",
      question: request.body.question,
      namespace: request.body.namespace,
      nextStep: "Implement retrieve -> answer -> evaluate using LangChain and Pinecone."
    };
  });
}
