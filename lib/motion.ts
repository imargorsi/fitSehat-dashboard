export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const SPRING_SNUG = { type: "spring" as const, stiffness: 420, damping: 28, mass: 0.6 };

export const revealParent = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

export const revealItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: EASE_OUT },
  },
};

export const tapScale = { scale: 0.94 };
export const hoverLift = { y: -3 };
