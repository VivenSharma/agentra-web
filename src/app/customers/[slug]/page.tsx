import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Copy } from "@/components/Placeholder";
import { Reveal } from "@/components/Reveal";
import { SectorIcon } from "@/components/SectorIcon";
import { CoverArt } from "@/components/insights/CoverArt";
import { getSector, sectors } from "@/lib/sectors";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSector(slug);
  if (!s) return { title: "Customers" };
  return {
    title: `${s.name} customer story`,
    description: `How ${s.client.toLowerCase()} works with Agentra's agents.`,
    robots: { index: false, follow: true }, // until Marketing signs the story off
  };
}

export default async function CustomerStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSector(slug);
  if (!s) notFound();

  const sections = [
    { title: "The challenge", text: s.story.challenge },
    { title: "What the agents did", text: s.story.actions },
    { title: "The result", text: s.story.result },
  ];
  const others = sectors.filter((o) => o.slug !== s.slug);

  return (
    <>
      <section className="pt-32 pb-10 sm:pt-36">
        <div className="container-x">
          <Link
            href="/customers"
            className="fade-up inline-flex items-center gap-1.5 text-sm text-fg-dim transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All customer stories
          </Link>
          <h1 className="fade-up mt-6 max-w-4xl text-balance text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl [animation-delay:60ms]">
            {s.client}
          </h1>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-x">
          <CoverArt seed={s.cover} block="br" eager className="fade-up aspect-[21/9] [animation-delay:120ms]" />
        </div>
      </section>

      <section className="pb-16">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          {/* At a glance */}
          <aside className="lg:col-span-4">
            <div className="raised rounded-[20px] p-6 lg:sticky lg:top-28">
              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-fg-dim">Industry</dt>
                  <dd className="mt-1">
                    <Link
                      href={`/industries/${s.slug}`}
                      className="inline-flex items-center gap-2 text-fg transition-colors hover:text-purple-6"
                    >
                      <SectorIcon icon={s.icon} className="h-4 w-4 text-purple-5" />
                      {s.name}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-fg-dim">Focus</dt>
                  <dd className="mt-1 text-fg">{s.story.focus}</dd>
                </div>
                <div>
                  <dt className="text-fg-dim">Time to first live agent</dt>
                  <dd className="mt-1 text-fg">[PLACEHOLDER]</dd>
                </div>
              </dl>
            </div>
          </aside>

          {/* The story */}
          <article className="space-y-12 lg:col-span-8">
            <Reveal>
              <Copy text={s.story.headline} className="text-2xl font-light leading-snug text-fg sm:text-3xl" />
            </Reveal>
            {sections.map((sec) => (
              <Reveal key={sec.title}>
                <h2 className="text-xl font-medium text-fg">{sec.title}</h2>
                <div className="mt-4">
                  <Copy text={sec.text} className="max-w-[65ch] text-lg leading-relaxed text-fg-muted" />
                </div>
              </Reveal>
            ))}
            <Reveal>
              <figure className="border-l-2 border-purple-3/60 pl-6">
                <blockquote>
                  <Copy text={s.story.quote} className="text-xl font-light leading-snug text-fg" />
                </blockquote>
                <figcaption className="mt-3 text-sm text-fg-dim">{s.story.attribution}</figcaption>
              </figure>
            </Reveal>
          </article>
        </div>
      </section>

      {/* More stories */}
      <section className="border-t border-line py-14">
        <div className="container-x">
          <h2 className="text-xl font-light text-fg">More customer stories</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/customers/${o.slug}`}
                  className="spotlight group flex h-full items-start gap-3 rounded-2xl border border-line p-5 transition-colors duration-300 hover:border-purple-4/40"
                >
                  <span className="mt-0.5 text-purple-5">
                    <SectorIcon icon={o.icon} />
                  </span>
                  <span className="flex-1 text-sm leading-snug text-fg-muted transition-colors duration-300 group-hover:text-fg">
                    {o.client}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-fg-dim transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-purple-5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
    </>
  );
}
