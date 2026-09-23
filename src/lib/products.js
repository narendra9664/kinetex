import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/lib/shopify";
import { getProductContent } from "@/lib/productContent";

/** Shopify product → the flat shape ProductCard renders. */
export function toCardProduct(shopifyProduct) {
  const content = getProductContent(shopifyProduct);
  const firstVariant = shopifyProduct.variants?.[0];
  return {
    handle: shopifyProduct.handle,
    name: content.name,
    benefit: content.benefit,
    rating: content.rating,
    reviews: content.reviews,
    price: Number(firstVariant?.priceV2?.amount ?? 0),
    tag: content.tag,
    badge: content.badge,
    to: `/products/${shopifyProduct.handle}`,
    image: shopifyProduct.images?.[0]?.src,
    // Kept for quick-add: products with one variant can go straight to the cart.
    shopifyProduct,
    hasOptions: (shopifyProduct.variants?.length ?? 0) > 1,
  };
}

/** All store products as card products (shared cache across pages). */
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => (await fetchAllProducts()).map(toCardProduct),
  });
}
