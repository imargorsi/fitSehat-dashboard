function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(
      `${name} is not set. On Vercel, add it under Project → Settings → Environment Variables (Production and Preview) before deploying.`
    );
  }
  return value;
}

function optional(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

export const env = {
  get databaseUrl() {
    return required("DATABASE_URL");
  },
  get neonAuthBaseUrl() {
    return required("NEON_AUTH_BASE_URL");
  },
  get neonAuthCookieSecret() {
    const secret = required("NEON_AUTH_COOKIE_SECRET");
    if (secret.length < 32) {
      throw new Error("NEON_AUTH_COOKIE_SECRET must be at least 32 characters");
    }
    return secret;
  },
  get isProduction() {
    return process.env.NODE_ENV === "production";
  },
  get fatSecretClientId() {
    return optional("FATSECRET_CLIENT_ID");
  },
  get fatSecretClientSecret() {
    return optional("FATSECRET_CLIENT_SECRET");
  },
  get geminiApiKey() {
    return optional("GEMINI_API_KEY");
  },
  get geminiModel() {
    return optional("GEMINI_MODEL") ?? "gemini-3.5-flash-lite";
  },
};
