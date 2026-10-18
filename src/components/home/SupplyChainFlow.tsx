"use client";

import { motion } from "framer-motion";
import { scProcess } from "@/lib/data";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";

export function SupplyChainFlow() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="End to end"
            title="An agent on every step of"
            accent="the chain."
            sub="Plan, source, make, deliver, return. Agents reason and act across the whole flow, coordinated as one autonomy layer."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-16">
            {/* flowing spine */}
            <div className="absolute left-0 right-0 top-[26px] hidden h-0.5 overflow-hidden md:block">
              <div className="h-full w-full bg-line" />
              <motion.div
                className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-purple-4 to-transparent"
                animate={{ left: ["-33%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-5">
              {scProcess.map((s, i) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-grad text-lg font-semibold text-white shadow-[0_10px_36px_-10px_rgba(124,58,237,0.32)]">
                    {i + 1}
                  </div>
                  <div className="mt-5 w-full rounded-2xl border border-line bg-white/[0.03] backdrop-blur-md p-5">
                    <h3 className="text-lg font-bold">{s.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
