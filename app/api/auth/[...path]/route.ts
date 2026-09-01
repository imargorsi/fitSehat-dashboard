import { auth } from "@/lib/auth/server";

export const GET = (...args: Parameters<ReturnType<typeof auth.handler>["GET"]>) =>
  auth.handler().GET(...args);

export const POST = (...args: Parameters<ReturnType<typeof auth.handler>["POST"]>) =>
  auth.handler().POST(...args);
