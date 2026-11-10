import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Manifesto, TheShift } from "@/components/home/MinimalHome";
import { ClientSectors, IntegrationLogos, ThreeMessages, TrustFacts } from "@/components/home/Proof";
import { LatestPosts } from "@/components/home/LatestPosts";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: { absolute: "Agentra · The agentic layer for supply chain" },
  description:
    "Agentra is the agentic layer for supply chain. Agents act inside the systems you already run, with your team in command. First agent live in 6–8 weeks.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ClientSectors />
      <IntegrationLogos />
      <Manifesto />
      <LatestPosts />
      <TheShift />
      <ThreeMessages />
      <TrustFacts />
      <CTA
        title="See Agentra in your supply chain."
        sub="Book a 30-minute demo."
      />
    </>
  );
}
