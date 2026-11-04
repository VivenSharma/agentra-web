"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ClipboardCheck, RotateCcw, Send, TrendingUp, UserCheck, type LucideIcon } from "lucide-react";

/* "The daily demand-to-replenishment loop", rebuilt from the graphic in
   Marketing's fresh-food article so it sits in the dark page instead of
   a white image. Copy is verbatim from that graphic.

   Motion: one signal runs the loop every 8s. Sense lights, the line fills
   to Test, Test lights, the line splits to Release and Escalate, both light,
   then the repeat icon turns. It only plays while on screen and is static
   (all lines drawn) under prefers-reduced-motion. Styles: .rl-* in globals.css */

function Step({
  icon: Icon,
  label,
  title,
  body,
  tone,
  active,
}: {
  icon: LucideIcon;
  label: string;
  title: string;
  body: string;
  tone: "purple" | "green" | "rose";
  active: string;
}) {
  const t = {
    purple: { chip: "bg-purple-3/15 text-purple-5 ring-purple-4/30", label: "text-purple-5" },
    green: { chip: "bg-emerald-400/10 text-emerald-300 ring-emerald-300/25", label: "text-emerald-300" },
    rose: { chip: "bg-rose-400/10 text-rose-300 ring-rose-300/25", label: "text-rose-300" },
  }[tone];
  return (
    <div className={`rl-card rl-card--${tone} relative h-full rounded-2xl bg-white/[0.03] p-5 ring-1 ring-white/10 sm:p-6`}>
      <span aria-hidden className={`rl-glow ${active} pointer-events-none absolute inset-0 rounded-2xl`} />
      <div className="relative flex gap-4 sm:gap-5">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ring-1 ${t.chip}`}>
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className={`text-xs font-semibold uppercase tracking-wider ${t.label}`}>{label}</p>
          <h4 className="mt-1.5 text-lg font-medium leading-snug text-fg">{title}</h4>
          <p className="mt-1.5 text-base leading-relaxed text-fg-muted">{body}</p>
        </div>
      </div>
    </div>
  );
}

// A thin track with a purple fill that grows along it
function Line({ fill, className = "" }: { fill: string; className?: string }) {
  return (
    <span aria-hidden className={`relative block bg-white/10 ${className}`}>
      <span className={`rl-fill ${fill} absolute inset-0 bg-purple-4`} />
    </span>
  );
}

function Stem({ fill, h = "h-9" }: { fill: string; h?: string }): ReactNode {
  return (
    <div className={`flex justify-center ${h}`}>
      <Line fill={`rl-fill--y ${fill}`} className="h-full w-px" />
    </div>
  );
}

export function ReplenishmentLoop() {
  const ref = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure
      ref={ref}
      className={`rl ${live ? "is-live" : ""} rounded-[24px] bg-bg-1 p-6 ring-1 ring-white/10 sm:p-10`}
      aria-label="The daily demand-to-replenishment loop"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-purple-5">Daily replenishment</p>
      <h3 className="mt-3 text-2xl font-light leading-snug tracking-tight text-fg sm:text-3xl">
        The daily <span className="text-purple-5">demand-to-replenishment</span> loop
      </h3>
      <p className="mt-2 text-base text-fg-muted">How agents turn store-level demand into replenishment actions.</p>

      <div className="mt-8">
        <div>
          <Step
            icon={TrendingUp}
            label="01 · Sense"
            title="What does each store need?"
            body="Analyse recent sales, historical patterns and relevant demand signals."
            tone="purple"
            active="rl-on-1"
          />
        </div>
        <Stem fill="rl-a" />
        <div>
          <Step
            icon={ClipboardCheck}
            label="02 · Test"
            title="Can the requirement be fulfilled?"
            body="Calculate ingredient needs. Check store stock, incoming deliveries and DC availability."
            tone="purple"
            active="rl-on-2"
          />
        </div>

        {/* Split: one stem, then on desktop a bar that branches to both outcomes */}
        <Stem fill="rl-b" h="h-6" />
        <div aria-hidden className="relative hidden h-6 md:block">
          <span className="absolute top-0 left-[calc(25%-0.3125rem)] right-1/2">
            <Line fill="rl-fill--x rl-fill--from-right rl-c" className="h-px w-full" />
          </span>
          <span className="absolute top-0 left-1/2 right-[calc(25%-0.3125rem)]">
            <Line fill="rl-fill--x rl-c" className="h-px w-full" />
          </span>
          <span className="absolute top-0 bottom-0 left-[calc(25%-0.3125rem)]">
            <Line fill="rl-fill--y rl-d" className="h-full w-px" />
          </span>
          <span className="absolute top-0 bottom-0 right-[calc(25%-0.3125rem)]">
            <Line fill="rl-fill--y rl-d" className="h-full w-px" />
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Step
            icon={Send}
            label="03 · Release"
            title="Routine orders proceed"
            body="Orders move within agreed guardrails."
            tone="green"
            active="rl-on-3"
          />
          <Step
            icon={UserCheck}
            label="04 · Escalate"
            title="Exceptions go to your team"
            body="The inventory team reviews, with reasons."
            tone="rose"
            active="rl-on-3"
          />
        </div>
      </div>

      <figcaption className="mt-8 flex items-center gap-2.5 border-t border-white/10 pt-6 text-base text-fg-muted">
        <RotateCcw className="rl-spin h-4 w-4 shrink-0 text-purple-5" strokeWidth={2} aria-hidden />
        Repeats as new demand and stock data arrives.
      </figcaption>
    </figure>
  );
}
