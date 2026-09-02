"use client";

import { QuietScreen } from "@/components/layout/quiet-screen";
import { ActionButton } from "@/components/layout/action-button";
import { ACTIONS } from "@/lib/app-copy";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <QuietScreen
      title="Something went wrong"
      body="This screen hit an error. Your logs are still saved. Try again when you are ready."
      action={
        <ActionButton type="button" icon="history" className="rounded-full" onClick={reset}>
          {ACTIONS.tryAgain}
        </ActionButton>
      }
    />
  );
}
