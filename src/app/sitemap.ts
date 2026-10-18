import type { MetadataRoute } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const base = "https://www.agentra-ai.com";

// Team headshots (PNG) surfaced in the image sitemap so they can appear in
// Google Images for "Agentra AI". Read from /public/team at build time,
// excluding the animated hover variants, so the list stays in sync.
function teamImages(): string[] {
  try {
    return readdirSync(join(process.cwd(), "public", "team"))
      .filter((f) => f.endsWith(".webp") && !f.includes("-animated"))
      .sort()
      .map((f) => `${base}/team/${f}`);
  } catch {
    return [];
  }
}

// Live, indexable routes. Resources (blog/whitepapers/podcasts) are excluded
// until content is ready, so we don't index empty pages.
const routes: {
  path: string;
  priority: number;
  freq: MetadataRoute.Sitemap[number]["changeFrequency"];
  images?: string[];
}[] = [
  { path: "", priority: 1.0, freq: "weekly", images: [`${base}/og-image.png`] },
  { path: "/platform", priority: 0.9, freq: "monthly" },
  { path: "/solutions", priority: 0.9, freq: "monthly" },
  { path: "/solutions/planning", priority: 0.8, freq: "monthly" },
  { path: "/solutions/resilience", priority: 0.8, freq: "monthly" },
  { path: "/solutions/execution", priority: 0.8, freq: "monthly" },
  { path: "/solutions/orchestration", priority: 0.8, freq: "monthly" },
  { path: "/company", priority: 0.7, freq: "monthly", images: teamImages() },
  { path: "/contact", priority: 0.7, freq: "monthly" },
  { path: "/privacy", priority: 0.3, freq: "yearly" },
  { path: "/privacy/moove", priority: 0.3, freq: "yearly" },
  { path: "/terms", priority: 0.3, freq: "yearly" },
  { path: "/cookies", priority: 0.3, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified,
    changeFrequency: r.freq,
    priority: r.priority,
    ...(r.images ? { images: r.images } : {}),
  }));
}
