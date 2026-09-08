import type { Metadata } from "next";

// Every absolute URL on the site derives from this: canonicals, the sitemap,
// JSON-LD ids and og:image URLs. Set NEXT_PUBLIC_SITE_URL in Vercel to the
// production origin.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shah-dev.com";

export const personName = "Dev Shah";
export const defaultTitle = "Dev Shah — Founder, Developer & Designer in Windsor, Ontario";
export const defaultDescription =
  "Dev Shah builds products, brands and small ventures from Windsor, Ontario: founder of Voyagea and Keri in Windsor, Business Development Officer at PTRI Innovation, and the developer behind BeamFall and Dwello.";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: "%s — Dev Shah" },
  description: defaultDescription,
  keywords: [
    "Dev Shah",
    "Dev Shah Windsor",
    "web developer Windsor",
    "web design Windsor Ontario",
    "product designer Windsor",
    "Next.js developer",
    "creative developer",
    "founder of Voyagea",
    "founder of Keri in Windsor",
    "PTRI Innovation Business Development Officer",
    "BeamFall developer",
    "Dwello desk robot",
    "Windsor entrepreneur",
    "small business website Windsor",
    "local SEO Windsor",
  ],
  authors: [{ name: personName, url: siteUrl }],
  creator: personName,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    siteName: "Dev Shah",
    type: "website",
    locale: "en_CA",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Dev Shah — built from Windsor, Ontario" }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og.png"],
  },
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: personName,
  url: siteUrl,
  email: "mailto:hello.devshah@gmail.com",
  jobTitle: ["Founder", "Developer", "Designer"],
  address: { "@type": "PostalAddress", addressLocality: "Windsor", addressRegion: "ON", addressCountry: "CA" },
  worksFor: [
    { "@type": "Organization", name: "Voyagea", url: "https://voyagea.travel" },
    { "@type": "Organization", name: "PTRI Innovation", url: "https://www.ptriinnovation.com" },
    { "@type": "Organization", name: "Keri in Windsor", url: "https://keriinwindsor.ca" },
  ],
  knowsAbout: ["Web design", "Product design", "Next.js", "Local SEO", "Brand systems", "iOS apps"],
};
