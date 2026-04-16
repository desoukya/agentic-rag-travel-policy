import { OllamaEmbeddings } from "@langchain/ollama";

import type { AppEnv } from "../config/env.js";

export interface EmbeddingsClient {
  embedDocuments(texts: string[]): Promise<number[][]>;
}

export function createEmbeddingsClient(env: AppEnv): EmbeddingsClient {
  return new OllamaEmbeddings({
    baseUrl: env.LLM_BASE_URL,
    model: env.EMBEDDING_MODEL
  });
}
