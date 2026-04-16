import type { FastifyInstance } from "fastify";

import type { AskRequest } from "@agentic/shared";

import { answerQuestion } from "../services/answer-question.js";

export function registerAskRoute(app: FastifyInstance) {
  app.post<{ Body: AskRequest }>("/ask", async (request) => {
    return answerQuestion(request.body);
  });
}
