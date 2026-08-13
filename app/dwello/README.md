# Dwello

Product page at **`/dwello`**. `/airtrace-deskbot`, `/AirTraceDeskBot` and
`/deskbot` all 308-redirect here (`next.config.ts`).

> Don't add a `/Dwello` redirect. Next matches redirect `source` values
> case-insensitively, so it would match `/dwello` itself and loop forever.

| Piece | File |
| --- | --- |
| Page + metadata + JSON-LD | `page.tsx` |
| Page-scoped dark theme | `dwello.css` |
| 3D robot (Three.js, no R3F) | `components/airtrace/DeskBotScene.tsx` |
| Face + expressions | `components/airtrace/deskbotFace.ts` |
| Hero stage (bot, speech bubble, expression rail) | `components/airtrace/DeskBotStage.tsx` |
| Radar room demo | `components/airtrace/RoomSim.tsx` |
| Early-access form | `components/airtrace/EarlyAccessForm.tsx` |
| Signup + auto-reply | `app/api/airtrace/early-access/route.ts` |

## The robot

Built procedurally from Three.js primitives — no model file to download.
Lathe-profile body, sphere head, arm paddles on shoulder pivots.

The face is a **canvas texture redrawn every frame**, like the real 1.28" LCD.
Expressions are parameter sets in `deskbotFace.ts` that get *lerped toward*, so
the face morphs between moods. Add one by adding an entry to `EXPRESSIONS`.

Three details that carry the expressiveness: brows (which lift, drop and angle
per side), eyes that cross-fade between a filled capsule and a crescent arc, and
asymmetry — one eye widening or one brow raising on its own.

**Gotchas worth remembering:**

- `browTilt` **negative** drives the inner brow ends *down* (furrowed,
  determined). Positive lifts them (surprised, worried). Easy to get backwards —
  it makes a happy face look annoyed.
- A flat disc can never sit flush on a sphere. The face housing buries its back
  end in the head and pushes its front past the pole, which is why `FACE_FRONT`
  derives from `HEAD_R * HEAD_SCALE_Z`. Skip that and the face renders *inside*
  the head, invisible.
- Rotating a downward-hanging arm by `+z` swings it toward `+x`, so the right
  arm takes the positive angle and the left the negative one. Mirroring both
  with `side * -angle` buries the arms in the body.
- Keep the lights neutral. A blue-tinted fill turns white plastic grey-blue;
  only the cyan rim should tint anything.
- Don't gate the rAF loop on `document.visibilityState`. Browsers already stop
  rAF in genuinely hidden tabs, and some embedded browsers report `hidden` while
  visible — which freezes the bot on screen.

Respects `prefers-reduced-motion`, and stops rendering when scrolled off-screen.

## Early-access email — where the keys come from

The form works now, but **no email goes out until these are set**. Without them
the route accepts the signup, logs it, and returns `emailed: false` (the form
says so honestly rather than claiming an email was sent).

### 1. Get the Resend API key

1. Go to **[resend.com](https://resend.com)** → *Sign up* (free tier covers
   3,000 emails/month, plenty for a waitlist).
2. In the sidebar → **API Keys** → **Create API Key**.
   - Name: `shah-dev-production`
   - Permission: **Sending access** (it does not need full access)
3. Copy the key — it starts `re_…`. **It is shown exactly once.** If you lose
   it, delete that key and make a new one.

### 2. Verify the sending domain

Without this, Resend can only send to your own address, and real signups get
nothing.

1. Resend sidebar → **Domains** → **Add Domain** → `shah-dev.com`.
2. Resend shows a set of DNS records (an `MX`, and `TXT` records for SPF and
   DKIM).
3. Add them where `shah-dev.com`'s DNS lives — **Vercel**, since the domain
   already resolves to `vercel-dns`. Vercel dashboard → **Domains** →
   `shah-dev.com` → **DNS Records** → add each one exactly as Resend shows it.
4. Back in Resend, press **Verify**. Usually minutes; DNS can take up to an hour.
   The domain has to read **Verified** before real sending works.

### 3. Put them in Vercel

**Vercel → your project → Settings → Environment Variables.** Never commit these.

| Variable | Value | Required |
| --- | --- | --- |
| `RESEND_API_KEY` | the `re_…` key from step 1 | yes |
| `EARLY_ACCESS_FROM` | `Dwello <hello@shah-dev.com>` — must be on the verified domain | yes |
| `EARLY_ACCESS_NOTIFY` | your own inbox, e.g. `hello.devshah@gmail.com` | recommended |
| `NEXT_PUBLIC_SITE_URL` | `https://shah-dev.com` — only if the origin ever changes | no |

Tick all three environments (Production / Preview / Development), then
**redeploy** — env vars are read at build/run time, so an existing deployment
won't pick them up on its own.

`EARLY_ACCESS_NOTIFY` does double duty: it's the inbox that gets told about each
signup, **and** it's the `reply_to` on the welcome email. The email invites
people to reply, so without it replies go to the no-reply sender and vanish.

### 4. Check it

Submit the form on the live site with your own address. You should get the
welcome email within a few seconds, and a separate `Dwello early access: …`
notification. Resend → **Logs** shows every send and any bounce.

> **Gmail** shows a "via" line until DKIM/SPF are verified — that's step 2 doing
> its job. Some clients block remote images by default, so the banner may not
> appear until the reader allows images. The email reads fine without it.

## The welcome email

Lives in `lib/dwelloEmail.ts` (kept out of the route so it can be rendered
without booting Next):

```bash
npm run email:preview          # writes tmp/email-*.html and .txt
NEXT_PUBLIC_SITE_URL=http://localhost:4310 npm run email:preview   # local images
```

It's written to read like a person wrote it, not a receipt:

- Banner image of the actual 3D Dwello render (`public/dwello/email-banner.png`)
- Greeting uses the **first name only** — "Hi Alex Chen," reads like a form letter
- A paragraph picked from the **room they chose** on the form, so it's clearly
  a reply to *them* and not a broadcast
- An extra block if they ticked "help test the prototype"
- Honest about it being a prototype with a moving timeline
- Invites a reply, and `reply_to` actually routes replies to you
- Plain-text alternative for clients that won't render HTML

To change the per-room lines, edit `ROOM_LINE` in `lib/dwelloEmail.ts`.

The notification email to you *is* the signup record — there's no database. To
swap providers, replace `sendEmail()` in `route.ts`.

The form also has a honeypot field, email validation, and a best-effort per-IP
throttle (5/min, per serverless instance — spam friction, not a real limiter).

## Images

Both are generated from the live 3D render, not drawn by hand — recapture with
the page running if the robot changes.

| File | Used for |
| --- | --- |
| `public/dwello/og.png` | share card, 1200×630 |
| `public/dwello/email-banner.png` | welcome email header, 1200×600 |
| `public/dwello/dwello.png` | transparent cutout, for reuse |

The cutout trick: hide every painted background, then screenshot with
`Emulation.setDefaultBackgroundColorOverride` at alpha 0. The WebGL canvas is
already `alpha: true`, so that yields a real transparent PNG. Feathering an
ellipse over a solid capture instead leaves a visible seam.

## Before launch

- **Configure Resend** (above), or the confirmation email silently never sends.

## Local dev

```bash
npm run dev:next
```

Serves on http://localhost:4310. (`npm run dev` is the Cloudflare/vinext path;
`dev:next` matches what Vercel builds.)
