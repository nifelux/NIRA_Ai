// src/app/api/usage/route.ts

import { NextResponse } from "next/server";
import { getUsageSummary } from "@/lib/growth/UsageTracker";
import { getUserTier } from "@/lib/policies/TierPolicy";

export async function GET() {
  try {
    const tier = getUserTier();
    const usage = await getUsageSummary(tier);

    return NextResponse.json(usage);
  } catch (error) {
    console.error("Usage API error:", error);

    return NextResponse.json(
      { message: "Failed to load usage." },
      { status: 500 }
    );
  }
}
