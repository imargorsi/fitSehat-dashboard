"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

import { signOut } from "@/app/(auth)/sign-out/actions";
import { AnimateIcon } from "@/components/icons/animate-icon";
import { navIconByHref, type TCareIconName } from "@/components/icons/care-icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { dockNav, isMorePath, moreNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function AppDock() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = isMorePath(pathname);

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
          className="pointer-events-auto mx-auto flex max-w-md items-stretch gap-0.5 rounded-[1.75rem] p-1.5 ring-1 ring-border glass-panel shadow-glow isolate"
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
                  "relative flex min-h-14 min-w-0 flex-col items-center justify-center gap-0.5 rounded-3xl px-0.5 text-[0.65rem] font-medium tracking-wide leading-none",
                  isActive ? "text-neon-foreground" : "text-muted-foreground"
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId={reduced ? undefined : "dock-glow"}
                    className="absolute inset-0 rounded-3xl bg-love shadow-glow"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-10 flex flex-col items-center gap-0.5">
                  {icon ? (
                    <AnimateIcon
                      name={icon}
                      size={20}
                      tone={isActive ? "foreground" : "muted"}
                    />
                  ) : null}
                  <span className="max-w-full truncate">{item.shortLabel}</span>
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
              "relative flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-3xl px-0.5 text-[0.65rem] font-medium tracking-wide leading-none",
              moreActive ? "text-neon-foreground" : "text-muted-foreground"
            )}
          >
            {moreActive ? (
              <motion.span
                layoutId={reduced ? undefined : "dock-glow"}
                className="absolute inset-0 rounded-3xl bg-love shadow-glow"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : null}
            <span className="relative z-10 flex flex-col items-center gap-0.5">
              <AnimateIcon name="ellipsis" size={20} tone={moreActive ? "foreground" : "muted"} />
              <span>More</span>
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
              <AnimateIcon name="heart" size={48} tone="rose" playOnMount className="shrink-0" />
              <div className="min-w-0">
                <SheetTitle className="text-xl">Saved for quieter days, Love</SheetTitle>
                <SheetDescription>Check-in lives here, Guddi, whenever Tuesday calls.</SheetDescription>
              </div>
            </div>
          </SheetHeader>
          <div className="grid gap-2">
            {moreNav.map((item) => {
              const icon: TCareIconName = navIconByHref[item.href] ?? "activity";
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className={cn(
                    "flex min-h-16 items-center gap-3 rounded-2xl px-3 py-3 ring-1 ring-border transition-colors",
                    isActive
                      ? "bg-love text-neon-foreground shadow-glow ring-transparent"
                      : "bg-card/80 text-foreground hover:bg-muted/70"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 items-center justify-center rounded-2xl",
                      isActive ? "bg-neon-foreground/12" : "bg-muted text-rose"
                    )}
                  >
                    {icon ? <AnimateIcon name={icon} size={16} tone={isActive ? "foreground" : "rose"} /> : null}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading text-base font-semibold">{item.shortLabel}</span>
                    <span className={cn("block text-sm", isActive ? "opacity-80" : "text-muted-foreground")}>
                      {item.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
          <form action={signOut} className="mt-4">
            <Button type="submit" variant="ghost" className="h-12 w-full rounded-2xl text-muted-foreground">
              I'll wait here, Precious
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}
