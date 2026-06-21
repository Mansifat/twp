import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../lib/useCart'
import { supabase } from '../lib/supabaseClient'

const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash on Delivery' },
  { value: 'upi', label: 'UPI' },
  { value: 'card', label: 'Card' },
  { value: 'netbanking', label: 'Net Banking' },
]

export default function Checkout() {
  const { items, subtotalCents, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cash',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | error
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handlePlaceOrder(e) {
    e.preventDefault()

    if (items.length === 0) return

    for (const field of ['name', 'phone', 'address', 'city', 'state', 'pincode']) {
      if (!form[field]) {
        setStatus('error')
        setErrorMsg('Please fill in all required fields.')
        return
      }
    }

    setStatus('submitting')
    setErrorMsg('')

    try {
      // Create the order. order_reference is generated automatically
      // by the database (e.g. "SOV-20260621-0001") — that's what
      // stands in for a transaction id for now.
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_name: form.name,
          customer_phone: form.phone,
          customer_email: form.email || null,
          shipping_address: form.address,
          shipping_city: form.city,
          shipping_state: form.state,
          shipping_pincode: form.pincode,
          payment_method: form.paymentMethod,
          subtotal_cents: subtotalCents,
        })
        .select()
        .single()

      if (orderError) throw orderError

      const orderItemRows = items.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        price_cents: item.priceCents,
        quantity: item.quantity,
      }))

      const { error: itemsError } = await supabase.from('order_items').insert(orderItemRows)
      if (itemsError) throw itemsError

      clearCart()
      navigate(`/order-confirmation?orderId=${order.id}`)
    } catch (err) {
      console.error('Order placement failed:', err)
      setStatus('error')
      setErrorMsg('Something went wrong placing your order. Please try again.')
    }
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 text-center min-h-screen">
        <p className="text-jet-light/70 text-lg mb-8">Your cart is empty.</p>
        <Link to="/products" className="btn-primary inline-block">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-24 px-6 bg-charcoal text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-cream font-serif leading-tight">
            <span className="text-gold">Checkout</span>
          </h1>
        </div>
      </section>

      <section className="py-16 px-6 bg-cream">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <h2 className="section-title mb-4">Shipping Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="input-field" />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="input-field" />
            </div>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address (optional)" className="input-field w-full" />
            <input name="address" value={form.address} onChange={handleChange} placeholder="Street Address" className="input-field w-full" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="input-field" />
              <input name="state" value={form.state} onChange={handleChange} placeholder="State" className="input-field" />
              <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" className="input-field" />
            </div>

            <div>
              <p className="text-jet-light/70 text-sm mb-2">Payment Method</p>
              <div className="grid grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m.value}
                    className={`flex items-center gap-2 border px-4 py-3 cursor-pointer transition-colors ${
                      form.paymentMethod === m.value
                        ? 'border-gold bg-gold/10'
                        : 'border-gold/20 hover:border-gold/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.value}
                      checked={form.paymentMethod === m.value}
                      onChange={handleChange}
                      className="accent-gold"
                    />
                    <span className="text-charcoal text-sm">{m.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {status === 'error' && <p className="text-red-600 text-sm">{errorMsg}</p>}

            <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full disabled:opacity-50">
              {status === 'submitting' ? 'Placing Order...' : `Place Order — ${formatPrice(subtotalCents)}`}
            </button>
            <p className="text-jet-light/40 text-xs text-center">
              No payment is processed right now — this records your order only.
            </p>
          </form>

          <div>
            <h2 className="section-title mb-4">Order Summary</h2>
            <div className="space-y-3 border-b border-gold/20 pb-4 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-jet-light/70">{item.name} × {item.quantity}</span>
                  <span className="text-charcoal font-medium">{formatPrice(item.priceCents * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(subtotalCents)}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function formatPrice(cents) {
  return '₹' + (cents / 100).toLocaleString('en-IN')
}