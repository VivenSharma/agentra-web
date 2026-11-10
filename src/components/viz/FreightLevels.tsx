"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { ChevronRight, MapPin, Receipt, Workflow, type LucideIcon } from "lucide-react";
import { useLive } from "./useLive";

/* "Three levels of freight management", rebuilt from the graphic in
   Marketing's inbound freight article. Copy is verbatim from that graphic.

   Layout: three equal cards in one aligned row, joined by arrows, so the
   progression reads left to right; the third level, where agents act, is
   the highlighted one. Motion: the cards and arrows enter in order, and
   the third card keeps a slow glow and sheen while on screen. Static
   under reduced motion. */

const levels: { icon: LucideIcon; n: string; title: string; q: string; body: string }[] = [
  { icon: MapPin, n: "01", title: "Shipment visibility", q: "Where is it?", body: "Track locations, status and expected arrivals." },
  { icon: Receipt, n: "02", title: "Freight intelligence", q: "What is it costing us?", body: "Compare costs, assess forwarder performance and spot inefficiencies." },
  { icon: Workflow, n: "03", title: "Decision orchestration", q: "What should we do?", body: "Weigh the business impact, recommend actions and coordinate execution." },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function FreightLevels() {
  const { ref, live, still } = useLive<HTMLElement>(0.25);
  const shown = live || still;

  return (
    <figure
      ref={ref}
      aria-label="Three levels of freight management: shipment visibility, freight intelligence and decision orchestration"
      className={`fl ${live ? "is-live" : ""} relative overflow-hidden rounded-[24px] bg-bg-1 p-6 ring-1 ring-white/10 sm:p-10`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(128,85,226,0.35), transparent 70%)" }}
      />
      <p className="text-xs font-semibold uppercase tracking-wider text-purple-5">Beyond shipment tracking</p>
      <h3 className="mt-3 text-2xl font-light leading-snug tracking-tight text-fg sm:text-3xl">
        Three levels of <span className="text-purple-5">freight management</span>
      </h3>

      <div className="relative mt-8 grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch md:gap-2">
        {levels.map((l, i) => {
          const top = i === levels.length - 1;
          return (
            <Fragment key={l.n}>
              <motion.div
                className="h-full"
                initial={still ? false : { opacity: 0, y: 24 }}
                animate={shown ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.25, ease }}
              >
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-2xl p-5 ${
                    top
                      ? "fl-top fl-pill text-white shadow-[0_24px_60px_-28px_rgba(160,107,255,0.8)]"
                      : "bg-white/[0.04] ring-1 ring-white/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 ${
                        top ? "bg-white/15 ring-white/30" : "bg-purple-3/15 text-purple-5 ring-purple-4/30"
                      }`}
                    >
                      <l.icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className={`font-mono text-sm font-semibold ${top ? "text-white/80" : "text-purple-5"}`}>{l.n}</span>
                  </div>
                  <p className="mt-4 text-lg font-semibold leading-snug">{l.title}</p>
                  <p className={`mt-1 text-base font-medium ${top ? "text-white" : "text-purple-5"}`}>{l.q}</p>
                  <p className={`mt-3 text-base leading-relaxed ${top ? "text-white/85" : "text-fg-muted"}`}>{l.body}</p>
                  {top && <p className="mt-auto pt-5 text-sm font-semibold text-white">Where agentic AI adds value</p>}
                </div>
              </motion.div>

              {/* arrow to the next level: points right on desktop, down on phones */}
              {!top && (
                <motion.span
                  aria-hidden
                  className="grid place-items-center text-purple-5"
                  initial={still ? false : { opacity: 0 }}
                  animate={shown ? { opacity: 1 } : undefined}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.25, ease }}
                >
                  <ChevronRight className="h-5 w-5 rotate-90 md:rotate-0" strokeWidth={2} />
                </motion.span>
              )}
            </Fragment>
          );
        })}
      </div>
    </figure>
  );
}
