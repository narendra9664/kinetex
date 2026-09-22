import React from 'react';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) {
  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShipAt = 50;
  const gap = Math.max(0, freeShipAt - subtotal);
  const progress = Math.min(100, (subtotal / freeShipAt) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-cream border-l border-sand shadow-2xl flex flex-col">

        {/* Header */}
        <div className="px-6 py-5 border-b border-sand flex items-center justify-between">
          <h2 className="font-serif text-xl text-ink">Your bag ({cart.reduce((a, b) => a + b.quantity, 0)})</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full border border-sand flex items-center justify-center text-sage hover:text-ink transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free shipping bar */}
        <div className="px-6 py-3 border-b border-sand/60">
          <div className="flex justify-between text-[12px] text-sage mb-1.5">
            {gap > 0 ? (
              <span>Add <strong className="text-coral">${gap.toFixed(2)}</strong> more for free shipping</span>
            ) : (
              <span className="text-teal font-semibold">✓ Free shipping unlocked!</span>
            )}
          </div>
          <div className="w-full h-1.5 bg-sand/50 rounded-full overflow-hidden">
            <div className="h-full bg-coral rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-sage text-sm gap-3">
              <span className="text-3xl">🩹</span>
              <span>Your bag is empty</span>
              <button onClick={onClose} className="bg-coral text-white text-xs font-medium px-5 py-2.5 rounded-pill">
                Start shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 items-center border border-sand rounded-2xl p-4 bg-white">

                {/* Tiny product icon */}
                <div className="w-14 h-14 rounded-xl bg-cream-d border border-sand flex items-center justify-center shrink-0 overflow-hidden">
                  {item.img ? (
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl">🩹</span>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <span className="text-[13px] font-medium text-ink leading-snug">{item.name}</span>
                    <button onClick={() => onRemoveItem(item.id)} className="text-sage hover:text-coral transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[13px] text-coral font-medium">${item.price}.00</div>
                  <div className="flex items-center gap-0 bg-cream border border-sand rounded-lg w-fit">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-sage hover:text-ink"><Minus className="w-3 h-3" /></button>
                    <span className="px-2 text-xs font-semibold text-ink">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-sage hover:text-ink"><Plus className="w-3 h-3" /></button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer checkout */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-sand space-y-4">
            <div className="flex justify-between text-[15px]">
              <span className="text-sage">Subtotal</span>
              <span className="font-medium text-ink">${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-ink hover:bg-teal text-white text-[15px] font-medium py-4 rounded-pill transition-colors">
              Checkout · ${subtotal.toFixed(2)}
            </button>
            <p className="text-[11px] text-sage text-center">Shipping & taxes calculated at checkout</p>
          </div>
        )}

      </div>
    </div>
  );
}
