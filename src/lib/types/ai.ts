// src/lib/types/ai.ts

export type AiMode = "study" | "career";

export type AiRole = "user" | "assistant" | "system";

export interface AiMessage {
  role: AiRole;
  content: string;
}

export interface AiResponse {
  message: string;
  mode: AiMode;
  model?: string;
  fallbackUsed?: boolean;
}
