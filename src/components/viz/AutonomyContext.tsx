"use client";

import { useState } from "react";
import { Ban, CheckCircle2, UserCheck, type LucideIcon } from "lucide-react";
import { useCycle, useLive } from "./useLive";

/* "Same task. Same agent. Three different levels of oversight.", rebuilt
   from the graphic in Marketing's human-in-the-loop article. Copy and
   amounts are the graphic's own (an illustrative example).

   Motion: the same freight booking steps through the three situations.
   On each, the risk meter fills, the factor that changed the risk lights
   up and the outcome lands. Hovering or focusing a card holds it. Under
   reduced motion all three cards show their finished state. */

const factors = ["Financial exposure", "Operational impact", "Regulatory requirement", "Reversibility", "Data reliability", "Time sensitivity"];

type Case = {
  amount: string;
  title: string;
  body: string;
  risk: number;
  changed?: string;
  outcome: string;
  detail: string;
  icon: LucideIcon;
  c: { text: string; bar: string; box: string; chip: string };
};

const cases: Case[] = [
  {
    amount: "€1,850",
    title: "Routine booking",
    body: "Approved carrier at the contracted rate, within limits",
    risk: 1,
    outcome: "Autonomous execution",
    detail: "Agent books it and logs the action",
    icon: CheckCircle2,
    c: { text: "text-emerald-300", bar: "bg-emerald-400", box: "bg-emerald-400/10 ring-emerald-300/40", chip: "" },
  },
  {
    amount: "€6,400",
    title: "Financial exception",
    body: "Same lane, but spot rate exceeds the authorised limit",
    risk: 2,
    changed: "Financial exposure",
    outcome: "Human approval required",
    detail: "Agent prepares the case; logistics lead decides",
    icon: UserCheck,
    c: { text: "text-amber-300", bar: "bg-amber-400", box: "bg-amber-300/10 ring-amber-300/40", chip: "bg-amber-300/15 text-amber-200 ring-amber-300/60" },
  },
  {
    amount: "€1,620",
    title: "Compliance exception",
    body: "Cheapest carrier is not qualified for a regulated shipment",
    risk: 3,
    changed: "Regulatory requirement",
    outcome: "Blocked and escalated",
    detail: "Agent stops, explains why and escalates",
    icon: Ban,
    c: { text: "text-rose-300", bar: "bg-rose-400", box: "bg-rose-400/10 ring-rose-300/40", chip: "bg-rose-400/15 text-rose-200 ring-rose-300/60" },
  },
];

export function AutonomyContext() {
  const { ref, live, still } = useLive<HTMLElement>(0.3);
  const [held, setHeld] = useState<number | null>(null);
  const beat = useCycle(3, 2600, live && held === null, still, 2);
  const active = held ?? beat;

  return (
    <figure
      ref={ref}
      aria-label="The same freight booking under three conditions: routine booking executed autonomously, financial exception sent for human approval, compliance exception blocked and escalated. Illustrative example."
      className="relative overflow-hidden rounded-[24px] bg-bg-1 p-6 ring-1 ring-white/10 sm:p-10"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-purple-5">Why autonomy should be context-dependent</p>
      <h3 className="mt-3 text-2xl font-light leading-snug tracking-tight text-fg sm:text-3xl">
        Same task. Same agent. <span className="text-purple-5">Three different levels of oversight.</span>
      </h3>
      <p className="mt-3 max-w-[60ch] text-base text-fg-muted">
        Oversight follows the circumstances in which the agent acts, not just the task it performs.
      </p>

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {cases.map((k, i) => {
          const on = still || active === i;
          return (
            <li key={k.title} className="h-full">
              <button
                type="button"
                onMouseEnter={() => setHeld(i)}
                onMouseLeave={() => setHeld(null)}
                onFocus={() => setHeld(i)}
                onBlur={() => setHeld(null)}
                className={`flex h-full w-full flex-col rounded-2xl p-5 text-left ring-1 transition-all duration-500 ${
                  on ? "-translate-y-1 bg-white/[0.05] ring-white/20" : "bg-white/[0.02] opacity-60 ring-white/10"
                }`}
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-fg-dim">Freight booking</span>
                  <span className="font-mono text-sm text-fg-muted">{k.amount}</span>
                </span>
                <span className="mt-2 block text-base font-semibold text-fg">{k.title}</span>
                <span className="mt-1 block text-sm md:min-h-[3.75rem] leading-snug text-fg-muted">{k.body}</span>

                <span className="mt-5 block text-[11px] font-semibold uppercase tracking-wider text-fg-dim">Risk level</span>
                <span className="mt-2 grid grid-cols-3 gap-1.5" aria-hidden>
                  {[0, 1, 2].map((s) => (
                    <span key={s} className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <span
                        className={`block h-full origin-left rounded-full ${k.c.bar} transition-transform duration-500 ease-out ${
                          on && s < k.risk ? "scale-x-100" : "scale-x-0"
                        }`}
                        style={{ transitionDelay: on ? `${s * 180}ms` : "0ms" }}
                      />
                    </span>
                  ))}
                </span>

                <span className="mt-5 block text-[11px] font-semibold uppercase tracking-wider text-fg-dim">What changed the risk</span>
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {factors.map((f) => {
                    const lit = on && f === k.changed;
                    return (
                      <span
                        key={f}
                        className={`rounded-full px-2.5 py-1 text-xs ring-1 transition-all duration-500 ${
                          lit ? `${k.c.chip} font-semibold` : "text-fg-dim ring-white/10"
                        }`}
                      >
                        {f}
                      </span>
                    );
                  })}
                </span>

                <span
                  className={`mt-auto block pt-6 transition-all duration-700 ${on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-50"}`}
                  style={{ transitionDelay: on && !still ? "500ms" : "0ms" }}
                >
                  <span className={`block rounded-xl p-4 ring-1 ${k.c.box}`}>
                    <span className={`flex items-center gap-2 text-base font-semibold ${k.c.text}`}>
                      <k.icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                      {k.outcome}
                    </span>
                    <span className="mt-1 block text-sm text-fg-muted">{k.detail}</span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <figcaption className="mt-5 text-xs text-fg-dim">Illustrative example.</figcaption>
    </figure>
  );
}
