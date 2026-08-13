import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Vercel serves /public with `max-age=0, must-revalidate`, and next/image
    // inherits that upstream header — so every optimized image revalidates on
    // every visit. Pin a real TTL for the optimizer's own output.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    return [
      // The robot is called Dwello, so /dwello is canonical and every earlier
      // name still resolves. Redirect `source` matching is case-INSENSITIVE,
      // so these also catch /AirTraceDeskBot, /DeskBot and friends — and a
      // "/Dwello" entry must NOT be added here, because it would match
      // /dwello itself and redirect the canonical page to itself forever.
      { source: "/airtracedeskbot", destination: "/dwello", permanent: true },
      { source: "/airtrace-deskbot", destination: "/dwello", permanent: true },
      { source: "/deskbot", destination: "/dwello", permanent: true },
    ];
  },
};

export default nextConfig;
