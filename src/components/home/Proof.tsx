import Link from "next/link";
import { ArrowRight, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ScrollRevealText } from "@/components/ScrollRevealText";
import { SectorIcon } from "@/components/SectorIcon";
import { sectors } from "@/lib/sectors";

/* All copy in this file comes from the Agentra Brand & Marketing Playbook
   (Oct 2026), "Already decided" and the voice guide. Clients are never named:
   only the four approved descriptors (lib/sectors.ts) may be used. */

/* ---------------------------------------------------------------
   Client sectors: the trust strip directly under the hero.
   Each descriptor opens that client's page.
   --------------------------------------------------------------- */
export function ClientSectors() {
  return (
    <section aria-label="Who we work with" className="border-y border-line bg-bg-1/60">
      <div className="container-x grid gap-4 py-6 xl:grid-cols-[9rem_1fr] xl:items-center xl:gap-8">
        <p className="text-sm text-fg-dim">Working with</p>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/customers/${s.slug}`}
                className="spotlight group flex h-full items-start gap-3 rounded-2xl border border-line bg-white/[0.015] p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-4/50 hover:bg-purple-3/[0.06]"
              >
                <span className="mt-0.5 text-purple-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-purple-6">
                  <SectorIcon icon={s.icon} />
                </span>
                <span className="flex-1 text-sm leading-snug text-fg-muted transition-colors duration-300 group-hover:text-fg">
                  {s.client}
                  <span className="mt-1.5 flex items-center gap-1 text-xs font-medium text-purple-5 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                    {s.name}
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   Integration logos: a slow marquee under the client strip, in each
   brand's own colours. Files in /public/logos, from Wikimedia Commons
   (SAP, Oracle, Dynamics 365, Kinaxis) and English Wikipedia (Blue Yonder).
   dynamics365-light.svg is the official file with its black wordmark set
   to white so it reads on the dark page. SAP Ariba has no separate mark:
   it is the SAP logo plus the product name.
   --------------------------------------------------------------- */
function Logo({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={w} height={h} loading="lazy" decoding="async" className="h-auto max-w-none" style={{ width: w }} />;
}

const logos: { name: string; mark: React.ReactNode }[] = [
  { name: "SAP", mark: <Logo src="/logos/sap.svg" alt="SAP" w={68} h={34} /> },
  { name: "Oracle", mark: <Logo src="/logos/oracle.svg" alt="Oracle" w={140} h={18} /> },
  { name: "Microsoft Dynamics 365", mark: <Logo src="/logos/dynamics365-light.svg" alt="Microsoft Dynamics 365" w={118} h={41} /> },
  {
    name: "SAP Ariba",
    mark: (
      <span className="flex items-center gap-2.5">
        <Logo src="/logos/sap.svg" alt="SAP" w={58} h={29} />
        <span className="text-xl font-light tracking-tight text-fg">Ariba</span>
      </span>
    ),
  },
  { name: "Blue Yonder", mark: <Logo src="/logos/blue-yonder.png" alt="Blue Yonder" w={160} h={24} /> },
  { name: "Kinaxis", mark: <Logo src="/logos/kinaxis.svg" alt="Kinaxis" w={110} h={28} /> },
];

export function IntegrationLogos() {
  // The row is rendered twice so translateX(-50%) loops without a seam.
  const row = (copy: boolean) =>
    logos.map((l) => (
      <li
        key={l.name + copy}
        aria-hidden={copy || undefined}
        className="flex shrink-0 items-center px-10 opacity-85 transition-all duration-300 hover:scale-105 hover:opacity-100 sm:px-14"
      >
        {l.mark}
      </li>
    ));
  return (
    <section aria-label="Systems we work with" className="border-b border-line">
      <div className="container-x grid gap-4 py-7 xl:grid-cols-[9rem_1fr] xl:items-center xl:gap-8">
        <p className="text-sm text-fg-dim">Acting on top of</p>
        <div className="logo-marquee overflow-hidden">
          <ul className="logo-track">
            {row(false)}
            {row(true)}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   The three messages, as editorial rows (statement left, proof right)
   --------------------------------------------------------------- */
const flow = ["Supplier delay spotted", "Plan updated", "Order placed"];
const controls = ["Guardrails", "Approvals", "Audit trail"];
// The named integrations live in the logo marquee; here, the kinds of system.
const systems = ["ERP", "Planning", "Procurement", "TMS", "WMS"];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-fg-muted transition-colors duration-300 hover:border-purple-4/60 hover:bg-purple-3/10 hover:text-fg">
      {children}
    </span>
  );
}

const messages = [
  {
    title: "Act, not just report.",
    body: "Spot a supplier delay, re-plan and reorder in minutes, not days.",
    proof: (
      <div className="flex flex-wrap items-center gap-2">
        {flow.map((f, i) => (
          <span key={f} className="inline-flex items-center gap-2">
            <Chip>{f}</Chip>
            {i < flow.length - 1 && <ArrowRight className="h-4 w-4 text-purple-4" aria-hidden />}
          </span>
        ))}
      </div>
    ),
  },
  {
    title: "The right humans in the loop, not humans in the way.",
    body: "Agents handle the routine calls. Your team approves the ones that matter.",
    proof: (
      <div className="flex flex-wrap gap-2">
        {controls.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>
    ),
  },
  {
    title: "Works with what you have.",
    body: "Agents act inside the systems you already run, through 1000+ connectors.",
    proof: (
      <div className="flex flex-wrap gap-2">
        {systems.map((n) => (
          <Chip key={n}>{n}</Chip>
        ))}
      </div>
    ),
  },
];

export function ThreeMessages() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-x">
        <ScrollRevealText
          as="h2"
          text="Built by people who have run supply chains, for the people who still do."
          className="max-w-3xl text-3xl font-light leading-[1.12] tracking-[-0.02em] sm:text-[2.6rem]"
        />
        <div className="mt-14 divide-y divide-line border-y border-line">
          {messages.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.06} y={20}>
              <div className="spotlight group grid gap-5 rounded-2xl px-0 py-10 transition-colors duration-300 md:-mx-6 md:grid-cols-12 md:gap-10 md:px-6 md:py-12 md:hover:bg-white/[0.015]">
                <h3 className="text-2xl font-light leading-snug tracking-tight text-fg transition-colors duration-300 group-hover:text-purple-6 md:col-span-5 sm:text-[1.75rem]">
                  {m.title}
                </h3>
                <div className="space-y-5 md:col-span-7">
                  <p className="max-w-[52ch] text-lg leading-relaxed text-fg-muted">{m.body}</p>
                  {m.proof}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   Proof band: speed, reach and certifications
   --------------------------------------------------------------- */
const facts: { value: string; label: string; href?: string }[] = [
  { value: "6–8 weeks", label: "to your first live agent" },
  { value: "1000+", label: "connectors to the systems you run" },
  { value: "ISO 27001", label: "Certified for information security", href: "/trust" },
  { value: "ISO 14001", label: "Certified for environmental management", href: "/trust" },
];

export function TrustFacts() {
  return (
    <section aria-label="Agentra in numbers" className="pb-8">
      <div className="container-x">
        <Reveal>
          {/* gap-px over a line-coloured background draws even hairlines
              between cells at every column count */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-line bg-line shadow-[0_30px_80px_-40px_rgba(90,71,148,0.6)] lg:grid-cols-4">
            {facts.map((f) => {
              const body = (
                <>
                  <p className="flex items-center gap-2 text-2xl font-light tracking-tight text-fg sm:text-3xl">
                    {f.href && (
                      <ShieldCheck className="h-5 w-5 shrink-0 text-purple-5 transition-colors duration-300 group-hover:text-purple-6 sm:h-6 sm:w-6" strokeWidth={1.5} aria-hidden />
                    )}
                    {f.value}
                  </p>
                  <p className="mt-2 flex items-center gap-1 text-sm text-fg-muted transition-colors duration-300 group-hover:text-fg">
                    {f.label}
                    {f.href && (
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden />
                    )}
                  </p>
                </>
              );
              const cls = "spotlight group block bg-bg-1 p-5 transition-colors duration-300 hover:bg-[#16131e] sm:p-7";
              return f.href ? (
                <Link key={f.value} href={f.href} className={cls}>
                  {body}
                </Link>
              ) : (
                <div key={f.value} className={cls}>
                  {body}
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
