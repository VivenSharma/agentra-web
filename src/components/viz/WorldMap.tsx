"use client";

import { motion } from "framer-motion";
import {
  worldMapSvg,
  worldMapWidth as W,
  worldMapHeight as H,
  worldMapPins as pins,
} from "@/lib/worldmap.generated";

function arc(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - Math.abs(b.x - a.x) * 0.22 - 4;
  return `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
}

export function WorldMap() {
  const hq = pins.find((p) => p.hq) ?? pins[0];

  return (
    <div className="relative w-full">
      {/* base dotted map (faint, transparent) */}
      <div
        className="dots-breathe w-full [&>svg]:h-auto [&>svg]:w-full"
        aria-hidden
        dangerouslySetInnerHTML={{ __html: worldMapSvg }}
      />

      {/* overlay: arcs + animated pins, same viewBox so it aligns */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="wm-arc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8570bf" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {pins
          .filter((p) => !p.hq)
          .map((p, i) => (
            <motion.path
              key={p.city}
              d={arc(hq, p)}
              fill="none"
              stroke="url(#wm-arc)"
              strokeWidth={0.4}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.8 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.3 + i * 0.25 }}
            />
          ))}

        {pins.map((p, i) => (
          <g key={p.city}>
            <circle cx={p.x} cy={p.y} r={1} fill="#8570bf" opacity={0.25}>
              <animate
                attributeName="r"
                values="0.8;3;0.8"
                dur="2.6s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.4;0;0.4"
                dur="2.6s"
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={p.x}
              cy={p.y}
              r={p.hq ? 1.2 : 1}
              fill={p.hq ? "#a695d4" : "#8570bf"}
              stroke="#060609"
              strokeWidth={0.4}
            />
          </g>
        ))}
      </svg>

      {/* crisp HTML labels */}
      {pins.map((p) => (
        <div
          key={p.city}
          className="absolute hidden -translate-x-1/2 sm:block"
          style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%` }}
        >
          <div className="mt-2 whitespace-nowrap rounded-md border border-line bg-bg/85 px-2 py-0.5 text-center text-[0.6rem] font-semibold text-fg backdrop-blur">
            {p.city}
          </div>
        </div>
      ))}
    </div>
  );
}
