import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

const CLEAN_PRODUCT =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/f228cf143_generated_9fa0ea31.jpg";

export default function ProductGallery({ images = [] }) {
  const thumbs = [CLEAN_PRODUCT, ...images];
  const [active, setActive] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col-reverse md:flex-row gap-4"
    >
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 md:max-h-[600px] overflow-x-auto md:overflow-y-auto no-scrollbar">
        {thumbs.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`shrink-0 w-20 h-20 md:w-[88px] md:h-[88px] bg-off-white border overflow-hidden transition-colors ${
              active === i ? "border-navy" : "border-border hover:border-navy/40"
            }`}
          >
            <Image src={src} alt={`View ${i + 1}`} fittingType="fit" className="h-full w-full object-contain p-1.5" />
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 bg-off-white aspect-[4/5] overflow-hidden">
        <Image
          src={thumbs[active]}
          alt="Lower Back Support"
          fittingType="fit"
          className="h-full w-full object-contain p-8"
        />
      </div>
    </motion.div>
  );
}
