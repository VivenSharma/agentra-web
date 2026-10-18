import type { ReactNode } from "react";
import { PageHero } from "./PageHero";

export type LegalSection = { heading: string; body: string[] };

export function LegalLayout({
  eyebrow,
  title,
  updated,
  intro,
  sections,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  children?: ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} sub={intro} />
      <section className="pb-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <p className="mb-12 text-xs uppercase tracking-[0.18em] text-fg-dim">
              Last updated · {updated}
            </p>

            <div className="space-y-12">
              {sections.map((s, i) => (
                <div key={s.heading} className="group">
                  <h2 className="flex items-baseline gap-3 text-xl font-medium text-fg transition-colors group-hover:text-purple-5">
                    <span className="font-mono text-sm text-fg-dim transition-colors group-hover:text-purple-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.heading}
                  </h2>
                  <div className="mt-4 space-y-4 border-l border-line pl-6 transition-colors group-hover:border-purple-4/40">
                    {s.body.map((p, j) => (
                      <p key={j} className="text-fg-muted leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {children}

            <div className="mt-16 rounded-2xl border border-line bg-white/[0.02] p-6 text-sm text-fg-muted">
              Questions about this policy? Reach us at{" "}
              <a
                href="mailto:privacy@agentra-ai.com"
                className="link-glow font-medium text-fg"
              >
                privacy@agentra-ai.com
              </a>
              .
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
