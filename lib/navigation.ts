export type TNavItem = {
  href: string;
  label: string;
  shortLabel: string;
  description: string;
  phase: "ready" | "planned";
};

export const dashboardNav: TNavItem[] = [
  {
    href: "/overview",
    label: "Overview",
    shortLabel: "Today",
    description: "Quotes, glow, and a little love waiting for you, Guddi.",
    phase: "ready",
  },
  {
    href: "/calories",
    label: "Calorie Logs",
    shortLabel: "Fuel",
    description: "Log what you ate, Precious. One kind plate is enough.",
    phase: "ready",
  },
  {
    href: "/meals",
    label: "Meal Options",
    shortLabel: "Meals",
    description: "Save meals you actually like, Jaan. Quick add puts them on today.",
    phase: "ready",
  },
  {
    href: "/workouts",
    label: "Walk",
    shortLabel: "Move",
    description: "Walk with me, Love. Rest days stay kind — always.",
    phase: "ready",
  },
  {
    href: "/measurements",
    label: "Measurements",
    shortLabel: "Check-in",
    description: "Tuesday is just a hug on the scale, Guddi. Never a verdict.",
    phase: "ready",
  },
];

export const dockHrefs = ["/overview", "/calories", "/meals", "/workouts"] as const;
export const moreHrefs = ["/measurements"] as const;

export const dockNav = dashboardNav.filter((item) =>
  (dockHrefs as readonly string[]).includes(item.href)
);
export const moreNav = dashboardNav.filter((item) =>
  (moreHrefs as readonly string[]).includes(item.href)
);

export function isMorePath(pathname: string) {
  return (moreHrefs as readonly string[]).includes(pathname);
}
