import { LEAD_ENDPOINT } from "@/lib/siteConfig";

const SUBMITTED_KEY = "motionpluse_lead_submitted";
const PENDING_KEY = "motionpluse_pending_leads";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readPending() {
  try {
    return JSON.parse(localStorage.getItem(PENDING_KEY) || "[]");
  } catch {
    return [];
  }
}

function writePending(list) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(list.slice(-20)));
  } catch {
    // storage unavailable
  }
}

async function post(lead) {
  const res = await fetch(LEAD_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  return res;
}

/**
 * Sends a captured lead to the Netlify function, which relays it to Slack.
 * Only an invalid email rejects. If the relay is unreachable or failing, the
 * lead is queued in localStorage and retried on the next page load, so the
 * visitor still gets their download / confirmation.
 * @param {{ name?: string, email: string, phone?: string, source: string, website?: string }} lead
 *   `website` is the honeypot field — real users leave it empty.
 */
export async function submitLead(lead) {
  if (!EMAIL_RE.test(String(lead.email || "").trim())) {
    throw new Error("Please enter a valid email address.");
  }
  const payload = { ...lead, page: window.location.href };
  try {
    const res = await post(payload);
    if (res.status === 400) {
      const { error } = await res.json().catch(() => ({}));
      throw new Error(error || "Please check your details and try again.");
    }
    if (!res.ok) throw Object.assign(new Error("relay failed"), { retry: true });
  } catch (err) {
    if (!err.retry && !(err instanceof TypeError)) throw err; // validation error
    console.warn("[lead] relay unavailable, queued for retry", err);
    writePending([...readPending(), payload]);
  }
  try {
    localStorage.setItem(SUBMITTED_KEY, "1");
  } catch {
    // storage unavailable (private mode) — only affects popup suppression
  }
}

/** Re-sends leads that failed earlier. Call once on app start. */
export async function retryPendingLeads() {
  const pending = readPending();
  if (pending.length === 0) return;
  const stillPending = [];
  for (const lead of pending) {
    try {
      const res = await post(lead);
      if (!res.ok && res.status !== 400) stillPending.push(lead);
    } catch {
      stillPending.push(lead);
    }
  }
  writePending(stillPending);
}

/** True once this browser has submitted any lead form. */
export function hasSubmittedLead() {
  try {
    return localStorage.getItem(SUBMITTED_KEY) === "1";
  } catch {
    return false;
  }
}
