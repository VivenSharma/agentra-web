import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CTA } from "@/components/CTA";
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
  if (!s) return { title: "Customers" };
  return {
    title: `${s.name} customer`,
    description: `Agentra works with ${s.client.toLowerCase()}.`,
    robots: { index: false, follow: true }, // until Marketing signs the story off
  };
}

// Only confirmed facts for now; the full story (challenge, what the agents
// did, result, quote) goes here once Marketing signs it off.
export default async function CustomerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSector(slug);
  if (!s) notFound();

  const others = sectors.filter((o) => o.slug !== s.slug);

  return (
    <>
      <section className="pt-32 pb-12 sm:pt-36">
        <div className="container-x">
          <Link
            href="/customers"
            className="fade-up inline-flex items-center gap-1.5 text-sm text-fg-dim transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            All customers
          </Link>
          <h1 className="fade-up mt-6 max-w-4xl text-balance text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl [animation-delay:60ms]">
            {s.client}
          </h1>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-x">
          <dl className="fade-up raised grid gap-6 rounded-[20px] p-7 text-sm sm:grid-cols-2 sm:p-9 [animation-delay:120ms]">
            <div>
              <dt className="text-fg-dim">Industry</dt>
              <dd className="mt-1">
                <Link
                  href={`/industries/${s.slug}`}
                  className="inline-flex items-center gap-2 text-lg text-fg transition-colors hover:text-purple-6"
                >
                  <SectorIcon icon={s.icon} className="h-4 w-4 text-purple-5" />
                  {s.name}
                </Link>
              </dd>
            </div>
            {s.focus && (
              <div>
                <dt className="text-fg-dim">Focus</dt>
                <dd className="mt-1 text-lg text-fg">{s.focus}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {/* Other customers */}
      <section className="border-t border-line py-14">
        <div className="container-x">
          <h2 className="text-xl font-light text-fg">More customers</h2>
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
