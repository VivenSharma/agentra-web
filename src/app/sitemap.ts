import type { MetadataRoute } from "next";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { pressArticles } from "@/lib/press";

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

// Live, indexable routes. Only published Resources pages are listed, so we
// don't index empty sections.
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
  { path: "/industries", priority: 0.8, freq: "monthly" },
  { path: "/industries/energy-technology", priority: 0.7, freq: "monthly" },
  { path: "/industries/medical-technology", priority: 0.7, freq: "monthly" },
  { path: "/industries/semiconductors", priority: 0.7, freq: "monthly" },
  { path: "/industries/agriculture", priority: 0.7, freq: "monthly" },
  { path: "/trust", priority: 0.7, freq: "monthly" },
  { path: "/resources/events", priority: 0.6, freq: "monthly" },
  { path: "/resources/podcasts", priority: 0.6, freq: "monthly" },
  { path: "/resources/blog/dc-network-transition-open-pos", priority: 0.6, freq: "monthly" },
  { path: "/resources/blog/human-in-the-loop-ai-supply-chain", priority: 0.6, freq: "monthly" },
  { path: "/resources/blog/seasonal-demand-freight-planning-diagnostics", priority: 0.6, freq: "monthly" },
  { path: "/resources/blog/medtech-supply-chain-exceptions", priority: 0.6, freq: "monthly" },
  { path: "/resources/blog/instrument-launch-logistics", priority: 0.6, freq: "monthly" },
  { path: "/resources/blog/continuous-sop-consumer-electronics", priority: 0.6, freq: "monthly" },
  { path: "/resources/blog/freight-bill-auditing-india", priority: 0.6, freq: "monthly" },
  { path: "/resources/blog/inbound-freight-management-agentic-ai", priority: 0.6, freq: "monthly" },
  { path: "/resources/blog/daily-demand-sensing-store-replenishment", priority: 0.6, freq: "monthly" },
  { path: "/resources/blog/decision-rights-agentic-supply-chain", priority: 0.6, freq: "monthly" },
  { path: "/resources/blog/tariffs-move-weekly", priority: 0.6, freq: "monthly" },
  { path: "/company", priority: 0.7, freq: "monthly", images: teamImages() },
  ...(pressArticles.length > 0
    ? [{ path: "/company/press", priority: 0.6, freq: "monthly" as const }]
    : []),
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
