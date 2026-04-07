import { NextResponse } from "next/server";
import { handleAIRequest } from "@/lib/ai/router";
import type { NiraMode } from "@/lib/ai/types";

export async function POST(req: Request) {
  try {
    const { message, mode } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { message: "No message provided" },
        { status: 400 }
      );
    }

    const safeMode: NiraMode = mode === "career" ? "career" : "study";
    const response = await handleAIRequest(message, safeMode);

    return NextResponse.json({ message: response });
  } catch (err) {
    console.error("Chat route error:", err);

    return NextResponse.json(
      {
        message: err instanceof Error ? err.message : "Unknown server error",
      },
      { status: 500 }
    );
  }
}
