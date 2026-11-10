"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { Inline } from "./Inline";

/* "Delivered" client results from an article. The figures are Marketing's
   own (verbatim); they count up once when the card scrolls into view,
   landing on the exact published value. */

type Item = { client: string; text: string; stats: { value: string; label: string }[] };

// "3,000+" -> 3000 with suffix "+"; "7.69%" -> 7.69 with 2 decimals and "%"
function parse(v: string) {
  const m = v.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const raw = m[2].replace(/,/g, "");
  return {
    pre: m[1],
    n: Number(raw),
    dec: raw.includes(".") ? raw.split(".")[1].length : 0,
    comma: m[2].includes(","),
    post: m[3],
  };
}

function Count({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });
  const still = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    const p = parse(value);
    if (!el || !p || !seen || still) return;
    const fmt = (x: number) =>
      p.pre + (p.comma ? Math.round(x).toLocaleString("en-GB") : x.toFixed(p.dec)) + p.post;
    const c = animate(0, p.n, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (x) => (el.textContent = fmt(x)),
      onComplete: () => (el.textContent = value),
    });
    return () => c.stop();
  }, [seen, still, value]);

  // Server and first paint render the real figure, so it never reads as 0
  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}

export function ProofCards({ items }: { items: Item[] }) {
  return (
    <div className="grid gap-4 py-2">
      {items.map((it) => (
        <div key={it.client} className="raised spotlight overflow-hidden rounded-[22px] p-6 sm:p-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-3/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-5 ring-1 ring-purple-4/30">
            <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            Delivered
          </span>
          <p className="mt-4 text-lg font-semibold text-fg">{it.client}</p>
          <dl className={`mt-5 grid gap-4 ${it.stats.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
            {it.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse border-l border-purple-4/40 pl-4">
                <dt className="mt-1 text-sm text-fg-muted">{s.label}</dt>
                <dd className="text-3xl font-light tracking-tight text-fg sm:text-4xl">
                  <Count value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-base leading-relaxed text-fg-muted">
            <Inline text={it.text} />
          </p>
        </div>
      ))}
    </div>
  );
}
