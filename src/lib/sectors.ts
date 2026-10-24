/* ============================================================
   The four sectors we work in, one client each.
   Clients are never named: `client` is the approved descriptor from the
   Brand & Marketing Playbook. Only facts Marketing has confirmed go here;
   add the full story fields once a story is signed off.
   ============================================================ */

export type Sector = {
  slug: string;
  name: string;
  client: string;
  icon: "zap" | "heart" | "cpu" | "wheat";
  focus?: string;
};

export const sectors: Sector[] = [
  {
    slug: "energy-technology",
    name: "Energy technology",
    client: "A global energy technology leader",
    icon: "zap",
    focus: "Freight bill and audit",
  },
  {
    slug: "medical-technology",
    name: "Medical technology",
    client: "A global medical technology company",
    icon: "heart",
  },
  {
    slug: "semiconductors",
    name: "Semiconductors",
    client: "A precision-engineering manufacturer in the semiconductor supply chain",
    icon: "cpu",
    focus: "Supply chain visibility",
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    client: "A global agriculture major",
    icon: "wheat",
  },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);
