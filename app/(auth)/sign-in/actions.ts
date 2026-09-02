"use server";

import { redirect } from "next/navigation";

import { publicAuthError } from "@/lib/auth/auth-error.utils";
import { auth } from "@/lib/auth/server";
import { firstZodError, wrapAuthAction } from "@/lib/errors";
import { signInSchema } from "@/lib/validations/auth.utils";

export type TAuthFormState = { error: string } | null;

async function signInWithEmailImpl(
  _prevState: TAuthFormState,
  formData: FormData
): Promise<TAuthFormState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: firstZodError(parsed) };
  }

  const { error } = await auth.signIn.email(parsed.data);

  if (error) {
    return { error: publicAuthError(error, "Could not sign in, Love. Check your email and password.") };
  }

  redirect("/overview");
}

export const signInWithEmail = wrapAuthAction("signInWithEmail", signInWithEmailImpl);
