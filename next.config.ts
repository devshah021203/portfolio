import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async redirects() {
    // Redirect `source` matching is case-insensitive, so one entry per old
    // path covers every capitalisation. Never add an entry whose source equals
    // its own destination in a different case; it loops.
    return [
      { source: "/dwello", destination: "/work/dwello", permanent: true },
      { source: "/airtracedeskbot", destination: "/work/dwello", permanent: true },
      { source: "/airtrace-deskbot", destination: "/work/dwello", permanent: true },
      { source: "/deskbot", destination: "/work/dwello", permanent: true },
      { source: "/beamfall", destination: "/work/beamfall", permanent: true },
      { source: "/api/airtrace/early-access", destination: "/api/dwello/early-access", permanent: false },
    ];
  },
};

export default nextConfig;
