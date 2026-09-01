"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

import { signOut } from "@/app/(auth)/sign-out/actions";
import { AnimateIcon } from "@/components/icons/animate-icon";
import { navIconByHref } from "@/components/icons/care-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { dashboardNav } from "@/lib/navigation";
import type { TAuthUser } from "@/lib/session";
import { firstName, initials } from "@/lib/user.utils";
import { cn } from "@/lib/utils";

export function AppBar({ user }: { user: TAuthUser }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <TooltipProvider delay={180}>
      <nav
        aria-label="Primary"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 hidden w-full px-4 pt-[max(1.15rem,env(safe-area-inset-top))] lg:flex"
      >
        <motion.div
          initial={reduced ? false : { y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto mx-auto flex w-full max-w-[120rem] items-center gap-1 rounded-full p-1.5 ring-1 ring-border/40 glass-panel"
        >
          <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {dashboardNav.map((item) => {
              const icon = navIconByHref[item.href];
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-neon-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId={reduced ? undefined : "bar-glow"}
                      className="absolute inset-0 rounded-full bg-love shadow-glow"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  {icon ? (
                    <AnimateIcon
                      name={icon}
                      size={16}
                      tone={isActive ? "onLove" : "muted"}
                      className="relative z-10"
                    />
                  ) : null}
                  <span className="relative z-10 whitespace-nowrap">{item.shortLabel}</span>
                </Link>
              );
            })}
          </div>

          <span aria-hidden className="mx-1 hidden h-6 w-px bg-border sm:block" />

          <Tooltip>
            <TooltipTrigger render={<span className="flex size-10 shrink-0 items-center justify-center rounded-full" />}>
              <Avatar size="sm">
                {user.image ? <AvatarImage src={user.image} alt="" /> : null}
                <AvatarFallback>{initials(user.name)}</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={10}>
              {firstName(user.name)}
            </TooltipContent>
          </Tooltip>

          <form action={signOut} className="shrink-0">
            <Tooltip>
              <TooltipTrigger
                type="submit"
                aria-label="See you soon, Jaan"
                className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground"
              >
                <AnimateIcon name="logout" size={16} tone="muted" />
              </TooltipTrigger>
              <TooltipContent side="bottom" sideOffset={10}>
                See you soon, Jaan
              </TooltipContent>
            </Tooltip>
          </form>
        </motion.div>
      </nav>
    </TooltipProvider>
  );
}
