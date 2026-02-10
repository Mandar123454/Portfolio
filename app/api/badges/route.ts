import { NextResponse } from "next/server";

import { EARNED_BADGES } from "@/lib/badges";

export const runtime = "nodejs";
export function GET() {
  return NextResponse.json(
    { badges: EARNED_BADGES },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=86400",
      },
    },
  );
}
