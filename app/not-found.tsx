import Link from "next/link";

import { QuietScreen } from "@/components/layout/quiet-screen";
import { UiIcon } from "@/components/icons/ui-icon";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <QuietScreen
      title="This page is resting, Precious"
      body="That path is not part of the tracker, Love. Head home when you like."
      action={
        <Button className="rounded-full" nativeButton={false} render={<Link href="/" />}>
          <UiIcon name="dashboard" size={16} className="text-current" />
          Take me home, Guddi
        </Button>
      }
    />
  );
}
