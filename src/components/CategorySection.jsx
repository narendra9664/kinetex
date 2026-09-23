import React from "react";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";
import { SUPPORT_AREA_LIST } from "@/lib/supportAreas";

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
          <h2 className="heading-display text-white text-[1.75rem] leading-[1.05] sm:text-5xl md:text-6xl">
            Support, wherever you need it.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {SUPPORT_AREA_LIST.map((c, i) => (
            <CategoryCard key={c.slug} category={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
