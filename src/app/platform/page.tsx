import type { Metadata } from "next";
import { PlatformHero } from "@/components/home/PlatformHero";
import { Connectors } from "@/components/home/Connectors";
import { FourLayers } from "@/components/home/FourLayers";
import { Orchestration } from "@/components/home/Orchestration";
import { ExceptionConsole } from "@/components/home/ExceptionConsole";
import { AutonomyDial } from "@/components/home/AutonomyDial";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Every signal in, one autonomy layer out. 900+ integrations, a proprietary ontology, a multi-agent engine, and governance by design.",
};

export default function PlatformPage() {
  return (
    <>
      <PlatformHero />
      <FourLayers />
      <Connectors />
      <Orchestration />
      <ExceptionConsole />
      <AutonomyDial />
      <CTA />
    </>
  );
}
