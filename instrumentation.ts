import { captureError } from "@/lib/errors/capture-error";

export async function register() {
  // Reserved for future APM wiring (Sentry, OpenTelemetry, etc.)
}

export async function onRequestError(
  error: unknown,
  request: {
    path: string;
    method: string;
    headers: { get(name: string): string | null };
  },
  context: {
    routerKind: string;
    routePath: string;
    routeType: string;
    renderSource?: string;
  }
) {
  captureError(error, {
    source: "request",
    name: context.routePath,
    method: request.method,
    path: request.path,
    routePath: context.routePath,
    routeType: context.routeType,
    routerKind: context.routerKind,
  });
}
