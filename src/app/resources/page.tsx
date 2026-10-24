import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { resourceDoors } from "@/lib/insights-nav";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Whitepapers, blog, podcasts and events on the agentic supply chain.",
  robots: { index: false, follow: true }, // until the resources themselves are published
};

// Resources hub: one door per kind of content.
export default function ResourcesPage() {
  return (
    <>
      <section className="pt-32 pb-12 sm:pt-36">
        <div className="container-x">
          <h1 className="fade-up max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            Perspectives on the agentic supply chain.
          </h1>
          <p className="fade-up mt-5 max-w-[54ch] text-lg leading-relaxed text-fg-muted [animation-delay:80ms]">
            Operator-grade thinking on autonomy, ontology-powered reasoning and
            governed agents. No hype.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resourceDoors.map((d, i) => (
            <Reveal key={d.href} delay={i * 0.06}>
              <Link href={d.href} className="raised spotlight group flex h-full flex-col rounded-[20px] p-7">
                <h2 className="text-xl font-semibold transition-colors group-hover:text-purple-6">
                  {d.label}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
                  {d.desc}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
                  {d.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
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
