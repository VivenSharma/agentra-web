import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[94vh] flex-col items-center overflow-hidden pt-40 sm:pt-48">
      {/* soft ambient glow behind the headline */}
      <div
        className="glow left-1/2 top-[-2%] h-[440px] w-[720px] -translate-x-1/2"
        style={{ background: "radial-gradient(circle,#5a4794,transparent 70%)" }}
      />
      <div className="grid-bg absolute inset-0 opacity-30" />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="fade-up mx-auto max-w-3xl text-balance text-[2.5rem] font-light leading-[1.04] tracking-[-0.025em] sm:text-5xl md:text-[3.7rem]"
            style={{ animationDelay: "0.08s" }}
          >
            An agentic supply chain with a mind of its own.
          </h1>

          <p
            className="fade-up mx-auto mt-7 max-w-xl text-lg leading-relaxed text-fg-muted"
            style={{ animationDelay: "0.16s" }}
          >
            Specialised agents that sense, decide, and act across your supply
            chain. Always on, always in your command.
          </p>

          <div
            className="fade-up mt-10 flex justify-center"
            style={{ animationDelay: "0.24s" }}
          >
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center px-9 py-4 text-sm font-semibold transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </div>

      {/* Horizon: the crescent image sits low, like a planet rim at the bottom
          of the view. Black-backed, so it blends straight into the page. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-crescent.jpg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition: "center 38%",
            // fade the arc's ends into the black background on both sides
            maskImage:
              "linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, #000 18%, #000 82%, transparent 100%)",
          }}
        />
        {/* soft breathing glow over the arc */}
        <div
          className="absolute inset-x-0 bottom-0 h-[24vh]"
          style={{
            background:
              "radial-gradient(50% 70% at 50% 90%, rgba(160,107,255,0.16), transparent 70%)",
            mixBlendMode: "screen",
            animation: "aurora 6s ease-in-out infinite",
          }}
        />
        {/* top fade so the image dissolves into the section above */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg to-transparent" />
      </div>
    </section>
  );
}
