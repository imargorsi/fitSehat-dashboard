import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { withRouteHandler } from "@/lib/errors/with-route-handler";

export const dynamic = "force-dynamic";

export const GET = withRouteHandler("health.GET", async () => {
  const result = await db.execute(sql`select now()::text as now`);
  const now = (result.rows[0] as { now?: string } | undefined)?.now ?? null;

  return NextResponse.json({
    ok: true,
    database: "connected",
    now,
  });
});
