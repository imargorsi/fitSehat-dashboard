import { NextResponse } from "next/server";

import { captureError } from "@/lib/errors/capture-error";
import { isNextNavigationError } from "@/lib/errors/next.utils";
import { normalizeError } from "@/lib/errors/normalize-error";

export function withRouteHandler<TContext>(
  name: string,
  handler: (request: Request, context: TContext) => Promise<Response> | Response
) {
  return async (request: Request, context: TContext): Promise<Response> => {
    try {
      return await handler(request, context);
    } catch (error) {
      if (isNextNavigationError(error)) {
        throw error;
      }

      captureError(error, {
        source: "route",
        name,
        method: request.method,
        path: new URL(request.url).pathname,
      });

      const normalized = normalizeError(error);
      const isProduction = process.env.NODE_ENV === "production";

      return NextResponse.json(
        {
          ok: false,
          code: normalized.code,
          ...(isProduction ? {} : { message: normalized.message }),
        },
        { status: normalized.status >= 400 ? normalized.status : 500 }
      );
    }
  };
}
