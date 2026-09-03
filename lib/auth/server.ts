import { createNeonAuth } from "@neondatabase/auth/next/server";

import { env } from "@/lib/env";
import { lazySingleton } from "@/lib/lazy.utils";

export const auth = lazySingleton(() =>
  createNeonAuth({
    baseUrl: env.neonAuthBaseUrl,
    cookies: {
      secret: env.neonAuthCookieSecret,
    },
    logLevel: env.isProduction ? "silent" : "warn",
  })
);
