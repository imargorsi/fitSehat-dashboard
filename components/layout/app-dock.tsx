"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

import { signOut } from "@/app/(auth)/sign-out/actions";
import { AnimateIcon } from "@/components/icons/animate-icon";
import { navIconByHref, type TAppIconName } from "@/components/icons/app-icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { H2, H4, Micro, Muted } from "@/components/ui/typography";
import { useDashboardScrolled } from "@/hooks/useDashboardScrolled.hook";
import { ACTIONS } from "@/lib/app-copy";
import { dockNav, isMorePath, moreNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function AppDock() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = isMorePath(pathname);
  const scrolled = useDashboardScrolled();

  return (
    <>
      <nav
        aria-label="Primary"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.7rem,env(safe-area-inset-bottom))] lg:hidden"
      >
        <motion.div
          initial={reduced ? false : { y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "pointer-events-auto mx-auto flex max-w-lg items-stretch gap-0 rounded-[1.75rem] border border-border p-1 isolate transition-[background-color,box-shadow,backdrop-filter] duration-300",
            scrolled
              ? "bg-background/90 shadow-glow backdrop-blur-xl"
              : "glass-panel"
          )}
        >
          {dockNav.map((item) => {
            const icon = navIconByHref[item.href];
            const isActive = pathname === item.href;

            return (
              <motion.div
                key={item.href}
                className="relative min-w-0 flex-1"
                whileTap={reduced ? undefined : { scale: 0.92 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
              >
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex min-h-14 min-w-0 flex-col items-center justify-center gap-0.5 rounded-3xl px-0.5",
                    isActive ? "text-neon-foreground" : "text-muted-foreground"
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId={reduced ? undefined : "dock-glow"}
                      className="absolute inset-0 rounded-3xl bg-brand shadow-glow"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative z-10 flex flex-col items-center gap-0.5">
                    {icon ? (
                      <AnimateIcon
                        name={icon}
                        size={20}
                        tone={isActive ? "onPrimary" : "muted"}
                      />
                    ) : null}
                    <Micro className="max-w-full truncate">{item.shortLabel}</Micro>
                  </span>
                </Link>
              </motion.div>
            );
          })}
          <motion.button
            type="button"
            aria-expanded={moreOpen}
            aria-current={moreActive && !moreOpen ? "page" : undefined}
            onClick={() => setMoreOpen(true)}
            whileTap={reduced ? undefined : { scale: 0.92 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
            className={cn(
              "relative flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-3xl px-0.5",
              moreActive ? "text-neon-foreground" : "text-muted-foreground"
            )}
          >
            {moreActive ? (
              <motion.span
                layoutId={reduced ? undefined : "dock-glow"}
                className="absolute inset-0 rounded-3xl bg-brand shadow-glow"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : null}
            <span className="relative z-10 flex flex-col items-center gap-0.5">
              <AnimateIcon name="ellipsis" size={20} tone={moreActive ? "onPrimary" : "muted"} />
              <Micro>More</Micro>
            </span>
          </motion.button>
        </motion.div>
      </nav>

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="gap-0 rounded-t-[1.75rem] border-border bg-popover/95 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 ring-1 ring-border max-h-[min(88dvh,36rem)] overflow-y-auto"
        >
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-foreground/20" />
          <SheetHeader className="px-1 pb-4">
            <div className="flex min-w-0 items-center gap-3">
              <AnimateIcon name="activity" size={48} tone="neon" playOnMount={false} className="shrink-0" />
              <div className="min-w-0">
                <SheetTitle>
                  <H2>More</H2>
                </SheetTitle>
                <SheetDescription>Additional tracking modules and settings.</SheetDescription>
              </div>
            </div>
          </SheetHeader>
          <div className="grid gap-2">
            {moreNav.map((item) => {
              const icon: TAppIconName = navIconByHref[item.href] ?? "activity";
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className={cn(
                    "flex min-h-16 items-center gap-3 rounded-2xl px-3 py-3 ring-1 ring-border transition-colors",
                    isActive
                      ? "bg-brand text-neon-foreground shadow-glow ring-transparent"
                      : "bg-card/80 text-foreground hover:bg-muted/70"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-2xl",
                      isActive ? "bg-neon-foreground/12" : "bg-muted text-rose"
                    )}
                  >
                    {icon ? <AnimateIcon name={icon} size={16} tone={isActive ? "onPrimary" : "rose"} /> : null}
                  </span>
                  <span className="min-w-0 block">
                    <H4 className="block">{item.shortLabel}</H4>
                    <Muted className={cn("block", isActive && "opacity-80")}>
                      {item.description}
                    </Muted>
                  </span>
                </Link>
              );
            })}
          </div>
          <form action={signOut} className="mt-4">
            <Button type="submit" variant="ghost" className="h-12 w-full rounded-2xl text-muted-foreground">
              <AnimateIcon name="logout" size={16} tone="muted" />
              {ACTIONS.signOut}
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
