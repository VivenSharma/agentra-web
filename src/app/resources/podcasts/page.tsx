import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";
import { Pill } from "@/components/ui/Primitives";
import { podcasts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Podcasts",
  description:
    "Conversations on the shift from automation to autonomy in the supply chain.",
};

export default function PodcastsPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources · Podcasts"
        title="Conversations on"
        accent="autonomy."
        sub="Operators, engineers and leaders on building the agentic supply chain."
      />
      <section className="py-12 sm:py-16">
        <div className="container-x space-y-6">
          {podcasts.map((p) => (
            <Reveal key={p.slug}>
              <article
                id={p.slug}
                className="raised grid gap-8 rounded-[24px] p-3 lg:grid-cols-[1.6fr_1fr] lg:items-center lg:gap-10"
              >
                <video
                  controls
                  playsInline
                  preload="none"
                  poster={p.poster}
                  className="aspect-video w-full rounded-[18px] bg-black ring-1 ring-white/10"
                >
                  <source src={p.video} type="video/mp4" />
                </video>
                <div className="px-4 pb-5 lg:px-0 lg:pb-0 lg:pr-8">
                  <Pill soft>
                    {p.episode} · {p.duration}
                  </Pill>
                  <h2 className="mt-4 text-2xl font-light leading-snug text-fg sm:text-3xl">
                    {p.title}
                  </h2>
                  <div className="mt-4 space-y-3 text-base leading-relaxed text-fg-muted">
                    {p.writeUp.map((t) => (
                      <p key={t}>{t}</p>
                    ))}
                  </div>
                  <h3 className="mt-6 text-sm font-semibold text-fg">In this episode</h3>
                  <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm leading-relaxed text-fg-muted marker:text-purple-5">
                    {p.questions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ol>
                  <p className="mt-6 text-sm font-semibold text-fg">{p.tagline}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
