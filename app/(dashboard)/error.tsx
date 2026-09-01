"use client";

import { QuietScreen } from "@/components/layout/quiet-screen";
import { ActionButton } from "@/components/layout/action-button";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <QuietScreen
      title="A pause, Love"
      body="This screen hit a snag, Guddi. Your logs are still here. Try again when you are ready."
      action={
        <ActionButton type="button" icon="history" className="rounded-full" onClick={reset}>
          Try with me, Precious
        </ActionButton>
      }
    />
  );
}
