import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Our own brand logo is a trusted local SVG.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // The original Nexus page described the roundtable format, which was dropped.
  // It is retired in favour of /rsm-nexus-v2 so the stale agenda is unreachable;
  // 308 so any link already shared stops pointing at the old programme.
  async redirects() {
    return [
      { source: "/rsm-nexus", destination: "/rsm-nexus-v2", permanent: true },
      // Customer stories moved to their own top-level section (nav, Oct 2026).
      { source: "/resources/customer-stories", destination: "/customers", permanent: true },
    ];
  },
};

export default nextConfig;
