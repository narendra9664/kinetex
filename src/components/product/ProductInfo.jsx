import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, Plus, Minus, ShoppingBag, Truck, RefreshCw, ShieldCheck, Check } from "lucide-react";

const CLEAN_PRODUCT =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/f228cf143_generated_9fa0ea31.jpg";

const features = [
  "4 memory ABS resin stays + side spring support",
  "Easy-tightening pulley system for maximum stability",
  "Double compression — 360° wrap, even pressure",
  "Breathable mesh with skin-friendly flannel lining",
];

export default function ProductInfo({ images, onPick }) {
  const [size, setSize] = useState("L");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variantMap = {
    M: "gid://shopify/ProductVariant/45802319249658",
    L: "gid://shopify/ProductVariant/45802319282426",
    XL: "gid://shopify/ProductVariant/45802319315194",
  };

  const sizes = [
    { s: "M", inch: "23.62–35.43", cm: "60–90" },
    { s: "L", inch: "35.43–39.37", cm: "90–100" },
    { s: "XL", inch: "39.37–47.24", cm: "100–120" },
  ];

  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const handleCheckout = async () => {
    setLoadingCheckout(true);
    try {
      const { createCheckoutAndRedirect } = await import("@/lib/shopify");
      const variantId = variantMap[size] || variantMap["L"];
      await createCheckoutAndRedirect([{ variantId, quantity: qty }]);
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
      className="lg:pl-10"
    >
      <span className="eyebrow text-trust-blue">Everyday Support · Best Seller</span>
      <h1 className="heading-display text-navy text-5xl md:text-6xl mt-4">
        Lower Back Support
      </h1>

      <div className="flex items-center gap-3 mt-5">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={15} className="fill-accent-green text-accent-green" />
          ))}
        </div>
        <span className="text-sm text-muted-brand">4.9 · 1,280 reviews</span>
      </div>

      <p className="text-lg text-muted-brand mt-6 leading-relaxed max-w-md">
        Targeted lumbar support for lifting, long days and active recovery.
        Engineered to fit the waist curve with comfortable, 360° protection.
      </p>

      <div className="flex items-baseline gap-3 mt-7">
        <span className="heading-display text-navy text-4xl">$79</span>
        <span className="text-muted-brand line-through">$95</span>
        <span className="text-xs font-semibold text-white bg-accent-green px-2.5 py-1">
          SAVE 17%
        </span>
      </div>

      {/* Size */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-navy">
            Size: <span className="text-muted-brand">{size}</span>
          </span>
          <a href="#sizing" className="text-xs font-semibold text-trust-blue hover:underline">
            SIZE GUIDE
          </a>
        </div>
        <div className="flex gap-3">
          {sizes.map((o) => (
            <button
              key={o.s}
              onClick={() => setSize(o.s)}
              className={`flex flex-col items-center justify-center w-20 h-20 border text-sm transition-colors ${
                size === o.s
                  ? "border-navy bg-navy text-white"
                  : "border-border text-navy hover:border-navy"
              }`}
            >
              <span className="font-bold text-base">{o.s}</span>
              <span className={`text-[10px] ${size === o.s ? "text-white/70" : "text-muted-brand"}`}>
                {o.inch}"
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Qty + add */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
        <div className="flex items-center justify-between border border-border">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 text-navy hover:bg-off-white" aria-label="Decrease">
            <Minus size={16} />
          </button>
          <span className="w-12 text-center font-semibold text-navy">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="p-3 text-navy hover:bg-off-white" aria-label="Increase">
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={handleCheckout}
          disabled={loadingCheckout}
          className="group flex-1 inline-flex items-center justify-center gap-2 bg-navy text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-accent-green transition-colors duration-300"
        >
          {loadingCheckout ? (
            "CONNECTING TO SHOPIFY..."
          ) : (
            <>
              <ShoppingBag size={17} /> ADD TO CART
            </>
          )}
        </button>
        <button
          onClick={handleCheckout}
          disabled={loadingCheckout}
          className="inline-flex items-center justify-center gap-2 bg-accent-green text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-navy transition-colors duration-300"
        >
          BUY NOW WITH SHOPIFY
        </button>
      </div>

      {/* Feature bullets */}
      <ul className="mt-8 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-navy">
            <Check size={16} className="text-accent-green mt-0.5 shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {/* Trust bar */}
      <div className="grid grid-cols-3 gap-4 mt-9 pt-7 border-t border-border">
        {[
          { icon: Truck, t: "Free shipping", s: "On orders over $50" },
          { icon: RefreshCw, t: "30-day returns", s: "Hassle-free" },
          { icon: ShieldCheck, t: "Secure checkout", s: "Protected" },
        ].map((b) => (
          <div key={b.t} className="flex flex-col items-center text-center">
            <b.icon size={20} strokeWidth={1.5} className="text-navy mb-2" />
            <span className="text-xs font-semibold text-navy">{b.t}</span>
            <span className="text-[11px] text-muted-brand">{b.s}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
