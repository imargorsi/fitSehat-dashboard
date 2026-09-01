import { and, desc, eq, gte, lte } from "drizzle-orm";

import { db } from "@/lib/db";
import { calorieLogs, type TCalorieLog } from "@/lib/db/schema";

export async function listCalorieLogs(userId: string): Promise<TCalorieLog[]> {
  return db
    .select()
    .from(calorieLogs)
    .where(eq(calorieLogs.userId, userId))
    .orderBy(desc(calorieLogs.loggedOn), desc(calorieLogs.createdAt));
}

export async function listCalorieLogsInRange(
  userId: string,
  from: string,
  to: string
): Promise<TCalorieLog[]> {
  return db
    .select()
    .from(calorieLogs)
    .where(
      and(eq(calorieLogs.userId, userId), gte(calorieLogs.loggedOn, from), lte(calorieLogs.loggedOn, to))
    )
    .orderBy(desc(calorieLogs.loggedOn));
}
