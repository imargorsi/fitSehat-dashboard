import type { ReactNode } from "react";

import { ScreenHeading } from "@/components/layout/screen-heading";
import { cn } from "@/lib/utils";

export function PageShell({
  children,
  action,
  scene,
  fill = false,
}: {
  children: ReactNode;
  action?: ReactNode;
  scene?: ReactNode;
  fill?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-6 overflow-x-hidden pb-4 sm:gap-8 sm:pb-6",
        fill &&
          "mx-auto min-h-0 w-full max-w-6xl flex-1 justify-center gap-5 overflow-visible pb-0 sm:gap-8 lg:h-full lg:gap-10"
      )}
    >
      <ScreenHeading action={action} scene={scene} />
      {children}
    </div>
  );
}
