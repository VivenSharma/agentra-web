/* Published blog articles. Copy is verbatim from Marketing's documents;
   inline **bold** and [text](url) are rendered by the article page.
   No author or date until Marketing supplies them (the doc left them blank). */

export type Block =
  | { type: "p"; text: string }
  // Closing call to action, set apart from the article body
  | { type: "cta"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string }
  | { type: "figure"; src: string; alt: string; width: number; height: number; caption?: string }
  | { type: "table"; head: string[]; rows: string[][] }
  // A self-contained interactive page from /public/embeds, shown in an iframe
  | { type: "embed"; src: string; title: string }
  // A diagram rebuilt as a live component (components/viz), in place of a flat graphic
  | {
      type: "viz";
      name:
        | "replenishment-loop"
        | "freight-levels"
        | "delay-chain"
        | "governed-execution"
        | "po-routing"
        | "autonomy-context";
    }
  // "Delivered" client results, as cards whose figures count up on screen
  | { type: "proof"; items: { client: string; text: string; stats: { value: string; label: string }[] }[] }
  // The interactive Inbound Freight Disruption Check (components/blog/DisruptionCheck)
  | { type: "quiz" };

export type Article = {
  slug: string;
  tag?: string;
  title: string;
  // Search title and meta description, when Marketing gives ones that differ
  seoTitle?: string;
  description?: string;
  dek: string;
  readMins: number;
  // The solution page(s) this post supports. Each post links to them and each
  // solution page lists its posts, so blog and product pages link both ways.
  solutions?: ("planning" | "resilience" | "execution" | "orchestration")[];
  cover: { src: string; alt: string; width: number; height: number };
  body: Block[];
  // Closing banner (the whitepaper launch) and the boilerplate under it
  banner?: { src: string; alt: string; width: number; height: number };
  about?: string;
};

const img = (name: string) => `/blog/tariffs-move-weekly/${name}.png`;
const rights = (name: string) => `/blog/decision-rights-agentic-supply-chain/${name}.png`;
const freight = (name: string) => `/blog/inbound-freight-management-agentic-ai/${name}.png`;
const fresh = (name: string) => `/blog/daily-demand-sensing-store-replenishment/${name}.png`;
const audit = (name: string) => `/blog/freight-bill-auditing-india/${name}.jpg`;
const sop = (name: string) => `/blog/continuous-sop-consumer-electronics/${name}.jpg`;

const po = (name: string) => `/blog/dc-network-transition-open-pos/${name}.jpg`;
const hil = (name: string) => `/blog/human-in-the-loop-ai-supply-chain/${name}.jpg`;
const season = (name: string) => `/blog/seasonal-demand-freight-planning-diagnostics/${name}.jpg`;
const medtech = (name: string) => `/blog/medtech-supply-chain-exceptions/${name}.jpg`;
const launch = (name: string) => `/blog/instrument-launch-logistics/${name}.jpg`;

export const articles: Article[] = [
  {
    slug: "dc-network-transition-open-pos",
    solutions: ["execution"],
    title: "The Hidden PO Cost of a DC Network Transition",
    seoTitle: "DC Network Transition: The Hidden Cost of Open POs",
    description:
      "Discover how a DC network transition affects open POs, creates hidden costs and how agentic AI helps manage changes across suppliers and systems.",
    dek: "Discover how a DC network transition affects open POs, creates hidden costs and how agentic AI helps manage changes across suppliers and systems.",
    readMins: 6,
    cover: {
      src: po("cover"),
      alt: "Shipping carton label still addressed to a closed distribution centre, covered by a facility-closed redirect sticker, showing an open PO that missed the DC network transition.",
      width: 2400,
      height: 1350,
    },
    body: [
      { type: "p", text: "A new distribution centre is operational. But some purchase orders still point to the old one." },
      { type: "p", text: "During a **DC network transition**, companies may close existing facilities, open new ones or shift operations to third-party logistics (3PL) providers. Yet a **3PL transition** does not automatically update open purchase orders, supplier confirmations or inbound shipment instructions." },
      { type: "p", text: "These gaps can lead to manual corrections, shipment delays and additional freight costs. While the physical network changes, purchase order execution may struggle to keep pace." },
      { type: "p", text: "The result? A distribution transition that continues to generate costs even after the new facility goes live." },

      { type: "h2", text: "Where PO execution breaks during a DC network transition" },
      { type: "p", text: "A **DC network transition** changes where goods are received and distributed. But existing purchase orders (POs) and supplier instructions may still reflect the previous network. This creates four common challenges:" },
      {
        type: "list",
        items: [
          "**Outdated delivery addresses:** Open POs may still reference closed or relocated DCs, increasing the risk of misdirected shipments.",
          "**ASN discrepancies:** Advance shipping notices (ASNs) may contain outdated destinations or fail to match revised PO details, causing receiving delays.",
          "**Outdated allocation rules:** Inventory may continue to be assigned to old locations, even when distribution responsibilities have changed.",
          "**Supplier confirmation gaps:** Suppliers may not have acknowledged PO amendments, leaving uncertainty about where and when goods will arrive.",
        ],
      },
      { type: "p", text: "These issues can become harder to manage during a phased DC or **3PL transition**. Old and new facilities may operate in parallel, while the new 3PL is still ramping up." },
      { type: "p", text: "As a result, procurement, logistics and warehouse teams must coordinate PO changes across multiple systems and partners to keep inbound deliveries on track." },

      { type: "h2", text: "The hidden cost of a PO that follows the wrong network" },
      { type: "p", text: "An outdated purchase order can create costs beyond a simple correction. During a DC network transition, a mismatch between PO details and the new distribution network can affect suppliers, shipments and warehouse operations." },
      { type: "p", text: "These costs can appear in several ways:" },
      {
        type: "list",
        items: [
          "**Manual PO corrections:** Procurement teams spend time identifying affected orders and updating delivery instructions.",
          "**Supplier follow-ups:** Teams must confirm whether suppliers have received and accepted revised PO details.",
          "**Additional freight and handling costs:** Shipments sent to the wrong DC may need redirection, extra transport or repeated handling.",
          "**Receiving delays:** Missing or mismatched shipment information can delay goods receipt at the new facility.",
          "**Inventory availability issues:** Delayed receipts can affect stock availability and downstream deliveries.",
        ],
      },
      { type: "p", text: "One unresolved PO can involve procurement, logistics, warehouse operations and finance. Each team may need to investigate, coordinate changes or reconcile additional charges." },
      { type: "p", text: "**The hidden cost is not just correcting the PO. It is the time, effort and expense of coordinating and verifying every change that follows.**" },

      { type: "h2", text: "Which POs should move, stay or bypass the DC?" },
      { type: "p", text: "During a phased DC network transition, old and new facilities may operate in parallel. Some purchase orders may need new delivery destinations, while others can continue through the existing network." },
      { type: "p", text: "The right decision depends on the PO status, supplier confirmation, shipment progress, receiving capacity and delivery commitments." },
      {
        type: "table",
        head: ["PO condition", "Decision to evaluate"],
        rows: [
          ["Goods not yet dispatched", "Update the PO to an approved receiving DC, if required."],
          ["Supplier has not confirmed the PO amendment", "Obtain confirmation before treating the change as accepted."],
          ["Shipment already in transit", "Check whether redirection is feasible and cost-effective."],
          ["New 3PL has limited receiving capacity", "Consider another approved facility or reschedule delivery."],
          ["Shipment is eligible for DC bypass", "Compare direct delivery with the DC route based on cost and service requirements."],
        ],
      },
      { type: "p", text: "Not every PO needs to be redirected. Some shipments may continue to the existing DC, while others require revised instructions or alternative routes." },
      { type: "p", text: "**DC bypass is an option only where operationally feasible and commercially justified.** The objective is to make the right decision for each PO without disrupting deliveries or creating unnecessary costs." },
      { type: "viz", name: "po-routing" },

      { type: "h2", text: "How a PO agent keeps purchase orders aligned during a network transition" },
      { type: "p", text: "During a **DC network transition**, managing open POs requires more than updating delivery addresses. Teams must check supplier confirmations, shipment status and receiving capacity before making changes." },
      { type: "p", text: "An agentic AI-powered PO agent can help coordinate this process through five steps:" },
      {
        type: "list",
        items: [
          "**Monitor:** Track open POs, supplier confirmations and advance shipping notices (ASNs) across connected systems.",
          "**Identify:** Find orders that require destination changes, lack supplier confirmation or contain mismatched shipment details.",
          "**Evaluate:** Check shipment status, approved delivery locations, receiving capacity and business rules to determine the appropriate action.",
          "**Act:** Update permitted PO details, coordinate changes with relevant parties or route decisions for human approval.",
          "**Verify:** Confirm that authorised changes are reflected in relevant systems and maintain an audit trail.",
        ],
      },
      { type: "p", text: "Not every PO requires the same action or level of automation. Business rules define permitted changes, while approval thresholds and escalation procedures keep sensitive decisions with the right people." },
      { type: "p", text: "**The goal is not simply to identify PO discrepancies, but to ensure that the required changes are authorised, executed and verified.**" },
      { type: "figure", src: po("po-agent-update"), alt: "Laptop showing a PO agent updating a purchase order from the old DC to a new 3PL DC, with supplier confirmation, ASN match and receiving slot verified.", width: 2400, height: 1350 },

      { type: "h2", text: "How Agentra supports PO execution across existing systems" },
      { type: "p", text: "During a **DC network transition**, purchase order changes often involve multiple systems, suppliers and logistics partners. Keeping them aligned requires more than updating information in one application." },
      { type: "h3", text: "Connecting existing enterprise systems" },
      { type: "p", text: "Agentra works with existing ERP, supplier and logistics applications through 1,100+ connectors. This helps agents access relevant PO, supplier and shipment information without requiring companies to replace their existing systems." },
      { type: "h3", text: "Coordinating authorised PO changes" },
      { type: "p", text: "Agentra's specialised AI agents can identify affected orders, evaluate approved destinations and coordinate permitted changes across connected systems. This supports PO execution as companies move to new DCs or adopt a hybrid 3PL model." },
      {
        type: "proof",
        items: [
          {
            client: "PO execution across systems",
            text: "In one implementation, Agentra enabled the booking of **3,000+ POs per month** from SAP to a freight forwarder without manual re-keying.",
            stats: [{ value: "3,000+", label: "POs per month booked from SAP" }],
          },
        ],
      },
      { type: "p", text: "This demonstrates Agentra's experience in automating PO-related workflows between systems, a capability relevant to managing PO changes during network transitions." },
      { type: "h3", text: "Keeping people in command" },
      { type: "p", text: "Suggest, Co-pilot and Autopilot modes allow organisations to define the level of agent autonomy. Business rules, approval workflows and audit trails help keep changes controlled and traceable." },

      { type: "h2", text: "Conclusion: A DC transition is not complete until the POs catch up" },
      { type: "p", text: "A new distribution centre may be ready, but the transition is far from complete if purchase orders still follow the old network. Every delayed update, missed confirmation or misdirected shipment can add cost and disrupt deliveries." },
      { type: "p", text: "The real measure of a successful **DC network transition** is not just moving operations to a new facility. It is keeping purchase orders, suppliers and inbound shipments aligned as the network changes." },
      { type: "p", text: "**With Agentra, your supply chain acts on what it knows. You stay in command.**" },
      { type: "cta", text: "**[Book a 30-minute walkthrough to see Agentra's PO agents in action.](/contact)**" },
    ],
  },
  {
    slug: "human-in-the-loop-ai-supply-chain",
    solutions: ["orchestration"],
    title: "Human-in-the-Loop AI in Supply Chains: How Much Human Oversight Is Enough?",
    seoTitle: "Human-in-the-Loop AI in Supply Chains",
    description:
      "When does human intervention protect supply chain performance, and when does it become an operational constraint?",
    dek: "When does human intervention protect supply chain performance, and when does it become an operational constraint?",
    readMins: 7,
    cover: {
      src: hil("cover"),
      alt: "A desk covered in rubber-stamped routine approval requests, with one unreviewed priority request for a supplier substitution with quality impact buried among them.",
      width: 2400,
      height: 1350,
    },
    body: [
      { type: "p", text: "As AI agents move beyond recommendations to executing supply chain decisions, the role of human oversight is changing." },
      { type: "p", text: "According to [Capgemini Research Institute's November 2026 report](https://www.capgemini.com/gb-en/insights/research-library/reinventing-supply-chains/), only 25% of organisations expect fully automated supply chains within three to five years, down from 37% in 2025. Meanwhile, 84% believe humans must retain the authority to validate AI-generated decisions." },
      { type: "p", text: "But retaining human authority does not necessarily mean approving every decision." },
      { type: "p", text: "This raises a fundamental question about human-in-the-loop AI in supply chains: which decisions should agents execute independently, which require human approval and which should remain human-led?" },

      { type: "h2", text: "Why approving every AI decision is not scalable" },
      { type: "p", text: "Agentic AI can accelerate supply chain decisions. However, if every action requires human approval, faster analysis may not translate into faster execution." },
      { type: "p", text: "According to G2's 2026 AI Agents Insight Report, 45% of surveyed buyers report that supervision and rework consume more than a quarter of their anticipated productivity benefits." },
      { type: "h3", text: "Human approval can delay time-critical decisions" },
      { type: "p", text: "An agent may identify an alternative freight booking to prevent a production delay. However, while the decision awaits approval, the available freight capacity may be taken." },
      { type: "p", text: "In such cases, the approval process itself becomes an operational risk." },
      { type: "h3", text: "Excessive approvals can weaken human oversight" },
      { type: "p", text: "Reviewing every routine transaction increases the employee workload and leaves less attention for critical exceptions." },
      { type: "p", text: "A routine purchase order update and a supplier substitution affecting product quality should not receive the same level of scrutiny." },
      { type: "p", text: "Effective human oversight means focusing human judgement on decisions where it adds the most value." },
      { type: "p", text: "**The challenge is to preserve human control without slowing down execution unnecessarily.**" },

      { type: "h2", text: "What happens when agents have too much autonomy?" },
      { type: "p", text: "[Unrestricted agent autonomy](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) can turn an isolated decision error into a wider operational disruption. The risk lies not only in incorrect decisions, but also in executing decisions without sufficient business context or authority." },
      {
        type: "table",
        head: ["Risk", "Supply chain scenario", "Business consequence"],
        rows: [
          ["Conflicting objectives", "An agent selects a cheaper freight option without considering production deadlines.", "Freight savings are outweighed by production downtime."],
          ["Unauthorised execution", "An agent places an order with an unqualified supplier to resolve a material shortage.", "Quality and regulatory risks."],
          ["Cascading errors", "An incorrect demand assessment triggers changes to purchase orders, freight bookings and replenishment plans.", "Excess inventory, unnecessary expenditure and operational disruption."],
          ["Cumulative financial exposure", "Multiple transactions remain within individual spending limits but collectively exceed the available budget.", "Unplanned expenditure despite transaction-level compliance."],
        ],
      },
      { type: "p", text: "Illustrative scenarios of risks associated with insufficiently governed agent autonomy." },
      { type: "p", text: "These risks highlight an important distinction: an agent's ability to execute a decision does not establish its authority to do so." },
      { type: "p", text: "**While excessive approvals can delay the right decision, unrestricted autonomy can accelerate the wrong one.**" },

      { type: "h2", text: "Which supply chain decisions require human approval?" },
      { type: "p", text: "Not every supply chain decision warrants the same level of human involvement. Updating a shipment status and approving a new supplier carry different financial, operational and regulatory consequences." },
      { type: "p", text: "Drawing on the risk-based governance principles of the [NIST AI Risk Management Framework](https://nvlpubs.nist.gov/nistpubs/AI/NIST.AI.100-1.pdf), organisations can allocate decision-making authority between humans and agents based on the potential consequences of each action." },
      { type: "h3", text: "A risk-based decision-rights framework" },
      {
        type: "table",
        head: ["Supply chain function", "Autonomous execution", "Human approval required", "Human-led decisions"],
        rows: [
          ["Procurement", "Routine PO updates", "Significant quantity or price changes", "New supplier approval"],
          ["Logistics", "Freight booking within approved limits", "Exceptional freight expenditure", "Strategic logistics partner selection"],
          ["Inventory", "Routine replenishment", "Stock reallocation affecting priority customers", "Major inventory investments"],
          ["Production", "Routine scheduling adjustments", "Changes affecting delivery commitments", "Production capacity expansion"],
          ["Quality management", "Detection and reporting of quality deviations", "Corrective actions requiring approval", "Release of regulated, quality-held products"],
        ],
      },
      { type: "p", text: "Illustrative application of risk-based AI governance principles to supply chain operations." },
      { type: "h3", text: "Why agent autonomy should be context-dependent" },
      { type: "p", text: "Assigning a fixed level of autonomy to a task assumes that its associated risks remain constant. In supply chains, they rarely do." },
      { type: "p", text: "Consider freight booking:" },
      {
        type: "list",
        items: [
          "**Routine booking:** An approved carrier and contracted rate allow autonomous execution within authorised limits.",
          "**Financial exception:** Costs exceeding authorised limits require human approval.",
          "**Compliance exception:** An unqualified carrier for a regulated shipment requires the action to be blocked and escalated.",
        ],
      },
      { type: "p", text: "The task remains the same, but the associated risk changes." },
      { type: "p", text: "Financial exposure, operational impact, regulatory requirements, reversibility, data reliability and time sensitivity should therefore inform the level of autonomy granted." },
      { type: "p", text: "**Human oversight should reflect the circumstances in which an agent acts, not merely the task it performs.**" },
      { type: "viz", name: "autonomy-context" },

      { type: "h2", text: "How to define the boundaries of agent autonomy" },
      { type: "p", text: "Once decision rights are established, organisations must translate them into enforceable operational controls." },
      { type: "p", text: "Five mechanisms can help supply chain leaders define these boundaries:" },
      {
        type: "list",
        items: [
          "**Financial thresholds:** Set spending and transaction limits beyond which human approval is required.",
          "**Risk-based guardrails:** Define permissible actions based on operational, quality and regulatory requirements.",
          "**System permissions:** Restrict which systems, records and transactions agents can access or modify.",
          "**Escalation rules:** Specify when agents must stop, seek approval and involve the appropriate decision-maker.",
          "**Audit trails:** Maintain a traceable record of recommendations, approvals, decisions and executed actions.",
        ],
      },
      { type: "p", text: "These controls should evolve as business conditions, operational risks and agent performance change." },
      { type: "p", text: "The objective is to enable autonomous execution without compromising human authority or organisational accountability." },
      { type: "figure", src: hil("autonomy-boundaries"), alt: "An agent action passing through financial thresholds, risk-based guardrails, system permissions and escalation rules, with one action routed to a human approver and every step recorded in an audit trail.", width: 2400, height: 1350 },

      { type: "h2", text: "How Agentra balances autonomy with human control" },
      { type: "p", text: "Agentra enables organisations to define the level of autonomy granted to agents based on business requirements, decision rights and risk tolerance." },
      { type: "p", text: "Its three operating modes support different levels of human involvement:" },
      {
        type: "table",
        head: ["Operating mode", "Agent's role", "Human's role"],
        rows: [
          ["Suggest", "Analyses situations and recommends actions.", "Evaluates recommendations, decides and initiates action."],
          ["Co-pilot", "Recommends actions and executes them after approval.", "Reviews and authorises execution."],
          ["Autopilot", "Makes and executes decisions within predefined guardrails.", "Defines boundaries, monitors performance and intervenes when required."],
        ],
      },
      { type: "p", text: "Across these modes, configurable guardrails, approval workflows, escalation rules and audit trails support human oversight and operational accountability." },
      { type: "p", text: "The objective is not maximum autonomy, but the right level of autonomy for each decision." },
      { type: "p", text: "**Agents that act. People in command.**" },

      { type: "h2", text: "How to measure effective human-agent collaboration" },
      { type: "p", text: "Effective human-agent collaboration should deliver both operational efficiency and responsible execution. Supply chain leaders can assess this balance through four key metrics." },
      {
        type: "table",
        head: ["Metric", "What it measures"],
        rows: [
          ["Approval time", "Time between an agent requesting approval and receiving a human decision."],
          ["Manual intervention rate", "Percentage of agent-handled activities requiring human intervention."],
          ["Policy compliance rate", "Percentage of executed actions that comply with defined business rules, permissions and guardrails."],
          ["Decision-to-action time", "Time between an authorised decision and its execution."],
        ],
      },
      { type: "p", text: "These metrics should be evaluated together. A lower manual intervention rate is not necessarily an improvement if policy violations increase. Similarly, high policy compliance should not come at the expense of avoidable operational delays." },

      { type: "h2", text: "Conclusion" },
      { type: "p", text: "Effective human oversight is not about approving every decision or granting agents unrestricted autonomy. It is about ensuring that the right decisions receive the right level of human involvement." },
      { type: "p", text: "For supply chain leaders, the objective is clear: faster execution, governed autonomy and human accountability." },
      { type: "p", text: "**Agents that act. People in command.**" },
    ],
  },
  {
    slug: "seasonal-demand-freight-planning-diagnostics",
    solutions: ["planning", "execution"],
    title: "When Seasonal Demand Drops: Re-planning Freight in a Season, Not a Year",
    seoTitle: "Seasonal Demand Freight Planning in Diagnostics Supply Chains",
    description:
      "Learn how seasonal demand freight planning helps diagnostics supply chain teams adjust capacity, reduce excess freight costs and respond to demand shifts.",
    dek: "Learn how seasonal demand freight planning helps diagnostics supply chain teams adjust capacity, reduce excess freight costs and respond to demand shifts.",
    readMins: 6,
    cover: {
      src: season("cover"),
      alt: "Refrigerated trailer at a loading dock, only partly filled with cold-chain shippers, showing unused freight capacity after demand fell.",
      width: 2400,
      height: 1350,
    },
    body: [
      { type: "p", text: "The winter respiratory season is slowing down. The freight commitments aren't." },
      { type: "p", text: "Diagnostics manufacturers often reserve trucks, container capacity and air freight months in advance, anticipating seasonal demand for respiratory tests. But when orders fall below forecasts, committed freight capacity may exceed actual requirements." },
      { type: "p", text: "This creates a difficult decision: should manufacturers retain capacity in case demand recovers or release it before cancellation deadlines to avoid unnecessary costs?" },
      { type: "p", text: "For the diagnostics supply chain, **seasonal demand freight planning** is therefore more than a forecasting exercise. It is about balancing freight costs with the ability to respond if demand returns." },
      { type: "p", text: "The question is not simply how quickly freight plans can change, but whether manufacturers can act before the opportunity to change them closes." },

      { type: "h2", text: "Why seasonal demand freight planning is challenging" },
      { type: "p", text: "Seasonal demand rarely follows forecasts exactly. When actual orders fall below expectations, manufacturers may need less transportation capacity than originally planned. However, adjusting freight arrangements is not always straightforward." },
      { type: "p", text: "Three challenges make **seasonal demand freight planning** difficult:" },
      {
        type: "list",
        items: [
          "**Excess transportation capacity:** Trucks, containers or air freight space arranged against higher volumes may remain underutilised.",
          "**Shipment schedule adjustments:** Lower volumes may require manufacturers to consolidate loads, postpone dispatches or revise delivery schedules, while still meeting customer commitments.",
          "**Existing freight commitments:** Carrier contracts, cancellation deadlines and minimum-volume agreements can limit flexibility. Changing bookings may also introduce additional costs.",
        ],
      },
      { type: "p", text: "The difficulty is not simply identifying lower demand. It is determining how much committed capacity to retain, how much to release and when that decision must be made." },
      { type: "p", text: "Releasing capacity too early may leave manufacturers exposed if respiratory demand recovers." },
      { type: "p", text: "Holding it for too long may result in unnecessary freight costs. Cancellation deadlines make this a time-sensitive commercial decision rather than a routine planning adjustment." },

      { type: "h2", text: "What falling demand means for the diagnostics supply chain" },
      { type: "p", text: "A decline in respiratory test demand does not necessarily mean that all freight requirements fall at the same rate. Manufacturers must assess which shipments can be adjusted without disrupting other product flows." },
      {
        type: "list",
        items: [
          "**Respiratory test kits and consumables:** Lower orders may reduce shipment volumes, creating opportunities to consolidate loads or release surplus capacity.",
          "**Reagents:** Shelf-life and temperature-control requirements may limit opportunities to postpone shipments.",
          "**Diagnostic instruments:** Scheduled deliveries, specialised transport and installation commitments may still require dedicated freight capacity.",
        ],
      },
      { type: "p", text: "Understanding these differences helps manufacturers determine which freight commitments can be released and which need to be retained." },

      { type: "h2", text: "Why traditional freight replanning struggles to keep pace" },
      { type: "p", text: "A change in demand does not automatically update freight plans. Forecasts, inventory, production schedules and freight bookings often sit in separate systems." },
      { type: "p", text: "This creates three challenges:" },
      {
        type: "list",
        items: [
          "**Disconnected data:** Updated demand forecasts may not be linked to committed freight capacity.",
          "**Manual coordination:** Teams must check bookings, contractual obligations, cancellation deadlines and revised shipment requirements.",
          "**Delayed decisions:** Cancellation windows may close before teams determine whether capacity should be retained or released.",
        ],
      },
      { type: "p", text: "For the **diagnostics supply chain**, these delays can increase costs and limit flexibility." },
      { type: "p", text: "The challenge is not a lack of information, but the time it takes to turn that information into action." },
      { type: "figure", src: season("replanning-timeline"), alt: "Timeline showing manual freight replanning missing two carrier cancellation deadlines after a drop in demand, while agent-assisted replanning catches all of them.", width: 2400, height: 1350 },

      { type: "h2", text: "How agentic AI supports timely hold-or-release decisions" },
      { type: "p", text: "Agentic AI connects changing demand with committed freight capacity, helping manufacturers evaluate their options before cancellation deadlines." },
      { type: "p", text: "The process involves five steps:" },
      {
        type: "list",
        items: [
          "**Detect demand changes:** Demand sensing agents monitor orders, sales trends and forecasts to identify changes in respiratory test demand.",
          "**Identify affected commitments:** Agents compare revised freight requirements with existing bookings, minimum-volume agreements and cancellation deadlines.",
          "**Evaluate alternatives:** Agents assess the cost of holding surplus capacity against the savings and service risks of releasing it. They also evaluate consolidation and reassignment opportunities.",
          "**Recommend a response:** An orchestrator brings the findings together and recommends how much capacity to retain or release, considering financial and operational implications.",
          "**Execute approved changes:** Authorised agents can update bookings through connected systems, subject to contractual conditions, permissions and required approvals.",
        ],
      },
      { type: "p", text: "The value lies in helping manufacturers make informed freight decisions before cancellation windows close." },
      { type: "figure", src: season("freight-planning-board"), alt: "Freight planning board with agent-recommended bookings sorted into keep, consolidate, re-mode, postpone and cancel, approved by the logistics lead.", width: 2400, height: 1350 },

      { type: "h2", text: "Measuring the value of demand-responsive freight planning" },
      { type: "p", text: "Faster freight replanning is useful only if it improves cost, capacity utilisation and decision-making. Manufacturers can track four metrics to measure its impact:" },
      {
        type: "list",
        items: [
          "**Time to replan:** Time taken to revise freight requirements after a demand change.",
          "**Avoidable freight costs:** Savings from reducing unused capacity, unnecessary bookings and preventable charges.",
          "**Capacity utilisation:** Percentage of available freight capacity actually used.",
          "**Decision-to-action time:** Time between selecting a freight adjustment and implementing it.",
        ],
      },
      { type: "p", text: "Comparing these metrics before and after introducing agent-assisted replanning helps manufacturers assess whether faster decisions translate into measurable operational and financial benefits." },

      { type: "h2", text: "How Agentra supports more responsive freight decisions" },
      { type: "p", text: "When demand changes, knowing which freight bookings to adjust is only half the challenge. Teams also need to understand the cost, risks and consequences of each option." },
      { type: "p", text: "Agentra helps connect these decisions with action." },
      {
        type: "list",
        items: [
          "**Connect existing systems:** With 1,100+ connectors, Agentra brings together relevant data from ERP, planning and logistics systems without replacing them.",
          "**Build shared context:** Its AI ontology links demand, inventory, orders and shipments to help identify affected freight commitments.",
          "**Evaluate alternatives:** Specialised AI agents can assess options such as consolidation, postponement or cancellation, considering cost and delivery impact.",
          "**Coordinate decisions:** An orchestrator brings agent findings together into an explained recommendation.",
          "**Act with control:** Governed workflows support approvals, authorised updates and audit trails, keeping people in command.",
        ],
      },
      { type: "p", text: "The value is not another forecast or alert. It is helping manufacturers turn changing demand into informed freight decisions while there is still time to act." },

      { type: "h2", text: "When demand changes, freight commitments must follow" },
      { type: "p", text: "A slower respiratory season should not automatically translate into higher costs from unused freight capacity. The key is knowing what to retain, what to release and acting before cancellation deadlines." },
      { type: "p", text: "Agentra connects changing demand with freight decisions and governed execution, helping manufacturers balance cost efficiency with service continuity." },
      { type: "p", text: "**The forecast may change. Your ability to act shouldn't.**" },
    ],
  },
  {
    slug: "medtech-supply-chain-exceptions",
    solutions: ["resilience", "orchestration"],
    title: "Why Medtech Exceptions Take Days, and How Agents Take Them to Minutes",
    seoTitle: "Why Medtech Supply Chain Decisions Take Days—and How AI Agents Help",
    description:
      "Learn how AI agents reduce decision latency, accelerate medtech supply chain exception response and enable faster action without compromising compliance.",
    dek: "Learn how AI agents reduce decision latency, accelerate medtech supply chain exception response and enable faster action without compromising compliance.",
    readMins: 6,
    cover: {
      src: medtech("cover"),
      alt: "An hourglass filled with sterile-packed medical components running low, with a plaque reading Line 3 sterile component stock.",
      width: 2400,
      height: 1350,
    },
    body: [
      { type: "p", text: "A delayed component can affect more than a delivery date." },
      { type: "p", text: "For a medtech manufacturer, it may disrupt production schedules, increase freight costs or delay the availability of critical medical devices. The longer medtech supply chain exceptions remain unresolved, the fewer options teams may have to limit their impact." },
      { type: "p", text: "Yet the response often depends on information scattered across procurement, logistics, planning and quality teams. This can increase decision latency: the time it takes to assess an exception, evaluate alternatives and reach an authorised decision." },
      { type: "p", text: "The challenge is reducing this latency before operational disruptions escalate." },

      { type: "h2", text: "Where Decision Latency Builds up in Medtech Supply Chains" },
      { type: "p", text: "Detecting an exception does not mean teams have enough information to act. They must establish what is affected, evaluate available options and determine who can authorise the response. Three bottlenecks often slow this process." },
      { type: "figure", src: medtech("decision-latency-chokepoints"), alt: "Pipe cutaway showing an alert passing through three choke points: fragmented information, hand-offs and quality checks, taking 73 hours to reach a decision.", width: 2400, height: 1350 },
      { type: "h3", text: "Fragmented operational information" },
      { type: "p", text: "Shipment status, inventory availability, supplier commitments and production schedules often sit in separate systems. A delayed component may be visible in one system, but its impact on production orders may not be." },
      { type: "p", text: "Teams must reconcile this information before assessing the urgency and deciding on corrective action." },
      { type: "h3", text: "Cross-functional hand-offs" },
      { type: "p", text: "Resolving an exception may involve logistics, procurement, planning and quality teams. Each brings part of the information needed for a decision." },
      { type: "p", text: "When updates move through emails, spreadsheets and manual ERP entries, teams spend time waiting for information, clarifying responsibilities and confirming the next step." },
      { type: "h3", text: "Quality and regulatory dependencies" },
      { type: "p", text: "Medtech decisions may require verification of approved suppliers, component specifications, material traceability and quality documentation." },
      { type: "p", text: "These safeguards cannot be bypassed. However, scattered records, unclear approval ownership and manual documentation can extend the time needed to reach an authorised decision." },
      { type: "p", text: "**The challenge is not simply seeing an exception sooner. It is bringing the right information, decisions and approvals together before the delay affects operations.**" },

      { type: "h2", text: "The Hidden Cost of Delayed Decisions" },
      { type: "p", text: "A delayed component does not necessarily stop production. A delayed decision, however, can make the disruption harder and more expensive to manage." },
      { type: "p", text: "Consider a medtech manufacturer awaiting a critical component for diagnostic equipment. Existing inventory may keep production running temporarily. But as teams assess alternatives, the window to secure additional supplies or adjust production schedules continues to narrow." },
      { type: "p", text: "The consequences can extend across operations:" },
      {
        type: "list",
        items: [
          "**Production disruption:** Delayed decisions may force last-minute schedule changes or production stoppages.",
          "**Higher costs:** Emergency sourcing, premium freight and expedited orders can increase operating expenses.",
          "**Delivery risks:** Production delays can affect customer commitments and the availability of finished medical devices.",
        ],
      },
      { type: "p", text: "Unlike many manufacturing environments, medtech alternatives may also require supplier qualification, material verification and quality approval. These requirements make timely assessment and early escalation essential." },
      { type: "p", text: "**The longer a decision takes, the fewer options may remain to protect production, control costs and meet delivery commitments.**" },

      { type: "h2", text: "How AI Agents Shorten Exception Response from Days to Minutes" },
      { type: "p", text: "What if the information needed to resolve an exception could be assembled, assessed and acted upon without repeated manual hand-offs?" },
      { type: "p", text: "AI agents can connect data, decisions and workflows across systems, reducing the time between identifying a problem and initiating corrective action." },
      { type: "p", text: "Consider the delayed component used in diagnostic equipment." },
      {
        type: "list",
        items: [
          "**Detect:** Identify the supplier delay through connected systems or incoming shipment updates.",
          "**Assess:** Link the delayed component to available inventory, affected production orders and delivery commitments.",
          "**Evaluate:** Compare approved alternatives against cost, lead-time and quality requirements.",
          "**Escalate:** Present recommended actions and route decisions requiring human approval.",
          "**Execute:** Initiate authorised actions, update connected systems and maintain an audit trail.",
        ],
      },
      { type: "p", text: "Instead of spending hours gathering information and passing updates between teams, planners can focus on decisions that require their judgement." },
      { type: "figure", src: medtech("manual-vs-orchestrated"), alt: "Manual coordination shown as a cork board of tangled red string between four teams, next to agent-assisted orchestration as one flow with a single human approval.", width: 2400, height: 1350 },

      { type: "h2", text: "Faster Action, with Quality and Compliance Built in" },
      { type: "p", text: "In medtech, faster decisions cannot come at the expense of product quality, patient safety or regulatory compliance. Supplier changes, material substitutions and production adjustments may require verification and approval before action can be taken." },
      { type: "p", text: "Agent-assisted orchestration must therefore operate within clearly defined controls:" },
      {
        type: "list",
        items: [
          "**Approved suppliers and materials:** Agents evaluate alternatives against supplier qualifications, approved components and material specifications.",
          "**Human oversight:** Quality-sensitive decisions are routed to authorised personnel for review and approval.",
          "**Permissions and escalation:** Defined rules determine which actions agents can execute, which require approval and when exceptions must be escalated.",
          "**Traceability:** Recommendations, approvals and actions are recorded to support accountability and audit requirements.",
        ],
      },
      { type: "p", text: "Agentra enables this governed orchestration through three operating modes:" },
      {
        type: "list",
        items: [
          "**Suggest:** Agents recommend actions for human review.",
          "**Co-pilot:** Agents assist with workflows while keeping people involved in key decisions.",
          "**Autopilot:** Agents execute authorised actions within predefined guardrails.",
        ],
      },
      { type: "p", text: "Together, these modes, approval workflows and audit trails help organisations introduce automation while maintaining control over critical decisions." },
      { type: "p", text: "**The goal is not to bypass quality and compliance requirements, but to orchestrate the work around them so that decisions and corrective actions can move faster.**" },

      { type: "h2", text: "Measure the Time from Exception Detection to Action" },
      { type: "p", text: "A faster response is only meaningful if organisations can identify where time has been saved. Measuring total exception-response time alone may hide delays in investigation, decision-making and execution." },
      { type: "p", text: "For medtech manufacturers, four metrics can provide a clearer picture:" },
      {
        type: "list",
        items: [
          "**Time to assess impact:** Measure the time between detecting an exception and identifying affected inventory, production orders and delivery commitments.",
          "**Decision latency:** Track how long it takes to evaluate the available options, obtain required approvals and reach an authorised decision.",
          "**Time to action:** Measure the interval between approval and the initiation of corrective action.",
          "**Manual hand-offs:** Track the percentage of exceptions handled without unnecessary transfers between teams.",
        ],
      },
      { type: "p", text: "Comparing these metrics before and after introducing agent-assisted orchestration helps identify where automation reduces delays and where further process improvements are needed." },
      { type: "p", text: "**The goal is not simply faster exception detection, but measurable reductions in the time it takes to assess, decide and act.**" },

      { type: "h2", text: "Conclusion: Make Exception Response as Fast as Exception Detection" },
      { type: "p", text: "Not every medtech supply chain exception can be prevented. But the delays between identifying a problem, deciding on a response and taking action can be reduced." },
      { type: "p", text: "Agentra connects existing systems and orchestrates exception-response workflows, helping teams assess impacts, evaluate alternatives and initiate authorised actions. Defined guardrails, approval workflows and audit trails keep critical decisions under human oversight." },
      { type: "p", text: "**Detecting an exception early creates an opportunity. Reducing decision latency helps organisations act on it before that opportunity is lost.**" },
      { type: "cta", text: "**[Book a 30-minute walkthrough](/contact)** to explore how Agentra can help your team respond to supply chain exceptions faster." },
    ],
  },
  {
    slug: "instrument-launch-logistics",
    solutions: ["orchestration", "execution"],
    title: "Instrument Launches Are a Logistics Problem",
    seoTitle: "Product Launch Logistics: Agentic AI for Instrument Launches",
    description:
      "Explore how agentic AI simplifies product launch logistics by coordinating instrument deliveries, cartridge availability and installation schedules.",
    dek: "Explore how agentic AI simplifies product launch logistics by coordinating instrument deliveries, cartridge availability and installation schedules.",
    readMins: 7,
    cover: {
      src: launch("cover"),
      alt: "Crated diagnostic instrument delivered on time to a lab, with a field service ticket for Tuesday's installation and a note that cartridges will not arrive until Thursday.",
      width: 2400,
      height: 1350,
    },
    body: [
      { type: "p", text: "The diagnostic instrument arrives on time. The cartridges are still in transit. The installation engineer is booked for the wrong day. Each activity may have been planned independently, but a successful instrument launch depends on how well they are coordinated." },
      { type: "p", text: "Unlike routine consumables distribution, diagnostic **instrument launches** introduce specialised freight requirements, new order patterns and dependencies between product deliveries and installation schedules." },
      { type: "p", text: "Managing these activities across disconnected systems and logistics partners makes coordination more complex." },
      { type: "p", text: "The challenge is not simply moving instruments from one location to another. It is ensuring that orders, shipments and installation schedules remain aligned, even when operational conditions change." },

      { type: "h2", text: "Why instrument launches are harder than routine logistics operations" },
      { type: "p", text: "Routine consumables distribution follows relatively established order patterns, freight arrangements and delivery schedules. **Product launch logistics** introduces additional requirements alongside these existing operations." },
      { type: "p", text: "For diagnostics manufacturers, instrument logistics presents four key challenges." },
      { type: "h3", text: "Heavy-goods transportation" },
      { type: "p", text: "Larger diagnostic instruments may require specialised vehicles, loading equipment and carriers. Existing freight arrangements may not accommodate their size, weight or delivery requirements." },
      { type: "h3", text: "Specialised handling requirements" },
      { type: "p", text: "Diagnostic instruments are often sensitive, high-value equipment. They may require protective packaging, careful handling and specific transportation conditions to minimise the risk of damage in transit." },
      { type: "h3", text: "Coordination with installation schedules" },
      { type: "p", text: "Instrument deliveries depend on engineer availability, site readiness and the availability of cartridges required for commissioning." },
      { type: "p", text: "[Kuehne+Nagel's](https://assets.kuehne-nagel.com/f/331466/x/be9035007f/industry-solutions-healthcare-medical-devices-and-med-tech-whitepaper.pdf) whitepaper, Resilient by Design: Logistics for Medical Capital Equipment, highlights the importance of coordination between logistics teams, clinical engineers and IT specialists during equipment installation and commissioning." },
      { type: "p", text: "Misalignment between deliveries and installation schedules can increase operational costs, require additional service visits and delay customer readiness." },
      { type: "h3", text: "New and less predictable order patterns" },
      { type: "p", text: "Unlike recurring consumables orders, new instrument launches have limited historical demand data. Uncertainty around order volumes, delivery locations and shipment frequencies makes freight capacity planning and resource allocation more challenging." },
      { type: "p", text: "The complexity of product launch logistics, therefore, extends beyond individual shipments. It lies in coordinating interdependent activities while maintaining continuity in existing distribution operations." },

      { type: "h2", text: "When individual shipments succeed but the launch falls behind" },
      { type: "p", text: "The complexity of instrument launch logistics increases when interdependent activities are managed across separate systems, teams and logistics partners. Even when individual shipments meet their delivery commitments, the overall launch can fall behind." },
      { type: "h3", text: "Fragmented information across systems and logistics partners" },
      { type: "p", text: "Customer orders may reside in the ERP, inventory and dispatch information with third-party logistics providers (3PLs), shipment updates with carriers and installation schedules in field service systems. Without connected information, teams may struggle to identify how a change in one activity affects another." },
      { type: "h3", text: "Disconnected decisions across teams" },
      { type: "p", text: "Logistics, order management and field service teams operate with different responsibilities and priorities. A revised shipment arrival date may not be reflected in the installation schedule. Identifying these conflicts and coordinating a response can require multiple manual checks and hand-offs." },
      { type: "h3", text: "Consequences of misaligned deliveries and installation schedules" },
      { type: "p", text: "An instrument may arrive on time, but delayed cartridges or unavailable engineers can postpone commissioning. Such misalignment can lead to additional storage costs, premium freight expenditure, repeated service visits and delayed customer readiness." },
      { type: "figure", src: launch("launch-timeline"), alt: "Timeline of one instrument launch: the instrument is delivered Monday, cartridges slip to Thursday and the Tuesday engineer visit is wasted, delaying customer readiness by three days.", width: 2400, height: 1350 },
      { type: "p", text: "The challenge, therefore, is not simply tracking individual shipments. It is understanding their dependencies and coordinating decisions across systems and teams as operational conditions change." },

      { type: "h2", text: "How orchestration agents connect instrument launch logistics" },
      { type: "p", text: "A change in one shipment can affect several activities during an instrument launch. Orchestration agents help manage these dependencies by connecting operational information, assessing the impact of changes and coordinating responses across existing systems." },
      { type: "h3", text: "Connect orders, shipments and installation schedules" },
      { type: "p", text: "Agentra connects ERP systems, 3PLs, carriers and field service systems through supported integrations. Its business ontology links customer orders, instruments, cartridges, shipments and installation appointments." },
      { type: "p", text: "This shared operational context allows agents to understand which deliveries and appointments are associated with each customer order." },
      { type: "figure", src: launch("launch-ontology"), alt: "Business ontology for an instrument launch: one customer order linked to instrument, cartridge, shipment, installation, engineer and site records across systems, with a cartridge and installation date conflict flagged.", width: 2400, height: 1350 },
      { type: "h3", text: "Detect conflicts before they disrupt the launch" },
      { type: "p", text: "Agents monitor inventory availability, shipment updates and installation schedules. When a shipment's expected arrival date changes, they assess the impact on dependent activities." },
      { type: "p", text: "For instance, if cartridges are expected to arrive after the scheduled installation, agents identify the affected customer order and flag the scheduling conflict before an unnecessary service visit occurs." },
      { type: "h3", text: "Evaluate coordinated alternatives" },
      { type: "p", text: "Agents investigate available options to resolve the conflict. They can check cartridge availability at alternative warehouses, assess expedited freight options or evaluate revised installation dates." },
      { type: "p", text: "Each option is assessed against freight costs, inventory availability, customer commitments and operational constraints. This helps teams select a response that protects the overall launch schedule rather than optimising an individual shipment at the expense of other activities." },
      { type: "h3", text: "Execute authorised changes across existing systems" },
      { type: "p", text: "Once a decision is authorised, agents can initiate the corresponding actions through connected systems. These may include reallocating inventory, revising freight bookings, updating delivery schedules and notifying field service teams." },
      { type: "p", text: "Agents continue monitoring operational updates to identify further conflicts. All actions remain subject to defined permissions, business rules and approval requirements." },
      { type: "p", text: "Through agentic orchestration, product launch logistics becomes a more coordinated process, where changes in one activity inform decisions across related operations." },

      { type: "h2", text: "Where people stay in control" },
      { type: "p", text: "Not every decision in instrument launch logistics requires the same level of human involvement. Routine adjustments may be suitable for automation, while decisions involving additional expenditure, customer commitments or quality-sensitive requirements may require human approval." },
      { type: "p", text: "Agentra supports three operating modes to accommodate different levels of autonomy:" },
      {
        type: "list",
        items: [
          "**Suggest:** Agents evaluate alternatives and recommend actions for teams to review and implement.",
          "**Co-pilot:** Agents prepare operational changes and execute them following human approval.",
          "**Autopilot:** Agents execute eligible actions within predefined business rules and permissions, escalating exceptions when required.",
        ],
      },
      { type: "p", text: "For example, an agent may recommend expedited freight to protect an installation schedule. If the additional cost exceeds an authorised spending limit, the decision is routed to the appropriate person for approval." },
      { type: "p", text: "Defined guardrails, role-based permissions and escalation rules establish which decisions agents can make and where human intervention is required. Audit trails maintain a traceable record of recommendations, approvals and executed actions." },
      { type: "p", text: "This allows manufacturers to accelerate logistics decisions while retaining operational control and accountability." },

      { type: "h2", text: "Conclusion" },
      { type: "p", text: "Delivering an instrument on time is only one part of a successful launch. Cartridge availability, shipment schedules and installation appointments also need to remain aligned." },
      { type: "p", text: "Agentra helps manufacturers coordinate these activities across existing systems, respond to disruptions and execute authorised decisions while keeping people in control." },
      { type: "p", text: "**Agents that act. People in command.**" },
      { type: "cta", text: "**[Book a 30-minute architecture review](/contact)** to explore how Agentra can support your instrument launch logistics." },
    ],
  },
  {
    slug: "continuous-sop-consumer-electronics",
    title: "Continuous S&OP for Consumer Electronics: Why It Matters",
    description:
      "Discover how continuous S&OP and agentic AI help consumer electronics brands respond to demand shifts, align supply plans and make timely decisions.",
    dek: "Discover how continuous S&OP and agentic AI help consumer electronics brands respond to demand shifts, align supply plans and make timely decisions.",
    readMins: 5,
    cover: {
      src: sop("cover"),
      alt: "Agentic AI in S&OP: smartwatch demand rising and headphone demand falling run through demand and supply agents to one coordinated planner approval, then execution.",
      width: 2400,
      height: 1350,
    },
    body: [
      { type: "p", text: "A consumer electronics brand enters the month with plans to increase headphone production. A week later, a smartwatch gains unexpected popularity on social media, while headphone sales fall below expectations." },
      { type: "p", text: "But component orders have already been placed, supplier capacity committed and production schedules finalised. Revising the demand forecast is one thing. Adjusting the supply commitments behind it is another." },
      { type: "p", text: "According to Capgemini Research Institute’s November 2026 research, **[77% of consumer goods organisations identify forecasting uncertainty driven by changing consumer behaviour as a major supply chain challenge.](https://www.capgemini.com/wp-content/uploads/2026/11/Resilient-by-design-supply-chain-agentic-ai-report.pdf)**" },
      { type: "p", text: "For fast-growing consumer electronics brands, the challenge is not simply creating a reliable monthly S&OP plan. It is keeping demand and supply aligned as market conditions change between planning cycles. This is where **continuous S&OP** becomes critical." },

      { type: "h2", text: "Why monthly S&OP struggles to keep pace with consumer electronics" },
      { type: "p", text: "Expanding product portfolios, shorter product lifecycles and long sourcing lead times make the **consumer electronics supply chain** increasingly complex. These challenges make it difficult for monthly S&OP plans to remain aligned with changing market demand." },
      { type: "h3", text: "Expanding product portfolios" },
      { type: "p", text: "As product portfolios expand, so does planning complexity. Each SKU introduces different demand patterns, component requirements and supply constraints." },
      { type: "h3", text: "Shorter product lifecycles" },
      { type: "p", text: "Frequent product launches and shifting consumer preferences shorten the window for selling products. Delayed planning decisions can lead to excess inventory, obsolescence and missed sales opportunities." },
      { type: "h3", text: "Long China-to-India sourcing lead times" },
      { type: "p", text: "By the time demand changes, components may already be ordered, in production or in transit. These existing supply commitments limit the flexibility to adjust procurement and production plans." },
      { type: "p", text: "Together, these challenges reinforce the need for **continuous S&OP**, where demand and supply plans are reassessed as market conditions change." },
      { type: "h3", text: "When demand changes, what happens to the existing S&OP plan?" },
      { type: "p", text: "Rising smartwatch demand and falling headphone sales create two opposing challenges: meeting unexpected demand and managing excess supply." },
      { type: "p", text: "The impact extends well beyond demand planning." },
      {
        type: "table",
        head: ["Planning function", "Rising smartwatch demand", "Falling headphone demand"],
        rows: [
          ["Inventory", "Risk of stockouts", "Excess inventory"],
          ["Procurement", "Additional component requirements", "Open POs requiring reassessment"],
          ["Production", "Increased output requirements", "Reduced or rescheduled production"],
          ["Logistics", "Potential need for expedited shipments", "Potentially unused freight capacity"],
          ["Finance", "Additional costs and revenue opportunities", "Working capital tied up in inventory"],
        ],
      },
      { type: "p", text: "Revising the forecast alone does not resolve these challenges. Each adjustment requires coordinated decisions across planning functions." },
      { type: "p", text: "McKinsey’s 2024 Global Supply Chain Leader Survey found that companies take an [average of two weeks to plan and execute a response to a supply chain disruption.](https://www.mckinsey.com/capabilities/operations/our-insights/supply-chain-risk-survey-2024)" },
      { type: "p", text: "**Demand may change overnight, but supply commitments cannot.**" },

      { type: "h2", text: "What continuous S&OP means in practice" },
      { type: "p", text: "**Continuous S&OP** extends planning beyond the monthly cycle. It enables organisations to monitor changing demand and supply conditions, identify significant deviations and reassess existing commitments before they become costly." },
      { type: "p", text: "In practice, this involves:" },
      {
        type: "list",
        items: [
          "Monitoring demand and supply conditions continuously.",
          "Identifying deviations that require intervention.",
          "Assessing their impact on existing supply commitments.",
          "Coordinating decisions across functions between formal planning cycles.",
        ],
      },
      { type: "p", text: "Monthly S&OP reviews remain essential for strategic alignment, financial planning and governance." },
      { type: "p", text: "**Continuous S&OP is not about constantly changing the plan. It is about knowing when the plan needs to change and acting before the opportunity to respond is lost.**" },
      { type: "figure", src: sop("sop-loop"), alt: "Continuous S&OP feedback loop with five stages: monitor, identify, assess, coordinate, and act and learn, running between monthly S&OP reviews.", width: 2400, height: 1350 },

      { type: "h2", text: "How agentic AI enables continuous S&OP" },
      { type: "p", text: "**Agentic AI in S&OP** connects demand sensing with supply planning, helping organisations translate market changes into timely, feasible decisions between formal S&OP cycles." },
      { type: "h3", text: "Demand agents: From signals to insights" },
      { type: "p", text: "Demand agents monitor sell-out data and external market signals to identify forecast deviations and investigate their underlying drivers." },
      { type: "p", text: "For example, when smartwatch sales exceed expectations, a demand agent analyses sales trends, promotional activity and available market signals to assess whether the increase is likely to be temporary or sustained. It then recommends an appropriate forecast adjustment." },
      { type: "h3", text: "Supply agents: From demand to feasibility" },
      { type: "p", text: "A revised demand forecast does not guarantee that supply can meet it. Supply agents assess inventory levels, open purchase orders, supplier capacity, lead times and manufacturing constraints." },
      { type: "p", text: "They evaluate alternative procurement and production scenarios to determine how much additional smartwatch demand can be fulfilled, how quickly and at what cost." },
      { type: "h3", text: "Human planners: From recommendations to decisions" },
      { type: "p", text: "Planners review the proposed scenarios, evaluate trade-offs between cost, product availability and profitability, and approve the most appropriate response." },
      { type: "p", text: "Agents can then execute authorised changes within defined guardrails, with decisions and actions recorded in an audit trail." },
      { type: "p", text: "**The value of agentic AI in S&OP lies not just in detecting demand changes earlier, but in translating them into feasible supply decisions while keeping people in control.**" },

      { type: "h2", text: "How to measure the value of continuous S&OP" },
      { type: "p", text: "The value of **continuous S&OP** extends beyond forecast accuracy. Responsiveness, product availability and inventory performance are equally important when evaluating planning effectiveness." },
      { type: "p", text: "Organisations can use the following KPIs to assess the impact of continuous S&OP." },
      {
        type: "table",
        head: ["Metric", "What it measures"],
        rows: [
          ["Forecast accuracy", "How closely forecasts align with actual demand"],
          ["Forecast bias", "Consistent overestimation or underestimation of demand"],
          ["Time to replan", "Time between identifying a significant change and revising the affected plan"],
          ["Inventory obsolescence", "Inventory value lost due to ageing or declining demand"],
          ["Product availability", "Ability to fulfil customer demand from available stock"],
          ["Decision-to-action time", "Time between decision approval and implementation"],
        ],
      },
      { type: "p", text: "Comparing these metrics before and after introducing agentic AI can help organisations assess whether faster planning translates into better operational and financial outcomes." },

      { type: "h2", text: "Moving towards continuous S&OP: A phased approach" },
      { type: "p", text: "Moving towards continuous S&OP does not require an immediate overhaul of existing planning processes. Organisations can adopt agentic AI in three phases." },
      { type: "figure", src: sop("phased-roadmap"), alt: "Three-phase roadmap to continuous S&OP shown as towers built on existing systems: demand agents, then supply and production, then finance and cross-functional decisions.", width: 2400, height: 1350 },
      { type: "h3", text: "Phase 1: Start with demand" },
      { type: "p", text: "Introduce demand agents to monitor market signals, investigate forecast deviations and recommend adjustments." },
      { type: "h3", text: "Phase 2: Connect demand with supply and production" },
      { type: "p", text: "Extend agent capabilities to assess inventory, supplier capacity, component availability and production constraints against revised demand." },
      { type: "h3", text: "Phase 3: Enable continuous S&OP" },
      { type: "p", text: "Connect demand, supply, production and financial planning to support coordinated decisions between formal S&OP cycles." },
      { type: "p", text: "Agentra supports this phased approach by enabling agents to work across existing enterprise systems, with defined guardrails, human approvals and audit trails." },

      { type: "h2", text: "Conclusion: The market moves. Planning must keep up" },
      { type: "p", text: "When smartwatch demand rises and headphone sales decline, businesses cannot afford to wait until the next planning cycle to assess their response." },
      { type: "p", text: "**Continuous S&OP** is not about replacing monthly planning. It is about connecting **demand and supply planning** to enable timely, feasible and coordinated business decisions as market conditions change." },
      { type: "p", text: "**Agents that act. People in command.**" },
      { type: "cta", text: "**[Explore how Agentra can help you move towards continuous S&OP.](/contact)**" },
    ],
  },
  {
    slug: "freight-bill-auditing-india",
    title: "Freight Bill Auditing in India: Why Manufacturers Need to Check Every Invoice Before Payment",
    seoTitle: "Freight Bill Auditing in India",
    description:
      "Freight bill auditing helps manufacturers verify charges before payment, while agentic AI can support the investigation and resolution of exceptions.",
    dek: "Freight bill auditing helps manufacturers verify charges before payment, while agentic AI can support the investigation and resolution of exceptions.",
    readMins: 7,
    cover: {
      src: audit("cover"),
      alt: "A transporter freight invoice for ₹49,000 marked up in red pen, with the unloading charge disputed and detention flagged for checking against the gate pass.",
      width: 2400,
      height: 1350,
    },
    body: [
      { type: "p", text: "A shipment may arrive on time, but does that mean the freight invoice is accurate?" },
      { type: "p", text: "For manufacturers managing multiple transporters, verifying freight invoices involves more than checking the amount billed. Different freight agreements, additional charges, and shipment records should be examined to establish whether the charges are justified." },
      { type: "p", text: "Even when this information is available in digital systems, resolving discrepancies can require further investigation and coordination. Freight bill auditing helps manufacturers verify charges before payment, while agentic AI can support the investigation and resolution of exceptions." },

      { type: "h2", text: "Why freight bill auditing is complex in India" },
      { type: "p", text: "Freight charges depend on the applicable transporter agreement, shipment details, and services provided. For manufacturers managing inbound materials and outbound deliveries, three factors can make consistent verification more demanding." },
      { type: "h3", text: "A fragmented transporter market" },
      { type: "p", text: "Working with multiple transporters can involve different commercial agreements, billing practices and documentation requirements." },
      { type: "p", text: "A fixed vehicle rate agreed with one transporter may not apply to another. Even for similar shipments, the correct charge depends on the specific agreement and pricing conditions." },
      { type: "h3", text: "Different freight rates and additional charges" },
      { type: "p", text: "Freight agreements may specify fixed vehicle rates, weight-based pricing or distance-based charges. Additional costs, such as detention, loading and unloading, or fuel adjustments, may apply under separate contractual terms." },
      { type: "p", text: "These charges are not necessarily incorrect. Their validity depends on the agreed conditions, accurate calculations and supporting evidence." },
      { type: "h3", text: "Freight information across multiple systems" },
      { type: "p", text: "Manufacturers may already use SAP, transport management systems and digital tracking tools to manage freight operations. However, the information required to verify a charge may be held in different places." },
      { type: "p", text: "For example, an invoice may be recorded in SAP, the freight agreement stored in a contract repository and vehicle waiting-time records maintained in a warehouse system." },
      { type: "p", text: "The information may already exist. The difficulty is bringing the right records together to verify the charge." },

      { type: "h2", text: "Where freight billing discrepancies arise" },
      { type: "p", text: "Freight billing discrepancies can occur when invoiced amounts differ from agreed terms or lack sufficient supporting evidence." },
      { type: "h3", text: "Incorrect rates and duplicate invoices" },
      { type: "p", text: "A transporter may apply an outdated rate, select the wrong vehicle category or calculate charges using an incorrect weight or distance." },
      { type: "p", text: "Duplicate billing can also occur when the same shipment is invoiced more than once, including under different invoice references." },
      { type: "h3", text: "Detention, handling and fuel adjustments" },
      { type: "p", text: "Additional charges require specific checks:" },
      {
        type: "list",
        items: [
          "**Detention:** Does the billed waiting time exceed the agreed free-time allowance, and is it supported by relevant timestamps?",
          "**Loading and unloading:** Were the services performed, and are they already included in the contracted rate?",
          "**Fuel adjustments:** Does the charge follow the agreed formula and applicable period?",
        ],
      },

      { type: "h2", text: "When a delivered shipment carries an unsupported charge" },
      { type: "p", text: "Consider a manufacturer with an agreed base freight rate of ₹40,000, including unloading. After delivery, the transporter submits an invoice for ₹49,000, including ₹6,000 in detention charges and ₹3,000 for unloading." },
      { type: "p", text: "The unloading fee conflicts with the agreed terms, while the detention charge requires verification against waiting-time records." },
      { type: "p", text: "The ₹3,000 unloading charge should therefore be disputed, while the detention amount must be assessed before approval." },
      { type: "p", text: "**The financial risk is not the additional charges themselves, but paying charges that have not been properly verified.**" },
      { type: "figure", src: audit("invoice-breakdown"), alt: "Breakdown of a ₹49,000 freight invoice: approve ₹40,000 base freight, hold ₹6,000 detention for verification, dispute ₹3,000 unloading.", width: 2400, height: 1350 },

      { type: "h2", text: "Connecting shipment visibility to freight invoice accuracy" },
      { type: "p", text: "Purchase order (PO) and shipment visibility help manufacturers track goods from ordering through dispatch and delivery. Freight bill auditing connects those movements with the applicable transportation charges." },
      { type: "h3", text: "Linking purchase orders, shipments and invoices" },
      { type: "p", text: "For inbound freight, a PO reference can help identify the goods being transported and connect them to the relevant shipment. Shipment records, lorry receipts and proof of delivery help establish which movement an invoice relates to. The freight agreement provides the commercial terms needed to validate the charge." },
      { type: "p", text: "However, a PO alone does not establish the correct freight amount. One PO may involve multiple shipments, while one shipment may contain goods from several POs. Accurate verification therefore requires the appropriate relationship between purchase orders, shipment references, invoices and freight agreements." },
      { type: "h3", text: "Using shipment records to verify charges" },
      { type: "p", text: "Operational records provide evidence for specific freight charges." },
      { type: "p", text: "For example, gate-in and gate-out timestamps can help establish chargeable detention time, while shipment weight, route and vehicle details can support base freight calculations." },
      { type: "p", text: "Connecting these records with the applicable pricing terms allows manufacturers to use shipment information for financial verification, not just delivery tracking." },

      { type: "h2", text: "What manufacturers should verify before freight payment" },
      { type: "p", text: "A consistent freight audit process should establish whether each applicable charge is contractually permitted, accurately calculated and supported by evidence." },
      { type: "p", text: "The following checklist covers important verification areas for manufacturers operating in India." },
      {
        type: "table",
        head: ["Verification area", "What manufacturers should check"],
        rows: [
          ["Base freight rates", "Match the billed amount against the agreed rate, route, vehicle type, shipment weight or applicable pricing basis."],
          ["Detention charges", "Verify chargeable waiting time against relevant gate-in/gate-out records and contractual free-time allowances."],
          ["Loading and unloading", "Confirm that the services were performed and are not already included in the contracted freight rate."],
          ["Fuel adjustments", "Check whether the charge follows the agreed adjustment formula and applicable period."],
          ["Duplicate invoices", "Compare transporter details, invoice references and shipment records to identify potential duplicate billing."],
          ["GST treatment", "Verify the applicable tax treatment, including relevant forward-charge or reverse-charge requirements."],
          ["E-way bill information", "Reconcile relevant goods-movement details with shipment records where applicable."],
          ["Import-related charges", "Check applicable port handling, storage and customs agent charges against agreed terms and supporting documents."],
        ],
      },
      { type: "p", text: "These checks serve different purposes. Freight rate verification establishes commercial accuracy. GST checks support correct tax treatment, while e-way bill information can help reconcile goods movements where applicable." },
      { type: "p", text: "Not every check applies to every invoice. The verification process should reflect the shipment type, commercial agreement and relevant regulatory requirements." },
      { type: "p", text: "When a discrepancy is identified, the invoice should be investigated and either corrected, approved with appropriate justification or held for further review." },

      { type: "h2", text: "How agentic AI supports freight bill auditing" },
      { type: "p", text: "Many manufacturers already use digital systems to process freight invoices, validate rates and flag discrepancies." },
      { type: "p", text: "However, identifying a discrepancy is not always the final step. Some exceptions still require teams to retrieve supporting records, examine contractual terms and coordinate with transporters before payment." },
      { type: "p", text: "Agentic AI can potentially support these activities by connecting information, investigating discrepancies and helping teams move towards resolution." },
      { type: "h3", text: "1. Connect invoices with shipment information" },
      { type: "p", text: "An agent can be designed to identify the relevant transporter, shipment, invoice and freight agreement using information available through connected systems and supported documents." },
      { type: "h3", text: "2. Verify freight charges" },
      { type: "p", text: "Billed amounts can be compared with contracted rates, applicable pricing rules and shipment evidence." },
      { type: "p", text: "These checks can identify differences in base freight charges, additional fees or invoice references." },
      { type: "h3", text: "3. Investigate discrepancies" },
      { type: "p", text: "When a charge does not match the available evidence, an agent can examine relevant records to identify the possible cause." },
      { type: "p", text: "For example, an unexpected detention charge may require comparing the contractual free-time allowance, vehicle waiting-time records and the transporter’s calculation." },
      { type: "p", text: "Rather than presenting only the amount in dispute, an agent-assisted process can potentially assemble the information needed to understand why the discrepancy occurred." },
      { type: "h3", text: "4. Recommend the next action" },
      { type: "p", text: "Based on the findings, an agent can prepare supporting evidence and a proposed response for the responsible team." },
      { type: "p", text: "Depending on the discrepancy, this may involve requesting missing documentation, seeking a corrected invoice or routing the charge for approval." },
      { type: "figure", src: audit("corrected-invoice-request"), alt: "Laptop showing an agent-drafted email asking the transporter for a corrected invoice of ₹43,000, with supporting records attached and an approve-and-send step.", width: 2400, height: 1350 },
      { type: "h3", text: "5. Support authorised resolution" },
      { type: "p", text: "Where supported by the integration, permissions and operating mode, an agent can carry out approved follow-up actions and maintain a record of the outcome." },
      { type: "p", text: "Exceptions requiring financial judgement or approval remain with authorised personnel." },

      { type: "h2", text: "Where Agentra fits" },
      { type: "p", text: "Agentra’s Freight Bill Audit agent is intended to support freight invoice verification alongside existing enterprise systems, including SAP." },
      { type: "p", text: "The agentic approach aims to bring together relevant invoice, freight agreement and shipment information, support discrepancy investigation and help teams move towards resolution." },
      { type: "p", text: "Rather than replacing existing financial or transportation systems, the objective is to support more accurate freight payment decisions while keeping people in control of exceptions and approvals." },

      { type: "h2", text: "Measuring the business value of freight bill auditing" },
      { type: "p", text: "Effective freight auditing is not only about detecting discrepancies. Manufacturers also need to understand whether those discrepancies are resolved efficiently and whether the process improves payment controls." },
      { type: "p", text: "Four metrics can help evaluate performance:" },
      {
        type: "list",
        items: [
          "**Invoice discrepancy rate:** Percentage of invoices flagged for further verification, helping identify recurring billing issues.",
          "**Exception resolution time:** Average time between identifying a discrepancy and reaching an authorised resolution.",
          "**Corrected or avoided freight charges:** Value of disputed charges that are corrected or prevented from being paid after verification.",
          "**Manual intervention rate:** Percentage of invoices requiring human involvement beyond standard processing.",
        ],
      },
      { type: "p", text: "Comparing these metrics before and after introducing agent-assisted workflows can help manufacturers assess changes in audit efficiency, payment accuracy and manual effort." },

      { type: "h2", text: "From shipment visibility to payment accuracy" },
      { type: "p", text: "For Indian manufacturers, accurate freight payments depend on connecting agreed rates, shipment evidence and authorised decisions." },
      { type: "p", text: "As freight operations become increasingly digital, the opportunity is to use existing information more effectively, resolve billing exceptions and prevent unsupported charges from reaching payment." },
      { type: "p", text: "**Knowing where goods are is only half the picture. Knowing what to pay matters just as much.**" },
    ],
  },
  {
    slug: "inbound-freight-management-agentic-ai",
    title: "Inbound Freight Management: How Agentic AI Helps Manufacturers",
    description:
      "How agentic AI connects data from every freight forwarder, finds inbound freight savings and acts on delays before production feels them.",
    dek: "How agentic AI connects data from every freight forwarder, finds inbound freight savings and acts on delays before production feels them.",
    readMins: 7,
    cover: {
      src: freight("cover"),
      alt: "Logistics coordinator at dawn viewing scattered forwarder updates beside one clear view of inbound freight, with an agent recommendation waiting for approval",
      width: 2400,
      height: 1350,
    },
    body: [
      { type: "h2", text: "Three forwarders, one truth" },
      { type: "p", text: "Most manufacturers that buy components and finished goods overseas rely on several freight forwarders, and each one reports in its own way: a portal export from one, a weekly spreadsheet from another, an email with a revised arrival date from a third. The information is there, but it cannot be compared until someone reconciles it by hand." },
      { type: "p", text: "As a result, logistics teams spend hours collecting, cleaning and checking data before they can decide anything. Forwarder performance is hard to compare, savings are found late, and a delay at sea is rarely connected in time to the purchase order, the stock level or the production line it will affect." },
      { type: "p", text: "Freight forwarder visibility is therefore more than tracking. It means one trusted view of the whole inbound network: where every shipment is, what it costs and what it puts at risk." },
      { type: "quote", text: "How do you make good freight decisions when the information you need is spread across several partners?" },

      { type: "h2", text: "Why inbound freight across several forwarders is hard to manage" },
      { type: "p", text: "Working with several forwarders gives access to more routes, modes and capacity. It also creates three problems." },
      { type: "h3", text: "1. Shipment information is fragmented" },
      { type: "p", text: "Each forwarder has its own portal, shipment references, status definitions and reporting rhythm. One marks a container as departed when it enters the terminal, another when the vessel sails. Teams reconcile this by hand, so the view of locations, delays and arrival dates always lags reality." },
      { type: "h3", text: "2. Inconsistent data makes cost comparison unreliable" },
      { type: "p", text: "Forwarders report cost on different bases:" },
      {
        type: "list",
        items: [
          "**Units:** per kilogram or per tonne, per shipment or per container.",
          "**Periods:** monthly in one report, quarterly in another.",
          "**Scope:** Incoterms decide which legs the buyer pays for, so the same lane can carry different cost elements.",
          "**Charge structure:** base freight, surcharges, terminal handling and destination charges are split differently by each partner.",
        ],
      },
      { type: "p", text: "Without standardising these, teams compare unlike costs. Destination and handling charges can rival the base rate itself, so a lower quoted rate does not always mean a lower total freight cost." },
      { type: "h3", text: "3. Utilisation, mode and emissions stay hidden" },
      { type: "p", text: "Scattered data hides the biggest efficiency levers:" },
      {
        type: "list",
        items: [
          "**Consolidation:** small less-than-container-load (LCL) shipments on the same lane in the same week could often travel as one full container load (FCL).",
          "**Container fill:** a container can be full by weight and half empty by volume. Dense metal parts reach the weight limit long before the box is full; light, bulky goods do the opposite. Without both measures, fill rates mislead.",
          "**Mode:** air carries a small share of volume but a large share of freight cost and transport emissions. Every reactive air shipment is a planning signal.",
        ],
      },
      { type: "p", text: "These levers only appear when cost, volume, transit time and emissions sit on one record. The problem is not managing a few forwarders. It is the lack of comparable, trusted data to decide with." },

      { type: "h2", text: "Why shipment visibility alone is not enough" },
      { type: "p", text: "Visibility platforms do an important job: they tell you where a shipment is. Most manufacturers already run one, and they should keep it. But knowing where a container is does not tell you what it costs, what it puts at risk or what to do next." },
      { type: "viz", name: "freight-levels" },
      { type: "h3", text: "From tracking delays to managing their impact" },
      { type: "p", text: "When a tracking system flags a delay, the supply chain team still needs four answers:" },
      {
        type: "list",
        items: [
          "**What is affected?** Which purchase order, material or customer order is at risk?",
          "**How urgent is it?** Will production or a customer commitment suffer, and when?",
          "**What are the options?** Wait, expedite only the shortfall, use stock from another site or adjust the plan?",
          "**Who decides, and how is it executed?** Who approves, and which systems and partners need to act?",
        ],
      },
      { type: "p", text: "Answering them means linking each shipment to the orders, inventory and plans it serves." },
      { type: "p", text: "**This is where agentic AI adds value:** it connects forwarder data with enterprise context, evaluates options, recommends actions and coordinates approved workflows, while people keep control of the decisions." },

      { type: "h2", text: "How Agentra transforms inbound freight management" },
      { type: "p", text: "Agentra is an agentic AI platform built for supply chain. It moves manufacturers from tracking shipments to coordinated freight decisions: agents collect the data, read it in its business context and help teams act on risks and opportunities." },
      { type: "h3", text: "Connect information across systems" },
      { type: "p", text: "Inbound freight data lives in forwarder portals, emails, spreadsheets, the ERP, the transport management system (TMS) and the visibility platform. Agentra connects to all of them and works on top. No rip-and-replace: the systems you run today stay in place." },
      { type: "h3", text: "Standardise and reconcile freight data" },
      { type: "p", text: "Connected data only helps if it is comparable. Agents align units, dates and references, link every shipment to its purchase order and flag charge discrepancies, removing most of the manual reconciliation." },
      { type: "h3", text: "Build one view of inbound freight" },
      { type: "p", text: "Agentra’s supply chain ontology, a live model of how shipments, purchase orders, suppliers, lanes and sites relate to each other, places every shipment in its operational context. Each forwarder’s dashboard shows its own slice of the network. This shows the whole of it." },
      { type: "h3", text: "Find freight cost opportunities" },
      { type: "p", text: "Agents compare logistics data to find savings without breaking delivery requirements:" },
      {
        type: "list",
        items: [
          "**Compare forwarders:** rates, transit times and reliability on comparable lanes.",
          "**Consolidate shipments:** recurring LCL flows that could move as FCL.",
          "**Improve container fill:** the right container size, with weight and volume both in view.",
          "**Rethink mode:** air shipments that could move by sea with earlier planning.",
        ],
      },
      { type: "p", text: "Each option is evaluated on total cost, transit time, emissions and operational requirements." },
      { type: "h3", text: "Connect delivery events to business decisions" },
      { type: "p", text: "A delay matters when it reaches material availability or production. An agent connects the chain: shipment delay → affected purchase order → material shortage → production risk. It then compares the options (wait, expedite only the shortfall, rebalance stock, reroute) and recommends the lowest-cost response that avoids a stock-out." },
      { type: "viz", name: "delay-chain" },
      { type: "h3", text: "Test disruption before it happens" },
      { type: "p", text: "Some disruptions do not hit one shipment; they hit a whole lane. A Red Sea closure, a typhoon season in South China or congestion at a hub port changes transit times for every container on the route. With the network on one record, agents can run these scenarios in advance: which shipments, suppliers and sites are exposed, how many days are added, what it costs, and which response protects service at the lowest cost. The disruption is tested on screen before it is felt on the production line." },

      { type: "h2", text: "Agentra in practice" },
      { type: "p", text: "Agentra brings enterprise systems, logistics partners and agentic workflows together in one operating layer, with shared supply chain context and governed execution. It comes with **1,000+ pre-built connectors** to ERP, TMS and logistics provider systems, and an SDK for anything else. A proof of value typically runs in **4 to 6 weeks**, and deployments go live in **8 to 12 weeks**." },
      {
        type: "proof",
        items: [
          {
            client: "A global electronics manufacturer.",
            text: "**3,000+ purchase orders a month** booked from SAP to forwarders with no re-keying, across 15+ forwarder booking templates, with alerts raised before a delay hits the promised date.",
            stats: [
              { value: "3,000+", label: "purchase orders a month" },
              { value: "15+", label: "forwarder booking templates" },
            ],
          },
          {
            client: "A global high-precision industrial manufacturer.",
            text: "**29 logistics providers** orchestrated on one layer and one shipment record, running on Microsoft Dynamics 365. Results measured in phase 1: **7.69% lower logistics spend** and **5,000+ hours of manual work saved a year**.",
            stats: [
              { value: "29", label: "logistics providers" },
              { value: "7.69%", label: "lower logistics spend" },
              { value: "5,000+", label: "hours saved a year" },
            ],
          },
        ],
      },
      { type: "p", text: "Together they show the two foundations of inbound freight management: one record across many logistics providers, and purchase orders flowing to forwarders without re-keying." },

      { type: "h2", text: "From recommendation to execution: people stay in control" },
      { type: "p", text: "Agentic AI does not mean handing every decision to a machine. It means removing the manual effort of spotting issues, evaluating options and coordinating actions." },
      { type: "p", text: "When a shipment is delayed, an agent identifies the affected order, assesses the impact and recommends a response such as expediting or rebooking. Routine updates follow predefined workflows." },
      { type: "quote", text: "The right humans in the loop, not humans in the way: coordinators approve rebookings and anything a customer will notice." },
      { type: "p", text: "With Agentra, you set the level of autonomy for each workflow: observe, recommend, act with approval, or act on its own within policy. Autonomy is earned. A workflow moves up only when its accuracy has been proven, and only when you decide." },
      { type: "viz", name: "governed-execution" },
      { type: "h3", text: "How Agentra keeps execution governed" },
      {
        type: "list",
        items: [
          "**Decision rights:** which actions each agent is allowed to take.",
          "**Approval thresholds:** limits on cost, risk and business commitments.",
          "**Role-based permissions:** who can see which information and who approves.",
          "**Audit trails:** source, record and timestamp for every decision, approval and action.",
          "**Escalation:** anything outside the limits goes to the right person.",
        ],
      },
      { type: "p", text: "**Autonomy does not mean giving up control. Agents work inside the boundaries you set, and people keep authority over the decisions that matter.**" },

      { type: "h2", text: "Conclusion: from freight visibility to informed action" },
      { type: "p", text: "Getting a clear picture of inbound freight should not take hours of follow-ups and reconciliation." },
      { type: "p", text: "Manufacturers need to bring this information together, see what needs attention and decide what to do next, before a delay reaches the production line." },
      { type: "p", text: "Agentra connects the systems you already run, surfaces risks and savings, and coordinates action within your business rules." },
      { type: "p", text: "**Less time chasing shipment updates. More time making decisions.**" },
      { type: "p", text: "**Your supply chain, acting on what it knows. You stay in command.**" },
      { type: "cta", text: "See how Agentra turns fragmented forwarder data into coordinated inbound freight decisions. **[Book a 30-minute walkthrough.](/contact)**" },
      { type: "quiz" },
    ],
  },
  {
    slug: "daily-demand-sensing-store-replenishment",
    title: "Daily Demand Sensing and Store Replenishment for Fresh Food Chains",
    description:
      "See how agentic AI helps fresh food chains sense ingredient demand, prepare store orders and manage replenishment without replacing their ERP.",
    dek: "See how agentic AI helps fresh food chains sense ingredient demand, prepare store orders and manage replenishment without replacing their ERP.",
    readMins: 5,
    cover: {
      src: fresh("cover"),
      alt: "Illustration of a distribution centre with fresh ingredients in its dock bays, an operations lead with a tablet, and a chilled van heading to a store beneath stadium floodlights.",
      width: 1700,
      height: 1000,
    },
    body: [
      { type: "p", text: "A busy evening can change what a restaurant needs. A store near a major sporting event may see more orders than usual, while another location continues to experience normal demand." },
      { type: "p", text: "For a food chain operating across multiple locations, this creates a daily planning challenge. Each store needs the right quantities of fresh ingredients, at the right time. Too little stock can affect availability. Too much can increase waste." },
      { type: "p", text: "Yet planning often starts at the distribution-centre level. Periodic plans provide a view of inventory across the network, but they may not reflect changing requirements at every store." },
      { type: "p", text: "The challenge is to connect demand changes with daily, ingredient-level decisions and ensure that each store receives what it needs." },
      { type: "p", text: "**This is where agentic AI can help bridge the gap between demand planning and store replenishment.**" },

      { type: "h2", text: "Why Periodic Planning Falls Short at Store Level" },
      { type: "p", text: "DC-level planning helps manage inventory across the distribution network. But it may not capture the changing needs of individual stores." },
      { type: "p", text: "Consider two stores in the same city. One is near a major sporting event, while the other serves a quieter neighbourhood. Their ingredient requirements may differ on the same day." },
      {
        type: "list",
        items: [
          "**Demand varies by location:** Local events, customer preferences and recent sales influence store-level demand.",
          "**Ingredients have limited shelf lives:** Overstocking increases food waste, while insufficient stock risks stockouts.",
          "**Inventory is spread across the network:** Teams must consider store stock, incoming deliveries and DC availability.",
          "**Store ordering can remain manual:** Teams may still rely on periodic forecasts and manual checks to prepare replenishment orders.",
        ],
      },
      { type: "p", text: "Market conditions add to the challenge. Vesper reported that European mozzarella shifted from leading the market down to leading it up in about a month, despite stable supply. UK food inflation also rose to 2.9% in October 2026, up from 2.5% in September, according to the British Retail Consortium and NIQ." },
      { type: "p", text: "For a fresh food supply chain, responsive **demand sensing** and **store replenishment** are essential. Businesses need to understand not just how much inventory they hold across the network, but what each store needs and when." },

      { type: "h2", text: "From Demand Signals to Ingredient-Level Decisions" },
      { type: "p", text: "Demand forecasting estimates what customers are likely to buy. Demand sensing uses recent information to update that view as conditions change. For fresh food chains, this needs to happen at both the store and ingredient level." },
      { type: "p", text: "For example, an increase in expected pizza sales at a particular store should translate into higher requirements for the ingredients used to prepare those pizzas." },
      { type: "p", text: "An agentic AI platform can help coordinate this process." },
      { type: "p", text: "Agents can:" },
      {
        type: "list",
        ordered: true,
        items: [
          "**Sense demand:** Analyse recent sales, historical patterns and relevant demand signals.",
          "**Calculate ingredient needs:** Translate expected store-level sales into ingredient requirements.",
          "**Check inventory:** Consider available stock, incoming deliveries and supply constraints.",
          "**Prepare replenishment:** Draft the quantities each store needs and the corresponding DC-to-store replenishment.",
          "**Identify exceptions:** Flag situations where stock, supply or other constraints prevent the recommended order from being fulfilled.",
        ],
      },
      { type: "p", text: "Instead of simply reporting that demand has changed, agents can help move the process towards an actionable store order." },

      { type: "h2", text: "How the Daily Replenishment Loop Works" },
      { type: "p", text: "The process does not stop at identifying a change in demand. Agents need to assess whether the required ingredients are available, prepare the order and determine whether it can proceed automatically or needs human review." },
      { type: "viz", name: "replenishment-loop" },

      { type: "h2", text: "From DC to Store: Turning Decisions into Replenishment" },
      { type: "p", text: "The value of demand sensing comes from what happens next. Agentra's agentic AI platform works alongside existing enterprise systems. It connects data and workflows to help agents move from identifying a demand change to preparing the next action." },
      { type: "p", text: "For a multi-store food business, the process can work as follows:" },
      {
        type: "list",
        items: [
          "An agent analyses demand signals for each store.",
          "It estimates the requirement for individual ingredients.",
          "It checks store inventory, incoming stock and DC availability.",
          "It drafts the store order and the associated replenishment requirement.",
          "It routes the order through the agreed workflow.",
        ],
      },
      { type: "p", text: "This creates a more connected process between demand planning and store replenishment." },
      { type: "p", text: "The objective is not to replace the ERP or rebuild existing systems. It is to add an agentic layer that helps businesses make and execute store-level decisions using the systems they already have." },
      { type: "p", text: "BCG's The AI-First Supply Chain (2026) describes a consumer goods case where agent-supported replenishment improved stock movements, including distribution-centre-to-store transfers. Fill rates increased, while administration costs fell by 40% to 60%." },
      { type: "p", text: "This is an example of the operational improvements that better-coordinated replenishment can support." },

      { type: "h2", text: "People Stay in Control. Routine Work Moves Faster" },
      {
        type: "list",
        items: [
          "Automation in a fresh-food supply chain needs clear boundaries. Routine orders can move within predefined rules, such as order quantities, inventory limits and approval requirements. Exceptions should go to the inventory team.",
          "For example, if a DC cannot fulfil a store's mozzarella requirement, the agent can flag the shortfall, explain the reason and present the proposed action for review. The team can then approve, edit or reject it.",
        ],
      },
      { type: "figure", src: fresh("exception-review"), alt: "Illustration of a planning team at an operations wall, with one colleague pointing at a store order flagged for a mozzarella shortfall.", width: 1700, height: 1000 },
      {
        type: "list",
        items: [
          "This approach is important. Gartner (2026) warns that true autonomy remains limited and that agent washing creates real risks.",
          "The goal is not to automate every decision. It is to automate routine work while keeping people in control of decisions that require judgement.",
        ],
      },
      { type: "p", text: "**The right humans in the loop, not humans in the way.**" },

      { type: "h2", text: "Add Store-Level Intelligence Without Replacing Your ERP" },
      {
        type: "list",
        items: [
          "Fresh food chains do not need another disconnected planning system. They need a way to connect demand signals, inventory information and replenishment workflows across their existing operations.",
          "Agentra provides an agentic layer that works with existing enterprise systems. Its platform offers 1,000+ connectors, and the first agent is typically live in 6–8 weeks.",
          "This gives businesses a way to start with a focused workflow, connect the relevant data and expand as operational needs evolve.",
          "The opportunity is clear: move beyond periodic, DC-level planning towards daily decisions at the ingredient and store level.",
        ],
      },
      { type: "p", text: "**Your supply chain, acting on what it knows. You stay in command.**" },
      { type: "cta", text: "**Ready to see how daily demand sensing and store replenishment could work across your network? [Book a 30-minute walkthrough with Agentra.](/contact)**" },
    ],
  },
  {
    slug: "decision-rights-agentic-supply-chain",
    title: "Who signs off when an AI agent acts? Decision rights for supply chain leaders",
    seoTitle: "Who signs off when an AI agent acts?",
    description:
      "A practical guide to AI decision governance in supply chain: what AI agents decide alone, what needs approval, and who stays accountable.",
    dek: "A practical guide to AI decision governance in supply chain: what AI agents decide alone, what needs approval, and who stays accountable.",
    readMins: 5,
    cover: {
      src: rights("cover"),
      alt: "A planner in a port control room at night, watching the screens as cranes work a container ship outside. One screen shows a decision waiting for approval.",
      width: 2400,
      height: 1580,
    },
    body: [
      { type: "p", text: "It’s 2 a.m. A key supplier has just pushed a critical component back by a week. By the time your planning team logs on, an AI agent has already found another supplier who can deliver on time, at a higher price." },
      { type: "p", text: "Should it place the order?" },
      { type: "p", text: "If your answer is “it depends”, you’re right. And that “it depends” is exactly what most companies haven’t written down yet." },
      { type: "p", text: "[Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-05-21-gartner-predicts-half-of-supply-chain-management-solutions-will-include-agentic-ai-capabilities-by-2030) predicts that by 2030, half of cross-functional supply chain solutions will use AI agents to execute decisions on their own. These agents won’t just flag problems. They’ll act: reorder stock, reroute freight, switch suppliers." },
      { type: "p", text: "So the question for supply chain leaders is no longer what AI can do. It’s what AI is allowed to do, and who answers for it." },
      { type: "p", text: "That’s what decision rights are for. They set out three things: which decisions an agent can take alone, which need a person’s approval, and who is accountable for the result. Get them right and you have AI decision governance in supply chain that scales." },

      { type: "h2", text: "Two ways to get it wrong" },
      {
        type: "list",
        items: [
          "**The agent acts when it shouldn’t.** It pays a premium nobody approved, or uses a supplier that procurement never cleared.",
          "**The agent waits when it shouldn’t.** It flags an obvious fix and sits in someone’s inbox while the line goes down.",
        ],
      },
      { type: "p", text: "Both cost money. Both leave people arguing about who was responsible. And both erode the one thing agents need to work at all: trust." },

      { type: "h2", text: "Match autonomy to risk" },
      { type: "p", text: "The rule is simple: the bigger the risk, the more human oversight." },
      {
        type: "table",
        head: ["Decision type", "Examples", "Who decides"],
        rows: [
          ["Routine, low risk", "Replenishing stock within approved limits; rerouting a shipment within an agreed cost cap", "The agent acts and logs what it did"],
          ["Material", "Expediting at a significant premium; changing production priorities that affect customer commitments", "The agent recommends; a named person approves"],
          ["High risk or restricted", "Using an unvetted supplier; overriding safety or procurement controls", "A person decides; the agent can’t act"],
        ],
      },
      { type: "p", text: "Note: exact limits depend on your policies, risk appetite and delegated authority." },
      { type: "figure", src: rights("match-autonomy-to-risk"), alt: "Match autonomy to risk: routine decisions the agent acts on, material decisions a named person approves, high-risk decisions a person makes.", width: 2400, height: 1350 },

      { type: "h2", text: "Three questions to draw the line" },
      { type: "p", text: "**1. What’s the impact?** Does the action stay within budget and service-level limits? A routine replenishment order is one thing; a six-figure spot buy is another." },
      { type: "p", text: "**2. Can it be undone?** Changing a delivery slot is easy to reverse. A new supplier contract isn’t. Anything touching safety or compliance gets the strictest rules." },
      { type: "p", text: "**3. Is it within policy?** An action can look like the best option and still break your purchasing rules. Policy wins." },
      { type: "p", text: "In short: agents act inside clear boundaries, ask when they reach the edge, and never cross the lines you’ve ruled out." },
      { type: "embed", src: "/embeds/act-ask-stop.html", title: "Act, ask or stop: interactive decision flow" },
      { type: "p", text: "**The right humans in the loop, not humans in the way.**" },

      { type: "h2", text: "Four steps to put decision rights in place" },
      { type: "figure", src: rights("four-steps-decision-rights"), alt: "Four steps to put decision rights in place: define scope, set approval thresholds, name an owner, build in escalation and an audit trail.", width: 2400, height: 1350 },
      { type: "p", text: "**1. Define what each agent is allowed to do.** Before an agent goes live, write down its scope. A replenishment agent might monitor stock, spot shortfalls and raise orders. Whether it can place those orders on its own depends on your purchasing policy." },
      { type: "p", text: "**2. Set approval thresholds by risk.** The bigger the potential impact, the tighter the rule. For example, an agent may reroute a shipment up to an agreed cost limit. Above that, it asks first." },
      { type: "p", text: "**3. Name an owner for every consequential decision.** An agent can do the work. A person still owns the outcome. A procurement manager might keep authority over any exception involving an unapproved supplier. Write it down; don’t leave it to interpretation." },
      { type: "p", text: "**4. Build in escalation and an audit trail.** If an agent can’t find an approved supplier that meets the deadline, it escalates the exception. It doesn’t work around procurement. Every action is logged, so anyone can see what happened and why." },
      { type: "p", text: "None of this is new to good supply chain teams. It’s how you’d brief a new planner. The [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) puts governance at its core for the same reason: the rules have to exist before the technology can follow them." },

      { type: "h2", text: "Accountability doesn’t move to the machine" },
      { type: "p", text: "Lalit Das, Agentra’s founder and CEO, has seen this from both sides. He ran a 4PL P&L at Kuehne + Nagel, where he owned the outcome for clients’ entire networks. Then, in 2012, he founded 3SC, a supply chain SaaS, analytics and execution company serving clients across CPG, healthcare, industrial manufacturing and consumer durables." },
      { type: "quote", text: "“When you own a 4PL P&L, there’s nobody to pass the blame to. Building 3SC taught me the other half: the analytics can be brilliant, but if technology doesn’t fit the way people actually work, it won’t get used. AI agents don’t change either lesson. If a leader can’t see how a decision was made, they shouldn’t be asked to trust it.”" },

      { type: "h2", text: "Where Agentra fits" },
      { type: "figure", src: rights("autonomy-levels"), alt: "The autonomy dial: Suggest, Co-pilot and Autopilot.", width: 1288, height: 208 },
      { type: "p", text: "Your organisation defines the decision rights. Agentra makes sure agents follow them. Each agent runs at the level you choose:" },
      {
        type: "list",
        items: [
          "**Suggest:** it recommends; people act.",
          "**Co-pilot:** it acts after a person approves.",
          "**Autopilot:** it acts within guardrails you set.",
        ],
      },
      { type: "p", text: "Every action is explained and recorded in an audit trail. And because Agentra works inside the ERP, planning and procurement systems you already run, your existing approval rules stay in force. [See how governance works](/platform#governance)" },

      { type: "h2", text: "The bottom line" },
      { type: "p", text: "Autonomy without accountability is a risk. Accountability without autonomy is just another dashboard." },
      { type: "p", text: "The goal isn’t to hand every decision to AI. It’s to give agents clear authority, clear limits and a clear way to bring people in." },
      { type: "p", text: "Back to 2 a.m. With decision rights in place, the agent knows its limit. The new supplier’s price is above it, so it sends the option, with its reasoning, to the right manager. The order goes out before the morning meeting." },
      { type: "figure", src: rights("the-2am-scenario"), alt: "The 2 a.m. scenario: the agent finds another supplier, hits its price limit, escalates to the right manager, and the order goes out before the morning meeting.", width: 2400, height: 1350 },
      { type: "p", text: "**Want to map the decision rights for your first agent? [Talk to our team](/contact)**" },
    ],
  },
  {
    slug: "tariffs-move-weekly",
    tag: "Supply chain · Tariffs",
    title: "Tariffs move weekly. Your S&OE should too",
    dek: "See how agentic AI helps supply chains respond to tariff changes faster, coordinate decisions, and execute actions with human oversight.",
    readMins: 5,
    cover: {
      src: img("cover"),
      alt: "Tariffs move weekly. Your S&OE should too.",
      width: 1920,
      height: 1080,
    },
    body: [
      { type: "p", text: "A tariff shift happens suddenly. Prices rise, markets tighten, and the supply plan made just a day ago might already be irrelevant." },
      { type: "p", text: "Your Sales and Operations Execution (S&OE) process must respond just as quickly. Should you change suppliers, adjust inventory, or revise production plans? Each option affects costs and service levels. The longer you take to decide, the harder it becomes to protect your margins." },
      { type: "p", text: "According to McKinsey’s [Supply Chain Risk Pulse Study](https://www.mckinsey.com/capabilities/operations/our-insights/supply-chain-risk-survey), **82% of respondents** reported that tariffs had changed their supply chains in 2025." },
      { type: "figure", src: img("tariff-impact-82"), alt: "82% of respondents said tariffs changed their supply chains in 2025.", width: 1600, height: 900, caption: "Source: McKinsey, Supply Chain Risk Pulse Study" },
      { type: "p", text: "Agentic AI can help make S&OE more responsive. When tariffs change, AI agents can assess the impact, evaluate alternative response plans, and help execute actions within business-defined rules. Decisions that require human judgment or approval remain with the people responsible." },

      { type: "h2", text: "One tariff change: multiple supply chain decisions" },
      { type: "figure", src: img("four-linked-decisions"), alt: "One tariff change, four linked decisions: procurement and supplier selection, inventory and working capital, production planning, and logistics and customer service.", width: 1600, height: 900, caption: "One tariff change touches four linked decisions, each with its own trade-off." },
      { type: "p", text: "A change in tariffs rarely impacts a single segment of a supply chain. Its effects can reach into procurement, inventory, logistics, production, and customer service." },
      { type: "p", text: "Consider a manufacturer that imports components from a supplier affected by a new tariff. The new cost raises several questions:" },
      {
        type: "list",
        items: [
          "Is it worth continuing relationships with the current supplier?",
          "Is it cheaper to switch suppliers, even if that supplier can deliver later?",
          "Should the company increase its inventory before further price increases?",
          "Can the company absorb the cost without damaging its margins?",
          "If there is a tariff increase, should it change its output or prices?",
        ],
      },
      { type: "p", text: "Each gets associated with trade-offs. Switching suppliers may cut procurement costs but increase delivery times. Holding more inventory may hedge against unexpected costs but use working capital at the same time." },
      { type: "p", text: "The right decision depends on the company's priorities, constraints, and current supply chain conditions." },
      { type: "p", text: "**The challenge is to evaluate these connected decisions together, rather than treating each tariff change as an isolated procurement issue.**" },

      { type: "h2", text: "The real bottleneck: turning information into decisions" },
      { type: "figure", src: img("decision-bottleneck"), alt: "Detect, decide, act: detection is already in place, the bottleneck is the decision, and action waits on it.", width: 1600, height: 900, caption: "Detecting the change is largely solved. The delay sits in deciding what to do." },
      { type: "p", text: "The supply chain teams may already be equipped with systems and tools such as dashboards, forecasts, and alerts to detect changes. However, simply knowing what changed does not enable them to determine the next steps." },
      { type: "p", text: "For instance, an increased tariff may put businesses in a position where they have to decide of whether to stick with an expensive supplier, switch their supplier, or procure additional inventory before costs increase." },
      { type: "p", text: "In order to make that decision, teams from procurement, finance, planning, and logistics need to weigh possible trade-offs and decide on priorities. A less costly supplier can drive down purchasing costs while leading to longer delivery times and increased risk of disruptions." },
      { type: "p", text: "Establishing the pertinent initiative is not simply identifying the disruption; now, the teams should work collectively to reach an agreement on what to do before the costs start growing." },

      { type: "h2", text: "From planning recommendations to coordinated action" },
      { type: "figure", src: img("recommendation-to-action"), alt: "Traditional tools stop at a recommendation; an agentic response carries it through human approval to action.", width: 1600, height: 900, caption: "Traditional tools stop at a recommendation. An agentic response carries it through human approval to action." },
      { type: "p", text: "Traditional planning tools help businesses forecast demand, assess risks, and evaluate scenarios. Agentic AI builds on these capabilities by helping move decisions towards execution." },
      { type: "h3", text: "From options to action" },
      { type: "p", text: "In the tariff scenario, an AI agent could compare supplier alternatives based on cost, lead time, and availability, then recommend a response that aligns with business priorities." },
      { type: "p", text: "Depending on its permissions and integrations, the agent could help initiate the approved response, such as updating a plan or triggering an order-related workflow." },
      { type: "h3", text: "Beyond recommendations" },
      { type: "p", text: "The difference is that agentic AI can help connect analysis, decision-making, and permitted actions across existing systems. Rather than leaving teams to coordinate every step manually, agents can help carry the response forward, with human approval where required." },

      { type: "h2", text: "Human oversight, agent autonomy" },
      { type: "p", text: "Agentic AI can be very helpful for speeding up, making decisions in relation to the supply chain. However, it is important for businesses to clarify which decisions can be made independently by agents and which decisions require human approval." },
      { type: "h3", text: "Identify decision rights according to risk" },
      { type: "figure", src: img("decision-rights"), alt: "Set decision rights by risk: routine decisions the agent makes, material decisions a human approves, high-risk decisions named people make.", width: 1600, height: 900, caption: "Agent autonomy narrows as the risk of a decision rises." },
      {
        type: "list",
        items: [
          "**Routine decisions**: Agents act according to approved limits, for example, they may modify replenishment amounts, provided that it is done within established boundaries.",
          "**Material decisions**: Agents analyze available choices and suggest possible actions; however, their decisions need to be approved as stated in the company policy.",
          "**High-risk decisions**: Only approved individuals can make decisions if there are high financial, operational or compliance risks involved.",
        ],
      },
      { type: "p", text: "Decision rights need to stipulate limits on expenditures, constraints on activities, escalation triggers and approving individuals." },
      { type: "quote", text: "The right humans in the loop, not humans in the way" },
      { type: "h3", text: "Keep actions accountable" },
      { type: "p", text: "Businesses also need visibility into what agents do, which rules govern their actions, and when decisions are escalated. Audit trails help make these actions traceable and support accountability." },
      { type: "p", text: "**The principle is simple:** put the **right humans in the loop, not humans in the way.** Agents should handle permitted actions independently, while people retain control over decisions that require their judgment or approval." },

      { type: "h2", text: "How Agentra turns decisions into action" },
      { type: "figure", src: img("how-agentra-helps"), alt: "Agents that act inside the systems you run: 1000+ connectors, coordination across functions, Suggest, Co-pilot and Autopilot, and audit trails.", width: 1600, height: 900, caption: "How Agentra connects your systems, teams and decisions." },
      { type: "p", text: "Agentra helps supply chain teams move beyond identifying tariff changes to coordinating decisions and executing responses." },
      { type: "h3", text: "Works with existing systems" },
      { type: "p", text: "With 1000+ integrations, including SAP, Oracle, and Microsoft Dynamics 365, Agentra works with existing enterprise systems without requiring a technology replacement." },
      { type: "h3", text: "Coordinates across functions" },
      { type: "p", text: "Specialised agents work across planning, procurement, logistics, and risk to evaluate trade-offs and coordinate responses." },
      { type: "h3", text: "Autonomy with human oversight" },
      { type: "p", text: "Suggest, Co-pilot, and Autopilot modes let businesses define how independently agents can act and when human approval is required." },
      { type: "h3", text: "Traceable actions" },
      { type: "p", text: "Audit trails help businesses review agent actions and maintain accountability." },
      { type: "p", text: "**Agents that act. People in command.**" },

      { type: "h2", text: "The bottom line" },
      { type: "quote", text: "Speed without control is a risk. Control without action is just another delay." },

      { type: "h2", text: "Ready to move from tariff alerts to action?" },
      { type: "p", text: "Discover how Agentra can help supply chain teams respond to tariff changes, coordinate decisions, and act faster while keeping people in command." },
    ],
    banner: {
      src: img("whitepaper-launch"),
      alt: "New whitepaper: Ready to move from tariff alerts to action? Launching on Monday 9 November 2026.",
      width: 1600,
      height: 600,
    },
    about:
      "Agentra builds the agentic layer for supply chain. Its agents act on decisions inside the systems a company already runs, with 1000+ connectors including SAP, Oracle, and Microsoft Dynamics 365. Agentra has offices in Amsterdam (HQ), Delhi NCR, Dubai, and St. Louis. [www.agentra-ai.com](https://www.agentra-ai.com)",
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
