import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import EditorialSection from "@/components/EditorialSection";
import CategorySection from "@/components/CategorySection";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import EducationalSection from "@/components/EducationalSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProducts />
        <EditorialSection />
        <CategorySection />
        <HowItWorks />
        <TrustSection />
        <EducationalSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
