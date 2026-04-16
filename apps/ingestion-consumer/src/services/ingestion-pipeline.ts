import { Pinecone } from "@pinecone-database/pinecone";

import {
  chunkDataset,
  createEmbeddingsClient,
  readEnv,
  requireEnv,
  type IngestDataset,
} from "@agentic/shared";

export async function runIngestionPipeline(payload: IngestDataset) {
  const env = readEnv();
  const chunks = chunkDataset(payload);
  const embeddingsClient = createEmbeddingsClient(env);
  const vectors = await embeddingsClient.embedDocuments(
    chunks.map((chunk) => chunk.text),
  );

  const pinecone = new Pinecone({
    apiKey: requireEnv(env.PINECONE_API_KEY, "PINECONE_API_KEY"),
  });
  const indexName = requireEnv(env.PINECONE_INDEX, "PINECONE_INDEX");
  const index = env.PINECONE_HOST
    ? pinecone.index(indexName, env.PINECONE_HOST)
    : pinecone.index(indexName);
  const namespace = index.namespace(payload.namespace);

  await namespace.upsert(
    chunks.map((chunk, index) => ({
      id: chunk.id,
      values: vectors[index],
      metadata: {
        text: chunk.text,
        ...chunk.metadata,
      },
    })),
  );

  return {
    datasetId: payload.datasetId,
    namespace: payload.namespace,
    documentCount: payload.documents.length,
    chunkCount: chunks.length,
    status: "completed" as const,
    embeddingProvider: env.EMBEDDING_PROVIDER,
    embeddingModel: env.EMBEDDING_MODEL,
  };
}
