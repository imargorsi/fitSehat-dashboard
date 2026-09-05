import type { MetadataRoute } from "next";

import { SEO_DESCRIPTION } from "@/lib/seo";
import { APP_NAME } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: SEO_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#111317",
    theme_color: "#111317",
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
