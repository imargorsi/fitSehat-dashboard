function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not set. On Vercel, add it under Project → Settings → Environment Variables before deploying.`);
  }
  return value;
}

const neonAuthCookieSecret = required("NEON_AUTH_COOKIE_SECRET");

if (neonAuthCookieSecret.length < 32) {
  throw new Error("NEON_AUTH_COOKIE_SECRET must be at least 32 characters");
}

export const env = {
  databaseUrl: required("DATABASE_URL"),
  neonAuthBaseUrl: required("NEON_AUTH_BASE_URL"),
  neonAuthCookieSecret,
  isProduction: process.env.NODE_ENV === "production",
};
