import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, Newspaper } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import {
  formatPressDate,
  hasPress,
  isPressPreview,
  pressFeed,
  type PressArticle,
} from "@/lib/press";

export const metadata: Metadata = {
  title: "Press",
  description: "Agentra in the media: coverage of our work on agentic AI for supply chain.",
};

export default function PressPage() {
  // Hidden until there is real coverage to list.
  if (!hasPress) notFound();

  const [lead, ...rest] = pressFeed;

  return (
    <>
      <section className="pt-32 pb-12 sm:pt-36">
        <div className="container-x">
          {isPressPreview && (
            <p className="mb-6 inline-flex rounded-full border border-purple-4/40 bg-purple-3/10 px-3 py-1 text-xs font-medium text-purple-6">
              Local preview with sample entries. Not shown in production.
            </p>
          )}
          <h1 className="fade-up max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            Agentra in the news.
          </h1>
          <p className="fade-up mt-5 max-w-[54ch] text-lg leading-relaxed text-fg-muted [animation-delay:80ms]">
            Coverage of our work on agentic AI for supply chain.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x space-y-5">
          <Reveal>
            <LeadArticle article={lead} />
          </Reveal>
          {rest.length > 0 && (
            // three cards sit in one row; otherwise pairs, so no card is left alone
            <div className={`grid gap-5 ${rest.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
              {rest.map((a, i) => (
                <Reveal key={a.url + a.headline} delay={i * 0.06} className="h-full">
                  <ArticleCard article={a} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}

/* The card's picture, always the same frame per card:
   - photo: the article's own image, filling the frame (the lead card uses
     the image's own shape, so nothing is cut off)
   - portrait: a square headshot, shown whole on the branded panel
   - logo: the outlet's logo on the branded panel
   - otherwise the outlet's name on the branded panel */
function Visual({ article: a, large }: { article: PressArticle; large?: boolean }) {
  const img = a.image;
  const natural = large && img && img.kind !== "portrait";
  return (
    <div
      className={`relative overflow-hidden rounded-[18px] ring-1 ring-white/10 ${natural ? "" : "aspect-[16/9]"}`}
      style={natural ? { aspectRatio: `${img.width} / ${img.height}` } : undefined}
    >
      {img && img.kind !== "portrait" ? (
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes={large ? "(min-width: 768px) 640px, 100vw" : "(min-width: 1024px) 400px, 100vw"}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      ) : (
        <div className="press-panel absolute inset-0 flex gap-4 p-4 sm:p-5">
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 ring-1 ring-white/25">
              <Newspaper className="h-[18px] w-[18px] text-white" strokeWidth={1.75} aria-hidden />
            </span>
            {a.logo ? (
              <span className={`inline-flex w-fit ${a.logo.plate ? "rounded-xl bg-white px-4 py-3 shadow-[0_10px_30px_-12px_rgba(20,10,40,0.6)]" : ""}`}>
                <Image
                  src={a.logo.src}
                  alt={a.outlet}
                  width={a.logo.width}
                  height={a.logo.height}
                  className={`h-auto ${large ? "w-60" : "w-48"}`}
                />
              </span>
            ) : (
              <span className={`font-semibold leading-[1.05] tracking-[-0.03em] text-white ${img ? "text-lg sm:text-2xl" : large ? "text-4xl sm:text-5xl" : "text-3xl"}`}>
                {a.outlet}
              </span>
            )}
          </div>
          {/* a square headshot, framed whole beside the outlet name */}
          {img && (
            <div className="relative aspect-square h-full shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/30 shadow-[0_18px_40px_-16px_rgba(20,10,40,0.7)]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={large ? "360px" : "(min-width: 1024px) 200px, 50vw"}
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Outlet, date and author.
function Byline({ article: a }: { article: PressArticle }) {
  return (
    <p className="text-sm text-fg-muted">
      <span className="font-semibold text-fg">{a.outlet}</span>
      {a.date && (
        <>
          <span className="mx-2 text-fg-dim" aria-hidden>
            /
          </span>
          <time dateTime={a.date}>{formatPressDate(a.date)}</time>
        </>
      )}
      {a.author && <span className="mt-1 block text-fg-dim">By {a.author}</span>}
    </p>
  );
}

// The newest piece gets the full width.
function LeadArticle({ article: a }: { article: PressArticle }) {
  return (
    <a
      href={a.url}
      target="_blank"
      rel="noopener noreferrer"
      className="raised spotlight group grid items-center gap-6 rounded-[28px] p-3 md:grid-cols-[1.1fr_1fr] md:gap-10"
    >
      <Visual article={a} large />
      <div className="px-4 pb-5 md:px-0 md:pb-0 md:pr-8">
        <Byline article={a} />
        <h2 className="mt-4 text-balance text-2xl font-light leading-snug tracking-tight text-fg transition-colors group-hover:text-purple-6 sm:text-3xl">
          {a.headline}
        </h2>
        {a.excerpt && <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-fg-muted">{a.excerpt}</p>}
        <ReadLink outlet={a.outlet} />
      </div>
    </a>
  );
}

function ArticleCard({ article: a }: { article: PressArticle }) {
  return (
    <a
      href={a.url}
      target="_blank"
      rel="noopener noreferrer"
      className="raised spotlight group flex h-full flex-col rounded-[24px] p-3"
    >
      <Visual article={a} />
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <Byline article={a} />
        <h2 className="mt-3 flex-1 text-xl font-light leading-snug tracking-tight text-fg transition-colors group-hover:text-purple-6">
          {a.headline}
        </h2>
        <ReadLink outlet={a.outlet} />
      </div>
    </a>
  );
}

function ReadLink({ outlet }: { outlet: string }) {
  return (
    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-purple-5 transition-colors group-hover:text-purple-6">
      Read on {outlet}
      <ArrowUpRight
        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden
      />
    </span>
  );
}
