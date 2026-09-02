"use client";

import { useActionState } from "react";
import Link from "next/link";

import { signInWithEmail } from "@/app/(auth)/sign-in/actions";
import { ActionButton } from "@/components/layout/action-button";
import { FormError } from "@/components/layout/form-error";
import { FormLabel, TextInput } from "@/components/ui/form-controls";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LinkHint, Span } from "@/components/ui/typography";
import { ACTIONS, PLACE } from "@/lib/care-copy";

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(signInWithEmail, null);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <CardTitle>Welcome back, Guddi</CardTitle>
        <CardDescription>Your log is waiting, Love. Come home whenever you like.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
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
              autoComplete="current-password"
              placeholder={PLACE.password}
              required
            />
          </div>
          <FormError error={state?.error} />
          <ActionButton type="submit" size="lg" icon="heart" pending={isPending} pendingLabel="Coming in…" className="w-full">
            {ACTIONS.signIn}
          </ActionButton>
          <LinkHint>
            New here, Precious?{" "}
            <Link href="/sign-up" className="text-foreground underline-offset-4 hover:underline">
              <Span>Make a space with me</Span>
            </Link>
          </LinkHint>
        </form>
      </CardContent>
    </Card>
  );
}
