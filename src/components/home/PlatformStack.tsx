"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Diamond } from "lucide-react";
import { stack } from "@/lib/content";
import { SectionHeader } from "@/components/ui/Primitives";
import { Reveal } from "@/components/Reveal";

export function PlatformStack() {
  const [active, setActive] = useState<string | null>("L3");

  return (
    <section id="platform" className="relative py-24 sm:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="The platform"
            title="Six layers. One"
            accent="defensible moat."
            sub="Agentra is a full agentic stack, from enterprise systems all the way up to autonomous agents. The moat sits in the middle: a supply-chain-native ontology that lets agents reason like operators, not chatbots."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-fg-muted">
            <span>Model-agnostic LLMs</span>
            <span>Open infrastructure</span>
            <span>Enterprise-grade governance</span>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-2xl">
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-2.5">
              {stack.map((layer, idx) => {
                const isActive = active === layer.id;
                return (
                  <motion.button
                    key={layer.id}
                    onMouseEnter={() => setActive(layer.id)}
                    onFocus={() => setActive(layer.id)}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5 ${
                      layer.moat
                        ? "border-purple-4/40"
                        : "border-line hover:border-purple-4/30"
                    }`}
                    style={{
                      background: layer.moat
                        ? "linear-gradient(135deg, rgba(139,92,246,0.16), rgba(6,182,212,0.10))"
                        : isActive
                        ? "rgba(255,255,255,0.04)"
                        : "transparent",
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`flex h-9 w-11 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                          layer.moat
                            ? "bg-grad-2 text-white"
                            : "bg-white/5 text-fg-muted"
                        }`}
                      >
                        {layer.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold tracking-tight">
                            {layer.name}
                          </span>
                          {layer.moat && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-white">
                              <Diamond className="h-2.5 w-2.5" /> Moat
                            </span>
                          )}
                        </div>
                        <motion.p
                          animate={{
                            height: isActive || layer.moat ? "auto" : 0,
                            opacity: isActive || layer.moat ? 1 : 0,
                          }}
                          className="overflow-hidden text-sm leading-relaxed text-fg-muted"
                        >
                          <span className="block pt-1.5">{layer.desc}</span>
                        </motion.p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
              <div className="mt-1 rounded-2xl border border-dashed border-line px-5 py-3 text-center text-xs uppercase tracking-[0.16em] text-fg-dim">
                Foundation · Model-agnostic LLM · Open infra
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
