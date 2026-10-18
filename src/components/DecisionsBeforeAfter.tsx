"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { decisions } from "@/lib/data";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";

export function DecisionsBeforeAfter() {
  return (
    <section className="relative border-y border-line bg-bg-1/50 py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="Agentic supply chain"
            title="From 4-day decisions"
            accent="to 5 minutes."
            sub={decisions.context}
          />
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-rose-500/20 bg-rose-950/10 p-8">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-rose-400">
                Before
              </div>
              <ul className="mt-6 space-y-4">
                {decisions.before.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-500/15">
                      <X className="h-3 w-3 text-rose-400" />
                    </span>
                    <span className="text-sm text-fg-muted">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

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
                  After, Agentra
                </div>
                <ul className="mt-6 space-y-4">
                  {decisions.after.map((a) => (
                    <li key={a} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-purple-4/20">
                        <Check className="h-3 w-3 text-purple-4" />
                      </span>
                      <span className="text-sm text-fg">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {decisions.stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass p-5 text-center"
            >
              <div className="text-2xl font-semibold tracking-tight text-grad sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-fg-dim">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-10 text-center text-lg font-bold">
            Dashboards flag the problem.{" "}
            <span className="text-fg">Agents close it.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
