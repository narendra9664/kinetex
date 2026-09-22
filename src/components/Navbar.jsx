import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";

const links = [
  { label: "Shop", href: "#featured" },
  { label: "Back Support", href: "#categories" },
  { label: "Knee Support", href: "#categories" },
  { label: "Ankle Support", href: "#categories" },
  { label: "How It Works", href: "#how" },
  { label: "Our Story", href: "#editorial" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-black/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="container-px max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2 select-none">
            <span
              className={`heading-display text-2xl tracking-tight ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              KINETICA
            </span>
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                scrolled ? "bg-accent-green" : "bg-accent-green"
              }`}
            />
          </a>

          {/* Center links */}
          <ul className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={`text-[13px] font-medium tracking-wide transition-colors hover:opacity-60 ${
                    scrolled ? "text-navy" : "text-white/90"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <button
              aria-label="Search"
              className={`transition-opacity hover:opacity-60 ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              <Search size={19} strokeWidth={1.75} />
            </button>
            <button
              aria-label="Account"
              className={`hidden sm:block transition-opacity hover:opacity-60 ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              <User size={19} strokeWidth={1.75} />
            </button>
            <button
              aria-label="Cart"
              className={`relative transition-opacity hover:opacity-60 ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              <ShoppingBag size={19} strokeWidth={1.75} />
              <span className="absolute -top-1.5 -right-2 bg-accent-green text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className={`lg:hidden transition-opacity ${
                scrolled ? "text-navy" : "text-white"
              }`}
            >
              <Menu size={22} strokeWidth={1.75} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-deep-navy lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="heading-display text-2xl text-white">KINETICA</span>
              <button aria-label="Close" onClick={() => setOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            <ul className="px-6 mt-6 space-y-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="heading-display text-4xl text-white"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
