import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { SectorIcon } from "@/components/SectorIcon";
import { CoverArt } from "@/components/insights/CoverArt";
import { isPlaceholder, sectors } from "@/lib/sectors";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "How supply chain teams in energy technology, medical technology, semiconductors and agriculture put governed agents to work.",
  robots: { index: false, follow: true }, // until the stories are signed off
};

export default function CustomersPage() {
  return (
    <>
      <section className="pt-32 pb-12 sm:pt-36">
        <div className="container-x">
          <h1 className="fade-up max-w-3xl text-balance text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            Supply chain teams, putting agents to work.
          </h1>
          <p className="fade-up mt-5 max-w-[54ch] text-lg leading-relaxed text-fg-muted [animation-delay:80ms]">
            Global leaders in energy technology, medical technology,
            semiconductors and agriculture.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-x grid gap-5 md:grid-cols-2">
          {sectors.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.08}>
              <Link
                href={`/customers/${s.slug}`}
                className="raised spotlight group flex h-full flex-col rounded-[20px] p-3"
              >
                <CoverArt seed={s.cover} block="band" className="aspect-[16/9]" />
                <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
                  <span className="flex items-center gap-2 text-sm text-purple-5">
                    <SectorIcon icon={s.icon} />
                    {s.name}
                    {!isPlaceholder(s.story.focus) && (
                      <span className="text-fg-dim">/ {s.story.focus}</span>
                    )}
                  </span>
                  <h2 className="mt-3 flex-1 text-xl font-light leading-snug text-fg transition-colors duration-300 group-hover:text-purple-6 sm:text-2xl">
                    {s.client}
                  </h2>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
                    Read the story
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
