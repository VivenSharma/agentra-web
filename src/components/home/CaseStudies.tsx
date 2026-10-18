import { caseStudies } from "@/lib/content";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";

export function CaseStudies() {
  return (
    <section className="relative border-y border-line bg-bg-1/50 py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="Proof"
            title="Outcomes across live"
            accent="deployments."
            sub="Industry and problem only. Results shown as ranges across deployments, never single point estimates."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {caseStudies.map((c, i) => (
            <Reveal key={c.industry} delay={i * 0.08}>
              <div className="glass glass-hover flex h-full flex-col p-7">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-purple-5">
                    {c.industry}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold">{c.problem}</h3>

                <div className="mt-6 space-y-4 border-t border-line pt-6">
                  {c.results.map((r) => (
                    <div key={r.label}>
                      <div className="text-2xl font-semibold tracking-tight text-grad">
                        {r.value}
                      </div>
                      <div className="mt-0.5 text-xs uppercase tracking-wider text-fg-dim">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
