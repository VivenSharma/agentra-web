"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { hasPress } from "@/lib/press";
import { OPEN_COOKIE_SETTINGS } from "./CookieConsent";

function LinkedinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.8 0 0 .77 0 1.73v20.53C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

const cols = [
  {
    title: "Platform",
    links: [
      { label: "Overview", href: "/platform" },
      { label: "The ontology", href: "/platform#ontology" },
      { label: "Agent engine", href: "/platform#engine" },
      { label: "Governance", href: "/platform#governance" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Planning", href: "/solutions#planning" },
      { label: "Resilience", href: "/solutions#resilience" },
      { label: "Execution", href: "/solutions#execution" },
      { label: "Orchestration", href: "/solutions#orchestration" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Energy technology", href: "/industries/energy-technology" },
      { label: "Medical technology", href: "/industries/medical-technology" },
      { label: "Semiconductors", href: "/industries/semiconductors" },
      { label: "Agriculture", href: "/industries/agriculture" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Customers", href: "/customers" },
      ...(hasPress ? [{ label: "Press", href: "/company/press" }] : []),
      { label: "Resources", href: "/resources" },
      { label: "Trust", href: "/trust" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  // The RSM Nexus event landing ships its own footer — hide the global one.
  if (pathname?.startsWith("/rsm-nexus")) return null;

  return (
    <footer className="relative mt-auto border-t border-line">
      <div className="container-x py-16">
        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              The agentic layer for supply chain. Agents that act, with your
              team in command.
            </p>
            <a
              href="https://www.linkedin.com/company/agentra-ai-bv"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-purple-4/50 hover:text-fg"
              aria-label="Agentra on LinkedIn"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-fg-dim">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label + l.href}>
                    <Link
                      href={l.href}
                      className="link-glow text-sm text-fg-muted"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications, linked to the Trust page (checklist item 4) */}
        <div className="mt-14 flex flex-wrap gap-3">
          {[
            { name: "ISO 27001", label: "Information security" },
            { name: "ISO 14001", label: "Environmental management" },
          ].map((b) => (
            <Link
              key={b.name}
              href="/trust#certifications"
              className="spotlight group inline-flex items-center gap-3 rounded-full border border-line-strong py-2 pl-3 pr-5 transition-colors duration-300 hover:border-purple-4/60"
            >
              <ShieldCheck className="h-5 w-5 text-purple-5 transition-colors group-hover:text-purple-6" strokeWidth={1.5} aria-hidden />
              <span className="text-sm font-semibold text-fg">{b.name}</span>
              <span className="text-xs text-fg-dim transition-colors group-hover:text-fg-muted">{b.label}</span>
            </Link>
          ))}
        </div>

        {/* Legal */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
          {[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" },
            { label: "Cookie Policy", href: "/cookies" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="link-glow text-xs font-medium uppercase tracking-[0.12em] text-fg-muted"
            >
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
            className="link-glow text-xs font-medium uppercase tracking-[0.12em] text-fg-muted"
          >
            Cookie settings
          </button>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-fg-dim">
            © {new Date().getFullYear()} Agentra B.V. · Amsterdam · Delhi NCR ·
            Dubai · St. Louis
          </p>
          <a
            href="https://www.agentra-ai.com"
            className="link-glow inline-flex items-center gap-1 text-xs font-medium text-fg-muted"
          >
            www.agentra-ai.com
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

      </div>
    </footer>
  );
}
