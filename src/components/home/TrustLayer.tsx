import { trust } from "@/lib/content";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";
import { ShieldCheck } from "lucide-react";

function LogoRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="grid gap-4 py-6 md:grid-cols-[200px_1fr] md:items-center">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-fg-dim">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4 sm:gap-x-12">
        {items.map((n) => (
          <span
            key={n}
            className="select-none text-lg font-bold tracking-tight text-fg-muted/70 transition-colors hover:text-fg sm:text-xl"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

export function TrustLayer() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="Trust layer"
            title="Agnostic by design,"
            accent="enterprise by default."
            sub="ERP-agnostic, LLM-agnostic, and cloud-agnostic. Agentra integrates with the stack you already run and the models you already trust."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 divide-y divide-line rounded-2xl border border-line px-6 sm:px-8">
            <LogoRow label="Enterprise integrations" items={trust.integrations} />
            <LogoRow label="LLM providers" items={trust.llms} />
            <LogoRow label="Cloud providers" items={trust.clouds} />
            <div className="grid gap-4 py-6 md:grid-cols-[200px_1fr] md:items-center">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-fg-dim">
                Compliance
              </span>
              <div className="flex flex-wrap gap-3">
                {trust.compliance.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] backdrop-blur-md px-4 py-2 text-sm font-semibold text-fg"
                  >
                    <ShieldCheck className="h-4 w-4 text-purple-5" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* delivery guarantee callout */}
        <Reveal delay={0.15}>
          <div className="relative mt-6 overflow-hidden rounded-2xl border border-purple-4/30 p-8 text-center sm:p-10">
            <div className="absolute inset-0 bg-grad opacity-90" />
            <p className="relative text-xl font-semibold text-white sm:text-2xl">
              {trust.guarantee}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
