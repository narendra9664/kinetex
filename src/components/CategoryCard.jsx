import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function CategoryCard({ category, index = 0 }) {
  return (
    <motion.a
      href="#featured"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block aspect-[3/4] overflow-hidden bg-deep-navy"
    >
      <Image
        src={category.image}
        alt={category.title}
        fittingType="fill"
        className="h-full w-full object-cover opacity-70 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/40 to-transparent" />

      <div className="absolute inset-0 p-7 flex flex-col justify-end">
        <div className="flex items-start justify-between">
          <span className="eyebrow text-accent-green">0{index + 1}</span>
          <ArrowUpRight
            size={22}
            className="text-white opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          />
        </div>
        <h3 className="heading-display text-white text-4xl md:text-5xl mt-4">
          {category.title}
        </h3>
        <p className="text-white/70 text-sm mt-3 max-w-[16rem] leading-relaxed">
          {category.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-white border-b border-white/40 pb-1 w-fit group-hover:border-accent-green transition-colors">
          SHOP {category.title.toUpperCase()}
        </span>
      </div>
    </motion.a>
  );
}
