import type { ReactNode } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AppBar } from "@/components/layout/app-bar";
import { AppDock } from "@/components/layout/app-dock";
import { DashboardStage } from "@/components/layout/dashboard-stage";
import { ensureProfile } from "@/lib/db/profiles";
import { getAuthUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getAuthUser();
  if (!user) {
    redirect("/sign-in");
  }

  await ensureProfile(user.id);

  return (
    <div className="relative flex h-dvh min-h-dvh w-full flex-col overflow-hidden overscroll-none touch-manipulation">
      <AppBar user={user} />
      <DashboardStage>{children}</DashboardStage>
      <AppDock />
    </div>
  );
}
