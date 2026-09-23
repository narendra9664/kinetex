import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

const HERO_IMG =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/39e027980_generated_33017713.jpg";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] bg-deep-navy overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMG}
          alt="Athlete in motion wearing lower back support"
          fittingType="fill"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-navy via-deep-navy/70 to-deep-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-transparent to-deep-navy/30" />
      </div>

      {/* Content */}
      <div className="relative container-px max-w-[1400px] mx-auto min-h-[100svh] flex flex-col justify-between pt-32 pb-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl mt-10 md:mt-20"
        >
          <motion.div variants={item} className="flex items-center gap-3 mb-8">
            <span className="eyebrow text-accent-green">Engineered Support</span>
            <span className="h-px w-10 bg-white/30" />
            <span className="eyebrow text-white/60">For Every Body</span>
          </motion.div>

          <h1 className="heading-display text-white text-[15vw] sm:text-[13vw] lg:text-[10.5rem] leading-[0.85]">
            <motion.span variants={item} className="block">
              STRENGTH
            </motion.span>
            <motion.span variants={item} className="block pl-[2.5rem] sm:pl-[6rem]">
              IN
            </motion.span>
            <motion.span variants={item} className="block text-accent-green">
              MOTION.
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="mt-8 text-white/80 text-lg md:text-xl max-w-xl leading-relaxed"
          >
            Engineered support for the path ahead — comfortable where you need it,
            so you keep moving with confidence.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 bg-white text-navy px-8 py-4 text-sm font-semibold tracking-wide hover:bg-accent-green transition-colors duration-300"
            >
              SHOP SUPPORT
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#categories"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-white/10 transition-colors duration-300"
            >
              FIND YOUR BRACE
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
