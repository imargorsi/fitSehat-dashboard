import type { ReactNode } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

import { BrandLogo } from "@/components/layout/brand-logo";
import { getAuthUser } from "@/lib/session";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const user = await getAuthUser();
  if (user) {
    redirect("/overview");
  }

  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-background">
      <Image
        src="/auth-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden
        className="object-cover object-[22%_center] sm:object-[28%_center] lg:object-center"
      />
      <div aria-hidden className="absolute inset-0 bg-background/45" />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20 lg:bg-gradient-to-r lg:from-background/25 lg:via-background/50 lg:to-background/30"
      />
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-end px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:justify-center">
        <div className="flex w-full max-w-sm flex-col items-center gap-6 lg:translate-x-[6%]">
          <BrandLogo size="lg" animate priority />
          {children}
        </div>
      </div>
    </div>
  );
}
