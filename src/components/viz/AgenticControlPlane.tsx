"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { AMark } from "@/components/AMark";
import { cpDecisions, cpStack, agentWorkforce } from "@/lib/data";

const dotColor: Record<string, string> = {
  green: "bg-emerald-400",
  amber: "bg-amber-400",
  blue: "bg-sky-400",
};

/**
 * The agent workforce, live. The agents and what they do are the star.
 * Decisions they answer (top) and the stack they act on (bottom) frame them,
 * joined by static connecting lines. Hover an agent to see how it helps.
 */
export function AgenticControlPlane() {
  const stageRef = useRef<HTMLDivElement>(null);
  const decRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const stackRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [wires, setWires] = useState<{ d: string }[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState<string | null>(null);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const panel = panelRef.current;
    if (!stage || !panel) return;
    const s = stage.getBoundingClientRect();
    setSize({ w: s.width, h: s.height });
    const rel = (r: DOMRect) => ({
      cx: r.left - s.left + r.width / 2,
      top: r.top - s.top,
      bottom: r.bottom - s.top,
    });
    const P = rel(panel.getBoundingClientRect());
    const next: { d: string }[] = [];
    const link = (ax: number, ay: number, bx: number, by: number) => {
      const my = (ay + by) / 2;
      return { d: `M${ax},${ay} C${ax},${my} ${bx},${my} ${bx},${by}` };
    };
    decRefs.current.forEach((el) => {
      if (!el) return;
      const d = rel(el.getBoundingClientRect());
      next.push(link(d.cx, d.bottom, d.cx, P.top));
    });
    stackRefs.current.forEach((el) => {
      if (!el) return;
      const c = rel(el.getBoundingClientRect());
      next.push(link(c.cx, c.top, c.cx, P.bottom));
    });
    setWires(next);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 350);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure, active]);

  const activeAgent = agentWorkforce.find((a) => a.key === active);

  return (
    <div ref={stageRef} className="relative">
      {/* connecting lines (no moving dots) */}
      <svg
        className="pointer-events-none absolute inset-0 z-0"
        viewBox={`0 0 ${size.w} ${size.h}`}
        width={size.w}
        height={size.h}
      >
        <defs>
          <linearGradient id="acp-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8570bf" stopOpacity="0.5" />
            <stop offset="1" stopColor="#8570bf" stopOpacity="0.12" />
          </linearGradient>
        </defs>
        {wires.map((w, i) => (
          <path
            key={i}
            d={w.d}
            fill="none"
            stroke="url(#acp-line)"
            strokeWidth="1.2"
          />
        ))}
      </svg>

      <div className="relative z-10 space-y-5">
        {/* DECISIONS they answer */}
        <div>
          <Label>Decisions they answer</Label>
          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {cpDecisions.map((d, i) => (
              <div
                key={d.role}
                ref={(el) => {
                  decRefs.current[i] = el;
                }}
                className="rounded-xl border border-line bg-white/[0.035] backdrop-blur-md px-4 py-3 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-4/35 hover:bg-white/[0.03] backdrop-blur-md"
              >
                <div className="font-mono text-sm font-semibold text-fg">
                  {d.role}
                </div>
                <div className="font-mono text-[0.6rem] uppercase tracking-wider text-fg-dim">
                  {d.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* THE AGENT WORKFORCE */}
        <div
          ref={panelRef}
          className="rounded-2xl border border-purple-4/25 bg-purple-4/[0.03] p-4 sm:p-5"
        >
          <div className="flex items-center justify-between px-1 pb-3">
            <div className="flex items-center gap-2">
              <AMark className="h-4 w-4" />
              <span className="text-sm font-semibold">The agent workforce</span>
              <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-dim sm:inline">
                what each one does
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              6 live · orchestrated
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {agentWorkforce.map((a) => (
              <button
                key={a.key}
                onMouseEnter={() => setActive(a.key)}
                onClick={() => setActive(active === a.key ? null : a.key)}
                className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                  active === a.key
                    ? "border-purple-4/60 bg-white/[0.05]"
                    : "border-line bg-white/[0.025] backdrop-blur-md hover:border-purple-4/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-grad">
                    <AMark className="h-3.5 w-3.5" />
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full ${dotColor[a.dot]}`}
                  />
                </div>
                <div className="mt-3 text-sm font-semibold leading-tight">
                  {a.name}
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-fg-muted">
                  {a.does}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-2.5">
                  <span className="font-mono text-[0.55rem] uppercase tracking-wider text-fg-dim">
                    acts on {a.acts}
                  </span>
                  <span className="font-mono text-[0.6rem] text-purple-5">
                    {a.metric}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* drawer: how it helps + metrics */}
          <AnimatePresence initial={false}>
            {activeAgent && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-3 grid gap-5 rounded-xl border border-line bg-white/[0.025] backdrop-blur-md p-5 md:grid-cols-[1fr_1.2fr]">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-grad">
                        <AMark className="h-4 w-4" />
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-wider text-purple-5">
                        {activeAgent.role}
                      </span>
                    </div>
                    <div className="mt-3 text-lg font-semibold">
                      {activeAgent.name}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {activeAgent.does}
                    </p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {activeAgent.metrics.map((m) => (
                        <div key={m.label} className="rounded-lg border border-line bg-white/[0.03] backdrop-blur-md p-2 text-center">
                          <div className="text-sm font-semibold text-grad">
                            {m.value}
                          </div>
                          <div className="mt-0.5 text-[0.55rem] uppercase tracking-wide text-fg-dim">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-[0.6rem] uppercase tracking-wider text-fg-dim">
                        How it helps
                      </span>
                      <button
                        onClick={() => setActive(null)}
                        className="grid h-6 w-6 place-items-center rounded-md border border-line text-fg-dim hover:text-fg"
                        aria-label="Close"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="grid gap-2">
                      {activeAgent.points.map((p) => (
                        <div
                          key={p}
                          className="flex items-start gap-2 rounded-lg border border-line bg-white/[0.03] backdrop-blur-md px-3 py-2"
                        >
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple-4" />
                          <span className="text-xs text-fg-muted">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* THE STACK they act on */}
        <div>
          <Label>The stack they act on</Label>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {cpStack.map((s, i) => (
              <div
                key={s}
                ref={(el) => {
                  stackRefs.current[i] = el;
                }}
                className="rounded-lg border border-line bg-white/[0.03] backdrop-blur-md px-3 py-2 font-mono text-xs text-fg-muted transition-colors duration-300 hover:border-purple-4/40 hover:text-fg"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fg-dim">
      {children}
    </div>
  );
}
