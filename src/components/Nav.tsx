"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { resourceDoors } from "@/lib/insights-nav";
import { sectors } from "@/lib/sectors";
import { hasPress } from "@/lib/press";

type NavLink = { label: string; href: string; desc?: string };
type NavGroup = { title: string; href: string; links: NavLink[] };
type NavItem = {
  label: string;
  href: string;
  children?: NavLink[];
  groups?: NavGroup[]; // multi-column dropdown
};

// Condensed top nav (Nov 2026: keep the bar short).
// Solutions is a 3-way mega menu holding Platform, capabilities and
// industries; Customers and Press sit inside Company (as in the footer).
// Resources and Trust stay standalone top-level items by request.
// Book a demo is the only button.
const navItems: NavItem[] = [
  {
    label: "Solutions",
    href: "/solutions",
    groups: [
      {
        title: "Platform",
        href: "/platform",
        links: [
          { label: "Overview", href: "/platform", desc: "Every signal in, one autonomy layer out" },
        ],
      },
      {
        title: "By capability",
        href: "/solutions",
        links: [
          { label: "Planning", href: "/solutions/planning", desc: "Replan continuously" },
          { label: "Resilience", href: "/solutions/resilience", desc: "See disruption early" },
          { label: "Execution", href: "/solutions/execution", desc: "Act inside your systems" },
          { label: "Orchestration", href: "/solutions/orchestration", desc: "Coordinate every agent" },
        ],
      },
      {
        title: "By industry",
        href: "/industries",
        links: sectors.map((s) => ({ label: s.name, href: `/industries/${s.slug}` })),
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: resourceDoors.map((d) => ({ label: d.label, href: d.href, desc: d.desc })),
  },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "About", href: "/company", desc: "Our story and team" },
      { label: "Customers", href: "/customers", desc: "Who we work with" },
      ...(hasPress ? [{ label: "Press", href: "/company/press", desc: "Agentra in the news" }] : []),
    ],
  },
  { label: "Trust", href: "/trust" },
];

// Every link under an item, so the item lights up on any of its pages.
const itemLinks = (item: NavItem): NavLink[] =>
  item.groups ? item.groups.flatMap((g) => g.links) : item.children ?? [];

const isItemActive = (item: NavItem, pathname: string) =>
  pathname.startsWith(item.href) ||
  (item.groups?.some((g) => pathname.startsWith(g.href)) ?? false) ||
  itemLinks(item).some((c) => pathname.startsWith(c.href));

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
          className={`nav-capsule pointer-events-auto grid h-16 grid-cols-[auto_1fr_auto] items-center px-5 xl:px-8 ${
            scrolled ? "scrolled" : ""
          }`}
        >
          <Logo />

          <div className="hidden items-center justify-center gap-6 xl:flex 2xl:gap-9">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link
                  href={item.href}
                  className={`nav-link inline-flex items-center gap-1 whitespace-nowrap ${
                    isItemActive(item, pathname) ? "is-active" : ""
                  }`}
                >
                  {item.label}
                  {(item.children || item.groups) && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  )}
                </Link>

                {(item.children || item.groups) && (
                  <AnimatePresence>
                    {hovered === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className={`absolute left-1/2 top-full -translate-x-1/2 pt-3 ${
                          item.groups ? "w-[44rem]" : "w-64"
                        }`}
                      >
                        <div className="overflow-hidden rounded-2xl border border-line bg-surface p-2 shadow-2xl shadow-black/60">
                          {item.groups ? (
                            <div className="grid grid-cols-3 gap-1">
                              {item.groups.map((g) => (
                                <div key={g.title}>
                                  <Link
                                    href={g.href}
                                    className="block px-3 pb-1 pt-2 text-xs font-medium text-fg-dim transition-colors hover:text-purple-6"
                                  >
                                    {g.title}
                                  </Link>
                                  {g.links.map((c) => (
                                    <DropdownLink key={c.href} link={c} />
                                  ))}
                                </div>
                              ))}
                            </div>
                          ) : (
                            item.children!.map((c) => (
                              <DropdownLink key={c.href} link={c} />
                            ))
                          )}
                        </div>
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
              className="btn-primary hidden items-center whitespace-nowrap px-6 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98] xl:inline-flex"
            >
              Book a demo
            </Link>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-fg transition-colors hover:border-purple-4/50 hover:text-fg xl:hidden"
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
        <div className="pointer-events-auto container-x mt-3 xl:hidden">
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
                  {(item.children || item.groups) && (
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
                {(item.children || item.groups) && mobileExpanded === item.label && (
                  <div className="ml-3 border-l border-line pl-3">
                    {(item.groups ?? [{ title: "", href: "", links: item.children! }]).map((g) => (
                      <div key={g.title || item.label}>
                        {g.title && (
                          <div className="px-3 pb-1 pt-3 text-xs font-medium text-fg-dim">
                            {g.title}
                          </div>
                        )}
                        {g.links.map((c) => (
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

function DropdownLink({ link: c }: { link: NavLink }) {
  return (
    <Link
      href={c.href}
      className="group block rounded-xl px-3 py-2.5 transition-colors hover:bg-purple-3/10"
    >
      <div className="text-sm font-semibold text-fg transition-colors group-hover:text-purple-6">
        {c.label}
      </div>
      {c.desc && <div className="text-xs text-fg-dim">{c.desc}</div>}
    </Link>
  );
}
