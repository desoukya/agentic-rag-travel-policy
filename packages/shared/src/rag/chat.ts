import { ChatOllama } from "@langchain/ollama";

import type { AppEnv } from "../config/env.js";

export function createChatModel(env: AppEnv) {
  return new ChatOllama({
    baseUrl: env.LLM_BASE_URL,
    model: env.CHAT_MODEL
  });
}
