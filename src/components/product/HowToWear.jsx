import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

const HOW_TO_WEAR =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/ce0023733_Adjustable_Lower_Back_Brace_Lumbar_Support_Waist_Belt_For_Men_Women_Pain_Relief-3jpg.jpeg";

const steps = [
  { n: "01", t: "Open & position", b: "Hold the brace open at your midsection, centered on your lower back." },
  { n: "02", t: "Wrap & secure", b: "Wrap the panels around your waist and secure the main velcro closure snugly." },
  { n: "03", t: "Dial in tension", b: "Use the pulley straps to adjust compression to a comfortable, supportive fit." },
];

export default function HowToWear() {
  return (
    <section className="bg-deep-navy py-24 md:py-32">
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="eyebrow text-accent-green mb-5 block">How To Wear</span>
          <h2 className="heading-display text-white text-5xl md:text-6xl">
            Simple to put on. Easy to adjust.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="aspect-[4/5] overflow-hidden bg-white/5"
          >
            <Image src={HOW_TO_WEAR} alt="How to wear the back brace" fittingType="fit" className="h-full w-full object-contain" />
          </motion.div>

          <div className="space-y-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 pb-8 border-b border-white/10 last:border-0"
              >
                <span className="heading-display text-accent-green/40 text-4xl shrink-0">{s.n}</span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{s.t}</h3>
                  <p className="text-white/60 mt-2 leading-relaxed">{s.b}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
