/* Published blog articles. Copy is verbatim from Marketing's documents;
   inline **bold** and [text](url) are rendered by the article page.
   No author or date until Marketing supplies them (the doc left them blank). */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "figure"; src: string; alt: string; width: number; height: number; caption?: string };

export type Article = {
  slug: string;
  tag: string;
  title: string;
  dek: string;
  readMins: number;
  cover: { src: string; alt: string; width: number; height: number };
  body: Block[];
  // Closing banner (the whitepaper launch) and the boilerplate under it
  banner?: { src: string; alt: string; width: number; height: number };
  about: string;
};

const img = (name: string) => `/blog/tariffs-move-weekly/${name}.png`;

export const articles: Article[] = [
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
