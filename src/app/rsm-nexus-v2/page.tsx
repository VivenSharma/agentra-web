import type { Metadata } from "next";
import { RSMNexusV2 } from "@/components/rsm-v2/RSMNexusV2";

export const metadata: Metadata = {
  title: { absolute: "Rotterdam School of Management, Erasmus University Supply Chain Nexus 2026 · v2" },
  description:
    "An immersive scroll experience for the Rotterdam School of Management, Erasmus University Supply Chain Nexus, Chapter 02. Amsterdam, 25 September 2026. Powered by Agentra.",
  alternates: { canonical: "/rsm-nexus-v2" },
  robots: { index: false, follow: false },
};

export default function RSMNexusV2Page() {
  return <RSMNexusV2 />;
}
