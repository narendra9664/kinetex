import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Star, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useCart, toCartItem } from "@/lib/CartContext";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductStory from "@/components/product/ProductStory";
import Footer from "@/components/Footer";
import { fetchProductByHandle } from "@/lib/shopify";
import { getProductContent } from "@/lib/productContent";

export default function ProductDetail() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const { handle } = useParams();
  const { addItem } = useCart();
  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProductByHandle(handle),
    enabled: !!handle,
  });

  if (isLoading) {
    return (
      <div className="bg-white pt-20 min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-navy rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="bg-white pt-32 pb-32 text-center">
        <h1 className="heading-display text-navy text-3xl mb-4">Product not found</h1>
        <Link to="/" className="text-trust-blue font-semibold hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const content = getProductContent(product);
  const images = product.images.map((img) => img.src);

  return (
    <div className="bg-white">
      <Navbar solid />

      {/* Breadcrumb */}
      <div className="container-px max-w-[1400px] mx-auto pt-32 pb-5 text-xs text-muted-brand">
        <Link to="/" className="hover:text-navy">Home</Link>
        <span className="mx-2">/</span>
        <span className="hover:text-navy">{content.tag}</span>
        <span className="mx-2">/</span>
        <span className="text-navy">{content.name}</span>
      </div>

      {/* Hero: gallery + info */}
      <section className="container-px max-w-[1400px] mx-auto pb-16 md:pb-28 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="min-w-0">
          <ProductGallery images={images} alt={content.name} />
        </div>
        <ProductInfo product={product} content={content} />
      </section>

      <ProductStory content={content} images={images} alt={content.name} />

      {/* Final nudge */}
      <section className="bg-navy py-20 md:py-28 text-center">
        <div className="container-px max-w-[1400px] mx-auto">
          <div className="flex items-center justify-center gap-1.5 mb-5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-accent-green text-accent-green" />
            ))}
          </div>
          <h2 className="heading-display text-white text-[1.75rem] leading-[1.05] sm:text-5xl md:text-6xl">
            Ready to move with confidence?
          </h2>
          <button
            onClick={() =>
              product.variants.length === 1
                ? addItem(toCartItem(product, product.variants[0], content.name))
                : window.scrollTo({ top: 0, behavior: "smooth" }) // pick size/colour first
            }
            className="group mt-8 inline-flex items-center gap-2 bg-white text-navy px-9 py-4 text-sm font-semibold tracking-wide hover:bg-accent-green transition-colors duration-300"
          >
            {product.variants.length === 1 ? "ADD TO CART" : "CHOOSE YOUR OPTIONS"}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
