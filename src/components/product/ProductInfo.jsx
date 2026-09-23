import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Plus, Minus, ShoppingBag, Truck, PackageCheck, ShieldCheck, Check } from "lucide-react";
import { useCart, toCartItem } from "@/lib/CartContext";
import { formatUsd } from "@/lib/currency";
import { createCheckoutAndRedirect } from "@/lib/shopify";

// Shopify's default single-variant products expose one option named "Title"
// with the single value "Default Title" — nothing for a shopper to choose.
// The Buy SDK wraps each option value as a GraphModel ({ value, type }),
// not a plain string.
function isChoosableOption(option) {
  if (option.values.length <= 1) return false;
  if (option.name === "Title" && option.values[0].value === "Default Title") return false;
  return true;
}

function findMatchingVariant(variants, selectedOptions) {
  return (
    variants.find((variant) =>
      variant.selectedOptions.every((o) => selectedOptions[o.name] === o.value)
    ) || variants[0]
  );
}

export default function ProductInfo({ product, content }) {
  const variants = product.variants;
  const choosableOptions = useMemo(
    () => product.options.filter(isChoosableOption),
    [product.options]
  );

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const initial = {};
    variants[0].selectedOptions.forEach((o) => {
      initial[o.name] = o.value;
    });
    return initial;
  });
  const [qty, setQty] = useState(1);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const { addItem } = useCart();

  // Mobile sticky buy bar: shown once the main buttons scroll out of view.
  const buyRef = useRef(null);
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const onScroll = () => setShowSticky(el.getBoundingClientRect().bottom < 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectedVariant = useMemo(
    () => findMatchingVariant(variants, selectedOptions),
    [variants, selectedOptions]
  );

  const price = selectedVariant.priceV2.amount;
  const compareAtPrice = selectedVariant.compareAtPriceV2?.amount;
  const hasDiscount = compareAtPrice && Number(compareAtPrice) > Number(price);
  const discountPct = hasDiscount
    ? Math.round((1 - Number(price) / Number(compareAtPrice)) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(toCartItem(product, selectedVariant, content.name), qty);
  };

  // Buy Now skips the cart and checks out just this item.
  const handleBuyNow = async () => {
    setLoadingCheckout(true);
    try {
      await createCheckoutAndRedirect([{ variantId: selectedVariant.id, quantity: qty }]);
    } catch (err) {
      console.error(err);
      alert("Could not initialize Shopify checkout. Please try again.");
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="min-w-0 lg:pl-10"
    >
      {content.tag && (
        <span className="eyebrow text-trust-blue">
          {content.tag}
          {content.badge ? ` · ${content.badge}` : ""}
        </span>
      )}
      <h1 className="heading-display text-navy text-3xl sm:text-5xl md:text-6xl mt-3 sm:mt-4 break-words">
        {content.name}
      </h1>

      <div className="flex items-center gap-3 mt-5">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={15}
              className={
                i < Math.round(content.rating)
                  ? "fill-accent-green text-accent-green"
                  : "text-black/15"
              }
            />
          ))}
        </div>
        <span className="text-sm text-muted-brand">
          {content.rating} · {content.reviews.toLocaleString()} reviews
        </span>
      </div>

      <p className="text-lg text-muted-brand mt-6 leading-relaxed max-w-md">
        {content.description}
      </p>

      <div className="flex items-baseline gap-3 mt-7">
        <span className="heading-display text-navy text-4xl">{formatUsd(price)}</span>
        {hasDiscount && (
          <>
            <span className="text-muted-brand line-through">{formatUsd(compareAtPrice)}</span>
            <span className="text-xs font-semibold text-white bg-accent-green px-2.5 py-1">
              SAVE {discountPct}%
            </span>
          </>
        )}
      </div>

      {/* Variant options (size, color, etc.) */}
      {choosableOptions.map((option) => (
        <div key={option.name} className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-navy">
              {option.name}:{" "}
              <span className="text-muted-brand">{selectedOptions[option.name]}</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {option.values.map(({ value }) => (
              <button
                key={value}
                onClick={() =>
                  setSelectedOptions((prev) => ({ ...prev, [option.name]: value }))
                }
                className={`flex items-center justify-center min-w-[3.5rem] h-11 px-4 border text-sm transition-colors ${
                  selectedOptions[option.name] === value
                    ? "border-navy bg-navy text-white"
                    : "border-border text-navy hover:border-navy"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Qty + add */}
      <div ref={buyRef} className="mt-8 space-y-3">
        <div className="flex items-stretch gap-3">
          <div className="flex items-center justify-between border border-border shrink-0">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 text-navy hover:bg-off-white" aria-label="Decrease quantity">
              <Minus size={16} />
            </button>
            <span className="w-10 text-center font-semibold text-navy">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="p-3 text-navy hover:bg-off-white" aria-label="Increase quantity">
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant.available}
            className="group flex-1 min-w-0 inline-flex items-center justify-center gap-2 bg-navy text-white px-4 py-4 text-sm font-semibold tracking-wide hover:bg-accent-green transition-colors duration-300 disabled:opacity-50"
          >
            {!selectedVariant.available ? (
              "OUT OF STOCK"
            ) : (
              <>
                <ShoppingBag size={17} className="shrink-0" />
                <span className="truncate">ADD TO CART</span>
              </>
            )}
          </button>
        </div>
        <button
          onClick={handleBuyNow}
          disabled={loadingCheckout || !selectedVariant.available}
          className="w-full inline-flex items-center justify-center gap-2 bg-accent-green text-navy px-8 py-4 text-sm font-semibold tracking-wide hover:bg-navy hover:text-white transition-colors duration-300 disabled:opacity-50"
        >
          {loadingCheckout ? "CONNECTING…" : "BUY NOW"}
        </button>
      </div>

      {/* Feature bullets */}
      <ul className="mt-8 space-y-2.5">
        {content.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-navy">
            <Check size={16} className="text-accent-green mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {/* Trust bar */}
      <div className="grid grid-cols-3 gap-4 mt-9 pt-7 border-t border-border">
        {[
          { icon: Truck, t: "Free shipping", s: "Orders over $50" },
          { icon: PackageCheck, t: "Damage cover", s: "Replaced or refunded" },
          { icon: ShieldCheck, t: "Secure checkout", s: "Protected" },
        ].map((b) => (
          <div key={b.t} className="flex flex-col items-center text-center">
            <b.icon size={20} strokeWidth={1.5} className="text-navy mb-2" />
            <span className="text-xs font-semibold text-navy">{b.t}</span>
            <span className="text-[11px] text-muted-brand">{b.s}</span>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur border-t border-border px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center gap-3"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-navy truncate">{content.name}</p>
              <p className="text-xs text-muted-brand truncate">
                {formatUsd(price)}
                {choosableOptions.length > 0 && ` · ${choosableOptions.map((o) => selectedOptions[o.name]).join(" / ")}`}
              </p>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant.available}
              className="shrink-0 rounded-full bg-navy text-white px-5 h-12 text-sm font-semibold tracking-wide inline-flex items-center gap-2 disabled:opacity-50"
            >
              <ShoppingBag size={16} />
              {selectedVariant.available ? "ADD TO CART" : "SOLD OUT"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
