import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { weeklyMeasurements, type TWeeklyMeasurement } from "@/lib/db/schema";

export async function listMeasurements(userId: string): Promise<TWeeklyMeasurement[]> {
  return db
    .select()
    .from(weeklyMeasurements)
    .where(eq(weeklyMeasurements.userId, userId))
    .orderBy(desc(weeklyMeasurements.measuredOn));
}
