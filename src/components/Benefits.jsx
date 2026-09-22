import React from 'react';

export default function Benefits() {
  return (
    <section id="benefits" className="w-full bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-24 md:py-28 flex flex-col lg:flex-row items-center gap-14">

        {/* Left copy */}
        <div className="flex-1 flex flex-col gap-5 max-w-[460px]">
          <span className="text-[13px] text-sage font-medium tracking-wide uppercase">Why there4u</span>

          <h2 className="text-3xl md:text-[38px] leading-[1.1] tracking-tight text-ink">
            Built for the relief that lasts through the day, not just the moment you put it&nbsp;on.
          </h2>

          <p className="text-base leading-relaxed text-sage">
            Every design starts with a physiotherapist, not a factory catalog. Adjustable compression,
            breathable medical-grade materials, and a fit that stays put through a full work day,
            a walk, or a night's sleep.
          </p>

          <a href="#products" className="text-[15px] font-medium text-ink flex items-center gap-2 mt-1 hover:text-coral transition-colors group">
            See how we design <span className="text-coral group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Right two image columns */}
        <div className="flex-1 flex gap-4">
          <div className="flex-1 aspect-[3/4] bg-cream-d border border-sand rounded-card mt-10 overflow-hidden">
            <img 
              src="/photos/Adjustable_Lower_Back_Brace_Lumbar_Support_Waist_Belt_For_Men_Women_Pain_Relief-2.jpg.jpeg" 
              alt="Comfortable to wear under clothes" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 aspect-[3/4] bg-cream-d border border-sand rounded-card overflow-hidden">
            <img 
              src="/photos/d1496229-3378-4599-a800-e8569db4f073.png" 
              alt="Elastic support and reduce pressure" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
