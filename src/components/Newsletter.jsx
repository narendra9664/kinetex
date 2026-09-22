import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (email) setSent(true);
  };

  return (
    <section className="w-full bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-20 md:py-24 flex flex-col items-center gap-5 text-center">

        <h2 className="text-2xl md:text-[32px] tracking-tight text-ink max-w-[480px]">
          Get 10% off your first order
        </h2>

        <p className="text-[15px] text-sage max-w-[420px]">
          Join our list for relief tips, new product drops, and a code for your first order.
        </p>

        {sent ? (
          <div className="mt-2 bg-teal/10 text-teal text-sm font-medium px-6 py-3.5 rounded-pill border border-teal/20">
            ✓ You're in! Check your inbox for your 10% code.
          </div>
        ) : (
          <form onSubmit={submit} className="flex gap-2.5 mt-1.5 w-full max-w-md">
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-pill border border-sand text-[14px] font-sans bg-white focus:outline-none focus:border-coral transition-colors"
            />
            <button
              type="submit"
              className="bg-ink hover:bg-teal text-white text-[14px] font-medium px-6 py-3.5 rounded-pill border-none transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}

      </div>
    </section>
  );
}
