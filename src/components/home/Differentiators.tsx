import { differentiators } from "@/lib/content";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";

function DiffViz({ i }: { i: number }) {
  if (i === 0)
    // vertical: one deep column highlighted among shallow ones
    return (
      <svg viewBox="0 0 160 90" className="w-full">
        {[0, 1, 2, 3].map((k) => (
          <rect
            key={k}
            x={12 + k * 38}
            y={k === 2 ? 8 : 54}
            width="24"
            height={k === 2 ? 74 : 28}
            rx="4"
            fill={k === 2 ? "url(#dg)" : "rgba(255,255,255,0.06)"}
          />
        ))}
        <defs>
          <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8570bf" />
            <stop offset="1" stopColor="#5a4794" />
          </linearGradient>
        </defs>
      </svg>
    );
  if (i === 1)
    // ontology: connected graph
    return (
      <svg viewBox="0 0 160 90" className="w-full">
        {[
          [80, 45],
          [30, 22],
          [130, 25],
          [35, 70],
          [125, 68],
        ].map(([x, y], k) =>
          k === 0 ? null : (
            <line
              key={k}
              x1={80}
              y1={45}
              x2={x}
              y2={y}
              stroke="rgba(139,92,246,0.3)"
              strokeWidth="1"
            />
          )
        )}
        {[
          [80, 45, 10],
          [30, 22, 6],
          [130, 25, 6],
          [35, 70, 6],
          [125, 68, 6],
        ].map(([x, y, r], k) => (
          <circle
            key={k}
            cx={x}
            cy={y}
            r={r}
            fill={k === 0 ? "url(#dg2)" : "#1a1a2b"}
            stroke="rgba(139,92,246,0.5)"
            strokeWidth="1"
          />
        ))}
        <defs>
          <radialGradient id="dg2">
            <stop offset="0" stopColor="#8570bf" />
            <stop offset="1" stopColor="#5a4794" />
          </radialGradient>
        </defs>
      </svg>
    );
  // probabilistic: distribution curve
  return (
    <svg viewBox="0 0 160 90" className="w-full">
      <defs>
        <linearGradient id="dg3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(139,92,246,0.5)" />
          <stop offset="1" stopColor="rgba(139,92,246,0)" />
        </linearGradient>
      </defs>
      <path
        d="M8 80 C 50 80, 55 20, 80 20 C 105 20, 110 80, 152 80 Z"
        fill="url(#dg3)"
      />
      <path
        d="M8 80 C 50 80, 55 20, 80 20 C 105 20, 110 80, 152 80"
        fill="none"
        stroke="#b88dff"
        strokeWidth="1.5"
      />
      <line x1="80" y1="20" x2="80" y2="80" stroke="rgba(6,182,212,0.6)" strokeDasharray="3 3" />
    </svg>
  );
}

export function Differentiators() {
  return (
    <section className="relative border-y border-line bg-bg-1/50 py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="What makes Agentra different"
            title="Vertical. Ontology-powered."
            accent="Probabilistic."
            sub="Three choices set Agentra apart from horizontal AI pointed at supply chain data."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.08}>
              <div className="glass glass-hover flex h-full flex-col p-7">
                <div className="rounded-xl border border-line bg-white/[0.02] p-4">
                  <DiffViz i={i} />
                </div>
                <h3 className="mt-6 text-lg font-bold">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {d.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
