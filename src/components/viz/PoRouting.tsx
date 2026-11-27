"use client";

import { ArrowRight, PackageCheck } from "lucide-react";
import { useCycle, useLive } from "./useLive";
import { Tally } from "./Tally";

/* "Three questions decide where every PO goes", rebuilt from the decision
   tree in Marketing's DC network transition article. Copy and figures are
   the graphic's own (illustrative, as the graphic says).

   Motion: one PO batch is routed per beat. The path from the question to
   its outcome lights, the outcome's count rolls up and the open-PO count
   on the left rolls down, until all 1,240 are placed. Under reduced
   motion every outcome shows its final count. */

type Tone = "purple" | "amber" | "emerald";
const branches: {
  answer: string;
  question: string;
  outcomes: { answer: string; n: number; title: string; body: string; tone: Tone }[];
}[] = [
  {
    answer: "Not dispatched",
    question: "Has the supplier confirmed the amendment?",
    outcomes: [
      { answer: "Confirmed", n: 610, title: "Update to DC East", body: "Amend the PO to the approved 3PL receiving DC", tone: "purple" },
      { answer: "Not yet", n: 160, title: "Hold for confirmation", body: "Chase the supplier before treating the change as accepted", tone: "amber" },
    ],
  },
  {
    answer: "In transit",
    question: "Will it arrive before DC North closes?",
    outcomes: [
      { answer: "Yes", n: 380, title: "Keep at DC North", body: "Received before the last receipt date", tone: "purple" },
      { answer: "No, bypass fits", n: 90, title: "Bypass the DC", body: "Direct to store where cost and service justify it", tone: "emerald" },
    ],
  },
];
const TOTAL = 1240;
const flat = branches.flatMap((b) => b.outcomes);
// beats 0-3 route one outcome each; 4-6 hold the finished tree
const BEATS = 7;

const tone = {
  purple: { text: "text-purple-6", ring: "ring-purple-4/60", bg: "bg-purple-3/15", glow: "shadow-[0_0_32px_-8px_rgba(160,107,255,0.8)]" },
  amber: { text: "text-amber-300", ring: "ring-amber-300/50", bg: "bg-amber-300/10", glow: "shadow-[0_0_32px_-8px_rgba(252,211,77,0.6)]" },
  emerald: { text: "text-emerald-300", ring: "ring-emerald-300/50", bg: "bg-emerald-300/10", glow: "shadow-[0_0_32px_-8px_rgba(110,231,183,0.6)]" },
};

export function PoRouting() {
  const { ref, live, still } = useLive<HTMLElement>(0.3);
  const beat = useCycle(BEATS, 1300, live, still, BEATS - 1);
  const routed = flat.map((_, i) => beat >= i);
  const left = TOTAL - flat.reduce((s, o, i) => s + (routed[i] ? o.n : 0), 0);

  return (
    <figure
      ref={ref}
      aria-label="How each open PO is routed: of 1,240 open POs still pointing to DC North, 610 are updated to DC East, 160 held for supplier confirmation, 380 kept at DC North and 90 bypass the DC. Illustrative figures."
      className="relative overflow-hidden rounded-[24px] bg-bg-1 p-6 ring-1 ring-white/10 sm:p-10"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-purple-5">How each open PO is routed</p>
      <h3 className="mt-3 text-2xl font-light leading-snug tracking-tight text-fg sm:text-3xl">
        Three questions decide <span className="text-purple-5">where every PO goes</span>
      </h3>

      <div className="mt-8 grid gap-5 lg:grid-cols-[200px_1fr] lg:items-center">
        {/* the open POs */}
        <div className="rounded-2xl bg-gradient-to-br from-purple-3/25 to-white/[0.02] p-5 ring-1 ring-purple-4/40">
          <p className="text-4xl font-light tracking-tight text-fg">
            <Tally value={left} still={still} />
          </p>
          <p className="mt-2 text-sm leading-snug text-fg-muted">
            open POs still pointing to <strong className="font-semibold text-fg">DC North</strong>
          </p>
          <p className="mt-4 border-t border-white/10 pt-3 text-sm text-fg-dim">Has the shipment been dispatched?</p>
        </div>

        {/* the two branches */}
        <div className="grid gap-4">
          {branches.map((b, bi) => {
            const first = bi * 2;
            const active = beat === first || beat === first + 1;
            return (
              <div
                key={b.question}
                className={`rounded-2xl p-4 ring-1 transition-colors duration-500 sm:p-5 ${active ? "bg-white/[0.04] ring-white/20" : "bg-white/[0.02] ring-white/10"}`}
              >
                <p className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-5">{b.answer}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-fg-dim" aria-hidden />
                  <span className="font-medium text-fg">{b.question}</span>
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {b.outcomes.map((o, oi) => {
                    const i = first + oi;
                    const on = routed[i];
                    const now = beat === i && !still;
                    const t = tone[o.tone];
                    return (
                      <li
                        key={o.title}
                        className={`relative h-full rounded-xl p-4 ring-1 transition-all duration-500 ${
                          on ? `${t.bg} ${t.ring}` : "bg-transparent ring-white/10"
                        } ${now ? `-translate-y-0.5 ${t.glow}` : ""}`}
                      >
                        <p className={`text-[11px] font-semibold uppercase tracking-wider ${on ? t.text : "text-fg-dim"}`}>{o.answer}</p>
                        <p className={`mt-2 text-3xl font-semibold leading-none transition-colors duration-500 ${on ? t.text : "text-fg-dim"}`}>
                          <Tally value={on ? o.n : 0} still={still} />
                        </p>
                        <p className={`mt-2 text-base font-medium ${on ? "text-fg" : "text-fg-muted"}`}>{o.title}</p>
                        <p className="mt-1 text-sm leading-snug text-fg-muted">{o.body}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-6 flex items-start gap-2.5 rounded-xl bg-white/[0.03] p-4 text-sm leading-relaxed text-fg-muted ring-1 ring-white/10">
        <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-purple-5" strokeWidth={1.75} aria-hidden />
        Before any change, the new 3PL&rsquo;s receiving capacity is checked. If it is full, the PO goes to another approved facility or a new delivery date.
      </p>
      <figcaption className="mt-4 text-xs text-fg-dim">Illustrative figures.</figcaption>
    </figure>
  );
}
