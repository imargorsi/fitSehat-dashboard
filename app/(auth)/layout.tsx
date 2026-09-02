import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { BrandLogo } from "@/components/layout/brand-logo";
import { getAuthUser } from "@/lib/session";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const user = await getAuthUser();
  if (user) {
    redirect("/overview");
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 pb-16 pt-10">
        <BrandLogo size="lg" animate priority />
        {children}
      </div>
    </div>
  );
}
