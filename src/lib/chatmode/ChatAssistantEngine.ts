// src/lib/chatmode/ChatAssistantEngine.ts

import { buildChatProfileContext } from "@/lib/chatmode/ChatContextBridge";
import {
  detectChatIntent,
  buildModeSwitchSuggestion,
} from "@/lib/chatmode/ChatIntentDetector";

export function buildChatAssistantPrompt(
  sessionId: string,
  userMessage: string
) {
  const context = buildChatProfileContext(sessionId);
  const intent = detectChatIntent(userMessage);

  return `
You are NIRA in Chat Mode.

Chat Mode rules:
- You can answer broad questions
- You can answer study and career questions too
- You are more flexible than Study Mode or Career Mode
- If relevant, use the user's study and career profile context
- If the question clearly fits Study Mode or Career Mode, answer it well here, but you may gently suggest that the user can switch modes for more structured help
- Keep the response natural, helpful, and direct
- If using lists, each point must start on a new line

User context:
${context}

Detected intent:
${intent}

User message:
${userMessage}

Return only the final answer.
`.trim();
}

export function appendModeSuggestionIfNeeded(
  userMessage: string,
  answer: string
) {
  const intent = detectChatIntent(userMessage);
  const suggestion = buildModeSwitchSuggestion(intent);

  if (!suggestion) return answer;

  return `${answer}\n\n${suggestion}`;
}
