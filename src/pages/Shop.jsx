import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/lib/products";

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  "price-asc": { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a, b) => b.price - a.price },
  rating: { label: "Top rated", fn: (a, b) => b.rating - a.rating },
};

export default function Shop() {
  const { data: products = [], isLoading, isError } = useProducts();
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const categories = useMemo(() => ["All", ...new Set(products.map((p) => p.tag))], [products]);
  const visible = useMemo(
    () => products.filter((p) => category === "All" || p.tag === category).sort(SORTS[sort].fn),
    [products, category, sort]
  );

  return (
    <div className="bg-white">
      <Navbar solid />
      <section className="pt-36 pb-12 md:pt-44 bg-off-white">
        <div className="container-px max-w-[1400px] mx-auto">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="eyebrow text-trust-blue mb-4 block">
            Shop all
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="heading-display text-navy text-[1.9rem] leading-[1.05] sm:text-5xl md:text-7xl max-w-3xl"
          >
            Support and recovery, all in one place.
          </motion.h1>
          <p className="text-muted-brand text-lg mt-5 max-w-xl">
            Every MotionPluse product is designed to keep you moving, from the office chair to the gym floor.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-px max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-border">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                    category === c ? "bg-navy border-navy text-white" : "border-border text-navy hover:border-navy"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-brand">{visible.length} products</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-border px-3 py-2 text-navy bg-white"
                aria-label="Sort products"
              >
                {Object.entries(SORTS).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </div>
          </div>

          {isLoading && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {[...Array(4)].map((_, i) => <div key={i} className="aspect-[4/5] bg-off-white animate-pulse" />)}
            </div>
          )}
          {isError && <p className="text-muted-brand">Couldn't load products right now. Please try again shortly.</p>}
          {!isLoading && !isError && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
              {visible.map((p, i) => <ProductCard key={p.handle} product={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
