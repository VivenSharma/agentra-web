import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Agentra · The Agentic Supply Chain",
    short_name: "Agentra",
    description:
      "The agentic AI platform for the supply chain. Agents that sense, reason and act.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a090d",
    theme_color: "#0a090d",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
