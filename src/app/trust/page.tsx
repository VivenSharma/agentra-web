import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, FileCheck2, Leaf, ScrollText, ShieldCheck, SlidersHorizontal, UserCheck } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { autonomy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Trust",
  description:
    "Agentra is certified to ISO 27001 and ISO 14001. Every agent works inside your guardrails, with approvals and a full audit trail.",
  alternates: { canonical: "/trust" },
};

// Claims here are limited to what the Brand & Marketing Playbook already
// approves: ISO 27001 + ISO 14001 (never SOC 2), GDPR-aligned, guardrails,
// approvals, audit trail, Suggest / Co-pilot / Autopilot.
const certs = [
  {
    icon: ShieldCheck,
    name: "ISO 27001",
    body: "Certified for information security management.",
  },
  {
    icon: Leaf,
    name: "ISO 14001",
    body: "Certified for environmental management.",
  },
];

const controls = [
  { icon: SlidersHorizontal, title: "Guardrails", body: "You set what each agent may do, per workflow, and it never steps outside." },
  { icon: UserCheck, title: "Approvals", body: "Decisions that matter wait for the right person on your team." },
  { icon: ScrollText, title: "Audit trail", body: "Every action is logged with the data and reasoning behind it." },
  { icon: Eye, title: "Explainable", body: "Agents show why they chose a move, in plain language." },
];

export default function TrustPage() {
  return (
    <>
      <section className="pt-32 pb-12 sm:pt-36">
        <div className="container-x">
          <h1 className="fade-up max-w-3xl text-balance text-4xl font-light leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            Agents that act inside your rules. You stay in command.
          </h1>
          <p className="fade-up mt-5 max-w-[54ch] text-lg leading-relaxed text-fg-muted [animation-delay:80ms]">
            Certified security, governed autonomy and a record of every
            decision.
          </p>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="scroll-mt-28 pb-16">
        <div className="container-x grid gap-5 md:grid-cols-2">
          {certs.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <div className="raised spotlight group flex h-full items-start gap-5 rounded-[20px] p-7 sm:p-9">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-purple-4/30 bg-purple-3/10 text-purple-5 transition-all duration-300 group-hover:scale-105 group-hover:text-purple-6">
                  <c.icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                </span>
                <div>
                  <h2 className="text-3xl font-light tracking-tight text-fg">{c.name}</h2>
                  <p className="mt-2 text-base text-fg-muted">{c.body}</p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-purple-5 transition-colors hover:text-purple-6"
                  >
                    Request certificate details
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Governance controls */}
      <section className="border-y border-line bg-bg-1/50 py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <h2 className="max-w-2xl text-2xl font-light tracking-tight sm:text-3xl">
              The right humans in the loop, not humans in the way.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {controls.map((c) => (
              <div key={c.title} className="spotlight group bg-bg-1 p-6 transition-colors duration-300 hover:bg-[#16131e] sm:p-7">
                <c.icon className="h-5 w-5 text-purple-5 transition-colors duration-300 group-hover:text-purple-6" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-5 text-lg font-medium text-fg">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Autonomy dial */}
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 className="text-2xl font-light tracking-tight sm:text-3xl">You choose how far each agent goes.</h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <ol className="space-y-2">
              {autonomy.map((a) => (
                <li
                  key={a.key}
                  className="spotlight group flex items-baseline gap-6 rounded-2xl border border-line px-5 py-5 transition-colors duration-300 hover:border-purple-4/40 sm:px-7"
                >
                  <span className="w-24 shrink-0 text-lg font-medium text-fg transition-colors duration-300 group-hover:text-purple-6">
                    {a.title}
                  </span>
                  <span className="text-base text-fg-muted">{a.desc}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Data protection */}
      <section className="pb-8">
        <div className="container-x">
          <Reveal>
            <Link
              href="/privacy"
              className="raised spotlight group flex flex-col gap-4 rounded-[20px] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"
            >
              <span className="flex items-start gap-4">
                <FileCheck2 className="mt-1 h-5 w-5 shrink-0 text-purple-5" strokeWidth={1.5} aria-hidden />
                <span>
                  <span className="block text-xl font-light text-fg transition-colors duration-300 group-hover:text-purple-6">
                    GDPR-aligned data handling
                  </span>
                  <span className="mt-1 block text-base text-fg-muted">
                    How we collect, use and protect personal data.
                  </span>
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-fg">
                Read the privacy policy
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
