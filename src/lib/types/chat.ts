// src/lib/types/chat.ts

export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequestBody {
  message: string;
  mode?: "study" | "career";
  messages?: ChatMessage[];
}

export interface ChatResponseBody {
  ok: boolean;
  message: string;
  source: string;
  mode: "study" | "career";
}