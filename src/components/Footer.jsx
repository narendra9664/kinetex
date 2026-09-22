import React, { useState } from "react";
import { Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: ["Lower Back", "Knee", "Ankle", "All Products"],
  },
  {
    title: "Help",
    links: ["Size Guide", "Shipping", "Returns", "FAQ", "Contact"],
  },
  {
    title: "Learn",
    links: ["Our Story", "How It Works", "Support Guide", "Journal"],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="bg-deep-navy text-white">
      {/* Newsletter */}
      <div className="container-px max-w-[1400px] mx-auto py-16 md:py-20 border-b border-white/10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="heading-display text-3xl md:text-4xl">
              Move with us.
            </h3>
            <p className="text-white/60 mt-3 max-w-md">
              Guidance, new support and stories — sent occasionally. No noise.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSent(true);
            }}
            className="flex items-center gap-3 border-b border-white/30 pb-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none text-lg"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="text-white hover:text-accent-green transition-colors"
            >
              {sent ? "SUBSCRIBED ✓" : "SUBSCRIBE"}
              {!sent && <ArrowRight size={18} className="inline ml-2" />}
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="container-px max-w-[1400px] mx-auto py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <a href="#top" className="heading-display text-3xl flex items-center gap-2">
            KINETICA <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          </a>
          <p className="text-white/50 mt-4 max-w-xs leading-relaxed">
            Engineered support for everyday movement, training and recovery.
          </p>
          <div className="flex items-center gap-5 mt-6">
            <a href="#" aria-label="Instagram" className="text-white/60 hover:text-accent-green transition-colors">
              <Instagram size={20} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Twitter" className="text-white/60 hover:text-accent-green transition-colors">
              <Twitter size={20} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="YouTube" className="text-white/60 hover:text-accent-green transition-colors">
              <Youtube size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="eyebrow text-white/40 mb-5">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/80 hover:text-accent-green transition-colors text-sm">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-px max-w-[1400px] mx-auto py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">© {new Date().getFullYear()} Kinetica. All rights reserved.</p>
          <div className="flex items-center gap-3 text-white/40 text-[11px] uppercase tracking-wider">
            <span>Visa</span>
            <span>·</span>
            <span>Mastercard</span>
            <span>·</span>
            <span>Amex</span>
            <span>·</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
