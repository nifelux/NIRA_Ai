// src/lib/types/model.ts

export type NiraModelName =
  | "gemma"
  | "gemini"
  | "gemini_pro"
  | "deepseek";

export interface ModelRouteResult {
  text: string;
  model: NiraModelName;
  fallbackUsed: boolean;
}
