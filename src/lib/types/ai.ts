// src/lib/types/ai.ts

export type AiSource =
  | "knowledge_base"
  | "solver"
  | "examples"
  | "retrieved_knowledge"
  | "free_source"
  | "gemma"
  | "gemini"
  | "deepseek"
  | "openai"
  | "fallback";

export interface AiRawResponse {
  content: string;
  source: AiSource;
}

export interface AiFormattedResponse {
  content: string;
  source: AiSource;
}

export interface AiValidationResult {
  valid: boolean;
  reason?: string;
}

export interface AiPipelineResult {
  content: string;
  source: AiSource;
  shouldStore: boolean;
  qualityScore: number;
}
