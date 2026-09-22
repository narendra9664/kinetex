import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";

const products = [
  {
    name: "Lower Back Support",
    benefit: "Targeted lumbar support for lifting and long days.",
    rating: 4.9,
    reviews: 1280,
    price: 79,
    tag: "Everyday Support",
    badge: "Best Seller",
    to: "/product/lower-back-support",
    image:
      "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/f228cf143_generated_9fa0ea31.jpg",
  },
  {
    name: "Performance Knee Brace",
    benefit: "Stability and compression for active training days.",
    rating: 4.8,
    reviews: 940,
    price: 89,
    tag: "Performance",
    badge: "Best Seller",
    image:
      "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/9954c4716_generated_09070250.jpg",
  },
  {
    name: "Everyday Ankle Support",
    benefit: "Lightweight support for movement and recovery.",
    rating: 4.7,
    reviews: 612,
    price: 59,
    tag: "Lightweight",
    badge: "Everyday Support",
    image:
      "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/6cf124802_generated_159278fb.jpg",
  },
  {
    name: "Active Knee Compression",
    benefit: "All-day compression for training and recovery.",
    rating: 4.8,
    reviews: 758,
    price: 69,
    tag: "Compression",
    image:
      "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/36faced25_generated_9d179b84.jpg",
  },
];

export default function FeaturedProducts() {
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
              className="heading-display text-navy text-5xl md:text-6xl max-w-xl"
            >
              Find the right support for your movement.
            </motion.h2>
          </div>
          <a
            href="#categories"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-trust-blue transition-colors"
          >
            VIEW ALL SUPPORT
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
