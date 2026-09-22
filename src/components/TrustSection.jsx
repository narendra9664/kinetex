import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const stats = [
  { value: "4.8/5", label: "Average rating" },
  { value: "10,000+", label: "Customers" },
  { value: "30-day", label: "Returns" },
];

export default function TrustSection() {
  return (
    <section className="bg-white py-24 md:py-32 border-t border-border">
      <div className="container-px max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="eyebrow text-trust-blue mb-5 block">Trusted by Active People</span>
          <h2 className="heading-display text-navy text-5xl md:text-6xl">
            Made for movement. Chosen for everyday life.
          </h2>

          <div className="flex items-center justify-center gap-1.5 mt-10 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={26} className="fill-accent-green text-accent-green" />
            ))}
          </div>

          <blockquote className="text-2xl md:text-3xl text-navy font-medium leading-snug max-w-2xl mx-auto">
            “Comfortable enough for everyday wear and supportive enough for my
            active routine.”
          </blockquote>
          <p className="text-sm text-muted-brand mt-4">— Verified customer</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 mt-16 max-w-3xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center border-l border-border first:border-l-0 px-4"
            >
              <div className="heading-display text-navy text-4xl md:text-5xl">{s.value}</div>
              <div className="text-sm text-muted-brand mt-2">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
