import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { CoverArt } from "@/components/insights/CoverArt";
import { insightDoors } from "@/lib/insights-nav";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Articles, events and customer stories on the agentic supply chain.",
  robots: { index: false, follow: true }, // placeholder until content lands
};

// Insights hub: one door per kind of content, as proposed (Jasper's
// resources page works the same way).
export default function ResourcesPage() {
  return (
    <>
      <section className="pt-32 pb-12 sm:pt-36">
        <div className="container-x">
          <h1 className="fade-up max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            Perspectives on the agentic supply chain.
          </h1>
          <p className="fade-up mt-5 max-w-[54ch] text-lg leading-relaxed text-fg-muted [animation-delay:80ms]">
            Operator-grade thinking, the rooms we gather in, and the teams
            already running agents.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-x grid gap-x-6 gap-y-12 md:grid-cols-3">
          {insightDoors.map((d, i) => (
            <Reveal key={d.href} delay={i * 0.08}>
              <Link href={d.href} className="group flex h-full flex-col">
                <CoverArt
                  seed={d.cover.seed}
                  src={d.cover.src}
                  block={d.cover.block}
                  className="aspect-[4/3]"
                />
                <h2 className="mt-5 text-xl font-semibold transition-colors group-hover:text-purple-6">
                  {d.label}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
                  {d.desc}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
                  {d.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
