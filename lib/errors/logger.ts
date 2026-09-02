type TLogLevel = "debug" | "info" | "warn" | "error";

type TLogContext = Record<string, unknown>;

function serializeError(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    };
  }
  return { message: String(error) };
}

export function log(level: TLogLevel, message: string, context?: TLogContext) {
  const entry = {
    ts: new Date().toISOString(),
    level,
    message,
    service: "fitsehat",
    ...context,
  };

  if (process.env.NODE_ENV === "production") {
    const line = JSON.stringify(entry);
    if (level === "error") {
      console.error(line);
      return;
    }
    if (level === "warn") {
      console.warn(line);
      return;
    }
    console.log(line);
    return;
  }

  const payload = context ? { ...context } : undefined;
  if (payload && "error" in payload) {
    payload.error = serializeError(payload.error);
  }

  const method = level === "debug" ? "log" : level;
  console[method](`[${level}] ${message}`, payload ?? "");
}
