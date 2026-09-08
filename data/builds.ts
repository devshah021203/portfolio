/**
 * Things Dev shipped that are not client websites: an iPhone game and a
 * desk robot. They live alongside the web work under /work/[slug].
 */
export type Build = {
  slug: string;
  name: string;
  kind: "iPhone game" | "Desk robot";
  year: string;
  summary: string;
  tagline: string;
  url?: string;
  urlLabel?: string;
  image: string;
  imageAlt: string;
  imageRatio: string; // CSS aspect-ratio
  description: string;
  role: string;
  challenge: string;
  approach: string;
  outcome: string;
  stack: string[];
  gallery?: { src: string; alt: string }[];
  facts: [string, string][];
};

export const builds: Build[] = [
  {
    slug: "beamfall",
    name: "BeamFall",
    kind: "iPhone game",
    year: "2026",
    summary: "A free light-routing logic puzzle for iPhone. Turn mirrors, prisms, tints and gates until every target glows the right colour.",
    tagline: "Bend light. Solve the grid.",
    url: "https://apps.apple.com/ca/app/beamfall/id6805519789",
    urlLabel: "App Store",
    image: "/beamfall/screens/prism.webp",
    imageAlt: "BeamFall level with a cyan beam routed through mirrors and a prism",
    imageRatio: "1287 / 2796",
    description:
      "BeamFall is a pure logic puzzle: coloured beams enter a grid and you rotate the pieces in their path until every ring is lit in its matching colour. No timers, no ads, no purchases required to play.",
    role: "Game design, level generation and verification, iOS build, App Store launch and both store listings.",
    challenge:
      "Puzzle games live or die on level quality. Hand-building hundreds of levels is slow, and generated levels are often trivial or unsolvable.",
    approach:
      "Write a solver first, then a generator that only keeps puzzles the solver proves have exactly one clean solution. Add a Shapes mode so colour-blind players get glyphs and dash patterns instead of hue alone.",
    outcome:
      "Live on the App Store with hundreds of machine-verified levels, ten boss runs, offline play and an accessibility mode from day one.",
    stack: ["Expo / React Native", "TypeScript", "Custom solver", "StoreKit", "App Store Connect"],
    gallery: [
      { src: "/beamfall/screens/home.webp", alt: "BeamFall home screen" },
      { src: "/beamfall/screens/prism.webp", alt: "A prism level in BeamFall" },
      { src: "/beamfall/screens/cleared.webp", alt: "A cleared BeamFall level" },
      { src: "/beamfall/screens/shapes.webp", alt: "Shapes mode, an accessible alternative to colour" },
      { src: "/beamfall/screens/levels.webp", alt: "BeamFall level select" },
      { src: "/beamfall/screens/boss.webp", alt: "A BeamFall boss run" },
    ],
    facts: [
      ["Platform", "iPhone, iOS 16.4+"],
      ["Price", "Free"],
      ["Levels", "Hundreds, all verified"],
      ["Publisher", "PTRI Innovation"],
    ],
  },
  {
    slug: "dwello",
    name: "Dwello",
    kind: "Desk robot",
    year: "2026",
    summary: "A small desk companion that knows when you are in the room. Millimetre-wave presence sensing, an expressive face and no camera.",
    tagline: "A desk robot that notices you.",
    image: "/dwello/dwello.png",
    imageAlt: "Dwello, a white desk robot with a rounded head and a friendly face",
    imageRatio: "1596 / 1776",
    description:
      "Dwello is a desk robot built around a 24 GHz radar sensor rather than a camera. It tracks where people are in a room, turns to face you, changes expression as you come and go, and never records a frame of video.",
    role: "Industrial and character design, firmware, sensor fusion, the web product page and the early-access programme.",
    challenge:
      "Presence-aware devices usually mean a camera on your desk. Most people, reasonably, do not want that.",
    approach:
      "Use a radar module that only reports positions, run everything on a tiny ESP32-C6 with no cloud dependency, and put the effort into a face that reads as alive from across the room.",
    outcome:
      "Working hardware with sub-5 cm position jitter, a live 3D preview on the web and an early-access list for the first batch.",
    stack: ["ESP32-C6", "LD2450 mmWave radar", "ESP-IDF", "Three.js", "Next.js"],
    facts: [
      ["Sensing", "24 GHz mmWave radar"],
      ["Camera", "None"],
      ["Brain", "ESP32-C6, fully local"],
      ["Status", "Early access"],
    ],
  },
];

export function getBuild(slug: string) {
  return builds.find((b) => b.slug === slug);
}
