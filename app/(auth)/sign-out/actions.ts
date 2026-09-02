"use server";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth/server";
import { wrapVoidAction } from "@/lib/errors";

async function signOutImpl() {
  await auth.signOut();
  redirect("/sign-in");
}

export const signOut = wrapVoidAction("signOut", signOutImpl);
