import { Reveal } from "@/components/Reveal";
import { ScrollRevealText } from "@/components/ScrollRevealText";
import { Radar, Brain, Zap } from "lucide-react";

/* ---------------------------------------------------------------
   The reality — a single, quiet, confident statement of the problem
   --------------------------------------------------------------- */
export function Manifesto() {
  return (
    <section className="relative py-28 sm:py-40">
      <div className="container-x">
        <ScrollRevealText
          as="h2"
          text="Most supply chains still wait for someone to notice, decide, and react. By then, the disruption has already become a cost."
          className="mx-auto max-w-4xl text-center text-[1.8rem] font-light leading-[1.3] tracking-[-0.01em] sm:text-[2.5rem] sm:leading-[1.25]"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-center text-lg leading-relaxed text-fg-muted">
            Dashboards tell you what happened. Agentra acts on it, in the moment
            it matters.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   The shift — sense, decide, act. Three light cards, no clutter.
   --------------------------------------------------------------- */
const steps = [
  {
    icon: Radar,
    title: "Sense",
    body: "Agents watch every signal across your systems and the world beyond them, and notice what a person would miss.",
  },
  {
    icon: Brain,
    title: "Decide",
    body: "They reason over the trade-offs the way your best planner would, then choose the move with your policy as the guardrail.",
  },
  {
    icon: Zap,
    title: "Act",
    body: "They execute inside the tools you already run, from replanning to reordering, and leave a trail you can audit.",
  },
];

export function TheShift() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <ScrollRevealText
              as="h2"
              text="From tools that report to agents that act."
              className="text-3xl font-light leading-[1.1] tracking-[-0.02em] sm:text-[2.6rem]"
            />
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-fg-muted">
              Agentra closes the loop between insight and action.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={0.1 * i}>
              <div className="card card-hover group h-full rounded-2xl p-7">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-fg-muted transition-all duration-300 group-hover:scale-110 group-hover:border-purple-4/60 group-hover:text-purple-5">
                  <s.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 text-xl font-medium text-fg">{s.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-fg-muted">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
