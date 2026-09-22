import Client from 'shopify-buy';

// Initialize the Shopify Storefront Client
export const shopifyClient = Client.buildClient({
  domain: 'mucwig-ua.myshopify.com',
  storefrontAccessToken: 'f9b6ec7e0e6e96b899b03f0303d2c632',
});

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
