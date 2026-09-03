"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

import { signOut } from "@/app/(auth)/sign-out/actions";
import { AnimateIcon } from "@/components/icons/animate-icon";
import { navIconByHref } from "@/components/icons/app-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Meta, NavLinkLabel } from "@/components/ui/typography";
import { ACTIONS } from "@/lib/app-copy";
import { dashboardNav } from "@/lib/navigation";
import type { TAuthUser } from "@/lib/session";
import { firstName, initials } from "@/lib/user.utils";
import { cn } from "@/lib/utils";

export function AppBar({ user }: { user: TAuthUser }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const name = firstName(user.name);

  return (
    <header className="hidden shrink-0 border-b border-border bg-card/60 backdrop-blur-md lg:block">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 w-full max-w-[120rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
      >
        <div className="flex min-w-0 items-center gap-0.5">
          {dashboardNav.map((item) => {
            const icon = navIconByHref[item.href];
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "text-neon-foreground"
                    : "text-muted-foreground hover:bg-muted/45 hover:text-foreground"
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId={reduced ? undefined : "bar-active"}
                    className="absolute inset-0 rounded-full bg-brand shadow-glow"
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                ) : null}
                {icon ? (
                  <AnimateIcon
                    name={icon}
                    size={16}
                    tone={isActive ? "onPrimary" : "muted"}
                    className="relative z-10"
                  />
                ) : null}
                <NavLinkLabel className="relative z-10 whitespace-nowrap">
                  {item.shortLabel}
                </NavLinkLabel>
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <Avatar size="sm">
              {user.image ? <AvatarImage src={user.image} alt="" /> : null}
              <AvatarFallback>{initials(user.name)}</AvatarFallback>
            </Avatar>
            <Meta className="hidden max-w-36 truncate xl:inline">{name}</Meta>
          </div>

          <form action={signOut}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              aria-label={ACTIONS.signOut}
              className="text-muted-foreground"
            >
              <AnimateIcon name="logout" size={16} tone="muted" />
              {ACTIONS.signOut}
            </Button>
          </form>
        </div>
      </nav>
    </header>
  );
}
