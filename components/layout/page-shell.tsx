import type { ReactNode } from "react";

import { ScreenHeading } from "@/components/layout/screen-heading";

export function PageShell({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 pb-4 sm:gap-8 sm:pb-6">
      <ScreenHeading action={action} />
      {children}
    </div>
  );
}
