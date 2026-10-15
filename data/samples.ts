/**
 * Sample sites: redesigns built for a business before they said yes, so they
 * can see their own site done properly instead of a proposal. Every one is a
 * live, working page, clearly labelled on the page itself as a sample.
 */
export type Sample = {
  slug: string;
  name: string;
  place: string;
  sector: string;
  year: string;
  url: string;
  image: string; // desktop, 1600x1000
  phone: string; // phone, 780x1688
  summary: string;
  problem: string;
  built: string[];
};

export const samples: Sample[] = [
  {
    slug: "vr-engineering",
    name: "V&R Engineering",
    place: "London, Ontario",
    sector: "Consulting engineers",
    year: "2026",
    url: "https://vreng-demo.vercel.app",
    image: "/projects/screenshots/vr-engineering.webp",
    phone: "/projects/screenshots/vr-engineering-phone.webp",
    summary:
      "A mechanical and electrical engineering firm with fifty years of hospitals, schools and civic buildings behind it, and a website that hid all of it.",
    problem:
      "110 projects spread over 142 pages: hard for clients to browse and hard for staff to keep up to date.",
    built: [
      "A dark, photo-led site where the buildings carry the story",
      "Project pages with photo banners, glass info cards and a map",
      "Careers and co-op student pages",
      "A working admin: add projects with photos, students, jobs and page text, and see visitors and enquiries",
    ],
  },
  {
    slug: "uncle-bobs-popcorn",
    name: "Uncle Bob's Popcorn",
    place: "Walsingham, Ontario",
    sector: "Family farm, online store",
    year: "2026",
    url: "https://glistening-sundae-083886.netlify.app",
    image: "/projects/screenshots/uncle-bobs-popcorn.webp",
    phone: "/projects/screenshots/uncle-bobs-popcorn-phone.webp",
    summary:
      "The family farm that grows more popcorn than anyone else in Canada, redesigned as a store that feels like opening the bag.",
    problem:
      "A standard online store that made a one-of-a-kind farm look like every other shop.",
    built: [
      "A 3D Pop-A-Cob in the hero you can spin, and tap to pop kernels off",
      "Every real product, price and photo from their store",
      "Bag-red and butter-yellow, with headings set in type that inflates",
      "Product pages, the family's story and wholesale",
    ],
  },
  {
    slug: "kake-da-dhaba",
    name: "Kake Da Dhaba",
    place: "Windsor, Ontario",
    sector: "Punjabi restaurant",
    year: "2026",
    url: "https://kake-da-dhaba.vercel.app",
    image: "/projects/screenshots/kake-da-dhaba.webp",
    phone: "/projects/screenshots/kake-da-dhaba-phone.webp",
    summary:
      "A roadside Punjabi kitchen on Tecumseh Road, designed from its own painted-truck logo.",
    problem:
      "The old site listed the wrong hours and looked nothing like the place people love.",
    built: [
      "Truck-art colours, painted name plates and scalloped canopy edges taken from the logo",
      "A truck that drives in on scroll to a Horn OK Please sign",
      "The full menu with prices, and the Google rating up front",
      "Call, pickup and delivery one tap away on a phone",
    ],
  },
  {
    slug: "donnas-fashions",
    name: "Donna's Fashions",
    place: "Grimsby, Ontario",
    sector: "Women's boutique",
    year: "2026",
    url: "https://donnasfashions-sample.netlify.app",
    image: "/projects/screenshots/donnas-fashions.webp",
    phone: "/projects/screenshots/donnas-fashions-phone.webp",
    summary:
      "A Main Street boutique with 48 years of loyal customers, sizes 2 petite to plus.",
    problem:
      "The old website had gone offline, so for anyone searching, the shop no longer existed.",
    built: [
      "A warm, rose-toned boutique look built around the real storefront",
      "Her own photos, recovered from the last archived copy of the old site",
      "Collections, sizes, the story and how to find the shop",
      "A floating Call Donna button on phones",
    ],
  },
  {
    slug: "garrod-pickfield",
    name: "Garrod Pickfield LLP",
    place: "Guelph, Ontario",
    sector: "Environmental and municipal law",
    year: "2026",
    url: "https://garrodpickfield-sample.netlify.app",
    image: "/projects/screenshots/garrod-pickfield.webp",
    phone: "/projects/screenshots/garrod-pickfield-phone.webp",
    summary:
      "A Guelph firm practising the law of land, water and community since 1989.",
    problem:
      "A site that works, but does not show the depth of a specialist firm to the municipalities and developers it serves.",
    built: [
      "A calm navy-and-gold look true to the firm's mark",
      "Practice areas, lawyers with their real photos, and notable cases",
      "A free 30-minute consultation as the one clear next step",
      "A layout that reads well on a phone between meetings",
    ],
  },
];
