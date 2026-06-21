import { Link } from 'react-router-dom'
import { useCart } from '../lib/useCart'

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotalCents } = useCart()

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-24 px-6 bg-charcoal text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-cream font-serif leading-tight">
            Your <span className="text-gold">Cart</span>
          </h1>
        </div>
      </section>

      <section className="py-16 px-6 bg-cream min-h-[40vh]">
        <div className="max-w-4xl mx-auto">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-jet-light/70 text-lg mb-8">Your cart is empty.</p>
              <Link to="/products" className="btn-primary inline-block">
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-6 bg-white border border-gold/10 p-6"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-jet-light to-charcoal flex-shrink-0 flex items-center justify-center">
                      <img src={item.img} alt={item.name} className="max-w-full max-h-full" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-charcoal">{item.name}</h3>
                      <p className="text-jet-light/60 text-sm">
                        {formatPrice(item.priceCents)} each
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-gold/30 text-charcoal hover:bg-gold/10 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-charcoal">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-gold/30 text-charcoal hover:bg-gold/10 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <p className="w-24 text-right font-semibold text-charcoal">
                      {formatPrice(item.priceCents * item.quantity)}
                    </p>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-jet-light/40 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-end">
                <div className="w-full sm:w-80">
                  <div className="flex justify-between text-lg mb-6">
                    <span className="text-jet-light/70">Subtotal</span>
                    <span className="font-bold text-charcoal">{formatPrice(subtotalCents)}</span>
                  </div>
                  <Link to="/checkout" className="btn-primary w-full block text-center">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

function formatPrice(cents) {
  return '₹' + (cents / 100).toLocaleString('en-IN')
}