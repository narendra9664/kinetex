import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/CartContext";
import { formatUsd } from "@/lib/currency";

const FREE_SHIPPING_AT = 50;

export default function CartDrawer() {
  const { lines, count, subtotal, isOpen, closeCart, updateQuantity, removeItem, checkout, checkingOut } = useCart();
  const gap = Math.max(0, FREE_SHIPPING_AT - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-deep-navy/50 backdrop-blur-sm" onClick={closeCart} />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <h2 className="heading-display text-2xl text-navy">Your cart ({count})</h2>
              <button onClick={closeCart} aria-label="Close cart" className="h-9 w-9 rounded-full border border-border flex items-center justify-center text-navy hover:bg-off-white">
                <X size={16} />
              </button>
            </div>

            {lines.length > 0 && (
              <div className="px-6 py-3 border-b border-border">
                <p className="text-xs text-muted-brand mb-2">
                  {gap > 0 ? (
                    <>Add <strong className="text-navy">{formatUsd(gap)}</strong> more for free shipping</>
                  ) : (
                    <strong className="text-navy">✓ Free shipping unlocked</strong>
                  )}
                </p>
                <div className="h-1.5 bg-off-white rounded-full overflow-hidden">
                  <div className="h-full bg-accent-green rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {lines.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <ShoppingBag size={36} strokeWidth={1.25} className="text-muted-brand" />
                  <p className="text-muted-brand">Your cart is empty.</p>
                  <Link to="/shop" onClick={closeCart} className="bg-navy text-white text-sm font-semibold px-6 py-3 hover:bg-trust-blue transition-colors">
                    SHOP ALL PRODUCTS
                  </Link>
                </div>
              ) : (
                lines.map((l) => (
                  <div key={l.variantId} className="flex gap-4 border-b border-border pb-4">
                    <Link to={`/products/${l.handle}`} onClick={closeCart} className="h-20 w-20 shrink-0 bg-off-white overflow-hidden">
                      {l.image && <img src={l.image} alt={l.name} className="h-full w-full object-contain p-1.5" />}
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-navy leading-snug line-clamp-2">{l.name}</p>
                          {l.variantTitle && <p className="text-xs text-muted-brand mt-0.5">{l.variantTitle}</p>}
                        </div>
                        <button onClick={() => removeItem(l.variantId)} aria-label={`Remove ${l.name}`} className="text-muted-brand hover:text-destructive shrink-0">
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-border">
                          <button onClick={() => updateQuantity(l.variantId, l.quantity - 1)} aria-label="Decrease quantity" className="p-2 text-navy hover:bg-off-white">
                            <Minus size={13} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold text-navy">{l.quantity}</span>
                          <button onClick={() => updateQuantity(l.variantId, l.quantity + 1)} aria-label="Increase quantity" className="p-2 text-navy hover:bg-off-white">
                            <Plus size={13} />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-navy">{formatUsd(l.price * l.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {lines.length > 0 && (
              <div className="px-6 py-5 border-t border-border space-y-3">
                <div className="flex justify-between text-navy">
                  <span className="text-muted-brand">Subtotal</span>
                  <span className="font-semibold">{formatUsd(subtotal)}</span>
                </div>
                <button
                  onClick={checkout}
                  disabled={checkingOut}
                  className="group w-full inline-flex items-center justify-center gap-2 bg-navy text-white py-4 text-sm font-semibold tracking-wide hover:bg-trust-blue transition-colors disabled:opacity-60"
                >
                  {checkingOut ? "CONNECTING…" : "CHECKOUT"}
                  {!checkingOut && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>
                <p className="text-[11px] text-muted-brand text-center">Shipping and taxes calculated at checkout</p>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
