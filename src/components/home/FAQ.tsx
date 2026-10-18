"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            align="center"
            eyebrow="Questions"
            title="What enterprise leaders"
            accent="ask us first."
          />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-line border-y border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-base font-semibold sm:text-lg">
                    {f.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 ${
                      isOpen ? "rotate-45 border-purple-4/50 bg-purple-4/10" : ""
                    }`}
                  >
                    <Plus className="h-4 w-4 text-purple-5" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-14 text-fg-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
