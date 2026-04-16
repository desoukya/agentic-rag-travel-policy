import { HumanMessage, SystemMessage } from "@langchain/core/messages";

import { createChatModel, retrieveChunks, readEnv, type AskRequest } from "@agentic/shared";

export async function answerQuestion(request: AskRequest) {
  const env = readEnv();
  const sources = await retrieveChunks(env, request.question, request.namespace);
  const chatModel = createChatModel(env);
  const context = sources
    .map((chunk, index) => {
      const title = typeof chunk.metadata.title === "string" ? chunk.metadata.title : "Untitled";
      return `[Source ${index + 1}: ${title}]\n${chunk.text}`;
    })
    .join("\n\n");

  const response = await chatModel.invoke([
    new SystemMessage(
      "Answer using only the provided context. If the context is insufficient, say that you do not have enough information."
    ),
    new HumanMessage(`Question: ${request.question}\n\nContext:\n${context}`)
  ]);

  return {
    mode: "langchain" as const,
    question: request.question,
    answer: typeof response.content === "string" ? response.content : JSON.stringify(response.content),
    sources
  };
}
