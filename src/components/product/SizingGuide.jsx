import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";

const SIZING_IMG =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/7e3af047f_5bf85258-c55b-4130-9e90-ea05cee53c51.png";

const rows = [
  { size: "M", inch: "23.62–35.43", cm: "60–90" },
  { size: "L", inch: "35.43–39.37", cm: "90–100" },
  { size: "XL", inch: "39.37–47.24", cm: "100–120" },
];

export default function SizingGuide() {
  const [hover, setHover] = useState(null);

  return (
    <section id="sizing" className="bg-off-white py-24 md:py-32">
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="eyebrow text-trust-blue mb-5 block">Sizing Guide</span>
          <h2 className="heading-display text-navy text-5xl md:text-6xl">Choose your size.</h2>
          <p className="text-muted-brand mt-4 max-w-md">
            Please measure your waist at the level of your navel — not your pants size.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border border-border"
          >
            <div className="grid grid-cols-3 bg-navy text-white text-xs font-semibold uppercase tracking-wider">
              <span className="p-4">Size</span>
              <span className="p-4 border-l border-white/15">Waist (inch)</span>
              <span className="p-4 border-l border-white/15">Waist (cm)</span>
            </div>
            {rows.map((r, i) => (
              <div
                key={r.size}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={`grid grid-cols-3 text-sm transition-colors ${
                  hover === i ? "bg-light-blue" : "bg-white"
                } border-t border-border`}
              >
                <span className="p-4 font-bold text-navy">{r.size}</span>
                <span className="p-4 border-l border-border text-navy">{r.inch}</span>
                <span className="p-4 border-l border-border text-muted-brand">{r.cm}</span>
              </div>
            ))}
            <div className="p-4 bg-light-blue/50 border-t border-border text-xs text-muted-brand">
              Between sizes? We recommend sizing up for a more comfortable fit.
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="aspect-[4/3] overflow-hidden bg-white border border-border"
          >
            <Image src={SIZING_IMG} alt="Size guide and measurement diagram" fittingType="fit" className="h-full w-full object-contain p-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
