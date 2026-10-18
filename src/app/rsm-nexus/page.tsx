import type { Metadata } from "next";
import { RSMNexusLanding } from "@/components/rsm/RSMNexusLanding";

export const metadata: Metadata = {
  title: { absolute: "Rotterdam School of Management, Erasmus University Supply Chain Nexus 2026 · Powered by Agentra" },
  description:
    "Rotterdam School of Management, Erasmus University Supply Chain Nexus, 2nd Edition. An evening of networking, insight and supply chain innovation in Amsterdam on 25 September 2026. An initiative of Rotterdam School of Management, Erasmus University alumni now at Agentra, hosted by Lalit Das and organised by Agentra with the support of the school's Alumni team.",
  alternates: { canonical: "/rsm-nexus" },
  openGraph: {
    title: "Rotterdam School of Management, Erasmus University Supply Chain Nexus 2026 · Powered by Agentra",
    description:
      "An evening of networking, insight and supply chain innovation. Amsterdam · 25 September 2026 · An initiative of Rotterdam School of Management, Erasmus University alumni at Agentra.",
    url: "https://www.agentra-ai.com/rsm-nexus",
    type: "website",
    images: [
      {
        url: "/rsm-nexus/hero-group.png",
        width: 1920,
        height: 1080,
        alt: "Rotterdam School of Management, Erasmus University Supply Chain Nexus, Amsterdam, 25 September 2026",
      },
    ],
  },
};

export default function RSMNexusPage() {
  return <RSMNexusLanding />;
}
