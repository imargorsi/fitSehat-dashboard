import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create a FitSehat account to track calories, movement, and progress.",
  alternates: {
    canonical: "/sign-up",
  },
};

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return children;
}
