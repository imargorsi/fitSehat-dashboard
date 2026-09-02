import Link from "next/link";

import { BrandLogo } from "@/components/layout/brand-logo";
import { UiIcon } from "@/components/icons/ui-icon";
import { Button } from "@/components/ui/button";
import { LandingApp, LandingHero, Muted, P } from "@/components/ui/typography";
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
        <Muted className="mt-1">Made with love, Guddi</Muted>
        <LandingApp className="mt-3">{APP_NAME}</LandingApp>
        <LandingHero className="mt-2">A quiet place for your glow, Precious.</LandingHero>
        <P className="mt-4 max-w-sm leading-7 text-muted-foreground">
          Take care of yourself, Jaan. I am proud of you. And I am always rooting for you, Love.
        </P>
        <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
          {user ? (
            <Button size="lg" className="w-full" render={<Link href="/overview" />}>
              <UiIcon name="dashboard" size={16} className="text-current" />
              {ACTIONS.openTracker}
            </Button>
          ) : (
            <>
              <Button size="lg" className="w-full" render={<Link href="/sign-up" />}>
                <UiIcon name="heart" size={16} className="text-current" />
                {ACTIONS.begin}
              </Button>
              <Button size="lg" variant="ghost" className="w-full" render={<Link href="/sign-in" />}>
                <UiIcon name="heart" size={16} className="text-current" />
                {ACTIONS.alreadyHaveKey}
              </Button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
