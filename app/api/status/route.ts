import { NextResponse } from "next/server";
import { getServerStatus } from "@/lib/services/status";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getServerStatus();
  return NextResponse.json(status, { headers: { "Cache-Control": "public, s-maxage=20, stale-while-revalidate=40" } });
}
