import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Image } from "@/components/ui/image";

const EDITORIAL_IMG =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/2e94d653c_generated_d0c5f00b.jpg";

export default function EditorialSection() {
  return (
    <section id="editorial" className="bg-off-white py-24 md:py-32">
      <div className="container-px max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden"
        >
          <Image
            src={EDITORIAL_IMG}
            alt="Athlete moving naturally wearing knee support"
            fittingType="fill"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow text-trust-blue mb-5 block">
            Engineered for Everyday Movement
          </span>
          <h2 className="heading-display text-navy text-5xl md:text-6xl leading-[0.95]">
            Support that works with your body — not against it.
          </h2>
          <p className="mt-8 text-lg text-muted-brand max-w-md leading-relaxed">
            Thoughtfully designed support products made for everyday movement,
            training, recovery and the moments in between. Built around how
            your body actually moves.
          </p>
          <a
            href="#how"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-navy border-b border-navy pb-1 hover:text-trust-blue hover:border-trust-blue transition-colors"
          >
            EXPLORE OUR APPROACH
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
