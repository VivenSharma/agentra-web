import type { MetadataRoute } from "next";

const base = "https://www.agentra-ai.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Resources are hidden until content is ready.
      disallow: ["/resources"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
