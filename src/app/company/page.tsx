import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Globe } from "@/components/home/Globe";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/ui/Primitives";
import { Portrait } from "@/components/team/Portrait";
import { personas } from "@/lib/content";

export const metadata: Metadata = {
  title: "Company",
  description:
    "Agentra is a vertical agentic AI company for supply chain, headquartered in Amsterdam with teams in Dubai, Delhi NCR, and St. Louis.",
};

const values = [
  {
    title: "Operator credibility",
    body: "We speak the language of planners and execution teams because we come from the domain, not from generic AI.",
  },
  {
    title: "Honest about autonomy",
    body: "We are precise about where agents should act alone and where a human should stay in the loop.",
  },
  {
    title: "Value you can measure",
    body: "Every deployment anchors to a real outcome and a range you can hold us to.",
  },
];

// Leadership. The founder is featured; the other two leaders sit beneath.
const leadership = [
  {
    role: "Founder and CEO",
    name: "Lalit Das",
    photo: "/team/lalit.webp",
    photoHover: "/team/lalit-animated.webp",
    bio: "Lalit has spent 25 years as a supply chain operator, living the gap between insight and action that Agentra now closes. He watched planning teams drown in dashboards while every decision still waited on a person, and built Agentra to turn that operator experience into a workforce of agents that act. He writes and speaks on agentic AI for supply chain, and that operator credibility runs through everything we build.",
  },
  {
    role: "Co-Founder and COO",
    name: "Avinash Aman",
    photo: "/team/avinash.webp",
    photoHover: "/team/avinash-animated.webp",
    bio: "Avinash leads Agentra's operations, turning the founding thesis into a company that ships. He builds the delivery, governance and commercial engine that lets enterprise supply chain teams put governed agents into production with confidence, at the pace real operations demand.",
  },
  {
    role: "Head of Business Enablement",
    name: "Niharika Chawla",
    photo: "/team/niharika-chawla.webp",
    photoHover: "/team/niharika-chawla-animated.webp",
    bio: "Niharika builds the GTM, marketing, people and operational processes that let enterprise AI adoption scale. She is the connective tissue between product, customers and growth, and the field guide that keeps the whole system running.",
  },
];
const [founder, ...coLeaders] = leadership;

// The wider team, grouped by department. Departments follow the naming in
// the Oct 2026 ID-card photo set ("Name-Department"). New joiners appear by
// first name until full names are confirmed and have no animated variant yet.
type Member = { name: string; photo: string; photoHover?: string };
const m = (name: string, slug: string, animated = true): Member => ({
  name,
  photo: `/team/${slug}.webp`,
  ...(animated && { photoHover: `/team/${slug}-animated.webp` }),
});

const teamGroups: { label: string; members: Member[] }[] = [
  {
    // Not in the photo set; department confirmed by the manager (Oct 2026).
    label: "Co-founders and market development",
    members: [
      m("Giacomo Cerizzi", "giacomo-cerizzi"),
      m("Mathias Duchauchoy", "mathias-duchauchoy"),
      m("Jhon Cerezzo", "jhon-cerezzo"),
    ],
  },
  {
    label: "Delivery",
    members: [
      m("Dewal Bharadwaj", "dewal-bharadwaj"),
      m("Aditi", "aditi", false),
      m("Divy", "divy", false),
      m("Hardeep", "hardeep", false),
      m("Mansi", "mansi", false),
      m("Rohit", "rohit", false),
    ],
  },
  {
    label: "Product",
    members: [m("Ritik Garg", "ritik-garg"), m("Sarthak", "sarthak", false)],
  },
  {
    label: "Technology",
    members: [
      m("Santosh Singh", "santosh-singh"),
      m("Puru Verma", "puru-verma"),
      m("Aayush More", "aayush-more"),
      m("Tejas Saraogi", "tejas-saraogi"),
    ],
  },
  {
    label: "Pre-sales and solutions",
    members: [m("Rahul Attri", "rahul-attri"), m("Nohan", "nohan", false)],
  },
  {
    label: "Inside sales",
    members: [
      m("Anshita", "anshita", false),
      m("Vaidehi", "vaidehi", false),
      m("Yash", "yash", false),
    ],
  },
  {
    label: "Marketing",
    members: [m("Prisha", "prisha", false)],
  },
  {
    label: "Admin",
    members: [
      m("Nishu", "nishu"),
      m("Archisha", "archisha", false),
      m("Sohan", "sohan", false),
    ],
  },
];

// Advisors. Full website-length bios to be dropped in from the Advisory Board
// Profiles doc.
const advisors = [
  {
    name: "Christophe Villain",
    role: "Strategy",
    photo: "/team/christophe-villain.webp",
    photoHover: "/team/christophe-villain-animated.webp",
    bio: "Brings senior enterprise strategy experience to how Agentra positions itself and scales across markets and categories.",
  },
  {
    name: "Sudip Lahiri",
    role: "Technology",
    photo: "/team/sudip-lahiri.webp",
    photoHover: "/team/sudip-lahiri-animated.webp",
    bio: "Advises on enterprise technology and large-scale delivery, keeping Agentra credible for the most demanding production environments.",
  },
  {
    name: "Rajiv Gupta",
    role: "Market growth",
    photo: "/team/rajiv-gupta.webp",
    photoHover: "/team/rajiv-gupta-animated.webp",
    bio: "Guides Agentra's go-to-market and growth across regions, from the first reference customers to category leadership.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="We build the agentic layer"
        accent="for supply chain."
        sub="Agentra is a vertical agentic AI company. We are headquartered in Amsterdam, with teams across Dubai, Delhi NCR, and St. Louis, close to the operations we serve."
      />

      {/* Leadership: founder featured as a split row, co-leaders beneath */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeader
              align="left"
              title="Operators who lived the problem,"
              accent="building the fix."
            />
          </Reveal>

          <Reveal className="mt-12">
            <article className="group grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-5">
                <Portrait
                  src={founder.photo}
                  hoverSrc={founder.photoHover}
                  alt={`${founder.name}, ${founder.role} at Agentra AI`}
                />
              </div>
              <div className="md:col-span-7">
                <p className="text-sm text-purple-5">{founder.role}</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {founder.name}
                </h3>
                <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-fg-muted">
                  {founder.bio}
                </p>
              </div>
            </article>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {coLeaders.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article className="group card grid h-full gap-6 rounded-2xl p-5 sm:grid-cols-[9rem_1fr] sm:p-6">
                  <Portrait
                    src={p.photo}
                    hoverSrc={p.photoHover}
                    alt={`${p.name}, ${p.role} at Agentra AI`}
                    className="aspect-square max-w-[9rem]"
                  />
                  <div>
                    <p className="text-sm text-purple-5">{p.role}</p>
                    <h3 className="mt-1.5 text-xl font-semibold tracking-tight">
                      {p.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                      {p.bio}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors: editorial rows instead of cards */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeader
              align="left"
              title="Backed by people who have"
              accent="run supply chains at scale."
            />
          </Reveal>
          <ul className="mt-12 divide-y divide-line border-t border-line">
            {advisors.map((a, i) => (
              <li key={a.name}>
                <Reveal delay={i * 0.06} y={20}>
                  <div className="group grid items-center gap-5 py-8 grid-cols-[5.5rem_1fr] md:grid-cols-12 md:gap-8">
                    <Portrait
                      src={a.photo}
                      hoverSrc={a.photoHover}
                      alt={`${a.name}, ${a.role} advisor to Agentra AI`}
                      className="aspect-square md:col-span-2"
                    />
                    <div className="md:col-span-4">
                      <h3 className="text-xl font-semibold tracking-tight">
                        {a.name}
                      </h3>
                      <p className="mt-1 text-sm text-purple-5">
                        Advisor, {a.role.toLowerCase()}
                      </p>
                    </div>
                    <p className="col-span-2 text-base leading-relaxed text-fg-muted md:col-span-6">
                      {a.bio}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The team: one row per department, label left, portraits right */}
      <section className="border-y border-line bg-bg-1/60 py-16 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeader
              align="left"
              title="Meet the agents"
              accent="behind your agents."
            />
          </Reveal>

          <div className="mt-14 divide-y divide-line border-t border-line">
            {teamGroups.map((g) => (
              <div key={g.label} className="grid gap-6 py-10 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-3">
                  <h3 className="text-lg font-semibold">{g.label}</h3>
                  <p className="mt-1 text-sm text-fg-dim">
                    {g.members.length} {g.members.length === 1 ? "person" : "people"}
                  </p>
                </div>
                <ul className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:col-span-9 lg:grid-cols-4 xl:grid-cols-5">
                  {g.members.map((p, i) => (
                    <li key={p.name}>
                      <Reveal delay={(i % 5) * 0.05} y={20}>
                        <div className="group">
                          <Portrait
                            src={p.photo}
                            hoverSrc={p.photoHover}
                            alt={`${p.name}, ${g.label}, Agentra AI`}
                          />
                          <p className="mt-3 text-sm font-medium transition-colors group-hover:text-purple-5">
                            {p.name}
                          </p>
                        </div>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values: heading pinned left, statements stacked right */}
      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-28">
              <SectionHeader
                align="left"
                title="Operator-credible,"
                accent="not hype-driven."
              />
            </div>
          </div>
          <div className="space-y-10 md:col-span-7">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="border-l-2 border-purple-3/60 pl-6">
                  <h3 className="text-xl font-semibold">{v.title}</h3>
                  <p className="mt-2 max-w-[55ch] text-base leading-relaxed text-fg-muted">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Who we build for */}
      <section className="border-y border-line bg-bg-1/50 py-24 sm:py-28">
        <div className="container-x">
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Who we build for"
              title="Three stakeholders,"
              accent="one control layer."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {personas.map((p, i) => (
              <Reveal key={p.role} delay={i * 0.08}>
                <div className="glass glass-hover h-full p-7">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-purple-5">
                    {p.role}
                  </div>
                  <h3 className="mt-2 text-xl font-bold">{p.who}</h3>
                  <p className="mt-3 text-base leading-relaxed text-fg-muted">
                    {p.cares}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Globe />
      <CTA
        title="Bring Agentra to your supply chain."
        sub="Book a 30-minute demo."
      />
    </>
  );
}
