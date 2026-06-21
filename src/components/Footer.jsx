import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="text-gold text-2xl font-bold font-serif tracking-wider">
              SOVEREIGN<span className="text-cream"> </span>
            </Link>
            <p className="mt-4 text-cream/60 max-w-md leading-relaxed">
              Forging a legacy of confidence, discipline, and personal excellence.
              More than grooming — a lifestyle.
            </p>
          </div>

          <div>
            <h4 className="text-gold text-sm uppercase tracking-widest mb-4">Navigate</h4>
            <div className="flex flex-col gap-2">
              {['About', 'Products', 'Community', 'Contact'].map((p) => (
                <Link
                  key={p}
                  to={`/${p.toLowerCase()}`}
                  className="text-cream/60 hover:text-gold transition-colors text-sm"
                >
                  {p}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-gold text-sm uppercase tracking-widest mb-4">Connect</h4>
            <div className="flex flex-col gap-2 text-cream/60 text-sm">
              <span>Instagram</span>
              <span>YouTube</span>
              <span>X / Twitter</span>
              <span>TikTok</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4 text-cream/40 text-xs uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} Project J. All rights reserved.</span>
          <span>Forged with purpose.</span>
        </div>
      </div>
    </footer>
  )
}
