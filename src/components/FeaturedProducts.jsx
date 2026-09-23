import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useProducts } from "@/lib/products";

export default function FeaturedProducts() {
  const { data: products = [], isLoading, isError } = useProducts();

  return (
    <section id="featured" className="bg-white py-24 md:py-32">
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow text-trust-blue mb-4 block"
            >
              Featured Support
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="heading-display text-navy text-[1.75rem] leading-[1.05] sm:text-5xl md:text-6xl max-w-xl"
            >
              Find the right support for your movement.
            </motion.h2>
          </div>
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-trust-blue transition-colors"
          >
            VIEW ALL SUPPORT
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-off-white animate-pulse" />
            ))}
          </div>
        )}

        {isError && (
          <p className="text-sm text-muted-brand">
            Couldn't load products from the store right now. Please try again shortly.
          </p>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((p, i) => (
              <ProductCard key={p.to} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
