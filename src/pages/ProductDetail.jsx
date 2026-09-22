import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, ArrowRight } from "lucide-react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import FeatureHighlights from "@/components/product/FeatureHighlights";
import UseCases from "@/components/product/UseCases";
import HowToWear from "@/components/product/HowToWear";
import SizingGuide from "@/components/product/SizingGuide";
import Footer from "@/components/Footer";

const galleryImages = [
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/ce0023733_Adjustable_Lower_Back_Brace_Lumbar_Support_Waist_Belt_For_Men_Women_Pain_Relief-3jpg.jpeg",
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/db4c74cc3_1d63a60f-afaa-4d0b-a280-02d9227f84be.png",
  "https://media.base44.com/images/public/6ab1997b13a801d33d37441e/125387210_Adjustable_Lower_Back_Brace_Lumbar_Support_Waist_Belt_For_Men_Women_Pain_Relief-2jpg.jpeg",
];

export default function ProductDetail() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white pt-20">
      {/* Slim header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="container-px max-w-[1400px] mx-auto flex items-center justify-between py-4">
          <Link to="/" className="heading-display text-2xl text-navy flex items-center gap-2">
            KINETICA <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          </Link>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-trust-blue transition-colors"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            BACK TO SHOP
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container-px max-w-[1400px] mx-auto py-5 text-xs text-muted-brand">
        <Link to="/" className="hover:text-navy">Home</Link>
        <span className="mx-2">/</span>
        <span className="hover:text-navy">Back Support</span>
        <span className="mx-2">/</span>
        <span className="text-navy">Lower Back Support</span>
      </div>

      {/* Hero: gallery + info */}
      <section className="container-px max-w-[1400px] mx-auto pb-20 md:pb-28 grid lg:grid-cols-2 gap-10 lg:gap-16">
        <ProductGallery images={galleryImages} />
        <ProductInfo />
      </section>

      <FeatureHighlights />
      <UseCases />
      <HowToWear />
      <SizingGuide />

      {/* Final nudge */}
      <section className="bg-navy py-20 md:py-28 text-center">
        <div className="container-px max-w-[1400px] mx-auto">
          <div className="flex items-center justify-center gap-1.5 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-accent-green text-accent-green" />
            ))}
          </div>
          <h2 className="heading-display text-white text-5xl md:text-6xl">
            Ready to move with confidence?
          </h2>
          <Link
            to="/"
            className="group mt-8 inline-flex items-center gap-2 bg-white text-navy px-9 py-4 text-sm font-semibold tracking-wide hover:bg-accent-green hover:text-white transition-colors duration-300"
          >
            ADD TO CART
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
