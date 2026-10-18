"use client";

import { motion } from "framer-motion";
import { nightShift } from "@/lib/data";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";

export function NightShiftTimeline() {
  const { before, after } = nightShift;
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Agentic supply chain"
            title="A container missed its cutoff at 2:14am. Nobody was awake."
            accent="The agent was."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {/* Before */}
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-2xl border border-rose-500/20 bg-rose-950/10 p-8">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-rose-400">
                {before.label}
              </div>
              <p className="mt-1 text-sm text-fg-dim">{before.note}</p>

              <div className="mt-8 space-y-8 border-l border-rose-500/25 pl-6">
                <TimelineNode t={before.steps[0].t} text={before.steps[0].text} tone="rose" />
                <div className="py-2">
                  <div className="text-2xl font-semibold text-rose-400">
                    {before.gap}
                  </div>
                  <div className="text-sm text-fg-dim">{before.gapNote}</div>
                </div>
                <TimelineNode t={before.steps[1].t} text={before.steps[1].text} tone="grey" />
              </div>

              <div className="mt-8 flex items-center justify-between rounded-xl border border-rose-500/20 bg-rose-500/[0.06] px-5 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-300/80">
                  Cost window
                </span>
                <span className="text-xl font-semibold text-rose-400">
                  {before.window}
                </span>
              </div>
            </div>
          </Reveal>

          {/* After */}
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-purple-4/25 p-8">
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(circle at 80% 0%, rgba(139,92,246,0.15), transparent 60%)",
                }}
              />
              <div className="relative">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-purple-5">
                  {after.label}
                </div>
                <p className="mt-1 text-sm text-fg-dim">{after.note}</p>

                <div className="mt-8 space-y-6 border-l border-purple-4/40 pl-6">
                  {after.steps.map((s, i) => (
                    <TimelineNode key={i} t={s.t} text={s.text} tone="purple" delay={i * 0.12} />
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between rounded-xl border border-purple-4/25 bg-purple-4/[0.08] px-5 py-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-5">
                    Cost window
                  </span>
                  <span className="text-xl font-semibold text-purple-5">
                    {after.window}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function TimelineNode({
  t,
  text,
  tone,
  delay = 0,
}: {
  t: string;
  text: string;
  tone: "rose" | "purple" | "grey";
  delay?: number;
}) {
  const dot =
    tone === "rose"
      ? "bg-rose-400"
      : tone === "purple"
      ? "bg-grad-2"
      : "bg-white/30";
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative"
    >
      <span
        className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-bg ${dot}`}
      />
      <div className="font-mono text-xs text-fg-dim">{t}</div>
      <div className="mt-0.5 text-sm font-medium text-fg">{text}</div>
    </motion.div>
  );
}
