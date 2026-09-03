"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

import { signOut } from "@/app/(auth)/sign-out/actions";
import { AnimateIcon } from "@/components/icons/animate-icon";
import { navIconByHref } from "@/components/icons/app-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLinkLabel } from "@/components/ui/typography";
import { useDashboardScrolled } from "@/hooks/useDashboardScrolled.hook";
import { dashboardNav } from "@/lib/navigation";
import type { TAuthUser } from "@/lib/session";
import { firstName, initials } from "@/lib/user.utils";
import { cn } from "@/lib/utils";

export function AppBar({ user }: { user: TAuthUser }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const scrolled = useDashboardScrolled();

  return (
    <TooltipProvider delay={180}>
      <nav
        aria-label="Primary"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden w-full justify-center px-6 pt-[max(1rem,env(safe-area-inset-top))] lg:flex"
      >
        <motion.div
          initial={reduced ? false : { y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "pointer-events-auto flex h-14 w-full max-w-4xl items-center gap-3 rounded-2xl border px-2 transition-[background-color,box-shadow,border-color] duration-300 xl:max-w-5xl",
            scrolled
              ? "border-white/20 bg-background/95 shadow-[0_8px_32px_color-mix(in_oklch,black_40%,transparent)] backdrop-blur-xl"
              : "border-white/15 bg-card/70 backdrop-blur-md"
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-0.5">
            {dashboardNav.map((item) => {
              const icon = navIconByHref[item.href];
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId={reduced ? undefined : "bar-active"}
                      className="absolute inset-0 rounded-xl bg-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  ) : null}
                  {icon ? (
                    <AnimateIcon
                      name={icon}
                      size={16}
                      tone={isActive ? "foreground" : "muted"}
                      className="relative z-10"
                    />
                  ) : null}
                  <NavLinkLabel className="relative z-10 whitespace-nowrap">{item.shortLabel}</NavLinkLabel>
                </Link>
              );
            })}
          </div>

          <div className="mx-1 h-6 w-px shrink-0 bg-white/15" aria-hidden />

          <div className="flex shrink-0 items-center gap-1 pr-1">
            <Tooltip>
              <TooltipTrigger
                render={
                  <span className="flex size-9 items-center justify-center rounded-xl transition-colors hover:bg-white/5" />
                }
              >
                <Avatar size="sm">
                  {user.image ? <AvatarImage src={user.image} alt="" /> : null}
                  <AvatarFallback>{initials(user.name)}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={10}>
                {firstName(user.name)}
              </TooltipContent>
            </Tooltip>

            <form action={signOut}>
              <Tooltip>
                <TooltipTrigger
                  type="submit"
                  aria-label="Sign out"
                  className="flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  <AnimateIcon name="logout" size={16} tone="muted" />
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={10}>
                  Sign out
                </TooltipContent>
              </Tooltip>
            </form>
          </div>
        </motion.div>
      </nav>
    </TooltipProvider>
  );
}
