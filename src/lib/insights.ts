// Insights (blog) content.
// PLACEHOLDER: titles, excerpts, dates and covers below are stand-ins so the
// layout can be reviewed. Swap in real articles (LinkedIn posts turned into
// short reads, plus Lalit's operator stories) before this goes live, and
// replace the picsum cover seeds with commissioned art.

export const insightCategories = [
  "Operator stories",
  "Agentic AI",
  "Resilience",
  "Planning",
  "Integration",
] as const;

export type InsightCategory = (typeof insightCategories)[number];

export type CoverBlock = "tl" | "br" | "band";

export type Author = {
  name: string;
  role: string;
  photo?: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategory;
  author: Author;
  date: string; // ISO
  readMins: number;
  cover: { seed: string; block: CoverBlock };
  featured?: boolean;
};

const lalit: Author = {
  name: "Lalit Das",
  role: "Founder and CEO",
  photo: "/team/lalit.webp",
};
const team: Author = { name: "Agentra team", role: "Agentra" };

export const posts: Post[] = [
  {
    slug: "the-2am-cutoff",
    title: "The 2am cutoff: what happens when nobody is awake",
    excerpt:
      "A container misses its vessel cutoff in the middle of the night. We walk through the hours that follow, first with people, then with agents.",
    category: "Operator stories",
    author: lalit,
    date: "2026-10-09",
    readMins: 7,
    cover: { seed: "agentra-port-night", block: "br" },
    featured: true,
  },
  {
    slug: "vertical-beats-horizontal",
    title: "Why vertical beats horizontal for supply chain AI",
    excerpt:
      "Domain depth is the difference between reasoning in SKUs and lanes and a generic copilot that guesses.",
    category: "Agentic AI",
    author: team,
    date: "2026-10-02",
    readMins: 6,
    cover: { seed: "agentra-warehouse-aisle", block: "tl" },
  },
  {
    slug: "decision-to-action",
    title: "Closing the loop from decision to action",
    excerpt:
      "Visibility platforms see and planning suites recommend. The hard part is acting inside the systems you already run.",
    category: "Agentic AI",
    author: team,
    date: "2026-09-25",
    readMins: 5,
    cover: { seed: "agentra-control-room", block: "band" },
  },
  {
    slug: "ranges-not-point-estimates",
    title: "Reading outcomes as ranges, not point estimates",
    excerpt:
      "Honest proof for enterprise AI, and how we scope value with a range you can hold us to.",
    category: "Planning",
    author: team,
    date: "2026-09-18",
    readMins: 4,
    cover: { seed: "agentra-forecast-paper", block: "tl" },
  },
  {
    slug: "casting-supplier-week",
    title: "A Tier-1 casting supplier goes quiet for a week",
    excerpt:
      "How a single late supplier ripples through a plan, and where an agent can step in before the line stops.",
    category: "Resilience",
    author: lalit,
    date: "2026-09-11",
    readMins: 6,
    cover: { seed: "agentra-foundry-sparks", block: "br" },
  },
  {
    slug: "dashboards-dont-decide",
    title: "Twenty-five years of dashboards, and nobody deciding",
    excerpt:
      "What a career in supply chain operations taught me about the gap between seeing a problem and acting on it.",
    category: "Operator stories",
    author: lalit,
    date: "2026-09-08",
    readMins: 5,
    cover: { seed: "agentra-planning-desk", block: "tl" },
  },
  {
    slug: "probabilistic-reasoning",
    title: "Probabilistic over deterministic reasoning",
    excerpt:
      "Rule-based logic breaks when conditions turn volatile. Here is why agents that weigh likelihoods hold up.",
    category: "Planning",
    author: team,
    date: "2026-09-04",
    readMins: 6,
    cover: { seed: "agentra-weather-front", block: "band" },
  },
  {
    slug: "building-on-your-estate",
    title: "Building on the estate you already run",
    excerpt:
      "ERP-agnostic integration across SAP, Oracle, Dynamics 365 and your TMS and WMS. It works with what you have.",
    category: "Integration",
    author: team,
    date: "2026-08-28",
    readMins: 5,
    cover: { seed: "agentra-server-cables", block: "tl" },
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// PLACEHOLDER article body, shared by every post until real copy lands.
// It exercises each block type the article template supports.
export type BodyBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "quote"; text: string; by: string }
  | { type: "list"; items: string[] }
  | { type: "stat"; value: string; label: string; source: string };

export const placeholderBody: BodyBlock[] = [
  {
    type: "p",
    text: "Every supply chain team knows the moment. A signal arrives late, the plan no longer holds, and the people who could fix it are offline or buried in other fires. The decision is obvious in hindsight. Acting on it in time is the hard part.",
  },
  { type: "h2", id: "the-problem", text: "The problem" },
  {
    type: "p",
    text: "Dashboards surface the exception. Someone still has to read it, decide what to do, and then key the change into three different systems. By the time that happens, the cheapest options are gone.",
  },
  {
    type: "list",
    items: [
      "The signal sits in one system, the fix lives in another.",
      "Policies exist, but nobody can apply them at 2am.",
      "Every handoff adds hours, and hours cost money.",
    ],
  },
  { type: "h2", id: "what-the-agent-did", text: "What the agent did" },
  {
    type: "p",
    text: "A governed agent senses the exception, weighs the options inside the boundaries you set, and acts in the systems you already run. Where the stakes are high, it prepares the decision and waits for a person to approve it.",
  },
  {
    type: "quote",
    text: "The agent did not replace our planners. It gave them the first four hours back.",
    by: "Operations lead, European manufacturer (placeholder)",
  },
  { type: "h2", id: "the-result", text: "The result" },
  {
    type: "stat",
    value: "6–8 weeks",
    label: "from first use case to a live agent",
    source: "Agentra deployment model",
  },
  {
    type: "p",
    text: "The outcome is not a smarter dashboard. It is a supply chain that responds while people sleep, and a team that spends its day on the decisions that need judgement.",
  },
];
