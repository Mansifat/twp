import { useEffect, useState } from 'react'
import { CartContext } from './cartContextObject'

const STORAGE_KEY = 'sovereign_cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // localStorage can fail in some browser contexts (private mode, etc) — fail silently
    }
  }, [items])

  function addItem(product) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          priceCents: product.priceCents,
          img: product.img,
          quantity: 1,
        },
      ]
    })
  }

  function removeItem(productId) {
    setItems((prev) => prev.filter((i) => i.id !== productId))
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) {
      removeItem(productId)
      return
    }
    setItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
    )
  }

  function clearCart() {
    setItems([])
  }

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotalCents = items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotalCents }}
    >
      {children}
    </CartContext.Provider>
  )
}