import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { ArticleEmbed } from "@/components/ArticleEmbed";
import { ArticleToc } from "@/components/blog/ArticleToc";
import { DisruptionCheck } from "@/components/blog/DisruptionCheck";
import { Inline } from "@/components/blog/Inline";
import { ProofCards } from "@/components/blog/ProofCards";
import { DelayChain } from "@/components/viz/DelayChain";
import { FreightLevels } from "@/components/viz/FreightLevels";
import { GovernedExecution } from "@/components/viz/GovernedExecution";
import { ReplenishmentLoop } from "@/components/viz/ReplenishmentLoop";
import { articles, getArticle, type Block } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return { title: "Blog" };
  return {
    title: a.seoTitle ?? a.title,
    description: a.description ?? a.dek,
    alternates: { canonical: `/resources/blog/${a.slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.dek,
      images: [{ url: a.cover.src, width: a.cover.width, height: a.cover.height, alt: a.cover.alt }],
    },
  };
}

// Section headings get an id so the "On this page" list can link to them
const slugify = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const vizMap = {
  "replenishment-loop": ReplenishmentLoop,
  "freight-levels": FreightLevels,
  "delay-chain": DelayChain,
  "governed-execution": GovernedExecution,
};

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "h2":
      return (
        <h2 id={slugify(b.text)} className="scroll-mt-28 pt-6 text-2xl font-light leading-snug tracking-tight text-fg sm:text-3xl">
          {b.text}
        </h2>
      );
    case "h3":
      return <h3 className="pt-2 text-lg font-medium text-fg">{b.text}</h3>;
    case "p":
      return (
        <p>
          <Inline text={b.text} />
        </p>
      );
    case "cta":
      return (
        <p className="!mt-14 border-t border-white/10 pt-10">
          <Inline text={b.text} />
        </p>
      );
    case "list": {
      const items = b.items.map((t) => (
        <li key={t}>
          <Inline text={t} />
        </li>
      ));
      return b.ordered ? (
        <ol className="list-decimal space-y-2 pl-6 marker:text-purple-5">{items}</ol>
      ) : (
        <ul className="list-disc space-y-2 pl-6 marker:text-purple-5">{items}</ul>
      );
    }
    case "quote":
      return (
        <blockquote className="border-l-2 border-purple-4/60 py-1 pl-6 text-xl font-light leading-snug text-fg sm:text-2xl">
          {b.text}
        </blockquote>
      );
    case "figure":
      return (
        <figure className="py-2">
          <Image
            src={b.src}
            alt={b.alt}
            width={b.width}
            height={b.height}
            sizes="(min-width: 860px) 760px, 100vw"
            className="h-auto w-full rounded-2xl ring-1 ring-white/10"
          />
          {b.caption && <figcaption className="mt-3 text-sm text-fg-dim">{b.caption}</figcaption>}
        </figure>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl ring-1 ring-white/10">
          <table className="w-full min-w-[560px] text-left text-base">
            <thead className="bg-white/[0.04] text-sm text-fg">
              <tr>
                {b.head.map((h) => (
                  <th key={h} className="px-5 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {b.rows.map((r) => (
                <tr key={r[0]}>
                  {r.map((c, i) => (
                    <td key={i} className={`px-5 py-4 align-top ${i === 0 ? "font-medium text-fg" : ""}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "embed":
      return <ArticleEmbed src={b.src} title={b.title} />;
    case "viz": {
      const Viz = vizMap[b.name];
      return (
        <div className="py-2">
          <Viz />
        </div>
      );
    }
    case "proof":
      return <ProofCards items={b.items} />;
    case "quiz":
      // rendered full width after the article body
      return null;
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const toc = a.body.flatMap((b) => (b.type === "h2" ? [{ id: slugify(b.text), text: b.text }] : []));
  const hasQuiz = a.body.some((b) => b.type === "quiz");
  // the next two articles in the list, wrapping round
  const at = articles.findIndex((x) => x.slug === a.slug);
  const more = [1, 2].map((k) => articles[(at + k) % articles.length]).filter((x) => x.slug !== a.slug);

  return (
    <>
      <article className="pt-32 pb-16 sm:pt-36">
        <header className="container-x">
          <div className="mx-auto max-w-[760px]">
            <Link
              href="/resources/blog"
              className="fade-up inline-flex items-center gap-1.5 text-sm text-fg-dim transition-colors hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Blog
            </Link>
            {a.tag && (
              <p className="fade-up mt-8 text-xs font-semibold uppercase tracking-wider text-purple-5 [animation-delay:40ms]">
                {a.tag}
              </p>
            )}
            <h1 className={`fade-up ${a.tag ? "mt-4" : "mt-8"} text-balance text-4xl font-light leading-[1.1] tracking-[-0.02em] sm:text-5xl [animation-delay:80ms]`}>
              {a.title}
            </h1>
            <p className="fade-up mt-5 text-lg leading-relaxed text-fg-muted [animation-delay:120ms]">{a.dek}</p>
            <p className="fade-up mt-5 text-sm text-fg-dim [animation-delay:140ms]">{a.readMins} min read</p>
          </div>
        </header>

        <div className="container-x mt-10">
          <div className="mx-auto max-w-[1000px]">
            <div className="fade-up overflow-hidden rounded-[24px] ring-1 ring-white/10 shadow-[0_40px_120px_-60px_rgba(128,85,226,0.8)] [animation-delay:160ms]">
              <Image
                src={a.cover.src}
                alt={a.cover.alt}
                width={a.cover.width}
                height={a.cover.height}
                priority
                sizes="(min-width: 1100px) 1000px, 100vw"
                className="ken-burns h-auto w-full"
              />
            </div>
          </div>
        </div>

        <div className="container-x mt-12">
          <div className="mx-auto grid max-w-[760px] gap-12 xl:max-w-[1080px] xl:grid-cols-[220px_760px] xl:justify-between">
            <aside className="hidden xl:block">
              <ArticleToc items={toc} cta={hasQuiz ? { id: "disruption-check", text: "Take the 3-minute check" } : undefined} />
            </aside>
            <div className="min-w-0 space-y-6 text-lg leading-relaxed text-fg-muted">
              {a.body.map((b, i) => (
                <BlockView key={i} b={b} />
              ))}
            </div>
          </div>
        </div>

        {hasQuiz && (
          <div className="container-x mt-16">
            <div className="mx-auto max-w-[1080px]">
              <DisruptionCheck />
            </div>
          </div>
        )}

        {a.banner && (
          <div className="container-x mt-12">
            <div className="mx-auto max-w-[1000px]">
              <Image
                src={a.banner.src}
                alt={a.banner.alt}
                width={a.banner.width}
                height={a.banner.height}
                sizes="(min-width: 1100px) 1000px, 100vw"
                className="h-auto w-full rounded-[24px] ring-1 ring-white/10"
              />
            </div>
          </div>
        )}

        {a.about && (
          <aside className="container-x mt-12">
            <div className="raised mx-auto max-w-[760px] rounded-[20px] p-7 sm:p-8">
              <h2 className="text-base font-semibold text-fg">About Agentra</h2>
              <p className="mt-3 text-base leading-relaxed text-fg-muted">
                <Inline text={a.about} />
              </p>
              <p className="mt-4 text-base font-semibold text-fg">You stay in command.</p>
            </div>
          </aside>
        )}
      </article>

      {more.length > 0 && (
        <section aria-labelledby="keep-reading" className="pb-8">
          <div className="container-x">
            <div className="mx-auto max-w-[1080px]">
              <h2 id="keep-reading" className="text-2xl font-light tracking-tight text-fg">Keep reading</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {more.map((m, k) => (
                  <Reveal key={m.slug} delay={k * 0.08}>
                    <Link href={`/resources/blog/${m.slug}`} className="raised spotlight group flex h-full flex-col overflow-hidden rounded-[22px]">
                      <div className="overflow-hidden">
                        <Image
                          src={m.cover.src}
                          alt={m.cover.alt}
                          width={m.cover.width}
                          height={m.cover.height}
                          sizes="(min-width: 768px) 520px, 100vw"
                          className="h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <p className="text-sm text-fg-dim">{m.readMins} min read</p>
                        <h3 className="mt-2 text-xl font-light leading-snug text-fg transition-colors duration-300 group-hover:text-purple-6">{m.title}</h3>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-fg">
                          Read article
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <CTA />
    </>
  );
}
