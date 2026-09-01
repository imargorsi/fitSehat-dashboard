import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { profiles, type TProfile } from "@/lib/db/schema";

export async function getProfile(userId: string): Promise<TProfile | null> {
  const rows = await db.select().from(profiles).where(eq(profiles.userId, userId)).limit(1);
  return rows[0] ?? null;
}

export async function ensureProfile(userId: string): Promise<TProfile> {
  const existing = await getProfile(userId);
  if (existing) {
    return existing;
  }

  try {
    const created = await db.insert(profiles).values({ userId }).returning();
    if (created[0]) {
      return created[0];
    }
  } catch {
    const raced = await getProfile(userId);
    if (raced) {
      return raced;
    }
  }

  throw new Error("Could not create profile");
}
