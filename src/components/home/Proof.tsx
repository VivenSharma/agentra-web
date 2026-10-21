import { ArrowRight, Cpu, HeartPulse, ShieldCheck, Wheat, Zap } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ScrollRevealText } from "@/components/ScrollRevealText";

/* All copy in this file comes from the Agentra Brand & Marketing Playbook
   (Oct 2026), "Already decided" and the voice guide. Clients are never named:
   only the four approved descriptors below may be used. */

/* ---------------------------------------------------------------
   Client sectors: the trust strip directly under the hero
   --------------------------------------------------------------- */
const sectors = [
  { icon: Zap, label: "A global energy technology leader" },
  { icon: HeartPulse, label: "A global medical technology company" },
  { icon: Cpu, label: "A precision-engineering manufacturer in the semiconductor supply chain" },
  { icon: Wheat, label: "A global agriculture major" },
];

export function ClientSectors() {
  return (
    <section aria-label="Who we work with" className="border-y border-line bg-bg-1/60">
      <div className="container-x grid gap-6 py-8 lg:grid-cols-[10rem_1fr] lg:items-center lg:gap-10">
        <p className="text-sm text-fg-dim">Working with</p>
        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s) => (
            <li key={s.label} className="flex items-start gap-3">
              <s.icon className="mt-0.5 h-4 w-4 shrink-0 text-purple-5" strokeWidth={1.5} />
              <span className="text-sm leading-snug text-fg-muted">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------
   The three messages, as editorial rows (statement left, proof right)
   --------------------------------------------------------------- */
const flow = ["Supplier delay spotted", "Plan updated", "Order placed"];
const controls = ["Guardrails", "Approvals", "Audit trail"];
// Approved integration names. Swap for official logo files once the brand
// owners' logo assets are sourced (only SAP exists in simple-icons).
const integrations = ["SAP", "Oracle", "Microsoft Dynamics 365", "SAP Ariba", "Blue Yonder", "Kinaxis"];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-fg-muted">
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
    body: "Agents act inside the systems you already run, through 900+ connectors.",
    proof: (
      <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Integrations include">
        {integrations.map((n) => (
          <li key={n} className="text-sm font-semibold tracking-tight text-fg/80">
            {n}
          </li>
        ))}
      </ul>
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
              <div className="grid gap-5 py-10 md:grid-cols-12 md:gap-10 md:py-12">
                <h3 className="text-2xl font-light leading-snug tracking-tight text-fg md:col-span-5 sm:text-[1.75rem]">
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
const facts = [
  { value: "6–8 weeks", label: "to your first live agent" },
  { value: "900+", label: "connectors to the systems you run" },
  { value: "ISO 27001", label: "Certified for information security", badge: true },
  { value: "ISO 14001", label: "Certified for environmental management", badge: true },
];

export function TrustFacts() {
  return (
    <section aria-label="Agentra in numbers" className="pb-8">
      <div className="container-x">
        <Reveal>
          {/* gap-px over a line-coloured background draws even hairlines
              between cells at every column count */}
          <dl className="grid gap-px overflow-hidden rounded-[20px] border border-line bg-line grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.value} className="bg-bg-1 p-5 sm:p-7">
                <dt className="flex items-center gap-2 text-2xl font-light sm:text-3xl tracking-tight text-fg">
                  {f.badge && <ShieldCheck className="h-5 w-5 shrink-0 text-purple-5 sm:h-6 sm:w-6" strokeWidth={1.5} aria-hidden />}
                  {f.value}
                </dt>
                <dd className="mt-2 text-sm text-fg-muted">{f.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
