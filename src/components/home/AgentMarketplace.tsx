import { marketplace } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";

export function AgentMarketplace() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="Agent marketplace"
            title="A workforce of specialized"
            accent="supply chain agents."
            sub="Deploy the agents you need, coordinated by orchestrators, all reasoning on the same ontology layer."
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {marketplace.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.06}>
              <div className="group relative h-full bg-bg p-7 transition-colors duration-300 hover:bg-white/[0.03] backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-grad shadow-[0_8px_24px_-8px_rgba(124,58,237,0.3)]">
                    <Icon name={m.icon} className="h-5 w-5 text-white" />
                  </span>
                  <span className="rounded-full border border-line px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-fg-dim">
                    {m.scope}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {m.desc}
                </p>
                <div className="mt-5 h-0.5 w-0 bg-grad transition-all duration-500 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
