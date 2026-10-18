import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Manifesto, TheShift, PlatformGlance } from "@/components/home/MinimalHome";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: { absolute: "Agentra · The Agentic Supply Chain" },
  description:
    "Agentra is the agentic AI platform for the supply chain. A workforce of specialised agents that sense, decide and act across planning, resilience, execution and orchestration, always in your command.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <TheShift />
      <PlatformGlance />
      <CTA
        title="See Agentra in your supply chain."
        sub="Book a 30-minute demo."
      />
    </>
  );
}
