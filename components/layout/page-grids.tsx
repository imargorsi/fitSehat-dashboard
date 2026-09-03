import type { ReactNode } from "react";

import { sectionGridClass, statGridClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function StatGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(statGridClass, className)}>{children}</div>;
}

export function SectionGrid({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(sectionGridClass, className)}>{children}</div>;
}
