import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { SectorIcon } from "@/components/SectorIcon";
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
    description: `Agentra works with ${s.client.toLowerCase()}.`,
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
        <div className="container-x">
          <Link
            href="/industries"
            className="fade-up inline-flex items-center gap-1.5 text-sm text-fg-dim transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All industries
          </Link>
          <h1 className="fade-up mt-6 flex items-center gap-4 text-balance text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl [animation-delay:60ms]">
            <SectorIcon icon={s.icon} className="h-8 w-8 text-purple-5" />
            {s.name}
          </h1>
        </div>
      </section>

      {/* The client we work with in this sector */}
      <section className="pb-16">
        <div className="container-x">
          <Reveal>
            <Link
              href={`/customers/${s.slug}`}
              className="raised spotlight group grid items-center gap-8 rounded-[24px] p-6 sm:p-10 md:grid-cols-[1fr_auto]"
            >
              <div>
                <p className="text-sm text-fg-dim">Working with</p>
                <p className="mt-3 max-w-2xl text-2xl font-light leading-snug text-fg transition-colors duration-300 group-hover:text-purple-6 sm:text-3xl">
                  {s.client}
                </p>
                {s.focus && <p className="mt-3 text-base text-fg-muted">{s.focus}</p>}
              </div>
              <span className="grid h-11 w-11 shrink-0 place-items-center self-start rounded-full border border-line-strong text-fg-muted transition-all duration-300 group-hover:border-purple-4/60 group-hover:bg-purple-3/20 group-hover:text-fg md:self-center">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
