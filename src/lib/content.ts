/* ============================================================
   AGENTRA — Central content model
   Rules: no em dashes, ranges not point estimates, no client
   names, active voice, sentence case, supply-chain anchored.
   ============================================================ */

export const site = {
  name: "Agentra",
  domain: "agentra-ai.com",
  tagline: "From automation to autonomy.",
  hero:
    "A workforce of specialized agents that sense, reason, and act across your supply chain, powered by a proprietary ontology layer. Vertical, not horizontal. Probabilistic, not deterministic.",
  category: "The agentic supply chain",
};

export const nav = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Company", href: "/company" },
  { label: "Resources", href: "/resources" },
];

/* ---------- Problem statement (3 pillars) ---------- */
export const problems = [
  {
    icon: "activity",
    title: "Manual at industrial scale",
    body: "Planners and execution teams still make thousands of trade-off decisions by hand, every day, across every node in the network.",
  },
  {
    icon: "layers",
    title: "Fragmented across systems",
    body: "Decisions live in silos across ERPs and execution systems that were never designed to reason together.",
  },
  {
    icon: "crosshair",
    title: "The digital-to-reality gap",
    body: "Static plans break the moment conditions shift. In volatile, uncertain conditions, the plan and the ground diverge fast.",
  },
];

/* ---------- What makes Agentra different (3 tiles) ---------- */
export const differentiators = [
  {
    icon: "target",
    title: "Vertical, built only for supply chain",
    body: "Agentra reasons in SKUs, lanes, lead times, and service levels. It is not a horizontal platform pointed at your data.",
  },
  {
    icon: "network",
    title: "Ontology-powered reasoning, not rules",
    body: "A proprietary ontology layer gives agents a shared, structured model of your supply chain, so they reason instead of following brittle rules.",
  },
  {
    icon: "activity",
    title: "Probabilistic reasoning for uncertainty",
    body: "Agents weigh likelihoods and trade-offs under uncertainty rather than executing deterministic logic that assumes a stable world.",
  },
];

/* ---------- Agent marketplace (6 categories) ---------- */
export const marketplace = [
  {
    icon: "target",
    name: "Planning",
    scope: "S&OP",
    desc: "Balances cost, service, working capital, and capacity, and replans as conditions move.",
  },
  {
    icon: "zap",
    name: "Logistics",
    scope: "S&OE",
    desc: "Resolves execution exceptions, reroutes freight, and keeps orders moving in real time.",
  },
  {
    icon: "layers",
    name: "Procurement",
    scope: "Sourcing",
    desc: "Reasons on rates, contracts, and supplier risk to place and adjust orders.",
  },
  {
    icon: "shield",
    name: "Risk",
    scope: "Resilience",
    desc: "Senses disruption and anomalies across the network and triggers response.",
  },
  {
    icon: "network",
    name: "Orchestrators",
    scope: "Coordination",
    desc: "Coordinate specialized agents, resolve conflicts, and align cross-functional decisions.",
  },
  {
    icon: "clock",
    name: "Financial",
    scope: "Cost & audit",
    desc: "Audits freight bills, reconciles cost, and protects margin across the flow.",
  },
];

/* ---------- Proof: case studies (industry + problem only, ranges) ---------- */
export const caseStudies = [
  {
    industry: "Energy Technology",
    problem: "Freight Bill & Audit",
    results: [
      { value: "200–300%", label: "ROI" },
      { value: "60–70%", label: "Team transformation" },
      { value: "10–15%", label: "GHG reduction, year 1" },
    ],
  },
  {
    industry: "FMCG",
    problem: "S&OE Multi-Agent Response",
    results: [
      { value: "3–4 days → < 5 min", label: "Decision latency" },
      { value: "98%+", label: "Service level held" },
      { value: "Multi-agent", label: "Coordinated response" },
    ],
  },
  {
    industry: "Semiconductor",
    problem: "Supply Chain Visibility",
    results: [
      { value: "5–8%", label: "Freight cost reduction" },
      { value: "30–50%", label: "Faster exception resolution" },
      { value: "10–20%", label: "Premium freight reduction" },
    ],
  },
];

/* ---------- 6-Layer platform stack ---------- */
export const stack = [
  {
    id: "L6",
    name: "Agent Orchestration",
    desc: "Autonomous agents coordinate and act toward outcomes, with a human in the loop.",
  },
  {
    id: "L5",
    name: "Application",
    desc: "Purpose-built applications for planning, execution, risk, and finance.",
  },
  {
    id: "L4",
    name: "Workflow",
    desc: "Composable, governed decision workflows across functions.",
  },
  {
    id: "L3",
    name: "Ontology & Data",
    desc: "The proprietary ontology layer. SKUs, lanes, lead times, and service levels. This is the moat.",
    moat: true,
  },
  {
    id: "L2",
    name: "Security & Compliance",
    desc: "Guardrails, audit trails, data residency, and access control.",
  },
  {
    id: "L1",
    name: "Enterprise Systems",
    desc: "900+ integrations across SAP, Oracle, Microsoft, and your TMS and WMS.",
  },
];

/* ---------- Multi-agent engine nodes ---------- */
export const agents = [
  { key: "demand", label: "Demand", angle: -90 },
  { key: "procurement", label: "Procurement", angle: -18 },
  { key: "order", label: "Order Orchestration", angle: 54 },
  { key: "logistics", label: "Logistics", angle: 126 },
  { key: "risk", label: "Risk", angle: 198 },
];

/* ---------- Autonomy dial ---------- */
export const autonomy = [
  {
    key: "suggest",
    title: "Suggest",
    desc: "Agents surface the recommended action. A human decides.",
  },
  {
    key: "copilot",
    title: "Co-pilot",
    desc: "Agents act with human approval on each decision.",
  },
  {
    key: "autopilot",
    title: "Autopilot",
    desc: "Agents act autonomously within the guardrails you set.",
  },
];

/* ---------- Solutions (functional areas) ---------- */
export const solutions = [
  {
    slug: "planning",
    icon: "target",
    title: "Planning",
    tagline: "Optimise the trade-offs, continuously.",
    body: "Agents balance cost, service level, working capital, and capacity, replanning as conditions change instead of waiting for the next cycle.",
    points: [
      "SKU and location demand sensing",
      "Multi-echelon inventory optimisation",
      "Dynamic S&OP and IBP alignment",
    ],
  },
  {
    slug: "resilience",
    icon: "activity",
    title: "Resilience",
    tagline: "See disruption before it costs you.",
    body: "Agents monitor the network in real time, detect disruptions and anomalies, and trigger the response that resolves them.",
    points: [
      "Real-time disruption detection",
      "Supplier and lane risk scoring",
      "Automated exception resolution",
    ],
  },
  {
    slug: "execution",
    icon: "zap",
    title: "Execution",
    tagline: "Decisions become actions inside your systems.",
    body: "Agents drive operational actions through the systems already in place: creating orders, rerouting freight, and updating plans without swivel-chair work.",
    points: [
      "Order orchestration",
      "Freight and logistics actioning",
      "Straight-through processing",
    ],
  },
  {
    slug: "orchestration",
    icon: "network",
    title: "Orchestration",
    tagline: "One coordinated supply chain, not five silos.",
    body: "Orchestrators synchronise decisions across planning, procurement, logistics, and risk, with a human in the loop on every consequential move.",
    points: [
      "Cross-functional agent coordination",
      "Conflict resolution and prioritisation",
      "Human-in-the-loop governance",
    ],
  },
];

/* ---------- Trust layer ---------- */
export const trust = {
  integrations: [
    "SAP",
    "Oracle",
    "Salesforce",
    "Microsoft",
    "Snowflake",
    "Blue Yonder",
  ],
  llms: ["OpenAI", "Anthropic", "Google", "Meta", "DeepSeek"],
  clouds: ["Azure", "AWS", "GCP"],
  compliance: ["GDPR", "ISO 27001"],
  guarantee:
    "16-week delivery guarantee. If we are late by a day, you do not pay.",
};

/* ---------- Global presence ---------- */
export const locations = [
  { city: "Amsterdam, NL", short: "Amsterdam", role: "Headquarters", x: 49, y: 30 },
  { city: "Delhi NCR, India", short: "Delhi NCR", role: "Engineering Team", x: 69, y: 45 },
  { city: "Dubai, UAE", short: "Dubai", role: "Sales Team", x: 61, y: 43 },
  { city: "St. Louis, USA", short: "St. Louis", role: "Sales Team", x: 24, y: 40 },
];

/* ---------- Buyer personas (stakeholder lens) ---------- */
export const personas = [
  {
    role: "Economic buyer",
    who: "CDO, Chief AI, or Transformation Officer",
    cares: "Board-level AI narrative, managed risk, defensible ROI",
  },
  {
    role: "Champion",
    who: "VP Supply Chain, S&OP or IBP Director",
    cares: "Forecast accuracy, planner productivity, service levels",
  },
  {
    role: "Technical evaluator",
    who: "IT or Enterprise Architecture lead",
    cares: "Integration, security, data residency",
  },
];

/* ---------- Engagement model ---------- */
export const phases = [
  {
    phase: "Phase 1",
    time: "4 to 6 weeks",
    title: "Proof of Value",
    label: "Land",
    desc: "The first production agent goes live against a real, measurable outcome.",
  },
  {
    phase: "Phase 2",
    time: "about 10 weeks",
    title: "Full Deployment",
    label: "Expand",
    desc: "Roll out across functions and integrate deeper into your stack.",
  },
  {
    phase: "Outcome",
    time: "Ongoing",
    title: "Autonomous supply chain ops",
    label: "Scale",
    desc: "A coordinated, self-adjusting supply chain running on Agentra.",
  },
];

/* ---------- FAQ ---------- */
export const faqs = [
  {
    q: "How is Agentra different from a planning suite?",
    a: "Planning suites recommend and wait for a human to act. Agentra reasons on an ontology layer and then acts directly inside your existing systems, closing the loop from decision to action.",
  },
  {
    q: "Do we have to replace SAP, Oracle, or our TMS?",
    a: "No. Agentra is ERP-agnostic and sits on top of the systems you already run through 900+ integrations. There is no rip-and-replace.",
  },
  {
    q: "How fast can we see value?",
    a: "The first production agent is typically live in 6 to 8 weeks against a real outcome, backed by a 16-week delivery guarantee. Then we expand from there.",
  },
  {
    q: "How do you keep this safe and compliant?",
    a: "Every agent is governed by design: human-in-the-loop, explainable, and fully auditable. You set the autonomy level per workflow, from Suggest to Co-pilot to Autopilot. Agentra is GDPR-aligned and ISO 27001 oriented.",
  },
  {
    q: "Is Agentra tied to one model or cloud?",
    a: "No. Agentra is LLM-agnostic and cloud-agnostic, running across OpenAI, Anthropic, Google, and others, on Azure, AWS, or GCP.",
  },
];
