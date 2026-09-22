import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

const KITCHEN =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/db4c74cc3_1d63a60f-afaa-4d0b-a280-02d9227f84be.png";
const conditions = [
  "Acute & chronic lumbago",
  "Sciatica",
  "Herniated disc",
  "Chronic muscular weakness",
];

export default function UseCases() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container-px max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative aspect-[4/3] overflow-hidden bg-off-white"
        >
          <Image src={KITCHEN} alt="Wearing back brace at the kitchen sink" fittingType="fill" className="h-full w-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="eyebrow text-trust-blue mb-5 block">Everyday Relief</span>
          <h2 className="heading-display text-navy text-5xl md:text-6xl">
            End back pain. Keep moving through your day.
          </h2>
          <p className="text-lg text-muted-brand mt-6 max-w-md leading-relaxed">
            Provide additional spinal support and a healthy healing environment
            for spinal structures — comfortable enough to wear through everyday
            tasks, from the kitchen to the gym.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 max-w-md">
            {conditions.map((c) => (
              <li key={c} className="flex items-center gap-2.5 text-sm text-navy">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
