import { revalidatePath } from "next/cache";

const TRACKER_PATHS = [
  "/overview",
  "/calories",
  "/macros",
  "/measurements",
  "/meals",
  "/workouts",
  "/reports",
] as const;

export function revalidateTracker() {
  for (const path of TRACKER_PATHS) {
    revalidatePath(path);
  }
}
