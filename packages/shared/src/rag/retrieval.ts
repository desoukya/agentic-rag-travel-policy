import { Pinecone } from "@pinecone-database/pinecone";

import type { AppEnv } from "../config/env.js";
import { requireEnv } from "../config/env.js";
import { DEFAULT_TOP_K } from "./constants.js";
import { createEmbeddingsClient } from "./embeddings.js";
import type { RetrievalChunk } from "./types.js";

export async function retrieveChunks(
  env: AppEnv,
  question: string,
  namespace: string,
  topK = DEFAULT_TOP_K
): Promise<RetrievalChunk[]> {
  const embeddingsClient = createEmbeddingsClient(env);
  const [queryVector] = await embeddingsClient.embedDocuments([question]);

  const pinecone = new Pinecone({
    apiKey: requireEnv(env.PINECONE_API_KEY, "PINECONE_API_KEY")
  });
  const indexName = requireEnv(env.PINECONE_INDEX, "PINECONE_INDEX");
  const index = env.PINECONE_HOST ? pinecone.index(indexName, env.PINECONE_HOST) : pinecone.index(indexName);

  const response = await index.namespace(namespace).query({
    vector: queryVector,
    topK,
    includeMetadata: true
  });

  return (response.matches ?? []).map((match) => ({
    id: match.id,
    score: match.score,
    text: typeof match.metadata?.text === "string" ? match.metadata.text : "",
    metadata: match.metadata ?? {}
  }));
}
