import type { Metadata } from "next";
import Image from "next/image";
import { BellRing } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Whitepapers",
  description:
    "Deep-dive research on the agentic supply chain: autonomy, ontology-powered reasoning and governance.",
};

// No whitepaper is published yet. Until launch day the page holds the
// announcement, and the reminder is a calendar invite (no sign-up backend).
export default function WhitepapersPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources · Whitepapers"
        title="Deep dives on"
        accent="the agentic supply chain."
        sub="Research-grade perspectives for supply chain, data and transformation leaders."
      />
      <section className="py-12 sm:py-16">
        <div className="container-x">
          <Reveal>
            <div className="raised mx-auto max-w-[1000px] rounded-[24px] p-3">
              <Image
                src="/blog/tariffs-move-weekly/whitepaper-launch.png"
                alt="New whitepaper: Ready to move from tariff alerts to action? Launching on Monday 9 November 2026."
                width={1600}
                height={600}
                sizes="(min-width: 1100px) 1000px, 100vw"
                className="h-auto w-full rounded-[18px] ring-1 ring-white/10"
              />
              <div className="flex flex-col items-start gap-4 px-4 pb-4 pt-6 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <p className="text-base leading-relaxed text-fg-muted">
                  Get a reminder in your calendar on launch day, Monday 9 November.
                </p>
                <a
                  href="/whitepaper-launch.ics"
                  download="agentra-whitepaper-launch.ics"
                  className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-grad px-5 py-3 text-sm font-semibold text-white transition-transform active:scale-[0.98]"
                >
                  <BellRing className="h-4 w-4 transition-transform group-hover:-rotate-12" aria-hidden />
                  Remind me
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <CTA />
    </>
  );
}
