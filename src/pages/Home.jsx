import { Link } from 'react-router-dom'

const values = [
  {
    title: 'Discipline',
    desc: 'Consistency in craft. Every detail matters, from product formulation to daily routine.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Confidence',
    desc: 'Built through action. Show up, put in the work, and own who you are.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    desc: 'No shortcuts. Premium ingredients, premium mindset, premium results.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
]

const featured = [
  {
    name: 'The Daily Ritual Set',
    tag: 'Face + Beard',
    desc: 'Start and end your day with purpose. A complete grooming system.',
    img: "./The Daily Ritual Set.png",
  },
  {
    name: 'Iron Will Cologne',
    tag: 'Fragrance',
    desc: 'Bold, grounded, enduring. A scent that commands respect.',
    img: "./Iron Will Cologne.png"
  },
  {
    name: 'The Foundation Serum',
    tag: 'Skincare',
    desc: 'Build from the ground up. Premium skincare engineered for men.',
    img: "./The Foundation Serum.png"
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center bg-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-gold)_0%,_transparent_70%)] opacity-5" />
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-6">
            Forge Your Legacy
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-cream font-serif leading-tight">
            The Modern Man's
            <br />
            <span className="text-gold">Blueprint</span>
          </h1>
          <p className="mt-6 text-cream/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Grooming products and a lifestyle brand built for men who value
            confidence, discipline, self-respect, and personal excellence.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/products" className="btn-primary">
              Explore Products
            </Link>
            <Link to="/about" className="btn-outline">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">The Foundation</p>
            <h2 className="section-title">Built on Core Principles</h2>
            <p className="section-subtitle mx-auto mt-4">
              SOVEREIGN isn't just about looking good — it's about becoming your best self.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((v) => (
              <div key={v.title} className="text-center p-8 group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-charcoal text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                  {v.icon}
                </div>
                <h3>{v.title}</h3>
                <p className="text-jet-light/70 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">The Collection</p>
            <h2 className="section-title text-cream">Signature Products</h2>
            <p className="section-subtitle mx-auto mt-4 text-cream/60">
              Precision-crafted grooming essentials for the disciplined man.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((p) => (
              <div
                key={p.name}
                className="group bg-jet/50 border border-gold/10 p-8 hover:border-gold/40 transition-all duration-500"
              >
                <div className="aspect-square bg-gradient-to-br from-jet-light to-charcoal mb-6 flex items-center justify-center">
                  <img src={p.img} alt="" />
                </div>
                <span className="text-gold text-xs uppercase tracking-[0.2em]">{p.tag}</span>
                <h3 className="text-xl font-bold text-cream mt-2 mb-3">{p.name}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">The Movement</p>
          <h2 className="section-title">Join SOVEREIGN</h2>
          <p className="section-subtitle mx-auto mt-4">
            Be part of a community of men committed to growth, discipline, and
            becoming the best version of themselves.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/community" className="btn-primary">
              Join the Community
            </Link>
            <Link to="/contact" className="btn-outline border-charcoal text-charcoal hover:bg-charcoal hover:text-cream">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
