import { AppError } from "@/lib/errors/app-error";
import { ERROR_CODES, type TErrorCode } from "@/lib/errors/codes";

const POSTGRES_CODE_HINTS: Record<string, TErrorCode> = {
  "23505": ERROR_CODES.VALIDATION,
  "23503": ERROR_CODES.VALIDATION,
  "22P02": ERROR_CODES.VALIDATION,
  "23502": ERROR_CODES.VALIDATION,
};

function postgresCode(error: unknown): string | undefined {
  if (typeof error !== "object" || error === null) {
    return undefined;
  }
  const code = (error as { code?: unknown }).code;
  return typeof code === "string" ? code : undefined;
}

export function normalizeError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    const pgCode = postgresCode(error);
    const code = pgCode ? (POSTGRES_CODE_HINTS[pgCode] ?? ERROR_CODES.DATABASE) : ERROR_CODES.INTERNAL;
    return new AppError(error.message, { code, cause: error });
  }

  return new AppError(String(error), { code: ERROR_CODES.INTERNAL, cause: error });
}

export const FALLBACK_FORM_ERROR =
  "Something went wrong. Your data is safe — try again in a moment.";

export function userFacingMessage(error: unknown): string {
  const normalized = normalizeError(error);
  if (normalized.exposeMessage) {
    return normalized.message;
  }
  if (normalized.code === ERROR_CODES.VALIDATION) {
    return normalized.message || "Invalid input.";
  }
  return FALLBACK_FORM_ERROR;
}
