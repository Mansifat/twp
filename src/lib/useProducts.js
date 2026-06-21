import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

/**
 * Fetches all active products (with their category name attached)
 * and all categories, in parallel.
 *
 * Returns shape compatible with the existing Products.jsx UI:
 *   products: [{ id, name, tag, price, popular, img, category }]
 *   categories: [{ name, items: [productName, ...] }]
 */
export function useProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function load() {
      setLoading(true)
      setError(null)

      const [productsRes, categoriesRes] = await Promise.all([
        supabase
          .from('products')
          .select('id, name, tag, price_cents, currency, image_url, is_popular, categories(name, slug)')
          .eq('is_active', true)
          .order('name'),
        supabase
          .from('categories')
          .select('name, slug, sort_order')
          .order('sort_order'),
      ])

      if (!isMounted) return

      if (productsRes.error || categoriesRes.error) {
        setError(productsRes.error || categoriesRes.error)
        setLoading(false)
        return
      }

      // Shape products to match what Products.jsx already expects
      const shapedProducts = productsRes.data.map((p) => ({
        id: p.id,
        name: p.name,
        tag: p.tag,
        price: formatPrice(p.price_cents, p.currency),
        priceCents: p.price_cents,
        popular: p.is_popular,
        img: p.image_url,
        category: p.categories?.name ?? null,
      }))

      // Build the "categories with item names" shape the Categories grid uses
      const shapedCategories = categoriesRes.data.map((c) => ({
        name: c.name,
        items: shapedProducts
          .filter((p) => p.category === c.name)
          .map((p) => p.name),
      }))

      setProducts(shapedProducts)
      setCategories(shapedCategories)
      setLoading(false)
    }

    load()
    return () => {
      isMounted = false
    }
  }, [])

  return { products, categories, loading, error }
}

/** price_cents (integer, e.g. 890000) -> "₹8,900" */
function formatPrice(cents, currency = 'INR') {
  const amount = cents / 100
  const symbol = currency === 'INR' ? '₹' : currency + ' '
  return symbol + amount.toLocaleString('en-IN')
}
