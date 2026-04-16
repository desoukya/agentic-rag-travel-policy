export type ChatProvider = "openai" | "ollama";
export type EmbeddingProvider = "openai" | "ollama";

export interface RetrievalChunk {
  id: string;
  text: string;
  score?: number;
  metadata: Record<string, unknown>;
}

export interface AskRequest {
  question: string;
  namespace: string;
}
