"use client";

import { Boxes, CheckCircle2, Factory, FileText, Ship, Sparkles, type LucideIcon } from "lucide-react";
import { useCycle, useLive } from "./useLive";

/* The delay-to-decision chain from the inbound freight article, drawn as a
   live diagram. Every label is the article's own wording:
   "shipment delay → affected purchase order → material shortage →
   production risk", the four options, and the recommendation.

   Motion, one 10-beat loop while on screen: the delay travels down the
   chain link by link, the agent then weighs each option in turn, and the
   recommendation lights. Under reduced motion the finished state shows. */

const chain: { icon: LucideIcon; label: string }[] = [
  { icon: Ship, label: "Shipment delay" },
  { icon: FileText, label: "Affected purchase order" },
  { icon: Boxes, label: "Material shortage" },
  { icon: Factory, label: "Production risk" },
];
const options = ["Wait", "Expedite only the shortfall", "Rebalance stock", "Reroute"];

// beats 0-3: chain lights; 4-7: options weighed; 8-9: recommendation
const BEATS = 10;

export function DelayChain() {
  const { ref, live, still } = useLive<HTMLElement>(0.35);
  const beat = useCycle(BEATS, 900, live, still, BEATS - 1);

  return (
    <figure
      ref={ref}
      aria-label="An agent connects the chain from shipment delay to production risk, compares the options and recommends the lowest-cost response that avoids a stock-out"
      className="relative overflow-hidden rounded-[24px] bg-bg-1 p-6 ring-1 ring-white/10 sm:p-10"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-purple-5">Connect delivery events to business decisions</p>
      <h3 className="mt-3 text-2xl font-light leading-snug tracking-tight text-fg sm:text-3xl">
        A delay matters when it reaches <span className="text-purple-5">production</span>
      </h3>

      {/* the chain */}
      <ol className="mt-8 grid gap-3 md:grid-cols-4 md:gap-0">
        {chain.map((c, i) => {
          const on = beat >= i;
          const last = i === chain.length - 1;
          return (
            <li key={c.label} className="relative flex items-center gap-3 md:flex-col md:items-start md:gap-0 md:pr-6">
              {/* link to the next node */}
              {!last && (
                <>
                  <span aria-hidden className="absolute left-5 top-11 h-[calc(100%-1.75rem)] w-px bg-white/10 md:left-11 md:right-0 md:top-5 md:h-px md:w-auto" />
                  <span
                    aria-hidden
                    className={`absolute left-5 top-11 h-[calc(100%-1.75rem)] w-px origin-top bg-gradient-to-b from-rose-400 to-rose-300/40 transition-transform duration-700 ease-out md:left-11 md:right-0 md:top-5 md:h-px md:w-auto md:origin-left md:bg-gradient-to-r ${
                      beat > i ? "scale-y-100 md:scale-x-100" : "scale-y-0 md:scale-x-0 md:scale-y-100"
                    }`}
                  />
                </>
              )}
              <span
                className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full ring-1 transition-all duration-500 ${
                  on
                    ? "bg-rose-400/15 text-rose-300 ring-rose-300/50 shadow-[0_0_24px_-4px_rgba(251,113,133,0.6)]"
                    : "bg-white/[0.04] text-fg-dim ring-white/10"
                }`}
              >
                <c.icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                {on && beat === i && !still && (
                  <span aria-hidden className="absolute inset-0 animate-ping rounded-full ring-1 ring-rose-300/60" />
                )}
              </span>
              <span className={`text-base font-medium transition-colors duration-500 md:mt-4 ${on ? "text-fg" : "text-fg-dim"}`}>
                {c.label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* the agent weighs the options */}
      <div className="mt-8 rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/10 sm:p-6">
        <p className="flex items-center gap-2 text-sm font-medium text-fg-muted">
          <Sparkles className={`h-4 w-4 text-purple-5 ${beat >= 4 && !still ? "animate-pulse" : ""}`} strokeWidth={1.75} aria-hidden />
          The agent compares the options
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {options.map((o, i) => {
            const weighing = beat === 4 + i;
            const weighed = beat > 4 + i;
            return (
              <li
                key={o}
                className={`rounded-full px-4 py-2 text-sm ring-1 transition-all duration-500 ${
                  weighing
                    ? "scale-[1.04] bg-purple-3/25 text-fg ring-purple-4/70 shadow-[0_0_24px_-6px_rgba(160,107,255,0.8)]"
                    : weighed
                      ? "bg-white/[0.04] text-fg-muted ring-white/15"
                      : "bg-transparent text-fg-dim ring-white/10"
                }`}
              >
                {o}
              </li>
            );
          })}
        </ul>
        <p
          className={`mt-5 flex items-start gap-2.5 border-t border-white/10 pt-5 text-base leading-relaxed transition-all duration-700 ${
            beat >= 8 ? "translate-y-0 text-fg opacity-100" : "translate-y-1 text-fg-dim opacity-40"
          }`}
        >
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-purple-5" strokeWidth={1.75} aria-hidden />
          <span>
            Recommends the <strong className="font-semibold text-purple-6">lowest-cost response that avoids a stock-out</strong>.
          </span>
        </p>
      </div>
    </figure>
  );
}
