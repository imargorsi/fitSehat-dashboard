import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { mealOptions, type TMealOption } from "@/lib/db/schema";

export async function listMealOptions(userId: string): Promise<TMealOption[]> {
  return db
    .select()
    .from(mealOptions)
    .where(eq(mealOptions.userId, userId));
}

export async function getMealOption(userId: string, id: string): Promise<TMealOption | null> {
  const rows = await db
    .select()
    .from(mealOptions)
    .where(and(eq(mealOptions.id, id), eq(mealOptions.userId, userId)))
    .limit(1);
  return rows[0] ?? null;
}
