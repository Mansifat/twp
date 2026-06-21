import { Link } from 'react-router-dom'
import { useProducts } from '../lib/useProducts'
import { useCart } from '../lib/useCart'

export default function Products() {
  const { products, categories, loading, error } = useProducts()
  const { addItem, items } = useCart()

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-24 px-6 bg-charcoal text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3"></p>
          <h1 className="text-4xl md:text-6xl font-bold text-cream font-serif leading-tight">
            Precision-Crafted
            <br />
            <span className="text-gold">Grooming</span>
          </h1>
          <p className="mt-6 text-cream/60 text-lg max-w-2xl mx-auto">
            Every product is formulated with premium ingredients and designed
            to be part of your daily ritual.
          </p>
        </div>
      </section>

      {error && (
        <div className="bg-red-50 text-red-700 text-center py-4 px-6">
          Couldn't load products right now. Please refresh the page.
        </div>
      )}

      {/* Categories */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Categories</p>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="bg-white p-8 border border-gold/10 animate-pulse h-40" />
                ))
              : categories.map((cat) => (
                  <div key={cat.name} className="bg-white p-8 border border-gold/10">
                    <h3 className="text-lg font-bold text-charcoal mb-4 uppercase tracking-wider">{cat.name}</h3>
                    <ul className="space-y-2">
                      {cat.items.map((item) => (
                        <li key={item} className="text-jet-light/70 text-sm hover:text-gold transition-colors cursor-pointer">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Collection</p>
            <h2 className="section-title text-cream">All Products</h2>
            <p className="section-subtitle mx-auto mt-4 text-cream/60">
              Each product is a tool for your daily practice of excellence.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-jet/50 border border-gold/10 p-6 h-72 animate-pulse" />
                ))
              : products.map((p) => (
                  <div
                    key={p.id}
                    className="group bg-jet/50 border border-gold/10 p-6 hover:border-gold/40 transition-all duration-500 relative"
                  >
                    {p.popular && (
                      <span className="absolute top-3 right-3 bg-gold text-charcoal text-[10px] uppercase tracking-widest px-2 py-1 font-semibold">
                        Popular
                      </span>
                    )}
                    <div className="aspect-square bg-gradient-to-br from-jet-light to-charcoal mb-4 flex items-center justify-center">
                      <img src={p.img} alt={p.name} />
                    </div>
                    <span className="text-gold text-xs uppercase tracking-[0.2em]">{p.tag}</span>
                    <h3 className="text-base font-bold text-cream mt-1 mb-1">{p.name}</h3>
                    <p className="text-cream/50 text-sm">{p.price}</p>
                    <button
                      onClick={() => addItem(p)}
                      className="mt-4 w-full border border-gold/40 text-gold text-xs uppercase tracking-widest py-2 hover:bg-gold hover:text-charcoal transition-all duration-300"
                    >
                      {items.find((i) => i.id === p.id) ? 'Added ✓ — Add Another' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-cream text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title">Not Sure Where to Start?</h2>
          <p className="section-subtitle mx-auto mt-4">
            Take our quick grooming assessment and get personalized recommendations.
          </p>
          <Link to="/contact" className="btn-primary inline-block mt-8">
            Take the Assessment
          </Link>
        </div>
      </section>
    </div>
  )
}