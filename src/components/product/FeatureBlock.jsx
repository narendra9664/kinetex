import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

/**
 * Reusable alternating image / text feature block.
 * image on left when flip=false, right when flip=true.
 */
export default function FeatureBlock({ eyebrow, title, body, image, alt, flip = false, index = 0 }) {
  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: flip ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`relative aspect-[4/3] overflow-hidden bg-off-white ${flip ? "lg:order-2" : ""}`}
      >
        <Image src={image} alt={alt} fittingType="fill" className="h-full w-full object-cover" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: flip ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={flip ? "lg:order-1" : ""}
      >
        <span className="eyebrow text-trust-blue mb-5 block">
          {eyebrow} · 0{index + 1}
        </span>
        <h3 className="heading-display text-navy text-4xl md:text-5xl leading-[0.98]">{title}</h3>
        {body && <p className="text-lg text-muted-brand mt-6 max-w-md leading-relaxed">{body}</p>}
      </motion.div>
    </div>
  );
}
