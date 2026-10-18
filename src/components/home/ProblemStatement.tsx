import { problems } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";

/* small per-pillar micro-diagrams */
function ProblemViz({ i }: { i: number }) {
  if (i === 0)
    // manual at scale: dense grid of hand-toggled cells
    return (
      <svg viewBox="0 0 120 44" className="w-full">
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 8 }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              x={c * 15 + 1}
              y={r * 15 + 1}
              width="12"
              height="12"
              rx="2"
              fill={(r + c) % 3 === 0 ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.06)"}
            />
          ))
        )}
      </svg>
    );
  if (i === 1)
    // fragmentation: disconnected boxes
    return (
      <svg viewBox="0 0 120 44" className="w-full">
        {[8, 46, 84].map((x, k) => (
          <rect
            key={k}
            x={x}
            y={10}
            width="28"
            height="24"
            rx="4"
            fill="none"
            stroke="rgba(139,92,246,0.4)"
            strokeDasharray="3 3"
          />
        ))}
        <line x1="36" y1="22" x2="46" y2="22" stroke="rgba(255,80,80,0.5)" strokeWidth="1.5" />
        <line x1="74" y1="22" x2="84" y2="22" stroke="rgba(255,80,80,0.5)" strokeWidth="1.5" />
      </svg>
    );
  // digital-to-reality gap: diverging lines
  return (
    <svg viewBox="0 0 120 44" className="w-full">
      <path d="M4 22 L116 22" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
      <path
        d="M4 22 C 40 22, 60 12, 116 4"
        stroke="rgba(6,182,212,0.6)"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="4 3"
      />
      <text x="90" y="40" fill="rgba(165,166,184,0.7)" style={{ fontSize: 7 }}>
        gap widens
      </text>
    </svg>
  );
}

export function ProblemStatement() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="The problem"
            title="Supply chains run on"
            accent="manual decisions."
            sub="At industrial scale, across fragmented systems, in volatile conditions. The plan and the ground drift apart faster than any team can close the gap."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="glass glass-hover flex h-full flex-col p-7">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-purple-4/25 bg-purple-4/10">
                  <Icon name={p.icon} className="h-5 w-5 text-purple-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">
                  {p.body}
                </p>
                <div className="mt-6 rounded-lg border border-line bg-white/[0.02] p-3">
                  <ProblemViz i={i} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
