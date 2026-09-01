import Link from "next/link";

import { QuietScreen } from "@/components/layout/quiet-screen";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <QuietScreen
      title="This page is resting"
      body="That path is not part of the tracker. Head home when you like."
      action={
        <Button className="rounded-full" nativeButton={false} render={<Link href="/" />}>
          Home
        </Button>
      }
    />
  );
}
