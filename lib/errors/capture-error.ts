import { ERROR_CODES } from "@/lib/errors/codes";
import { log } from "@/lib/errors/logger";
import { normalizeError } from "@/lib/errors/normalize-error";

export type TErrorSource = "action" | "route" | "request" | "validation";

export type TErrorContext = {
  source: TErrorSource;
  name?: string;
  method?: string;
  path?: string;
  userId?: string;
  routePath?: string;
  routeType?: string;
  routerKind?: string;
};

/** Central error capture — all backend failures should flow through here. */
export function captureError(error: unknown, context: TErrorContext) {
  const normalized = normalizeError(error);
  const level = normalized.code === ERROR_CODES.VALIDATION ? "warn" : "error";

  log(level, normalized.message, {
    source: context.source,
    name: context.name,
    method: context.method,
    path: context.path,
    userId: context.userId,
    routePath: context.routePath,
    routeType: context.routeType,
    routerKind: context.routerKind,
    code: normalized.code,
    error,
  });
}

export function captureValidationError(name: string, message: string) {
  log("warn", message, {
    source: "validation",
    name,
    code: ERROR_CODES.VALIDATION,
  });
}
