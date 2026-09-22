import React from 'react';

export default function Testimonial() {
  return (
    <section id="testimonial" className="w-full bg-teal">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-24 md:py-28 flex flex-col items-center gap-7 text-center">

        <div className="text-coral text-[15px] tracking-widest">★★★★★</div>

        <blockquote className="max-w-[720px] font-serif text-2xl md:text-[30px] leading-[1.4] text-shell">
          "I stopped dreading my afternoon commute. The lumbar belt takes the ache out of my lower back before it even starts."
        </blockquote>

        <cite className="not-italic text-[14px] text-shell/80">
          Priya M. &nbsp;·&nbsp; verified there4u customer
        </cite>

      </div>
    </section>
  );
}
