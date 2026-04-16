export type ChatProvider = "ollama";
export type EmbeddingProvider = "ollama";

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

export interface AskResponse {
  mode: "langchain" | "langgraph";
  question: string;
  answer: string;
  sources: RetrievalChunk[];
}
