// The same React bundle runs in two places:
//   1. the Netlify site, where /public files and /.netlify/functions are same-origin;
//   2. the Shopify theme, which only serves the JS/CSS bundle. There, files and
//      the lead relay live on the Netlify site. layout/theme.liquid can override
//      the URL via window.MOTIONPLUSE_CONFIG.siteUrl (theme setting).
const NETLIFY_SITE = "https://kinetix-shopify-store-preview.netlify.app";

const runtime = (typeof window !== "undefined" && window.MOTIONPLUSE_CONFIG) || {};

function defaultSiteUrl() {
  if (typeof window === "undefined") return "";
  const host = window.location.hostname;
  // Same-origin when we ARE the Netlify site (or local dev); otherwise use Netlify.
  if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".netlify.app")) return "";
  return NETLIFY_SITE;
}

export const SITE_URL = (runtime.siteUrl || import.meta.env.VITE_SITE_URL || defaultSiteUrl()).replace(/\/$/, "");

/** Absolute URL for a file in /public, e.g. publicUrl("/guide/cover.jpg"). */
export function publicUrl(path) {
  return `${SITE_URL}${path}`;
}

export const LEAD_ENDPOINT = publicUrl("/.netlify/functions/lead");

export const GUIDE_PDF_URL =
  runtime.guidePdfUrl || publicUrl("/guide/motionpluse-pain-free-workday-blueprint.pdf");
