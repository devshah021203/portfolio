/**
 * Dwello early-access welcome email.
 *
 * Kept out of the route handler so the templates can be rendered and eyeballed
 * without booting Next — see `npm run email:preview`.
 */

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/** Absolute base for image URLs — email clients can't resolve relative paths. */
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shah-dev.com";

/**
 * A line about the room they said they'd put Dwello in. It's the difference
 * between a receipt and a reply — it shows a person read the form.
 */
const ROOM_LINE: Record<string, string> = {
  "home-office": "A home office is exactly the setup I'm designing around — desk zone, focus mode, and a nudge when you've been sitting too long.",
  bedroom: "A bedroom is the one where \"no camera, ever\" stops being a spec and starts being the whole point.",
  "living-room": "Living rooms are the hard test — more people, more movement. That's where multi-person tracking has to earn its keep.",
  studio: "A studio or workshop is a great fit. Lights that stay on because you're still in the room, not because you waved at a sensor.",
  lab: "A makerspace is where this gets fun. That's the crowd most likely to push Dwello past whatever I designed for.",
  other: "I'd genuinely like to hear more about the room you have in mind — just hit reply.",
};

export function roomLine(useCase: string) {
  return ROOM_LINE[useCase] ?? ROOM_LINE.other;
}

/** First name only — "Hi Alex Chen," reads like a form letter. */
function firstName(name: string) {
  return name.trim().split(/\s+/)[0] ?? "";
}

export function welcomeEmail(name: string, useCase: string, wantsTesting: boolean) {
  const greeting = name ? `Hi ${escapeHtml(firstName(name))},` : "Hi,";
  const p = "margin:0 0 18px;font-size:15px;line-height:1.7;color:#b3bdcb;";

  const testerBlock = wantsTesting
    ? `<tr><td style="padding:0 34px 4px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:rgba(62,233,255,0.07);border-left:3px solid #3ee9ff;border-radius:0 10px 10px 0;">
              <tr><td style="padding:16px 18px;">
                <p style="margin:0;font-size:14px;line-height:1.65;color:#bfe6f2;">
                  You ticked that you'd like to help test it &mdash; noted, and thank you. You're on the shortlist I'll go to first when there are alpha units to send out.
                </p>
              </td></tr>
            </table>
          </td></tr>`
    : "";

  return `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="dark light" />
    <title>Welcome to Dwello</title>
  </head>
  <body style="margin:0;padding:0;background:#08090c;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <!-- Preview text: what shows in the inbox list before it's opened. -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
      You're on the list. Here's what Dwello is, and what happens next.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#08090c;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#0f1218;border:1px solid #1e2530;border-radius:16px;overflow:hidden;">

          <tr><td style="padding:0;">
            <img src="${SITE}/dwello/email-banner.png"
                 width="560" height="280" alt="Dwello, a small white desk robot with a glowing cyan face"
                 style="display:block;width:100%;max-width:560px;height:auto;border:0;" />
          </td></tr>

          <tr><td style="padding:30px 34px 4px;">
            <h1 style="margin:0 0 20px;font-size:27px;line-height:1.22;color:#f3efe5;font-weight:700;letter-spacing:-0.02em;">
              You're on the list.
            </h1>
            <p style="${p}">${greeting}</p>
            <p style="${p}">
              Thanks for signing up &mdash; genuinely. Dwello is something I'm building in the open, and it means a lot that you want to follow along this early.
            </p>
            <p style="${p}">
              Short version: it's a little desk robot that senses your room with radar instead of a camera. It knows when you walk in, when you leave, and roughly where you are &mdash; and it reacts with a face, a voice, and a nudge now and then. No lens, no video, nothing about your room leaving your room.
            </p>
            <p style="${p}">${roomLine(useCase)}</p>
          </td></tr>

          ${testerBlock}

          <tr><td style="padding:18px 34px 4px;">
            <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#3ee9ff;font-weight:600;">What happens next</p>
            <p style="${p}">
              I'll send build updates as things actually work &mdash; demo clips, the bits that break, and the occasional honest &ldquo;this took three weeks longer than I thought&rdquo;. Not a newsletter. Just progress, when there's progress.
            </p>
            <p style="${p}">
              It is still a prototype, so the design and the timeline will move. I'd rather tell you that now than pretend otherwise.
            </p>
            <p style="${p}">
              If you have a question, an idea, or a room that would break it &mdash; just reply to this email. It comes straight to me and I read every one.
            </p>
          </td></tr>

          <tr><td style="padding:8px 34px 30px;">
            <a href="${SITE}/dwello"
               style="display:inline-block;padding:13px 24px;background:#3ee9ff;border-radius:999px;color:#04121a;font-size:14px;font-weight:700;text-decoration:none;">
              Say hi to Dwello &rarr;
            </a>
          </td></tr>

          <tr><td style="padding:0 34px 30px;">
            <p style="margin:0 0 4px;font-size:15px;line-height:1.6;color:#f3efe5;font-weight:600;">Dev Shah</p>
            <p style="margin:0;font-size:13px;line-height:1.6;color:#7c8698;">Building Dwello &middot; Windsor, Canada</p>
          </td></tr>

          <tr><td style="padding:20px 34px;border-top:1px solid #1e2530;">
            <p style="margin:0;font-size:12px;line-height:1.6;color:#69738a;">
              You're getting this because you joined the Dwello early access list at shah-dev.com.
              Reply with &ldquo;unsubscribe&rdquo; any time and I'll take you straight off.
            </p>
          </td></tr>

        </table>
      </td></tr>
    </table>
  </body>
</html>`.trim();
}

export function welcomeText(name: string, useCase: string, wantsTesting: boolean) {
  return [
    name ? `Hi ${firstName(name)},` : "Hi,",
    "",
    "You're on the Dwello early access list.",
    "",
    "Thanks for signing up - genuinely. Dwello is something I'm building in the open, and it means a lot that you want to follow along this early.",
    "",
    "Short version: it's a little desk robot that senses your room with radar instead of a camera. It knows when you walk in, when you leave, and roughly where you are - and it reacts with a face, a voice, and a nudge now and then. No lens, no video, nothing about your room leaving your room.",
    "",
    roomLine(useCase),
    ...(wantsTesting
      ? ["", "You ticked that you'd like to help test it - noted, and thank you. You're on the shortlist I'll go to first when there are alpha units to send out."]
      : []),
    "",
    "WHAT HAPPENS NEXT",
    "",
    "I'll send build updates as things actually work - demo clips, the bits that break, and the occasional honest 'this took three weeks longer than I thought'. Not a newsletter. Just progress, when there's progress.",
    "",
    "It is still a prototype, so the design and the timeline will move. I'd rather tell you that now than pretend otherwise.",
    "",
    "If you have a question, an idea, or a room that would break it - just reply to this email. It comes straight to me and I read every one.",
    "",
    `See Dwello: ${SITE}/dwello`,
    "",
    "Dev Shah",
    "Building Dwello - Windsor, Canada",
    "",
    "---",
    "You're getting this because you joined the Dwello early access list at shah-dev.com.",
    "Reply with 'unsubscribe' any time and I'll take you straight off.",
  ].join("\n");
}

