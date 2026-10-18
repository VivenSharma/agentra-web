"use client";

import { motion } from "framer-motion";
import { agents } from "@/lib/content";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";

const R = 118; // orbit radius
const CX = 200;
const CY = 190;

function pos(angle: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
}

function label(angle: number) {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const lx = CX + (R + 26) * cos;
  const ly = CY + (R + 26) * sin;
  const anchor: "start" | "end" | "middle" =
    cos > 0.3 ? "start" : cos < -0.3 ? "end" : "middle";
  return { lx, ly, anchor };
}

export function Orchestration() {
  return (
    <section id="engine" className="relative overflow-hidden py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="The agent engine"
            title="A coordinated workforce,"
            accent="not a chatbot."
            sub="A central orchestrator directs specialised agents across demand, procurement, order orchestration, logistics and risk. They negotiate trade-offs and resolve conflicts together, with a human approving every consequential move."
          />
        </Reveal>
        <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Diagram */}
          <Reveal>
            <div className="relative mx-auto w-full max-w-[460px]">
              <svg viewBox="0 0 400 380" className="w-full overflow-visible">
                <defs>
                  <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#a06bff" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#a06bff" stopOpacity="0.05" />
                  </linearGradient>
                  <radialGradient id="core" cx="0.42" cy="0.38" r="0.7">
                    <stop offset="0" stopColor="#b48cff" />
                    <stop offset="0.55" stopColor="#7e57be" />
                    <stop offset="1" stopColor="#3d2d69" />
                  </radialGradient>
                  <radialGradient id="coreGlow" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#a06bff" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#a06bff" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* concentric orbit rings */}
                <circle cx={CX} cy={CY} r={R} fill="none" stroke="rgba(255,255,255,0.06)" />
                <circle cx={CX} cy={CY} r={R * 0.62} fill="none" stroke="rgba(255,255,255,0.04)" />

                {/* connectors from core to each node */}
                {agents.map((a) => {
                  const p = pos(a.angle);
                  return (
                    <line
                      key={`e-${a.key}`}
                      x1={CX}
                      y1={CY}
                      x2={p.x}
                      y2={p.y}
                      stroke="url(#edge)"
                      strokeWidth="1.25"
                    />
                  );
                })}

                {/* a single packet flowing out along each connector */}
                {agents.map((a, i) => {
                  const p = pos(a.angle);
                  return (
                    <motion.circle
                      key={`pkt-${a.key}`}
                      r="2.5"
                      fill="#d9c8ff"
                      initial={{ cx: CX, cy: CY, opacity: 0 }}
                      animate={{
                        cx: [CX, p.x],
                        cy: [CY, p.y],
                        opacity: [0, 1, 1, 0],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}

                {/* agent nodes — clean dots with radial labels */}
                {agents.map((a) => {
                  const p = pos(a.angle);
                  const l = label(a.angle);
                  return (
                    <g key={a.key}>
                      <circle cx={p.x} cy={p.y} r="7" fill="#0f0f0f" stroke="#a06bff" strokeWidth="1.5" />
                      <circle cx={p.x} cy={p.y} r="3" fill="#a06bff" />
                      <text
                        x={l.lx}
                        y={l.ly}
                        textAnchor={l.anchor}
                        dominantBaseline="middle"
                        fill="#c9c9d2"
                        style={{ fontSize: 11, fontWeight: 500 }}
                      >
                        {a.label}
                      </text>
                    </g>
                  );
                })}

                {/* core orchestrator */}
                <circle cx={CX} cy={CY} r="78" fill="url(#coreGlow)" />
                <circle cx={CX} cy={CY} r="42" fill="url(#core)" />
                <circle cx={CX} cy={CY} r="42" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                <text
                  x={CX}
                  y={CY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#fff"
                  style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.02em" }}
                >
                  Orchestrator
                </text>
              </svg>

              {/* human-in-the-loop pill */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-4/30 bg-bg px-3 py-1.5 text-xs font-medium text-purple-5 shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-4" />
                  Human in the loop
                </span>
              </div>
            </div>
          </Reveal>

          {/* Agent list */}
          <Reveal delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">
              {agents.map((a) => (
                <div
                  key={a.key}
                  className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.03] backdrop-blur-md px-4 py-3"
                >
                  <span className="h-2 w-2 rounded-full bg-grad-2" />
                  <span className="text-sm font-medium">{a.label} Agent</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
