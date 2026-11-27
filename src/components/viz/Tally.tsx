"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

/* A number that rolls to its new value whenever `value` changes, written
   straight to the DOM so the parent does not re-render on every frame.
   Server and first paint show the real value. */
export function Tally({ value, still, suffix = "" }: { value: number; still?: boolean; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const from = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (x: number) => Math.round(x).toLocaleString("en-GB") + suffix;
    if (still) {
      el.textContent = fmt(value);
      from.current = value;
      return;
    }
    const c = animate(from.current, value, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (x) => (el.textContent = fmt(x)),
    });
    from.current = value;
    return () => c.stop();
  }, [value, still, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("en-GB") + suffix}
    </span>
  );
}
