import { Link } from 'react-router-dom'

const timeline = [
  { year: '2024', title: 'The Vision', desc: 'SOVEREIGN is conceived — a brand built for the modern man seeking more than just products.' },
  { year: '2025', title: 'Product Development', desc: 'Months of R&D with top chemists to create the perfect grooming formulations.' },
  { year: '2026', title: 'Launch', desc: 'Official brand launch with our core collection and growing community.' },
]

export default function About() {
  return (
    <div className="pt-16">
      {/* Mission */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3"></p>
          <h1 className="text-4xl md:text-6xl font-bold text-cream font-serif leading-tight">
            More Than Grooming.
            <br />
            <span className="text-gold">A Way of Life.</span>
          </h1>
          <p className="mt-8 text-cream/60 text-lg leading-relaxed max-w-3xl mx-auto">
            SOVEREIGN was founded on a simple belief: men deserve products and a
            community that challenges them to be better. We combine premium
            grooming essentials with a mindset — discipline, confidence, and
            relentless self-improvement.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">The Story</p>
            <h2 className="section-title mb-6">Why SOVEREIGN Exists</h2>
            <div className="space-y-4 text-jet-light/70 leading-relaxed">
              <p>
                We noticed a gap. Most men's grooming brands focus only on
                surface-level aesthetics. They sell soap, not substance.
              </p>
              <p>
                SOVEREIGN was created to bridge the gap between how you present
                yourself and who you actually are. We believe that taking care
                of your appearance is part of a larger commitment to personal
                excellence.
              </p>
              <p>
                Every product we create is designed to be part of a ritual —
                a daily practice that reinforces discipline, builds confidence,
                and moves you closer to your potential.
              </p>
            </div>
          </div>
          <div className="bg-charcoal aspect-square flex items-center justify-center order-first md:order-last">
            <img src="SOVEREIGN.png" alt="" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">The Journey</p>
            <h2 className="section-title text-cream">Our Timeline</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {timeline.map((t) => (
              <div key={t.year} className="relative pl-8 border-l-2 border-gold/30">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gold" />
                <span className="text-gold text-sm font-bold">{t.year}</span>
                <h3 className="text-xl font-bold text-cream mt-1 mb-2">{t.title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-cream text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title">Ready to Forge Your Legacy?</h2>
          <p className="section-subtitle mx-auto mt-4">
            Join the movement of men committed to becoming their best.
          </p>
          <Link to="/products" className="btn-primary inline-block mt-8">
            Explore Products
          </Link>
        </div>
      </section>
    </div>
  )
}
