/* Published blog articles. Copy is verbatim from Marketing's documents;
   inline **bold** and [text](url) are rendered by the article page.
   No author or date until Marketing supplies them (the doc left them blank). */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string }
  | { type: "figure"; src: string; alt: string; width: number; height: number; caption?: string }
  | { type: "table"; head: string[]; rows: string[][] }
  // A self-contained interactive page from /public/embeds, shown in an iframe
  | { type: "embed"; src: string; title: string };

export type Article = {
  slug: string;
  tag?: string;
  title: string;
  // Search title and meta description, when Marketing gives ones that differ
  seoTitle?: string;
  description?: string;
  dek: string;
  readMins: number;
  cover: { src: string; alt: string; width: number; height: number };
  body: Block[];
  // Closing banner (the whitepaper launch) and the boilerplate under it
  banner?: { src: string; alt: string; width: number; height: number };
  about?: string;
};

const img = (name: string) => `/blog/tariffs-move-weekly/${name}.png`;
const rights = (name: string) => `/blog/decision-rights-agentic-supply-chain/${name}.png`;
const fresh = (name: string) => `/blog/daily-demand-sensing-store-replenishment/${name}.png`;

export const articles: Article[] = [
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
      { type: "figure", src: fresh("replenishment-loop"), alt: "The daily demand-to-replenishment loop: sense what each store needs, test whether the requirement can be fulfilled, then release routine orders within agreed guardrails or escalate exceptions to the inventory team. It repeats as new demand and stock data arrives.", width: 1700, height: 1292 },

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
      { type: "p", text: "**Ready to see how daily demand sensing and store replenishment could work across your network? [Book a 30-minute walkthrough with Agentra.](/contact)**" },
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
