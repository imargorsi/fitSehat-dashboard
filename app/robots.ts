import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", disallow: "/" },
      { userAgent: "Googlebot", disallow: "/" },
      { userAgent: "Googlebot-Image", disallow: "/" },
      { userAgent: "Bingbot", disallow: "/" },
      { userAgent: "Twitterbot", disallow: "/" },
      { userAgent: "facebookexternalhit", disallow: "/" },
    ],
  };
}
