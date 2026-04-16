import type { IngestDataset, IngestDocument } from "../schemas/dataset.js";

export interface ChunkedDocument {
  id: string;
  documentId: string;
  title: string;
  text: string;
  chunkIndex: number;
  metadata: Record<string, unknown>;
}

interface ChunkingOptions {
  chunkSize?: number;
  chunkOverlap?: number;
}

const DEFAULT_CHUNK_SIZE = 500;
const DEFAULT_CHUNK_OVERLAP = 100;

export function chunkDataset(dataset: IngestDataset, options: ChunkingOptions = {}): ChunkedDocument[] {
  return dataset.documents.flatMap((document) => chunkDocument(dataset.datasetId, document, options));
}

export function chunkDocument(
  datasetId: string,
  document: IngestDocument,
  options: ChunkingOptions = {}
): ChunkedDocument[] {
  const chunkSize = options.chunkSize ?? DEFAULT_CHUNK_SIZE;
  const chunkOverlap = options.chunkOverlap ?? DEFAULT_CHUNK_OVERLAP;
  const step = Math.max(1, chunkSize - chunkOverlap);
  const normalizedText = document.text.replace(/\s+/g, " ").trim();

  if (!normalizedText) {
    return [];
  }

  const chunks: ChunkedDocument[] = [];

  for (let start = 0; start < normalizedText.length; start += step) {
    const end = Math.min(normalizedText.length, start + chunkSize);
    const text = normalizedText.slice(start, end).trim();

    if (!text) {
      continue;
    }

    const chunkIndex = chunks.length;

    chunks.push({
      id: `${document.id}#chunk-${chunkIndex}`,
      documentId: document.id,
      title: document.title,
      text,
      chunkIndex,
      metadata: {
        datasetId,
        documentId: document.id,
        title: document.title,
        chunkIndex,
        ...document.metadata
      }
    });

    if (end >= normalizedText.length) {
      break;
    }
  }

  return chunks;
}
