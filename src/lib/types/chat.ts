export type ChatRole = "system" | "user" | "assistant";

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