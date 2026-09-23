import Client from 'shopify-buy';

// Initialize the Shopify Storefront Client
export const shopifyClient = Client.buildClient({
  domain: 'mucwig-ua.myshopify.com',
  storefrontAccessToken: 'd9fc8b9fa3b165f1be870f8add5558e1',
});

/**
 * Fetches every active product from the connected Shopify store via the
 * Storefront API.
 * @returns {Promise<Array>} Shopify Buy SDK product GraphModels.
 */
export async function fetchAllProducts() {
  return shopifyClient.product.fetchAll();
}

/**
 * Fetches a single product by its handle (the slug used in /product/:handle).
 * @param {string} handle
 * @returns {Promise<Object|null>}
 */
export async function fetchProductByHandle(handle) {
  const product = await shopifyClient.product.fetchByHandle(handle);
  return product || null;
}

/**
 * Helper function to create a checkout session in Shopify and redirect the customer.
 * @param {Array<{ variantId: string, quantity: number }>} lineItems
 */
export async function createCheckoutAndRedirect(lineItems) {
  try {
    const checkout = await shopifyClient.checkout.create();
    if (lineItems && lineItems.length > 0) {
      const checkoutWithItems = await shopifyClient.checkout.addLineItems(checkout.id, lineItems);
      if (checkoutWithItems.webUrl) {
        window.location.href = checkoutWithItems.webUrl;
        return;
      }
    }
    if (checkout.webUrl) {
      window.location.href = checkout.webUrl;
    }
  } catch (error) {
    console.error('Error creating Shopify checkout:', error);
    throw error;
  }
}
