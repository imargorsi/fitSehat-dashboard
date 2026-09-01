import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as authSchema from "@/lib/db/auth-schema";
import * as appSchema from "@/lib/db/schema";
import { env } from "@/lib/env";
import { lazySingleton } from "@/lib/lazy.utils";

export const db = lazySingleton(() =>
  drizzle({
    client: neon(env.databaseUrl),
    schema: { ...authSchema, ...appSchema },
  })
);
