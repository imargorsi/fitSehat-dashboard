"use server";

import { redirect } from "next/navigation";

import { publicAuthError } from "@/lib/auth/auth-error.utils";
import { auth } from "@/lib/auth/server";
import { signInSchema } from "@/lib/validations/auth.utils";

export type TAuthFormState = { error: string } | null;

export async function signInWithEmail(
  _prevState: TAuthFormState,
  formData: FormData
): Promise<TAuthFormState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { error } = await auth.signIn.email(parsed.data);

  if (error) {
    return { error: publicAuthError(error, "Could not sign in, Love. Check your email and password.") };
  }

  redirect("/overview");
}
