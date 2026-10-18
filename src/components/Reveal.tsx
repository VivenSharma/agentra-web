"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 34,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  // On phones (and when the OS asks for reduced motion) we skip the JS-driven
  // reveal entirely: content renders immediately, never gated behind an
  // animation. This is the single biggest win for iOS Safari, where animating
  // opacity/blur on every section was leaving content blank and janky.
  if (isMobile || reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Desktop: a cheap opacity + translate reveal (no blur filter — animating
  // filter: blur repaints every frame and is unnecessary here).
  return (
    <motion.div
      className={`reveal ${className}`}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, delay: delay + 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
