export type Experience = {
  period: string;
  organization: string;
  role: string;
  description: string;
  url?: string;
};

export const experiences: Experience[] = [
  {
    period: "2026 — now",
    organization: "Voyagea",
    role: "Founder & Developer",
    description:
      "A free AI travel planner that turns saved places into complete day-by-day itineraries with maps, budgets, hyperlocal tips and a digital V-Passport. Product, design and the full stack.",
    url: "https://voyagea.travel",
  },
  {
    period: "2026 — now",
    organization: "PTRI Innovation",
    role: "Business Development Officer",
    description:
      "Growth, partnerships and market development for an AI-first technology company building intelligent platforms and digital products. Also where BeamFall and Dwello are published.",
    url: "https://www.ptriinnovation.com",
  },
  {
    period: "2025 — now",
    organization: "Keri in Windsor",
    role: "Founder",
    description:
      "A seasonal mango business bringing premium Kesar, Alphonso and Banganpalli mangoes to Windsor–Essex and nearby Ontario communities in limited batches with local delivery. Over 100 boxes sold in the first season.",
    url: "https://keriinwindsor.ca",
  },
  {
    period: "2023 — 2024",
    organization: "DreamYourDesign",
    role: "Graphic Designer & Creative Director",
    description:
      "Visual identities, campaign creative, social content and brand systems. The design foundation behind everything above.",
  },
];
