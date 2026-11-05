import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
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
        <div className="container-x space-y-4">
          <Reveal>
            <LeadArticle article={lead} />
          </Reveal>
          {rest.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {rest.map((a, i) => (
                <Reveal key={a.url + a.headline} delay={(i % 2) * 0.06}>
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

function Byline({ article: a }: { article: PressArticle }) {
  return (
    <p className="text-sm text-fg-muted">
      <span className="font-semibold text-fg">{a.outlet}</span>
      <span className="mx-2 text-fg-dim" aria-hidden>
        /
      </span>
      <time dateTime={a.date}>{formatPressDate(a.date)}</time>
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
      className="raised spotlight group grid gap-6 rounded-[24px] p-6 sm:p-10 md:grid-cols-12 md:gap-10"
    >
      <div className="md:col-span-4">
        <Byline article={a} />
      </div>
      <div className="md:col-span-8">
        <h2 className="text-2xl font-light leading-snug tracking-tight text-fg transition-colors group-hover:text-purple-6 sm:text-3xl">
          {a.headline}
        </h2>
        {a.excerpt && (
          <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-fg-muted">{a.excerpt}</p>
        )}
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
      className="raised spotlight group flex h-full flex-col rounded-[24px] p-6 sm:p-8"
    >
      <Byline article={a} />
      <h2 className="mt-4 flex-1 text-xl font-light leading-snug tracking-tight text-fg transition-colors group-hover:text-purple-6">
        {a.headline}
      </h2>
      <ReadLink outlet={a.outlet} />
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
