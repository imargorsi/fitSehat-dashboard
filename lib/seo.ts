import { APP_TAGLINE } from "@/lib/app-copy";
import { APP_NAME } from "@/lib/constants";

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) {
    return `https://${vercel.replace(/^https?:\/\//, "")}`;
  }

  return "http://localhost:3000";
}

export const SEO_TITLE = `${APP_NAME} — calories, movement, and progress`;

export const SEO_DESCRIPTION =
  "FitSehat is an all-in-one health tracker for calories, saved meals, daily walking, and weight check-ins in one dark dashboard.";

export function softwareJsonLd() {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP_NAME,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    url,
    description: SEO_DESCRIPTION,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    slogan: APP_TAGLINE,
  };
}
