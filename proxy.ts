import { auth } from "@/lib/auth/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  if (request.headers.has("Next-Action")) {
    return;
  }

  return auth.middleware({
    loginUrl: "/sign-in",
  })(request);
}

export const config = {
  matcher: [
    "/overview/:path*",
    "/calories/:path*",
    "/macros/:path*",
    "/measurements/:path*",
    "/meals/:path*",
    "/workouts/:path*",
    "/reports/:path*",
  ],
};
