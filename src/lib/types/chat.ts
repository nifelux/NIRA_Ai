// src/lib/types/chat.ts

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  role: ChatRole;
  content: string;
  model?: string;
  fallbackUsed?: boolean;
}
