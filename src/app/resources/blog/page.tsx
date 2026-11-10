import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { DisruptionCheck } from "@/components/blog/DisruptionCheck";
import { articles, type Article } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Perspectives on the agentic supply chain from the team building it.",
};

const href = (a: Article) => `/resources/blog/${a.slug}`;

function Meta({ a, latest }: { a: Article; latest?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
      {latest && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-3/20 px-3 py-1 text-xs font-semibold text-purple-6 ring-1 ring-purple-4/40">
          {/* live: the most recently published post */}
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-5 opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-purple-5" />
          </span>
          Latest
        </span>
      )}
      {a.tag && <span className="font-semibold text-purple-5">{a.tag}</span>}
      <span className="text-fg-dim">{a.readMins} min read</span>
    </div>
  );
}

// Covers always show whole, at their own shape: several carry text in the
// art, so they are never cropped to fit a frame.
function Cover({ a, sizes, className = "", priority }: { a: Article; sizes: string; className?: string; priority?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[18px] ring-1 ring-white/10 ${className}`}>
      <Image
        src={a.cover.src}
        alt={a.cover.alt}
        width={a.cover.width}
        height={a.cover.height}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
      />
      {/* a light sweep across the cover on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full motion-reduce:hidden"
      />
    </div>
  );
}

function ReadMore() {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
      Read article
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </span>
  );
}

export default function BlogPage() {
  const [latest, ...rest] = articles;
  // the article the Disruption Check belongs to
  const quizHome = articles.find((a) => a.body.some((b) => b.type === "quiz"));

  return (
    <>
      <PageHero
        eyebrow="Resources · Blog"
        title="Short reads,"
        accent="operator depth."
        sub="Perspectives on the agentic supply chain from the team building it."
      />

      <section className="pb-12 sm:pb-16">
        <div className="container-x space-y-5">
          {/* the newest post, featured */}
          {latest && (
            <Reveal>
              <Link
                href={href(latest)}
                className="raised spotlight group grid items-center gap-6 rounded-[28px] p-3 lg:grid-cols-[1.3fr_1fr] lg:gap-10"
              >
                <Cover a={latest} priority sizes="(min-width: 1024px) 720px, 100vw" />
                <div className="px-4 pb-5 lg:px-0 lg:pb-0 lg:pr-8">
                  <Meta a={latest} latest />
                  <h2 className="mt-5 text-balance text-3xl font-light leading-[1.15] tracking-[-0.015em] text-fg transition-colors duration-300 group-hover:text-purple-6 sm:text-[2.1rem]">
                    {latest.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-fg-muted">{latest.dek}</p>
                  <div className="mt-8">
                    <ReadMore />
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* every other post, newest first, as a row: whole cover left, text right */}
          {rest.map((a, k) => (
            <Reveal key={a.slug} delay={Math.min(k, 3) * 0.06}>
              <Link
                href={href(a)}
                className="raised spotlight group grid items-center gap-6 rounded-[24px] p-3 md:grid-cols-[1fr_1.1fr] md:gap-10"
              >
                <Cover a={a} sizes="(min-width: 768px) 560px, 100vw" />
                <div className="px-4 pb-5 md:px-0 md:pb-0 md:pr-8">
                  <Meta a={a} />
                  <h2 className="mt-4 text-2xl font-light leading-snug text-fg transition-colors duration-300 group-hover:text-purple-6 sm:text-[1.7rem]">
                    {a.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-fg-muted">{a.dek}</p>
                  <div className="mt-6">
                    <ReadMore />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* the Disruption Check, under the posts */}
      <section className="pb-16 sm:pb-24">
        <div className="container-x">
          <Reveal>
            <DisruptionCheck />
          </Reveal>
          {quizHome && (
            <p className="mt-5 text-center text-sm text-fg-dim">
              From the article{" "}
              <Link href={href(quizHome)} className="inline-flex items-center gap-1 text-purple-5 underline decoration-purple-4/40 underline-offset-4 transition-colors hover:text-purple-6">
                {quizHome.title}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
            </p>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
