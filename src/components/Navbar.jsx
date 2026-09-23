import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/CartContext";

const links = [
  { label: "Shop", to: "/shop" },
  { label: "Back Support", to: "/support/lower-back" },
  { label: "Knee Support", to: "/support/knee" },
  { label: "Ankle Support", to: "/support/ankle" },
  { label: "Free Guide", to: "/guide", highlight: true },
  { label: "How It Works", to: "/#how" },
  { label: "Our Story", to: "/#editorial" },
];

/**
 * Site header. Over a dark hero it starts transparent with white text; pass
 * `solid` on pages with a light top so it is always readable.
 */
export default function Navbar({ solid = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, openCart } = useCart();
  const { pathname } = useLocation();
  const isActive = (to) => !to.includes("#") && (pathname === to || pathname.startsWith(`${to}/`));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = solid || scrolled;
  const text = light ? "text-navy" : "text-white";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50"
      >
        {/* Announcement bar */}
        <Link
          to="/guide"
          className="group flex items-center justify-center gap-2 bg-accent-green text-navy text-[12px] sm:text-[13px] font-semibold px-4 py-2 text-center"
        >
          <span>Free shipping over $50</span>
          <span aria-hidden="true">·</span>
          <span className="underline underline-offset-2">Free back-care guide</span>
          <ArrowRight size={14} className="shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </Link>
        <div
          className={`transition-all duration-300 ${
            light ? "bg-white/90 backdrop-blur-xl border-b border-black/5 py-2" : "bg-transparent py-3 sm:py-4"
          }`}
        >
        <nav className="container-px max-w-[1400px] mx-auto flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 select-none shrink-0" aria-label="MotionPluse home">
            <span className={`heading-display text-[clamp(1.05rem,5vw,1.5rem)] tracking-tight ${text}`}>MOTIONPLUSE</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          </Link>

          <ul className="hidden xl:flex items-center gap-7">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  aria-current={isActive(l.to) ? "page" : undefined}
                  className={
                    l.highlight
                      ? "text-[13px] font-semibold tracking-wide rounded-full bg-accent-green text-navy px-4 py-2 hover:bg-white transition-colors"
                      : `text-[13px] font-medium tracking-wide transition-opacity hover:opacity-60 pb-1 border-b-2 ${
                          isActive(l.to) ? "border-accent-green" : "border-transparent"
                        } ${light ? "text-navy" : "text-white/90"}`
                  }
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center shrink-0 -mr-2">
            <button aria-label={`Open cart (${count} items)`} onClick={openCart} className={`relative h-[44px] w-[44px] flex items-center justify-center transition-opacity hover:opacity-60 ${text}`}>
              <ShoppingBag size={20} strokeWidth={1.75} />
              <span className="absolute top-1 right-0.5 bg-accent-green text-navy text-[10px] font-bold rounded-full h-4 min-w-4 px-1 flex items-center justify-center">
                {count}
              </span>
            </button>
            <button aria-label="Menu" onClick={() => setOpen(true)} className={`xl:hidden h-[44px] w-[44px] flex items-center justify-center transition-opacity ${text}`}>
              <Menu size={22} strokeWidth={1.75} />
            </button>
          </div>
        </nav>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-deep-navy xl:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Link to="/" onClick={() => setOpen(false)} className="heading-display text-2xl text-white">MOTIONPLUSE</Link>
              <button aria-label="Close" onClick={() => setOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            <ul className="px-6 mt-6 space-y-6 pb-10">
              {links.map((l, i) => (
                <motion.li key={l.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
                  <Link to={l.to} onClick={() => setOpen(false)} className={`heading-display text-3xl ${l.highlight || isActive(l.to) ? "text-accent-green" : "text-white"}`}>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
