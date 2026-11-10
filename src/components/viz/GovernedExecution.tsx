"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUp, FileCheck2, ShieldCheck, SlidersHorizontal, UserPlus, type LucideIcon } from "lucide-react";
import { useCycle, useLive } from "./useLive";

/* "You set how far each workflow goes", rebuilt from the governed execution
   graphic in Marketing's inbound freight article. Copy is verbatim from
   that graphic.

   Motion: a marker steps along the scale from "Agent acts within limits"
   to "People decide", lighting each workflow in turn, while the five
   controls light one by one underneath. Hovering or focusing a workflow
   takes over the marker, so readers can explore it. Under reduced motion
   the marker rests on the last workflow and every control is lit. */

const workflows = [
  { title: "Routine status updates", body: "Agent updates ETAs and records automatically." },
  { title: "Data reconciliation", body: "Agent reconciles, then flags discrepancies for review." },
  { title: "Rebooking a shipment", body: "Agent recommends, a coordinator approves." },
  { title: "Anything a customer will notice", body: "A coordinator decides, with the agent's analysis." },
];

const controls: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: "Decision rights" },
  { icon: SlidersHorizontal, label: "Approval thresholds" },
  { icon: UserPlus, label: "Role-based permissions" },
  { icon: FileCheck2, label: "Audit trails" },
  { icon: ArrowUp, label: "Escalation" },
];

export function GovernedExecution() {
  const { ref, live, still } = useLive<HTMLElement>(0.3);
  const [held, setHeld] = useState<number | null>(null);
  const auto = useCycle(workflows.length, 2200, live && held === null, still);
  const active = held ?? auto;
  // controls light in sequence on their own, quicker rhythm
  const ctl = useCycle(controls.length + 2, 700, live, still, controls.length);

  return (
    <figure
      ref={ref}
      aria-label="Governed execution: agents act within limits on routine work while coordinators approve rebookings and customer-facing decisions"
      className="relative overflow-hidden rounded-[24px] bg-bg-1 p-6 ring-1 ring-white/10 sm:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(128,85,226,0.4), transparent 70%)" }}
      />
      <p className="text-xs font-semibold uppercase tracking-wider text-purple-5">Governed execution</p>
      <h3 className="mt-3 text-2xl font-light leading-snug tracking-tight text-fg sm:text-3xl">
        You set how far <span className="text-purple-5">each workflow goes</span>
      </h3>

      {/* the scale */}
      <div className="mt-8">
        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider">
          <span className="text-purple-5">Agent acts within limits</span>
          <span className="text-fg">People decide</span>
        </div>
        <div className="relative mt-3 h-1.5 rounded-full bg-gradient-to-r from-purple-2 via-purple-3 to-purple-6">
          {/* a quarter-width slot that slides by whole slots (transform only);
              the dot sits in its centre, above the matching workflow */}
          <motion.span
            aria-hidden
            className="absolute inset-y-0 left-0 flex w-1/4 items-center justify-center"
            animate={{ x: `${active * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            <span className="h-4 w-4 rounded-full bg-white shadow-[0_0_0_4px_rgba(160,107,255,0.35),0_0_24px_rgba(214,199,251,0.9)]" />
          </motion.span>
        </div>
      </div>

      {/* the workflows */}
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {workflows.map((w, i) => {
          const on = i === active;
          const people = i === workflows.length - 1;
          return (
            <li key={w.title}>
              <button
                type="button"
                onMouseEnter={() => setHeld(i)}
                onMouseLeave={() => setHeld(null)}
                onFocus={() => setHeld(i)}
                onBlur={() => setHeld(null)}
                aria-pressed={on}
                className={`relative h-full w-full overflow-hidden rounded-2xl p-5 text-left transition-all duration-500 ${
                  on
                    ? people
                      ? "bg-grad text-white shadow-[0_24px_60px_-28px_rgba(160,107,255,0.9)]"
                      : "-translate-y-1 bg-purple-3/15 ring-1 ring-purple-4/60"
                    : "bg-white/[0.03] ring-1 ring-white/10"
                }`}
              >
                <span className={`block text-base font-semibold leading-snug ${on ? (people ? "text-white" : "text-fg") : "text-fg"}`}>
                  {w.title}
                </span>
                <span className={`mt-2 block text-sm leading-relaxed ${on && people ? "text-white/85" : "text-fg-muted"}`}>
                  {w.body}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* the controls */}
      <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-fg-muted">The controls behind every workflow</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {controls.map((c, i) => {
          const lit = ctl >= i;
          return (
            <li
              key={c.label}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm ring-1 transition-all duration-500 ${
                lit ? "bg-purple-3/15 text-fg ring-purple-4/50" : "bg-transparent text-fg-dim ring-white/10"
              }`}
            >
              <c.icon className={`h-4 w-4 transition-colors duration-500 ${lit ? "text-purple-5" : "text-fg-dim"}`} strokeWidth={1.75} aria-hidden />
              {c.label}
            </li>
          );
        })}
      </ul>

      <figcaption className="mt-8 border-t border-white/10 pt-6 text-lg font-medium text-fg sm:text-xl">
        The right humans in the loop, not humans in the way
      </figcaption>
    </figure>
  );
}
