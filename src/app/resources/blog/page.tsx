import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { CoverArt } from "@/components/insights/CoverArt";
import { AuthorLine } from "@/components/insights/PostCard";
import { PostGrid } from "@/components/insights/PostGrid";
import { posts } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Articles and operator stories on the agentic supply chain: planning, resilience, execution and the agents that act on them.",
  // Placeholder content: keep out of the index until real articles land.
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);
  const operatorStories = posts.filter((p) => p.category === "Operator stories");

  return (
    <>
      {/* Header: left-aligned, compact, so the featured article sits in view */}
      <section className="relative overflow-hidden pt-32 pb-10 sm:pt-36">
        <div
          className="glow -top-24 left-[8%] h-[320px] w-[520px] opacity-20"
          style={{ background: "radial-gradient(circle,#6f57ab,transparent 70%)" }}
        />
        <div className="container-x relative">
          <h1 className="fade-up max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            Insights from the people building the agentic supply chain.
          </h1>
          <p className="fade-up mt-5 max-w-[56ch] text-lg leading-relaxed text-fg-muted [animation-delay:80ms]">
            Short reads on planning, resilience and execution, plus operator
            stories from 25 years on the floor.
          </p>
        </div>
      </section>

      {/* Featured article */}
      <section className="pb-20">
        <div className="container-x">
          <Reveal>
            <Link
              href={`/resources/blog/${featured.slug}`}
              className="group grid items-center gap-8 rounded-[20px] md:grid-cols-12 md:gap-12"
            >
              <CoverArt
                seed={featured.cover.seed}
                block={featured.cover.block}
                className="aspect-[16/10] md:col-span-7"
                eager
              />
              <div className="md:col-span-5">
                <span className="text-sm font-medium text-purple-5">
                  {featured.category}
                </span>
                <h2 className="mt-3 text-3xl font-semibold leading-[1.15] tracking-tight transition-colors group-hover:text-purple-6 sm:text-[2.1rem]">
                  {featured.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-fg-muted">
                  {featured.excerpt}
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  <AuthorLine
                    author={featured.author}
                    date={featured.date}
                    readMins={featured.readMins}
                    size="md"
                  />
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Latest, filterable */}
      <section className="border-t border-line py-20">
        <div className="container-x">
          <h2 className="mb-8 text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
            Latest articles
          </h2>
          <PostGrid posts={rest} />
        </div>
      </section>

      {/* Operator stories series: Lalit's column, set apart from the grid */}
      <section className="py-20">
        <div className="container-x">
          <div className="card overflow-hidden rounded-[20px]">
            <div className="grid md:grid-cols-12">
              <div className="relative min-h-[260px] md:col-span-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/team/lalit.webp"
                  alt="Lalit Das, founder of Agentra"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-[50%_20%] grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/40" />
              </div>
              <div className="p-7 sm:p-10 md:col-span-7">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Operator stories
                </h2>
                <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-fg-muted">
                  Lalit Das on the moments that shaped Agentra: missed cutoffs,
                  silent suppliers and the decisions that waited too long.
                </p>
                <ul className="mt-8 divide-y divide-line border-y border-line">
                  {operatorStories.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/resources/blog/${p.slug}`}
                        className="group flex items-center justify-between gap-6 py-4"
                      >
                        <span className="font-medium transition-colors group-hover:text-purple-6">
                          {p.title}
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple-5" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn: where most readers arrive from, so give them a way back */}
      <section className="pb-8">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 border-t border-line pt-10 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-semibold">New articles every few weeks.</h2>
              <p className="mt-1.5 text-sm text-fg-muted">
                We post them first on LinkedIn.
              </p>
            </div>
            <a
              href="https://www.linkedin.com/company/agentra-ai-bv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-semibold text-fg transition-all hover:border-purple-4/60 hover:bg-white/5 active:scale-[0.98]"
            >
              Follow on LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
