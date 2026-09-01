import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { Button } from "@/components/ui/button";
import { ACTIONS } from "@/lib/care-copy";
import { APP_NAME } from "@/lib/constants";
import { getAuthUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await getAuthUser();

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <header className="flex items-center justify-between px-4 py-5 sm:px-5">
        <BrandLogo size="mark" float={false} className="mx-0" />
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
        <BrandLogo size="hero" priority />
        <p className="mt-1 text-sm text-muted-foreground">Made with love, Guddi</p>
        <p className="font-heading mt-3 text-lg font-semibold tracking-tight">{APP_NAME}</p>
        <h1 className="font-heading mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          A quiet place for your glow, Precious.
        </h1>
        <p className="mt-4 max-w-sm text-base leading-7 text-muted-foreground">
          Take care of yourself, Jaan. I am proud of you. And I am always rooting for you, Love.
        </p>
        <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
          {user ? (
            <Button size="lg" className="w-full" render={<Link href="/overview" />}>
              {ACTIONS.openTracker}
            </Button>
          ) : (
            <>
              <Button size="lg" className="w-full" render={<Link href="/sign-up" />}>
                {ACTIONS.begin}
              </Button>
              <Button size="lg" variant="ghost" className="w-full" render={<Link href="/sign-in" />}>
                {ACTIONS.alreadyHaveKey}
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
