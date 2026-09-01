"use client";

import { QuietScreen } from "@/components/layout/quiet-screen";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <QuietScreen
      title="A pause, Jaan"
      body="Something went sideways, Love. Your log is safe. Try again when you are ready."
      action={
        <Button type="button" className="rounded-full" onClick={reset}>
          Try with me, Guddi
        </Button>
      }
    />
  );
}
