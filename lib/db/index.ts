import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as authSchema from "@/lib/db/auth-schema";
import * as appSchema from "@/lib/db/schema";
import { env } from "@/lib/env";

const sql = neon(env.databaseUrl);

export const db = drizzle({
  client: sql,
  schema: { ...authSchema, ...appSchema },
});
