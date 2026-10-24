import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { SectorIcon } from "@/components/SectorIcon";
import { sectors } from "@/lib/sectors";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Agentra works with global leaders in energy technology, medical technology, semiconductors and agriculture.",
  robots: { index: false, follow: true }, // until the stories are signed off
};

export default function CustomersPage() {
  return (
    <>
      <section className="pt-32 pb-12 sm:pt-36">
        <div className="container-x">
          <h1 className="fade-up max-w-3xl text-balance text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            Customers
          </h1>
          <p className="fade-up mt-5 max-w-[54ch] text-lg leading-relaxed text-fg-muted [animation-delay:80ms]">
            Working with global leaders in energy technology, medical
            technology, semiconductors and agriculture.
          </p>
        </div>
      </section>

      <section className="pb-12">
        <div className="container-x grid gap-5 md:grid-cols-2">
          {sectors.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.08}>
              <Link
                href={`/customers/${s.slug}`}
                className="raised spotlight group flex h-full items-end justify-between gap-6 rounded-[20px] p-7 sm:p-8"
              >
                <div>
                  <span className="flex items-center gap-2 text-sm text-purple-5">
                    <SectorIcon icon={s.icon} />
                    {s.name}
                    {s.focus && <span className="text-fg-dim">/ {s.focus}</span>}
                  </span>
                  <h2 className="mt-3 text-xl font-light leading-snug text-fg transition-colors duration-300 group-hover:text-purple-6 sm:text-2xl">
                    {s.client}
                  </h2>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong text-fg-muted transition-all duration-300 group-hover:border-purple-4/60 group-hover:bg-purple-3/20 group-hover:text-fg">
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
