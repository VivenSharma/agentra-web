"use client";

import { useEffect } from "react";

// One delegated listener for the whole site: whichever .spotlight card the
// mouse is over gets --mx/--my set, and globals.css paints a soft purple
// light and lit border that follow the cursor. No React state, no re-renders.
// Touch and pen are ignored, so phones never pay for it.
export function Spotlight() {
  useEffect(() => {
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const el = (e.target as Element | null)?.closest<HTMLElement>(".spotlight, .card-hover, .glass-hover");
      if (!el) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);
  return null;
}
