"use client";

import { QuietScreen } from "@/components/layout/quiet-screen";
import { ActionButton } from "@/components/layout/action-button";
import { ACTIONS } from "@/lib/app-copy";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <QuietScreen
      title="Something went wrong"
      body="An unexpected error occurred. Your data is safe. Try again when you are ready."
      action={
        <ActionButton type="button" icon="history" className="rounded-full" onClick={reset}>
          {ACTIONS.tryAgain}
        </ActionButton>
      }
    />
  );
}
