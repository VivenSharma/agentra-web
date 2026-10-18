import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/ui/Primitives";
import { CTA } from "@/components/CTA";
import { SolutionViz } from "@/components/viz/SolutionViz";
import { solutions } from "@/lib/content";
import { solutionDetail, agentWorkforce } from "@/lib/data";

// Which agent(s) run each solution — the agents that used to live on /agents.
const solutionAgents: Record<string, string[]> = {
  planning: ["demand"],
  resilience: ["exception", "risk"],
  execution: ["order", "freight"],
  orchestration: ["order", "procurement", "risk"],
};

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) return { title: "Solutions" };
  return { title: s.title, description: solutionDetail[slug]?.intro };
}

export default async function SolutionSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const base = solutions.find((s) => s.slug === slug);
  const d = solutionDetail[slug];
  if (!base || !d) notFound();

  const agents = (solutionAgents[slug] ?? [])
    .map((k) => agentWorkforce.find((a) => a.key === k))
    .filter((a): a is (typeof agentWorkforce)[number] => Boolean(a));

  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.hero} accent={d.heroAccent} sub={d.intro}>
        <div className="mt-10 grid grid-cols-3 gap-4">
          {d.outcomes.map((o) => (
            <div key={o.label} className="glass p-5">
              <div className="text-2xl font-semibold tracking-tight text-grad sm:text-3xl">
                {o.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-fg-dim">
                {o.label}
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Signature animated infographic for this solution */}
      <section className="pb-4 pt-2">
        <div className="container-x">
          <Reveal>
            <SolutionViz slug={slug} />
          </Reveal>
        </div>
      </section>

      {/* Sense / Reason / Act steps */}
      <section className="py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="How it works" title="Sense. Reason." accent="Act." />
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {d.steps.map((st, i) => (
              <Reveal key={st.title} delay={i * 0.08}>
                <div className="glass glass-hover h-full p-7">
                  <div className="text-3xl font-semibold text-grad">0{i + 1}</div>
                  <h3 className="mt-4 text-xl font-bold">{st.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-fg-muted">
                    {st.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-y border-line bg-bg-1/50 py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeader
              eyebrow="Capabilities"
              title="What the agents"
              accent="do here."
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
              {d.capabilities.map((c) => (
                <div
                  key={c}
                  className="flex items-start gap-3 rounded-xl border border-line bg-white/[0.03] backdrop-blur-md px-4 py-3.5"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-purple-4/15">
                    <Check className="h-3 w-3 text-purple-4" />
                  </span>
                  <span className="text-base text-fg-muted">{c}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The agent(s) that run this solution */}
      {agents.length > 0 && (
        <section className="border-y border-line bg-bg-1/50 py-16 sm:py-20">
          <div className="container-x">
            <Reveal>
              <SectionHeader title="The agents" accent="on the job." />
            </Reveal>
            <div
              className={`mx-auto mt-12 grid gap-5 ${
                agents.length === 1 ? "max-w-md" : "max-w-4xl sm:grid-cols-2"
              }`}
            >
              {agents.map((a, i) => (
                <Reveal key={a.key} delay={i * 0.08}>
                  <div className="glass glass-hover h-full p-7">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {a.name}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-fg-muted">
                      {a.does}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                      {a.metrics.map((m) => (
                        <div key={m.label}>
                          <div className="text-grad text-xl font-light tracking-tight">
                            {m.value}
                          </div>
                          <div className="mt-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-fg-dim">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
