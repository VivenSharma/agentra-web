"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* Shared by the blog diagrams: `live` is true while the element is on
   screen, so looping motion only runs when someone can see it. `still` is
   true under prefers-reduced-motion; diagrams then show their final state. */
export function useLive<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [live, setLive] = useState(false);
  const still = useReducedMotion() ?? false;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, live, still };
}

/* Steps through 0..count-1 every `ms` while live; holds `rest` when still. */
export function useCycle(count: number, ms: number, live: boolean, still: boolean, rest = count - 1) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!live || still) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % count), ms);
    return () => window.clearInterval(t);
  }, [count, ms, live, still]);
  return still ? rest : i;
}
