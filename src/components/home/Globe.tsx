"use client";

import { locations } from "@/lib/content";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";
import { WorldMap } from "@/components/viz/WorldMap";

export function Globe() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Global by design"
            title="Close to your operations,"
            accent="worldwide."
            sub="Agentra runs where your supply chain does, with teams across Europe, the Middle East, India and North America."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mx-auto mt-12 max-w-4xl">
            <div
              className="glow left-1/2 top-1/2 h-[320px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-15"
              style={{
                background: "radial-gradient(circle,#5a4794,transparent 70%)",
              }}
            />
            {/* fade the dotted map into pure black on all four sides */}
            <div
              style={{
                maskImage:
                  "radial-gradient(ellipse 78% 82% at 50% 50%, #000 42%, transparent 88%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 78% 82% at 50% 50%, #000 42%, transparent 88%)",
              }}
            >
              <WorldMap />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
            {locations.map((l) => (
              <div
                key={l.city}
                className="glass glass-hover px-5 py-4 text-center"
              >
                <div className="whitespace-nowrap text-sm font-bold">
                  {l.city}
                </div>
                <div className="mt-0.5 text-xs text-fg-dim">{l.role}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
