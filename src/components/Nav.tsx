"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { CoverArt } from "./insights/CoverArt";
import { insightDoors } from "@/lib/insights-nav";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; desc?: string }[];
  // Wide panel with cover art per child (Insights), instead of a plain list
  mega?: boolean;
};

const navItems: NavItem[] = [
  { label: "Platform", href: "/platform" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      { label: "Planning", href: "/solutions/planning", desc: "Replan continuously" },
      { label: "Resilience", href: "/solutions/resilience", desc: "See disruption early" },
      { label: "Execution", href: "/solutions/execution", desc: "Act inside your systems" },
      { label: "Orchestration", href: "/solutions/orchestration", desc: "Coordinate every agent" },
    ],
  },
  // Agents page removed — agent detail now lives inside each Solutions subpage.
  // Insights replaces the hidden Resources item: three doors (blog, events,
  // customer stories), as in the website proposal. Pages are noindex for now.
  {
    label: "Insights",
    href: "/resources",
    mega: true,
    children: insightDoors.map((d) => ({ label: d.label, href: d.href, desc: d.desc })),
  },
  { label: "Company", href: "/company" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (handled via onClick on links below).
  const closeMenu = () => setOpen(false);

  // The RSM Nexus event landing is a focused, standalone page with its own
  // chrome — hide the global site nav there. (Hooks above run unconditionally.)
  if (pathname?.startsWith("/rsm-nexus")) return null;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-[1440px] px-4 pt-4 sm:px-6">
        <nav
          className={`nav-capsule pointer-events-auto grid h-16 grid-cols-[auto_1fr_auto] items-center px-5 md:px-8 ${
            scrolled ? "scrolled" : ""
          }`}
        >
          <Logo />

          <div className="hidden items-center justify-center gap-9 md:flex">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  href={item.href}
                  className={`nav-link inline-flex items-center gap-1 ${
                    pathname.startsWith(item.href) && item.href !== "/"
                      ? "is-active"
                      : ""
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  )}
                </Link>

                {item.children && (
                  <AnimatePresence>
                    {hovered === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 ${
                          item.mega ? "w-[520px]" : "w-64"
                        }`}
                      >
                        {item.mega ? (
                          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-line bg-surface p-2 shadow-2xl shadow-black/60">
                            {insightDoors.map((d) => (
                              <Link
                                key={d.href}
                                href={d.href}
                                className="group rounded-xl p-2 transition-colors hover:bg-white/5"
                              >
                                <CoverArt
                                  seed={d.cover.seed}
                                  src={d.cover.src}
                                  block={d.cover.block}
                                  className="aspect-[16/10] rounded-lg"
                                />
                                <div className="mt-3 text-sm font-semibold text-fg">
                                  {d.label}
                                </div>
                                <div className="mt-0.5 text-xs leading-snug text-fg-dim">
                                  {d.desc}
                                </div>
                              </Link>
                            ))}
                          </div>
                        ) : (
                        <div className="overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-2xl shadow-black/60">
                          {item.children.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-white/5"
                            >
                              <div className="text-sm font-semibold text-fg">
                                {c.label}
                              </div>
                              {c.desc && (
                                <div className="text-xs text-fg-dim">
                                  {c.desc}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-3">
            <Link
              href="/contact"
              className="btn-primary hidden items-center px-6 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98] md:inline-flex"
            >
              Book a demo
            </Link>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-fg transition-colors hover:border-purple-4/50 hover:text-fg md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="pointer-events-auto container-x mt-3 md:hidden">
          <div
            className="nav-capsule flex max-h-[80vh] flex-col gap-1 overflow-y-auto px-4 py-4"
            style={{ borderRadius: 24 }}
          >
            {navItems.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex-1 rounded-lg px-3 py-3 text-base font-medium text-fg-muted hover:bg-white/5 hover:text-fg"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() =>
                        setMobileExpanded(
                          mobileExpanded === item.label ? null : item.label
                        )
                      }
                      className="p-3 text-fg-muted"
                      aria-label={`Expand ${item.label}`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          mobileExpanded === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                {item.children && mobileExpanded === item.label && (
                  <div className="ml-3 border-l border-line pl-3">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={closeMenu}
                        className="block rounded-lg px-3 py-2.5 text-sm text-fg-muted hover:text-fg"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="btn-primary mt-2 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold"
            >
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
