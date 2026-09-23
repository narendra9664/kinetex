import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CategoryCard({ category, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/support/${category.slug}`} className="group relative block aspect-[3/4] overflow-hidden bg-deep-navy">
        {/* Plain eager <img>: always visible, with a slow continuous zoom
            (animate-slow-zoom) and an extra zoom on hover from the wrapper. */}
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
          <img
            src={category.image}
            alt={`${category.title} support`}
            loading="eager"
            className="h-full w-full object-cover opacity-80 animate-slow-zoom"
            style={{ animationDelay: `${index * -4}s` }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/40 to-transparent" />

        <div className="absolute inset-0 p-7 flex flex-col justify-end">
          <div className="flex items-start justify-between">
            <span className="eyebrow text-accent-green">0{index + 1}</span>
            <ArrowUpRight size={22} className="text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
          <h3 className="heading-display text-white text-[1.6rem] leading-[1.1] sm:text-4xl md:text-5xl mt-4">{category.title}</h3>
          <p className="text-white/75 text-sm mt-3 max-w-[16rem] leading-relaxed">{category.cardDescription}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-white border-b border-white/40 pb-1 w-fit group-hover:border-accent-green transition-colors">
            WHY IT HURTS & HOW TO HELP
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
