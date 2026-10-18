import type { ReactNode } from "react";

export function PageHero({
  title,
  accent,
  sub,
  children,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  sub?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div
        className="glow left-1/2 top-0 h-[360px] w-[560px] -translate-x-1/2 opacity-20"
        style={{ background: "radial-gradient(circle,#6f57ab,transparent 70%)" }}
      />
      <div className="container-x relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-fg sm:text-4xl md:text-[2.75rem]">
            {title} {accent}
          </h1>
          {sub && (
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              {sub}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
