import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';

export default function Header({ cartCount, onOpenCart }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { label: 'Back & spine',      href: '#products' },
    { label: 'Neck & shoulder',   href: '#products' },
    { label: 'Knee & joint',      href: '#products' },
    { label: 'Reviews',           href: '#testimonial' },
    { label: 'About',             href: '#mission' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 border-b border-sand ${
      scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm' : 'bg-cream/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 h-[72px] md:h-[88px] flex items-center justify-between">
        <a href="#" className="font-serif text-[22px] md:text-[26px] tracking-tight text-ink select-none">
          there4u<span className="text-coral">.</span>
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} className="text-[15px] text-ink hover:text-coral transition-colors">{l.label}</a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Search className="w-[19px] h-[19px] text-ink hidden sm:block cursor-pointer hover:text-coral transition-colors" strokeWidth={1.75} />
          <User className="w-[19px] h-[19px] text-ink hidden sm:block cursor-pointer hover:text-coral transition-colors" strokeWidth={1.75} />
          <button onClick={onOpenCart} className="relative">
            <ShoppingCart className="w-[19px] h-[19px] text-ink hover:text-coral transition-colors" strokeWidth={1.75} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-[18px] h-[18px] bg-coral text-white text-[10px] font-semibold rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </button>
          <a href="#products" className="hidden md:inline-block bg-coral text-white text-sm font-medium px-5 py-[11px] rounded-pill hover:bg-coral-d transition-colors">Shop now</a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-ink">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-cream border-t border-sand px-6 pb-6 space-y-1">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
               className="block py-3 text-[15px] text-ink hover:text-coral border-b border-sand/60 last:border-none">{l.label}</a>
          ))}
        </div>
      )}
    </header>
  );
}
