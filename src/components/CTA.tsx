import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function CTA({
  title = "See Agentra in your supply chain.",
  sub = "Book a 30-minute demo.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      {/* ambient colour behind the glass, so the blur has something to refract */}
      <div
        className="glow left-[18%] top-1/2 h-[280px] w-[380px] -translate-y-1/2"
        style={{ background: "radial-gradient(circle,#5a4794,transparent 70%)" }}
      />
      <div
        className="glow right-[15%] top-1/3 h-[240px] w-[320px]"
        style={{ background: "radial-gradient(circle,#06b6d4,transparent 70%)" }}
      />

      <div className="container-x relative">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[28px] border border-white/10 px-6 py-16 text-center backdrop-blur-2xl sm:px-16 sm:py-20"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              boxShadow:
                "inset 0 1px 0 0 rgba(255,255,255,0.1), 0 30px 90px -50px rgba(0,0,0,0.9)",
            }}
          >
            {/* subtle purple sheen on the glass */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 120% at 12% 8%, rgba(154,92,255,0.18), transparent 55%), radial-gradient(120% 120% at 88% 92%, rgba(6,182,212,0.10), transparent 55%)",
              }}
            />
            {/* top highlight line */}
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance text-2xl font-semibold leading-tight text-fg sm:text-3xl md:text-[2.5rem]">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-fg-muted">{sub}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="btn-primary group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  Book a demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/platform"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold text-fg transition-all hover:border-purple-4/60 hover:bg-white/5 active:scale-[0.98]"
                >
                  Explore the platform
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
