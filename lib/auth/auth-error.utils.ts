export function publicAuthError(
  error: { message?: string } | null | undefined,
  fallback: string
): string {
  const message = error?.message?.trim();
  if (!message) {
    return fallback;
  }
  if (/invalid origin/i.test(message)) {
    return "This address is not on the Neon Auth allowlist yet. Add it in Neon Console → Auth → Domains.";
  }
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
    return message;
  }
  return fallback;
}
