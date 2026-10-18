"use client";

import { agentWorkforce } from "@/lib/data";

const W = 320;
const H = 300;
const HUB = { x: 160, y: 240, r: 30 };

// six agents laid out across two rows at the top
const nodes = agentWorkforce.map((a, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 55 + col * 105;
  const y = 40 + row * 60;
  return { key: a.key, short: a.name.replace(" Agent", ""), x, y };
});

function wire(x: number, y: number) {
  const my = (y + (HUB.y - HUB.r)) / 2;
  return `M${x},${y} C${x},${my} ${HUB.x},${my} ${HUB.x},${HUB.y - HUB.r}`;
}

export function AgentConvergence() {
  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <defs>
          <linearGradient id="ac-wire" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8570bf" stopOpacity="0.2" />
            <stop offset="1" stopColor="#8570bf" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="ac-hub" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0" stopColor="#8570bf" />
            <stop offset="1" stopColor="#5a4794" />
          </radialGradient>
        </defs>

        {/* wires + flow */}
        {nodes.map((n, i) => {
          const d = wire(n.x, n.y + 12);
          return (
            <g key={n.key}>
              <path
                d={d}
                fill="none"
                stroke="url(#ac-wire)"
                strokeWidth="1.2"
                strokeDasharray="4 5"
                style={{ animation: `dash ${16 + (i % 4) * 3}s linear infinite` }}
              />
              <circle r="2.4" fill="#a695d4">
                <animateMotion
                  dur={`${2.4 + (i % 4) * 0.5}s`}
                  repeatCount="indefinite"
                  begin={`${-(i % 5) * 0.4}s`}
                  path={d}
                  calcMode="linear"
                />
              </circle>
            </g>
          );
        })}

        {/* agent chips */}
        {nodes.map((n) => (
          <g key={`n-${n.key}`}>
            <rect
              x={n.x - 46}
              y={n.y - 2}
              width="92"
              height="24"
              rx="12"
              fill="#12121d"
              stroke="rgba(255,255,255,0.1)"
            />
            <text
              x={n.x}
              y={n.y + 10.5}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#d8d8e2"
              style={{ fontSize: 8, fontWeight: 600 }}
            >
              {n.short}
            </text>
          </g>
        ))}

        {/* Agentra hub */}
        <circle cx={HUB.x} cy={HUB.y} r={HUB.r + 8} fill="none" stroke="rgba(154,92,255,0.25)" />
        <circle
          cx={HUB.x}
          cy={HUB.y}
          r={HUB.r}
          fill="url(#ac-hub)"
          style={{ filter: "drop-shadow(0 0 18px rgba(106,0,255,0.5))" }}
        />
        <image
          href="/brand/agentra-a.svg"
          x={HUB.x - 15}
          y={HUB.y - 17}
          width="30"
          height="34"
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
      <p className="mt-1 text-center font-mono text-[0.6rem] text-fg-dim">
        every agent runs through Agentra
      </p>
    </div>
  );
}
