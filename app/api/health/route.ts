import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const result = await db.execute(sql`select now()::text as now`);
    const now = (result.rows[0] as { now?: string } | undefined)?.now ?? null;

    return NextResponse.json({
      ok: true,
      database: "connected",
      now,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error";
    return NextResponse.json(
      {
        ok: false,
        database: "error",
        ...(process.env.NODE_ENV === "production" ? {} : { message }),
      },
      { status: 503 }
    );
  }
}
