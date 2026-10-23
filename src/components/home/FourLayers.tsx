"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Workflow, Bot, ShieldCheck, Plus, Minus } from "lucide-react";
import { ScrollRevealText } from "@/components/ScrollRevealText";
import { Reveal } from "@/components/Reveal";

const layers = [
  {
    id: "data",
    title: "Data & Ontology Layer",
    icon: Database,
    body: "Your enterprise systems unified into a supply-chain-native ontology. SKUs, lanes, lead times and service levels become one shared language that agents can reason over, not a pile of disconnected tables.",
    tags: ["1000+ integrations", "Proprietary ontology", "Single source of truth"],
  },
  {
    id: "reason",
    title: "Reasoning & Workflows Layer",
    icon: Workflow,
    body: "Composable, governed decision workflows. Agents weigh cost, service and capacity trade-offs the way your best operators would, then plan the next action across every function.",
    tags: ["Governed workflows", "Trade-off reasoning", "Cross-function"],
  },
  {
    id: "agents",
    title: "Workforce Agents & Learning",
    icon: Bot,
    body: "A workforce of specialised agents that act across planning, execution and risk, coordinate with each other, and get sharper with every decision they make.",
    tags: ["Specialised agents", "Orchestrated", "Continuously learning"],
  },
  {
    id: "guardrails",
    title: "Guardrails, Security & Governance",
    icon: ShieldCheck,
    body: "Security, governance and oversight built into the architecture, not bolted on. Every action is controllable, every decision auditable, and every agent works inside the autonomy your team configures.",
    tags: ["Role-based access", "Full audit trails", "Configurable autonomy"],
  },
];

export function FourLayers() {
  const [open, setOpen] = useState(0);

  return (
    <section id="architecture" className="relative py-24 sm:py-32">
      <div className="container-x">
        {/* heading */}
        <div className="mx-auto max-w-3xl text-center">
          <ScrollRevealText
            as="h2"
            text="Four layers. One continuous decision loop."
            className="text-balance text-3xl font-light leading-[1.1] tracking-[-0.02em] sm:text-[2.7rem]"
          />
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Stacked-layers visual — all four plates shown at once. The active
              layer lifts and turns solid; the others stay translucent. */}
          <div className="flex justify-center lg:justify-start">
            <div
              className="relative aspect-square w-[min(82vw,400px)]"
              style={{ perspective: "1600px" }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateX(56deg) rotateZ(-45deg)",
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {layers.map((l, i) => {
                  const active = open < 0 ? 0 : open;
                  const isOpen = active === i;
                  // first item sits on top; each layer below is deeper
                  const depth = (layers.length - 1 - i) * 44;
                  return (
                    <motion.div
                      key={l.id}
                      onMouseEnter={() => setOpen(i)}
                      className="absolute inset-0 m-auto h-[230px] w-[230px] cursor-pointer rounded-[30px] border sm:h-[260px] sm:w-[260px]"
                      animate={{
                        translateZ: depth + (isOpen ? 34 : 0),
                        opacity: isOpen ? 1 : 0.4,
                        borderColor: isOpen
                          ? "rgba(180,140,255,0.85)"
                          : "rgba(160,107,255,0.25)",
                      }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        transformStyle: "preserve-3d",
                        background: isOpen
                          ? "linear-gradient(145deg, rgba(140,100,210,0.7), rgba(66,48,116,0.6))"
                          : "linear-gradient(145deg, rgba(90,71,148,0.4), rgba(40,30,70,0.42))",
                        boxShadow: isOpen
                          ? "inset 0 1px 0 rgba(255,255,255,0.22), 0 30px 70px -24px rgba(160,107,255,0.5)"
                          : "inset 0 1px 0 rgba(255,255,255,0.1), 0 24px 60px -28px rgba(0,0,0,0.7)",
                      }}
                    >
                      {/* icon billboarded flat to the viewer (cancels the tilt) */}
                      <div
                        className="flex h-full w-full items-center justify-center"
                        style={{
                          transform: "rotateZ(45deg) rotateX(-56deg)",
                          transformStyle: "preserve-3d",
                        }}
                      >
                        <l.icon
                          className={`h-8 w-8 transition-opacity duration-300 ${
                            isOpen ? "text-white opacity-95" : "text-white/45"
                          }`}
                          strokeWidth={1.4}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Accordion */}
          <Reveal delay={0.1}>
            <div className="divide-y divide-line border-y border-line">
              {layers.map((l, i) => {
                const isOpen = open === i;
                return (
                  <div key={l.id}>
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      onMouseEnter={() => setOpen(i)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span
                        className={`font-label text-sm uppercase tracking-[0.1em] transition-colors ${
                          isOpen ? "text-fg" : "text-fg-muted"
                        }`}
                        style={{ fontFamily: "var(--font-label)" }}
                      >
                        {l.title}
                      </span>
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isOpen
                            ? "border-purple-4/60 text-purple-4"
                            : "border-line text-fg-muted"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6">
                            <p className="max-w-lg leading-relaxed text-fg-muted">
                              {l.body}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {l.tags.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full border border-line px-3 py-1 text-xs text-purple-5"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
