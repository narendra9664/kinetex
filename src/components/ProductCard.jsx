import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Plus } from "lucide-react";
import { Image } from "@/components/ui/image";
import { useCart, toCartItem } from "@/lib/CartContext";
import { formatUsd } from "@/lib/currency";

export default function ProductCard({ product, index = 0 }) {
  const Wrapper = product.to ? Link : "div";
  const { addItem } = useCart();
  const navigate = useNavigate();

  const quickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const sp = product.shopifyProduct;
    // Size/colour must be chosen on the product page.
    if (!sp || product.hasOptions) {
      navigate(product.to);
      return;
    }
    addItem(toCartItem(sp, sp.variants[0], product.name));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      <Wrapper to={product.to} className="block flex flex-col flex-1">
      <div className="relative overflow-hidden bg-off-white aspect-[4/5]">
        <Image
          src={product.image}
          alt={product.name}
          fittingType="fit"
          className="h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 eyebrow text-[10px] bg-navy text-white px-3 py-1.5">
            {product.badge}
          </span>
        )}
        <button
          onClick={quickAdd}
          aria-label={product.hasOptions ? `Choose options for ${product.name}` : `Add ${product.name} to cart`}
          title={product.hasOptions ? "Choose options" : "Add to cart"}
          className="absolute bottom-4 right-4 h-11 w-11 bg-navy text-white flex items-center justify-center lg:opacity-0 lg:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-trust-blue"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="pt-5 flex flex-col">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.round(product.rating)
                    ? "fill-accent-green text-accent-green"
                    : "text-black/15"
                }
              />
            ))}
          </div>
          <span className="text-xs text-muted-brand">({product.reviews})</span>
        </div>
        <h3 className="text-lg font-semibold text-navy leading-snug">{product.name}</h3>
        <p className="text-sm text-muted-brand mt-1">{product.benefit}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-navy">{formatUsd(product.price)}</span>
          <span className="text-xs text-muted-brand uppercase tracking-wider">
            {product.tag}
          </span>
        </div>
      </div>
      </Wrapper>
    </motion.div>
  );
}
