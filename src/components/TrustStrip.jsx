import React from 'react';
import { Shield, Truck, RotateCcw, Users } from 'lucide-react';

const items = [
  {
    icon: <Shield className="w-[26px] h-[26px] text-coral" strokeWidth={1.75} />,
    title: 'Physiotherapist-consulted',
    desc: 'Every design is reviewed for real support, not just look.',
  },
  {
    icon: <Truck className="w-[26px] h-[26px] text-coral" strokeWidth={1.75} />,
    title: 'Free shipping over $50',
    desc: 'Delivered in discreet packaging, 3-5 business days.',
  },
  {
    icon: <RotateCcw className="w-[26px] h-[26px] text-coral" strokeWidth={1.75} />,
    title: 'Damage & defect cover',
    desc: 'Arrived damaged or faulty? We replace or refund it.',
  },
  {
    icon: <Users className="w-[26px] h-[26px] text-coral" strokeWidth={1.75} />,
    title: '12,000+ customers',
    desc: 'Managing back, neck and knee pain with us every day.',
  },
];

export default function TrustStrip() {
  return (
    <section className="w-full border-t border-b border-sand bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((it, i) => (
          <div key={i} className="flex flex-col gap-3.5">
            {it.icon}
            <div className="text-[15px] font-medium text-ink">{it.title}</div>
            <div className="text-[14px] text-sage leading-relaxed">{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
