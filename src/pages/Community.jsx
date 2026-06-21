import { Link } from 'react-router-dom'

const posts = [
  {
    title: 'The Power of the Morning Ritual',
    excerpt: 'How a 15-minute grooming routine sets the tone for a productive day.',
    author: 'J. Mercer',
    tag: 'Mindset',
  },
  {
    title: 'Iron Sharpens Iron',
    excerpt: 'Why surrounding yourself with driven men is the fastest path to growth.',
    author: 'SOVEREIGN Team',
    tag: 'Community',
  },
  {
    title: 'The Uniform of Discipline',
    excerpt: 'What you wear and how you present yourself signals your standards to the world.',
    author: 'A. Reeves',
    tag: 'Style',
  },
  {
    title: 'Mastering the Fundamentals',
    excerpt: 'Before the complex routines, master the basics. Grooming, fitness, mindset.',
    author: 'SOVEREIGN Team',
    tag: 'Discipline',
  },
  {
    title: 'Legacy Over Currency',
    excerpt: 'Building something that outlasts you — the ultimate measure of a man.',
    author: 'J. Mercer',
    tag: 'Philosophy',
  },
  {
    title: 'The 5 AM Club: Fact or Fiction?',
    excerpt: 'We break down the science and reality of early morning discipline.',
    author: 'SOVEREIGN Team',
    tag: 'Performance',
  },
]

const platforms = [
  { name: 'Instagram', handle: '@SOVEREIGN', desc: 'Daily content, product drops, community spotlights' },
  { name: 'YouTube', handle: 'SOVEREIGN', desc: 'Deep dives, grooming tutorials, mindset content' },
  { name: 'X / Twitter', handle: '@SOVEREIGN', desc: 'Quick thoughts, threads, daily discipline' },
  { name: 'TikTok', handle: '@SOVEREIGN', desc: 'Short-form motivation, grooming tips, challenges' },
]

export default function Community() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="py-24 px-6 bg-charcoal text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3"></p>
          <h1 className="text-4xl md:text-6xl font-bold text-cream font-serif leading-tight">
            Join the
            <br />
            <span className="text-gold">Movement</span>
          </h1>
          <p className="mt-6 text-cream/60 text-lg leading-relaxed">
            SOVEREIGN is more than a brand — it's a community of men committed
            to growth, discipline, and becoming the best version of themselves.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">What We Stand For</p>
            <h2 className="section-title">The S Code</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Show Up Every Day', desc: 'Consistency beats intensity. Small daily actions compound into extraordinary results.' },
              { title: 'Own Your Standards', desc: 'Define what excellence means to you and never compromise. Your standards are your identity.' },
              { title: 'Lift As You Rise', desc: 'Success means nothing if you keep it to yourself. Bring others up with you.' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 border border-gold/10">
                <div className="w-10 h-0.5 bg-gold mb-4" />
                <h3 className="text-lg font-bold text-charcoal mb-3">{item.title}</h3>
                <p className="text-jet-light/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">From The Lab</p>
            <h2 className="section-title text-cream">Latest Insights</h2>
            <p className="section-subtitle mx-auto mt-4 text-cream/60">
              Thoughts on discipline, style, and the art of becoming.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <div key={post.title} className="bg-jet/50 border border-gold/10 p-8 hover:border-gold/40 transition-all duration-500">
                <span className="text-gold text-xs uppercase tracking-[0.2em]">{post.tag}</span>
                <h3 className="text-lg font-bold text-cream mt-2 mb-3">{post.title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <p className="text-cream/40 text-xs uppercase tracking-wider">{post.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-3">Connect</p>
            <h2 className="section-title">Follow the Journey</h2>
            <p className="section-subtitle mx-auto mt-4">
              Join us on every platform. The conversation happens everywhere.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {platforms.map((p) => (
              <div key={p.name} className="bg-white p-8 border border-gold/10 text-center group hover:border-gold/40 transition-all duration-300">
                <h3 className="text-lg font-bold text-charcoal mb-1">{p.name}</h3>
                <p className="text-gold text-sm mb-3">{p.handle}</p>
                <p className="text-jet-light/70 text-xs leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-charcoal text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-cream">Become a Founding Member</h2>
          <p className="text-cream/60 mt-4 max-w-xl mx-auto">
            Early access to products, exclusive content, and a direct line to the founders.
          </p>
          <Link to="/contact" className="btn-primary inline-block mt-8">
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  )
}
