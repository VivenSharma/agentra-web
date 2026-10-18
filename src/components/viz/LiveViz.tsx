"use client";

import { motion } from "framer-motion";
import { Check, TriangleAlert, ArrowRight } from "lucide-react";

export type VizKind =
  | "forecast"
  | "pipeline"
  | "watch"
  | "supplier"
  | "orchestrate"
  | "route"
  | "radar";

const labels: Record<VizKind, string> = {
  forecast: "Demand sensing · continuous replan",
  pipeline: "Straight-through execution",
  watch: "Network watch · disruption response",
  supplier: "Supplier scoring · continuous",
  orchestrate: "Multi-agent coordination",
  route: "Freight · reroute in motion",
  radar: "Network watch · disruption radar",
};

export function LiveViz({ kind }: { kind: VizKind }) {
  return (
    <div
      className="glass w-full overflow-hidden p-6"
      role="img"
      aria-label={`Agentra live visualization: ${labels[kind]}`}
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-dim">
          {labels[kind]}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-emerald-400">
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            style={{ animation: "pulse-node 2s ease-in-out infinite" }}
          />
          live
        </span>
      </div>
      {kind === "forecast" && <Forecast />}
      {kind === "pipeline" && <Pipeline />}
      {kind === "watch" && <Watch />}
      {kind === "supplier" && <Supplier />}
      {kind === "orchestrate" && <Orchestrate />}
      {kind === "route" && <Route />}
      {kind === "radar" && <Radar />}
    </div>
  );
}

/* Planning: actuals bars + forecast line, constantly live */
function Forecast() {
  const bars = [46, 58, 52, 68, 61, 74, 70, 82, 78, 90];
  return (
    <div>
      <div className="relative flex h-40 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 origin-bottom rounded-t bg-gradient-to-t from-indigo/70 to-purple-4/80"
            style={{ height: `${h}%` }}
            animate={{ scaleY: [0.55, 1, 0.72, 0.94, 0.6, 1] }}
            transition={{
              duration: 3 + (i % 4) * 0.7,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: i * 0.18,
            }}
          />
        ))}
        {/* forecast trend line, redrawing on a loop */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <motion.polyline
            points="4,66 15,54 26,58 37,44 48,50 59,36 70,40 81,26 92,20"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="3 3"
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{
              duration: 6,
              times: [0, 0.45, 0.75, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
      <div className="mt-4 flex items-center justify-between font-mono text-[0.6rem] text-fg-dim">
        <span>demand actuals</span>
        <span className="text-cyan">· forecast, replanned</span>
      </div>
    </div>
  );
}

/* Execution: pipeline stages filling */
function Pipeline() {
  const stages = [
    { s: "Detected", w: 100 },
    { s: "Reasoned", w: 88 },
    { s: "Actioned", w: 76 },
    { s: "Written back", w: 64 },
  ];
  return (
    <div>
      <div className="space-y-3.5">
        {stages.map((st, i) => (
          <div key={st.s} className="flex items-center gap-3">
            <span className="w-6 font-mono text-[0.6rem] text-fg-dim">0{i + 1}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-4 to-indigo"
                animate={{ width: [`${st.w - 14}%`, `${st.w}%`, `${st.w - 8}%`] }}
                transition={{
                  duration: 2.6 + i * 0.4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
              />
            </div>
            <span className="w-28 text-right text-xs font-medium text-fg-muted">
              {st.s}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 text-center font-mono text-[0.6rem] text-emerald-400">
        cycle time &lt; 5 min · governed
      </div>
    </div>
  );
}

/* Resilience / risk: monitored items with a live signal meter, resolving from
   at-risk to handled */
function Watch() {
  const rows = [
    { name: "Supplier · Tier-1 casting" },
    { name: "Lane · EU-12 corridor" },
    { name: "Port · Jebel Ali cutoff" },
  ];
  return (
    <div>
      <div className="space-y-3">
        {rows.map((r, i) => (
          <div
            key={r.name}
            className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.025] backdrop-blur-md px-4 py-3"
          >
            <span className="flex-1 truncate text-sm text-fg-muted">
              {r.name}
            </span>

            {/* live signal meter — always-moving equalizer bars */}
            <span className="flex h-5 items-end gap-[3px]">
              {[0, 1, 2, 3, 4].map((b) => (
                <motion.span
                  key={b}
                  className="w-[3px] rounded-sm bg-purple-4/70"
                  style={{ height: "40%" }}
                  animate={{ height: ["25%", "95%", "45%", "100%", "35%"] }}
                  transition={{
                    duration: 1.1 + b * 0.25,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: i * 0.25 + b * 0.12,
                  }}
                />
              ))}
            </span>

            {/* cross-fading status: at risk -> resolved */}
            <span className="relative inline-flex h-6 w-24 items-center justify-end">
              <motion.span
                className="absolute inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2.5 py-1 text-[0.65rem] font-semibold text-amber-400"
                animate={{ opacity: [1, 1, 0, 0, 1] }}
                transition={{
                  duration: 5,
                  times: [0, 0.35, 0.5, 0.9, 1],
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <TriangleAlert className="h-3 w-3" /> at risk
              </motion.span>
              <motion.span
                className="absolute inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[0.65rem] font-semibold text-emerald-400"
                animate={{ opacity: [0, 0, 1, 1, 0] }}
                transition={{
                  duration: 5,
                  times: [0, 0.35, 0.5, 0.9, 1],
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                <Check className="h-3 w-3" /> resolved
              </motion.span>
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center font-mono text-[0.6rem] text-fg-dim">
        3 signals detected · agent reasoning and resolving
      </div>
    </div>
  );
}

/* Procurement: supplier risk scores */
function Supplier() {
  const rows = [
    { name: "Supplier A", score: 82, tone: "emerald" },
    { name: "Supplier B", score: 61, tone: "amber" },
    { name: "Supplier C", score: 74, tone: "emerald" },
  ];
  const bar: Record<string, string> = {
    emerald: "from-emerald-500/70 to-emerald-400",
    amber: "from-amber-500/70 to-amber-400",
  };
  return (
    <div className="space-y-4">
      {rows.map((r, i) => (
        <div key={r.name}>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-fg-muted">{r.name}</span>
            <span className="font-mono text-fg-dim">score {r.score}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${bar[r.tone]}`}
              initial={{ width: 0 }}
              animate={{ width: `${r.score}%` }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.8 }}
            />
          </div>
        </div>
      ))}
      <div className="pt-1 text-center font-mono text-[0.6rem] text-fg-dim">
        rates, contracts and risk, scored continuously
      </div>
    </div>
  );
}

/* Orchestration: orchestrator connected to every agent, with animated flow */
function Orchestrate() {
  const agents = ["Demand", "Procure", "Logistics", "Risk", "Orders"];
  const orch = { x: 160, y: 34 };
  const chipW = 56;
  const nodes = agents.map((label, i) => ({
    label,
    x: 34 + i * 63,
    y: 150,
  }));
  const wire = (x: number) =>
    `M${orch.x},${orch.y + 14} C${orch.x},95 ${x},95 ${x},${150 - 14}`;

  return (
    <div>
      <svg viewBox="0 0 320 180" className="w-full">
        <defs>
          <linearGradient id="orc-wire" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9a71ef" stopOpacity="0.8" />
            <stop offset="1" stopColor="#9a71ef" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="orc-hub" cx="0.5" cy="0.4" r="0.6">
            <stop offset="0" stopColor="#b89bf5" />
            <stop offset="1" stopColor="#6e50c8" />
          </radialGradient>
        </defs>

        {/* wires + flow */}
        {nodes.map((n, i) => {
          const d = wire(n.x);
          return (
            <g key={`w-${n.label}`}>
              <path
                d={d}
                fill="none"
                stroke="url(#orc-wire)"
                strokeWidth="1.4"
                strokeDasharray="4 5"
                style={{ animation: `dash ${14 + (i % 3) * 4}s linear infinite` }}
              />
              <circle r="2.4" fill="#c9bce8">
                <animateMotion
                  dur={`${2 + (i % 4) * 0.5}s`}
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
          <g key={`n-${n.label}`}>
            <rect
              x={n.x - chipW / 2}
              y={n.y - 12}
              width={chipW}
              height={24}
              rx={12}
              fill="#12121d"
              stroke="rgba(255,255,255,0.1)"
            />
            <text
              x={n.x}
              y={n.y + 0.5}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#d8d8e2"
              style={{ fontSize: 8, fontWeight: 600 }}
            >
              {n.label}
            </text>
          </g>
        ))}

        {/* orchestrator hub */}
        <rect
          x={orch.x - 52}
          y={orch.y - 14}
          width={104}
          height={28}
          rx={14}
          fill="url(#orc-hub)"
          style={{ filter: "drop-shadow(0 0 14px rgba(154,113,239,0.55))" }}
        />
        <text
          x={orch.x}
          y={orch.y + 0.5}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          style={{ fontSize: 10, fontWeight: 700 }}
        >
          Orchestrator
        </text>
      </svg>

      <div className="mt-3 flex items-center justify-center gap-2 font-mono text-[0.6rem] text-fg-dim">
        conflicts resolved <ArrowRight className="h-3 w-3" /> one aligned plan
      </div>
    </div>
  );
}

/* Freight: original lane blocked, agent reroutes via a hub */
function Route() {
  return (
    <div>
      <svg viewBox="0 0 400 150" className="w-full">
        <defs>
          <linearGradient id="rt" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8570bf" />
            <stop offset="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        {/* blocked direct route */}
        <line x1="40" y1="110" x2="360" y2="110" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.6" />
        <text x="200" y="132" textAnchor="middle" fill="#fb7185" style={{ fontSize: 8, fontFamily: "monospace" }}>
          direct lane · cutoff missed
        </text>
        {/* rerouted path via hub */}
        <path
          id="reroute"
          d="M40 110 C 120 20, 280 20, 360 110"
          fill="none"
          stroke="url(#rt)"
          strokeWidth="2"
        />
        <circle r="4" fill="#a695d4">
          <animateMotion dur="3s" repeatCount="indefinite" path="M40 110 C 120 20, 280 20, 360 110" />
        </circle>
        {/* nodes */}
        {[
          { x: 40, y: 110, label: "Origin" },
          { x: 200, y: 40, label: "Hub · Antwerp" },
          { x: 360, y: 110, label: "Destination" },
        ].map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="6" fill="#12121d" stroke="#8570bf" strokeWidth="1.5" />
            <text x={n.x} y={n.y - 12} textAnchor="middle" fill="#d8d8e2" style={{ fontSize: 8, fontFamily: "monospace" }}>
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-3 text-center font-mono text-[0.6rem] text-emerald-400">
        rerouted in &lt; 5 min · SLA protected
      </div>
    </div>
  );
}

/* Risk: rotating radar sweep with disruption blips */
function Radar() {
  const blips = [
    { x: 132, y: 74 },
    { x: 250, y: 120 },
    { x: 280, y: 66 },
  ];
  return (
    <div>
      <svg viewBox="0 0 400 200" className="mx-auto block h-48">
        {[38, 68, 98].map((r) => (
          <circle key={r} cx="200" cy="110" r={r} fill="none" stroke="rgba(154,92,255,0.18)" />
        ))}
        <line x1="200" y1="110" x2="200" y2="12" stroke="rgba(154,92,255,0.15)" />
        <line x1="102" y1="110" x2="298" y2="110" stroke="rgba(154,92,255,0.15)" />
        {/* sweep */}
        <g style={{ transformOrigin: "200px 110px", animation: "spin-slow 4s linear infinite" }}>
          <path d="M200 110 L200 12 A98 98 0 0 1 280 60 Z" fill="url(#sweep)" opacity="0.5" />
        </g>
        <defs>
          <radialGradient id="sweep" cx="0" cy="0" r="1">
            <stop offset="0" stopColor="#06b6d4" stopOpacity="0.5" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
        </defs>
        {blips.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r="4" fill="#f43f5e">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <circle cx="200" cy="110" r="5" fill="#8570bf" />
      </svg>
      <div className="mt-2 text-center font-mono text-[0.6rem] text-fg-dim">
        real-time detection · 3 signals · agent responding
      </div>
    </div>
  );
}
