import React from 'react';
import { ShoppingBag } from 'lucide-react';

const products = [
  {
    id: 'back-brace',
    name: 'Adjustable Lower Back Brace',
    price: 49,
    rating: '4.8/5.0',
    desc: 'Lumbar support waist belt for men & women — breathable mesh, dual adjustable straps.',
    img: '/photos/Adjustable_Lower_Back_Brace_Lumbar_Support_Waist_Belt_For_Men_Women_Pain_Relief-1.jpg.jpeg',
  },
  {
    id: 'decompression-belt',
    name: 'Lumbar Decompression Belt',
    price: 59,
    rating: '4.7/5.0',
    desc: 'Spinal traction belt with pneumatic decompression — eases disc pressure instantly.',
    img: '/photos/1cfc5ad1-dbda-4fff-bf99-fc48fa782937.png',
  },
  {
    id: 'inflatable-belt',
    name: 'Inflatable Decompression Belt',
    price: 64,
    rating: '4.9/5.0',
    desc: 'Air-pump inflatable lumbar belt — adjustable pressure for instant lower back traction.',
    img: '/photos/5bf85258-c55b-4130-9e90-e7a05cee53c5.png',
  },
  {
    id: 'neck-massager',
    name: 'Neck & Shoulder Massager',
    price: 79,
    rating: '4.6/5.0',
    desc: 'Cervical EMS pulse massager — heated pads, 6 modes, rechargeable for on-the-go relief.',
    img: '/photos/1d63a60f-afaa-4d0b-a280-02d9227f84be.png',
  },
  {
    id: 'heated-knee',
    name: 'Heated Knee Massager',
    price: 69,
    rating: '4.8/5.0',
    desc: 'Infrared heated vibration knee wrap — targets joint pain, arthritis, and stiffness.',
    img: '/photos/5e60300c-8f36-42c4-b627-d0026d2cf39a.png',
  },
  {
    id: 'posture-corrector',
    name: 'Posture Corrector Brace',
    price: 39,
    rating: '4.7/5.0',
    desc: 'Upper back posture support — invisible under clothes, adjustable for all-day wear.',
    img: '/photos/a5a7819a-ea94-4017-b6f9-3dc20d733e4e.png',
  },
];

export default function ProductCatalog({ onAddToCart }) {
  return (
    <section id="products" className="w-full bg-cream">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-24 md:py-28 flex flex-col gap-11">

        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <span className="text-[13px] text-sage font-medium tracking-wide uppercase">Featured products</span>
            <h2 className="text-3xl md:text-[38px] tracking-tight text-ink">Find relief, faster.</h2>
          </div>
          <a href="#" className="text-[15px] font-medium text-ink flex items-center gap-2 hover:text-coral transition-colors group">
            Shop all products <span className="text-coral group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {products.map(p => (
            <div key={p.id} className="flex flex-col gap-3 group">

              {/* Image card */}
              <div className="aspect-square bg-white border border-sand rounded-card flex items-center justify-center p-0 cursor-pointer hover:shadow-md hover:border-coral/40 transition-all relative overflow-hidden">
                <img 
                  src={p.img} 
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-sage text-xs text-center p-4">Image placeholder</div>';
                  }}
                />

                {/* Hover add-to-cart button */}
                <button
                  onClick={() => onAddToCart(p)}
                  className="absolute bottom-3 right-3 w-10 h-10 bg-coral text-white rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-coral-d shadow-lg"
                  title="Add to cart"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>

              {/* Info */}
              <div className="text-[13px] text-coral font-medium">★★★★★ {p.rating}</div>
              <div className="text-[15px] font-medium text-ink leading-snug">{p.name}</div>
              <div className="text-[15px] text-sage font-medium">${p.price}.00</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
