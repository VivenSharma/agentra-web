/* ============================================================
   AGENTRA — Rich data for live infographics & subpages
   (companion to content.ts). Same rules: no em dashes, ranges,
   no client names, supply-chain anchored.
   ============================================================ */

/* ---------- Connector ecosystem (brand monograms) ---------- */
export type Connector = { name: string; short: string; color: string };

// Supply-chain / logistics estate: ERP, planning, procurement, TMS/WMS,
// network visibility and data platforms — the systems Agentra acts on.
export const connectors: Connector[] = [
  { name: "SAP", short: "SAP", color: "#0AA1DD" },
  { name: "SAP IBP", short: "IBP", color: "#0AA1DD" },
  { name: "SAP Ariba", short: "ARB", color: "#F0AB00" },
  { name: "Oracle SCM", short: "ORA", color: "#C74634" },
  { name: "Dynamics 365", short: "D365", color: "#0067C0" },
  { name: "Blue Yonder", short: "BY", color: "#E4002B" },
  { name: "Kinaxis", short: "KNX", color: "#00A0DF" },
  { name: "o9 Solutions", short: "o9", color: "#7A5CFF" },
  { name: "Manhattan", short: "MAN", color: "#E31837" },
  { name: "e2open", short: "e2o", color: "#F26722" },
  { name: "Coupa", short: "CPA", color: "#1A4FA0" },
  { name: "project44", short: "p44", color: "#0A66FF" },
];

/* ---------- Live exception console ---------- */
export const exception = {
  id: "EXC-2141",
  event: "Container missed cutoff, Jebel Ali",
  status: "Action executed",
  reasoning: "6 steps",
  chain: ["REROUTED", "CARRIER BOOKED", "ERP UPDATED"],
  approvedBy: "S. Rahman",
  rows: [
    { id: "EXC-2144", event: "Supplier delay, Tier-1 casting", status: "Reasoning", tone: "amber" },
    { id: "EXC-2143", event: "Demand spike, SKU 8841-N", status: "Replanned", tone: "green" },
    { id: "EXC-2142", event: "Premium freight flag, LANE-EU12", status: "Awaiting approval", tone: "purple" },
  ],
};

/* ---------- Before / after: the night-shift story ---------- */
export const nightShift = {
  before: {
    label: "Before",
    note: "The alert fires into an empty inbox.",
    steps: [
      { t: "02:14", text: "Cutoff missed, alert fires" },
      { t: "09:00", text: "Team logs in, firefighting begins" },
    ],
    gap: "6h 46m unactioned",
    gapNote: "Demurrage clock running.",
    window: "6h 46m",
  },
  after: {
    label: "After, powered by Agentra",
    note: "The agent acts the moment it fires.",
    steps: [
      { t: "02:14", text: "Agent detects the missed cutoff" },
      { t: "02:15", text: "Correlates carriers, rates & SLAs" },
      { t: "02:16", text: "Routes reroute for human approval" },
      { t: "02:31", text: "Approved, executed, written to the audit log" },
    ],
    window: "17 min",
  },
};

/* ---------- Decisions before / after (FMCG) ---------- */
export const decisions = {
  context: "Global FMCG, multi-ERP estate",
  before: [
    "S&OE decisions aged 3 to 4 days in inboxes and meetings",
    "Exceptions handled manually across fragmented systems",
    "Insight everywhere, action nowhere",
  ],
  after: [
    "Decisions executed in under 5 minutes, governed",
    "Every action behind a human approval gate",
    "One autonomy layer across the whole estate",
  ],
  stats: [
    { value: "< 5 min", label: "Decision latency" },
    { value: "5–8%", label: "Freight cost" },
    { value: "+3–5%", label: "OTIF" },
    { value: "10–20%", label: "Premium freight" },
  ],
};

/* ---------- Supply chain process map (SCOR-style) ---------- */
export const scProcess = [
  {
    key: "plan",
    label: "Plan",
    agent: "Planning agent",
    desc: "Senses demand, balances cost, service and capacity, and replans continuously.",
  },
  {
    key: "source",
    label: "Source",
    agent: "Procurement agent",
    desc: "Reasons on rates, contracts and supplier risk, then places and adjusts orders.",
  },
  {
    key: "make",
    label: "Make",
    agent: "Orchestrator",
    desc: "Aligns production and capacity with the live plan across the network.",
  },
  {
    key: "deliver",
    label: "Deliver",
    agent: "Logistics agent",
    desc: "Reroutes freight, books carriers and resolves execution exceptions in minutes.",
  },
  {
    key: "return",
    label: "Return",
    agent: "Risk agent",
    desc: "Closes the loop, monitors disruption and protects margin end to end.",
  },
];

/* ---------- Home hero: the agentic supply chain control plane ---------- */
export const cpDecisions = [
  { role: "Board", sub: "ROI in $" },
  { role: "CSCO", sub: "Service & cost" },
  { role: "Planner", sub: "Prioritised actions" },
  { role: "Auditor", sub: "Evidence trail" },
];

/* ---------- The agent workforce (hero + /agents page) ---------- */
export type Agent = {
  key: string;
  name: string;
  role: string;
  viz: "forecast" | "pipeline" | "watch" | "supplier" | "orchestrate" | "route" | "radar";
  dot: "green" | "amber" | "blue";
  acts: string;
  metric: string; // short live status for the card
  does: string;
  metrics: { value: string; label: string }[];
  how: { title: string; desc: string }[];
  points: string[];
};

export const agentWorkforce: Agent[] = [
  {
    key: "demand",
    name: "Demand Planning Agent",
    role: "Plan",
    viz: "forecast",
    dot: "green",
    acts: "SAP · IBP",
    metric: "92% forecast",
    does: "Senses demand and replans continuously across every SKU and location.",
    metrics: [
      { value: "+20–30%", label: "Forecast accuracy" },
      { value: "10–20%", label: "Inventory reduction" },
      { value: "< 5 min", label: "Replan latency" },
    ],
    how: [
      { title: "Sense", desc: "Streams demand signals from every SKU and location." },
      { title: "Reason", desc: "Weighs cost, service and capacity trade-offs." },
      { title: "Act", desc: "Writes the updated plan back into your systems." },
    ],
    points: [
      "Multi-echelon inventory optimisation",
      "Continuous re-forecasting",
      "S&OP and IBP alignment",
    ],
  },
  {
    key: "order",
    name: "Order Orchestration Agent",
    role: "Execute",
    viz: "pipeline",
    dot: "green",
    acts: "OMS · ERP",
    metric: "80% straight-through",
    does: "Drives orders end to end through your systems, with no swivel-chair work.",
    metrics: [
      { value: "80%", label: "Less manual work" },
      { value: "< 5 min", label: "Cycle time" },
      { value: "100%", label: "Write-back" },
    ],
    how: [
      { title: "Trigger", desc: "A decision or exception calls for an order action." },
      { title: "Act", desc: "Creates and updates orders in OMS and ERP." },
      { title: "Log", desc: "Every step recorded to the audit ledger." },
    ],
    points: [
      "Straight-through processing",
      "Full write-back to systems of record",
      "Human approval routing",
    ],
  },
  {
    key: "freight",
    name: "Freight & Logistics Agent",
    role: "Execute",
    viz: "route",
    dot: "blue",
    acts: "TMS · carriers",
    metric: "−6% freight",
    does: "Reroutes freight and books carriers to protect service level and cost.",
    metrics: [
      { value: "5–8%", label: "Freight cost" },
      { value: "10–20%", label: "Premium freight" },
      { value: "30–50%", label: "Faster exceptions" },
    ],
    how: [
      { title: "Detect", desc: "Spots delays, missed cutoffs and cost spikes." },
      { title: "Reason", desc: "Compares carriers, rates and SLAs." },
      { title: "Reroute", desc: "Books the best option, routed for approval." },
    ],
    points: [
      "Carrier and rate optimisation",
      "Missed-cutoff recovery",
      "SLA-aware rerouting",
    ],
  },
  {
    key: "exception",
    name: "Exception Watcher Agent",
    role: "Resilience",
    viz: "watch",
    dot: "amber",
    acts: "TMS · WMS",
    metric: "24/7 live",
    does: "Watches the network around the clock and resolves exceptions the moment they fire.",
    metrics: [
      { value: "24/7", label: "Network watch" },
      { value: "< 5 min", label: "Response time" },
      { value: "6h → 17m", label: "Cycle collapsed" },
    ],
    how: [
      { title: "Detect", desc: "An exception fires, day or night." },
      { title: "Correlate", desc: "Links carriers, rates and SLAs in context." },
      { title: "Resolve", desc: "Acts within guardrails and writes to the log." },
    ],
    points: [
      "Round-the-clock coverage",
      "Demurrage and penalty avoidance",
      "Autonomous within guardrails",
    ],
  },
  {
    key: "procurement",
    name: "Procurement Agent",
    role: "Source",
    viz: "supplier",
    dot: "green",
    acts: "SAP · Ariba",
    metric: "risk scored",
    does: "Reasons on rates, contracts and supplier risk to place and adjust orders.",
    metrics: [
      { value: "Live", label: "Supplier scoring" },
      { value: "Auto", label: "PO adjustments" },
      { value: "Range", label: "Cost savings" },
    ],
    how: [
      { title: "Assess", desc: "Scores supplier and lane risk continuously." },
      { title: "Reason", desc: "Weighs rates, contracts and lead times." },
      { title: "Act", desc: "Places and adjusts purchase orders." },
    ],
    points: [
      "Continuous supplier scoring",
      "Contract-aware sourcing",
      "Alternate-source suggestions",
    ],
  },
  {
    key: "risk",
    name: "Risk & Resilience Agent",
    role: "Resilience",
    viz: "radar",
    dot: "blue",
    acts: "network",
    metric: "real-time",
    does: "Monitors the whole network for disruption and protects margin end to end.",
    metrics: [
      { value: "Real-time", label: "Disruption detection" },
      { value: "30–50%", label: "Faster resolution" },
      { value: "End-to-end", label: "Coverage" },
    ],
    how: [
      { title: "Monitor", desc: "Watches suppliers, lanes and ports in real time." },
      { title: "Score", desc: "Ranks risk by impact on service and cost." },
      { title: "Trigger", desc: "Kicks off the agent that resolves it." },
    ],
    points: [
      "Real-time disruption detection",
      "Supplier and lane risk scoring",
      "Automated response orchestration",
    ],
  },
];

export const cpStack = [
  "SAP",
  "Oracle",
  "Dynamics 365",
  "TMS",
  "WMS",
  "OMS",
  "MES",
  "SCP",
  "PLM",
  "Data lake",
];

/* ---------- Platform: signal in / decisions out ---------- */
export const signalsIn = [
  "SAP",
  "Oracle",
  "Dynamics 365",
  "TMS / WMS",
  "Legacy ERP",
];
export const decisionsOut = [
  "Optimised plans",
  "Orders placed",
  "Freight rerouted",
  "Exceptions resolved",
];
export const planeModules = [
  { key: "demand", label: "Demand", tip: "Senses demand across SKUs and locations." },
  { key: "procure", label: "Procurement", tip: "Reasons on rates, contracts and supplier risk." },
  { key: "orch", label: "Orchestration", tip: "Coordinates agents and resolves conflicts." },
  { key: "logi", label: "Logistics", tip: "Reroutes freight and books carriers." },
  { key: "risk", label: "Risk", tip: "Detects disruption and protects margin." },
];

export const platformStats = [
  { value: "1000+", label: "Integrations" },
  { value: "Minutes", label: "Sense to action" },
  { value: "3", label: "Autonomy levels" },
  { value: "Always", label: "Audit-ready" },
];

/* ---------- Solutions detail (for subpages) ---------- */
export const solutionDetail: Record<
  string,
  {
    eyebrow: string;
    hero: string;
    heroAccent: string;
    intro: string;
    outcomes: { value: string; label: string }[];
    steps: { title: string; desc: string }[];
    capabilities: string[];
  }
> = {
  planning: {
    eyebrow: "Solution · Planning",
    hero: "Planning that replans",
    heroAccent: "itself.",
    intro:
      "Agents sense demand, balance cost, service, working capital and capacity, and adjust the plan the moment conditions move, not at the next cycle.",
    outcomes: [
      { value: "+20–30%", label: "Forecast accuracy" },
      { value: "10–20%", label: "Inventory reduction" },
      { value: "< 5 min", label: "Replan latency" },
    ],
    steps: [
      { title: "Sense", desc: "Demand signals stream in from every SKU and location." },
      { title: "Reason", desc: "Agents weigh trade-offs across cost, service and capacity." },
      { title: "Act", desc: "The plan updates and flows back into your systems, governed." },
    ],
    capabilities: [
      "SKU and location demand sensing",
      "Multi-echelon inventory optimisation",
      "Dynamic S&OP and IBP alignment",
      "Scenario simulation under uncertainty",
    ],
  },
  resilience: {
    eyebrow: "Solution · Resilience",
    hero: "See disruption before",
    heroAccent: "it costs you.",
    intro:
      "Agents monitor the network in real time, detect disruptions and anomalies, score risk, and trigger the response that resolves them.",
    outcomes: [
      { value: "30–50%", label: "Faster resolution" },
      { value: "10–20%", label: "Premium freight" },
      { value: "24/7", label: "Network watch" },
    ],
    steps: [
      { title: "Detect", desc: "Signals of delay, shortage or anomaly surface instantly." },
      { title: "Score", desc: "Agents rank supplier and lane risk by impact." },
      { title: "Resolve", desc: "Response is triggered and routed for approval." },
    ],
    capabilities: [
      "Real-time disruption detection",
      "Supplier and lane risk scoring",
      "Automated exception resolution",
      "Demurrage and penalty avoidance",
    ],
  },
  execution: {
    eyebrow: "Solution · Execution",
    hero: "Decisions become actions,",
    heroAccent: "inside your systems.",
    intro:
      "Agents drive operational actions through the systems already in place: creating orders, rerouting freight and updating plans, with no swivel-chair work.",
    outcomes: [
      { value: "80%", label: "Less manual work" },
      { value: "5–8%", label: "Freight cost" },
      { value: "< 5 min", label: "Cycle time" },
    ],
    steps: [
      { title: "Trigger", desc: "An exception or decision calls for action." },
      { title: "Act", desc: "The agent writes back into your ERP, TMS or WMS." },
      { title: "Log", desc: "Every step is recorded to the audit ledger." },
    ],
    capabilities: [
      "Order orchestration",
      "Freight and logistics actioning",
      "Straight-through processing",
      "Full write-back to systems of record",
    ],
  },
  orchestration: {
    eyebrow: "Solution · Orchestration",
    hero: "One coordinated supply chain,",
    heroAccent: "not five silos.",
    intro:
      "Orchestrators synchronise decisions across planning, procurement, logistics and risk, resolving conflicts with a human in the loop on every consequential move.",
    outcomes: [
      { value: "5", label: "Agent domains" },
      { value: "1", label: "Autonomy layer" },
      { value: "100%", label: "Auditable" },
    ],
    steps: [
      { title: "Coordinate", desc: "Agents share one model of the supply chain." },
      { title: "Resolve", desc: "Conflicts are negotiated and prioritised." },
      { title: "Govern", desc: "Consequential moves route to a human gate." },
    ],
    capabilities: [
      "Cross-functional agent coordination",
      "Conflict resolution and prioritisation",
      "Human-in-the-loop governance",
      "Unified audit across every agent",
    ],
  },
};

/* ---------- Resources (podcasts) ---------- */
export const podcasts = [
  {
    title: "From operator to agentic founder",
    desc: "Scaling a supply chain company, and why agents are the next step.",
    meta: "Episode 01 · 42 min",
  },
  {
    title: "Inside the ontology layer",
    desc: "How agents reason like planners, not chatbots.",
    meta: "Episode 02 · 38 min",
  },
  {
    title: "Governance without slowing down",
    desc: "Setting autonomy levels that risk teams trust.",
    meta: "Episode 03 · 35 min",
  },
  {
    title: "The 2am container problem",
    desc: "Autonomous exception handling in global logistics.",
    meta: "Episode 04 · 40 min",
  },
];
