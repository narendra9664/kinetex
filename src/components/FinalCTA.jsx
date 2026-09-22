import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";

const CTA_IMG =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/50a07bcbb_generated_8c7e6c94.jpg";

export default function FinalCTA() {
  return (
    <section className="relative bg-deep-navy overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={CTA_IMG}
          alt="Athlete in motion"
          fittingType="fill"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/80 to-deep-navy/60" />
      </div>

      <div className="relative container-px max-w-[1400px] mx-auto py-28 md:py-40 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow text-accent-green mb-6 block"
        >
          Keep Moving
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="heading-display text-white text-7xl md:text-9xl"
        >
          KEEP MOVING.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-white/70 text-lg mt-6 max-w-md mx-auto"
        >
          Find support designed around the way you move.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
          href="#featured"
          className="group mt-10 inline-flex items-center gap-2 bg-white text-navy px-9 py-4 text-sm font-semibold tracking-wide hover:bg-accent-green hover:text-white transition-colors duration-300"
        >
          SHOP ALL SUPPORT
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </motion.a>
      </div>
    </section>
  );
}
