import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const guides = [
  {
    title: "Lower Back Pain",
    body: "Understanding when back support may be useful and what to look for.",
  },
  {
    title: "Knee Support",
    body: "What to consider when choosing knee support for activity and recovery.",
  },
  {
    title: "Ankle Support",
    body: "Finding comfortable support for everyday movement and stability.",
  },
];

export default function EducationalSection() {
  return (
    <section className="bg-off-white py-24 md:py-32">
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <span className="eyebrow text-trust-blue mb-5 block">Support Guide</span>
            <h2 className="heading-display text-navy text-[1.75rem] leading-[1.05] sm:text-5xl md:text-6xl">
              Not sure which brace you need?
            </h2>
          </div>
          <p className="text-muted-brand max-w-sm">
            Clear, evidence-conscious guidance to help you choose — no pressure,
            no hype.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {guides.map((g, i) => (
            <motion.a
              href="#how"
              key={g.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group bg-white p-8 border border-border hover:border-navy transition-colors duration-300 flex flex-col"
            >
              <span className="eyebrow text-accent-green mb-6">0{i + 1}</span>
              <h3 className="text-2xl font-semibold text-navy">{g.title}</h3>
              <p className="text-muted-brand mt-3 flex-1 leading-relaxed">{g.body}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-trust-blue transition-colors">
                READ THE GUIDE
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
