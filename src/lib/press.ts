// Press coverage: articles about Agentra published by media outlets.
// Newest first. Only add pieces that are actually live; each entry links out
// to the outlet's own page.
export type PressArticle = {
  outlet: string;
  headline: string;
  date: string; // ISO, e.g. "2026-10-14"
  url: string;
  excerpt?: string; // optional one-line standfirst, max ~25 words
};

export const pressArticles: PressArticle[] = [];

// Layout preview for local development only, while pressArticles is empty.
// Never rendered in a production build (see hasPress / pressFeed below).
const devPreview: PressArticle[] = [
  {
    outlet: "Sample outlet",
    headline: "Sample headline: this preview entry shows the featured layout",
    date: "2026-10-20",
    url: "#",
    excerpt: "Local preview only. Replace with real coverage in src/lib/press.ts.",
  },
  { outlet: "Sample outlet", headline: "Sample headline for a second article", date: "2026-09-12", url: "#" },
  { outlet: "Sample outlet", headline: "Sample headline for a third, slightly longer article title", date: "2026-08-03", url: "#" },
];

export const isPressPreview =
  pressArticles.length === 0 && process.env.NODE_ENV === "development";

// What the page renders. Empty in production until real coverage is added,
// which keeps the page, nav link and sitemap entry hidden.
export const pressFeed: PressArticle[] = isPressPreview ? devPreview : pressArticles;
export const hasPress = pressFeed.length > 0;

export function formatPressDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
