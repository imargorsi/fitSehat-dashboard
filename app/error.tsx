"use client";

import { QuietScreen } from "@/components/layout/quiet-screen";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <QuietScreen
      title="A quiet pause"
      body="Something went sideways. Your log is safe. Try again when you are ready."
      action={
        <Button type="button" className="rounded-full" onClick={reset}>
          Try again
        </Button>
      }
    />
  );
}
