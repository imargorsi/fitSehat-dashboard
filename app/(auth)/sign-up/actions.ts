"use server";

import { redirect } from "next/navigation";

import { publicAuthError } from "@/lib/auth/auth-error.utils";
import { auth } from "@/lib/auth/server";
import { signUpSchema } from "@/lib/validations/auth.utils";

import type { TAuthFormState } from "@/app/(auth)/sign-in/actions";

export async function signUpWithEmail(
  _prevState: TAuthFormState,
  formData: FormData
): Promise<TAuthFormState> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { error } = await auth.signUp.email(parsed.data);

  if (error) {
    return { error: publicAuthError(error, "Could not create account.") };
  }

  redirect("/overview");
}
