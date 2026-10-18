"use client";

import { LiveViz, type VizKind } from "@/components/viz/LiveViz";

const map: Record<string, VizKind> = {
  planning: "forecast",
  resilience: "watch",
  execution: "pipeline",
  orchestration: "orchestrate",
};

export function SolutionViz({ slug }: { slug: string }) {
  return (
    <div className="mx-auto w-full max-w-xl">
      <LiveViz kind={map[slug] ?? "forecast"} />
    </div>
  );
}
