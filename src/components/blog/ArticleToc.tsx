"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* "On this page": the article's section headings, with the one being read
   highlighted (IntersectionObserver, no scroll listeners). Shown beside the
   article on wide screens only. */
export function ArticleToc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    // a heading counts as "current" once it passes the upper third of the screen
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).map((e) => e.target.id);
        if (seen.length) setActive(seen[seen.length - 1]);
      },
      { rootMargin: "0px 0px -66% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  if (items.length < 3) return null;

  return (
    <nav aria-label="On this page" className="sticky top-32">
      <p className="text-sm font-medium text-fg">On this page</p>
      <ul className="relative mt-4 space-y-1 border-l border-white/10">
        {items.map((i) => {
          const on = i.id === active;
          return (
            <li key={i.id} className="relative">
              {on && (
                <motion.span
                  layoutId="toc-active"
                  className="absolute -left-px top-0 h-full w-px bg-purple-5 shadow-[0_0_10px_rgba(184,155,245,0.9)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <a
                href={`#${i.id}`}
                className={`block py-1.5 pl-4 text-sm leading-snug transition-colors duration-300 ${
                  on ? "text-fg" : "text-fg-dim hover:text-fg-muted"
                }`}
              >
                {i.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
