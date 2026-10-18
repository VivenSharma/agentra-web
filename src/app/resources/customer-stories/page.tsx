import type { Metadata } from "next";
import { CTA } from "@/components/CTA";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Customer stories",
  description:
    "How supply chain teams put governed agents into production with Agentra.",
  robots: { index: false, follow: true }, // placeholder until the first story is approved
};

// The case-study frame from the proposal: problem, what the agent did, result.
// Skeleton lines stand in for copy until the first anonymised story is cleared.
const frame = [
  { label: "The problem", lines: ["w-full", "w-4/5", "w-3/5"] },
  { label: "What the agent did", lines: ["w-full", "w-11/12", "w-2/3"] },
];

export default function CustomerStoriesPage() {
  return (
    <>
      <section className="pt-32 pb-12 sm:pt-36">
        <div className="container-x">
          <h1 className="fade-up max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
            Supply chain teams, in their own words.
          </h1>
          <p className="fade-up mt-5 max-w-[54ch] text-lg leading-relaxed text-fg-muted [animation-delay:80ms]">
            Our first customer story is being cleared for publication. Here is
            the shape it will take.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x">
          <Reveal>
            <div
              aria-label="Customer story in preparation"
              className="card overflow-hidden rounded-[20px] p-6 sm:p-10"
            >
              <p className="text-sm text-purple-5">European manufacturer</p>
              <div className="skeleton mt-4 h-8 w-full max-w-xl" />
              <div className="skeleton mt-3 h-8 w-2/3 max-w-md" />

              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {frame.map((f) => (
                  <div key={f.label} className="rounded-2xl border border-line p-5">
                    <p className="text-sm text-fg-muted">{f.label}</p>
                    <div className="mt-4 space-y-2.5">
                      {f.lines.map((w, i) => (
                        <div key={i} className={`skeleton h-3 ${w}`} />
                      ))}
                    </div>
                  </div>
                ))}
                <div className="rounded-2xl border border-purple-4/30 bg-purple-3/10 p-5">
                  <p className="text-sm text-fg-muted">The result</p>
                  <div className="skeleton mt-4 h-10 w-3/4" />
                  <div className="skeleton mt-3 h-3 w-1/2" />
                </div>
              </div>

              <div className="mt-10 border-l-2 border-purple-3/60 pl-6">
                <div className="skeleton h-5 w-full max-w-lg" />
                <div className="skeleton mt-2.5 h-5 w-3/5 max-w-sm" />
                <div className="skeleton mt-4 h-3 w-40" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
