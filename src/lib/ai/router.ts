// src/lib/ai/router.ts

import { buildPromptMessages, getNiraSystemPrompt } from "@/lib/ai/prompts";
import { runLlmResponsePipeline } from "@/lib/ai/LlmResponsePipeline";
import { callGemma } from "@/lib/ai/llm";
import { readRetrievedKnowledge } from "@/lib/retrieval/RetrievedKnowledgeReader";
import { writeRetrievedKnowledge } from "@/lib/retrieval/RetrievedKnowledgeWriter";
import type { AiPipelineResult } from "@/lib/types/ai";
import type { ChatMessage } from "@/lib/types/chat";

interface RouteAiRequestParams {
  message: string;
  mode: "study" | "career";
  messages: ChatMessage[];
}

export async function routeAiRequest({
  message,
  mode,
  messages,
}: RouteAiRequestParams): Promise<AiPipelineResult> {
  const retrieved = await readRetrievedKnowledge({
    query: message,
    mode,
  });

  if (retrieved) {
    return {
      content: retrieved.answer,
      source: "retrieved_knowledge",
      shouldStore: false,
      qualityScore: retrieved.qualityScore,
    };
  }

  const systemPrompt = getNiraSystemPrompt(mode);

  const promptMessages = buildPromptMessages({
    systemPrompt,
    messages,
    latestUserMessage: message,
  });

  const gemmaResponse = await callGemma({
    messages: promptMessages,
  });

  const pipelineResult = runLlmResponsePipeline({
    content: gemmaResponse.content,
    source: "gemma",
  });

  if (pipelineResult.shouldStore) {
    await writeRetrievedKnowledge({
      query: message,
      answer: pipelineResult.content,
      source: "gemma",
      qualityScore: pipelineResult.qualityScore,
      mode,
    });
  }

  return pipelineResult;
}