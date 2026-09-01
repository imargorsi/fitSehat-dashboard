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
    description: "Home: quotes, glow, and write widgets",
    phase: "ready",
  },
  {
    href: "/calories",
    label: "Calorie Logs",
    shortLabel: "Fuel",
    description: "A quiet journal of what you ate. Log from the modal — history lives here.",
    phase: "ready",
  },
  {
    href: "/meals",
    label: "Meal Options",
    shortLabel: "Meals",
    description: "Meals you actually like, with the same energy fields Fuel uses.",
    phase: "ready",
  },
  {
    href: "/workouts",
    label: "Walk",
    shortLabel: "Move",
    description: "A calm walking goal, a slider for today, and a calendar that never shames rest.",
    phase: "ready",
  },
  {
    href: "/measurements",
    label: "Measurements",
    shortLabel: "Check-in",
    description: "Tuesday weigh-ins. The number is a check-in, never a verdict.",
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
