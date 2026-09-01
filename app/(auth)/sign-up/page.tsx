"use client";

import { useActionState } from "react";
import Link from "next/link";

import { signUpWithEmail } from "@/app/(auth)/sign-up/actions";
import { ActionButton } from "@/components/layout/action-button";
import { ACTIONS, PLACE } from "@/lib/care-copy";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUpWithEmail, null);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="items-center text-center">
        <CardTitle>This is yours, Jaan</CardTitle>
        <CardDescription>A name and a key, Love. Then the tracker waits for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name, Precious</Label>
            <Input id="name" name="name" type="text" autoComplete="name" required placeholder={PLACE.signUpName} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required placeholder={PLACE.email} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              placeholder={PLACE.password}
              required
            />
          </div>
          {state?.error ? (
            <p className="text-sm text-destructive" role="alert">
              {state.error}
            </p>
          ) : null}
          <ActionButton type="submit" size="lg" icon="heart" pending={isPending} pendingLabel="Making your space…" className="w-full">
            {ACTIONS.begin}
          </ActionButton>
          <p className="text-center text-sm text-muted-foreground">
            Already with me, Guddi?{" "}
            <Link href="/sign-in" className="text-foreground underline-offset-4 hover:underline">
              Come in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
