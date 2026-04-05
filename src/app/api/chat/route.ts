// src/app/api/chat/route.ts

import { NextResponse } from "next/server";
import { routeAiRequest } from "@/lib/ai/router";
import type { ChatRequestBody, ChatResponseBody } from "@/lib/types/chat";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;

    const message = body.message?.trim();
    const mode = body.mode === "career" ? "career" : "study";
    const messages = body.messages ?? [];

    if (!message) {
      return NextResponse.json(
        {
          ok: false,
          message: "Message is required.",
          source: "fallback",
          mode,
        } satisfies ChatResponseBody,
        { status: 400 }
      );
    }

    const result = await routeAiRequest({
      message,
      mode,
      messages,
    });

    return NextResponse.json({
      ok: true,
      message: result.content,
      source: result.source,
      mode,
    } satisfies ChatResponseBody);
  } catch (error) {
    console.error("API /chat error full object:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong while processing your request.";

    return NextResponse.json(
      {
        ok: false,
        message,
        source: "fallback",
        mode: "study",
      } satisfies ChatResponseBody,
      { status: 500 }
    );
  }
}