import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { pastEvents, type PastEvent } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Where to meet the Agentra team: Supply Chain Nexus chapters, conferences and roundtables on agentic AI for supply chain.",
  robots: { index: false, follow: true }, // placeholder until the calendar is confirmed
};

// PLACEHOLDER: upcoming dates and formats need confirming before launch.
const upcoming = [
  { name: "Celerity", format: "Conference", place: "To be confirmed", when: "Date to be confirmed" },
  { name: "Supply Chain Nexus, Chapter 03", format: "Evening roundtable", place: "To be confirmed", when: "2027" },
];

export default function EventsPage() {
  return (
    <>
      <section className="pt-32 pb-12 sm:pt-36">
        <div className="container-x">
          <h1 className="fade-up max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            Meet the team in the room.
          </h1>
          <p className="fade-up mt-5 max-w-[54ch] text-lg leading-relaxed text-fg-muted [animation-delay:80ms]">
            Roundtables and conferences where supply chain leaders compare notes
            on agentic AI.
          </p>
        </div>
      </section>

      {/* Past events, newest first */}
      <section className="pb-20">
        <div className="container-x space-y-6">
          {pastEvents.map((e) => (
            <Reveal key={e.id}>
              <EventEntry event={e} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Upcoming: placeholder rows */}
      <section className="border-t border-line py-20">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <h2 className="text-2xl font-semibold tracking-tight md:col-span-4 sm:text-[1.7rem]">
            Coming up
          </h2>
          <ul className="divide-y divide-line border-y border-line md:col-span-8">
            {upcoming.map((e) => (
              <li key={e.name} className="grid gap-1 py-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
                <div>
                  <p className="text-lg font-medium">{e.name}</p>
                  <p className="mt-1 text-sm text-fg-dim">
                    {e.format}, {e.place}
                  </p>
                </div>
                <p className="text-sm text-fg-muted">{e.when}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
    </>
  );
}

function EventMeta({ event: e }: { event: PastEvent }) {
  return (
    <div>
      <span className="inline-flex rounded-full border border-purple-4/40 bg-purple-3/10 px-3 py-1 text-xs font-medium text-purple-6">
        {e.role}
      </span>
      <h2 className="mt-4 text-2xl font-light leading-snug tracking-tight text-fg sm:text-3xl">{e.name}</h2>
      <dl className="mt-4 space-y-1.5 text-sm text-fg-muted">
        <div className="flex items-center gap-2">
          <dt className="sr-only">Date</dt>
          <CalendarDays className="h-4 w-4 text-purple-5" strokeWidth={1.5} aria-hidden />
          <dd>{e.date}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="sr-only">Location</dt>
          <MapPin className="h-4 w-4 text-purple-5" strokeWidth={1.5} aria-hidden />
          <dd>{e.location}</dd>
        </div>
      </dl>
    </div>
  );
}

function EventEntry({ event: e }: { event: PastEvent }) {
  const [lead, ...rest] = e.photos;
  return (
    <article id={e.id} className="raised spotlight scroll-mt-28 rounded-[24px] p-6 sm:p-10">
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <EventMeta event={e} />
        </div>
        <div className="md:col-span-8">
          <p className="max-w-[65ch] text-base leading-relaxed text-fg-muted sm:text-lg">{e.body}</p>
          {e.link && (
            <Link
              href={e.link.href}
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-purple-5 transition-colors hover:text-purple-6"
            >
              {e.link.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          )}
        </div>
      </div>

      {/* Photos: one wide lead shot, the rest in a row beneath it */}
      {lead && (
        <div className="mt-10 space-y-3">
          <figure className="group relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-white/10 md:aspect-[21/9]">
            <Image
              src={lead.src}
              alt={lead.alt}
              fill
              sizes="(min-width: 1240px) 1160px, 100vw"
              className="object-cover object-[center_35%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />
          </figure>
          {rest.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-3">
              {rest.map((p) => (
                <figure key={p.src} className="group relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                </figure>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
