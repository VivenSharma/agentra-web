import type { CoverBlock } from "./insights";

// The three "doors" into Insights, shared by the nav mega-menu and the hub.
// Kept separate from insights.ts so the client Nav bundle stays small.
export const insightDoors: {
  label: string;
  href: string;
  desc: string;
  cta: string;
  cover: { seed?: string; src?: string; block: CoverBlock };
}[] = [
  {
    label: "Blog",
    href: "/resources/blog",
    desc: "Short reads and operator stories from the team.",
    cta: "Read the blog",
    cover: { seed: "agentra-port-night", block: "br" },
  },
  {
    label: "Events",
    href: "/resources/events",
    desc: "Supply Chain Nexus chapters, conferences and roundtables.",
    cta: "See events",
    cover: { src: "/rsm-nexus/gallery-2.jpg", block: "tl" },
  },
  {
    label: "Customer stories",
    href: "/customers",
    desc: "How teams put governed agents into production.",
    cta: "Read stories",
    cover: { seed: "agentra-factory-floor", block: "band" },
  },
];
