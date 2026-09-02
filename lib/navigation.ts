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
    description: "Your daily dashboard for fuel, movement, and progress.",
    phase: "ready",
  },
  {
    href: "/calories",
    label: "Calorie Logs",
    shortLabel: "Fuel",
    description: "Log meals and track daily calorie intake.",
    phase: "ready",
  },
  {
    href: "/meals",
    label: "Meal Options",
    shortLabel: "Meals",
    description: "Save meals you eat often for quick one-tap logging.",
    phase: "ready",
  },
  {
    href: "/workouts",
    label: "Walk",
    shortLabel: "Move",
    description: "Track daily steps and walking goals.",
    phase: "ready",
  },
  {
    href: "/measurements",
    label: "Measurements",
    shortLabel: "Check-in",
    description: "Record weight and waist measurements over time.",
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
