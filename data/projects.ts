export type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  eyebrow: string;
  summary: string;
  tagline: string;
  url: string;
  urlLabel: string;
  image: string;
  imageAlt: string;
  cta: string;
  accent: string;
  surface: string;
  description: string;
  role: string;
  challenge: string;
  approach: string;
  outcome: string;
  stack: string[];
  motion: string;
};

export const projects: Project[] = [
  {
    slug: "voyagea",
    number: "01",
    name: "Voyagea",
    category: "AI product",
    eyebrow: "Product / Featured",
    summary:
      "A free AI travel planner that creates complete day-by-day itineraries with maps, budgets and hyperlocal tips in seconds.",
    tagline: "Plan any trip in seconds.",
    url: "https://voyagea.travel",
    urlLabel: "voyagea.travel",
    image: "/projects/screenshots/voyagea.webp",
    imageAlt: "Voyagea AI travel planner website preview",
    cta: "Start a trip",
    accent: "#2454ff",
    surface: "#111318",
    description:
      "An AI-powered travel companion built to turn saved places from social media and maps into collections, routes and personalized itineraries.",
    role: "Product strategy, UX direction, full-stack development, AI integrations, Supabase architecture, Android packaging and launch iteration.",
    challenge:
      "Travel inspiration is scattered across Instagram, TikTok, YouTube and Google Maps. Saving is easy; organizing and planning are not.",
    approach:
      "Build one connected flow: save a place, enrich it with AI, organize it into a collection, see it on a map and turn it into an itinerary.",
    outcome:
      "A working mobile-first product with early user traction, collaborative trip features, a V-Passport system and a roadmap for monetization.",
    stack: ["Next.js", "Supabase", "Gemini / AI APIs", "Vercel", "Android"],
    motion:
      "Map pins pulse, saved cards stack into collections, and itinerary days reveal along the scroll.",
  },
  {
    slug: "ak-builds-plumbing",
    number: "02",
    name: "AK Builds & Plumbing",
    category: "Local service website",
    eyebrow: "Service",
    summary:
      "A trust-focused local service website built to explain services clearly and drive quote requests.",
    tagline: "Reliable work. Done right.",
    url: "https://akbuildsandplumbing.ca",
    urlLabel: "akbuildsandplumbing.ca",
    image: "/projects/screenshots/ak-builds-plumbing.webp",
    imageAlt: "AK Builds and Plumbing renovation website project imagery",
    cta: "Get a quote",
    accent: "#2454ff",
    surface: "#151515",
    description:
      "A modern website for a construction and plumbing business, designed to increase trust, explain services clearly and drive quote requests.",
    role: "Discovery, visual direction, responsive development, service architecture, local SEO setup and conversion-focused calls to action.",
    challenge:
      "The business needed a professional digital presence that felt reliable and local - without looking like a generic contractor template.",
    approach:
      "Use strong proof, clear service categories, local coverage, mobile-first quote actions and a confident visual system built around the existing brand.",
    outcome:
      "A clean, credible service website that gives customers a clear path from interest to enquiry and creates a stronger base for local SEO.",
    stack: ["Responsive web", "Local SEO", "Quote funnel", "Analytics", "Vercel"],
    motion:
      "Service cards slide on stagger, numbers count in, and the quote CTA becomes sticky on mobile.",
  },
  {
    slug: "trik-studio",
    number: "03",
    name: "Trik Studio",
    category: "Interior design studio",
    eyebrow: "Studio",
    summary:
      "A refined studio website presenting premium residential and commercial interior design work in Ahmedabad.",
    tagline: "Transforming spaces. Elevating lifestyle.",
    url: "https://trikstudio.in",
    urlLabel: "trikstudio.in",
    image: "/projects/screenshots/trik-studio.webp",
    imageAlt: "Trik Studio interior design website project preview",
    cta: "View projects",
    accent: "#2454ff",
    surface: "#f3efe5",
    description:
      "A visually led interior design studio website presenting premium residential and commercial spaces through clear services, editorial project storytelling and restrained interaction.",
    role: "Creative direction, information architecture, interface design, development and scroll-based presentation.",
    challenge:
      "Interior design portfolios can feel image-heavy but difficult to navigate. The website needed to showcase the studio’s spaces while making services, process and enquiries easy to understand.",
    approach:
      "Build a simple structure and let typography, spacing, project framing and motion create the personality. Keep navigation clear and visual moments intentional.",
    outcome:
      "A polished studio portfolio that supports project discovery, communicates the turnkey offer and gives prospective clients a direct route to enquire.",
    stack: ["Editorial UI", "Interior portfolio", "Responsive build", "Case studies", "Vercel"],
    motion:
      "Oversized words mask project imagery, sections snap softly, and project titles track with the cursor.",
  },
  {
    slug: "keri-in-windsor",
    number: "04",
    name: "Keri in Windsor",
    category: "Local product brand",
    eyebrow: "Brand",
    summary:
      "A seasonal mango brand and practical ordering presence for local delivery.",
    tagline: "Sun-ripened. Delivered to Windsor.",
    url: "https://keriinwindsor.ca",
    urlLabel: "keriinwindsor.ca",
    image: "/projects/screenshots/keri-in-windsor.webp",
    imageAlt: "Keri in Windsor fresh Indian mango website preview",
    cta: "Order a box",
    accent: "#f6a623",
    surface: "#2a1a08",
    description:
      "A seasonal brand and ordering presence for premium Indian mango boxes delivered across Windsor and surrounding areas.",
    role: "Brand direction, offer structure, website copy, ordering flow, delivery-area communication and promotional creative.",
    challenge:
      "The product had urgency, seasonality and local demand, but orders depended heavily on scattered social messages.",
    approach:
      "Create one clear destination for varieties, box details, delivery zones, shipment updates, trust signals and fast ordering.",
    outcome:
      "A stronger brand presence supporting a business that sold 100+ boxes in its first season and continued to grow through local demand.",
    stack: ["Brand system", "Order flow", "Local delivery", "Seasonal campaigns", "Social creative"],
    motion:
      "Mango labels peel into view, the delivery map expands, and shipment updates remain highly visible.",
  },
  {
    slug: "skyvage",
    number: "05",
    name: "Skyvage",
    category: "Private aviation website",
    eyebrow: "Experiment",
    summary:
      "A cinematic private aviation website pairing transparent charter information with a premium, personally considered experience.",
    tagline: "Premium. Accessible.",
    url: "https://skyvageweb.vercel.app",
    urlLabel: "skyvageweb.vercel.app",
    image: "/projects/screenshots/skyvage.webp",
    imageAlt: "Skyvage private aviation website preview",
    cta: "Explore",
    accent: "#2454ff",
    surface: "#0d101b",
    description:
      "A cinematic private aviation website created to communicate transparent charter rates, long-range aircraft and a flight experience designed around the traveller.",
    role: "Concept development, art direction, motion planning, interface design and experimental frontend execution.",
    challenge:
      "Most portfolio experiments are disconnected visuals. This concept needed to demonstrate how mood and interaction can serve a complete experience.",
    approach:
      "Use restrained copy, depth layers, slow movement, precise sound-off interaction and dramatic transitions to create a memorable visual journey.",
    outcome:
      "A creative proof-of-concept that shows range beyond business websites and gives the portfolio a distinctive experimental edge.",
    stack: ["Art direction", "GSAP", "Parallax", "3D-ready", "Creative coding"],
    motion:
      "Slow parallax, depth-of-field layers, magnetic navigation, and scene-to-scene transitions.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
