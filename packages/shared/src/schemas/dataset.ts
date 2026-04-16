import { z } from "zod";

export const documentSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  text: z.string().min(1),
  metadata: z.record(z.union([z.string(), z.number(), z.boolean(), z.array(z.string())])).default({})
});

export const ingestDatasetSchema = z.object({
  datasetId: z.string().min(1),
  namespace: z.string().min(1),
  documents: z.array(documentSchema).min(1)
});

export type IngestDocument = z.infer<typeof documentSchema>;
export type IngestDataset = z.infer<typeof ingestDatasetSchema>;
