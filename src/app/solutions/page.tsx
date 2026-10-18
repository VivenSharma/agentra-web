import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/Reveal";
import { Phases } from "@/components/Phases";
import { SupplyChainFlow } from "@/components/home/SupplyChainFlow";
import { CTA } from "@/components/CTA";
import { solutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Planning, Resilience, Execution and Orchestration. Four functions, one autonomous loop across your supply chain.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="From decision to action,"
        accent="across every function."
        sub="Agentra's agents work across planning, resilience, execution and orchestration, reasoning together and acting inside the systems you already run."
      />

      <section className="py-12 sm:py-16">
        <div className="container-x grid gap-4 md:grid-cols-2">
          {solutions.map((s, idx) => (
            <Reveal key={s.slug} delay={(idx % 2) * 0.08}>
              <Link
                href={`/solutions/${s.slug}`}
                className="glass glass-hover group flex h-full flex-col p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-grad shadow-[0_8px_24px_-8px_rgba(124,58,237,0.3)]">
                    <Icon name={s.icon} className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                      {s.title}
                    </h2>
                    <p className="text-sm text-purple-5">{s.tagline}</p>
                  </div>
                </div>
                <p className="mt-5 flex-1 leading-relaxed text-fg-muted">
                  {s.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-5">
                  Explore {s.title}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <SupplyChainFlow />
      <Phases />
      <CTA
        title="Which function should act first?"
        sub="Tell us where the pain is. We pick the highest-leverage agent to prove value fast."
      />
    </>
  );
}
