// Receives lead-form submissions from the storefront (Netlify site and the
// Shopify theme) and posts them to a Slack channel via an Incoming Webhook.
//
// Required env var (Netlify → Site configuration → Environment variables):
//   SLACK_WEBHOOK_URL   https://hooks.slack.com/services/...
// Optional:
//   ALLOWED_ORIGINS     comma-separated origins allowed to call this function,
//                       e.g. "https://mucwig-ua.myshopify.com,https://motionpluse.com".
//                       Defaults to allowing any origin.

const SOURCE_LABELS = {
  "guide-download": "Free guide download",
  "keep-moving-popup": "Keep Moving pop-up",
  "keep-moving-inline": "Keep Moving email form",
  footer: "Footer newsletter",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function corsHeaders(origin) {
  const allowed = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((o) => o.trim())
    .filter(Boolean);
  const allowOrigin = allowed.length === 0 ? "*" : allowed.includes(origin) ? origin : allowed[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

const clean = (v, max) => String(v ?? "").trim().slice(0, max);

export default async (req) => {
  const headers = { ...corsHeaders(req.headers.get("origin")), "Content-Type": "application/json" };
  const reply = (status, body) => new Response(JSON.stringify(body), { status, headers });

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (req.method !== "POST") return reply(405, { error: "Method not allowed" });

  let data;
  try {
    data = await req.json();
  } catch {
    return reply(400, { error: "Invalid request" });
  }

  // Honeypot: bots fill every field. Pretend success so they don't retry.
  if (data.website) return reply(200, { ok: true });

  const lead = {
    name: clean(data.name, 100),
    email: clean(data.email, 200).toLowerCase(),
    phone: clean(data.phone, 40),
    source: clean(data.source, 60),
    page: clean(data.page, 500),
  };
  if (!EMAIL_RE.test(lead.email)) return reply(400, { error: "Please enter a valid email address." });

  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    console.error("SLACK_WEBHOOK_URL is not set");
    return reply(500, { error: "Sign-up is temporarily unavailable. Please try again later." });
  }

  const sourceLabel = SOURCE_LABELS[lead.source] || lead.source || "Website";
  const field = (label, value) => ({ type: "mrkdwn", text: `*${label}*\n${value || "—"}` });
  const slackRes = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: `New lead: ${lead.name || lead.email} (${sourceLabel})`,
      blocks: [
        { type: "header", text: { type: "plain_text", text: "🟢 New MotionPluse lead" } },
        {
          type: "section",
          fields: [
            field("Name", lead.name),
            field("Email", lead.email),
            field("Phone", lead.phone),
            field("Source", sourceLabel),
          ],
        },
        {
          type: "context",
          elements: [{ type: "mrkdwn", text: `${lead.page || "unknown page"} · ${new Date().toISOString()}` }],
        },
      ],
    }),
  });

  if (!slackRes.ok) {
    console.error("Slack webhook failed", slackRes.status, await slackRes.text());
    return reply(502, { error: "Could not save your details. Please try again." });
  }
  return reply(200, { ok: true });
};
