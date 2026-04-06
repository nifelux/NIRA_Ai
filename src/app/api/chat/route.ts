// src/app/api/chat/route.ts

import { NextResponse } from "next/server";
import { handleAIRequest } from "@/lib/ai/router";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ message: "No message provided" });
    }

    const response = await handleAIRequest(message);

    return NextResponse.json({ message: response });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: "Server error. Please try again.",
    });
  }
}
