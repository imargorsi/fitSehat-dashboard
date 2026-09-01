import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { macroTargets, type TMacroTarget } from "@/lib/db/schema";

export async function getActiveMacroTarget(userId: string): Promise<TMacroTarget | null> {
  const rows = await db
    .select()
    .from(macroTargets)
    .where(eq(macroTargets.userId, userId))
    .orderBy(desc(macroTargets.updatedAt))
    .limit(1);
  return rows[0] ?? null;
}

export async function listMacroTargets(userId: string): Promise<TMacroTarget[]> {
  return db
    .select()
    .from(macroTargets)
    .where(eq(macroTargets.userId, userId))
    .orderBy(desc(macroTargets.updatedAt));
}
