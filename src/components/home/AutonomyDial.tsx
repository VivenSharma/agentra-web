"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { autonomy } from "@/lib/content";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";

export function AutonomyDial() {
  const [step, setStep] = useState(1);

  return (
    <section
      id="governance"
      className="relative border-y border-line bg-bg-1/50 py-24 sm:py-28"
    >
      <div className="container-x">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Governed by design"
            title="You set the level of"
            accent="autonomy."
            sub="Every workflow runs at the autonomy you choose. Dial it up as trust builds, from recommendations, to acting with approval, to full autopilot within your guardrails."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 max-w-3xl">
            {/* Track */}
            <div className="relative px-2">
              <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/8" />
              <motion.div
                className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-grad"
                animate={{ width: `${(step / (autonomy.length - 1)) * 100}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
              />
              <div className="relative flex justify-between">
                {autonomy.map((a, i) => {
                  const active = i <= step;
                  return (
                    <button
                      key={a.key}
                      onClick={() => setStep(i)}
                      className="group flex flex-col items-center gap-3"
                      aria-label={a.title}
                    >
                      <span
                        className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          active
                            ? "border-purple-4 bg-purple-4"
                            : "border-white/20 bg-bg"
                        }`}
                      >
                        {i === step && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-4 opacity-60" />
                        )}
                      </span>
                      <span
                        className={`text-sm font-semibold transition-colors ${
                          i === step ? "text-fg" : "text-fg-dim"
                        }`}
                      >
                        {a.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detail */}
            <div className="relative mt-10 min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="glass p-8 text-center"
                >
                  <h3 className="text-xl font-semibold">
                    {autonomy[step].title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-lg text-fg-muted">
                    {autonomy[step].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                "Human-in-the-loop",
                "Explainable",
                "Guardrails",
                "Fully auditable",
              ].map((t) => (
                <div
                  key={t}
                  className="rounded-xl border border-line bg-white/[0.03] backdrop-blur-md px-4 py-3 text-center text-xs font-medium text-fg-muted"
                >
                  {t}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
