import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { createCheckoutAndRedirect } from "@/lib/shopify";

const STORAGE_KEY = "motionpluse_cart_v1";
const CartContext = createContext(null);

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Client-side cart. Lines are keyed by Shopify variant id and persisted to
 * localStorage; a Shopify checkout is only created when the shopper clicks
 * Checkout, so browsing never creates abandoned checkouts.
 * Line shape: { variantId, handle, name, variantTitle, price, image, quantity }
 */
export function CartProvider({ children }) {
  const [lines, setLines] = useState(loadCart);
  const [isOpen, setIsOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage unavailable — cart still works for this page view
    }
  }, [lines]);

  const addItem = useCallback((item, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.variantId === item.variantId);
      if (existing) {
        return prev.map((l) => (l.variantId === item.variantId ? { ...l, quantity: l.quantity + quantity } : l));
      }
      return [...prev, { ...item, quantity }];
    });
    setIsOpen(true);
    toast.success(`${item.name} added to your cart`);
  }, []);

  const updateQuantity = useCallback((variantId, quantity) => {
    setLines((prev) =>
      quantity <= 0 ? prev.filter((l) => l.variantId !== variantId) : prev.map((l) => (l.variantId === variantId ? { ...l, quantity } : l))
    );
  }, []);

  const removeItem = useCallback((variantId) => {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const checkout = useCallback(async () => {
    if (lines.length === 0) return;
    setCheckingOut(true);
    try {
      await createCheckoutAndRedirect(lines.map((l) => ({ variantId: l.variantId, quantity: l.quantity })));
    } catch {
      toast.error("Could not start checkout. Please try again.");
      setCheckingOut(false);
    }
  }, [lines]);

  const value = useMemo(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + Number(l.price) * l.quantity, 0),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateQuantity,
      removeItem,
      checkout,
      checkingOut,
    }),
    [lines, isOpen, addItem, updateQuantity, removeItem, checkout, checkingOut]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

/** Builds a cart line from a Shopify Buy SDK product + variant. */
export function toCartItem(product, variant, displayName) {
  return {
    variantId: variant.id,
    handle: product.handle,
    name: displayName || product.title,
    variantTitle: variant.title === "Default Title" ? "" : variant.title,
    price: Number(variant.priceV2?.amount ?? variant.price?.amount ?? 0),
    image: variant.image?.src || product.images?.[0]?.src || "",
  };
}
