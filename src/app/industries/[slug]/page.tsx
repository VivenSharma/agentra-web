import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/CTA";
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
  if (!s) return { title: "Industries" };
  return {
    title: s.name,
    description: s.industry.intro,
    alternates: { canonical: `/industries/${s.slug}` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSector(slug);
  if (!s) notFound();

  return (
    <>
      <section className="pt-32 pb-12 sm:pt-36">
        <div className="container-x grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Link
              href="/industries"
              className="fade-up inline-flex items-center gap-2 text-sm text-purple-5 transition-colors hover:text-purple-6"
            >
              <SectorIcon icon={s.icon} />
              {s.name}
            </Link>
            <h1 className="fade-up mt-5 text-balance text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl [animation-delay:60ms]">
              {s.industry.headline}
            </h1>
            <p className="fade-up mt-5 max-w-[54ch] text-lg leading-relaxed text-fg-muted [animation-delay:120ms]">
              {s.industry.intro}
            </p>
          </div>
          <div className="fade-up lg:col-span-5 [animation-delay:160ms]">
            <CoverArt seed={s.cover} block="br" eager className="aspect-[4/3]" />
          </div>
        </div>
      </section>

      {/* What gets in the way: one raised panel, hairlines between cells */}
      <section className="py-12 sm:py-16">
        <div className="container-x">
          <Reveal>
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl">What gets in the way.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line shadow-[0_30px_80px_-40px_rgba(90,71,148,0.6)] md:grid-cols-3">
              {s.industry.pressures.map((p) => (
                <div key={p.title} className="spotlight group bg-bg-1 p-6 transition-colors duration-300 hover:bg-[#16131e] sm:p-8">
                  <h3 className="text-lg font-medium text-fg transition-colors duration-300 group-hover:text-purple-6">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-fg-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Where agents act: link rows into the solution pages */}
      <section className="py-12 sm:py-16">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl">Where agents act.</h2>
          </Reveal>
          <Reveal delay={0.06} y={16} className="lg:col-span-8">
          <ul className="space-y-2">
            {s.industry.agents.map((a) => (
                <li key={a.title}>
                  <Link
                    href={a.href}
                    className="spotlight group flex items-center justify-between gap-6 rounded-2xl border border-line px-5 py-5 transition-colors duration-300 hover:border-purple-4/40 sm:px-7"
                  >
                    <span>
                      <span className="block text-lg font-medium text-fg transition-colors duration-300 group-hover:text-purple-6">
                        {a.title}
                      </span>
                      <span className="mt-1 block text-base text-fg-muted">{a.body}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-fg-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-purple-5" aria-hidden />
                  </Link>
                </li>
            ))}
          </ul>
          </Reveal>
        </div>
      </section>

      {/* The client story from this sector */}
      <section className="py-12 sm:py-16">
        <div className="container-x">
          <Reveal>
            <Link
              href={`/customers/${s.slug}`}
              className="raised spotlight group grid items-center gap-8 rounded-[24px] p-6 sm:p-10 md:grid-cols-[1fr_auto]"
            >
              <div>
                <p className="text-sm text-fg-dim">Customer story</p>
                <p className="mt-3 max-w-2xl text-2xl font-light leading-snug text-fg transition-colors duration-300 group-hover:text-purple-6 sm:text-3xl">
                  {s.client}
                </p>
              </div>
              <span className="btn-primary inline-flex items-center gap-2 self-start whitespace-nowrap px-6 py-3 text-sm md:self-center">
                Read the story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
