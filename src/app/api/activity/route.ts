// src/app/api/activity/route.ts

import { NextResponse } from "next/server";
import { getRecentActivity } from "@/lib/activity/ActivityStore";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ activities: [] });
    }

    const activities = getRecentActivity(sessionId);

    return NextResponse.json({ activities });
  } catch (error) {
    console.error("Activity API error:", error);
    return NextResponse.json({ activities: [] }, { status: 500 });
  }
}
