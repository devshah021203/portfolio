import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("keeps portfolio content and live links data-driven", async () => {
  const [projects, experience, articles, cursor, navigation, seo, beamfall] = await Promise.all([
    readFile(new URL("../data/projects.ts", import.meta.url), "utf8"),
    readFile(new URL("../data/experience.ts", import.meta.url), "utf8"),
    readFile(new URL("../data/articles.ts", import.meta.url), "utf8"),
    readFile(new URL("../components/ui/CustomCursor.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/layout/StickyNav.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/seo.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/beamfall/page.tsx", import.meta.url), "utf8"),
  ]);

  for (const liveUrl of [
    "https://voyagea.travel",
    "https://akbuildsandplumbing.ca",
    "https://trikstudio.in",
    "https://keriinwindsor.ca",
    "https://skyvageweb.vercel.app",
  ]) {
    assert.match(projects, new RegExp(liveUrl.replaceAll(".", "\\.")));
  }

  assert.equal((projects.match(/image: "\/projects\/screenshots\//g) ?? []).length, 5);
  assert.match(experience, /DreamYourDesign/);
  assert.match(experience, /Founder of Keri in Windsor/);
  assert.match(experience, /Business Development Officer \(BDO\)/);
  assert.match(articles, /small business website Windsor/);
  assert.match(articles, /local SEO Windsor/);
  assert.match(articles, /founder of Keri in Windsor/);
  assert.match(articles, /AI travel planner/);
  assert.match(cursor, /useState\(""\)/);
  assert.doesNotMatch(cursor, /\|\| "DS"/);
  assert.match(navigation, /brand-signature/);
  assert.match(seo, /NEXT_PUBLIC_SITE_URL/);
  assert.match(navigation, /games/);
  assert.match(beamfall, /apps\.apple\.com\/ca\/app\/beamfall\/id6805519789/);
  assert.match(beamfall, /Google Play.*Launching soon/s);
  assert.match(beamfall, /machine-verified/);
});
