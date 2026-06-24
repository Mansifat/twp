import { Link } from 'react-router-dom'
import { useCart } from '../lib/useCart'

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotalCents } = useCart()

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20 md:py-24 px-4 sm:px-6 bg-charcoal text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-cream font-serif leading-tight">
            Your <span className="text-gold">Cart</span>
          </h1>
        </div>
      </section>

      <section className="py-10 md:py-16 px-4 sm:px-6 bg-cream min-h-[40vh]">
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
              <div className="space-y-5 md:space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gold/10 rounded-sm p-4 sm:p-5 md:p-6"
                  >
                    {/* MOBILE + DESKTOP RESPONSIVE ITEM CARD */}
                    <div className="flex flex-col gap-4">
                      {/* Top row */}
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-20 md:h-20 bg-gradient-to-br from-jet-light to-charcoal flex-shrink-0 flex items-center justify-center overflow-hidden">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="font-bold text-charcoal text-xl sm:text-2xl md:text-lg break-words">
                                {item.name}
                              </h3>
                              <p className="text-jet-light/60 text-base sm:text-lg md:text-sm mt-1">
                                {formatPrice(item.priceCents)} each
                              </p>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-jet-light/40 hover:text-red-500 transition-colors text-xl leading-none flex-shrink-0"
                              aria-label="Remove item"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Bottom row */}
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-11 h-11 sm:w-12 sm:h-12 border border-gold/30 text-charcoal hover:bg-gold/10 transition-colors text-xl"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>

                          <span className="w-8 text-center text-charcoal text-lg sm:text-xl md:text-base">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-11 h-11 sm:w-12 sm:h-12 border border-gold/30 text-charcoal hover:bg-gold/10 transition-colors text-xl"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <p className="font-semibold text-charcoal text-xl sm:text-2xl md:text-base text-right">
                          {formatPrice(item.priceCents * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 md:mt-10 flex justify-end">
                <div className="w-full sm:w-96 bg-white border border-gold/10 p-5 sm:p-6">
                  <div className="flex justify-between items-center text-lg sm:text-2xl md:text-lg mb-6">
                    <span className="text-jet-light/70">Subtotal</span>
                    <span className="font-bold text-charcoal">
                      {formatPrice(subtotalCents)}
                    </span>
                  </div>

                  <Link
                    to="/checkout"
                    className="btn-primary w-full block text-center py-4 sm:py-5 text-sm sm:text-base tracking-widest"
                  >
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