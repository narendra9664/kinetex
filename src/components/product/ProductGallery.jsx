import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function ProductGallery({ images = [], alt = "Product" }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: images.length > 1, align: "center" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback((api) => setSelected(api.selectedScrollSnap()), []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Reset to first image when the product (image list) changes.
  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0, true);
    setSelected(0);
  }, [images, emblaApi]);

  const scrollTo = useCallback((i) => emblaApi && emblaApi.scrollTo(i), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (images.length === 0) return null;
  const multiple = images.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-w-0 w-full"
    >
      {/* Main swipeable carousel */}
      <div className="relative min-w-0">
        <div className="overflow-hidden bg-off-white" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {images.map((src, i) => (
              <div key={i} className="relative flex-[0_0_100%] min-w-0 aspect-square">
                <Image
                  src={src}
                  alt={`${alt} — view ${i + 1}`}
                  fittingType="fit"
                  className="h-full w-full object-contain p-6 sm:p-8 select-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {multiple && (
          <>
            {/* Arrows */}
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur border border-black/5 shadow-sm flex items-center justify-center text-navy hover:bg-white transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 backdrop-blur border border-black/5 shadow-sm flex items-center justify-center text-navy hover:bg-white transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots (mobile-friendly indicator) */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    selected === i ? "w-5 bg-navy" : "w-1.5 bg-navy/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip — scrolls horizontally instead of overflowing */}
      {multiple && (
        <div className="mt-3 min-w-0 flex gap-2.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`View image ${i + 1}`}
              className={`shrink-0 h-16 w-16 sm:h-[76px] sm:w-[76px] bg-off-white border overflow-hidden transition-colors ${
                selected === i ? "border-navy" : "border-border hover:border-navy/40"
              }`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${i + 1}`}
                fittingType="fit"
                className="h-full w-full object-contain p-1.5"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
