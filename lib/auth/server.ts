import { createNeonAuth } from "@neondatabase/auth/next/server";

import { env } from "@/lib/env";

export const auth = createNeonAuth({
  baseUrl: env.neonAuthBaseUrl,
  cookies: {
    secret: env.neonAuthCookieSecret,
  },
  logLevel: env.isProduction ? "silent" : "warn",
});
