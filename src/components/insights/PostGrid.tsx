"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PostCard } from "./PostCard";
import { insightCategories, type Post } from "@/lib/insights";

const ALL = "All";

// Category filter + article grid. The pill highlight slides between filters
// (layoutId) so the reader sees which set they are looking at.
export function PostGrid({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string>(ALL);
  const reduce = useReducedMotion();
  const filters = [ALL, ...insightCategories];
  const visible = active === ALL ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter articles by topic"
        className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:px-0"
      >
        {filters.map((f) => {
          const on = f === active;
          return (
            <button
              key={f}
              aria-pressed={on}
              onClick={() => setActive(f)}
              className={`relative shrink-0 rounded-full border px-4 py-2 text-sm transition-colors active:scale-[0.98] ${
                on
                  ? "border-purple-4/50 text-fg"
                  : "border-line-strong text-fg-muted hover:border-white/25 hover:text-fg"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="insight-filter"
                  className="absolute inset-0 rounded-full bg-purple-3/20"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{f}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line-strong px-6 py-16 text-center">
          <p className="text-lg font-medium">Nothing in {active} yet.</p>
          <p className="mt-2 text-sm text-fg-muted">
            New articles land every few weeks.{" "}
            <button
              onClick={() => setActive(ALL)}
              className="text-purple-5 underline-offset-4 hover:underline"
            >
              See all articles
            </button>
          </p>
        </div>
      ) : (
        <motion.ul layout={!reduce} className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <PostCard post={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
