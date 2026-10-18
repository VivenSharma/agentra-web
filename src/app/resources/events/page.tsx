import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Where to meet the Agentra team: Supply Chain Nexus chapters, conferences and roundtables on agentic AI for supply chain.",
  robots: { index: false, follow: true }, // placeholder until the calendar is confirmed
};

// PLACEHOLDER: upcoming dates and formats need confirming before launch.
const upcoming = [
  { name: "TiEcon", format: "Conference", place: "To be confirmed", when: "Date to be confirmed" },
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

      {/* Most recent event, photo-led */}
      <section className="pb-20">
        <div className="container-x">
          <Reveal>
            <Link
              href="/rsm-nexus-v2"
              className="group relative block overflow-hidden rounded-[20px] ring-1 ring-white/10"
            >
              <div className="relative aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/rsm-nexus/gallery-1.jpg"
                  alt="Guests at a previous Supply Chain Nexus chapter in Amsterdam"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                <p className="text-sm text-purple-5">25 September 2026, Amsterdam</p>
                <h2 className="mt-2 max-w-2xl text-2xl font-semibold leading-tight sm:text-4xl">
                  Rotterdam School of Management, Erasmus University Supply Chain Nexus, Chapter 02
                </h2>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                  See the event
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
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
