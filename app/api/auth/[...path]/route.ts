import { auth } from "@/lib/auth/server";
import { withRouteHandler } from "@/lib/errors/with-route-handler";

const handler = auth.handler();

type TAuthRouteContext = Parameters<NonNullable<ReturnType<typeof auth.handler>["GET"]>>[1];

export const GET = withRouteHandler("auth.GET", (request, context: TAuthRouteContext) =>
  handler.GET!(request, context)
);

export const POST = withRouteHandler("auth.POST", (request, context: TAuthRouteContext) =>
  handler.POST!(request, context)
);
