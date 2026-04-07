import type { NiraMode } from "@/lib/ai/types";

export function getSystemInstruction(_mode: NiraMode = "study"): string {
  return "Return only the final answer in JSON.";
}
