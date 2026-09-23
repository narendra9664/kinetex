import React from "react";
import { motion } from "framer-motion";
import { Compass, Ruler, Activity } from "lucide-react";

const steps = [
  {
    icon: Compass,
    num: "01",
    title: "Choose Your Support",
    body: "Find the brace designed around your needs — back, knee or ankle.",
  },
  {
    icon: Ruler,
    num: "02",
    title: "Get the Right Fit",
    body: "Simple sizing guidance helps you find a comfortable, secure fit.",
  },
  {
    icon: Activity,
    num: "03",
    title: "Move with Confidence",
    body: "Designed for everyday movement, training and recovery.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-white py-24 md:py-32">
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="eyebrow text-trust-blue mb-5 block">How It Works</span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="heading-display text-navy text-[1.75rem] leading-[1.05] sm:text-5xl md:text-6xl"
          >
            Three steps to moving with confidence.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white p-8 md:p-10 group"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="heading-display text-navy/15 text-4xl sm:text-5xl group-hover:text-accent-green/40 transition-colors">
                  {s.num}
                </span>
                <s.icon size={28} strokeWidth={1.5} className="text-navy" />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-3">{s.title}</h3>
              <p className="text-muted-brand leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
