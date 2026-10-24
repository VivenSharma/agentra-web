import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Spotlight } from "@/components/Spotlight";

// Fonts are self-hosted (app/fonts, variable woff2 from Fontsource, SIL OFL)
// rather than loaded through next/font/google, which broke Vercel builds in
// Oct 2026 ("next/font/google queries have exactly one entry"). This also
// means builds never depend on reaching Google Fonts.

// Body + headings — the RedBaton primary typeface
const jakarta = localFont({
  src: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  weight: "200 800",
  variable: "--font-jakarta",
  display: "swap",
});

// Buttons + eyebrow labels — RedBaton's uppercase label face
const albert = localFont({
  src: "./fonts/albert-sans-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-albert",
  display: "swap",
});

const mono = localFont({
  src: "./fonts/jetbrains-mono-latin-wght-normal.woff2",
  weight: "100 800",
  variable: "--font-mono-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.agentra-ai.com"),
  title: {
    default: "Agentra · The Agentic Supply Chain",
    template: "%s · Agentra",
  },
  description:
    "Agentra is the agentic AI platform for the supply chain. A workforce of agents that sense, reason, and act across planning, resilience, execution and orchestration, moving your supply chain from automation to autonomy.",
  keywords: [
    "agentic supply chain",
    "Agentra",
    "Agentra AI",
    "Agentra AI BV",
    "Agentra B.V.",
    "agentic AI supply chain",
    "AI supply chain agents",
    "autonomous supply chain",
    "supply chain AI platform",
    "supply chain orchestration AI",
    "supply chain planning AI",
    "agentic AI",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Agentra · The Agentic Supply Chain",
    description:
      "The agentic AI platform for the supply chain. Agents that act, not just advise, across planning, resilience, execution and orchestration.",
    url: "https://www.agentra-ai.com",
    siteName: "Agentra",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agentra — The Agentic Supply Chain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentra · The Agentic Supply Chain",
    description:
      "The agentic AI platform for the supply chain. Agents that sense, reason and act.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a090d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${albert.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Structured data — helps Google understand the brand + site */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "@id": "https://www.agentra-ai.com/#organization",
                name: "Agentra",
                legalName: "Agentra B.V.",
                alternateName: ["Agentra AI", "Agentra AI BV"],
                url: "https://www.agentra-ai.com",
                logo: "https://www.agentra-ai.com/brand/agentra-white.svg",
                image: "https://www.agentra-ai.com/og-image.png",
                slogan: "The Agentic Supply Chain",
                description:
                  "Agentra is the agentic AI platform for the supply chain. A workforce of specialised AI agents that sense, reason and act across planning, resilience, execution and orchestration, moving supply chains from automation to autonomy.",
                foundingLocation: {
                  "@type": "Place",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Amsterdam",
                    addressCountry: "NL",
                  },
                },
                areaServed: [
                  "Europe",
                  "Middle East",
                  "India",
                  "North America",
                ],
                knowsAbout: [
                  "Agentic AI",
                  "Supply chain management",
                  "Supply chain orchestration",
                  "Supply chain planning",
                  "Supply chain execution",
                  "Supply chain resilience",
                  "Autonomous supply chain",
                ],
                sameAs: ["https://www.linkedin.com/company/agentra-ai-bv"],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "@id": "https://www.agentra-ai.com/#website",
                name: "Agentra",
                url: "https://www.agentra-ai.com",
                publisher: { "@id": "https://www.agentra-ai.com/#organization" },
              },
            ]),
          }}
        />
        <ScrollProgress />
        <Spotlight />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
