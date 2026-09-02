import Link from "next/link";

import { QuietScreen } from "@/components/layout/quiet-screen";
import { UiIcon } from "@/components/icons/ui-icon";
import { Button } from "@/components/ui/button";
import { ACTIONS } from "@/lib/app-copy";

export default function NotFound() {
  return (
    <QuietScreen
      title="Page not found"
      body="That path is not part of FitSehat. Head back to the home page."
      action={
        <Button className="rounded-full" nativeButton={false} render={<Link href="/" />}>
          <UiIcon name="dashboard" size={16} className="text-current" />
          {ACTIONS.home}
        </Button>
      }
    />
  );
}
