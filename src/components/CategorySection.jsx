import React from "react";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Lower Back",
    description: "Support for lifting, working, training and everyday movement.",
    image:
      "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/2b3d784e0_generated_418e837b.jpg",
  },
  {
    title: "Knee",
    description: "Stability and compression for active days and recovery.",
    image:
      "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/d66804c2d_generated_c60e55d4.jpg",
  },
  {
    title: "Ankle",
    description: "Lightweight support for movement and recovery.",
    image:
      "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/8e91d887e_generated_3b55511e.jpg",
  },
];

export default function CategorySection() {
  return (
    <section id="categories" className="bg-deep-navy py-24 md:py-32">
      <div className="container-px max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-14"
        >
          <span className="eyebrow text-accent-green mb-5 block">Support, Wherever You Need It</span>
          <h2 className="heading-display text-white text-5xl md:text-6xl">
            Support, wherever you need it.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {categories.map((c, i) => (
            <CategoryCard key={c.title} category={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
