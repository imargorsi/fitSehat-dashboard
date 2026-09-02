"use server";

import { redirect } from "next/navigation";

import { publicAuthError } from "@/lib/auth/auth-error.utils";
import { auth } from "@/lib/auth/server";
import { firstZodError, wrapAuthAction } from "@/lib/errors";
import { signUpSchema } from "@/lib/validations/auth.utils";

import type { TAuthFormState } from "@/app/(auth)/sign-in/actions";

async function signUpWithEmailImpl(
  _prevState: TAuthFormState,
  formData: FormData
): Promise<TAuthFormState> {
  const parsed = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: firstZodError(parsed) };
  }

  const { error } = await auth.signUp.email(parsed.data);

  if (error) {
    return { error: publicAuthError(error, "Could not create this space, Precious. Try again with me.") };
  }

  redirect("/overview");
}

export const signUpWithEmail = wrapAuthAction("signUpWithEmail", signUpWithEmailImpl);
