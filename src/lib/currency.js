// The Shopify store now transacts in USD, so product prices from the
// Storefront API are already in USD — no conversion, just formatting.

/**
 * Formats a USD amount (string or number) as a price string, e.g. "$119".
 * Whole-dollar prices drop the cents; sub-$10 prices keep two decimals.
 * @param {string|number} amount
 * @returns {string}
 */
export function formatUsd(amount) {
  const n = Number(amount);
  return `$${n.toFixed(n < 10 ? 2 : 0)}`;
}
