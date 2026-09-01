import type { Metadata } from "next";
import type { Project } from "@/data/projects";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = (
  configuredSiteUrl ??
  (vercelProductionUrl ? `https://${vercelProductionUrl}` : "http://localhost:3000")
).replace(/\/$/, "");

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dev Shah — Founder, Developer & Designer in Windsor",
    template: "%s - Dev Shah",
  },
  description:
    "Dev Shah is the founder of Keri in Windsor and Voyagea, a web developer and designer in Windsor, and Business Development Officer at PTRI Innovation.",
  keywords: [
    "Dev Shah",
    "web developer Windsor",
    "product designer",
    "Next.js developer",
    "creative developer",
    "web design",
    "Dev Shah founder",
    "founder of Keri in Windsor",
    "Keri in Windsor founder",
    "founder of Voyagea",
    "Voyagea founder and developer",
    "PTRI Innovation BDO",
    "PTRI Innovation Business Development Officer",
    "DreamYourDesign Creative Director",
    "Windsor entrepreneur",
    "seasonal mango business Windsor",
    "web design Windsor Ontario",
    "local SEO Windsor",
    "small business website Windsor",
    "Windsor website designer",
    "AI travel planner",
    "Dev Shah game developer",
    "BeamFall game",
    "iPhone puzzle game",
  ],
  authors: [{ name: "Dev Shah", url: siteUrl }],
  creator: "Dev Shah",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "Dev Shah — Founder, Developer & Designer in Windsor",
    description:
      "Founder of Keri in Windsor and Voyagea, web developer and designer, and Business Development Officer at PTRI Innovation.",
    url: "/",
    siteName: "Dev Shah Portfolio",
    type: "website",
    images: [{ url: "/og.png", width: 1536, height: 864, alt: "Dev Shah - Web + Product + Brand" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Shah — Founder, Developer & Designer in Windsor",
    description: "Founder of Keri in Windsor and Voyagea, developer, designer and BDO at PTRI Innovation.",
    images: ["/og.png"],
  },
};

export function projectMetadata(project: Project): Metadata {
  const title = `${project.name} case study`;
  const description = project.description;

  return {
    title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${title} - Dev Shah`,
      description,
      url: `/work/${project.slug}`,
      siteName: "Dev Shah Portfolio",
      type: "article",
      images: [{ url: project.image, width: 1200, height: 630, alt: project.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} - Dev Shah`,
      description,
      images: [project.image],
    },
  };
}
