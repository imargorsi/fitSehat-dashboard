"use client";

import { useActionState } from "react";
import Link from "next/link";

import { signUpWithEmail } from "@/app/(auth)/sign-up/actions";
import { ActionButton } from "@/components/layout/action-button";
import { FormError } from "@/components/layout/form-error";
import { FormLabel, TextInput } from "@/components/ui/form-controls";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkHint, Span } from "@/components/ui/typography";
import { ACTIONS, PLACE } from "@/lib/app-copy";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, null);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Set up your profile to start tracking calories, movement, and progress.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <FormLabel htmlFor="name">Full name</FormLabel>
            <TextInput id="name" name="name" type="text" autoComplete="name" required placeholder={PLACE.signUpName} />
          </div>
          <div className="grid gap-2">
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextInput id="email" name="email" type="email" autoComplete="email" required placeholder={PLACE.email} />
          </div>
          <div className="grid gap-2">
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextInput
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              placeholder={PLACE.password}
              required
            />
          </div>
          <FormError error={state?.error} />
          <ActionButton type="submit" size="lg" icon="activity" pending={isPending} pendingLabel="Creating account…" className="w-full">
            {ACTIONS.begin}
          </ActionButton>
          <LinkHint>
            Already have an account?{" "}
            <Link href="/sign-in" className="text-foreground underline-offset-4 hover:underline">
              <Span>{ACTIONS.signIn}</Span>
            </Link>
          </LinkHint>
        </form>
      </CardContent>
    </Card>
  );
}
