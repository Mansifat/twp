import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../lib/useCart'
import { supabase } from '../lib/supabaseClient'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/community', label: 'Community' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)
  const { pathname } = useLocation()
  const { itemCount } = useCart()

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (!error) {
        setUser(data.user ?? null)
      }
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })

    if (error) {
      console.error('Google sign-in error:', error.message)
      alert(error.message)
    }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Sign out error:', error.message)
      alert(error.message)
    }
  }

  const userLabel =
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Account'

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-charcoal/90 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="text-gold text-2xl font-bold font-serif tracking-wider">
          SOVEREIGN<span className="text-cream"> </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                pathname === l.to ? 'text-gold' : 'text-cream/70 hover:text-gold'
              }`}
            >
              {l.label}
            </Link>
          ))}

          <CartIcon itemCount={itemCount} />

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-cream/80 text-xs uppercase tracking-wider">
                Hi, {userLabel}
              </span>
              <button
                onClick={handleSignOut}
                className="btn-primary text-xs px-6 py-2"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="btn-primary text-xs px-6 py-2"
            >
              Sign in with Google
            </button>
          )}
        </div>

        <div className="md:hidden flex items-center gap-4">
          <CartIcon itemCount={itemCount} />
          <button
            className="text-cream"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-charcoal border-t border-gold/20">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`text-sm uppercase tracking-widest transition-colors ${
                  pathname === l.to ? 'text-gold' : 'text-cream/70 hover:text-gold'
                }`}
              >
                {l.label}
              </Link>
            ))}

            {user ? (
              <>
                <span className="text-cream/80 text-xs uppercase tracking-wider text-center">
                  Hi, {userLabel}
                </span>
                <button
                  onClick={() => {
                    setOpen(false)
                    handleSignOut()
                  }}
                  className="btn-primary text-xs px-6 py-2 text-center"
                >
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setOpen(false)
                  handleGoogleSignIn()
                }}
                className="btn-primary text-xs px-6 py-2 text-center"
              >
                Sign in with Google
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

function CartIcon({ itemCount }) {
  return (
    <Link
      to="/cart"
      className="relative text-cream/70 hover:text-gold transition-colors"
      aria-label="View cart"
    >
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>

      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-gold text-charcoal text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  )
}