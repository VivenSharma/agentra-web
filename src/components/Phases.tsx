import { phases } from "@/lib/content";
import { SectionHeader, Pill } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";

export function Phases() {
  return (
    <section className="relative border-y border-line bg-bg-1/50 py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="How we engage"
            title="Land in weeks."
            accent="Expand from there."
            sub="A proven land-and-expand model. First a production agent against a real outcome, then scale across the enterprise."
          />
        </Reveal>

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-purple-4/40 to-transparent md:block" />
          <div className="grid gap-6 md:grid-cols-3">
            {phases.map((p, i) => (
              <Reveal key={p.phase} delay={i * 0.1}>
                <div className="relative">
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-grad text-2xl font-semibold text-white shadow-[0_10px_40px_-10px_rgba(124,58,237,0.32)]">
                    {i + 1}
                  </div>
                  <div className="glass mt-6 p-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Pill soft>{p.label}</Pill>
                      <span className="text-xs text-fg-dim">{p.time}</span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
