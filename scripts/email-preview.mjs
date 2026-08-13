/**
 * Renders the Dwello welcome email to tmp/ so it can be opened in a browser
 * without sending anything.
 *
 *   npm run email:preview
 *
 * Point images at the local dev server while iterating:
 *   NEXT_PUBLIC_SITE_URL=http://localhost:4310 npm run email:preview
 *
 * Relies on Node's built-in TypeScript stripping (Node 23+).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { welcomeEmail, welcomeText } from "../lib/dwelloEmail.ts";

const cases = [
  { label: "named-tester-home-office", name: "Alex Chen", room: "home-office", testing: true },
  { label: "anonymous-living-room", name: "", room: "living-room", testing: false },
];

mkdirSync("tmp", { recursive: true });

for (const c of cases) {
  writeFileSync(`tmp/email-${c.label}.html`, welcomeEmail(c.name, c.room, c.testing));
  writeFileSync(`tmp/email-${c.label}.txt`, welcomeText(c.name, c.room, c.testing));
  console.log(`tmp/email-${c.label}.html`);
}
