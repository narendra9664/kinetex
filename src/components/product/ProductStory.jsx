import React from "react";
import { motion } from "framer-motion";
import { Image } from "@/components/ui/image";
import FeatureBlock from "./FeatureBlock";

// Renders the rich, per-product detail story (overview, feature highlights,
// use cases, how-to-use, specs and optional sizing) entirely from curated
// content in productContent.js plus the product's own Shopify images.
export default function ProductStory({ content, images = [], alt = "Product" }) {
  const img = (i) => images[i] ?? images[0];

  return (
    <>
      {/* Overview / long description */}
      {content.overview && (
        <section className="bg-white py-16 md:py-28">
          <div className="container-px max-w-[900px] mx-auto text-center">
            <span className="eyebrow text-trust-blue mb-4 block">Overview</span>
            <h2 className="heading-display text-navy text-[1.6rem] leading-[1.1] sm:text-4xl md:text-5xl">
              {content.overview.heading}
            </h2>
            <div className="mt-6 space-y-4">
              {content.overview.paragraphs.map((p, i) => (
                <p key={i} className="text-base sm:text-lg text-muted-brand leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Feature highlights — alternating image/text */}
      {content.highlights?.length > 0 && (
        <section className="bg-off-white py-16 md:py-32">
          <div className="container-px max-w-[1400px] mx-auto">
            <div className="max-w-2xl mb-12 md:mb-16">
              <span className="eyebrow text-trust-blue mb-4 block">Engineered Details</span>
              <h2 className="heading-display text-navy text-3xl sm:text-4xl md:text-6xl">
                Designed around how you use it.
              </h2>
            </div>
            <div className="space-y-16 md:space-y-32">
              {content.highlights.map((b, i) => (
                <FeatureBlock
                  key={b.title}
                  eyebrow={b.eyebrow}
                  title={b.title}
                  body={b.body}
                  image={img(b.imageIndex)}
                  alt={`${alt} — ${b.eyebrow}`}
                  flip={i % 2 === 1}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Use cases */}
      {content.useCases && (
        <section className="bg-white py-16 md:py-32">
          <div className="container-px max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/3] overflow-hidden bg-off-white order-2 lg:order-1"
            >
              <Image
                src={img(content.useCases.imageIndex)}
                alt={`${alt} in use`}
                fittingType="fit"
                className="h-full w-full object-contain p-6"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2 min-w-0"
            >
              <span className="eyebrow text-trust-blue mb-4 block">Everyday Use</span>
              <h2 className="heading-display text-navy text-[1.6rem] leading-[1.1] sm:text-4xl md:text-5xl">
                {content.useCases.heading}
              </h2>
              <p className="text-base sm:text-lg text-muted-brand mt-5 max-w-md leading-relaxed">
                {content.useCases.body}
              </p>
              <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
                {content.useCases.items.map((c) => (
                  <li key={c} className="flex items-center gap-2.5 text-sm text-navy">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-green shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      )}

      {/* How to use */}
      {content.howToUse && (
        <section className="bg-deep-navy py-16 md:py-32">
          <div className="container-px max-w-[1400px] mx-auto">
            <div className="max-w-2xl mb-10 md:mb-14">
              <span className="eyebrow text-accent-green mb-4 block">How To Use</span>
              <h2 className="heading-display text-white text-3xl sm:text-4xl md:text-6xl">
                {content.howToUse.heading}
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-8 md:gap-10">
              {content.howToUse.steps.map((s, i) => (
                <motion.div
                  key={s.t}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-t border-white/15 pt-6"
                >
                  <span className="heading-display text-accent-green/50 text-3xl">
                    0{i + 1}
                  </span>
                  <h3 className="text-lg font-semibold text-white mt-3">{s.t}</h3>
                  <p className="text-white/60 mt-2 leading-relaxed text-sm">{s.b}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specs + sizing */}
      {(content.specs?.length > 0 || content.sizing) && (
        <section className="bg-off-white py-16 md:py-28">
          <div className="container-px max-w-[1100px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {content.specs?.length > 0 && (
              <div className="min-w-0">
                <span className="eyebrow text-trust-blue mb-5 block">Specifications</span>
                <dl className="border-t border-border">
                  {content.specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-start justify-between gap-4 py-3.5 border-b border-border"
                    >
                      <dt className="text-sm text-muted-brand shrink-0">{s.label}</dt>
                      <dd className="text-sm font-medium text-navy text-right">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {content.sizing && (
              <div className="min-w-0">
                <span className="eyebrow text-trust-blue mb-5 block">Size Guide</span>
                <div className="border border-border bg-white overflow-hidden">
                  <div
                    className="grid bg-navy text-white text-[11px] font-semibold uppercase tracking-wider"
                    style={{ gridTemplateColumns: `repeat(${content.sizing.columns.length}, minmax(0, 1fr))` }}
                  >
                    {content.sizing.columns.map((c, i) => (
                      <span key={c} className={`p-3 ${i > 0 ? "border-l border-white/15" : ""}`}>
                        {c}
                      </span>
                    ))}
                  </div>
                  {content.sizing.rows.map((row) => (
                    <div
                      key={row[0]}
                      className="grid text-sm border-t border-border"
                      style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
                    >
                      {row.map((cell, i) => (
                        <span
                          key={i}
                          className={`p-3 ${i === 0 ? "font-semibold text-navy" : "text-muted-brand"} ${
                            i > 0 ? "border-l border-border" : ""
                          }`}
                        >
                          {cell}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
                {content.sizing.note && (
                  <p className="text-xs text-muted-brand mt-3 leading-relaxed">{content.sizing.note}</p>
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
