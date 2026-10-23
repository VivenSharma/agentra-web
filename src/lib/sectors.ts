/* ============================================================
   The four sectors we work in, one client story each.
   Clients are never named: `client` is the approved descriptor from the
   Brand & Marketing Playbook. Anything client-specific that Marketing has
   not signed off yet stays as a [PLACEHOLDER] string, never invented.
   ============================================================ */

export type Sector = {
  slug: string;
  name: string;
  client: string;
  icon: "zap" | "heart" | "cpu" | "wheat";
  cover: string; // picsum seed until real imagery is commissioned
  industry: {
    headline: string;
    intro: string;
    pressures: { title: string; body: string }[];
    agents: { title: string; body: string; href: string }[];
  };
  story: {
    focus: string;
    headline: string;
    challenge: string;
    actions: string;
    result: string;
    quote: string;
    attribution: string;
  };
};

const PENDING = "[PLACEHOLDER] Awaiting Marketing sign-off.";

export const sectors: Sector[] = [
  {
    slug: "energy-technology",
    name: "Energy technology",
    client: "A global energy technology leader",
    icon: "zap",
    cover: "agentra-energy-grid",
    industry: {
      headline: "Agents for energy technology supply chains.",
      intro:
        "Long-lead components, project-driven demand and freight across hundreds of lanes. Agents keep the plan and the spend honest.",
      pressures: [
        { title: "Long-lead components", body: "A late transformer or turbine part can hold up a whole project schedule." },
        { title: "Freight cost leakage", body: "Invoices across many carriers and lanes rarely match what was agreed." },
        { title: "Emissions reporting", body: "Every shipment now carries a carbon figure that someone has to account for." },
      ],
      agents: [
        { title: "Audit freight bills", body: "Check every invoice against contract rates and flag the mismatches.", href: "/solutions/execution" },
        { title: "Catch inbound delays", body: "Spot a late supplier and re-plan before the project slips.", href: "/solutions/resilience" },
        { title: "Coordinate the response", body: "Line up procurement, logistics and planning on one decision.", href: "/solutions/orchestration" },
      ],
    },
    story: {
      focus: "Freight bill and audit",
      headline: "[PLACEHOLDER] Story headline",
      challenge: PENDING,
      actions: PENDING,
      result: PENDING,
      quote: PENDING,
      attribution: "[PLACEHOLDER] Role, company descriptor",
    },
  },
  {
    slug: "medical-technology",
    name: "Medical technology",
    client: "A global medical technology company",
    icon: "heart",
    cover: "agentra-medtech-lab",
    industry: {
      headline: "Agents for medical technology supply chains.",
      intro:
        "Regulated products, strict traceability and hospitals that cannot wait. Agents act fast and leave a trail auditors can follow.",
      pressures: [
        { title: "Traceability", body: "Every lot, expiry date and change has to be recorded and explainable." },
        { title: "Service commitments", body: "A stock-out reaches a patient, not just a customer." },
        { title: "Single-source parts", body: "One supplier issue can stop a production line." },
      ],
      agents: [
        { title: "Sense demand shifts", body: "Read order signals early and replan supply ahead of shortages.", href: "/solutions/planning" },
        { title: "Resolve exceptions", body: "Work through late orders and shortfalls inside your guardrails.", href: "/solutions/resilience" },
        { title: "Keep the audit trail", body: "Every agent decision is logged, explained and reviewable.", href: "/trust" },
      ],
    },
    story: {
      focus: "[PLACEHOLDER] Focus area",
      headline: "[PLACEHOLDER] Story headline",
      challenge: PENDING,
      actions: PENDING,
      result: PENDING,
      quote: PENDING,
      attribution: "[PLACEHOLDER] Role, company descriptor",
    },
  },
  {
    slug: "semiconductors",
    name: "Semiconductors",
    client: "A precision-engineering manufacturer in the semiconductor supply chain",
    icon: "cpu",
    cover: "agentra-cleanroom",
    industry: {
      headline: "Agents for the semiconductor supply chain.",
      intro:
        "Long cycle times, tight allocation and costly expedites. Agents give planners a clear view and act on it.",
      pressures: [
        { title: "Visibility gaps", body: "Orders move through many tiers, and status lives in many systems." },
        { title: "Premium freight", body: "Late discovery turns into expensive expedites." },
        { title: "Capacity swings", body: "Allocation changes faster than a monthly plan can follow." },
      ],
      agents: [
        { title: "Track every order", body: "Pull status from each system into one live picture.", href: "/solutions/execution" },
        { title: "Flag risk early", body: "Spot slippage while there is still time to act cheaply.", href: "/solutions/resilience" },
        { title: "Replan continuously", body: "Adjust the plan as allocation and capacity change.", href: "/solutions/planning" },
      ],
    },
    story: {
      focus: "Supply chain visibility",
      headline: "[PLACEHOLDER] Story headline",
      challenge: PENDING,
      actions: PENDING,
      result: PENDING,
      quote: PENDING,
      attribution: "[PLACEHOLDER] Role, company descriptor",
    },
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    client: "A global agriculture major",
    icon: "wheat",
    cover: "agentra-grain-harvest",
    industry: {
      headline: "Agents for agriculture supply chains.",
      intro:
        "Seasons, weather and global trade lanes set the pace. Agents help teams respond in hours, not weeks.",
      pressures: [
        { title: "Seasonal peaks", body: "Most of the year's volume moves in a few short windows." },
        { title: "Weather and trade risk", body: "A storm or a port closure changes the plan overnight." },
        { title: "Shelf life", body: "Product that waits too long loses value." },
      ],
      agents: [
        { title: "Plan around the season", body: "Balance supply and demand as forecasts and harvests move.", href: "/solutions/planning" },
        { title: "Reroute around disruption", body: "Find the next best lane when a route closes.", href: "/solutions/resilience" },
        { title: "Act inside your systems", body: "Place and change orders in the tools you already run.", href: "/solutions/execution" },
      ],
    },
    story: {
      focus: "[PLACEHOLDER] Focus area",
      headline: "[PLACEHOLDER] Story headline",
      challenge: PENDING,
      actions: PENDING,
      result: PENDING,
      quote: PENDING,
      attribution: "[PLACEHOLDER] Role, company descriptor",
    },
  },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);

export const isPlaceholder = (s: string) => s.startsWith("[PLACEHOLDER]");
