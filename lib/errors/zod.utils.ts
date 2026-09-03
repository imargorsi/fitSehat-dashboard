import type { ZodError } from "zod";

type TZodFailure = { success: false; error: ZodError };

export function firstZodError<T>(result: { success: true; data: T } | TZodFailure): string {
  if (result.success) {
    return "Invalid input";
  }
  return result.error.issues[0]?.message ?? "Invalid input";
}
