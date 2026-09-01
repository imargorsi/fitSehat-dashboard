import type { ReactNode } from "react";
import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-background">
      <header className="flex items-center justify-between px-4 py-5 sm:px-5">
        <Link href="/" aria-label="FitSehat home">
          <BrandLogo size="mark" float={false} className="mx-0" />
        </Link>
        <p className="font-note">For you</p>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 pb-16">
        <BrandLogo size="card" />
        {children}
      </div>
    </div>
  );
}
