import type { ReactNode } from "react";

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-5 pb-4 sm:gap-8 sm:pb-6">{children}</div>;
}
