import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { Pill } from "@/components/ui/Primitives";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Perspectives on the agentic supply chain from the team building it.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources · Blog"
        title="Short reads,"
        accent="operator depth."
        sub="Perspectives on the agentic supply chain from the team building it."
      />
      <section className="py-12 sm:py-16">
        <div className="container-x grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.06}>
              <div className="glass glass-hover group flex h-full flex-col p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-5">
                    {b.tag}
                  </span>
                  <Pill soft>{b.meta}</Pill>
                </div>
                <h2 className="mt-5 text-lg font-bold leading-snug">{b.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                  {b.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
