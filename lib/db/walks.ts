import { and, desc, eq, gte, lte } from "drizzle-orm";

import { db } from "@/lib/db";
import { walkDays, type TWalkDay } from "@/lib/db/schema";

export async function getWalkDay(userId: string, walkedOn: string): Promise<TWalkDay | null> {
  const rows = await db
    .select()
    .from(walkDays)
    .where(and(eq(walkDays.userId, userId), eq(walkDays.walkedOn, walkedOn)))
    .limit(1);
  return rows[0] ?? null;
}

export async function listWalkDaysInRange(
  userId: string,
  from: string,
  to: string
): Promise<TWalkDay[]> {
  return db
    .select()
    .from(walkDays)
    .where(and(eq(walkDays.userId, userId), gte(walkDays.walkedOn, from), lte(walkDays.walkedOn, to)))
    .orderBy(desc(walkDays.walkedOn));
}
