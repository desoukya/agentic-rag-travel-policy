import { OllamaEmbeddings } from "@langchain/ollama";
import { OpenAIEmbeddings } from "@langchain/openai";

import type { AppEnv } from "../config/env.js";
import { requireEnv } from "../config/env.js";

export interface EmbeddingsClient {
  embedDocuments(texts: string[]): Promise<number[][]>;
}

export function createEmbeddingsClient(env: AppEnv): EmbeddingsClient {
  if (env.EMBEDDING_PROVIDER === "openai") {
    return new OpenAIEmbeddings({
      apiKey: requireEnv(env.OPENAI_API_KEY, "OPENAI_API_KEY"),
      model: env.EMBEDDING_MODEL
    });
  }

  return new OllamaEmbeddings({
    baseUrl: env.LLM_BASE_URL,
    model: env.EMBEDDING_MODEL
  });
}
