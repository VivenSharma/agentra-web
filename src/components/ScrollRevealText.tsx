"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * RedBaton-style scroll reveal: each word fades from dim grey to white as the
 * block scrolls through the viewport, filling left-to-right, top-to-bottom.
 *
 * On phones (and reduced-motion) this renders as plain, fully-visible text —
 * the per-word scroll animation is expensive on iOS Safari and can leave
 * headings looking blank (dark grey) if the scroll ranges never trigger.
 */
export function ScrollRevealText({
  text,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // longer travel distance = the words fill much more slowly as you scroll
    offset: ["start 0.95", "end 0.15"],
  });

  if (isMobile || reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");
  const total = words.length;
  // Each word fades over a wide window that heavily overlaps its neighbours, so
  // several words are always mid-transition at once — a smooth travelling
  // gradient rather than discrete word-by-word pops.
  const WINDOW = 0.38;

  return (
    <Tag className={`reveal-text ${className}`}>
      <span ref={ref} className="inline">
        {words.map((word, i) => {
          const start = (i / total) * (1 - WINDOW);
          const end = start + WINDOW;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </span>
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.35, 1]);
  const color = useTransform(
    progress,
    range,
    ["rgb(68,68,76)", "rgb(255,255,255)"]
  );
  return (
    <span className="relative mr-[0.26em] inline-block">
      <motion.span style={{ opacity, color }}>{children}</motion.span>
    </span>
  );
}
