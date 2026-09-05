import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to FitSehat to log calories, meals, walks, and check-ins.",
  alternates: {
    canonical: "/sign-in",
  },
};

export default function SignInLayout({ children }: { children: ReactNode }) {
  return children;
}
