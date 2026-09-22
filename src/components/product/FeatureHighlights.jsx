import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import FeatureBlock from "./FeatureBlock";

const PULLEY =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/0f91b77ba_1cfc5ad1-dbda-4fff-bf99-fc48fa782937.png";
const ELASTIC =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/19c5391e4_a5a7819a-ea94-4017-b6f9-3dc20d733e4e.png";
const COMPRESSION =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/688bd83d4_5e60300c-8f36-42c4-b627-d0026d2cf39a.png";
const BREATHABLE =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/e9d44e266_bce1845a-d15a-4526-8c08-a93024615b43.png";
const SPEC =
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/125387210_Adjustable_Lower_Back_Brace_Lumbar_Support_Waist_Belt_For_Men_Women_Pain_Relief-2jpg.jpeg";

const blocks = [
  {
    eyebrow: "Adjustment",
    title: "Easy-tightening pulley system.",
    body: "Achieve maximum stability with a pulley system that lets you dial in tension evenly — no awkward reaching or over-tightening.",
    image: PULLEY,
    alt: "Pulley system tension arrows",
    flip: false,
  },
  {
    eyebrow: "Support",
    title: "Elastic support that reduces pressure.",
    body: "Fits the waist curve for comfortable, 360° protection. Four memory ABS resin stays and side spring support keep structure where you need it.",
    image: ELASTIC,
    alt: "Elastic support with resin stays",
    flip: true,
  },
  {
    eyebrow: "Compression",
    title: "Double compression, 360° wrap.",
    body: "An elastic compression band wraps the waist so stress is distributed evenly and held firmly — supporting without restricting movement.",
    image: COMPRESSION,
    alt: "Double compression band",
    flip: false,
  },
  {
    eyebrow: "Materials",
    title: "Breathable. Pressurized. Skin-friendly.",
    body: "Breathable stretch fish ribbon, a skin-friendly flannel lining and suede velcro for comfortable touch — designed specifically for waist protection.",
    image: BREATHABLE,
    alt: "Breathable materials callouts",
    flip: true,
  },
];

export default function FeatureHighlights() {
  return (
    <section className="bg-off-white py-24 md:py-32">
      <div className="container-px max-w-[1400px] mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="eyebrow text-trust-blue mb-5 block">Engineered Details</span>
          <h2 className="heading-display text-navy text-5xl md:text-6xl">
            Every detail, designed around your back.
          </h2>
        </div>

        <div className="space-y-24 md:space-y-32">
          {blocks.map((b, i) => (
            <FeatureBlock key={b.title} {...b} index={i} />
          ))}
        </div>

        {/* Full-width spec image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="mt-24 md:mt-32 bg-white aspect-[16/10] overflow-hidden"
        >
          <Image src={SPEC} alt="Product feature callouts" fittingType="fit" className="h-full w-full object-contain" />
        </motion.div>
      </div>
    </section>
  );
}
