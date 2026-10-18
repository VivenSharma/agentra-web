"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { signalsIn, decisionsOut, planeModules } from "@/lib/data";
import { AMark } from "@/components/AMark";

type Wire = { d: string; kind: "in" | "out" };

export function ControlPlane() {
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const inRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [wires, setWires] = useState<Wire[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const hub = hubRef.current;
    if (!stage || !hub) return;
    const s = stage.getBoundingClientRect();
    setSize({ w: s.width, h: s.height });
    const h = hub.getBoundingClientRect();
    const hubLeft = { x: h.left - s.left, y: h.top - s.top + h.height / 2 };
    const hubRight = { x: h.right - s.left, y: h.top - s.top + h.height / 2 };

    const next: Wire[] = [];
    inRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const a = { x: r.right - s.left, y: r.top - s.top + r.height / 2 };
      const midX = (a.x + hubLeft.x) / 2;
      next.push({
        d: `M${a.x},${a.y} C${midX},${a.y} ${midX},${hubLeft.y} ${hubLeft.x},${hubLeft.y}`,
        kind: "in",
      });
    });
    outRefs.current.forEach((el) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const b = { x: r.left - s.left, y: r.top - s.top + r.height / 2 };
      const midX = (hubRight.x + b.x) / 2;
      next.push({
        d: `M${hubRight.x},${hubRight.y} C${midX},${hubRight.y} ${midX},${b.y} ${b.x},${b.y}`,
        kind: "out",
      });
    });
    setWires(next);
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(() => measure());
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 300); // after fonts settle
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, [measure]);

  return (
    <div
      ref={stageRef}
      className="relative grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-8"
    >
      {/* wires */}
      <svg
        className="pointer-events-none absolute inset-0 z-0"
        viewBox={`0 0 ${size.w} ${size.h}`}
        width={size.w}
        height={size.h}
      >
        <defs>
          <linearGradient id="cp-in" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8570bf" stopOpacity="0.25" />
            <stop offset="1" stopColor="#8570bf" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="cp-out" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#06b6d4" stopOpacity="0.85" />
            <stop offset="1" stopColor="#06b6d4" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        {wires.map((w, i) => (
          <g key={i}>
            <path
              d={w.d}
              fill="none"
              stroke={w.kind === "in" ? "url(#cp-in)" : "url(#cp-out)"}
              strokeWidth="1.5"
              strokeDasharray="5 6"
              style={{ animation: `dash ${16 + (i % 4) * 3}s linear infinite` }}
            />
            <circle r="2.6" fill={w.kind === "in" ? "#a695d4" : "#67e8f9"}>
              <animateMotion
                dur={`${2.4 + (i % 5) * 0.4}s`}
                repeatCount="indefinite"
                begin={`${-(i % 6) * 0.35}s`}
                path={w.d}
                calcMode="linear"
              />
            </circle>
          </g>
        ))}
      </svg>

      {/* IN column */}
      <div className="relative z-10 flex flex-col gap-3">
        <div className="mb-1 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-dim">
          Your stack &rsaquo; in
        </div>
        {signalsIn.map((s, i) => (
          <div
            key={s}
            ref={(el) => {
              inRefs.current[i] = el;
            }}
            className="rounded-xl border border-line bg-white/[0.03] backdrop-blur-md px-3 py-2.5 text-xs font-semibold text-fg-muted sm:text-sm"
          >
            {s}
          </div>
        ))}
      </div>

      {/* PLANE / hub */}
      <div className="relative z-10 mx-auto">
        <div
          ref={hubRef}
          className="relative mx-auto flex h-40 w-40 flex-col items-center justify-center rounded-3xl sm:h-48 sm:w-48"
          style={{
            background: "linear-gradient(135deg,#6f57ab,#5a4794)",
            boxShadow: "0 0 70px -10px rgba(124,58,237,0.35)",
          }}
        >
          <AMark className="h-12 w-12" />
          <span className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/85">
            Autonomy layer
          </span>
        </div>
        {/* module chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {planeModules.map((m) => (
            <span
              key={m.key}
              title={m.tip}
              className="cursor-default rounded-full border border-purple-4/25 bg-purple-4/10 px-3 py-1 text-[0.65rem] font-semibold text-purple-5 transition-colors hover:border-purple-4/60 hover:text-fg"
            >
              {m.label}
            </span>
          ))}
        </div>
      </div>

      {/* OUT column */}
      <div className="relative z-10 flex flex-col gap-3">
        <div className="mb-1 text-right font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-dim">
          Decisions out &rsaquo;
        </div>
        {decisionsOut.map((d, i) => (
          <div
            key={d}
            ref={(el) => {
              outRefs.current[i] = el;
            }}
            className="rounded-xl border border-line bg-white/[0.03] backdrop-blur-md px-3 py-2.5 text-right text-xs font-semibold text-fg-muted sm:text-sm"
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}
