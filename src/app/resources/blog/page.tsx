import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { Pill } from "@/components/ui/Primitives";
import { articles } from "@/lib/articles";
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
      {/* Published articles, newest first */}
      <section className="pt-12 sm:pt-16">
        <div className="container-x space-y-4">
          {articles.map((a) => (
            <Reveal key={a.slug}>
              <Link
                href={`/resources/blog/${a.slug}`}
                className="raised spotlight group grid items-center gap-6 rounded-[24px] p-3 md:grid-cols-[1.1fr_1fr] md:gap-10"
              >
                <div className="overflow-hidden rounded-[18px] ring-1 ring-white/10">
                  <Image
                    src={a.cover.src}
                    alt={a.cover.alt}
                    width={a.cover.width}
                    height={a.cover.height}
                    sizes="(min-width: 768px) 600px, 100vw"
                    className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-4 pb-5 md:px-0 md:pb-0 md:pr-8">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-5">{a.tag}</span>
                    <Pill soft>Article · {a.readMins} min</Pill>
                  </div>
                  <h2 className="mt-4 text-2xl font-light leading-snug text-fg transition-colors duration-300 group-hover:text-purple-6 sm:text-3xl">
                    {a.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-fg-muted">{a.dek}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

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
