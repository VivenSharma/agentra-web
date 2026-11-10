// Press coverage: articles about Agentra published by media outlets.
// Newest first. Only add pieces that are actually live; each entry links out
// to the outlet's own page.
export type PressArticle = {
  outlet: string;
  headline: string;
  date?: string; // ISO, e.g. "2026-10-14"; left out until confirmed
  url: string;
  excerpt?: string; // optional one-line standfirst, max ~25 words
  author?: string; // byline, when the piece is written by an Agentra person
  // Picture for the card, saved in /public/press. "photo" fills the frame;
  // "portrait" (a square headshot) sits whole on the branded panel.
  image?: { src: string; alt: string; width: number; height: number; kind?: "photo" | "portrait" };
  // The outlet's logo, shown on the branded panel when there is no good
  // image. plate: true puts a dark logo on a light plate so it stays legible.
  logo?: { src: string; width: number; height: number; plate?: boolean };
};

/* Supplied by the user on 10 Nov 2026, newest first. Headlines, dates
   and bylines are as published on each outlet's page (checked 10 Nov
   2026); siliconindia's page shows no date. Images: ETSupplyChain's own
   article image; Construction World's own photo of Lalit; Express Computer
   and siliconindia only offered small or generic images, so their cards
   show the outlet's logo on the branded panel instead. */
export const pressArticles: PressArticle[] = [
  {
    outlet: "ETSupplyChain",
    headline: "Can Agentic AI build truly autonomous supply chains without losing human control",
    date: "2026-09-22",
    author: "Lalit Das",
    url: "https://supplychain.economictimes.indiatimes.com/news/ai-and-technology/can-agentic-ai-build-truly-autonomous-supply-chains-without-losing-human-control/134408591",
    image: {
      src: "/press/etsupplychain-agentic-ai-autonomous-supply-chains.jpg",
      alt: "Illustration of a robotic arm and parcels on a connected logistics network",
      width: 1199,
      height: 627,
    },
  },
  {
    outlet: "Construction World",
    headline: "Agentic AI set to transform supply chain decision-making",
    date: "2026-10-05",
    author: "Lalit Das",
    url: "https://www.constructionworld.in/urban-infrastructure/warehouse-and-logistics/-agentic-ai-set-to-transform-supply-chain-decision-making/98171",
    image: {
      src: "/press/constructionworld-lalit-das.webp",
      alt: "Lalit Das, Founder and CEO of Agentra",
      width: 800,
      height: 800,
      kind: "portrait",
    },
  },
  {
    outlet: "Express Computer",
    headline: "The supply chain is getting an AI execution layer: What comes after copilots?",
    date: "2026-10-13",
    author: "Lalit Das",
    url: "https://www.expresscomputer.in/guest-blogs/the-supply-chain-is-getting-an-ai-execution-layer-what-comes-after-copilots/139871/",
    logo: { src: "/press/expresscomputer-logo.webp", width: 231, height: 54 },
  },
  {
    outlet: "siliconindia",
    headline: "What Happens When Supply Chain Software Starts Making Decisions Instead of Recommendations",
    author: "Lalit Das",
    url: "https://www.siliconindia.com/viewpoint/ceo-insights/what-happens-when-supply-chain-software-starts-making-decisions-instead-of-recommendations-nwid-55727.html",
    logo: { src: "/press/siliconindia-logo.png", width: 266, height: 66, plate: true },
  },
];

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
