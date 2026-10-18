import type { Metadata } from "next";
import { ArrowUpRight, FileText } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { Pill } from "@/components/ui/Primitives";
import { whitepapers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Whitepapers",
  description:
    "Deep-dive research on the agentic supply chain: autonomy, ontology-powered reasoning and governance.",
};

export default function WhitepapersPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources · Whitepapers"
        title="Deep dives on"
        accent="the agentic supply chain."
        sub="Research-grade perspectives for supply chain, data and transformation leaders."
      />
      <section className="py-12 sm:py-16">
        <div className="container-x grid gap-4 md:grid-cols-2">
          {whitepapers.map((w, i) => (
            <Reveal key={w.title} delay={(i % 2) * 0.08}>
              <div className="glass glass-hover group flex h-full flex-col p-8">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-purple-4/25 bg-purple-4/10">
                    <FileText className="h-5 w-5 text-purple-5" />
                  </span>
                  <Pill soft>{w.meta}</Pill>
                </div>
                <h2 className="mt-5 text-xl font-bold leading-snug">{w.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                  {w.desc}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-purple-5">
                  Download
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
