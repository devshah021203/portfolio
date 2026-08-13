import { NextResponse } from "next/server";
import { welcomeEmail, welcomeText } from "@/lib/dwelloEmail";

/**
 * Dwello early-access signup.
 *
 * Sends two emails through Resend: a welcome auto-reply to the person signing
 * up, and a notification to the Dwello inbox (which doubles as the signup
 * record, so this route needs no database).
 *
 * Required environment variables — set these in Vercel, never in the repo:
 *   RESEND_API_KEY        Resend API key
 *   EARLY_ACCESS_FROM     verified sender, e.g. "Dwello <hello@shah-dev.com>"
 *   EARLY_ACCESS_NOTIFY   inbox that receives the signup notification
 *
 * With no key configured the route still accepts the signup and reports
 * `emailed: false`, so the form is testable locally without credentials.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const USE_CASES = new Set([
  "home-office", "bedroom", "living-room", "studio", "lab", "other",
]);

// Best-effort throttle. Serverless instances are not shared, so this trims
// obvious hammering rather than acting as a real rate limiter.
const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function throttled(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 500) {
    for (const [key, times] of recent) {
      if (times.every((t) => now - t > WINDOW_MS)) recent.delete(key);
    }
  }
  return hits.length > MAX_PER_WINDOW;
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
  return response.json();
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: real people never fill this in.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, emailed: false });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const name = String(body.name ?? "").trim().slice(0, 80);
  const useCase = String(body.useCase ?? "").trim();
  const wantsTesting = body.wantsTesting === true;

  if (!EMAIL_PATTERN.test(email) || email.length > 160) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (throttled(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many signups from this connection. Try again in a minute." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EARLY_ACCESS_FROM;
  const notify = process.env.EARLY_ACCESS_NOTIFY;

  if (!apiKey || !from) {
    // No credentials yet: accept the signup so the form is usable, and make it
    // obvious in the logs that the welcome email did not go out.
    console.warn(
      "[airtrace] early-access signup received but email is not configured:",
      JSON.stringify({ email, name, useCase, wantsTesting }),
    );
    return NextResponse.json({ ok: true, emailed: false });
  }

  // Only trust a use case we actually offer — it selects an email paragraph.
  const room = USE_CASES.has(useCase) ? useCase : "other";

  try {
    await sendEmail(apiKey, {
      from,
      to: [email],
      // Replies land in Dev's inbox, not the no-reply sender, because the
      // email explicitly invites people to reply.
      reply_to: notify ?? undefined,
      subject: name ? `${name.split(" ")[0]}, you're on the Dwello list` : "You're on the Dwello list",
      html: welcomeEmail(name, room, wantsTesting),
      text: welcomeText(name, room, wantsTesting),
    });

    if (notify) {
      // Fire-and-forget: a failed notification must not fail the signup.
      sendEmail(apiKey, {
        from,
        to: [notify],
        reply_to: email,
        subject: `Dwello early access: ${email}`,
        text: [
          `Email: ${email}`,
          `Name: ${name || "-"}`,
          `Use case: ${useCase && USE_CASES.has(useCase) ? useCase : "-"}`,
          `Wants prototype testing: ${wantsTesting ? "yes" : "no"}`,
          `IP: ${ip}`,
          `Time: ${new Date().toISOString()}`,
        ].join("\n"),
      }).catch((error) => {
        console.error("[airtrace] notification email failed:", error);
      });
    }

    return NextResponse.json({ ok: true, emailed: true });
  } catch (error) {
    console.error("[airtrace] welcome email failed:", error);
    return NextResponse.json(
      { ok: false, error: "We couldn't send the confirmation email. Please try again." },
      { status: 502 },
    );
  }
}
