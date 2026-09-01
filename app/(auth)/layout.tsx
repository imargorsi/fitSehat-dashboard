import type { ReactNode } from "react";
import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { APP_NAME } from "@/lib/constants";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-background">
      <header className="flex items-center justify-end px-4 py-5 sm:px-5">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
          For you, Love
        </Link>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 pb-16">
        <Link href="/" aria-label={`${APP_NAME} home`} className="block">
          <BrandLogo size="card" priority />
        </Link>
        {children}
      </div>
    </div>
  );
}
