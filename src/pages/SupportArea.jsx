import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Check, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { SUPPORT_AREAS, SUPPORT_AREA_LIST } from "@/lib/supportAreas";
import { useProducts } from "@/lib/products";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export default function SupportArea() {
  const { slug } = useParams();
  const area = SUPPORT_AREAS[slug];
  const { data: products = [], isLoading } = useProducts();

  if (!area) {
    return (
      <div className="bg-white">
        <Navbar solid />
        <div className="pt-40 pb-32 text-center">
          <h1 className="heading-display text-navy text-4xl mb-4">Page not found</h1>
          <Link to="/shop" className="text-trust-blue font-semibold hover:underline">Shop all products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = area.relatedHandles.map((h) => products.find((p) => p.handle === h)).filter(Boolean);
  const others = SUPPORT_AREA_LIST.filter((a) => a.slug !== area.slug);

  return (
    <div className="bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70svh] md:min-h-[80svh] bg-deep-navy overflow-hidden flex items-end">
        <img src={area.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60 animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/70 to-deep-navy/20" />
        <div className="relative container-px max-w-[1400px] mx-auto pt-40 pb-16 md:pb-24 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <div className="flex items-center gap-3 text-xs text-white/60 mb-6">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-accent-green">{area.title} support</span>
            </div>
            <h1 className="heading-display text-white text-[2rem] leading-[1.02] sm:text-5xl md:text-7xl">{area.heroTitle}</h1>
            <p className="text-white/75 text-lg md:text-xl mt-6 max-w-2xl leading-relaxed">{area.heroText}</p>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-4 mt-12 max-w-4xl">
            {area.stats.map((s) => (
              <div key={s.label} className="border border-white/15 bg-white/5 backdrop-blur-sm p-5">
                <div className="heading-display text-accent-green text-3xl sm:text-4xl">{s.value}</div>
                <p className="text-white/70 text-sm mt-2 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Causes */}
      <section className="py-24 md:py-32">
        <div className="container-px max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="max-w-2xl mb-14">
            <span className="eyebrow text-trust-blue mb-4 block">Why it happens</span>
            <h2 className="heading-display text-navy text-[1.75rem] leading-[1.05] sm:text-4xl md:text-6xl">The most common causes of {area.title.toLowerCase()} pain.</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {area.causes.map((c, i) => (
              <motion.div key={c.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }} className="bg-white p-8">
                <span className="eyebrow text-trust-blue">0{i + 1}</span>
                <h3 className="heading-display text-navy text-2xl mt-4">{c.title}</h3>
                <p className="text-muted-brand text-[15px] mt-3 leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain cycle */}
      <section className="bg-off-white py-24 md:py-28">
        <div className="container-px max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="max-w-2xl mb-12">
            <span className="eyebrow text-trust-blue mb-4 block">How it builds</span>
            <h2 className="heading-display text-navy text-[1.6rem] leading-[1.1] sm:text-4xl md:text-5xl">Pain is usually a loop, not a single moment.</h2>
          </motion.div>
          <ol className="grid md:grid-cols-5 gap-3">
            {area.cycle.map((step, i) => (
              <motion.li
                key={step}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                className={`relative p-6 min-h-[140px] flex flex-col justify-between ${i === 3 ? "bg-accent-green text-navy" : "bg-navy text-white"}`}
              >
                <span className={`text-xs font-semibold ${i === 3 ? "text-navy" : "text-accent-green"}`}>(00{i + 1})</span>
                <span className="heading-display text-2xl">{step}</span>
                {i < area.cycle.length - 1 && (
                  <ArrowRight size={18} className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-navy bg-off-white rounded-full" />
                )}
              </motion.li>
            ))}
          </ol>
          <p className="text-muted-brand mt-6 max-w-2xl">
            The easiest place to break the loop is early: support the area during demanding tasks, keep moving, and help tired muscles recover.
          </p>
        </div>
      </section>

      {/* How we help */}
      <section className="bg-deep-navy py-24 md:py-32">
        <div className="container-px max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-14 items-start">
          <motion.div {...fadeUp}>
            <span className="eyebrow text-accent-green mb-4 block">How MotionPluse helps</span>
            <h2 className="heading-display text-white text-[1.75rem] leading-[1.05] sm:text-4xl md:text-6xl">Support that makes moving easier.</h2>
            <p className="text-white/70 text-lg mt-6 max-w-lg leading-relaxed">
              Our products don't replace movement. They make it more comfortable to keep moving, which is what helps most.
            </p>
            <div className="mt-10 border border-white/15 p-6">
              <h3 className="text-white font-semibold mb-4">Daily habits that help</h3>
              <ul className="space-y-3">
                {area.tips.map((t) => (
                  <li key={t} className="flex gap-3 text-white/80 text-[15px]">
                    <Check size={17} className="text-accent-green shrink-0 mt-0.5" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <div className="space-y-4">
            {area.helps.map((h, i) => (
              <motion.div key={h.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="bg-white/5 border border-white/10 p-7 flex gap-6">
                <span className="heading-display text-accent-green text-4xl leading-none">0{i + 1}</span>
                <div>
                  <h3 className="heading-display text-white text-2xl">{h.title}</h3>
                  <p className="text-white/65 text-[15px] mt-2 leading-relaxed">{h.body}</p>
                </div>
              </motion.div>
            ))}
            <div className="flex gap-3 p-5 bg-white/5 border-l-2 border-accent-green text-white/70 text-sm leading-relaxed">
              <AlertTriangle size={18} className="text-accent-green shrink-0 mt-0.5" />
              <p>
                This information is general guidance, not medical advice. See a doctor if pain is severe, follows a fall or injury, keeps getting worse, or comes with numbness, weakness or swelling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      <section className="py-24 md:py-32">
        <div className="container-px max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <motion.div {...fadeUp}>
              <span className="eyebrow text-trust-blue mb-4 block">Recommended for {area.title.toLowerCase()} support</span>
              <h2 className="heading-display text-navy text-[1.75rem] leading-[1.05] sm:text-4xl md:text-6xl">Related products</h2>
            </motion.div>
            <Link to="/shop" className="group inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-trust-blue">
              SHOP ALL PRODUCTS <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(2)].map((_, i) => <div key={i} className="aspect-[4/5] bg-off-white animate-pulse" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
              {related.map((p, i) => <ProductCard key={p.handle} product={p} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* Other areas */}
      <section className="bg-off-white py-16">
        <div className="container-px max-w-[1400px] mx-auto grid sm:grid-cols-2 gap-4">
          {others.map((o) => (
            <Link key={o.slug} to={`/support/${o.slug}`} className="group relative h-44 overflow-hidden bg-deep-navy flex items-end p-7">
              <img src={o.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy to-transparent" />
              <span className="relative heading-display text-white text-3xl flex items-center gap-3">
                {o.title} support <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
