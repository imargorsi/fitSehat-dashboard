import { redirect } from "next/navigation";

import { getAuthUser } from "@/lib/session";

export const dynamic = "force-dynamic";

/** SaaS entry: authenticated → dashboard, otherwise → sign-in. */
export default async function HomePage() {
  const user = await getAuthUser();
  redirect(user ? "/overview" : "/sign-in");
}
