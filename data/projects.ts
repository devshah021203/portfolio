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
    category: "AI travel app",
    eyebrow: "Product / Featured",
    summary:
      "An AI travel app for iPhone and Android that finds the places worth the detour and plans the days around them, offline included.",
    tagline: "Explore the unseen.",
    url: "https://voyagea.travel",
    urlLabel: "voyagea.travel",
    image: "/projects/screenshots/voyagea.webp",
    imageAlt: "Voyagea website hero, Explore the Unseen over a photo of Reine Harbour in Lofoten",
    cta: "Get the app",
    accent: "#2454ff",
    surface: "#111318",
    description:
      "Voyagea is a travel companion that turns saved places and a few answers into day-by-day trips with maps, costs and local tips, then keeps working when the signal drops: saved trips, photos and a drawn map all live on the phone.",
    role: "Founder. Product strategy, design, the iOS and Android apps, the AI and data pipeline, Supabase architecture, store launches and growth.",
    challenge:
      "Travel inspiration is scattered across Instagram, TikTok, YouTube and Google Maps. Saving is easy; organizing and planning are not, and most planners stop being useful the moment you lose signal abroad.",
    approach:
      "Build one connected flow in the app: save a place, enrich it, see it on a map and turn it into an itinerary. Then make the trip work offline, and reward actually going with stamps you only earn by standing there.",
    outcome:
      "Live on the App Store and Google Play, with offline trips, an own places database and a website rebuilt as the app's showcase.",
    stack: ["Expo / React Native", "Supabase", "Gemini / AI APIs", "StoreKit + Play Billing", "Vercel"],
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
  {
    slug: "chargebuddy",
    number: "06",
    name: "ChargeBuddy",
    category: "App + website, India",
    eyebrow: "Product",
    summary:
      "An EV charger map for India that tells you which chargers actually work, because riders check in after they charge.",
    tagline: "Find an EV charger that actually works.",
    url: "https://chargebuddy.in",
    urlLabel: "chargebuddy.in",
    image: "/projects/screenshots/chargebuddy.webp",
    imageAlt: "ChargeBuddy website hero with an electric car at a charger and live status cards",
    cta: "Find a charger",
    accent: "#2bd46b",
    surface: "#0c1a12",
    description:
      "ChargeBuddy puts India's public EV chargers on one map and marks each one green, red or grey from what riders report on the spot. Scooters, autos and cars, no wallet and no sign-up needed to look.",
    role: "Product, research, mobile app, database and realtime design, the website and its city pages, store listings and launch.",
    challenge:
      "Government and network maps list where chargers are, not whether they work. Riders in India drive to a charger and find it broken, busy or switched off, and no map tells them first.",
    approach:
      "Make the rider the sensor. A check-in from within 1 km of the charger updates its status, price and photo for everyone in about three seconds. Seed the map from public and operator data, then let use correct it.",
    outcome:
      "A live iOS and Android app with realtime check-ins, and a website with a page for every state and over 500 cities so people searching for a charger find it first.",
    stack: ["Expo / React Native", "Supabase Realtime", "PostgreSQL", "Static site + SEO pages", "Vercel"],
    motion:
      "Status pins flip colour the moment a rider checks in.",
  },
  {
    slug: "ptrionix",
    number: "07",
    name: "Ptrionix",
    category: "Construction ERP",
    eyebrow: "SaaS",
    summary:
      "Construction ERP for firms in India: projects, tenders, BOQs, bills, approvals and finance in one system instead of five spreadsheets.",
    tagline: "Every project. One blueprint.",
    url: "https://ptrionix.vercel.app",
    urlLabel: "ptrionix.vercel.app",
    image: "/projects/screenshots/ptrionix.webp",
    imageAlt: "Ptrionix construction ERP landing page with a dashboard preview",
    cta: "See the product",
    accent: "#e0902d",
    surface: "#f6f5fb",
    description:
      "Ptrionix runs a construction business from tender to final bill: projects and schedules, two-phase tenders, commercial bid BOQs, work breakdown, bills with staged approvals, team rights and financials, printed on the firm's own letterhead.",
    role: "Took over development of a live product with paying customers. Dashboard and module redesigns, new workflows, approval chains, PDF output and data fixes, shipped in weekly rounds.",
    challenge:
      "The product was already in use by real firms, so nothing could break and no data could be reset, while the owner wanted it to feel like enterprise software within six weeks.",
    approach:
      "Ship in rounds the owner can test on a demo company: redesign one area, add the workflow behind it, deploy, take feedback, repeat. Approvals got seats and comments; tenders got two phases; BOQs got a reader for schedule-of-rates files.",
    outcome:
      "Five release rounds in the first week of the takeover: tenders, BOQ approvals, bill approvals, WBS, financials, team permissions and letterhead PDFs, all live.",
    stack: ["Next.js", "Firebase / Firestore", "TypeScript", "PDF generation", "Vercel"],
    motion:
      "Approval chains fill seat by seat as each person signs off.",
  },
  {
    slug: "ptri-innovation",
    number: "08",
    name: "PTRI Innovation",
    category: "Company website",
    eyebrow: "Studio",
    summary:
      "A full redesign of a product studio's website: its apps, its desk robot, its ERP and the client sites it has shipped.",
    tagline: "We build what your business grows into.",
    url: "https://www.ptriinnovation.com",
    urlLabel: "ptriinnovation.com",
    image: "/projects/screenshots/ptri-innovation.webp",
    imageAlt: "PTRI Innovation website hero on a dark background with an orange italic headline",
    cta: "Visit",
    accent: "#ff4d19",
    surface: "#08090b",
    description:
      "PTRI Innovation designs and ships AI platforms, custom software and websites. The old site was two pages and described a product that did not exist. The new one shows what the studio actually makes.",
    role: "Information architecture, copy, visual design, interactive pieces and development.",
    challenge:
      "The studio had real products (Voyagea, Dwello, Ptrionix, BeamFall) and real client sites, but its website showed none of them and got one of them wrong.",
    approach:
      "Organise by what exists: products, client websites, services. Give each product its own colour inside one dark system, and let visitors play with the work: a live robot face with eight expressions and a radar room you can drag people through.",
    outcome:
      "A studio site that doubles as a working demo of what the studio builds, with clean screenshots of every client site and a page for each product.",
    stack: ["HTML / CSS / JS", "Canvas", "SVG animation", "Responsive", "Vercel"],
    motion:
      "A cursor-reactive signal field in the hero, and a robot face that reacts as you move.",
  },
  {
    slug: "saturday-table",
    number: "09",
    name: "The Saturday Table",
    category: "My own venture",
    eyebrow: "Venture",
    summary:
      "A small Saturday gathering in Windsor for founders and builders: seven seats, five different industries, one conversation.",
    tagline: "Founders. Entrepreneurs. Builders. This is for you.",
    url: "https://thesaturdaytable.ca",
    urlLabel: "thesaturdaytable.ca",
    image: "/projects/screenshots/saturday-table.webp",
    imageAlt: "The Saturday Table sign-up page, black with a gold horizon and an email field",
    cta: "Join",
    accent: "#d9a44a",
    surface: "#000000",
    description:
      "The Saturday Table puts five people from different industries and two hosts around one table for ninety minutes, with one question to work through together. The site is the front door: one line, one email field.",
    role: "The idea, the name, the format, the website, the sign-up backend and a companion app.",
    challenge:
      "Networking events are big, loud and forgettable. People who are building something want a few real conversations, not a room of business cards.",
    approach:
      "Keep it small and keep the page simpler still. The sign-up checks for typos, throwaway addresses and domains that cannot receive mail before anything is saved.",
    outcome:
      "A live pre-launch page on its own domain collecting sign-ups for the first tables, and an app with tables, a board and host tools in the works.",
    stack: ["HTML / CSS", "Supabase", "Email validation", "Vercel Analytics", "Expo (app)"],
    motion:
      "A single gold horizon that slowly brightens behind the headline.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
