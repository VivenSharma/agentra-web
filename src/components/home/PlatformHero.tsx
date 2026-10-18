import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ControlPlane } from "@/components/viz/ControlPlane";
import { platformStats } from "@/lib/data";

export function PlatformHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div
        className="glow left-1/2 top-10 h-[380px] w-[560px] -translate-x-1/2"
        style={{ background: "radial-gradient(circle,#5a4794,transparent 70%)" }}
      />
      <div className="container-x relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="fade-up mx-auto max-w-3xl text-balance text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] sm:text-4xl md:text-[2.75rem]"
            style={{ animationDelay: "0.08s" }}
          >
            Every signal in. One autonomy layer out.
          </h1>
          <p
            className="fade-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted"
            style={{ animationDelay: "0.16s" }}
          >
            One governed layer over every system you run. Every decision routes
            through it.
          </p>
          <div
            className="fade-up mt-8 flex flex-wrap justify-center gap-3"
            style={{ animationDelay: "0.24s" }}
          >
            <Link
              href="/contact"
              className="btn-primary group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Book a demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#architecture"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold text-fg transition-all hover:border-purple-4/60 hover:bg-white/5 active:scale-[0.98]"
            >
              See the architecture
            </Link>
          </div>
        </div>

        {/* control plane */}
        <div
          className="fade-up mx-auto mt-16 max-w-4xl"
          style={{ animationDelay: "0.3s" }}
        >
          <ControlPlane />
        </div>

        {/* stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 border-t border-line pt-10 md:grid-cols-4">
          {platformStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-semibold tracking-tight text-grad sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.14em] text-fg-muted">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
