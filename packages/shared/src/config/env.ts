import { z } from "zod";

const envSchema = z.object({
  OPENAI_API_KEY: z.string().optional(),
  PINECONE_API_KEY: z.string().optional(),
  PINECONE_INDEX: z.string().optional(),
  PINECONE_HOST: z.string().optional(),
  LLM_BASE_URL: z.string().default("http://localhost:11434"),
  CHAT_PROVIDER: z.enum(["openai", "ollama"]).default("openai"),
  CHAT_MODEL: z.string().default("gpt-4o-mini"),
  EMBEDDING_PROVIDER: z.enum(["openai", "ollama"]).default("openai"),
  EMBEDDING_MODEL: z.string().default("text-embedding-3-small"),
  WEATHER_API_BASE_URL: z.string().default("https://api.open-meteo.com/v1")
});

export type AppEnv = z.infer<typeof envSchema>;

export function readEnv(source: NodeJS.ProcessEnv = process.env): AppEnv {
  return envSchema.parse(source);
}

export function requireEnv(value: string | undefined, key: keyof AppEnv): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}
