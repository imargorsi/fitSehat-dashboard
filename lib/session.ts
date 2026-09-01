import { cache } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/server";

export type TAuthUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

export const getSession = cache(async () => {
  const { data } = await auth.getSession();
  return data ?? null;
});

export async function getAuthUser(): Promise<TAuthUser | null> {
  const session = await getSession();
  const user = session?.user;
  if (!user?.id || !user.email) {
    return null;
  }

  return {
    id: user.id,
    name: user.name ?? user.email,
    email: user.email,
    image: user.image,
  };
}

export async function requireAuthUser(): Promise<TAuthUser> {
  const user = await getAuthUser();
  if (!user) {
    redirect("/sign-in");
  }
  return user;
}
