"use client";

import { SectionHeader, Pill } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";
import { connectors } from "@/lib/data";

const W = 1000;
const H = 540;
const HUB = { x: 500, y: 452, r: 54 };

// two rows of pills across the top
const PILL_W = 128;
const PILL_H = 40;
function layout() {
  const rows = [70, 156];
  const perRow = Math.ceil(connectors.length / 2);
  const gap = (W - 60) / perRow;
  return connectors.map((c, i) => {
    const row = Math.floor(i / perRow);
    const idx = i % perRow;
    const x = 30 + gap * idx + gap / 2;
    const y = rows[row];
    return { ...c, x, y };
  });
}
const pills = layout();

function wire(x: number, y: number) {
  const sy = y + PILL_H / 2;
  const midY = (sy + (HUB.y - HUB.r)) / 2;
  return `M${x},${sy} C${x},${midY} ${HUB.x},${midY} ${HUB.x},${HUB.y - HUB.r}`;
}

export function Connectors() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div
        className="glow left-1/2 top-2/3 h-[420px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-20"
        style={{ background: "radial-gradient(circle,#6f57ab,transparent 70%)" }}
      />
      <div className="container-x relative z-10">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Built on what you have"
            title="Connect everything."
            accent="Act anywhere."
            sub="Your fragmented estate converges into one autonomy layer. 900+ connectors. Works with what you have."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-4xl">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
              <defs>
                <linearGradient id="cn-wire" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8570bf" stopOpacity="0.15" />
                  <stop offset="1" stopColor="#8570bf" stopOpacity="0.7" />
                </linearGradient>
                <radialGradient id="cn-hub" cx="0.5" cy="0.4" r="0.6">
                  <stop offset="0" stopColor="#b88dff" />
                  <stop offset="1" stopColor="#5a4794" />
                </radialGradient>
              </defs>

              {/* wires */}
              {pills.map((p, i) => {
                const d = wire(p.x, p.y);
                return (
                  <g key={`w-${p.name}`}>
                    <path
                      d={d}
                      fill="none"
                      stroke="url(#cn-wire)"
                      strokeWidth="1.5"
                      strokeDasharray="5 6"
                      style={{ animation: `dash ${18 + (i % 4) * 4}s linear infinite` }}
                    />
                    <circle r="3" fill="#a695d4">
                      <animateMotion
                        dur={`${2.4 + (i % 5) * 0.4}s`}
                        repeatCount="indefinite"
                        begin={`${-(i % 6) * 0.4}s`}
                        path={d}
                        calcMode="linear"
                      />
                    </circle>
                  </g>
                );
              })}

              {/* pills */}
              {pills.map((p) => (
                <g key={`p-${p.name}`}>
                  <rect
                    x={p.x - PILL_W / 2}
                    y={p.y - PILL_H / 2}
                    width={PILL_W}
                    height={PILL_H}
                    rx={PILL_H / 2}
                    fill="#12121d"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <circle cx={p.x - PILL_W / 2 + 22} cy={p.y} r="9" fill={p.color} />
                  <text
                    x={p.x - PILL_W / 2 + 22}
                    y={p.y + 0.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#fff"
                    style={{ fontSize: 8, fontWeight: 800 }}
                  >
                    {p.short}
                  </text>
                  <text
                    x={p.x - PILL_W / 2 + 40}
                    y={p.y + 0.5}
                    dominantBaseline="middle"
                    fill="#d8d8e2"
                    style={{ fontSize: 12, fontWeight: 600 }}
                  >
                    {p.name.length > 12 ? p.name.slice(0, 11) + "…" : p.name}
                  </text>
                </g>
              ))}

              {/* hub */}
              <circle
                cx={HUB.x}
                cy={HUB.y}
                r={HUB.r + 12}
                fill="none"
                stroke="rgba(139,92,246,0.25)"
              />
              <circle
                cx={HUB.x}
                cy={HUB.y}
                r={HUB.r}
                fill="url(#cn-hub)"
                style={{ filter: "drop-shadow(0 0 30px rgba(124,58,237,0.32))" }}
              />
              {/* Agentra 'A' mark */}
              <image
                href="/brand/agentra-a.svg"
                x={HUB.x - 27}
                y={HUB.y - 30}
                width="54"
                height="60"
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Pill soft>SAP</Pill>
              <Pill soft>Kinaxis</Pill>
              <Pill soft>Blue Yonder</Pill>
              <Pill soft>TMS / WMS</Pill>
              <Pill>+ 900 more</Pill>
            </div>
            <p className="mx-auto mt-6 max-w-xl text-center text-sm text-fg-dim">
              One autonomy layer, on the estate you already run. Data stays where
              it is. Agentra connects and harmonises it.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
