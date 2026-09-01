"use client";

import { QuietScreen } from "@/components/layout/quiet-screen";
import { Button } from "@/components/ui/button";

export default function DashboardError({ reset }: { reset: () => void }) {
  return (
    <QuietScreen
      title="A quiet pause"
      body="This screen hit a snag. Your logs are still here. Try again when you are ready."
      action={
        <Button type="button" className="rounded-full" onClick={reset}>
          Try again
        </Button>
      }
    />
  );
}
