import type { Metadata } from "next";
import { Play } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { podcasts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Podcasts",
  description:
    "Conversations on the shift from automation to autonomy in the supply chain.",
};

export default function PodcastsPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources · Podcasts"
        title="Conversations on"
        accent="autonomy."
        sub="Operators, engineers and leaders on building the agentic supply chain."
      />
      <section className="py-12 sm:py-16">
        <div className="container-x space-y-4">
          {podcasts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="glass glass-hover group flex items-center gap-6 p-6">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-grad shadow-[0_8px_24px_-8px_rgba(124,58,237,0.3)] transition-transform group-hover:scale-105">
                  <Play className="h-5 w-5 fill-white text-white" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold uppercase tracking-wider text-purple-5">
                    {p.meta}
                  </div>
                  <h2 className="mt-1 truncate text-lg font-bold">{p.title}</h2>
                  <p className="mt-0.5 truncate text-sm text-fg-muted">
                    {p.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
