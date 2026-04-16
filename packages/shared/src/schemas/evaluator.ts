import { z } from "zod";

export const evaluationResultSchema = z.object({
  groundednessScore: z.number().min(0).max(1),
  completenessScore: z.number().min(0).max(1),
  citationQualityScore: z.number().min(0).max(1),
  needsRetry: z.boolean(),
  reasoning: z.string().min(1)
});

export type EvaluationResult = z.infer<typeof evaluationResultSchema>;
