"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { exception } from "@/lib/data";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";

const STEP_MS = 900;

const toneClass: Record<string, string> = {
  green: "text-emerald-400 bg-emerald-400/10",
  amber: "text-amber-400 bg-amber-400/10",
  purple: "text-purple-4 bg-purple-4/10",
};

export function ExceptionConsole() {
  const [step, setStep] = useState(0); // 0..chain.length reveals reasoning steps

  useEffect(() => {
    if (step >= exception.chain.length + 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [step]);

  const done = step > exception.chain.length;

  return (
    <section className="relative border-y border-line bg-bg-1/50 py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Agentic supply chain"
            title="One exception. Zero waiting."
            accent="Fully governed."
            sub="The agent detects, reasons and acts. Every step needs your rules, not your night shift."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-line bg-[#0b0b14] shadow-[0_40px_120px_-40px_rgba(124,58,237,0.5)]">
            {/* window chrome */}
            <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="font-mono text-xs text-fg-muted">
                Agentra · Exception Console · {exception.id}
              </div>
            </div>

            {/* table (scrolls horizontally on small screens) */}
            <div className="overflow-x-auto">
              <div className="min-w-[560px]">
            {/* table header */}
            <div className="grid grid-cols-[1fr_2fr_1.4fr_1.2fr] gap-4 px-6 py-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fg-dim">
              <span>Exception</span>
              <span>Event</span>
              <span>Status</span>
              <span>Reasoning</span>
            </div>

            {/* active row */}
            <div className="mx-4 rounded-xl border border-purple-4/25 bg-purple-4/[0.06] px-4 py-5">
              <div className="grid grid-cols-[1fr_2fr_1.4fr_1.2fr] items-center gap-4">
                <span className="font-mono text-sm text-purple-5">
                  {exception.id}
                </span>
                <span className="text-sm font-semibold text-fg">
                  {exception.event}
                </span>
                <span>
                  <AnimatePresence mode="wait">
                    {done ? (
                      <motion.span
                        key="done"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-semibold text-emerald-400"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {exception.status}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="working"
                        className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-semibold text-amber-400"
                      >
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                        Reasoning…
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <span className="font-mono text-sm text-fg-muted">
                  reasoning: <span className="text-fg">{exception.reasoning}</span>
                </span>
              </div>

              {/* reasoning chain reveal */}
              <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-[0.65rem] uppercase tracking-wider">
                {exception.chain.map((c, i) => (
                  <motion.span
                    key={c}
                    initial={{ opacity: 0, y: 6 }}
                    animate={
                      step > i ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 0 }
                    }
                    className={`rounded-md px-2 py-1 ${
                      step > i ? "text-purple-5 bg-purple-4/10" : "text-fg-dim"
                    }`}
                  >
                    {c}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: done ? 1 : 0.25 }}
                  className="text-fg-dim"
                >
                  APPROVED BY: {exception.approvedBy}
                </motion.span>
              </div>
            </div>

            {/* skeleton rows */}
            <div className="space-y-2 px-4 py-4">
              {exception.rows.map((r) => (
                <div
                  key={r.id}
                  className="grid grid-cols-[1fr_2fr_1.4fr_1.2fr] items-center gap-4 rounded-lg px-4 py-3 text-sm"
                >
                  <span className="font-mono text-xs text-fg-dim">{r.id}</span>
                  <span className="text-fg-muted">{r.event}</span>
                  <span
                    className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${toneClass[r.tone]}`}
                  >
                    {r.status}
                  </span>
                  <span className="font-mono text-xs text-fg-dim">queued</span>
                </div>
              ))}
            </div>
              </div>
            </div>

            <div className="border-t border-line px-6 py-3 font-mono text-[0.65rem] text-fg-dim">
              agentra-ai.com · Acts, not just advises.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
