export type TNavItem = {
  href: string;
  label: string;
  shortLabel: string;
  heading: string;
  description: string;
  phase: "ready" | "planned";
};

export const dashboardNav: TNavItem[] = [
  {
    href: "/overview",
    label: "Dashboard",
    shortLabel: "Dashboard",
    heading: "Dashboard",
    description: "A snapshot of today. Open a module to log.",
    phase: "ready",
  },
  {
    href: "/calories",
    label: "Fuel",
    shortLabel: "Fuel",
    heading: "Today's intake",
    description: "Search foods, log plates, and see the week behind them.",
    phase: "ready",
  },
  {
    href: "/meals",
    label: "Meals",
    shortLabel: "Meals",
    heading: "Your library",
    description: "Save meals you eat often, then add them in one tap.",
    phase: "ready",
  },
  {
    href: "/workouts",
    label: "Move",
    shortLabel: "Move",
    heading: "Daily walking",
    description: "Log steps, watch the calendar, and keep a gentle daily goal.",
    phase: "ready",
  },
  {
    href: "/measurements",
    label: "Check-in",
    shortLabel: "Check-in",
    heading: "Weight & waist",
    description: "Record a check-in and watch the trend from your starting point.",
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
