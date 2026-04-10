// src/app/api/chat/route.ts

import { NextResponse } from "next/server";
import { handleAIRequest } from "@/lib/ai/router";

export async function POST(req: Request) {
  try {
    const { message, mode, sessionId } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ message: "No message provided." }, { status: 400 });
    }

    const resolvedMode = mode === "career" ? "career" : "study";
    const safeSessionId =
      typeof sessionId === "string" && sessionId.trim()
        ? sessionId.trim()
        : "temp_session";

    const result = await handleAIRequest(
      message,
      resolvedMode,
      safeSessionId
    );

    return NextResponse.json({
      message: result.message,
      mode: resolvedMode,
      model: result.model,
      fallbackUsed: result.fallbackUsed,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        message: "Server error. Please try again.",
        model: "gemma",
        fallbackUsed: true,
      },
      { status: 500 }
    );
  }
}
