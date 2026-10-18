"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AMark } from "@/components/AMark";
import { agentWorkforce } from "@/lib/data";
import { LiveViz } from "@/components/viz/LiveViz";
import { AgentConvergence } from "@/components/viz/AgentConvergence";

type Topic = {
  id: string;
  label: string;
  lines: string[];
  metrics?: { value: string; label: string }[];
  viz?: React.ComponentProps<typeof LiveViz>["kind"];
};

const topics: Topic[] = [
  {
    id: "intro",
    label: "Overview",
    lines: [
      "$ agentra --explain workforce",
      "Booting Agentra ontology… ready.",
      "I run a workforce of six governed agents across your supply chain.",
      "Each one senses, reasons, and acts, with a human in the loop.",
      "Pick an agent below to explore it.",
    ],
  },
  ...agentWorkforce.map((a) => ({
    id: a.key,
    label: a.name.replace(" Agent", ""),
    viz: a.viz,
    metrics: a.metrics,
    lines: [
      `$ agentra --explain ${a.key}`,
      `▸ ${a.name}  [${a.role}]`,
      a.does,
      `→ reasons over ${a.acts.toLowerCase()}, then acts.`,
      `how it works: ${a.how.map((h) => h.title.toLowerCase()).join(" → ")}`,
      `impact: ${a.metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`).join("  ·  ")}`,
    ],
  })),
];

const TYPE_MS = 16;
const HOLD_MS = 2600;

export function AgentTerminal() {
  const [ti, setTi] = useState(0);
  const [done, setDone] = useState(false);
  // Start paused on the Overview (the "everything through Agentra" view).
  // The auto-tour only begins once a visitor taps an agent.
  const [paused, setPaused] = useState(true);

  const topic = topics[ti];
  const full = useMemo(() => topic.lines.join("\n"), [topic]);

  const handleComplete = useCallback(() => setDone(true), []);

  // Auto-advance to the next topic once the current one finishes typing.
  useEffect(() => {
    if (!done || paused) return;
    const t = setTimeout(() => {
      setDone(false);
      setTi((v) => (v + 1) % topics.length);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [done, paused]);

  const select = (i: number) => {
    setPaused(false); // tapping an agent starts the guided tour
    setDone(false);
    setTi(i);
  };

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="overflow-hidden rounded-2xl border border-line bg-[#08080e] shadow-[0_40px_120px_-50px_rgba(106,0,255,0.4)]">
        {/* chrome */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="font-mono text-xs text-fg-muted">
            agentra-ai · guided tour
          </span>
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-emerald-400">
            <span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              style={{ animation: "pulse-node 2s ease-in-out infinite" }}
            />
            online
          </span>
        </div>

        <div className="grid gap-0 md:grid-cols-[1.25fr_0.75fr]">
          {/* transcript */}
          <div className="min-h-[300px] border-b border-line p-5 md:border-b-0 md:border-r">
            {/* persona */}
            <div className="mb-4 flex items-center gap-2.5">
              <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-grad">
                <AMark className="h-4 w-4" />
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: "0 0 0 3px rgba(154,92,255,0.18)",
                    animation: "pulse-node 2.4s ease-in-out infinite",
                  }}
                />
              </span>
              <div>
                <div className="text-sm font-semibold leading-none">
                  Agentra AI
                </div>
                <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-fg-dim">
                  supply chain copilot
                </div>
              </div>
            </div>

            {/* typed output — keyed so each topic types from scratch */}
            <Typewriter key={topic.id} text={full} onComplete={handleComplete} />

            {/* metrics reveal */}
            <AnimatePresence>
              {done && topic.metrics && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 grid grid-cols-3 gap-2"
                >
                  {topic.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-lg border border-line bg-white/[0.02] p-2 text-center"
                    >
                      <div className="text-sm font-semibold text-grad">
                        {m.value}
                      </div>
                      <div className="mt-0.5 text-[0.55rem] uppercase tracking-wide text-fg-dim">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* live diagram */}
          <div className="flex items-center justify-center p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                {topic.viz ? <LiveViz kind={topic.viz} /> : <AgentConvergence />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* prompt chips */}
        <div className="flex flex-wrap gap-2 border-t border-line p-4">
          {topics.map((t, i) => (
            <button
              key={t.id}
              onClick={() => select(i)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[0.7rem] transition-all duration-200 active:scale-95 ${
                ti === i
                  ? "border-purple-4/60 bg-purple-4/10 text-purple-5"
                  : "border-line text-fg-muted hover:border-purple-4/40 hover:text-fg"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Types out `text` one character at a time; calls `onComplete` when finished.
 *  Keyed by topic so it remounts (and resets) per topic. */
function Typewriter({
  text,
  onComplete,
}: {
  text: string;
  onComplete: () => void;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) {
        clearInterval(id);
        onComplete();
      }
    }, TYPE_MS);
    return () => clearInterval(id);
  }, [text, onComplete]);

  const lines = text.slice(0, n).split("\n");
  const complete = n >= text.length;

  return (
    <pre className="whitespace-pre-wrap font-mono text-[0.8rem] leading-relaxed text-fg-muted">
      {lines.map((line, i) => (
        <div key={i} className={lineClass(line)}>
          {line}
          {!complete && i === lines.length - 1 && (
            <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-0.5 animate-pulse bg-purple-4" />
          )}
        </div>
      ))}
    </pre>
  );
}

function lineClass(line: string) {
  if (line.startsWith("$")) return "text-fg-dim";
  if (line.startsWith("▸")) return "text-fg font-semibold";
  if (line.startsWith("→") || line.startsWith("how") || line.startsWith("impact"))
    return "text-purple-5";
  return "text-fg-muted";
}
