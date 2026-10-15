# Dev Shah — portfolio (v5)

Next.js 16 / React 19 site for shah-dev.com. No Tailwind, no animation libraries: plain CSS driven by a real solar model.

## The idea

The site is lit by the real sky over Windsor, Ontario. `lib/sun.ts` computes the sun's altitude and azimuth for
Windsor at the current time; `components/Lighting.tsx` turns that into every colour token and the direction and
length of every shadow (`.lit`). The hero (`components/Sky.tsx`) draws the sun with a small WebGL shader, and
visitors can drag the sky or use the time slider to move through the day. Pages wake up pre-dawn and the sun rises
to the current time on load.

## Commands

```bash
npm run dev      # http://localhost:4415
npm run build    # production build
npm run lint
node tools/capture-sites.mjs [slug ...]                # recapture live-site screenshots (needs Google Chrome)
node tools/shot.mjs out.png --w 1440 --h 900 --full   # headless screenshots for review
```

## Structure

- `app/page.tsx` — home: hero, right-now strip, selected work, sample sites, builds, roles, insights, contact
- `app/work/[slug]` — project pages (websites from `data/projects.ts`, apps/hardware from `data/builds.ts`)
- `app/samples` — sample sites from `data/samples.ts` (laptop + phone screenshots in `public/projects/screenshots`)
- `app/insights` — articles from `data/articles.ts`
- `app/api/dwello/early-access` — Dwello signup (Resend). Needs `RESEND_API_KEY`, `EARLY_ACCESS_FROM`,
  `EARLY_ACCESS_NOTIFY` in Vercel; without them it accepts the signup and returns `emailed: false`.

## Deploy

Set `NEXT_PUBLIC_SITE_URL` to the production origin (defaults to `https://shah-dev.com`). Old paths `/dwello`,
`/beamfall` and the AirTrace aliases redirect to `/work/…`, and the removed `/designs` pages redirect to `/#work`, in `next.config.ts`.

## Working notes

Do not run `next build` while `next dev` is running: they share `.next` and the dev server's manifests get corrupted
(pages render unstyled). Review with `npm run build && npm run start` (launch config `dev-shah-portfolio-v5-prod`).
